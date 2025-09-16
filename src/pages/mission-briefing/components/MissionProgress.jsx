import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const MissionProgress = () => {
  const [userProgress, setUserProgress] = useState({
    completedMissions: 15,
    totalMissions: 24,
    currentStreak: 12,
    totalXP: 2450,
    level: 8
  });

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem('neurosparked-progress');
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }
  }, []);

  const completionPercentage = (userProgress?.completedMissions / userProgress?.totalMissions) * 100;

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Your Progress</h3>
      <div className="space-y-4">
        {/* Overall Mission Progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Mission Portfolio</span>
            <span className="text-sm font-medium text-foreground">
              {userProgress?.completedMissions}/{userProgress?.totalMissions} completed
            </span>
          </div>
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {Math.round(completionPercentage)}% complete
          </div>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-center space-x-2 mb-1">
              <Icon name="Zap" size={16} color="var(--color-accent)" />
              <span className="text-lg font-semibold text-foreground">{userProgress?.totalXP?.toLocaleString()}</span>
            </div>
            <span className="text-xs text-muted-foreground">Total XP</span>
          </div>
          
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-center space-x-2 mb-1">
              <Icon name="Award" size={16} color="var(--color-primary)" />
              <span className="text-lg font-semibold text-foreground">L{userProgress?.level}</span>
            </div>
            <span className="text-xs text-muted-foreground">Current Level</span>
          </div>
        </div>
        
        {/* Current Streak */}
        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-accent/10 to-warning/10 rounded-lg">
          <div className="flex items-center space-x-3">
            <Icon name="Flame" size={20} color="var(--color-accent)" />
            <div>
              <div className="font-semibold text-foreground">{userProgress?.currentStreak} Day Streak</div>
              <div className="text-xs text-muted-foreground">Keep it going!</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-accent">+50 XP</div>
            <div className="text-xs text-muted-foreground">Streak bonus</div>
          </div>
        </div>
        
        {/* Next Milestone */}
        <div className="border-t border-border pt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Next Milestone</span>
            <span className="text-sm font-medium text-primary">Level 9</span>
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Complete 2 more missions to unlock advanced features
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionProgress;