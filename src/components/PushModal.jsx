import React, { useState } from 'react';
import { CATEGORIES } from '../data';

function PushModal({ onClose, subscriptions, setSubscriptions, pushEnabled, setPushEnabled, showToast }) {
  const [localSubs, setLocalSubs] = useState([...subscriptions]);

  const handleToggle = (cat) => {
    setLocalSubs(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const handleSave = async () => {
    setSubscriptions(localSubs);

    if (!("Notification" in window)) {
      showToast('Error', 'This browser does not support desktop notification', 'error');
      onClose();
      return;
    }

    if (Notification.permission === "granted") {
      setPushEnabled(true);
      showToast('Preferences Saved', `Subscribed to ${localSubs.length} categories.`, 'success');
      onClose();
    } else if (Notification.permission !== "denied") {
      const perm = await Notification.requestPermission();
      if (perm === "granted") {
        setPushEnabled(true);
        showToast('Push Enabled!', `Subscribed to ${localSubs.length} categories.`, 'success');
        onClose();
      } else {
        showToast('Error', 'Notification permission denied', 'error');
        onClose();
      }
    } else {
      showToast('Error', 'Notifications are blocked by the browser', 'error');
      onClose();
    }
  };

  const isGranted = typeof Notification !== 'undefined' && Notification.permission === 'granted' && pushEnabled;
  const isDenied = typeof Notification !== 'undefined' && Notification.permission === 'denied';

  return (
    <div className="modal">
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="modal-content glass-panel" style={{ animation: 'modalSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}>
        <button className="modal-close" onClick={onClose}><i className="fa-solid fa-xmark"></i></button>
        <div className="modal-header">
          <h3><i className="fa-solid fa-bell text-accent"></i> Push Alerts</h3>
          <p>Subscribe to categories to receive instant browser notifications.</p>
        </div>
        
        {isGranted ? (
          <div className="push-status banner info-banner" style={{ borderColor: 'rgba(16, 185, 129, 0.3)', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
            <i className="fa-solid fa-check-circle"></i> Service Worker & Push Enabled
          </div>
        ) : isDenied ? (
          <div className="push-status banner info-banner" style={{ borderColor: 'rgba(239, 68, 68, 0.3)', backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}>
            <i className="fa-solid fa-ban"></i> Notifications Blocked by Browser
          </div>
        ) : (
          <div className="push-status banner info-banner">
            <i className="fa-solid fa-info-circle"></i> Enable notifications to stay updated!
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
          <button className="btn-primary w-full" onClick={handleSave}>Save Preferences</button>
        </div>
      </div>
    </div>
  );
}

export default PushModal;
