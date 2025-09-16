import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const AchievementToast = () => {
  const [toasts, setToasts] = useState([]);
  const [nextId, setNextId] = useState(1);

  useEffect(() => {
    // Listen for achievement events
    const handleAchievement = (event) => {
      const { type, data } = event?.detail;
      showAchievement(type, data);
    };

    window.addEventListener('neurosparked-achievement', handleAchievement);
    
    // Simulate some achievements for demo
    const demoTimer = setTimeout(() => {
      showAchievement('xp_gain', { amount: 150, reason: 'Mission briefing completed' });
    }, 2000);

    return () => {
      window.removeEventListener('neurosparked-achievement', handleAchievement);
      clearTimeout(demoTimer);
    };
  }, []);

  const showAchievement = (type, data) => {
    const toast = {
      id: nextId,
      type,
      data,
      timestamp: Date.now()
    };

    setToasts(prev => [...prev, toast]);
    setNextId(prev => prev + 1);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      dismissToast(toast?.id);
    }, 5000);
  };

  const dismissToast = (id) => {
    setToasts(prev => prev?.filter(toast => toast?.id !== id));
  };

  const getToastConfig = (type, data) => {
    switch (type) {
      case 'xp_gain':
        return {
          icon: 'Zap',
          iconColor: 'var(--color-accent)',
          title: `+${data?.amount} XP Earned!`,
          description: data?.reason,
          bgColor: 'bg-accent/10',
          borderColor: 'border-accent/20'
        };
        
      case 'streak_milestone':
        return {
          icon: 'Flame',
          iconColor: 'var(--color-warning)',
          title: `${data?.days} Day Streak!`,
          description: 'Keep up the momentum!',
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/20'
        };
        
      case 'level_up':
        return {
          icon: 'Award',
          iconColor: 'var(--color-success)',
          title: `Level ${data?.newLevel} Achieved!`,
          description: `You've unlocked new features`,
          bgColor: 'bg-success/10',
          borderColor: 'border-success/20'
        };
        
      case 'mission_complete':
        return {
          icon: 'CheckCircle',
          iconColor: 'var(--color-success)',
          title: 'Mission Completed!',
          description: data?.missionName,
          bgColor: 'bg-success/10',
          borderColor: 'border-success/20'
        };
        
      case 'badge_earned':
        return {
          icon: 'Star',
          iconColor: 'var(--color-primary)',
          title: 'Badge Earned!',
          description: data?.badgeName,
          bgColor: 'bg-primary/10',
          borderColor: 'border-primary/20'
        };
        
      default:
        return {
          icon: 'Bell',
          iconColor: 'var(--color-foreground)',
          title: 'Achievement Unlocked!',
          description: 'Great job!',
          bgColor: 'bg-muted',
          borderColor: 'border-border'
        };
    }
  };

  if (toasts?.length === 0) return null;

  return (
    <div className="fixed top-20 right-6 z-50 space-y-3 max-w-sm">
      {toasts?.map((toast) => {
        const config = getToastConfig(toast?.type, toast?.data);
        
        return (
          <div
            key={toast?.id}
            className={`${config?.bgColor} ${config?.borderColor} border rounded-lg shadow-elevation-8 p-4 animate-slide-in`}
          >
            <div className="flex items-start space-x-3">
              {/* Achievement Icon */}
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-10 h-10 bg-card rounded-full shadow-elevation-2">
                  <Icon name={config?.icon} size={20} color={config?.iconColor} />
                </div>
              </div>
              
              {/* Achievement Content */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-foreground mb-1">
                  {config?.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {config?.description}
                </p>
              </div>
              
              {/* Dismiss Button */}
              <Button
                variant="ghost"
                onClick={() => dismissToast(toast?.id)}
                iconName="X"
                iconSize={16}
                className="flex-shrink-0 w-8 h-8 p-0 hover:bg-muted/50"
              />
            </div>
            {/* Progress Bar for Auto-dismiss */}
            <div className="mt-3 w-full h-1 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-accent animate-progress-bar"
                style={{
                  animation: 'progressBar 5s linear forwards'
                }}
              />
            </div>
          </div>
        );
      })}
      {/* Custom CSS for progress bar animation */}
      <style jsx>{`
        @keyframes progressBar {
          from { width: 100%; }
          to { width: 0%; }
        }
        
        .animate-progress-bar {
          animation: progressBar 5s linear forwards;
        }
        
        @media (max-width: 768px) {
          .fixed.top-20.right-6 {
            top: 4rem;
            right: 1rem;
            left: 1rem;
            max-width: none;
          }
        }
      `}</style>
    </div>
  );
};

// Helper function to trigger achievements from other components
export const triggerAchievement = (type, data) => {
  const event = new CustomEvent('neurosparked-achievement', {
    detail: { type, data }
  });
  window.dispatchEvent(event);
};

export default AchievementToast;