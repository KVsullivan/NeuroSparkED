import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MissionActions = ({ mission }) => {
  const [isAccepting, setIsAccepting] = useState(false);
  const navigate = useNavigate();

  const handleAcceptMission = async () => {
    setIsAccepting(true);
    
    // Simulate mission acceptance process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Save mission state to localStorage
    const missionState = {
      missionId: mission?.id,
      status: 'accepted',
      startTime: new Date()?.toISOString(),
      currentStage: 'briefing',
      progress: {
        briefingCompleted: true,
        sparkStage: 'situation'
      }
    };
    
    localStorage.setItem('neurosparked-current-mission', JSON.stringify(missionState));
    
    // Trigger achievement for mission acceptance
    const achievementEvent = new CustomEvent('neurosparked-achievement', {
      detail: { 
        type: 'xp_gain', 
        data: { amount: 25, reason: 'Mission accepted' } 
      }
    });
    window.dispatchEvent(achievementEvent);
    
    // Navigate to SPARK workspace
    navigate('/spark-workspace');
  };

  const handleBackToDashboard = () => {
    navigate('/mission-dashboard');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Ready to Begin?</h3>
      {/* Mission Commitment */}
      <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-2">Mission Commitment</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              By accepting this mission, you'll embark on a structured SPARK journey that will challenge your thinking and produce tangible learning artifacts. Your progress will be automatically saved, allowing you to resume at any time.
            </p>
          </div>
        </div>
      </div>
      {/* Reward Preview */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-3 bg-accent/10 rounded-lg">
          <div className="flex items-center justify-center space-x-2 mb-1">
            <Icon name="Zap" size={16} color="var(--color-accent)" />
            <span className="text-lg font-semibold text-accent">{mission?.xpReward}</span>
          </div>
          <span className="text-xs text-muted-foreground">XP Reward</span>
        </div>
        
        <div className="text-center p-3 bg-success/10 rounded-lg">
          <div className="flex items-center justify-center space-x-2 mb-1">
            <Icon name="FileText" size={16} color="var(--color-success)" />
            <span className="text-sm font-semibold text-success">Report</span>
          </div>
          <span className="text-xs text-muted-foreground">Innovation Artifact</span>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          variant="default"
          onClick={handleAcceptMission}
          loading={isAccepting}
          disabled={isAccepting}
          iconName={isAccepting ? "Loader" : "Play"}
          iconPosition="left"
          iconSize={18}
          fullWidth
          className="py-3 text-base font-medium"
        >
          {isAccepting ? 'Preparing Mission...' : 'Accept Mission & Start SPARK Journey'}
        </Button>
        
        <Button
          variant="outline"
          onClick={handleBackToDashboard}
          disabled={isAccepting}
          iconName="ArrowLeft"
          iconPosition="left"
          iconSize={16}
          fullWidth
        >
          Back to Mission Dashboard
        </Button>
      </div>
      {/* Quick Tips */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-3">💡 Quick Tips</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start space-x-2">
            <Icon name="CheckCircle" size={14} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
            <span>Your progress is automatically saved</span>
          </li>
          <li className="flex items-start space-x-2">
            <Icon name="CheckCircle" size={14} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
            <span>Take your time - quality over speed</span>
          </li>
          <li className="flex items-start space-x-2">
            <Icon name="CheckCircle" size={14} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
            <span>Use the SPARK framework for best results</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MissionActions;