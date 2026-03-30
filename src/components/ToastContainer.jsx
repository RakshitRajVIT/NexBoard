import React from 'react';

function ToastContainer({ toasts }) {
  return (
    <div className="toast-container" id="toastContainer">
      {toasts.map(t => {
        let icon = 'fa-info-circle';
        let color = 'var(--accent-primary)';
        if(t.type === 'success') { icon = 'fa-check-circle'; color = 'var(--status-success)'; }
        if(t.type === 'error') { icon = 'fa-exclamation-circle'; color = 'var(--status-urgent)'; }

        return (
          <div key={t.id} className="toast" style={{ borderLeftColor: color }}>
            <i className={`fa-solid ${icon} toast-icon`} style={{ color }}></i>
            <div className="toast-content">
              <h4>{t.title}</h4>
              <p>{t.message}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ToastContainer;
