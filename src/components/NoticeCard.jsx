import React, { useState } from 'react';

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
}

function NoticeCard({ notice, onClick }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const isExpired = new Date(notice.expiry) < new Date();
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const bgStyle = notice.attachment ? {
    background: `linear-gradient(rgba(10,10,12,0.95), rgba(10,10,12,0.85)), url('${notice.attachment}') center/cover`
  } : {};

  return (
    <article 
      className="notice-card" 
      onClick={() => onClick(notice)} 
      onMouseMove={handleMouseMove}
      style={{
        ...bgStyle,
        '--mouse-x': `${mousePos.x}px`,
        '--mouse-y': `${mousePos.y}px`
      }}
    >
      <div className="card-header">
        <div className="badges">
          <span className={`badge urgency-${notice.urgency.toLowerCase()}`}>{notice.urgency}</span>
          {isExpired && (
            <span className="badge" style={{ background: 'rgba(255,255,255,0.1)', color: '#ccc' }}>
              Archived
            </span>
          )}
        </div>
        <div className={`cat-tag cat-${notice.category}`}>
          <i className="fa-solid fa-tag"></i> {notice.category}
        </div>
      </div>
      
      <h3 className="card-title">{notice.title}</h3>
      <p className="card-desc">{notice.desc}</p>
      
      <div className="card-footer">
        <div className="card-meta">
          <span><i className="fa-regular fa-clock"></i> Posted {formatDate(notice.datePosted)}</span>
          <span style={{ color: isExpired ? 'var(--status-urgent)' : 'var(--text-muted)' }}>
            <i className="fa-regular fa-calendar-xmark"></i> Exp: {formatDate(notice.expiry)}
          </span>
        </div>
        {notice.attachment && (
          <div className="attachment-icon"><i className="fa-solid fa-paperclip"></i></div>
        )}
      </div>
      <div className="card-glow"></div>
    </article>
  );
}

export default NoticeCard;
