import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ProgressSidebar = ({ userProgress, currentStage, completedStages }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [animatedXP, setAnimatedXP] = useState(userProgress?.xp);

  useEffect(() => {
    // Animate XP changes
    if (animatedXP !== userProgress?.xp) {
      const increment = userProgress?.xp > animatedXP ? 10 : -10;
      const timer = setInterval(() => {
        setAnimatedXP(prev => {
          if (increment > 0 && prev >= userProgress?.xp) {
            clearInterval(timer);
            return userProgress?.xp;
          }
          if (increment < 0 && prev <= userProgress?.xp) {
            clearInterval(timer);
            return userProgress?.xp;
          }
          return prev + increment;
        });
      }, 50);
      
      return () => clearInterval(timer);
    }
  }, [userProgress?.xp, animatedXP]);

  const stageXPValues = {
    situation: 50,
    plan: 75,
    action: 100,
    reflection: 75,
    knowledge: 100
  };

  const totalPossibleXP = Object.values(stageXPValues)?.reduce((sum, xp) => sum + xp, 0);
  const earnedXP = completedStages?.reduce((sum, stage) => sum + (stageXPValues?.[stage] || 0), 0);
  const progressPercentage = (earnedXP / totalPossibleXP) * 100;

  const achievements = [
    { id: 'first_stage', name: 'Getting Started', icon: 'Play', unlocked: completedStages?.length > 0 },
    { id: 'halfway', name: 'Halfway Hero', icon: 'Target', unlocked: completedStages?.length >= 3 },
    { id: 'reflective', name: 'Deep Thinker', icon: 'Brain', unlocked: completedStages?.includes('reflection') },
    { id: 'complete', name: 'SPARK Master', icon: 'Award', unlocked: completedStages?.length === 5 }
  ];

  if (isCollapsed) {
    return (
      <div className="w-16 bg-card border-l border-border h-full flex flex-col items-center py-4">
        <button
          onClick={() => setIsCollapsed(false)}
          className="p-2 hover:bg-muted rounded-lg transition-colors duration-150"
        >
          <Icon name="ChevronRight" size={20} />
        </button>
        <div className="mt-6 space-y-4">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-primary-foreground">
              L{userProgress?.level}
            </span>
          </div>
          
          <div className="w-8 h-1 bg-muted rounded-full">
            <div 
              className="h-full bg-accent rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-card border-l border-border h-full overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Progress</h3>
          <button
            onClick={() => setIsCollapsed(true)}
            className="p-1 hover:bg-muted rounded transition-colors duration-150"
          >
            <Icon name="ChevronLeft" size={18} />
          </button>
        </div>

        {/* XP and Level */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">
                  L{userProgress?.level}
                </span>
              </div>
              <div>
                <div className="text-lg font-bold text-foreground">
                  {animatedXP?.toLocaleString()} XP
                </div>
                <div className="text-sm text-muted-foreground">
                  {userProgress?.nextLevelXP - animatedXP} to next level
                </div>
              </div>
            </div>
            <Icon name="Zap" size={24} color="var(--color-accent)" />
          </div>
          
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
              style={{ width: `${(animatedXP / userProgress?.nextLevelXP) * 100}%` }}
            />
          </div>
        </div>

        {/* Streak Counter */}
        <div className="flex items-center justify-between p-4 bg-warning/10 rounded-lg mb-6">
          <div className="flex items-center space-x-3">
            <Icon name="Flame" size={20} color="var(--color-warning)" />
            <div>
              <div className="text-sm font-semibold text-foreground">
                {userProgress?.streak} Day Streak
              </div>
              <div className="text-xs text-muted-foreground">
                Keep it up!
              </div>
            </div>
          </div>
        </div>

        {/* Mission Progress */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-foreground mb-3">Mission Progress</h4>
          <div className="space-y-3">
            {Object.entries(stageXPValues)?.map(([stage, xp]) => {
              const isCompleted = completedStages?.includes(stage);
              const isCurrent = stage === currentStage;
              
              return (
                <div key={stage} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      isCompleted ? 'bg-success' : isCurrent ? 'bg-primary' : 'bg-muted'
                    }`}>
                      {isCompleted ? (
                        <Icon name="Check" size={12} color="white" />
                      ) : isCurrent ? (
                        <Icon name="Play" size={12} color="white" />
                      ) : (
                        <div className="w-2 h-2 bg-muted-foreground rounded-full" />
                      )}
                    </div>
                    <span className={`text-sm capitalize ${
                      isCurrent ? 'text-primary font-medium' : 
                      isCompleted ? 'text-success' : 'text-muted-foreground'
                    }`}>
                      {stage}
                    </span>
                  </div>
                  <span className={`text-sm font-medium ${
                    isCompleted ? 'text-success' : 'text-muted-foreground'
                  }`}>
                    {isCompleted ? '+' : ''}{xp} XP
                  </span>
                </div>
              );
            })}
          </div>
          
          <div className="mt-4 p-3 bg-accent/10 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Total Progress</span>
              <span className="text-sm font-medium text-foreground">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-success to-accent transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">Achievements</h4>
          <div className="space-y-2">
            {achievements?.map((achievement) => (
              <div 
                key={achievement?.id}
                className={`flex items-center space-x-3 p-3 rounded-lg ${
                  achievement?.unlocked 
                    ? 'bg-success/10 border border-success/20' :'bg-muted/30'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  achievement?.unlocked ? 'bg-success' : 'bg-muted'
                }`}>
                  <Icon 
                    name={achievement?.icon} 
                    size={16} 
                    color={achievement?.unlocked ? 'white' : 'var(--color-muted-foreground)'} 
                  />
                </div>
                <span className={`text-sm ${
                  achievement?.unlocked ? 'text-success font-medium' : 'text-muted-foreground'
                }`}>
                  {achievement?.name}
                </span>
                {achievement?.unlocked && (
                  <Icon name="Check" size={14} color="var(--color-success)" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressSidebar;