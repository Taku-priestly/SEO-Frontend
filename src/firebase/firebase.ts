// src/firebase/firebase.ts

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBnv8QNuBhkY1bQ3kW9YQm_6QT6SaL10yU",
  authDomain: "seo-engine-62f45.firebaseapp.com",
  projectId: "seo-engine-62f45",
  storageBucket: "seo-engine-62f45.firebasestorage.app",
  messagingSenderId: "1086789932546",
  appId: "1:1086789932546:web:416051f55cd2702d9db91b",
  measurementId: "G-476HT7JJE8"
};

const app = initializeApp(firebaseConfig);

getAnalytics(app);

export const auth = getAuth(app);

export const googleProvider =
  new GoogleAuthProvider();

export const githubProvider =
  new GithubAuthProvider();

export default app;