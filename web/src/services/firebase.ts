/* eslint-disable no-useless-catch */
import { initializeApp } from "firebase/app";

import { Auth, getAuth } from "firebase/auth";
import { firebaseConfig } from "./firebaseConfig";

export const app = initializeApp(firebaseConfig); //initialize firebase app and exports

// auth
export const auth: Auth = getAuth(app);
