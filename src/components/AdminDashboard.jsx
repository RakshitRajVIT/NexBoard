import React, { useState } from 'react';
import { CATEGORIES } from '../data';
import { uploadToCloudinary, isCloudinaryConfigured } from '../cloudinary';

function AdminDashboard({ onCreateNotice }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Academic',
    urgency: 'Normal',
    expiry: '',
    desc: '',
    isPinned: false
  });
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setUploadProgress(0);

    let uploadedUrl = null;
    if (file) {
      const result = await uploadToCloudinary(file, (progress) => {
        setUploadProgress(progress);
      });
      
      if (result.success) {
        uploadedUrl = result.url;
        if (result.demo) {
          console.log('Using demo URL - configure Cloudinary for real uploads');
        }
      } else {
        console.error('Upload failed:', result.error);
      }
    }

    const newNotice = {
      id: 'n_' + Date.now().toString(),
      ...formData,
      expiry: new Date(formData.expiry).toISOString(),
      attachment: uploadedUrl,
      datePosted: new Date().toISOString()
    };

    onCreateNotice(newNotice);
    setIsSubmitting(false);
    setUploadProgress(0);
    setFormData({ title: '', category: 'Academic', urgency: 'Normal', expiry: '', desc: '', isPinned: false });
    setFile(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <section id="view-admin" className="view-section active">
      <header className="top-bar glass-panel">
        <div className="section-title mb-0">
          <h2><i className="fa-solid fa-pen-nib text-accent"></i> Create New Notice</h2>
          <p>Broadcast information across the campus</p>
        </div>
      </header>

      <div className="admin-panel glass-panel">
        <form onSubmit={handleSubmit} className="notice-form">
          
          <div className="form-row">
            <div className="form-group flex-2">
              <label>Notice Title <span className="required">*</span></label>
              <input 
                type="text" 
                name="title"
                required 
                placeholder="Enter a descriptive title" 
                value={formData.title} 
                onChange={handleChange} 
              />
            </div>
            <div className="form-group flex-1">
              <label>Category <span className="required">*</span></label>
              <select name="category" required value={formData.category} onChange={handleChange}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label>Urgency <span className="required">*</span></label>
              <select name="urgency" required value={formData.urgency} onChange={handleChange}>
                <option value="Normal">Normal</option>
                <option value="Important">Important</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
            <div className="form-group flex-1">
              <label>Expiry Date <span className="required">*</span></label>
              <input 
                type="date" 
                name="expiry"
                required 
                value={formData.expiry} 
                onChange={handleChange} 
              />
            </div>
          </div>

          <div className="form-group">
            <label>Full Description <span className="required">*</span></label>
            <textarea 
              name="desc"
              rows="6" 
              required 
              placeholder="Provide all necessary details here..."
              value={formData.desc} 
              onChange={handleChange} 
            ></textarea>
          </div>

          <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)' }}>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem', color: 'var(--text-primary)' }}>
                <i className="fa-solid fa-thumbtack text-accent"></i> Pin this Notice
              </label>
              <span className="text-muted" style={{ fontSize: '0.85rem' }}>Pinned notices stay at the top. Max 3 allowed.</span>
            </div>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                name="isPinned" 
                checked={formData.isPinned} 
                onChange={handleChange} 
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="form-group file-upload-wrapper">
            <label>Attachment (Image/PDF)</label>
            <div 
              className="upload-area"
              onClick={() => document.getElementById('nf').click()}
              onDragOver={(e) => {
                e.preventDefault();
                e.currentTarget.classList.add('dragover');
              }}
              onDragLeave={(e) => e.currentTarget.classList.remove('dragover')}
              onDrop={(e) => {
                e.currentTarget.classList.remove('dragover');
                handleFileDrop(e);
              }}
            >
              <i className="fa-solid fa-cloud-arrow-up"></i>
              <p>Drag & Drop or <span className="text-accent">Browse</span></p>
              <input 
                type="file" 
                id="nf" 
                accept="image/*,.pdf" 
                hidden 
                onChange={(e) => setFile(e.target.files[0])} 
              />
              {file && (
                <p className="file-name" style={{ display: 'block' }}>{file.name}</p>
              )}
              {isSubmitting && file && uploadProgress > 0 && (
                <div className="upload-progress" style={{ marginTop: '0.5rem', width: '100%' }}>
                  <div style={{ 
                    height: '4px', 
                    background: 'rgba(99, 102, 241, 0.2)', 
                    borderRadius: '2px',
                    overflow: 'hidden'
                  }}>
                    <div style={{ 
                      height: '100%', 
                      width: `${uploadProgress}%`, 
                      background: 'var(--accent-primary)',
                      transition: 'width 0.2s ease'
                    }}></div>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                    Uploading... {uploadProgress}%
                  </span>
                </div>
              )}
            </div>
            <small className="text-muted">
              <i className="fa-solid fa-circle-info"></i> {isCloudinaryConfigured() ? 'Files uploaded via Cloudinary' : 'Configure Cloudinary for real uploads (demo mode active)'}
            </small>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary" disabled={isSubmitting}>
              {isSubmitting ? (
                <><i className="fa-solid fa-spinner fa-spin"></i> Broadcasting...</>
              ) : (
                <><span>Broadcast Notice</span> <i className="fa-solid fa-paper-plane"></i></>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AdminDashboard;
