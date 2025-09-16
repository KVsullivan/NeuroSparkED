import React from 'react';
import Icon from '../../../components/AppIcon';

const StageProgress = ({ currentStage, completedStages, onStageClick }) => {
  const stages = [
    { id: 'situation', label: 'Situation', icon: 'Eye', description: 'Understand the challenge' },
    { id: 'plan', label: 'Plan', icon: 'Target', description: 'Develop your strategy' },
    { id: 'action', label: 'Action', icon: 'Zap', description: 'Execute your solution' },
    { id: 'reflection', label: 'Reflection', icon: 'Mirror', description: 'Analyze your approach' },
    { id: 'knowledge', label: 'Knowledge', icon: 'BookOpen', description: 'Capture key learnings' }
  ];

  const getStageStatus = (stageId) => {
    if (completedStages?.includes(stageId)) return 'completed';
    if (stageId === currentStage) return 'current';
    return 'upcoming';
  };

  return (
    <div className="bg-card border-b border-border">
      <div className="px-6 py-4">
        {/* Desktop Progress Bar */}
        <div className="hidden md:flex items-center justify-between">
          {stages?.map((stage, index) => {
            const status = getStageStatus(stage?.id);
            const isClickable = completedStages?.includes(stage?.id) || stage?.id === currentStage;
            
            return (
              <React.Fragment key={stage?.id}>
                <div className="flex flex-col items-center space-y-2">
                  <button
                    onClick={() => isClickable && onStageClick(stage?.id)}
                    disabled={!isClickable}
                    className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-200 ${
                      status === 'completed' 
                        ? 'bg-success border-success hover:scale-105' 
                        : status === 'current' ?'bg-primary border-primary animate-pulse' :'bg-muted border-border'
                    } ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                  >
                    {status === 'completed' ? (
                      <Icon name="Check" size={20} color="white" />
                    ) : (
                      <Icon 
                        name={stage?.icon} 
                        size={20} 
                        color={status === 'current' ? 'white' : 'var(--color-muted-foreground)'} 
                      />
                    )}
                  </button>
                  
                  <div className="text-center">
                    <div className={`text-sm font-medium ${
                      status === 'current' ? 'text-primary' : 
                      status === 'completed'? 'text-success' : 'text-muted-foreground'
                    }`}>
                      {stage?.label}
                    </div>
                    <div className="text-xs text-muted-foreground max-w-20">
                      {stage?.description}
                    </div>
                  </div>
                </div>
                {index < stages?.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    completedStages?.includes(stages?.[index + 1]?.id) || 
                    (completedStages?.includes(stage?.id) && stages?.[index + 1]?.id === currentStage)
                      ? 'bg-success' :'bg-border'
                  }`} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Mobile Progress */}
        <div className="md:hidden">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">SPARK Progress</h2>
            <span className="text-sm text-muted-foreground">
              {completedStages?.length + 1} of {stages?.length}
            </span>
          </div>
          
          <div className="flex items-center space-x-2 mb-4">
            {stages?.map((stage) => {
              const status = getStageStatus(stage?.id);
              return (
                <div
                  key={stage?.id}
                  className={`flex-1 h-2 rounded-full ${
                    status === 'completed' ? 'bg-success' :
                    status === 'current'? 'bg-primary' : 'bg-muted'
                  }`}
                />
              );
            })}
          </div>
          
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
              getStageStatus(currentStage) === 'current' ?'bg-primary border-primary' :'bg-muted border-border'
            }`}>
              <Icon 
                name={stages?.find(s => s?.id === currentStage)?.icon || 'Circle'} 
                size={18} 
                color={getStageStatus(currentStage) === 'current' ? 'white' : 'var(--color-muted-foreground)'} 
              />
            </div>
            <div>
              <div className="text-base font-medium text-foreground">
                {stages?.find(s => s?.id === currentStage)?.label}
              </div>
              <div className="text-sm text-muted-foreground">
                {stages?.find(s => s?.id === currentStage)?.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StageProgress;