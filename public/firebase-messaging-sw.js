// Firebase Messaging Service Worker
// ==================================
// This service worker handles background push notifications

importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

// TODO: Replace with your Firebase config (same as in src/firebase.js)
firebase.initializeApp({
  apiKey: "AIzaSyBnHIcvixGMqa6liRtEQAWzrA9QPhCYZCc",
  authDomain: "nexboard-efa29.firebaseapp.com",
  projectId: "nexboard-efa29",
  storageBucket: "nexboard-efa29.firebasestorage.app",
  messagingSenderId: "983297649211",
  appId: "1:983297649211:web:c04b4034bfc3997a080a1e"
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[SW] Background message received:', payload);

  const notificationTitle = payload.notification?.title || 'NexBoard Alert';
  const notificationOptions = {
    body: payload.notification?.body || 'You have a new notification',
    icon: payload.notification?.icon || 'https://ui-avatars.com/api/?name=NB&background=6366f1&color=fff&size=192',
    badge: 'https://ui-avatars.com/api/?name=NB&background=6366f1&color=fff&size=72',
    tag: payload.data?.tag || 'nexboard-notification',
    data: payload.data,
    vibrate: [200, 100, 200],
    actions: [
      { action: 'open', title: 'View Notice' },
      { action: 'dismiss', title: 'Dismiss' }
    ]
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification click:', event.action);
  event.notification.close();

  if (event.action === 'dismiss') return;

  // Open the app when notification is clicked
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // If app is already open, focus it
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          return client.focus();
        }
      }
      // Otherwise open new window
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});
