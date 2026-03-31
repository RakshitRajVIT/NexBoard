// Firebase Configuration for NexBoard
// =====================================
// IMPORTANT: Replace the placeholder values below with your actual Firebase project credentials
// Get these from: Firebase Console > Project Settings > General > Your apps > Web app

import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// TODO: Replace with your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnHIcvixGMqa6liRtEQAWzrA9QPhCYZCc",
  authDomain: "nexboard-efa29.firebaseapp.com",
  projectId: "nexboard-efa29",
  storageBucket: "nexboard-efa29.firebasestorage.app",
  messagingSenderId: "983297649211",
  appId: "1:983297649211:web:c04b4034bfc3997a080a1e",
  measurementId: "G-2ZYZ15FP4C"
};

// TODO: Replace with your VAPID key from Firebase Console > Project Settings > Cloud Messaging > Web Push certificates
const VAPID_KEY = "BC7AZDgxq029I3mVvE7AyNEuRwLVhdjvB0_JCwb8Ej2gLK1ZRt1mWVnIpH-qTfFrwlfb7XfRqM_rYVV7M8DsJ8A";

// Initialize Firebase
let app;
let messaging;

try {
  app = initializeApp(firebaseConfig);
  // Only initialize messaging if supported (requires HTTPS or localhost)
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    messaging = getMessaging(app);
  }
} catch (error) {
  console.warn('Firebase initialization error:', error);
}

// Request permission and get FCM token
export async function requestNotificationPermission() {
  if (!messaging) {
    console.warn('Firebase Messaging not available');
    return null;
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.log('Notification permission denied');
      return null;
    }

    // Register service worker
    const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
    
    // Get FCM token
    const token = await getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: registration
    });

    if (token) {
      console.log('FCM Token:', token);
      // Store token locally (in production, you'd send this to your backend)
      localStorage.setItem('nexboard_fcm_token', token);
      return token;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
}

// Listen for foreground messages
export function onForegroundMessage(callback) {
  if (!messaging) return () => {};
  
  return onMessage(messaging, (payload) => {
    console.log('Foreground message received:', payload);
    callback(payload);
  });
}

// Check if Firebase is properly configured
export function isFirebaseConfigured() {
  return firebaseConfig.apiKey !== "YOUR_API_KEY" && VAPID_KEY !== "YOUR_VAPID_KEY";
}

export { messaging };
