import dotenv from 'dotenv';
dotenv.config();
import { BetaAnalyticsDataClient } from '@google-analytics/data';

const init = async () => {
  const reportLimit = 10;
  const HIGHER = '🟢';
  const LOWER = '🔻';
  const SAME = '▫️';
  const NEW = '⭐';

  // const HIGHER = '↑';
  // const LOWER = '↓';
  // const SAME = '-';
  // const NEW = '☆';

  const formatReport = (rows) => {
    return rows.map((row) => {
      const { dimensionValues, metricValues } = row;

      return {
        url: `https://${dimensionValues[0].value}`,
        title: dimensionValues[1].value.split('|')[1].trim(),
        // title: dimensionValues[1].value,
        count: metricValues[0].value,
      };
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      day: 'numeric',
      month: 'long',
      weekday: 'long',
      year: 'numeric',
    });
  };

  try {
    // Get data from Google Analytics
    const credentials = JSON.parse(
      Buffer.from(process.env.GOOGLE_APPLICATION_CREDENTIALS_BASE64, 'base64').toString('utf-8')
    );

    const analyticsDataClient = new BetaAnalyticsDataClient({
      credentials,
    });

    const [thisWeek] = await analyticsDataClient.runReport({
      property: `properties/${process.env.GA4_PROPERTY_ID}`,
      dateRanges: [
        {
          startDate: '7daysAgo',
          endDate: 'today',
        },
      ],
      dimensions: [
        {
          name: 'fullPageUrl',
        },
        {
          name: 'pageTitle',
        },
      ],
      metrics: [
        {
          name: 'totalUsers',
        },
      ],
      limit: reportLimit,
      metricAggregations: ['MAXIMUM'],
    });

    const [lastWeek] = await analyticsDataClient.runReport({
      property: `properties/${process.env.GA4_PROPERTY_ID}`,
      dateRanges: [
        {
          startDate: '14daysAgo',
          endDate: '7daysAgo',
        },
      ],
      dimensions: [
        {
          name: 'fullPageUrl',
        },
        {
          name: 'pageTitle',
        },
      ],
      metrics: [
        {
          name: 'totalUsers',
        },
      ],
      limit: reportLimit,
      metricAggregations: ['MAXIMUM'],
    });

    // Calculate total count
    const calculateTotalCount = (results) => {
      return results.reduce((total, { count }) => total + parseInt(count, 10), 0);
    };

    // Format the results
    const thisWeekResults = formatReport(thisWeek.rows);
    const lastWeekResults = formatReport(lastWeek.rows);

    // console.log('thisWeek: ', JSON.stringify(thisWeekResults, null, 2));
    // console.log('-----------------------------------------------------------------');
    // console.log('lastWeek: ', JSON.stringify(lastWeekResults, null, 2));

    const lastWeekMap = lastWeekResults.reduce((map, { url, count }) => {
      map[url] = count;
      return map;
    }, {});

    // Function to determine the status
    const determineStatus = (count, lastWeekCount) => {
      if (lastWeekCount === undefined) {
        return NEW;
      }
      if (lastWeekCount === '0') {
        return NEW;
      }
      const thisCount = parseInt(count, 10);
      const previousCount = parseInt(lastWeekCount, 10);
      if (thisCount > previousCount) {
        return HIGHER;
      } else if (thisCount < previousCount) {
        return LOWER;
      } else {
        return SAME;
      }
    };

    // Generate the report for this week
    const report = thisWeekResults.map(({ url, title, count }, index) => {
      const lastWeekCount = lastWeekMap[url]; // No need for '|| '0' since we handle 'undefined' in the status function
      const status = determineStatus(count, lastWeekCount);

      return {
        position: index + 1, // Array index as position value (1-based index)
        url,
        title,
        count: { thisWeek: count, lastWeek: lastWeekCount || '0' }, // Ensure lastWeekCount is displayed as '0' if not found
        status,
      };
    });

    // console.log('-----------------------------------------------------------------');
    // console.log(report);

    // Create the blocks
    const slackBlocks = report
      .flatMap((item, index) => {
        const {
          position,
          url,
          title,
          count: { thisWeek, lastWeek },
          status,
        } = item;

        return [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `*${position}. <${url}|${title}>*\n\n${status} *This week: \`${`x${thisWeek}`}\`* / Last week: \`${`x${lastWeek}`}\``,
            },
          },
          {
            type: 'divider',
          },
        ];
      })
      .slice(0, -1);

    const blocks = [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: `📅 ${formatDate(new Date())}`,
          emoji: true,
        },
      },
      {
        type: 'divider',
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'Top Ten Page Views for <https://www.paulie.dev|paulie.dev>',
        },
      },
    ];

    blocks.push(...slackBlocks);

    // Post message to Slack
    fetch(process.env.SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ blocks }),
    });
  } catch (error) {
    console.error(error);
  }
};

init();
