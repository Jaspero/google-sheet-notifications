import * as admin from 'firebase-admin';
import {initializeApp} from 'firebase-admin';
import applicationDefault = admin.credential.applicationDefault;

initializeApp({
  credential: applicationDefault()
});

// Rest
export {authGoogleApi} from './rest/auth-google-api';
export {oAuthCallback} from './rest/o-auth-callback';

// Schedules
export {sendNotifications} from './schedules/send-notifications';
