import React from 'react';

function TopBar({ title, searchQ, setSearchQ, catF, setCatF, urgF, setUrgF, archiveMode = false }) {
  return (
    <header className="top-bar glass-panel">
      {archiveMode ? (
        <div className="section-title mb-0">
          <h2><i className="fa-solid fa-box-archive text-muted"></i> {title}</h2>
          <p>Search past and expired notices</p>
        </div>
      ) : (
        <div className="search-box">
          <i className="fa-solid fa-search"></i>
          <input 
            type="text" 
            placeholder="Search notices by keyword, title..."
            value={searchQ}
            onChange={(e) => setSearchQ(e.target.value)}
          />
        </div>
      )}

      {/* Show filters even in archive mode if we want, or adjust based on layout. Let's show filters consistently. */}
      {(!archiveMode || archiveMode) && (
        <div className="filters">
          <div className="filter-group">
            <i className="fa-solid fa-list"></i>
            <select value={catF} onChange={(e) => setCatF(e.target.value)} aria-label="Category Filter">
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
            <select value={urgF} onChange={(e) => setUrgF(e.target.value)} aria-label="Urgency Filter">
              <option value="All">Any Urgency</option>
              <option value="Urgent">Urgent</option>
              <option value="Important">Important</option>
              <option value="Normal">Normal</option>
            </select>
          </div>
        </div>
      )}
    </header>
  );
}

export default TopBar;
