import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const StatsPanel = () => {
  const [userStats, setUserStats] = useState({
    totalXP: 2450,
    currentStreak: 12,
    completionPercentage: 62,
    level: 8,
    nextLevelXP: 3000,
    completedMissions: 15,
    totalMissions: 24,
    todayXP: 150
  });

  const [animatedValues, setAnimatedValues] = useState({
    xp: 0,
    streak: 0,
    completion: 0
  });

  useEffect(() => {
    // Load stats from localStorage
    const savedStats = localStorage.getItem('neurosparked-user-stats');
    if (savedStats) {
      setUserStats(JSON.parse(savedStats));
    }

    // Animate values on mount
    const animateStats = () => {
      const duration = 1000;
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setAnimatedValues({
          xp: Math.floor(userStats?.totalXP * progress),
          streak: Math.floor(userStats?.currentStreak * progress),
          completion: Math.floor(userStats?.completionPercentage * progress)
        });

        if (currentStep >= steps) {
          clearInterval(timer);
          setAnimatedValues({
            xp: userStats?.totalXP,
            streak: userStats?.currentStreak,
            completion: userStats?.completionPercentage
          });
        }
      }, stepDuration);

      return () => clearInterval(timer);
    };

    const cleanup = animateStats();
    return cleanup;
  }, [userStats?.totalXP, userStats?.currentStreak, userStats?.completionPercentage]);

  const progressPercentage = (userStats?.totalXP / userStats?.nextLevelXP) * 100;

  return (
    <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* XP & Level Section */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-3 mb-3">
            <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-full">
              <span className="text-lg font-bold text-primary-foreground">L{userStats?.level}</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-foreground">{animatedValues?.xp?.toLocaleString()}</span>
                <Icon name="Zap" size={20} color="var(--color-accent)" />
              </div>
              <p className="text-sm text-muted-foreground">Total XP Earned</p>
            </div>
          </div>
          
          {/* Level Progress Bar */}
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 ease-out-custom"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {userStats?.nextLevelXP - userStats?.totalXP} XP to Level {userStats?.level + 1}
          </p>
        </div>

        {/* Streak Section */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Icon name="Flame" size={24} color="var(--color-warning)" />
            <span className="text-3xl font-bold text-foreground">{animatedValues?.streak}</span>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Day Learning Streak</p>
          
          {/* Streak Calendar Indicators */}
          <div className="flex justify-center space-x-1">
            {[...Array(7)]?.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index < userStats?.currentStreak % 7 
                    ? 'bg-warning' :'bg-muted'
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-1">This week</p>
        </div>

        {/* Completion Section */}
        <div className="text-center md:text-right">
          <div className="relative inline-flex items-center justify-center w-20 h-20 mb-3">
            {/* Progress Ring */}
            <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 80 80">
              <circle
                cx="40"
                cy="40"
                r="32"
                stroke="var(--color-muted)"
                strokeWidth="6"
                fill="none"
              />
              <circle
                cx="40"
                cy="40"
                r="32"
                stroke="var(--color-success)"
                strokeWidth="6"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 32}`}
                strokeDashoffset={`${2 * Math.PI * 32 * (1 - animatedValues?.completion / 100)}`}
                className="transition-all duration-1000 ease-out-custom"
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute text-lg font-bold text-foreground">
              {animatedValues?.completion}%
            </span>
          </div>
          <p className="text-sm text-muted-foreground">Overall Progress</p>
          <p className="text-xs text-muted-foreground">
            {userStats?.completedMissions}/{userStats?.totalMissions} missions completed
          </p>
        </div>
      </div>
      {/* Today's Progress */}
      <div className="mt-6 pt-4 border-t border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} color="var(--color-muted-foreground)" />
            <span className="text-sm text-muted-foreground">Today's Progress</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-accent">+{userStats?.todayXP} XP</span>
            <Icon name="TrendingUp" size={16} color="var(--color-accent)" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;