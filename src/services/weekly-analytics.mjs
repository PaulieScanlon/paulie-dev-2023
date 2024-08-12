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

    // Create the string
    // const slackString = report
    //   .map((item, index) => {
    //     const {
    //       position,
    //       url,
    //       title,
    //       count: { thisWeek, lastWeek },
    //       status,
    //     } = item;

    //     return `${position}. ${status} <${url}|${title}> | *\`${`x${thisWeek}`}\`* / x${lastWeek}`;
    //   })
    //   .join('\\n')
    //   .replace(/\\n/g, '\n');

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

// Block Kit Builder
// https://app.slack.com/block-kit-builder/T070FFUDNH3#%7B%22blocks%22:%5B%7B%22type%22:%22context%22,%22elements%22:%5B%7B%22type%22:%22image%22,%22image_url%22:%22https://www.paulie.dev/images/down-triangle.png%22,%22alt_text%22:%22notifications%20warning%20icon%22%7D,%7B%22type%22:%22mrkdwn%22,%22text%22:%2201.%20%3Chttps://https://www.paulie.dev/%7CHome%3E%20-%20*%60x49%60*%20/%20x81%22%7D%5D%7D,%7B%22type%22:%22context%22,%22elements%22:%5B%7B%22type%22:%22image%22,%22image_url%22:%22https://www.paulie.dev/images/up-triangle.png%22,%22alt_text%22:%22notifications%20warning%20icon%22%7D,%7B%22type%22:%22mrkdwn%22,%22text%22:%2202.%20%3Chttps://www.paulie.dev/posts/2023/11/a-set-of-sign-in-with-google-buttons-made-with-tailwind/%7CSign%20In%20With%20Google%20Buttons%3E%20-%20*%60x48%60*%20/%20x43%22%7D%5D%7D,%7B%22type%22:%22context%22,%22elements%22:%5B%7B%22type%22:%22image%22,%22image_url%22:%22https://www.paulie.dev/images/new-plus-2.png%22,%22alt_text%22:%22notifications%20warning%20icon%22%7D,%7B%22type%22:%22mrkdwn%22,%22text%22:%2203.%20%3Chttps://www.paulie.dev/posts/2020/08/react-hooks-and-matter-js/%7CReact%20hooks%20and%20matter.js%3E%20-%20*%60x18%60*%20/%20x0%22%7D%5D%7D,%7B%22type%22:%22context%22,%22elements%22:%5B%7B%22type%22:%22image%22,%22image_url%22:%22https://www.paulie.dev/images/same-slash-1.png%22,%22alt_text%22:%22notifications%20warning%20icon%22%7D,%7B%22type%22:%22mrkdwn%22,%22text%22:%2204.%20%3Chttps://www.paulie.dev/articles/%7CArticles%3E%20-%20*%60x15%60*%20/%20x15%22%7D%5D%7D%5D%7D
