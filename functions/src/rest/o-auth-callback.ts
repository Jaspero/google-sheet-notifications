import {Request} from 'express';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import {constants} from 'http2';
import {functionsOauthClient} from '../utils/o-auth-client';

export const oAuthCallback = functions.https.onRequest(
  async (req: Request, res) => {
    res.set('Cache-Control', 'private, max-age=0, s-maxage=0');
    const code = req.query.code;

    try {
      const {tokens} = await functionsOauthClient.getToken(code);
      await admin
        .firestore()
        .collection('settings')
        .doc('tokens')
        .set(tokens);

      console.log(2222);

      return res
        .status(constants.HTTP_STATUS_OK)
        .send('Authentication complete');
    } catch (error) {
      console.error(error);
      return res.status(constants.HTTP_STATUS_UNAUTHORIZED).send(error);
    }
  }
);
