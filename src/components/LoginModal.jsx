import React from 'react';

function LoginModal({ onClose, onSelectRole }) {
  return (
    <div className="modal">
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="modal-content glass-panel" style={{ animation: 'modalSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}>
        <button className="modal-close" onClick={onClose}><i className="fa-solid fa-xmark"></i></button>
        <div className="modal-header">
          <h3>Switch Role</h3>
          <p>Simulate logging in as a Student or Admin.</p>
        </div>
        <div className="login-options">
          <button className="role-card" onClick={() => onSelectRole('student')}>
            <div className="role-icon student-icon"><i className="fa-solid fa-user-graduate"></i></div>
            <h4>Student</h4>
            <p>View, search, and subscribe to notices.</p>
          </button>
          <button className="role-card" onClick={() => onSelectRole('admin')}>
            <div className="role-icon admin-icon"><i className="fa-solid fa-user-shield"></i></div>
            <h4>Admin / Faculty</h4>
            <p>Create and manage campus notices.</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
