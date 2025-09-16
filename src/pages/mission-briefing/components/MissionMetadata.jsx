import React from 'react';
import Icon from '../../../components/AppIcon';

const MissionMetadata = ({ mission }) => {
  const difficultyConfig = {
    beginner: { color: 'text-success', bg: 'bg-success/10', icon: 'Star' },
    intermediate: { color: 'text-warning', bg: 'bg-warning/10', icon: 'TrendingUp' },
    advanced: { color: 'text-error', bg: 'bg-error/10', icon: 'Zap' }
  };

  const difficulty = difficultyConfig?.[mission?.difficulty] || difficultyConfig?.beginner;

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Mission Details</h3>
      <div className="space-y-4">
        {/* Difficulty */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Difficulty</span>
          <div className={`flex items-center space-x-2 ${difficulty?.bg} px-3 py-1 rounded-full`}>
            <Icon name={difficulty?.icon} size={14} color={`var(--color-${mission?.difficulty === 'beginner' ? 'success' : mission?.difficulty === 'intermediate' ? 'warning' : 'error'})`} />
            <span className={`text-sm font-medium ${difficulty?.color} capitalize`}>
              {mission?.difficulty}
            </span>
          </div>
        </div>
        
        {/* Estimated Time */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Estimated Time</span>
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={14} color="var(--color-muted-foreground)" />
            <span className="text-sm font-medium text-foreground">{mission?.estimatedTime}</span>
          </div>
        </div>
        
        {/* XP Reward */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">XP Reward</span>
          <div className="flex items-center space-x-2">
            <Icon name="Zap" size={14} color="var(--color-accent)" />
            <span className="text-sm font-medium text-accent">{mission?.xpReward} XP</span>
          </div>
        </div>
        
        {/* Prerequisites */}
        <div>
          <span className="text-sm text-muted-foreground mb-2 block">Prerequisites</span>
          <div className="space-y-2">
            {mission?.prerequisites?.map((prereq, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={14} color="var(--color-success)" />
                <span className="text-sm text-foreground">{prereq}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Skills You'll Learn */}
        <div>
          <span className="text-sm text-muted-foreground mb-2 block">Skills You'll Learn</span>
          <div className="flex flex-wrap gap-2">
            {mission?.skillsToLearn?.map((skill, index) => (
              <span 
                key={index}
                className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        {/* Completion Rate */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Completion Rate</span>
            <span className="text-sm font-medium text-foreground">{mission?.completionRate}%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
              style={{ width: `${mission?.completionRate}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionMetadata;