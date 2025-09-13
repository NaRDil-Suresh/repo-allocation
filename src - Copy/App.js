import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Schedule from './components/Schedule';
import PeopleSidebar from './components/PeopleSidebar';
import ProjectPlanSidebar from './components/ProjectPlanSidebar';
import LoadingPage from './components/LoadingPage';

function App() {
  const [activeTab, setActiveTab] = useState('schedule');
  const [isLoading, setIsLoading] = useState(true);

  // Load team members from localStorage or use default data
  const loadTeamMembersFromStorage = () => {
    const savedTeamMembers = localStorage.getItem('team-members');
    if (savedTeamMembers) {
      return JSON.parse(savedTeamMembers);
    }
    // Return default team members if no saved data
    return [
      {
        id: 1,
        initials: 'RR',
        name: 'Recekesavan R',
        role: 'Team Lead',
        team: 'Recekesavan Team',
        hours: '24h',
        color: '#4A90E2'
      },
      {
        id: 2,
        initials: 'S',
        name: 'Sastha',
        role: '',
        team: 'Recekesavan Team',
        hours: '16.5h',
        color: '#4A90E2'
      },
      {
        id: 3,
        initials: 'J',
        name: 'Jakhir',
        role: '',
        team: 'Recekesavan Team',
        hours: '16h',
        color: '#4A90E2'
      },
      {
        id: 4,
        initials: 'I',
        name: 'Ibrahim',
        role: '',
        team: 'Recekesavan Team',
        hours: '16h',
        color: '#4A90E2'
      },
      {
        id: 5,
        initials: 'RK',
        name: 'Ram kumar',
        role: '',
        team: 'Recekesavan Team',
        hours: '32h',
        color: '#4A90E2'
      }
    ];
  };

  const [teamMembers, setTeamMembers] = useState(loadTeamMembersFromStorage);

  // Save team members to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('team-members', JSON.stringify(teamMembers));
  }, [teamMembers]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleAddTeamMember = (personData) => {
    // Check if this is a delete operation
    if (personData._delete) {
      setTeamMembers(prev => prev.filter(member => member.id !== personData.id));
      return;
    }

    // Check if this is an update operation (person already exists)
    const existingMember = teamMembers.find(member => member.id === personData.id);
    if (existingMember) {
      setTeamMembers(prev => 
        prev.map(member => 
          member.id === personData.id ? personData : member
        )
      );
      return;
    }

    // Generate initials from name
    const nameParts = personData.name.split(' ');
    const initials = nameParts.length > 1 
      ? nameParts[0][0] + nameParts[nameParts.length - 1][0]
      : nameParts[0].substring(0, 2);
    
    const newTeamMember = {
      id: Date.now(), // Generate unique ID
      initials: initials.toUpperCase(),
      name: personData.name,
      role: personData.role,
      team: personData.department,
      hours: '0h', // Default hours
      color: '#4A90E2' // Default color
    };
    
    setTeamMembers(prev => [...prev, newTeamMember]);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'schedule':
        return <Schedule teamMembers={teamMembers} />;
      case 'project-plan':
        return <Schedule teamMembers={teamMembers} />;
      default:
        return <div className="content-placeholder">Select a tab from the sidebar</div>;
    }
  };

  const renderSidebar = () => {
    switch (activeTab) {
      case 'schedule':
        return <PeopleSidebar teamMembers={teamMembers} onAddTeamMember={handleAddTeamMember} />;
      case 'project-plan':
        return <ProjectPlanSidebar />;
      default:
        return <PeopleSidebar teamMembers={teamMembers} onAddTeamMember={handleAddTeamMember} />;
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingPage onLoadingComplete={handleLoadingComplete} />
      ) : (
        <div className="app">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="schedule-layout">
            {renderSidebar()}
            <main className="main-content">
              {renderContent()}
            </main>
          </div>
        </div>
      )}
    </>
  );
}

export default App; 