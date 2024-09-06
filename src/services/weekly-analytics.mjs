import dotenv from 'dotenv';
import { BetaAnalyticsDataClient } from '@google-analytics/data';
dotenv.config();

// name and url for the site the report is for
const reportConfig = {
  name: 'paulie.dev',
  url: 'https://www.paulie.dev',
};

// The icons to use in the Slack message
const HIGHER = 'up-triangle.png';
const LOWER = 'down-triangle.png';
const SAME = 'same-slash-1.png';
const NEW = 'new-plus-2.png';

// Limit the report to this number of results
const reportLimit = 10;

// format the shape of the report
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

// Function to determine the status
const determineStatus = (count, lastWeekCount) => {
  const thisCount = Number(count);
  const previousCount = Number(lastWeekCount);

  if (lastWeekCount === undefined || lastWeekCount === '0') {
    return NEW;
  }

  if (thisCount > previousCount) {
    return HIGHER;
  }

  if (thisCount < previousCount) {
    return LOWER;
  }

  return SAME;
};

// util function to format date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString('en-US', {
    day: 'numeric',
    month: 'long',
    weekday: 'long',
    year: 'numeric',
  });
};

const init = async () => {
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

    const lastWeekMap = lastWeekResults.reduce((items, item) => {
      const { url, count } = item;
      items[url] = count;
      return items;
    }, {});

    // Generate the report for this week
    const report = thisWeekResults.map((item, index) => {
      const { url, title, count } = item;
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

    // Create the list
    const slackList = report.map((item, index) => {
      const {
        position,
        url,
        title,
        count: { thisWeek, lastWeek },
        status,
      } = item;

      return {
        type: 'context',
        elements: [
          {
            type: 'image',
            image_url: `https://www.paulie.dev/images/${status}`,
            alt_text: 'icon',
          },
          {
            type: 'mrkdwn',
            text: `${position}.  <${url}|${title}> | *\`${`x${thisWeek}`}\`* / x${lastWeek}`,
          },
        ],
      };
    });

    const blocks = [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: `📊 ${formatDate(new Date())}`,
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
          text: `Top ${reportLimit} Page Views for <${reportConfig.url}|${reportConfig.name}>`,
        },
      },
    ];

    blocks.push(...slackList);

    // Post message to Slack
    fetch(process.env.SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        blocks,
      }),
    });
  } catch (error) {
    console.error(error);
  }
};

init();
