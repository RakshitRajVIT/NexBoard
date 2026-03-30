import React, { useState } from 'react';
import { CATEGORIES } from '../data';

function AdminDashboard({ onCreateNotice }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Academic',
    urgency: 'Normal',
    expiry: '',
    desc: ''
  });
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let mockUploadedUrl = null;
    if (file) {
      await new Promise(r => setTimeout(r, 1500)); // fake network
      mockUploadedUrl = 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=600';
    }

    const newNotice = {
      id: 'n_' + Date.now().toString(),
      ...formData,
      expiry: new Date(formData.expiry).toISOString(),
      attachment: mockUploadedUrl,
      datePosted: new Date().toISOString()
    };

    onCreateNotice(newNotice);
    setIsSubmitting(false);
    setFormData({ title: '', category: 'Academic', urgency: 'Normal', expiry: '', desc: '' });
    setFile(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
            </div>
            <small className="text-muted"><i className="fa-solid fa-circle-info"></i> Files will be uploaded via Cloudinary simulation</small>
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
