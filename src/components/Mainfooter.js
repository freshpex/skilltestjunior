import React from 'react';

const MainFooter = () => {
    return (
       <footer className="app-footer">
          <h2>How to use this app</h2>
          <div className="tips-container">
            <div className="tip-card">
              <div className="tip-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <div className="tip-content">
                <h3>Schedule Tasks</h3>
                <p>Click the calendar icon to add tasks with due dates and priority levels</p>
              </div>
            </div>
            <div className="tip-card">
              <div className="tip-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
              </div>
              <div className="tip-content">
                <h3>View Details</h3>
                <p>Click on the task text to expand and view all details</p>
              </div>
            </div>
            <div className="tip-card">
              <div className="tip-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <div className="tip-content">
                <h3>Complete Tasks</h3>
                <p>Click the circle icon on the left to mark tasks as completed</p>
              </div>
            </div>
            <div className="tip-card">
              <div className="tip-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </div>
              <div className="tip-content">
                <h3>Remove Tasks</h3>
                <p>Click the X button to delete a task from your list</p>
              </div>
            </div>
          </div>
        </footer>
    );
};

export default MainFooter;