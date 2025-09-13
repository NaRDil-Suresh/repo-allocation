import React, { useState, useEffect } from 'react';
import ProjectModal from './ProjectModal';
import './ProjectPlanSidebar.css';

const ProjectPlanSidebar = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('This month');
  const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [projects, setProjects] = useState([]);

  // Load projects from localStorage on component mount
  useEffect(() => {
    const savedProjects = localStorage.getItem('project-plan-projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      // Set default projects if no saved data
      setProjects([
        {
          id: 1,
          name: '300 Alamitos',
          code: 'W173',
          company: 'EDC',
          peopleCount: 9,
          color: '#8B5CF6', // Purple
          status: 'active'
        },
        {
          id: 2,
          name: 'Alma Apartments',
          code: 'W182',
          company: 'EDC',
          peopleCount: 8,
          color: '#8B5CF6', // Purple
          status: 'active'
        },
        {
          id: 3,
          name: 'Alveare Parkview',
          code: 'W191',
          company: 'EDC',
          peopleCount: 9,
          color: '#8B5CF6', // Purple
          status: 'active'
        },
        {
          id: 4,
          name: 'Arbello',
          code: 'W169',
          company: 'RJP Framing',
          peopleCount: 9,
          color: '#EF4444', // Red
          status: 'active'
        },
        {
          id: 5,
          name: 'Auburn Vista Apartments',
          code: 'W186',
          company: 'Artcad Build',
          peopleCount: 11,
          color: '#EF4444', // Red
          status: 'active'
        },
        {
          id: 6,
          name: 'Dakota Affordable Housing',
          code: 'W187',
          company: 'Artcad Build',
          peopleCount: 11,
          color: '#06B6D4', // Light blue/teal
          status: 'active'
        },
        {
          id: 7,
          name: 'Evado At Taproot',
          code: 'A26',
          company: 'Santee',
          peopleCount: 17,
          color: '#1E40AF', // Dark blue
          status: 'active'
        }
      ]);
    }
  }, []);

  // Save projects to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('project-plan-projects', JSON.stringify(projects));
  }, [projects]);

  const handleCreateProject = (newProject) => {
    setProjects(prev => [...prev, newProject]);
  };

  const periodOptions = ['This month', 'Last month', 'Next month', 'Custom range'];
  const sortOptions = ['Name A-Z', 'Name Z-A', 'People count', 'Date created'];

  return (
    <>
      <div className="project-plan-sidebar">
        <div className="project-plan-header">
          <div className="header-left">
            <button 
              className="icon-btn add-project-btn" 
              title="Add Project"
              onClick={() => setShowProjectModal(true)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"/>
              </svg>
            </button>
            <button 
              className="icon-btn sort-btn" 
              title="Sort"
              onClick={() => setShowSortDropdown(!showSortDropdown)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,18H9V16H3M3,6V8H21V6M3,13H15V11H3V13Z"/>
              </svg>
              {showSortDropdown && (
                <div className="dropdown-menu sort-dropdown">
                  {sortOptions.map((option) => (
                    <div key={option} className="dropdown-option">
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </button>
          </div>
          
          <div className="header-center">
            <button 
              className="period-selector"
              onClick={() => setShowPeriodDropdown(!showPeriodDropdown)}
            >
              {selectedPeriod}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7,10L12,15L17,10H7Z"/>
              </svg>
              {showPeriodDropdown && (
                <div className="dropdown-menu period-dropdown">
                  {periodOptions.map((option) => (
                    <div 
                      key={option} 
                      className="dropdown-option"
                      onClick={() => {
                        setSelectedPeriod(option);
                        setShowPeriodDropdown(false);
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </button>
          </div>
          
          <div className="header-right">
            <div className="total-hours">56h</div>
          </div>
        </div>
        
        <div className="projects-list">
          {projects.map((project) => (
            <div key={project.id} className="project-item">
              <div className="project-color-bar" style={{ backgroundColor: project.color }}></div>
              <div className="project-content">
                <div className="project-info">
                  <div className="project-header">
                    <div className="project-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
                      </svg>
                    </div>
                    <div className="project-name">{project.name}</div>
                  </div>
                  <div className="project-subtitle">
                    {project.code} • {project.company}
                  </div>
                </div>
                
                <div className="project-actions">
                  <div className="project-people">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16,4C16,5.11 15.11,6 14,6A2,2 0 0,1 12,4A2,2 0 0,1 14,2C15.11,2 16,2.89 16,4M20,22V16A2,2 0 0,0 18,14H15A2,2 0 0,0 13,16V22H20M10,22V16A2,2 0 0,0 8,14H5A2,2 0 0,0 3,16V22H10M10,4C10,5.11 9.11,6 8,6A2,2 0 0,1 6,4A2,2 0 0,1 8,2C9.11,2 10,2.89 10,4Z"/>
                    </svg>
                    <span className="people-count">{project.peopleCount}</span>
                  </div>
                  <button className="expand-btn" title="Expand">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7,10L12,15L17,10H7Z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProjectModal
        isOpen={showProjectModal}
        onClose={() => setShowProjectModal(false)}
        onCreateProject={handleCreateProject}
      />
    </>
  );
};

export default ProjectPlanSidebar; 