import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Button from './Button';

const QuickActionButton = () => {
  const [userState, setUserState] = useState({
    currentMission: null,
    lastCompletedStage: null,
    hasActiveMission: false,
    completedMissions: 15
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Load user state from localStorage
    const savedState = localStorage.getItem('neurosparked-user-state');
    if (savedState) {
      setUserState(JSON.parse(savedState));
    }
  }, [location?.pathname]);

  const getActionConfig = () => {
    const currentPath = location?.pathname;
    
    // If user is in progress tracking, show mission actions
    if (currentPath === '/progress-tracking') {
      return {
        primary: {
          label: 'Start New Mission',
          icon: 'Plus',
          action: () => navigate('/mission-dashboard'),
          variant: 'default'
        },
        secondary: [
          {
            label: 'Continue Mission',
            icon: 'Play',
            action: () => navigate('/mission-briefing'),
            disabled: !userState?.hasActiveMission
          },
          {
            label: 'View Dashboard',
            icon: 'Compass',
            action: () => navigate('/mission-dashboard')
          }
        ]
      };
    }
    
    // Mission workflow actions
    switch (currentPath) {
      case '/mission-dashboard':
        return {
          primary: {
            label: 'Start Mission',
            icon: 'ArrowRight',
            action: () => navigate('/mission-briefing'),
            variant: 'default'
          },
          secondary: [
            {
              label: 'View Progress',
              icon: 'TrendingUp',
              action: () => navigate('/progress-tracking')
            }
          ]
        };
        
      case '/mission-briefing':
        return {
          primary: {
            label: 'Enter Workspace',
            icon: 'Lightbulb',
            action: () => navigate('/spark-workspace'),
            variant: 'default'
          },
          secondary: [
            {
              label: 'Back to Dashboard',
              icon: 'ArrowLeft',
              action: () => navigate('/mission-dashboard')
            }
          ]
        };
        
      case '/spark-workspace':
        return {
          primary: {
            label: 'Generate Report',
            icon: 'FileText',
            action: () => navigate('/innovation-report'),
            variant: 'default'
          },
          secondary: [
            {
              label: 'Save Progress',
              icon: 'Save',
              action: () => {
                // Save current progress
                localStorage.setItem('neurosparked-workspace-progress', JSON.stringify({
                  timestamp: new Date()?.toISOString(),
                  stage: 'workspace'
                }));
              }
            }
          ]
        };
        
      case '/innovation-report':
        return {
          primary: {
            label: 'Complete Mission',
            icon: 'Award',
            action: () => {
              // Mark mission as complete and navigate
              navigate('/mission-dashboard');
            },
            variant: 'success'
          },
          secondary: [
            {
              label: 'Back to Workspace',
              icon: 'ArrowLeft',
              action: () => navigate('/spark-workspace')
            }
          ]
        };
        
      default:
        return {
          primary: {
            label: 'View Missions',
            icon: 'Compass',
            action: () => navigate('/mission-dashboard'),
            variant: 'default'
          },
          secondary: []
        };
    }
  };

  const actionConfig = getActionConfig();

  const handlePrimaryAction = () => {
    actionConfig?.primary?.action();
    setIsExpanded(false);
  };

  const handleSecondaryAction = (action) => {
    action();
    setIsExpanded(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Secondary Actions Menu */}
      {isExpanded && actionConfig?.secondary?.length > 0 && (
        <div className="mb-3 space-y-2 animate-fade-in">
          {actionConfig?.secondary?.map((action, index) => (
            <div key={index} className="flex justify-end">
              <Button
                variant="secondary"
                onClick={() => handleSecondaryAction(action?.action)}
                disabled={action?.disabled}
                iconName={action?.icon}
                iconPosition="left"
                iconSize={16}
                className="shadow-elevation-4 px-4 py-2"
              >
                {action?.label}
              </Button>
            </div>
          ))}
        </div>
      )}
      {/* Primary Action Button */}
      <div className="flex items-center space-x-3">
        {/* Expand/Collapse Button */}
        {actionConfig?.secondary?.length > 0 && (
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "X" : "MoreHorizontal"}
            iconSize={20}
            className="w-12 h-12 rounded-full shadow-elevation-4 bg-card"
          />
        )}

        {/* Main Action Button */}
        <Button
          variant={actionConfig?.primary?.variant || "default"}
          onClick={handlePrimaryAction}
          iconName={actionConfig?.primary?.icon}
          iconPosition="left"
          iconSize={18}
          className="shadow-elevation-8 px-6 py-3 text-base font-medium rounded-full hover:scale-105 transition-transform duration-150"
        >
          {actionConfig?.primary?.label}
        </Button>
      </div>
      {/* Mobile Responsive Adjustments */}
      <style jsx>{`
        @media (max-width: 768px) {
          .fixed.bottom-6.right-6 {
            bottom: 5rem;
            right: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default QuickActionButton;