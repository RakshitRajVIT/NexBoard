import React, { useState, useMemo } from 'react';
import NoticeCard from './NoticeCard';

function NoticeFeed({ notices, onOpenDetail }) {
  const [searchQ, setSearchQ] = useState('');
  const [catF, setCatF] = useState('All');
  const [urgF, setUrgF] = useState('All');

  const { pinnedNotices, activeNotices } = useMemo(() => {
    const now = new Date();
    const sorted = [...notices].sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted));
    
    const allActive = [];
    sorted.forEach(n => {
      if (new Date(n.expiry) >= now) allActive.push(n);
    });

    const pinned = [];
    const remaining = [];
    allActive.forEach(n => {
      if ((n.urgency === 'Urgent' || n.urgency === 'Important') && pinned.length < 3) {
        pinned.push(n);
      } else {
        remaining.push(n);
      }
    });

    const sQ = searchQ.toLowerCase();
    const active = remaining.filter(n => {
      const matchS = n.title.toLowerCase().includes(sQ) || n.desc.toLowerCase().includes(sQ);
      const matchC = catF === 'All' || n.category === catF;
      const matchU = urgF === 'All' || n.urgency === urgF;
      return matchS && matchC && matchU;
    });

    return { pinnedNotices: pinned, activeNotices: active };
  }, [notices, searchQ, catF, urgF]);

  return (
    <section id="view-feed" className="view-section active">
      <header className="top-bar glass-panel">
        <div className="search-box">
          <i className="fa-solid fa-search"></i>
          <input 
            type="text" 
            placeholder="Search notices by keyword, title..."
            value={searchQ}
            onChange={(e) => setSearchQ(e.target.value)}
          />
        </div>
        <div className="filters">
          <div className="filter-group">
            <i className="fa-solid fa-list"></i>
            <select value={catF} onChange={(e) => setCatF(e.target.value)}>
              <option value="All">All Categories</option>
              <option value="Academic">Academic</option>
              <option value="Placement">Placement</option>
              <option value="Events">Events</option>
              <option value="Scholarships">Scholarships</option>
              <option value="Sports">Sports</option>
              <option value="Hostel">Hostel</option>
              <option value="General">General</option>
            </select>
          </div>
          <div className="filter-group">
            <i className="fa-solid fa-fire"></i>
            <select value={urgF} onChange={(e) => setUrgF(e.target.value)}>
              <option value="All">Any Urgency</option>
              <option value="Urgent">Urgent</option>
              <option value="Important">Important</option>
              <option value="Normal">Normal</option>
            </select>
          </div>
        </div>
      </header>

      <div className="section-title">
        <h2><i className="fa-solid fa-thumbtack text-accent"></i> Pinned Notices</h2>
        <p>Critical campus updates</p>
      </div>
      <div className="pinned-grid">
        {pinnedNotices.length > 0 ? (
          pinnedNotices.map(n => <NoticeCard key={n.id} notice={n} onClick={onOpenDetail} />)
        ) : (
          <div className="empty-state" style={{ padding: '2rem' }}>
            <p>No urgent notices pinned at the moment.</p>
          </div>
        )}
      </div>

      <div className="section-title mt-2">
        <h2><i className="fa-solid fa-stream text-primary"></i> Live Feed</h2>
        <p>Latest campus happenings</p>
      </div>
      <div className="feed-grid">
        {activeNotices.length > 0 ? (
          activeNotices.map(n => <NoticeCard key={n.id} notice={n} onClick={onOpenDetail} />)
        ) : (
          <div className="empty-state">
            <i className="fa-solid fa-wind"></i>
            <h3>It's quiet here</h3>
            <p>No active notices found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default NoticeFeed;
