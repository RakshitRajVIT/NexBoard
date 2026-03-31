import React, { useState } from 'react';
import { CATEGORIES } from '../data';
import { requestNotificationPermission, isFirebaseConfigured } from '../firebase';

function PushModal({ onClose, subscriptions, setSubscriptions, pushEnabled, setPushEnabled, showToast }) {
  const [localSubs, setLocalSubs] = useState([...subscriptions]);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = (cat) => {
    setLocalSubs(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const handleSave = async () => {
    setIsLoading(true);
    setSubscriptions(localSubs);

    if (!("Notification" in window)) {
      showToast('Error', 'This browser does not support desktop notification', 'error');
      setIsLoading(false);
      onClose();
      return;
    }

    try {
      // Try FCM if configured, otherwise fall back to basic Notification API
      if (isFirebaseConfigured()) {
        const token = await requestNotificationPermission();
        if (token) {
          setPushEnabled(true);
          showToast('Push Enabled!', `FCM registered. Subscribed to ${localSubs.length} categories.`, 'success');
        } else if (Notification.permission === 'denied') {
          showToast('Error', 'Notifications are blocked by the browser', 'error');
        } else {
          showToast('Error', 'Could not enable push notifications', 'error');
        }
      } else {
        // Fallback to basic Notification API
        if (Notification.permission === "granted") {
          setPushEnabled(true);
          showToast('Preferences Saved', `Subscribed to ${localSubs.length} categories.`, 'success');
        } else if (Notification.permission !== "denied") {
          const perm = await Notification.requestPermission();
          if (perm === "granted") {
            setPushEnabled(true);
            showToast('Push Enabled!', `Subscribed to ${localSubs.length} categories.`, 'success');
          } else {
            showToast('Error', 'Notification permission denied', 'error');
          }
        } else {
          showToast('Error', 'Notifications are blocked by the browser', 'error');
        }
      }
    } catch (err) {
      console.error('Push setup error:', err);
      showToast('Error', 'Failed to setup notifications', 'error');
    }

    setIsLoading(false);
    onClose();
  };

  const isGranted = typeof Notification !== 'undefined' && Notification.permission === 'granted' && pushEnabled;
  const isDenied = typeof Notification !== 'undefined' && Notification.permission === 'denied';
  const fcmConfigured = isFirebaseConfigured();

  return (
    <div className="modal">
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="modal-content glass-panel" style={{ animation: 'modalSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}>
        <button className="modal-close" onClick={onClose}><i className="fa-solid fa-xmark"></i></button>
        <div className="modal-header">
          <h3><i className="fa-solid fa-bell text-accent"></i> Subscriptions</h3>
          <p>Subscribe to categories to receive instant browser notifications.</p>
        </div>
        
        {isGranted ? (
          <div className="push-status banner info-banner" style={{ borderColor: 'rgba(16, 185, 129, 0.3)', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
            <i className="fa-solid fa-check-circle"></i> {fcmConfigured ? 'Firebase Cloud Messaging Active' : 'Notifications Enabled (Basic Mode)'}
          </div>
        ) : isDenied ? (
          <div className="push-status banner info-banner" style={{ borderColor: 'rgba(239, 68, 68, 0.3)', backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}>
            <i className="fa-solid fa-ban"></i> Notifications Blocked by Browser
          </div>
        ) : (
          <div className="push-status banner info-banner">
            <i className="fa-solid fa-info-circle"></i> {fcmConfigured ? 'Enable FCM Push Notifications' : 'Enable notifications to stay updated!'}
          </div>
        )}

        <div className="subscription-list">
          {CATEGORIES.map(cat => (
            <div className="sub-item" key={cat}>
              <div className="sub-info">
                <div className="sub-icon text-muted"><i className="fa-solid fa-tag"></i></div>
                <span>{cat}</span>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={localSubs.includes(cat)} 
                  onChange={() => handleToggle(cat)} 
                />
                <span className="slider"></span>
              </label>
            </div>
          ))}
        </div>
        
        <div className="modal-actions">
          <button className="btn-primary w-full" onClick={handleSave} disabled={isLoading}>
            {isLoading ? (
              <><i className="fa-solid fa-spinner fa-spin"></i> Setting up...</>
            ) : (
              'Save Preferences'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PushModal;
