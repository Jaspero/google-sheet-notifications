import {OAuth2Client} from 'google-auth-library';
import {ENV_CONFIG} from '../consts/env-config.const';

// const FUNCTIONS_REDIRECT = `https://us-central1-jaspero-sheets.cloudfunctions.net/oAuthCallback`;
const FUNCTIONS_REDIRECT = `http://localhost:5000/jaspero-sheets/us-central1/oAuthCallback`;

export const functionsOauthClient = new OAuth2Client(
  ENV_CONFIG.googleapi.client_id,
  ENV_CONFIG.googleapi.client_secret,
  FUNCTIONS_REDIRECT
);
