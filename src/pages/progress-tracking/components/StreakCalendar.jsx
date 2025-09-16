import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const StreakCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [streakData, setStreakData] = useState({
    currentStreak: 12,
    longestStreak: 18,
    totalActiveDays: 45,
    weeklyGoal: 5,
    monthlyGoal: 20
  });

  // Generate activity data for the current month
  const [activityData, setActivityData] = useState(() => {
    const data = {};
    const today = new Date();
    const currentMonth = today?.getMonth();
    const currentYear = today?.getFullYear();
    
    // Generate random activity for the past 60 days
    for (let i = 0; i < 60; i++) {
      const date = new Date(today);
      date?.setDate(date?.getDate() - i);
      const dateKey = date?.toISOString()?.split('T')?.[0];
      
      // Simulate activity pattern (higher chance of activity on weekdays)
      const isWeekday = date?.getDay() >= 1 && date?.getDay() <= 5;
      const activityChance = isWeekday ? 0.8 : 0.4;
      
      if (Math.random() < activityChance) {
        data[dateKey] = {
          hasActivity: true,
          xpEarned: Math.floor(Math.random() * 200) + 50,
          sessionsCompleted: Math.floor(Math.random() * 3) + 1,
          timeSpent: Math.floor(Math.random() * 120) + 30 // minutes
        };
      }
    }
    
    return data;
  });

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0)?.getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1)?.getDay();
  };

  const formatDateKey = (year, month, day) => {
    return `${year}-${String(month + 1)?.padStart(2, '0')}-${String(day)?.padStart(2, '0')}`;
  };

  const getActivityLevel = (dateKey) => {
    const activity = activityData?.[dateKey];
    if (!activity || !activity?.hasActivity) return 0;
    
    if (activity?.xpEarned >= 150) return 3; // High activity
    if (activity?.xpEarned >= 100) return 2; // Medium activity
    return 1; // Low activity
  };

  const getActivityColor = (level) => {
    switch (level) {
      case 3: return 'bg-success'; // High
      case 2: return 'bg-primary'; // Medium
      case 1: return 'bg-accent/60'; // Low
      default: return 'bg-muted'; // No activity
    }
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate?.setMonth(prev?.getMonth() + direction);
      return newDate;
    });
  };

  const isToday = (year, month, day) => {
    const today = new Date();
    return year === today?.getFullYear() && 
           month === today?.getMonth() && 
           day === today?.getDate();
  };

  const isFutureDate = (year, month, day) => {
    const today = new Date();
    const checkDate = new Date(year, month, day);
    return checkDate > today;
  };

  const renderCalendar = () => {
    const year = currentDate?.getFullYear();
    const month = currentDate?.getMonth();
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    
    const days = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Day headers
    dayNames?.forEach(day => {
      days?.push(
        <div key={`header-${day}`} className="text-xs font-medium text-muted-foreground text-center p-2">
          {day}
        </div>
      );
    });
    
    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days?.push(<div key={`empty-${i}`} className="p-2"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = formatDateKey(year, month, day);
      const activityLevel = getActivityLevel(dateKey);
      const activity = activityData?.[dateKey];
      const isCurrentDay = isToday(year, month, day);
      const isFuture = isFutureDate(year, month, day);
      
      days?.push(
        <div
          key={day}
          className={`relative p-2 text-center cursor-pointer transition-all duration-150 ${
            isCurrentDay ? 'ring-2 ring-primary' : ''
          } ${isFuture ? 'opacity-30' : 'hover:scale-110'}`}
          title={activity ? `${activity?.xpEarned} XP • ${activity?.timeSpent}min` : 'No activity'}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors duration-150 ${
              getActivityColor(activityLevel)
            } ${
              activityLevel > 0 ? 'text-white' : 'text-muted-foreground'
            }`}
          >
            {day}
          </div>
          
          {activity && activity?.hasActivity && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full border-2 border-card">
              <div className="w-full h-full bg-accent rounded-full animate-pulse"></div>
            </div>
          )}
        </div>
      );
    }
    
    return days;
  };

  const getThisWeekActivity = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek?.setDate(today?.getDate() - today?.getDay());
    
    let weeklyCount = 0;
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date?.setDate(startOfWeek?.getDate() + i);
      const dateKey = date?.toISOString()?.split('T')?.[0];
      if (activityData?.[dateKey]?.hasActivity) {
        weeklyCount++;
      }
    }
    return weeklyCount;
  };

  const getThisMonthActivity = () => {
    const today = new Date();
    const year = today?.getFullYear();
    const month = today?.getMonth();
    const daysInMonth = getDaysInMonth(today);
    
    let monthlyCount = 0;
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = formatDateKey(year, month, day);
      if (activityData?.[dateKey]?.hasActivity) {
        monthlyCount++;
      }
    }
    return monthlyCount;
  };

  const weeklyProgress = (getThisWeekActivity() / streakData?.weeklyGoal) * 100;
  const monthlyProgress = (getThisMonthActivity() / streakData?.monthlyGoal) * 100;

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Learning Streak</h3>
          <p className="text-sm text-muted-foreground">Track your daily learning consistency</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 text-sm">
            <Icon name="Flame" size={16} color="var(--color-warning)" />
            <span className="font-semibold text-warning">{streakData?.currentStreak}</span>
            <span className="text-muted-foreground">days</span>
          </div>
        </div>
      </div>
      {/* Streak Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-warning mb-1">{streakData?.currentStreak}</div>
          <div className="text-xs text-muted-foreground">Current Streak</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-success mb-1">{streakData?.longestStreak}</div>
          <div className="text-xs text-muted-foreground">Longest Streak</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-primary mb-1">{getThisWeekActivity()}/{streakData?.weeklyGoal}</div>
          <div className="text-xs text-muted-foreground">This Week</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-accent mb-1">{getThisMonthActivity()}/{streakData?.monthlyGoal}</div>
          <div className="text-xs text-muted-foreground">This Month</div>
        </div>
      </div>
      {/* Progress Bars */}
      <div className="space-y-3 mb-6">
        <div>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-muted-foreground">Weekly Goal</span>
            <span className="text-foreground font-medium">{Math.min(weeklyProgress, 100)?.toFixed(0)}%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
              style={{ width: `${Math.min(weeklyProgress, 100)}%` }}
            />
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-muted-foreground">Monthly Goal</span>
            <span className="text-foreground font-medium">{Math.min(monthlyProgress, 100)?.toFixed(0)}%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-success to-accent transition-all duration-500"
              style={{ width: `${Math.min(monthlyProgress, 100)}%` }}
            />
          </div>
        </div>
      </div>
      {/* Calendar */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-medium text-foreground">
            {currentDate?.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h4>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-1 text-muted-foreground hover:text-foreground transition-colors duration-150"
            >
              <Icon name="ChevronLeft" size={16} />
            </button>
            <button
              onClick={() => navigateMonth(1)}
              className="p-1 text-muted-foreground hover:text-foreground transition-colors duration-150"
            >
              <Icon name="ChevronRight" size={16} />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {renderCalendar()}
        </div>
        
        {/* Legend */}
        <div className="flex items-center justify-center space-x-4 mt-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-muted rounded-full"></div>
            <span>No activity</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-accent/60 rounded-full"></div>
            <span>Low</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span>Medium</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span>High</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreakCalendar;