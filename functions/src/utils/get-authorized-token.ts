import * as admin from "firebase-admin";
import { functionsOauthClient } from "./o-auth-client";
import { oAuthTokens } from "./o-auth-tokens";

export async function getAuthorizedClient() {
  if (oAuthTokens.data) {
    return functionsOauthClient;
  }

  const snapshot = await admin
    .firestore()
    .collection("settings")
    .doc("tokens")
    .get();

  oAuthTokens.data = snapshot.data();
  functionsOauthClient.setCredentials(oAuthTokens.data);

  return functionsOauthClient;
}
