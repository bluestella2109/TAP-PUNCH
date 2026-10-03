// Firebase Consoleで自分の設定に置き換えてください。
// https://console.firebase.google.com/
// Firestoreを有効化し、Webアプリを登録してください。
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
export const firebaseReady = !Object.values(firebaseConfig).some(v => String(v).includes("YOUR_"));