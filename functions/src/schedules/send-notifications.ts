import * as functions from "firebase-functions";
import { sheets } from "googleapis/build/src/apis/sheets";
import { ENV_CONFIG } from "../consts/env-config.const";
import { getAuthorizedClient } from "../utils/get-authorized-token";

export const sendNotifications = functions.https.onRequest(
  async (req: any, res) => {
    const auth = await getAuthorizedClient();
    const request = {
      spreadsheetId: ENV_CONFIG.googleapi.sheet_id,
      ranges: [],
      includeGridData: false,
      auth
    };

    const data = await sheets("v4").spreadsheets.get(request);

    console.log(JSON.stringify(data, null, 4));
  }
);
