import * as functions from 'firebase-functions';
import {google} from 'googleapis';
import {ENV_CONFIG} from '../consts/env-config.const';
import {getAuthorizedClient} from '../utils/get-authorized-token';

export const sendNotifications = functions.https.onRequest(
  async (req: any, res) => {
    const sheets = google.sheets('v4');
    const auth = await getAuthorizedClient();
    const data = await sheets.spreadsheets.values.get({
      spreadsheetId: ENV_CONFIG.googleapi.sheet_id,
      range: `Recurring Charges!A:J`,
      auth
    });

    return res.json(data);
  }
);
