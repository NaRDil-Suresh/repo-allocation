import React, { useState } from 'react';
import './PeopleSidebar.css';
import PersonModal from './PersonModal';

const PeopleSidebar = ({ teamMembers, onAddTeamMember }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('This week');
  const [totalHours, setTotalHours] = useState('800.5h');
  const [showPersonModal, setShowPersonModal] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);


  const handleAddPerson = (personData) => {
    // Generate initials from name
    const nameParts = personData.name.split(' ');
    const initials = nameParts.length > 1 
      ? nameParts[0][0] + nameParts[nameParts.length - 1][0]
      : nameParts[0].substring(0, 2);
    
    const newPerson = {
      id: Date.now(), // Generate unique ID
      initials: initials.toUpperCase(),
      name: personData.name,
      role: personData.role,
      team: personData.department,
      hours: '0h', // Default hours
      color: '#4A90E2' // Default color
    };
    
    // Add to parent state (which will be saved to localStorage)
    onAddTeamMember(newPerson);
    setShowPersonModal(false);
  };

  const handleUpdatePerson = (personData) => {
    // Check if this is a delete operation
    if (personData._delete) {
      // Remove from parent state (which will be saved to localStorage)
      onAddTeamMember({ ...selectedPerson, _delete: true });
      setShowPersonModal(false);
      setSelectedPerson(null);
      return;
    }

    // Update the person in parent state
    const updatedPerson = {
      ...selectedPerson,
      name: personData.name,
      role: personData.role,
      team: personData.department,
      initials: personData.name.split(' ').length > 1 
        ? personData.name.split(' ')[0][0] + personData.name.split(' ')[personData.name.split(' ').length - 1][0]
        : personData.name.substring(0, 2).toUpperCase()
    };
    
    // For now, we'll need to implement update functionality in the App component
    // For simplicity, we'll just call onAddTeamMember with the updated person
    onAddTeamMember(updatedPerson);
    setShowPersonModal(false);
    setSelectedPerson(null);
  };

  return (
    <div className="people-sidebar">
      {/* Top Bar */}
      <div className="people-header">
        <div className="header-left">
          <button className="icon-btn" onClick={() => setShowPersonModal(true)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
          </button>
          <button className="icon-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"/>
            </svg>
          </button>
        </div>
        
        <div className="header-center">
          <select 
            className="period-selector"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option>This week</option>
            <option>Next week</option>
            <option>Last week</option>
          </select>
        </div>
        
        <div className="header-right">
          <span className="total-hours">{totalHours}</span>
        </div>
      </div>

      {/* People List */}
      <div className="people-list">
        {teamMembers.map((person) => (
          <div 
            key={person.id} 
            className="person-item"
            onClick={() => {
              setSelectedPerson(person);
              setShowPersonModal(true);
            }}
            style={{ cursor: 'pointer' }}
          >
            <div className="person-avatar" style={{ backgroundColor: person.color }}>
              {person.initials}
            </div>
            <div className="person-details">
              <div className="person-name">{person.name}</div>
              <div className="person-team">{person.team}</div>
            </div>
            <div className="person-hours">{person.hours}</div>
          </div>
        ))}
      </div>

      {/* Person Modal */}
      {showPersonModal && (
        <PersonModal
          person={selectedPerson}
          onClose={() => {
            setShowPersonModal(false);
            setSelectedPerson(null);
          }}
          onSave={selectedPerson ? handleUpdatePerson : handleAddPerson}
        />
      )}
    </div>
  );
};

export default PeopleSidebar; 