import React, { useState, useEffect } from 'react';
import './Schedule.css';
import AllocationModal from './AllocationModal';

const Schedule = ({ teamMembers }) => {
  const [selectedTeam, setSelectedTeam] = useState('This week');
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);




  // Generate weeks of data (past and future)
  const generateWeeks = (startDate, numWeeks) => {
    const weeks = [];
    const currentDate = new Date(startDate);
    
    for (let i = 0; i < numWeeks; i++) {
      const week = [];
      const weekStart = new Date(currentDate);
      weekStart.setDate(currentDate.getDate() - (currentDate.getDay() - 1)); // Start from Monday
      
      for (let j = 0; j < 7; j++) {
        const day = new Date(weekStart);
        day.setDate(weekStart.getDate() + j);
        week.push(day);
      }
      weeks.push(week);
      currentDate.setDate(currentDate.getDate() + 7);
    }
    
    return weeks;
  };

  // Generate 52 weeks (1 year) of data
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 26 * 7); // Start 26 weeks ago
  const allWeeks = generateWeeks(startDate, 52);
  const [currentWeekIndex, setCurrentWeekIndex] = useState(26); // Start at current week



  // Load tasks from localStorage or use default data
  const loadTasksFromStorage = () => {
    const savedTasks = localStorage.getItem('schedule-tasks');
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    // Return default tasks if no saved data
    return [
    {
      id: 1,
      personId: 1,
      weekIndex: 26,
      dayIndex: 2, // Wednesday
      title: 'Submittal d Auburn Vist',
      hours: '4h',
      color: '#F44336',
      project: 'Artcad Builders / Auburn Vista Apartments',
      status: 'tentative',
      notes: 'Submittal documentation for Auburn Vista project',
      startDate: '30 Jul 2025',
      endDate: '30 Jul 2025',
      duration: '1 working day'
    },
    {
      id: 2,
      personId: 1,
      weekIndex: 26,
      dayIndex: 2,
      title: 'No Task Dakota Affo',
      hours: '4h',
      color: '#4CAF50',
      project: 'Dakota Affo Project',
      status: 'completed',
      notes: 'General project work',
      startDate: '30 Jul 2025',
      endDate: '30 Jul 2025',
      duration: '1 working day'
    },
    {
      id: 3,
      personId: 2,
      weekIndex: 26,
      dayIndex: 0,
      title: 'Level 3 - Ai Sand Canyc EDC',
      hours: '7.5h',
      color: '#FFE0B2',
      project: 'Sand Canyon Plaza EDC',
      status: 'tentative',
      notes: 'Level 3 design work for Sand Canyon project',
      startDate: '28 Jul 2025',
      endDate: '28 Jul 2025',
      duration: '1 working day'
    },
    {
      id: 4,
      personId: 2,
      weekIndex: 26,
      dayIndex: 1,
      title: 'Level 3 - Ai Sand Canyc EDC',
      hours: '8h',
      color: '#FFE0B2',
      project: 'Sand Canyon Plaza EDC',
      status: 'tentative',
      notes: 'Level 3 design work for Sand Canyon project',
      startDate: '29 Jul 2025',
      endDate: '29 Jul 2025',
      duration: '1 working day'
    },
    {
      id: 5,
      personId: 2,
      weekIndex: 26,
      dayIndex: 2,
      title: 'Level 3 - Ai Sand Canyc EDC',
      hours: '8h',
      color: '#FFE0B2',
      project: 'Sand Canyon Plaza EDC',
      status: 'tentative',
      notes: 'Level 3 design work for Sand Canyon project',
      startDate: '30 Jul 2025',
      endDate: '30 Jul 2025',
      duration: '1 working day'
    },
    {
      id: 6,
      personId: 3,
      weekIndex: 26,
      dayIndex: 3,
      title: 'No Task Sand Canyon Plaza EDC',
      hours: '8h',
      color: '#FFE0B2',
      project: 'Sand Canyon Plaza EDC',
      status: 'tentative',
      notes: 'General project work for Sand Canyon',
      startDate: '31 Jul 2025',
      endDate: '31 Jul 2025',
      duration: '1 working day'
    },
    {
      id: 7,
      personId: 3,
      weekIndex: 26,
      dayIndex: 4,
      title: 'No Task Sand Canyc EDC',
      hours: '8h',
      color: '#FFE0B2',
      project: 'Sand Canyon Plaza EDC',
      status: 'tentative',
      notes: 'General project work for Sand Canyon',
      startDate: '1 Aug 2025',
      endDate: '1 Aug 2025',
      duration: '1 working day'
    },
    {
      id: 8,
      personId: 4,
      weekIndex: 26,
      dayIndex: 0,
      title: 'Level 3 - Ai Sand Canyc EDC',
      hours: '8h',
      color: '#FFE0B2',
      project: 'Sand Canyon Plaza EDC',
      status: 'tentative',
      notes: 'Level 3 design work for Sand Canyon project',
      startDate: '28 Jul 2025',
      endDate: '28 Jul 2025',
      duration: '1 working day'
    },
    {
      id: 9,
      personId: 4,
      weekIndex: 26,
      dayIndex: 1,
      title: 'Level 3 - Ai Sand Canyc EDC',
      hours: '8h',
      color: '#FFE0B2',
      project: 'Sand Canyon Plaza EDC',
      status: 'tentative',
      notes: 'Level 3 design work for Sand Canyon project',
      startDate: '29 Jul 2025',
      endDate: '29 Jul 2025',
      duration: '1 working day'
    },
    {
      id: 10,
      personId: 4,
      weekIndex: 26,
      dayIndex: 2,
      title: 'Level 3 - Ai Sand Canyc EDC',
      hours: '8h',
      color: '#FFE0B2',
      project: 'Sand Canyon Plaza EDC',
      status: 'tentative',
      notes: 'Level 3 design work for Sand Canyon project',
      startDate: '30 Jul 2025',
      endDate: '30 Jul 2025',
      duration: '1 working day'
    }
  ];
  };

  const [tasks, setTasks] = useState(loadTasksFromStorage());

  const getTasksForPersonAndDay = (personId, weekIndex, dayIndex) => {
    return tasks.filter(task => 
      task.personId === personId && 
      task.weekIndex === weekIndex && 
      task.dayIndex === dayIndex
    );
  };

  const formatDay = (date) => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const dayName = days[date.getDay() === 0 ? 6 : date.getDay() - 1];
    const dayNumber = date.getDate();
    return `${dayName} ${dayNumber}`;
  };

  const formatMonthRange = () => {
    const currentWeek = allWeeks[currentWeekIndex];
    const firstDay = currentWeek[0];
    const lastDay = currentWeek[6];
    
    const firstMonth = firstDay.toLocaleDateString('en-US', { month: 'short' });
    const lastMonth = lastDay.toLocaleDateString('en-US', { month: 'short' });
    
    if (firstMonth === lastMonth) {
      return firstMonth;
    }
    return `${firstMonth} - ${lastMonth}`;
  };

  const getCurrentDay = () => {
    const today = new Date();
    const currentWeek = allWeeks[currentWeekIndex];
    const todayIndex = currentWeek.findIndex(day => 
      day.toDateString() === today.toDateString()
    );
    
    if (todayIndex !== -1) {
      return formatDay(currentWeek[todayIndex]);
    }
    return null;
  };

  const navigateWeek = (direction) => {
    const newIndex = currentWeekIndex + direction;
    if (newIndex >= 0 && newIndex < allWeeks.length) {
      setCurrentWeekIndex(newIndex);
    }
  };

  const goToToday = () => {
    setCurrentWeekIndex(26); // Current week index
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleEmptyCellClick = (personId, weekIndex, dayIndex, day) => {
    const newTask = {
      id: Date.now(), // Generate unique ID
      personId: personId,
      weekIndex: weekIndex,
      dayIndex: dayIndex,
      title: '',
      hours: '10h',
      color: '#FF6B6B',
      project: '',
      status: 'pending',
      notes: '',
      startDate: day,
      endDate: day,
      duration: 1
    };
    setSelectedTask(newTask);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTask(null);
  };

  const handleTaskUpdate = (updatedTask) => {
    setTasks(prevTasks => {
      let newTasks;
      
      // Handle delete
      if (updatedTask._delete) {
        newTasks = prevTasks.filter(task => task.id !== updatedTask.id);
      }
      // If it's a new task (no existing id), add it
      else if (!updatedTask.id || !prevTasks.find(t => t.id === updatedTask.id)) {
        newTasks = [...prevTasks, updatedTask];
      }
      // Otherwise update existing task
      else {
        newTasks = prevTasks.map(task => 
          task.id === updatedTask.id ? updatedTask : task
        );
      }
      
      // Save to localStorage
      localStorage.setItem('schedule-tasks', JSON.stringify(newTasks));
      return newTasks;
    });
  };

  const currentWeek = allWeeks[currentWeekIndex];
  const currentDay = getCurrentDay();

  return (
    <div className="schedule-container">
      {/* Header */}
      <div className="schedule-header">
        <div className="header-left">
          {/* Left side empty for balance */}
        </div>
        
        <div className="header-center">
          <h2>{formatMonthRange()}</h2>
          {currentDay && <span className="current-day">{currentDay}</span>}
        </div>
        
        <div className="header-right">
          <button className="nav-btn" onClick={() => navigateWeek(-1)}>←</button>
          <button className="nav-btn" onClick={() => navigateWeek(1)}>→</button>
          <button className="today-btn" onClick={goToToday}>Today</button>
        </div>
      </div>

      {/* Schedule Grid */}
      <div className="schedule-grid">
        {/* Days Header */}
        <div className="days-header">
          {currentWeek.map((day, index) => (
            <div key={index} className="day-header">
              {formatDay(day)}
            </div>
          ))}
        </div>

        {/* People Rows */}
        {teamMembers && teamMembers.length > 0 ? (
          teamMembers.map((person, index) => (
            <div key={person.id} className="person-row">
              {/* Task Blocks */}
              {currentWeek.map((day, dayIndex) => (
                <div 
                  key={dayIndex} 
                  className="day-cell"
                  onClick={() => handleEmptyCellClick(person.id, currentWeekIndex, dayIndex, day)}
                >
                  {getTasksForPersonAndDay(person.id, currentWeekIndex, dayIndex).map((task) => (
                    <div 
                      key={task.id} 
                      className="task-block"
                      style={{ backgroundColor: task.color }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTaskClick(task);
                      }}
                    >
                      <div className="task-title">{task.title}</div>
                      <div className="task-hours">{task.hours}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="no-team-members">No team members available</div>
        )}
      </div>





      {/* Allocation Modal */}
      {showModal && selectedTask && (
        <AllocationModal 
          task={selectedTask}
          person={teamMembers.find(p => p.id === selectedTask.personId)}
          onClose={closeModal}
          onUpdate={handleTaskUpdate}
        />
      )}


    </div>
  );
};

export default Schedule; 