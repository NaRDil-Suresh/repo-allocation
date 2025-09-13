import React, { useState, useEffect } from 'react';
import './PersonModal.css';

const PersonModal = ({ person, onClose, onSave }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [formData, setFormData] = useState({
    name: person?.name || '',
    email: person?.email || '',
    role: person?.role || 'Member',
    costRate: person?.costRate || 'Rs 0',
    billRate: person?.billRate || 'Rs 0',
    department: person?.department || 'No department',
    tags: person?.tags || '',
    type: person?.type || 'Employee'
  });

  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showDepartmentDropdown, setShowDepartmentDropdown] = useState(false);
  const [showTagsDropdown, setShowTagsDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  const roleOptions = ['Member', 'Team Lead'];
  const departmentOptions = ['Gowtham Team', 'Mohanapriya Team', 'Recekesavan Team', 'Wood'];
  const tagOptions = ['No tags', 'Team-1'];
  const typeOptions = ['Employee', 'Contractor', 'Placeholder'];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  const handleSave = () => {
    onSave(formData);
    handleClose();
  };

  // Cleanup effect to ensure modal is properly closed
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div className={`person-modal-overlay ${isClosing ? 'closing' : ''}`} onClick={handleClose}>
      <div className="person-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="person-header">
          <div className="person-info">
            <div className="person-name">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Name"
                className="name-input"
              />
            </div>
            <div className="person-email">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Email"
                className="email-input"
              />
            </div>
          </div>
          <div className="person-avatar">
            <div className="avatar-placeholder">
              <span>👤</span>
            </div>
          </div>
        </div>

        {/* Info Content - No Tabs */}
        <div className="person-body">
          <div className="info-tab">
            <div className="form-section">
              <label>Role</label>
              <div className="dropdown-input">
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  placeholder="Select role"
                  className="dropdown-field"
                  readOnly
                  onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                />
                <span className="dropdown-arrow">▼</span>
                {showRoleDropdown && (
                  <div className="role-dropdown-menu">
                    {roleOptions.map(option => (
                      <button
                        key={option}
                        className="role-option"
                        onClick={() => {
                          handleInputChange('role', option);
                          setShowRoleDropdown(false);
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="form-section">
              <label>Cost rate</label>
              <div className="rate-input">
                <input
                  type="text"
                  value={formData.costRate}
                  onChange={(e) => handleInputChange('costRate', e.target.value)}
                  className="rate-field"
                />
                <span className="rate-suffix">/hr</span>
              </div>
            </div>

            <div className="form-section">
              <label>Bill rate</label>
              <div className="rate-input">
                <input
                  type="text"
                  value={formData.billRate}
                  onChange={(e) => handleInputChange('billRate', e.target.value)}
                  className="rate-field"
                />
                <span className="rate-suffix">/hr</span>
              </div>
            </div>

            <div className="form-section">
              <label>Department</label>
              <div className="dropdown-input">
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  placeholder="No department"
                  className="dropdown-field"
                  readOnly
                  onClick={() => setShowDepartmentDropdown(!showDepartmentDropdown)}
                />
                <span className="dropdown-arrow">▼</span>
                {showDepartmentDropdown && (
                  <div className="department-dropdown-menu">
                    {departmentOptions.map(option => (
                      <button
                        key={option}
                        className="department-option"
                        onClick={() => {
                          handleInputChange('department', option);
                          setShowDepartmentDropdown(false);
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="form-section">
              <label>Tags</label>
              <div className="dropdown-input">
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => handleInputChange('tags', e.target.value)}
                  placeholder="No tags"
                  className="dropdown-field"
                  readOnly
                  onClick={() => setShowTagsDropdown(!showTagsDropdown)}
                />
                <span className="dropdown-arrow">▼</span>
                {showTagsDropdown && (
                  <div className="tags-dropdown-menu">
                    {tagOptions.map(option => (
                      <button
                        key={option}
                        className="tags-option"
                        onClick={() => {
                          handleInputChange('tags', option);
                          setShowTagsDropdown(false);
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="form-section">
              <label>Type</label>
              <div className="dropdown-input">
                <input
                  type="text"
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="dropdown-field"
                  readOnly
                  onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                />
                <span className="dropdown-arrow">▼</span>
                {showTypeDropdown && (
                  <div className="type-dropdown-menu">
                    {typeOptions.map(option => (
                      <button
                        key={option}
                        className={`type-option ${formData.type === option ? 'selected' : ''}`}
                        onClick={() => {
                          handleInputChange('type', option);
                          setShowTypeDropdown(false);
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="person-footer">
          <button className="add-person-btn" onClick={handleSave}>
            {person ? 'Update person' : 'Add person'}
          </button>
          <button className="cancel-btn" onClick={handleClose}>
            Cancel
          </button>
          {person && (
            <button className="delete-btn" onClick={() => setShowDeleteConfirm(true)}>
              Delete
            </button>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="delete-confirm-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="delete-confirm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="delete-confirm-header">
              <h3>Delete Employee</h3>
            </div>
            <div className="delete-confirm-body">
              <p>Are you sure you want to delete <strong>{person?.name}</strong>?</p>
              <p>This action cannot be undone.</p>
            </div>
            <div className="delete-confirm-footer">
              <button 
                className="delete-confirm-btn" 
                onClick={() => {
                  onSave({ ...person, _delete: true });
                  setShowDeleteConfirm(false);
                }}
              >
                Delete Employee
              </button>
              <button 
                className="cancel-confirm-btn" 
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonModal; 