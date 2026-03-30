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
    setNotices((prev) => [...prev, newNotice]);
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
