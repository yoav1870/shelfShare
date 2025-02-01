importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);
importScripts("/firebase-config.js");

// Initialize Firebase
firebase.initializeApp(self.FIREBASE_CONFIG);
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
  const data = event.data.json();

  const notificationTitle =
    data.notification?.title || data.title || "Book Available!";
  const notificationOptions = {
    body:
      data.notification?.body ||
      data.body ||
      "A book from your wishlist is now available.",
    icon: data.icon || "/icon.webp",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
