import axios from "axios";

export const firebaseInstance = axios.create({
  baseURL: process.env.FIREBASE_REALTIME_DATABASE
});