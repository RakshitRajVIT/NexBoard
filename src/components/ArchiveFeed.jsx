import React, { useState, useMemo } from 'react';
import NoticeCard from './NoticeCard';

function ArchiveFeed({ notices, onOpenDetail }) {
  const [searchQ, setSearchQ] = useState('');

  const archivedNotices = useMemo(() => {
    const now = new Date();
    const sorted = [...notices].sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted));
    
    const expired = sorted.filter(n => new Date(n.expiry) < now);
    
    const sQ = searchQ.toLowerCase();
    return expired.filter(n => n.title.toLowerCase().includes(sQ) || n.desc.toLowerCase().includes(sQ));
  }, [notices, searchQ]);

  return (
    <section id="view-archive" className="view-section active">
      <header className="top-bar glass-panel" style={{ flexWrap: 'wrap', gap: '1rem' }}>
        <div className="section-title mb-0" style={{ flex: '1 1 auto' }}>
          <h2><i className="fa-solid fa-box-archive text-muted"></i> Notice Archive</h2>
          <p>Search past and expired notices</p>
        </div>
        
        <div className="search-box" style={{ flex: '1 1 300px' }}>
          <i className="fa-solid fa-search"></i>
          <input 
            type="text" 
            placeholder="Search archive..."
            value={searchQ}
            onChange={(e) => setSearchQ(e.target.value)}
          />
        </div>
      </header>

      <div className="feed-grid">
        {archivedNotices.length > 0 ? (
          archivedNotices.map(n => <NoticeCard key={n.id} notice={n} onClick={onOpenDetail} />)
        ) : (
          <div className="empty-state">
            <i className="fa-solid fa-box-open"></i>
            <h3>No Archived Notices</h3>
            <p>There are no expired notices matching your search.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default ArchiveFeed;
