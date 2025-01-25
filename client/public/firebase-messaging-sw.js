importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);
importScripts("/firebase-config.js");

// Initialize Firebase
firebase.initializeApp(self.FIREBASE_CONFIG);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload?.notification?.title || "Test Notification";
  const notificationOptions = {
    body:
      payload?.notification?.body ||
      "This is a test notification from Firebase",
    icon: "/icon.webp",
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

//FIXME: test with devtools:!!!!!
self.addEventListener("push", (event) => {
  console.log("Generic push event triggered:", event);

  let data = {
    title: "DevTools Push Test",
    body: "This is a fallback test notification triggered via DevTools.",
    icon: "/icon.webp",
  };

  try {
    if (event.data) {
      data = event.data.json();
    }
  } catch (error) {
    console.error("Failed to parse push data as JSON:", error);
    if (event.data) {
      data.body = event.data.text();
    }
  }

  const notificationTitle = data.title || "No Title";
  const notificationOptions = {
    body: data.body || "No Body",
    icon: data.icon || "/icon.webp",
  };

  console.log("Notification details:", {
    title: notificationTitle,
    options: notificationOptions,
  });
  self.registration.showNotification(notificationTitle, notificationOptions);
});
