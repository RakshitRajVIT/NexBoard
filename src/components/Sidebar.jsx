import React from 'react';

function Sidebar({ role, activeTab, setActiveTab, onOpenLogin, onOpenPush }) {
  const isAdmin = role === 'admin';

  return (
    <aside className="sidebar" id="sidebar">
      <div className="logo">
        <div className="logo-icon"><i className="fa-solid fa-bolt"></i></div>
        <h1>NexBoard.</h1>
      </div>

      <nav className="nav-menu">
        <a 
          href="#" 
          className={`nav-item ${activeTab === 'feed' ? 'active' : ''}`} 
          onClick={(e) => { e.preventDefault(); setActiveTab('feed'); }}
        >
          <i className="fa-solid fa-layer-group"></i>
          <span>Notice Feed</span>
        </a>
        <a 
          href="#" 
          className={`nav-item ${activeTab === 'archive' ? 'active' : ''}`} 
          onClick={(e) => { e.preventDefault(); setActiveTab('archive'); }}
        >
          <i className="fa-solid fa-box-archive"></i>
          <span>Archive</span>
        </a>

        {isAdmin && (
          <a 
            href="#" 
            className={`nav-item admin-only ${activeTab === 'admin' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); setActiveTab('admin'); }}
          >
            <i className="fa-solid fa-user-shield"></i>
            <span>Admin Dashboard</span>
          </a>
        )}
      </nav>

      <div className="sidebar-footer">
        <button className="settings-btn" onClick={onOpenPush} aria-label="Push Notifications">
          <i className="fa-solid fa-bell"></i>
          <span>Alerts</span>
        </button>
        <div className="user-profile" onClick={onOpenLogin}>
          <img 
            src={`https://ui-avatars.com/api/?name=${isAdmin ? 'Admin' : 'Student'}&background=${isAdmin ? '6366f1' : '10b981'}&color=fff`} 
            alt="User Profile" 
          />
          <div className="user-info">
            <span className="user-name">{isAdmin ? 'Prof. Admin' : 'Student'}</span>
            <span className="user-role">{isAdmin ? 'Faculty Dashboard' : 'View Only'}</span>
          </div>
          <i className="fa-solid fa-chevron-right"></i>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
