import React, { useState } from 'react';
import './AllocationModal.css';

const AllocationModal = ({ task, person, onClose, onUpdate }) => {
  // Convert date strings to Date objects if they exist
  const processedTask = {
    ...task,
    startDate: task.startDate ? new Date(task.startDate) : null,
    endDate: task.endDate ? new Date(task.endDate) : null
  };

  const [hours, setHours] = useState(task.hours.replace('h', ''));
  const [status, setStatus] = useState(task.status);
  const [notes, setNotes] = useState(task.notes);
  const [project, setProject] = useState(task.project || '');
  const [projectColor, setProjectColor] = useState(task.color || '');
  const [taskTitle, setTaskTitle] = useState(task.title || '');
  const [currentTask, setCurrentTask] = useState(processedTask);
  const [showActionsDropdown, setShowActionsDropdown] = useState(false);
  const [showProjectDropdown, setShowProjectDropdown] = useState(false);
  const [showRepeatDropdown, setShowRepeatDropdown] = useState(false);
  const [repeatOption, setRepeatOption] = useState(task.repeat || 'Doesn\'t repeat');
  
  const isNewTask = !task.id || task.id === Date.now();

  const projectOptions = [
    { id: 1, name: 'Test 1', color: '#00BCD4' }, // Cyan blue
    { id: 2, name: 'Test 2', color: '#FFB6C1' }  // Light pink
  ];

  const repeatOptions = [
    'Doesn\'t repeat',
    'Repeats daily',
    'Repeats weekly'
  ];

  const handleDateClick = (pickerId) => {
    const picker = document.getElementById(pickerId);
    if (picker) {
      picker.showPicker();
    }
  };

  const calculateDuration = (startDate, endDate) => {
    if (!startDate || !endDate) return 1;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Calculate the difference in days
    const timeDiff = end.getTime() - start.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    // Return at least 1 day, or the calculated difference
    return Math.max(1, daysDiff);
  };

  const handleDateChange = (field, value) => {
    const newTask = { ...currentTask };
    
    if (field === 'startDate') {
      newTask.startDate = new Date(value);
    } else if (field === 'endDate') {
      newTask.endDate = new Date(value);
    }
    
    // Calculate and update duration based on date changes
    if (newTask.startDate && newTask.endDate) {
      newTask.duration = calculateDuration(newTask.startDate, newTask.endDate);
    }
    
    setCurrentTask(newTask);
  };

  const handleUpdate = () => {
    // Create the updated task data
    const updatedTask = {
      ...currentTask,
      hours: `${hours}h`,
      status,
      notes,
      project,
      title: taskTitle,
      personId: person.id,
      color: projectColor || person.color, // Use project color if available, otherwise person color
      repeat: repeatOption
    };
    
    // Call the parent's update function
    if (onUpdate) {
      onUpdate(updatedTask);
    }
    
    console.log('Creating allocation:', updatedTask);
    onClose();
  };

  const handleDelete = () => {
    if (onUpdate) {
      onUpdate({ ...currentTask, _delete: true });
    }
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Tabs */}
        <div className="modal-tabs">
          <button className="tab-btn active">Allocation</button>
          <button className="tab-btn">Time off</button>
          <button className="tab-btn">Status</button>
        </div>

        <div className="modal-body">
          {/* Hours Section */}
          <div className="form-section">
            <div className="hours-row">
              <div className="hours-input-group">
                <label>Hours</label>
                <div className="hours-input">
                  <input 
                    type="text" 
                    value={hours} 
                    onChange={(e) => setHours(e.target.value)}
                    className="hours-input-field"
                  />
                  <span className="hours-unit">h/day</span>
                </div>
              </div>
              <div className="total-hours">
                <label>Total hours</label>
                <input 
                  type="text" 
                  value={hours} 
                  onChange={(e) => setHours(e.target.value)}
                  className="total-hours-input"
                />
              </div>
            </div>

            <div className="duration-row">
              <div className="duration-input-group">
                <label>Duration</label>
                <div className="duration-input-container">
                  <input 
                    type="text" 
                    value={currentTask.duration} 
                    onChange={(e) => setCurrentTask({...currentTask, duration: e.target.value})}
                    className="duration-input"
                    readOnly
                  />
                  <span className="duration-unit">working day</span>
                </div>
              </div>
              <div className="date-range">
                <div className="date-input-container">
                  <input 
                    type="text" 
                    value={currentTask.startDate && currentTask.startDate instanceof Date ? currentTask.startDate.toDateString() : ''} 
                    onChange={(e) => setCurrentTask({...currentTask, startDate: new Date(e.target.value)})}
                    className="date-input"
                    placeholder="Select date"
                    readOnly
                    onClick={() => handleDateClick('start-date-picker')}
                  />
                                  <input 
                  type="date" 
                  value={currentTask.startDate && currentTask.startDate instanceof Date ? currentTask.startDate.toISOString().split('T')[0] : ''} 
                  onChange={(e) => handleDateChange('startDate', e.target.value)}
                  className="date-picker-hidden"
                  id="start-date-picker"
                />
                </div>
                <span className="date-arrow">→</span>
                <div className="date-input-container">
                  <input 
                    type="text" 
                    value={currentTask.endDate && currentTask.endDate instanceof Date ? currentTask.endDate.toDateString() : ''} 
                    onChange={(e) => setCurrentTask({...currentTask, endDate: new Date(e.target.value)})}
                    className="date-input"
                    placeholder="Select date"
                    readOnly
                    onClick={() => handleDateClick('end-date-picker')}
                  />
                                  <input 
                  type="date" 
                  value={currentTask.endDate && currentTask.endDate instanceof Date ? currentTask.endDate.toISOString().split('T')[0] : ''} 
                  onChange={(e) => handleDateChange('endDate', e.target.value)}
                  className="date-picker-hidden"
                  id="end-date-picker"
                />
                </div>
              </div>
            </div>
            <div className="repeat-dropdown">
              <input 
                type="text" 
                value={repeatOption} 
                onChange={(e) => {}}
                className="repeat-input"
                readOnly
                onClick={() => setShowRepeatDropdown(!showRepeatDropdown)}
              />
              <span className="dropdown-arrow">▼</span>
              {showRepeatDropdown && (
                <div className="repeat-dropdown-menu">
                  {repeatOptions.map(option => (
                    <button
                      key={option}
                      className="repeat-option"
                      onClick={() => {
                        setRepeatOption(option);
                        setShowRepeatDropdown(false);
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Project Section */}
          <div className="form-section">
            <label>Project</label>
            <div className="project-input">
              <input 
                type="text"
                value={project}
                onChange={(e) => setProject(e.target.value)}
                placeholder="Select project"
                className="project-input-field"
                readOnly
                onClick={() => setShowProjectDropdown(!showProjectDropdown)}
              />
              <span className="dropdown-arrow">▼</span>
              {showProjectDropdown && (
                <div className="project-dropdown">
                  {projectOptions.map(option => (
                    <button
                      key={option.id}
                      className="project-option"
                      onClick={() => {
                        setProject(option.name);
                        setProjectColor(option.color);
                        setShowProjectDropdown(false);
                      }}
                    >
                      <div 
                        className="project-color-indicator" 
                        style={{ backgroundColor: option.color }}
                      ></div>
                      {option.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Task Section */}
          <div className="form-section">
            <label>Task</label>
            <div className="task-input">
              <input 
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="Enter task name"
                className="task-input-field"
              />
            </div>
          </div>

          {/* Notes Section */}
          <div className="form-section">
            <label>Notes</label>
            <textarea 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add details specific to this allocation"
              className="notes-textarea"
            />
          </div>

          {/* Assigned to Section */}
          <div className="form-section">
            <label>Assigned to</label>
            <div className="assigned-tag">
              <span className="assigned-name">{person.name}</span>
              <button className="remove-btn" onClick={() => {}}>×</button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="modal-footer">
          <div className="action-buttons">
            {isNewTask ? (
              <>
                <button className="create-btn" onClick={handleUpdate}>
                  Create allocation
                </button>
                <button className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button className="update-btn" onClick={handleUpdate}>
                  Update allocation
                </button>
                <button className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
                <div className="actions-dropdown-container">
                  <button 
                    className="actions-btn" 
                    onClick={() => setShowActionsDropdown(!showActionsDropdown)}
                  >
                    Actions
                  </button>
                  {showActionsDropdown && (
                    <div className="actions-dropdown">
                      <button className="delete-btn" onClick={handleDelete}>
                        Delete allocation
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllocationModal; 