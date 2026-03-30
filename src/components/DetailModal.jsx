import React from 'react';

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
}

function DetailModal({ notice, onClose }) {
  const isExpired = new Date(notice.expiry) < new Date();

  return (
    <div className="modal">
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="modal-content glass-panel notice-detail-card" style={{ animation: 'modalSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)', padding: 0 }}>
        <button className="modal-close" onClick={onClose}><i className="fa-solid fa-xmark"></i></button>
        
        <div className="detail-header">
          <div className="badges mb-3" style={{ marginBottom: '1rem' }}>
            <span className={`badge urgency-${notice.urgency.toLowerCase()}`}>{notice.urgency}</span>
            <span className={`cat-tag cat-${notice.category}`}><i className="fa-solid fa-tag"></i> {notice.category}</span>
            {isExpired && (
              <span className="badge" style={{ background: 'rgba(255,255,255,0.1)', color: '#ccc' }}>
                Archived
              </span>
            )}
          </div>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', lineHeight: '1.3' }}>{notice.title}</h2>
          <div className="card-meta">
            <span><i className="fa-regular fa-clock"></i> Posted: {formatDate(notice.datePosted)}</span>
            <span style={{ color: isExpired ? 'var(--status-urgent)' : 'var(--text-muted)' }}>
              <i className="fa-regular fa-calendar-xmark"></i> Expiry: {formatDate(notice.expiry)}
            </span>
          </div>
        </div>
        
        <div className="detail-body">
          <p style={{ whiteSpace: 'pre-wrap' }}>{notice.desc}</p>
          
          {notice.attachment && (
            <div className="detail-attachment">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  <i className="fa-solid fa-paperclip"></i> Attached File
                </span>
                <a href={notice.attachment} target="_blank" rel="noreferrer" className="btn-outline">
                  <i className="fa-solid fa-download"></i> Download
                </a>
              </div>
              <img 
                src={notice.attachment} 
                alt="Attachment Preview" 
                className="attachment-preview" 
                onError={(e) => { e.target.style.display = 'none'; }} 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailModal;
