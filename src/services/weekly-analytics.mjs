import dotenv from 'dotenv';
import { BetaAnalyticsDataClient } from '@google-analytics/data';
dotenv.config();

// name and url for the site the report is for
const reportConfig = {
  name: 'paulie.dev',
  url: 'https://www.paulie.dev',
};

// The icons to use in the Slack message
const HIGHER = '⬆️';
const LOWER = '⬇️';
const SAME = '↔️';
const NEW = '🆕';

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
    const slackString = report
      .map((item, index) => {
        const {
          position,
          url,
          title,
          count: { thisWeek, lastWeek },
          status,
        } = item;

        return `${position}. ${status} <${url}|${title}> | *\`${`x${thisWeek}`}\`* / x${lastWeek}`;
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

// Block Kit Builder
// https://app.slack.com/block-kit-builder/T070FFUDNH3#%7B%22blocks%22:%5B%7B%22type%22:%22context%22,%22elements%22:%5B%7B%22type%22:%22image%22,%22image_url%22:%22https://www.paulie.dev/images/down-chevron.png%22,%22alt_text%22:%22notifications%20warning%20icon%22%7D,%7B%22type%22:%22mrkdwn%22,%22text%22:%2201.%20%3Chttps://https://www.paulie.dev/%7CHome%3E%20-%20*%60x49%60*%20/%20x81%22%7D%5D%7D,%7B%22type%22:%22context%22,%22elements%22:%5B%7B%22type%22:%22image%22,%22image_url%22:%22https://www.paulie.dev/images/up-chevron.png%22,%22alt_text%22:%22notifications%20warning%20icon%22%7D,%7B%22type%22:%22mrkdwn%22,%22text%22:%2202.%20%3Chttps://www.paulie.dev/posts/2023/11/a-set-of-sign-in-with-google-buttons-made-with-tailwind/%7CSign%20In%20With%20Google%20Buttons%3E%20-%20*%60x48%60*%20/%20x43%22%7D%5D%7D,%7B%22type%22:%22context%22,%22elements%22:%5B%7B%22type%22:%22image%22,%22image_url%22:%22https://api.slack.com/img/blocks/bkb_template_images/notificationsWarningIcon.png%22,%22alt_text%22:%22notifications%20warning%20icon%22%7D,%7B%22type%22:%22mrkdwn%22,%22text%22:%2203.%20%3Chttps://www.paulie.dev/posts/2020/08/react-hooks-and-matter-js/%7CReact%20hooks%20and%20matter.js%3E%20-%20*%60x18%60*%20/%20x0%22%7D%5D%7D,%7B%22type%22:%22context%22,%22elements%22:%5B%7B%22type%22:%22image%22,%22image_url%22:%22https://api.slack.com/img/blocks/bkb_template_images/notificationsWarningIcon.png%22,%22alt_text%22:%22notifications%20warning%20icon%22%7D,%7B%22type%22:%22mrkdwn%22,%22text%22:%2204.%20%3Chttps://www.paulie.dev/articles/%7CArticles%3E%20-%20*%60x15%60*%20/%20x15%22%7D%5D%7D%5D%7D

// https://app.slack.com/block-kit-builder/T070FFUDNH3#%7B%22blocks%22:%5B%7B%22type%22:%22header%22,%22text%22:%7B%22type%22:%22plain_text%22,%22text%22:%22%F0%9F%93%8A%20Sunday,%20August%2011,%202024%22,%22emoji%22:true%7D%7D,%7B%22type%22:%22divider%22%7D,%7B%22type%22:%22section%22,%22text%22:%7B%22type%22:%22mrkdwn%22,%22text%22:%22Top%2010%20Page%20Views%20for%20%3Chttps://www.paulie.dev%7Cpaulie.dev%3E%22%7D%7D,%7B%22type%22:%22context%22,%22elements%22:%5B%7B%22type%22:%22mrkdwn%22,%22text%22:%2201.%20%E2%AC%87%EF%B8%8F%20%3Chttps://https://www.paulie.dev/%7CHome%3E%20-%20*%60x49%60*%20/%20x81%5Cn02.%20%E2%AC%87%EF%B8%8F%20%3Chttps://https://www.paulie.dev/posts/2023/11/a-set-of-sign-in-with-google-buttons-made-with-tailwind/%7CSign%20In%20With%20Google%20Buttons%3E%20-%20*%60x43%60*%20/%20x48%5Cn03.%20%E2%AC%86%EF%B8%8F%20%3Chttps://https://www.paulie.dev/posts/2020/08/react-hooks-and-matter-js/%7CReact%20hooks%20and%20matter.js%3E%20-%20*%60x21%60*%20/%20x20%5Cn04.%20%F0%9F%86%95%20%3Chttps://https://www.paulie.dev/posts/2024/06/how-to-use-google-application-json-credentials-in-environment-variables/%7CGoogle%20Application%20Credentials%3E%20-%20*%60x18%60*%20/%20x0%5Cn04.%20%E2%86%94%EF%B8%8F%20%3Chttps://https://www.paulie.dev/articles/%7CArticles%3E%20-%20*%60x10%60*%20/%20x10%22%7D%5D%7D%5D%7D
