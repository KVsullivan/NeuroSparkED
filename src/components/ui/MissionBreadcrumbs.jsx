import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const MissionBreadcrumbs = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const missionStages = [
    {
      path: '/mission-dashboard',
      label: 'Mission Dashboard',
      icon: 'Compass',
      description: 'Discover missions'
    },
    {
      path: '/mission-briefing',
      label: 'Mission Briefing',
      icon: 'FileText',
      description: 'Understand objectives'
    },
    {
      path: '/spark-workspace',
      label: 'SPARK Workspace',
      icon: 'Lightbulb',
      description: 'Execute mission'
    },
    {
      path: '/innovation-report',
      label: 'Innovation Report',
      icon: 'Award',
      description: 'Review results'
    }
  ];

  const currentStageIndex = missionStages?.findIndex(stage => stage?.path === location?.pathname);
  
  // Only show breadcrumbs on mission-related pages
  if (currentStageIndex === -1) {
    return null;
  }

  const handleStageNavigation = (path, index) => {
    // Allow navigation to completed stages and current stage
    if (index <= currentStageIndex) {
      navigate(path);
    }
  };

  const getStageStatus = (index) => {
    if (index < currentStageIndex) return 'completed';
    if (index === currentStageIndex) return 'current';
    return 'upcoming';
  };

  return (
    <div className="bg-card border-b border-border">
      <div className="px-6 py-4">
        {/* Desktop Breadcrumbs */}
        <div className="hidden md:flex items-center space-x-2">
          {missionStages?.map((stage, index) => {
            const status = getStageStatus(index);
            const isClickable = index <= currentStageIndex;
            
            return (
              <React.Fragment key={stage?.path}>
                <div className="flex items-center">
                  <Button
                    variant={status === 'current' ? 'default' : status === 'completed' ? 'secondary' : 'ghost'}
                    onClick={() => isClickable && handleStageNavigation(stage?.path, index)}
                    disabled={!isClickable}
                    iconName={status === 'completed' ? 'CheckCircle' : stage?.icon}
                    iconPosition="left"
                    iconSize={16}
                    className={`px-3 py-2 ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
                  >
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-medium">{stage?.label}</span>
                      <span className="text-xs text-muted-foreground">{stage?.description}</span>
                    </div>
                  </Button>
                  
                  {status === 'completed' && (
                    <div className="ml-2">
                      <Icon name="CheckCircle" size={16} color="var(--color-success)" />
                    </div>
                  )}
                </div>
                {index < missionStages?.length - 1 && (
                  <Icon 
                    name="ChevronRight" 
                    size={16} 
                    color={index < currentStageIndex ? "var(--color-success)" : "var(--color-muted-foreground)"} 
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Mobile Vertical Progress */}
        <div className="md:hidden">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Mission Progress</h2>
            <span className="text-sm text-muted-foreground">
              Step {currentStageIndex + 1} of {missionStages?.length}
            </span>
          </div>
          
          <div className="space-y-3">
            {missionStages?.map((stage, index) => {
              const status = getStageStatus(index);
              const isClickable = index <= currentStageIndex;
              
              return (
                <div key={stage?.path} className="flex items-center space-x-3">
                  {/* Status Indicator */}
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                    status === 'completed' 
                      ? 'bg-success border-success' 
                      : status === 'current' ?'bg-primary border-primary' :'bg-muted border-border'
                  }`}>
                    {status === 'completed' ? (
                      <Icon name="Check" size={16} color="white" />
                    ) : status === 'current' ? (
                      <Icon name={stage?.icon} size={16} color="white" />
                    ) : (
                      <span className="text-xs font-medium text-muted-foreground">{index + 1}</span>
                    )}
                  </div>
                  {/* Stage Info */}
                  <div 
                    className={`flex-1 ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                    onClick={() => isClickable && handleStageNavigation(stage?.path, index)}
                  >
                    <div className={`text-sm font-medium ${
                      status === 'current' ? 'text-primary' : 
                      status === 'completed'? 'text-success' : 'text-muted-foreground'
                    }`}>
                      {stage?.label}
                    </div>
                    <div className="text-xs text-muted-foreground">{stage?.description}</div>
                  </div>
                  {/* Action Button */}
                  {status === 'current' && (
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="ArrowRight"
                      iconPosition="right"
                      iconSize={14}
                    >
                      Continue
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Overall Progress</span>
              <span className="text-sm font-medium text-foreground">
                {Math.round(((currentStageIndex + 1) / missionStages?.length) * 100)}%
              </span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ease-out-custom"
                style={{ width: `${((currentStageIndex + 1) / missionStages?.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionBreadcrumbs;