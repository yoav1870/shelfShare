importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

(async () => {
  try {
    console.log("1", 1);
    const response = await fetch("/firebase-config");
    console.log("response", response);
    const firebaseConfig = await response.json();
    console.log("firebaseConfig", firebaseConfig);

    firebase.initializeApp(firebaseConfig);

    console.log("Firebase initialized with config:", firebaseConfig);
  } catch (error) {
    console.error("Failed to fetch Firebase config:", error);
  }
})();

const messaging = firebase.messaging();

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
