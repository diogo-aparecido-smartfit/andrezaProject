import admin from "firebase-admin";

const firebaseConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
    : process.env.FIREBASE_PRIVATE_KEY,
};

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

const storage = admin.storage();

export const bucket = storage.bucket();
export const db = admin.firestore();
