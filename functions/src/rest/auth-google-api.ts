import * as functions from "firebase-functions";
import { functionsOauthClient } from "../utils/o-auth-client";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

export const authGoogleApi = functions.https.onRequest((req, res) => {
  res.set("Cache-Control", "private, max-age=0, s-maxage=0");
  res.redirect(
    functionsOauthClient.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
      prompt: "consent"
    })
  );
});
