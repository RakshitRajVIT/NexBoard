import React, { useState } from 'react';

function LoginModal({ onClose, onSelectRole }) {
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [selectedRole, setSelectedRole] = useState('student'); // 'student' or 'admin'
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrorMsg('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (authMode === 'register') {
      if (!formData.name || !formData.email || !formData.password) {
        setErrorMsg('All fields are required.');
        return;
      }
      
      const users = JSON.parse(localStorage.getItem('nexboard_users') || '{}');
      if (users[formData.email]) {
        setErrorMsg('Email already registered. Please log in.');
        return;
      }
      
      users[formData.email] = {
        name: formData.name,
        password: formData.password,
        role: selectedRole
      };
      
      localStorage.setItem('nexboard_users', JSON.stringify(users));
      
      // Auto-login after register
      onSelectRole(selectedRole);
    } else {
      if (!formData.email || !formData.password) {
        setErrorMsg('Please enter email and password.');
        return;
      }
      
      const users = JSON.parse(localStorage.getItem('nexboard_users') || '{}');
      const user = users[formData.email];
      
      if (!user) {
        setErrorMsg('Account not found. Please sign up.');
        return;
      }
      
      if (user.password !== formData.password) {
        setErrorMsg('Incorrect password.');
        return;
      }
      
      if (user.role !== selectedRole) {
        setErrorMsg(`This account is registered as a ${user.role}, not an ${selectedRole}.`);
        return;
      }
      
      // Login Success
      onSelectRole(user.role);
    }
  };

  return (
    <div className="modal">
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="auth-modal-content glass-panel" style={{ animation: 'modalSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}>
        <button className="modal-close" onClick={onClose}><i className="fa-solid fa-xmark"></i></button>
        
        <div className="auth-header">
          <h2>Welcome to NexBoard</h2>
          <p>Sign in to your account or create a new one.</p>
        </div>

        {/* Role Toggle */}
        <div className="role-toggle-container">
          <div 
            className={`role-toggle-btn ${selectedRole === 'student' ? 'active' : ''}`}
            onClick={() => { setSelectedRole('student'); setErrorMsg(''); }}
          >
            <i className="fa-solid fa-user-graduate"></i> Student
          </div>
          <div 
            className={`role-toggle-btn ${selectedRole === 'admin' ? 'active' : ''}`}
            onClick={() => { setSelectedRole('admin'); setErrorMsg(''); }}
          >
            <i className="fa-solid fa-user-shield"></i> Admin
          </div>
        </div>

        {/* Auth Mode Toggle */}
        <div className="auth-mode-tabs">
          <button 
            className={`auth-tab ${authMode === 'login' ? 'active' : ''}`}
            onClick={() => { setAuthMode('login'); setErrorMsg(''); }}
          >
            Sign In
          </button>
          <button 
            className={`auth-tab ${authMode === 'register' ? 'active' : ''}`}
            onClick={() => { setAuthMode('register'); setErrorMsg(''); }}
          >
            Sign Up
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {errorMsg && (
            <div className="auth-error animate-shake">
              <i className="fa-solid fa-circle-exclamation"></i> {errorMsg}
            </div>
          )}

          {authMode === 'register' && (
            <div className="auth-input-group">
              <label>Full Name</label>
              <div className="input-wrapper">
                <i className="fa-regular fa-user"></i>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="John Doe" 
                  value={formData.name} 
                  onChange={handleChange} 
                />
              </div>
            </div>
          )}

          <div className="auth-input-group">
            <label>Email Address</label>
            <div className="input-wrapper">
              <i className="fa-regular fa-envelope"></i>
              <input 
                type="email" 
                name="email" 
                placeholder={selectedRole === 'student' ? "student@college.edu" : "admin@college.edu"} 
                value={formData.email} 
                onChange={handleChange} 
              />
            </div>
          </div>

          <div className="auth-input-group">
            <label>Password</label>
            <div className="input-wrapper">
              <i className="fa-solid fa-lock"></i>
              <input 
                type="password" 
                name="password" 
                placeholder="••••••••" 
                value={formData.password} 
                onChange={handleChange} 
              />
            </div>
          </div>

          <button type="submit" className="auth-submit-btn">
            {authMode === 'login' ? 'Sign In' : 'Create Account'} <i className="fa-solid fa-arrow-right"></i>
          </button>
        </form>
        
        {authMode === 'login' && (
           <div className="auth-footer">
             <a href="#" className="forgot-password">Forgot password?</a>
           </div>
        )}
      </div>
    </div>
  );
}

export default LoginModal;
