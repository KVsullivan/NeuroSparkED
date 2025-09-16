import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const AchievementBadges = () => {
  const [achievements, setAchievements] = useState([
    {
      id: 1,
      name: "First Steps",
      description: "Complete your first SPARK mission",
      icon: "Award",
      earned: true,
      earnedDate: "2025-01-05",
      rarity: "common"
    },
    {
      id: 2,
      name: "Streak Master",
      description: "Maintain a 7-day learning streak",
      icon: "Flame",
      earned: true,
      earnedDate: "2025-01-10",
      rarity: "uncommon"
    },
    {
      id: 3,
      name: "Innovation Pioneer",
      description: "Complete 5 innovation-focused missions",
      icon: "Lightbulb",
      earned: true,
      earnedDate: "2025-01-15",
      rarity: "rare"
    },
    {
      id: 4,
      name: "XP Collector",
      description: "Earn 2,500 total experience points",
      icon: "Zap",
      earned: true,
      earnedDate: "2025-01-20",
      rarity: "uncommon"
    },
    {
      id: 5,
      name: "Mission Master",
      description: "Complete 10 missions with perfect scores",
      icon: "Star",
      earned: false,
      progress: 7,
      total: 10,
      rarity: "epic"
    },
    {
      id: 6,
      name: "Knowledge Seeker",
      description: "Complete missions in 5 different topics",
      icon: "BookOpen",
      earned: false,
      progress: 3,
      total: 5,
      rarity: "rare"
    }
  ]);

  const [selectedBadge, setSelectedBadge] = useState(null);

  useEffect(() => {
    // Load achievements from localStorage
    const savedAchievements = localStorage.getItem('neurosparked-achievements');
    if (savedAchievements) {
      setAchievements(JSON.parse(savedAchievements));
    }
  }, []);

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common':
        return 'from-muted to-muted-foreground';
      case 'uncommon':
        return 'from-success to-accent';
      case 'rare':
        return 'from-primary to-accent';
      case 'epic':
        return 'from-warning to-error';
      case 'legendary':
        return 'from-accent to-primary';
      default:
        return 'from-muted to-muted-foreground';
    }
  };

  const getRarityBorder = (rarity) => {
    switch (rarity) {
      case 'common':
        return 'border-muted-foreground';
      case 'uncommon':
        return 'border-success';
      case 'rare':
        return 'border-primary';
      case 'epic':
        return 'border-warning';
      case 'legendary':
        return 'border-accent';
      default:
        return 'border-muted';
    }
  };

  const earnedBadges = achievements?.filter(badge => badge?.earned);
  const inProgressBadges = achievements?.filter(badge => !badge?.earned);

  return (
    <div className="bg-card rounded-xl border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Icon name="Award" size={20} color="var(--color-foreground)" />
          <h3 className="text-lg font-semibold text-foreground">Achievement Badges</h3>
        </div>
        <span className="text-sm text-muted-foreground">
          {earnedBadges?.length}/{achievements?.length} earned
        </span>
      </div>
      {/* Earned Badges */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-foreground mb-3">Recently Earned</h4>
        <div className="flex flex-wrap gap-3">
          {earnedBadges?.slice(-4)?.map((badge) => (
            <div
              key={badge?.id}
              className={`relative group cursor-pointer transition-transform duration-200 hover:scale-105`}
              onClick={() => setSelectedBadge(badge)}
            >
              <div className={`w-16 h-16 rounded-full border-2 ${getRarityBorder(badge?.rarity)} bg-gradient-to-br ${getRarityColor(badge?.rarity)} flex items-center justify-center shadow-elevation-2`}>
                <Icon 
                  name={badge?.icon} 
                  size={24} 
                  color="white" 
                />
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-foreground text-background text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                {badge?.name}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-foreground"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* In Progress Badges */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">In Progress</h4>
        <div className="space-y-3">
          {inProgressBadges?.slice(0, 3)?.map((badge) => (
            <div
              key={badge?.id}
              className="flex items-center space-x-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors duration-150 cursor-pointer"
              onClick={() => setSelectedBadge(badge)}
            >
              <div className={`w-12 h-12 rounded-full border-2 border-dashed ${getRarityBorder(badge?.rarity)} bg-muted flex items-center justify-center opacity-60`}>
                <Icon 
                  name={badge?.icon} 
                  size={20} 
                  color="var(--color-muted-foreground)" 
                />
              </div>
              
              <div className="flex-1">
                <h5 className="text-sm font-medium text-foreground">{badge?.name}</h5>
                <p className="text-xs text-muted-foreground mb-2">{badge?.description}</p>
                
                {badge?.progress && badge?.total && (
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                        style={{ width: `${(badge?.progress / badge?.total) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {badge?.progress}/{badge?.total}
                    </span>
                  </div>
                )}
              </div>
              
              <Icon name="ChevronRight" size={16} color="var(--color-muted-foreground)" />
            </div>
          ))}
        </div>
      </div>
      {/* Badge Detail Modal */}
      {selectedBadge && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-xl border border-border p-6 max-w-md w-full shadow-elevation-8">
            <div className="text-center mb-4">
              <div className={`w-20 h-20 rounded-full border-2 ${getRarityBorder(selectedBadge?.rarity)} bg-gradient-to-br ${getRarityColor(selectedBadge?.rarity)} flex items-center justify-center mx-auto mb-4 shadow-elevation-4`}>
                <Icon 
                  name={selectedBadge?.icon} 
                  size={32} 
                  color="white" 
                />
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-2">{selectedBadge?.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{selectedBadge?.description}</p>
              
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium capitalize bg-gradient-to-r ${getRarityColor(selectedBadge?.rarity)} text-white`}>
                {selectedBadge?.rarity}
              </span>
            </div>
            
            {selectedBadge?.earned ? (
              <div className="text-center text-sm text-success">
                <Icon name="CheckCircle" size={16} color="var(--color-success)" className="inline mr-2" />
                Earned on {new Date(selectedBadge.earnedDate)?.toLocaleDateString()}
              </div>
            ) : (
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <div className="flex-1 bg-muted rounded-full h-3 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                      style={{ width: `${(selectedBadge?.progress / selectedBadge?.total) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {selectedBadge?.progress}/{selectedBadge?.total}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {selectedBadge?.total - selectedBadge?.progress} more to unlock
                </p>
              </div>
            )}
            
            <button
              onClick={() => setSelectedBadge(null)}
              className="w-full mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-150"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AchievementBadges;