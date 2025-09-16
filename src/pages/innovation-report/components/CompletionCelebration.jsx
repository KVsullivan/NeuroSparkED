import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CompletionCelebration = ({ xpEarned, onContinue }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [animationPhase, setAnimationPhase] = useState('entering');

  useEffect(() => {
    // Animation sequence
    const timer1 = setTimeout(() => setAnimationPhase('celebrating'), 500);
    const timer2 = setTimeout(() => setAnimationPhase('stable'), 2000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleDismiss = () => {
    setAnimationPhase('exiting');
    setTimeout(() => {
      setIsVisible(false);
      onContinue();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 ${
      animationPhase === 'entering' ? 'animate-fade-in' : 
      animationPhase === 'exiting' ? 'animate-fade-out' : ''
    }`}>
      <div className={`bg-card border border-border rounded-xl shadow-elevation-8 p-8 max-w-md w-full text-center ${
        animationPhase === 'celebrating' ? 'animate-bounce' : ''
      }`}>
        {/* Success Icon */}
        <div className="flex items-center justify-center w-20 h-20 bg-success rounded-full mx-auto mb-6">
          <Icon name="Trophy" size={32} color="white" />
        </div>

        {/* Celebration Message */}
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Mission Accomplished! 🎉
        </h2>
        <p className="text-muted-foreground mb-6">
          Congratulations! You've successfully completed your SPARK journey and created a professional innovation report.
        </p>

        {/* XP Award */}
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Icon name="Zap" size={24} color="var(--color-accent)" />
            <span className="text-2xl font-bold text-accent">+{xpEarned} XP</span>
          </div>
          <p className="text-sm text-muted-foreground">Experience Points Earned</p>
        </div>

        {/* Achievement Badges */}
        <div className="flex justify-center space-x-4 mb-6">
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-2">
              <Icon name="Award" size={20} color="var(--color-primary)" />
            </div>
            <p className="text-xs text-muted-foreground">Mission Complete</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-warning/10 rounded-full mb-2">
              <Icon name="Flame" size={20} color="var(--color-warning)" />
            </div>
            <p className="text-xs text-muted-foreground">Streak Maintained</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-success/10 rounded-full mb-2">
              <Icon name="Brain" size={20} color="var(--color-success)" />
            </div>
            <p className="text-xs text-muted-foreground">Skills Gained</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            variant="default"
            onClick={handleDismiss}
            iconName="ArrowRight"
            iconPosition="right"
            iconSize={16}
            fullWidth
          >
            View Full Report
          </Button>
          
          <p className="text-xs text-muted-foreground">
            Your innovation report is ready for download and sharing
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompletionCelebration;