import React, { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import Sidebar from './components/Sidebar';
import NoticeFeed from './components/NoticeFeed';
import ArchiveFeed from './components/ArchiveFeed';
import AdminDashboard from './components/AdminDashboard';
import LoginModal from './components/LoginModal';
import PushModal from './components/PushModal';
import DetailModal from './components/DetailModal';
import ToastContainer from './components/ToastContainer';
import { DUMMY_NOTICES } from './data';
import { onForegroundMessage, isFirebaseConfigured } from './firebase';

function App() {
  // State
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState('student');
  const [notices, setNotices] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [pushEnabled, setPushEnabled] = useState(false);
  const [activeTab, setActiveTab] = useState('feed');
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isPushModalOpen, setPushModalOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Load Initial State
  useEffect(() => {
    const savedNotices = localStorage.getItem('nexboard_notices');
    if (savedNotices) {
      setNotices(JSON.parse(savedNotices));
    } else {
      setNotices(DUMMY_NOTICES);
      localStorage.setItem('nexboard_notices', JSON.stringify(DUMMY_NOTICES));
    }

    const savedRole = localStorage.getItem('nexboard_role');
    if (savedRole) setRole(savedRole);

    const savedSubs = localStorage.getItem('nexboard_subs');
    if (savedSubs) setSubscriptions(JSON.parse(savedSubs));

    const pushAuth = localStorage.getItem('nexboard_push_enabled');
    if (pushAuth === 'true') setPushEnabled(true);

    if (!localStorage.getItem('nexboard_role_selected')) {
      setLoginModalOpen(true);
    }

    // Setup FCM foreground message handler
    if (isFirebaseConfigured()) {
      const unsubscribe = onForegroundMessage((payload) => {
        const title = payload.notification?.title || 'New Notice';
        const body = payload.notification?.body || '';
        showToast(title, body, 'info');
        
        // Also show browser notification if permitted
        if (Notification.permission === 'granted') {
          new Notification(title, {
            body,
            icon: 'https://ui-avatars.com/api/?name=NB&background=6366f1&color=fff'
          });
        }
      });
      return () => unsubscribe();
    }
  }, []);

  // Sync state changes to LocalStorage
  useEffect(() => {
    if (notices.length) localStorage.setItem('nexboard_notices', JSON.stringify(notices));
  }, [notices]);
  useEffect(() => {
    localStorage.setItem('nexboard_role', role);
  }, [role]);
  useEffect(() => {
    localStorage.setItem('nexboard_subs', JSON.stringify(subscriptions));
  }, [subscriptions]);
  useEffect(() => {
    localStorage.setItem('nexboard_push_enabled', pushEnabled);
  }, [pushEnabled]);

  // Handlers
  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setLoginModalOpen(false);
    localStorage.setItem('nexboard_role_selected', 'true');
    showToast('Role Switched', `You are now interacting as ${newRole === 'admin' ? 'Admin' : 'Student'}`, 'success');
    if (newRole !== 'admin' && activeTab === 'admin') setActiveTab('feed');
  };

  const showToast = (title, message, type = 'info') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleCreateNotice = (newNotice) => {
    setNotices((prev) => {
      let updatedNotices = [...prev];
      if (newNotice.isPinned) {
         // Gather all active pinned notices
         const activePinned = updatedNotices.filter(n => n.isPinned && new Date(n.expiry) >= new Date());
         if (activePinned.length >= 3) {
           // sort by oldest posted date
           activePinned.sort((a,b) => new Date(a.datePosted) - new Date(b.datePosted));
           // unpin the oldest ones so only 2 remain (making room for the new 1)
           const overLimitCount = activePinned.length - 2;
           const oldestToUnpin = activePinned.slice(0, overLimitCount);
           const idsToUnpin = oldestToUnpin.map(n => n.id);
           updatedNotices = updatedNotices.map(n => idsToUnpin.includes(n.id) ? { ...n, isPinned: false } : n);
         }
      }
      return [...updatedNotices, newNotice];
    });
    showToast('Success', 'Notice broadcasted successfully.', 'success');
    
    // Simulate push
    if (subscriptions.includes(newNotice.category)) {
      if (Notification.permission === 'granted' && pushEnabled) {
        new Notification(`NexBoard: New ${newNotice.category} Alert`, {
          body: newNotice.title,
          icon: 'https://ui-avatars.com/api/?name=Alert&background=6366f1&color=fff'
        });
      }
      showToast(`New Alert: ${newNotice.category}`, newNotice.title, 'info');
    }

    setActiveTab('feed');
  };

  if (loading) {
    return <SplashScreen onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="app-layout">
      {/* Backgrounds */}
      <div className="bg-gradient"></div>
      <div className="bg-noise"></div>

      <Sidebar 
        role={role} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenLogin={() => setLoginModalOpen(true)}
        onOpenPush={() => setPushModalOpen(true)}
      />

      <main className="main-content">
        {activeTab === 'feed' && (
          <NoticeFeed notices={notices} onOpenDetail={setSelectedNotice} />
        )}
        {activeTab === 'archive' && (
           <ArchiveFeed notices={notices} onOpenDetail={setSelectedNotice} />
        )}
        {activeTab === 'admin' && role === 'admin' && (
          <AdminDashboard onCreateNotice={handleCreateNotice} />
        )}
      </main>

      {/* Modals */}
      {isLoginModalOpen && <LoginModal onClose={() => setLoginModalOpen(false)} onSelectRole={handleRoleChange} />}
      {isPushModalOpen && (
        <PushModal 
          onClose={() => setPushModalOpen(false)} 
          subscriptions={subscriptions}
          setSubscriptions={setSubscriptions}
          pushEnabled={pushEnabled}
          setPushEnabled={setPushEnabled}
          showToast={showToast}
        />
      )}
      {selectedNotice && (
        <DetailModal notice={selectedNotice} onClose={() => setSelectedNotice(null)} />
      )}

      <ToastContainer toasts={toasts} />
    </div>
  );
}

export default App;
