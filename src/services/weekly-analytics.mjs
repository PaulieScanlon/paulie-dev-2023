import dotenv from 'dotenv';
dotenv.config();
import { BetaAnalyticsDataClient } from '@google-analytics/data';

const init = async () => {
  const reportLimit = 10;
  const HIGHER = '↑';
  const LOWER = '↓';
  const SAME = '-';
  const NEW = '☆';

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

    // Format the results
    const thisWeekResults = formatReport(thisWeek.rows);
    const lastWeekResults = formatReport(lastWeek.rows);

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
      const lastWeekCount = lastWeekMap[url];
      const status = determineStatus(count, lastWeekCount);

      return {
        position: (index + 1).toString().padStart(2, '0'), // Format the position with leading zero if it's less than 10
        url,
        title,
        count: { thisWeek: count, lastWeek: lastWeekCount || '0' }, // Ensure lastWeekCount is displayed as '0' if not found
        status,
      };
    });

    // Create the string
    const slackString = report
      .map((item, index) => {
        const {
          position,
          url,
          title,
          count: { thisWeek, lastWeek },
          status,
        } = item;

        return `${position}. ${status} <https://${url}|${title}> - *\`${`x${thisWeek}`}\`* / x${lastWeek}`;
      })
      .join('\\n')
      .replace(/\\n/g, '\n');

    // Post message to Slack
    fetch(process.env.SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        blocks: [
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
          {
            type: 'context',
            elements: [
              {
                type: 'mrkdwn',
                text: slackString,
              },
            ],
          },
        ],
      }),
    });
  } catch (error) {
    console.error(error);
  }
};

init();
