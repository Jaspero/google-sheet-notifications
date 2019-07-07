import * as functions from 'firebase-functions';

export const ENV_CONFIG = functions.config() as {
  sendgrid: {
    token: string;
  };
  googleapi: {
    client_id: string;
    client_secret: string;
    sheet_id: string;
  };
  email: {
    from: string;
  };
};
