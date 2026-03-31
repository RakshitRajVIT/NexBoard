import React, { useState } from 'react';

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
}

function NoticeCard({ notice, onClick, isPinned }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const isExpired = new Date(notice.expiry) < new Date();
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    
    setMousePos({ x, y });
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  const bgStyle = notice.attachment ? {
    background: `linear-gradient(rgba(10,10,12,0.9), rgba(10,10,12,0.7)), url('${notice.attachment}') center/cover`
  } : {};

  return (
    <div style={{ perspective: '1000px' }} className={`notice-card-wrapper ${isPinned ? 'pinned-card-wrapper' : ''}`}>
      <article 
        className={`notice-card ${isHovered ? 'hovered' : ''} ${isPinned ? 'pinned-card' : ''}`} 
        onClick={() => onClick(notice)} 
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          ...bgStyle,
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          '--mouse-x': `${mousePos.x}px`,
          '--mouse-y': `${mousePos.y}px`
        }}
      >
      {isPinned && (
        <div className="pinned-ribbon">
          <i className="fa-solid fa-thumbtack"></i>
          <span>PINNED</span>
        </div>
      )}
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
    </div>
  );
}

export default NoticeCard;
