// Firebase Consoleで自分の設定に置き換えてください。
// https://console.firebase.google.com/
// Firestoreを有効化し、Webアプリを登録してください。
export const firebaseConfig = {
  apiKey: "AIzaSyCFE71xtI_9f18WD7eu32i5_3fqYVqpDwk",
  authDomain: "tap-punch-53b0c.firebaseapp.com",
  projectId: "tap-punch-53b0c",
  storageBucket: "tap-punch-53b0c.firebasestorage.app",
  messagingSenderId: "1030421954132",
  appId: "1:1030421954132:web:9155dfdaf7ae3bd537b7c1",
  measurementId: "G-HPNP952F2K"
};
export const firebaseReady = !Object.values(firebaseConfig).some(v => String(v).includes("YOUR_"));
