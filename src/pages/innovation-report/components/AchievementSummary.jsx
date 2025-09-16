import React from 'react';
import Icon from '../../../components/AppIcon';

const AchievementSummary = ({ achievements, streakData, skillsGained }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Trophy" size={20} color="var(--color-accent)" />
        <h3 className="text-lg font-semibold text-foreground">Achievement Summary</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* XP & Level Progress */}
        <div className="text-center">
          <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-3 mx-auto">
            <Icon name="Zap" size={24} color="var(--color-primary)" />
          </div>
          <h4 className="font-semibold text-foreground mb-1">Experience Points</h4>
          <p className="text-2xl font-bold text-primary mb-1">{achievements?.totalXP?.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">Level {achievements?.currentLevel}</p>
        </div>

        {/* Streak Achievement */}
        <div className="text-center">
          <div className="flex items-center justify-center w-16 h-16 bg-warning/10 rounded-full mb-3 mx-auto">
            <Icon name="Flame" size={24} color="var(--color-warning)" />
          </div>
          <h4 className="font-semibold text-foreground mb-1">Learning Streak</h4>
          <p className="text-2xl font-bold text-warning mb-1">{streakData?.currentStreak}</p>
          <p className="text-sm text-muted-foreground">Days consecutive</p>
        </div>

        {/* Skills Developed */}
        <div className="text-center">
          <div className="flex items-center justify-center w-16 h-16 bg-success/10 rounded-full mb-3 mx-auto">
            <Icon name="Brain" size={24} color="var(--color-success)" />
          </div>
          <h4 className="font-semibold text-foreground mb-1">Skills Gained</h4>
          <p className="text-2xl font-bold text-success mb-1">{skillsGained?.length}</p>
          <p className="text-sm text-muted-foreground">New competencies</p>
        </div>
      </div>
      {/* Skills List */}
      {skillsGained?.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-3">Skills Developed:</h4>
          <div className="flex flex-wrap gap-2">
            {skillsGained?.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full border border-accent/20"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AchievementSummary;