import React, { useState } from 'react';
import './ProjectModal.css';

const ProjectModal = ({ isOpen, onClose, onCreateProject }) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    owner: 'NaRDil VC',
    status: 'Confirmed',
    billable: 'Billable',
    client: 'Empty',
    tags: '',
    notes: '',
    managersCanEdit: false
  });
  const [showBudget, setShowBudget] = useState(false);
  const [showTeam, setShowTeam] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submit clicked', formData); // Debugging
    if (formData.name.trim()) {
      const newProject = {
        id: Date.now(),
        name: formData.name,
        code: formData.code,
        company: formData.owner,
        peopleCount: 0,
        color: getRandomProjectColor(),
        status: formData.status,
        billable: formData.billable,
        client: formData.client,
        tags: formData.tags,
        notes: formData.notes,
        managersCanEdit: formData.managersCanEdit
      };
      if (onCreateProject) {
        onCreateProject(newProject);
        console.log('Project created:', newProject); // Debugging
      }
      if (onClose) {
        onClose();
      }
      setFormData({
        name: '',
        code: '',
        owner: 'NaRDil VC',
        status: 'Confirmed',
        billable: 'Billable',
        client: 'Empty',
        tags: '',
        notes: '',
        managersCanEdit: false
      });
    }
  };

  const getRandomProjectColor = () => {
    const colors = ['#8B5CF6', '#EF4444', '#06B6D4', '#1E40AF', '#10B981', '#F59E0B'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="project-modal-overlay" onClick={onClose}>
      <div className="project-modal" onClick={(e) => e.stopPropagation()}>
        <div className="project-modal-header">
          <div className="project-modal-title">
            <div className="project-icon-yellow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Project name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="project-name-input"
            />
          </div>
          <div className="project-modal-actions">
            <button className="templates-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
              </svg>
              Templates
            </button>
            <button className="close-btn" onClick={onClose}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="project-modal-form">
          <div className="form-section">
            <div className="section-header" onClick={() => setShowBudget(!showBudget)}>
              <span>Info</span>
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="currentColor"
                className={`section-arrow ${showBudget ? 'rotated' : ''}`}
              >
                <path d="M7,10L12,15L17,10H7Z"/>
              </svg>
            </div>
            
            <div className="form-fields">
              <div className="form-field">
                <label>Project code</label>
                <input
                  type="text"
                  placeholder="Add project code"
                  value={formData.code}
                  onChange={(e) => handleInputChange('code', e.target.value)}
                />
              </div>

              <div className="form-field">
                <label>Owner</label>
                <div className="dropdown-field">
                  <div className="dropdown-value">
                    <div className="owner-avatar">N</div>
                    <span>{formData.owner}</span>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7,10L12,15L17,10H7Z"/>
                  </svg>
                </div>
              </div>

              <div className="form-field">
                <label>Status</label>
                <div className="dropdown-field">
                  <div className="dropdown-value">
                    <div className="status-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
                      </svg>
                    </div>
                    <span>{formData.status}</span>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7,10L12,15L17,10H7Z"/>
                  </svg>
                </div>
              </div>

              <div className="form-field">
                <label>Billable</label>
                <div className="toggle-buttons">
                  <button
                    type="button"
                    className={`toggle-btn ${formData.billable === 'Billable' ? 'active' : ''}`}
                    onClick={() => handleInputChange('billable', 'Billable')}
                  >
                    Billable
                  </button>
                  <button
                    type="button"
                    className={`toggle-btn ${formData.billable === 'Non-billable' ? 'active' : ''}`}
                    onClick={() => handleInputChange('billable', 'Non-billable')}
                  >
                    Non-billable
                  </button>
                </div>
              </div>

              <div className="form-field">
                <label>Client</label>
                <div className="dropdown-field">
                  <div className="dropdown-value">
                    <span>{formData.client}</span>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7,10L12,15L17,10H7Z"/>
                  </svg>
                </div>
              </div>

              <div className="form-field">
                <label>Tags</label>
                <input
                  type="text"
                  placeholder=""
                  value={formData.tags}
                  onChange={(e) => handleInputChange('tags', e.target.value)}
                />
              </div>

              <div className="form-field">
                <label>Dates</label>
                <button type="button" className="date-add-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"/>
                  </svg>
                </button>
              </div>

              <div className="form-field">
                <label>Notes</label>
                <textarea
                  placeholder=""
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  rows="4"
                />
              </div>

              <div className="checkbox-field">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.managersCanEdit}
                    onChange={(e) => handleInputChange('managersCanEdit', e.target.checked)}
                  />
                  <span className="checkmark"></span>
                  Managers with 'manage projects' permission can edit this project
                </label>
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="section-header" onClick={() => setShowTeam(!showTeam)}>
              <span>Budget</span>
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="currentColor"
                className={`section-arrow ${showTeam ? 'rotated' : ''}`}
              >
                <path d="M7,10L12,15L17,10H7Z"/>
              </svg>
              <button type="button" className="no-budget-btn">No budget</button>
            </div>
          </div>

          <div className="form-section">
            <div className="section-header" onClick={() => setShowTeam(!showTeam)}>
              <span>Team</span>
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="currentColor"
                className={`section-arrow ${showTeam ? 'rotated' : ''}`}
              >
                <path d="M7,10L12,15L17,10H7Z"/>
              </svg>
              <span className="team-count">0</span>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="create-project-btn">
              Create project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal; 