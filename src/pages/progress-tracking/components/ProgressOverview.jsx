import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ProgressOverview = () => {
  const [overviewData, setOverviewData] = useState({
    totalXP: 2450,
    currentLevel: 8,
    nextLevelXP: 3000,
    completedMissions: 15,
    totalMissions: 24,
    currentStreak: 12,
    longestStreak: 18,
    totalStudyHours: 47.5,
    averageSessionTime: 28
  });

  const [animatedValues, setAnimatedValues] = useState({
    xp: 0,
    missions: 0,
    streak: 0,
    hours: 0
  });

  useEffect(() => {
    // Animate values on component mount
    const animateValue = (start, end, duration, callback) => {
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = start + (end - start) * progress;
        callback(Math.floor(current));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      animate();
    };

    animateValue(0, overviewData?.totalXP, 1500, (value) => 
      setAnimatedValues(prev => ({ ...prev, xp: value }))
    );
    animateValue(0, overviewData?.completedMissions, 1200, (value) => 
      setAnimatedValues(prev => ({ ...prev, missions: value }))
    );
    animateValue(0, overviewData?.currentStreak, 1000, (value) => 
      setAnimatedValues(prev => ({ ...prev, streak: value }))
    );
    animateValue(0, overviewData?.totalStudyHours, 1800, (value) => 
      setAnimatedValues(prev => ({ ...prev, hours: value }))
    );
  }, [overviewData]);

  const progressPercentage = (overviewData?.totalXP / overviewData?.nextLevelXP) * 100;
  const missionProgress = (overviewData?.completedMissions / overviewData?.totalMissions) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* XP Progress Card */}
      <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevation-4 transition-shadow duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
            <Icon name="Zap" size={24} color="var(--color-primary)" />
          </div>
          <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
            Level {overviewData?.currentLevel}
          </span>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-foreground">
              {animatedValues?.xp?.toLocaleString()}
            </span>
            <span className="text-sm text-muted-foreground">XP</span>
          </div>
          
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 ease-out-custom"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
          <p className="text-xs text-muted-foreground">
            {overviewData?.nextLevelXP - overviewData?.totalXP} XP to Level {overviewData?.currentLevel + 1}
          </p>
        </div>
      </div>
      {/* Mission Progress Card */}
      <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevation-4 transition-shadow duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center justify-center w-12 h-12 bg-success/10 rounded-lg">
            <Icon name="Target" size={24} color="var(--color-success)" />
          </div>
          <span className="text-sm font-medium text-success bg-success/10 px-2 py-1 rounded-full">
            {Math.round(missionProgress)}%
          </span>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-foreground">
              {animatedValues?.missions}
            </span>
            <span className="text-sm text-muted-foreground">
              / {overviewData?.totalMissions}
            </span>
          </div>
          
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-success to-accent transition-all duration-1000 ease-out-custom"
              style={{ width: `${missionProgress}%` }}
            />
          </div>
          
          <p className="text-xs text-muted-foreground">
            Missions Completed
          </p>
        </div>
      </div>
      {/* Streak Card */}
      <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevation-4 transition-shadow duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center justify-center w-12 h-12 bg-warning/10 rounded-lg">
            <Icon name="Flame" size={24} color="var(--color-warning)" />
          </div>
          <span className="text-sm font-medium text-warning bg-warning/10 px-2 py-1 rounded-full">
            Active
          </span>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-foreground">
              {animatedValues?.streak}
            </span>
            <span className="text-sm text-muted-foreground">days</span>
          </div>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Current Streak</span>
            <span>Best: {overviewData?.longestStreak} days</span>
          </div>
          
          <p className="text-xs text-muted-foreground">
            Keep it up! You're on fire 🔥
          </p>
        </div>
      </div>
      {/* Study Time Card */}
      <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevation-4 transition-shadow duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg">
            <Icon name="Clock" size={24} color="var(--color-accent)" />
          </div>
          <span className="text-sm font-medium text-accent bg-accent/10 px-2 py-1 rounded-full">
            {overviewData?.averageSessionTime}m avg
          </span>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-foreground">
              {animatedValues?.hours}
            </span>
            <span className="text-sm text-muted-foreground">hours</span>
          </div>
          
          <p className="text-xs text-muted-foreground">
            Total Study Time
          </p>
          
          <div className="flex items-center space-x-1 text-xs text-accent">
            <Icon name="TrendingUp" size={12} />
            <span>+2.5h this week</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressOverview;