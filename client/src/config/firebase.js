import axios from "axios";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase App
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

// Function to request notification permission and get token
export const requestPermission = async (userId) => {
  if (Notification.permission === "denied") {
    console.log("Notifications are blocked by the user.");
    return;
  }

  console.log("Requesting notification permission...");
  try {
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    });
    if (token) {
      console.log("FCM Token:", token);
      await saveTokenToBackend(userId, token);
    } else {
      console.log(
        "No registration token available. Request permission to generate one."
      );
    }
  } catch (error) {
    console.error("Error while retrieving token:", error);
  }
};

const saveTokenToBackend = async (userId, token) => {
  try {
    const baseUrl = `${import.meta.env.VITE_SERVER_URI}/api/user`;
    const data = { userId, fcmToken: token };

    const response = await axios.post(`${baseUrl}/save-token`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.ok) {
      console.log("FCM token saved to backend successfully.");
    } else {
      console.error("Failed to save FCM token to backend.");
      console.error("Response:", response);
    }
  } catch (error) {
    console.error("Error while saving FCM token to backend:", error);
  }
};

export default firebaseApp;
