import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const ProgressHeader = () => {
  const [userProgress, setUserProgress] = useState({
    xp: 2450,
    level: 8,
    streak: 12,
    nextLevelXP: 3000,
    completedMissions: 15,
    totalMissions: 24
  });

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem('neurosparked-progress');
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }
  }, []);

  const progressPercentage = (userProgress?.xp / userProgress?.nextLevelXP) * 100;
  const xpToNext = userProgress?.nextLevelXP - userProgress?.xp;

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  if (!isVisible) {
    return (
      <div className="bg-muted border-b border-border">
        <div className="flex items-center justify-center py-2 px-6">
          <button
            onClick={toggleVisibility}
            className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-150"
          >
            <Icon name="ChevronDown" size={16} />
            <span className="text-sm">Show Progress</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section - Level & XP */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-full">
                <span className="text-sm font-bold text-primary-foreground">L{userProgress?.level}</span>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-semibold text-foreground">{userProgress?.xp?.toLocaleString()} XP</span>
                  <Icon name="Zap" size={16} color="var(--color-accent)" />
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ease-out-custom"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{xpToNext} to next level</span>
                </div>
              </div>
            </div>

            {/* Streak Counter */}
            <div className="flex items-center space-x-2 px-3 py-1 bg-accent/10 rounded-full">
              <Icon name="Flame" size={16} color="var(--color-accent)" />
              <span className="text-sm font-medium text-foreground">{userProgress?.streak} day streak</span>
            </div>
          </div>

          {/* Center Section - Mission Progress */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="text-center">
              <div className="text-lg font-semibold text-foreground">{userProgress?.completedMissions}</div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <div className="text-lg font-semibold text-foreground">{userProgress?.totalMissions - userProgress?.completedMissions}</div>
              <div className="text-xs text-muted-foreground">Remaining</div>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <div className="text-lg font-semibold text-accent">{Math.round((userProgress?.completedMissions / userProgress?.totalMissions) * 100)}%</div>
              <div className="text-xs text-muted-foreground">Progress</div>
            </div>
          </div>

          {/* Right Section - Quick Stats & Toggle */}
          <div className="flex items-center space-x-4">
            {/* Mobile Stats */}
            <div className="lg:hidden flex items-center space-x-3">
              <div className="text-center">
                <div className="text-sm font-semibold text-foreground">{userProgress?.completedMissions}/{userProgress?.totalMissions}</div>
                <div className="text-xs text-muted-foreground">Missions</div>
              </div>
            </div>

            {/* Recent Achievement Badge */}
            <div className="hidden md:flex items-center space-x-2 px-3 py-1 bg-success/10 rounded-full">
              <Icon name="Award" size={14} color="var(--color-success)" />
              <span className="text-xs font-medium text-success">Mission Master</span>
            </div>

            {/* Collapse Button */}
            <button
              onClick={toggleVisibility}
              className="flex items-center justify-center w-8 h-8 text-muted-foreground hover:text-foreground transition-colors duration-150 rounded-md hover:bg-muted/50"
            >
              <Icon name="ChevronUp" size={16} />
            </button>
          </div>
        </div>

        {/* Mobile Mission Progress Bar */}
        <div className="lg:hidden mt-3 pt-3 border-t border-border/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Mission Progress</span>
            <span className="text-sm font-medium text-foreground">{Math.round((userProgress?.completedMissions / userProgress?.totalMissions) * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-success to-accent transition-all duration-300 ease-out-custom"
              style={{ width: `${(userProgress?.completedMissions / userProgress?.totalMissions) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressHeader;