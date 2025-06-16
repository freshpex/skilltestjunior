import React, { useState, useEffect, useRef } from 'react';
import './TaskModal.css';

const TaskModal = ({ isOpen, onClose, onSave }) => {
  const [task, setTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [priority, setPriority] = useState('medium');
  const modalRef = useRef();

  // The minimum should be today (the current date)
  const today = new Date().toISOString().split('T')[0];
  
  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!task.trim()) return;
    
    const createdAt = new Date().toISOString();
    let dueDatetime = null;
    
    if (dueDate) {
      dueDatetime = dueTime 
        ? new Date(`${dueDate}T${dueTime}`) 
        : new Date(`${dueDate}T23:59:59`);
    }
    
    onSave({
      text: task,
      createdAt,
      dueDate: dueDatetime ? dueDatetime.toISOString() : null,
      priority,
      isCompleted: false
    });
    
    // Reset form
    setTask('');
    setDueDate('');
    setDueTime('');
    setPriority('medium');
  };

  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay">
      <div className="task-modal" ref={modalRef}>
        <button className="close-modal" onClick={onClose} aria-label="Close modal">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <h2>Add New Task</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="task">Task Description</label>
            <input
              id="task"
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="What needs to be done?"
              autoFocus
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              id="dueDate"
              type="date"
              value={dueDate}
              min={today}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="dueTime">Due Time</label>
            <input
              id="dueTime"
              type="time"
              value={dueTime}
              onChange={(e) => setDueTime(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <div className="priority-selector">
              <button 
                type="button"
                className={`priority-btn low ${priority === 'low' ? 'active' : ''}`}
                onClick={() => setPriority('low')}
              >
                Low
              </button>
              <button 
                type="button"
                className={`priority-btn medium ${priority === 'medium' ? 'active' : ''}`}
                onClick={() => setPriority('medium')}
              >
                Medium
              </button>
              <button 
                type="button"
                className={`priority-btn high ${priority === 'high' ? 'active' : ''}`}
                onClick={() => setPriority('high')}
              >
                High
              </button>
            </div>
          </div>
          
          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="save-btn">Save Task</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
