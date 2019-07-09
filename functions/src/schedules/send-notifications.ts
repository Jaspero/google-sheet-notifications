import * as functions from 'firebase-functions';
import {google} from 'googleapis';
import {ENV_CONFIG} from '../consts/env-config.const';
import {getAuthorizedClient} from '../utils/get-authorized-token';
import {sendEmail} from '../utils/send-email';

export const sendNotifications = functions.https.onRequest(
  async (req: any, res) => {
    const sheets = google.sheets('v4');
    const auth = await getAuthorizedClient();
    const data = await sheets.spreadsheets.values.get({
      spreadsheetId: ENV_CONFIG.googleapi.sheet_id,
      range: `Recurring Charges!A:J`,
      auth
    });

    if (data) {
      // @ts-ignore

      const [header, ...rows] = data.data.values;

      rows.forEach(row => {
        const item = header.reduce(
          (acc, cur, curIndex) => ({
            ...acc,
            [cur]: row[curIndex]
          }),
          {}
        );

        if (item['ACTIVE'] === 'TRUE') {
          const nextChargeDay = item['Next Charge'];
          const nextChargeDayFormat = new Date(nextChargeDay);
          const miliSecWeek = 86400000 * 7;

          // @ts-ignore
          if (nextChargeDayFormat - Date.now() <= miliSecWeek) {
            sendEmail('sven.djanis@gmail.com', 'Reminder', 'notification', {
              project: item['Project'],
              charge:
                Number(item['Monthly Charge']) * Number(item['Month Period']),
              currency: item['CURRENCY'],
              client: item['Client']
            })
              .then(() => {
                console.log('success');
              })
              .catch(err => {
                console.log('error');
              });
          }
        }
      });
    }
    return res.json(data.data.values);
  }
);
