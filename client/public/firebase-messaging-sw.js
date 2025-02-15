importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

(async () => {
  try {
    // Fetch Firebase configuration from the server
    const response = await fetch(
      "https://shelfshare.onrender.com/firebase-config"
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch Firebase config: ${response.statusText}`
      );
    }
    const firebaseConfig = await response.json();

    // Initialize Firebase with the fetched config
    firebase.initializeApp(firebaseConfig);
  } catch (error) {
    console.error("Failed to fetch or initialize Firebase config:", error);
  }
})();

// Set up Firebase Messaging
let messaging;
try {
  messaging = firebase.messaging();

  messaging.onBackgroundMessage((payload) => {
    console.log("Received background message:", payload);

    const notificationTitle =
      payload.notification?.title || payload.data?.title || "Test Notification";
    const notificationOptions = {
      body:
        payload.notification?.body ||
        payload.data?.body ||
        "This is a test notification from Firebase",
      icon: payload.data?.icon || "/icon.webp",
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });
} catch (error) {
  console.error("Failed to initialize Firebase Messaging:", error);
}

// Handle Push events
self.addEventListener("push", (event) => {
  let data = {};

  try {
    data = event.data.json();
  } catch (e) {
    console.error("Failed to parse push data as JSON:", e);
  }

  const notificationTitle = data.notification?.title || "Default Title";
  const notificationOptions = {
    body: data.notification?.body || "Default Body",
    icon: data.notification?.icon || "/icon.webp",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
