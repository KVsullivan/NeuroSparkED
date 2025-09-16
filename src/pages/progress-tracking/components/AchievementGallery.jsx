import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const AchievementGallery = () => {
  const [achievements, setAchievements] = useState([
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first mission",
      icon: "Award",
      category: "Milestone",
      xpReward: 50,
      unlockedDate: "2024-12-15",
      isUnlocked: true,
      rarity: "common"
    },
    {
      id: 2,
      title: "Streak Master",
      description: "Maintain a 7-day learning streak",
      icon: "Flame",
      category: "Consistency",
      xpReward: 100,
      unlockedDate: "2024-12-22",
      isUnlocked: true,
      rarity: "uncommon"
    },
    {
      id: 3,
      title: "Innovation Pioneer",
      description: "Complete 5 innovation-focused missions",
      icon: "Lightbulb",
      category: "Skill",
      xpReward: 200,
      unlockedDate: "2025-01-02",
      isUnlocked: true,
      rarity: "rare"
    },
    {
      id: 4,
      title: "Knowledge Seeker",
      description: "Earn 1000 XP points",
      icon: "BookOpen",
      category: "Progress",
      xpReward: 150,
      unlockedDate: "2024-12-28",
      isUnlocked: true,
      rarity: "uncommon"
    },
    {
      id: 5,
      title: "Problem Solver",
      description: "Excel in problem-solving challenges",
      icon: "Puzzle",
      category: "Skill",
      xpReward: 175,
      unlockedDate: "2025-01-05",
      isUnlocked: true,
      rarity: "rare"
    },
    {
      id: 6,
      title: "Team Player",
      description: "Complete 3 collaboration missions",
      icon: "Users",
      category: "Social",
      xpReward: 125,
      unlockedDate: null,
      isUnlocked: false,
      rarity: "uncommon",
      progress: 2,
      target: 3
    },
    {
      id: 7,
      title: "Speed Learner",
      description: "Complete a mission in under 2 hours",
      icon: "Zap",
      category: "Performance",
      xpReward: 100,
      unlockedDate: null,
      isUnlocked: false,
      rarity: "common"
    },
    {
      id: 8,
      title: "Perfectionist",
      description: "Achieve perfect scores on 5 missions",
      icon: "Star",
      category: "Excellence",
      xpReward: 300,
      unlockedDate: null,
      isUnlocked: false,
      rarity: "legendary",
      progress: 1,
      target: 5
    },
    {
      id: 9,
      title: "Research Expert",
      description: "Master research methodology",
      icon: "Search",
      category: "Skill",
      xpReward: 200,
      unlockedDate: null,
      isUnlocked: false,
      rarity: "rare"
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRarity, setSelectedRarity] = useState('all');

  const categories = ['all', ...new Set(achievements.map(a => a.category))];
  const rarities = ['all', 'common', 'uncommon', 'rare', 'legendary'];

  const filteredAchievements = achievements?.filter(achievement => {
    const categoryMatch = selectedCategory === 'all' || achievement?.category === selectedCategory;
    const rarityMatch = selectedRarity === 'all' || achievement?.rarity === selectedRarity;
    return categoryMatch && rarityMatch;
  });

  const unlockedCount = achievements?.filter(a => a?.isUnlocked)?.length;
  const totalXP = achievements?.filter(a => a?.isUnlocked)?.reduce((sum, a) => sum + a?.xpReward, 0);

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'var(--color-muted-foreground)';
      case 'uncommon': return 'var(--color-primary)';
      case 'rare': return 'var(--color-accent)';
      case 'legendary': return 'var(--color-warning)';
      default: return 'var(--color-muted-foreground)';
    }
  };

  const getRarityBg = (rarity) => {
    switch (rarity) {
      case 'common': return 'bg-muted/20';
      case 'uncommon': return 'bg-primary/20';
      case 'rare': return 'bg-accent/20';
      case 'legendary': return 'bg-warning/20';
      default: return 'bg-muted/20';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Achievement Gallery</h3>
          <p className="text-sm text-muted-foreground">
            {unlockedCount} of {achievements?.length} unlocked • {totalXP?.toLocaleString()} XP earned
          </p>
        </div>
        
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e?.target?.value)}
            className="px-3 py-1 text-sm border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {categories?.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
          
          <select
            value={selectedRarity}
            onChange={(e) => setSelectedRarity(e?.target?.value)}
            className="px-3 py-1 text-sm border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {rarities?.map(rarity => (
              <option key={rarity} value={rarity}>
                {rarity === 'all' ? 'All Rarities' : rarity?.charAt(0)?.toUpperCase() + rarity?.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Progress Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <div className="text-2xl font-bold text-foreground mb-1">{unlockedCount}</div>
          <div className="text-xs text-muted-foreground">Unlocked</div>
        </div>
        
        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <div className="text-2xl font-bold text-primary mb-1">
            {Math.round((unlockedCount / achievements?.length) * 100)}%
          </div>
          <div className="text-xs text-muted-foreground">Complete</div>
        </div>
        
        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <div className="text-2xl font-bold text-accent mb-1">{totalXP?.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">Bonus XP</div>
        </div>
        
        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <div className="text-2xl font-bold text-warning mb-1">
            {achievements?.filter(a => a?.rarity === 'legendary' && a?.isUnlocked)?.length}
          </div>
          <div className="text-xs text-muted-foreground">Legendary</div>
        </div>
      </div>
      {/* Achievement Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAchievements?.map((achievement) => (
          <div
            key={achievement?.id}
            className={`relative p-4 rounded-lg border-2 transition-all duration-300 ${
              achievement?.isUnlocked
                ? `${getRarityBg(achievement?.rarity)} border-current hover:shadow-elevation-4 cursor-pointer`
                : 'bg-muted/20 border-border opacity-60'
            }`}
            style={{
              borderColor: achievement?.isUnlocked ? getRarityColor(achievement?.rarity) : 'var(--color-border)'
            }}
          >
            {/* Rarity Indicator */}
            <div className="absolute top-2 right-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: getRarityColor(achievement?.rarity) }}
                title={achievement?.rarity}
              />
            </div>

            {/* Achievement Icon */}
            <div className="flex items-center justify-center mb-4">
              <div
                className={`flex items-center justify-center w-16 h-16 rounded-full ${
                  achievement?.isUnlocked ? getRarityBg(achievement?.rarity) : 'bg-muted'
                }`}
              >
                <Icon
                  name={achievement?.icon}
                  size={32}
                  color={achievement?.isUnlocked ? getRarityColor(achievement?.rarity) : 'var(--color-muted-foreground)'}
                />
              </div>
            </div>

            {/* Achievement Info */}
            <div className="text-center">
              <h4 className={`text-sm font-semibold mb-1 ${
                achievement?.isUnlocked ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {achievement?.title}
              </h4>
              
              <p className="text-xs text-muted-foreground mb-3">
                {achievement?.description}
              </p>

              {/* XP Reward */}
              <div className="flex items-center justify-center space-x-1 mb-3">
                <Icon name="Zap" size={12} color="var(--color-accent)" />
                <span className="text-xs font-medium text-accent">
                  +{achievement?.xpReward} XP
                </span>
              </div>

              {/* Status */}
              {achievement?.isUnlocked ? (
                <div className="flex items-center justify-center space-x-1 text-xs text-success">
                  <Icon name="CheckCircle" size={12} />
                  <span>Unlocked {formatDate(achievement?.unlockedDate)}</span>
                </div>
              ) : achievement?.progress !== undefined ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-foreground font-medium">
                      {achievement?.progress}/{achievement?.target}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                      style={{ width: `${(achievement?.progress / achievement?.target) * 100}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="text-xs text-muted-foreground">
                  <Icon name="Lock" size={12} className="mx-auto mb-1" />
                  <span>Locked</span>
                </div>
              )}

              {/* Category Badge */}
              <div className="mt-3">
                <span className="inline-block text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                  {achievement?.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredAchievements?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Award" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <h4 className="text-lg font-medium text-foreground mb-2">No achievements found</h4>
          <p className="text-muted-foreground">Try adjusting your filters to see more results.</p>
        </div>
      )}
      {/* Next Achievement Hint */}
      {achievements?.some(a => !a?.isUnlocked) && (
        <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-center space-x-3">
            <Icon name="Target" size={20} color="var(--color-primary)" />
            <div>
              <h4 className="text-sm font-medium text-foreground mb-1">Next Achievement</h4>
              <p className="text-xs text-muted-foreground">
                Complete more missions to unlock new achievements and earn bonus XP!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AchievementGallery;