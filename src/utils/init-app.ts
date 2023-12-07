import { getApps, initializeApp } from "firebase/app";
import { zEnv } from "./env";

export function initApp() {
  if (getApps().length === 0) {
    const firebaseConfig = {
      apiKey: zEnv.NEXT_PUBLIC_API_KEY,
      authDomain: zEnv.NEXT_PUBLIC_AUTH_DOMAIN,
      projectId: zEnv.NEXT_PUBLIC_PROJECT_ID,
      storageBucket: zEnv.NEXT_PUBLIC_STORAGE_BUCKET,
      messagingSenderId: zEnv.NEXT_PUBLIC_MESSAGING_SENDER_ID,
      appId: zEnv.NEXT_PUBLIC_APP_ID,
      measurementId: zEnv.NEXT_PUBLIC_MEASUREMENT_ID,
    };
    initializeApp(firebaseConfig);
  }
}
