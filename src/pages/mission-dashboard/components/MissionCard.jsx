import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MissionCard = ({ mission }) => {
  const navigate = useNavigate();

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner':
        return 'text-success bg-success/10';
      case 'intermediate':
        return 'text-warning bg-warning/10';
      case 'advanced':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getProgressStage = (progress) => {
    if (progress === 0) return { stage: 'Not Started', icon: 'Play', color: 'text-muted-foreground' };
    if (progress <= 25) return { stage: 'Briefing', icon: 'FileText', color: 'text-primary' };
    if (progress <= 75) return { stage: 'In Progress', icon: 'Lightbulb', color: 'text-warning' };
    if (progress < 100) return { stage: 'Finalizing', icon: 'Award', color: 'text-accent' };
    return { stage: 'Completed', icon: 'CheckCircle', color: 'text-success' };
  };

  const handleMissionAction = () => {
    if (mission?.progress === 0) {
      navigate('/mission-briefing', { state: { missionId: mission?.id } });
    } else if (mission?.progress < 100) {
      // Navigate to appropriate stage based on progress
      if (mission?.progress <= 25) {
        navigate('/mission-briefing', { state: { missionId: mission?.id } });
      } else if (mission?.progress <= 75) {
        navigate('/spark-workspace', { state: { missionId: mission?.id } });
      } else {
        navigate('/innovation-report', { state: { missionId: mission?.id } });
      }
    } else {
      navigate('/innovation-report', { state: { missionId: mission?.id } });
    }
  };

  const progressStage = getProgressStage(mission?.progress);

  return (
    <div className="bg-card rounded-xl border border-border p-6 hover:shadow-elevation-4 transition-all duration-300 hover:border-primary/20">
      {/* Mission Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
            {mission?.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
            {mission?.description}
          </p>
        </div>
        
        {mission?.isNew && (
          <div className="flex-shrink-0 ml-3">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
              New
            </span>
          </div>
        )}
      </div>
      {/* Mission Metadata */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {/* Difficulty Badge */}
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(mission?.difficulty)}`}>
          {mission?.difficulty}
        </span>

        {/* Duration */}
        <div className="flex items-center space-x-1 text-muted-foreground">
          <Icon name="Clock" size={14} />
          <span className="text-xs">{mission?.estimatedTime}</span>
        </div>

        {/* XP Reward */}
        <div className="flex items-center space-x-1 text-accent">
          <Icon name="Zap" size={14} />
          <span className="text-xs font-medium">{mission?.xpReward} XP</span>
        </div>

        {/* Topic Tag */}
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-muted text-muted-foreground">
          {mission?.topic}
        </span>
      </div>
      {/* Progress Section */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Icon name={progressStage?.icon} size={16} color={`var(--color-${progressStage?.color?.split('-')?.[1]})`} />
            <span className={`text-sm font-medium ${progressStage?.color}`}>
              {progressStage?.stage}
            </span>
          </div>
          <span className="text-sm text-muted-foreground">
            {mission?.progress}%
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out-custom"
            style={{ width: `${mission?.progress}%` }}
          />
        </div>
      </div>
      {/* SPARK Stages Indicator */}
      <div className="flex items-center justify-between mb-4 px-2">
        {['S', 'P', 'A', 'R', 'K']?.map((stage, index) => {
          const stageProgress = (mission?.progress / 100) * 5;
          const isCompleted = index < stageProgress;
          const isCurrent = index === Math.floor(stageProgress) && mission?.progress < 100;
          
          return (
            <div
              key={stage}
              className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all duration-300 ${
                isCompleted 
                  ? 'bg-success text-success-foreground' 
                  : isCurrent
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {stage}
            </div>
          );
        })}
      </div>
      {/* Action Button */}
      <Button
        variant={mission?.progress === 0 ? "default" : mission?.progress === 100 ? "secondary" : "outline"}
        onClick={handleMissionAction}
        iconName={mission?.progress === 0 ? "Play" : mission?.progress === 100 ? "Eye" : "ArrowRight"}
        iconPosition="right"
        iconSize={16}
        fullWidth
        className="mt-2"
      >
        {mission?.progress === 0 
          ? "Start Mission" 
          : mission?.progress === 100 
          ? "View Report" :"Continue Mission"
        }
      </Button>
    </div>
  );
};

export default MissionCard;