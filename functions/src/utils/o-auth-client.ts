import { OAuth2Client } from "google-auth-library";
import { ENV_CONFIG } from "../consts/env-config.const";

// The OAuth Callback Redirect.
const FUNCTIONS_REDIRECT = `https://${process.env.GCLOUD_PROJECT}.firebaseapp.com/o-auth-callback`;

export const functionsOauthClient = new OAuth2Client(
  ENV_CONFIG.googleapi.client_id,
  ENV_CONFIG.googleapi.client_secret,
  FUNCTIONS_REDIRECT
);
