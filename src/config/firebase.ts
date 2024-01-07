import * as admin from "firebase-admin";
import { ServiceAccount } from "firebase-admin";

const adminConfig: ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

export const firebaseAdmin: admin.app.App = admin.initializeApp({
  credential: admin.credential.cert(adminConfig),
//  databaseURL: process.env.FIREBASE_DATABASE_URL,
});
