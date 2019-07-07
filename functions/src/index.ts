import { initializeApp } from "firebase-admin";

initializeApp();

// Rest
export { authGoogleApi } from "./rest/auth-google-api";
export { oAuthCallback } from "./rest/o-auth-callback";

// Schedules
export { sendNotifications } from "./schedules/send-notifications";
