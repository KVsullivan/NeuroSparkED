import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TaskNudge = ({ currentStage, lastActivity, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [nudgeType, setNudgeType] = useState('idle');

  useEffect(() => {
    const checkForNudge = () => {
      const now = Date.now();
      const timeSinceActivity = now - lastActivity;
      const fiveMinutes = 5 * 60 * 1000;
      const tenMinutes = 10 * 60 * 1000;

      if (timeSinceActivity > tenMinutes) {
        setNudgeType('extended_idle');
        setIsVisible(true);
      } else if (timeSinceActivity > fiveMinutes) {
        setNudgeType('idle');
        setIsVisible(true);
      }
    };

    const interval = setInterval(checkForNudge, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [lastActivity]);

  const getNudgeContent = () => {
    const nudges = {
      situation: {
        idle: {
          title: "Still exploring the situation?",
          message: "Take your time to understand all aspects of the challenge. Consider the stakeholders and constraints involved.",
          tips: ["Think about who is affected by this situation", "Consider what resources you have available", "Identify the core problem to solve"]
        },
        extended_idle: {
          title: "Need some inspiration?",
          message: "Sometimes the best insights come from stepping back and looking at the bigger picture.",
          tips: ["Try describing the situation to someone else", "Look for similar challenges you\'ve faced before", "Consider the impact if this situation isn't addressed"]
        }
      },
      plan: {
        idle: {
          title: "Planning your approach?",
          message: "A good plan addresses the 'what', 'how', and 'when' of your solution.",
          tips: ["Break down your objective into specific steps", "Set realistic timelines for each phase", "Think about how you\'ll measure success"]
        },
        extended_idle: {
          title: "Stuck on planning?",
          message: "Great plans often start simple and get refined as you think through the details.",
          tips: ["Start with your end goal and work backwards", "Consider what could go wrong and plan for it", "Think about what resources you\'ll need"]
        }
      },
      action: {
        idle: {
          title: "Ready to document your actions?",
          message: "This is where you showcase what you've actually done or will do to address the situation.",
          tips: ["Be specific about the tools and methods you used", "Include any adjustments you made along the way", "Mention how you tracked your progress"]
        },
        extended_idle: {
          title: "Actions speak louder than words!",
          message: "Even small steps count. Document everything you\'ve tried or plan to try.",
          tips: ["Include failed attempts - they show learning", "Mention collaboration with others", "Describe your implementation process step by step"]
        }
      },
      reflection: {
        idle: {
          title: "Time to reflect on your journey",
          message: "Reflection is where the real learning happens. Be honest about what worked and what didn\'t.",
          tips: ["Consider both successes and challenges", "Think about what surprised you", "Identify what you'd do differently next time"]
        },
        extended_idle: {
          title: "Deep reflection takes time",
          message: "The best insights often come from really thinking about the \'why\' behind your experiences.",
          tips: ["What patterns do you notice in your approach?", "How did your thinking change throughout the process?", "What would you tell someone facing a similar challenge?"]
        }
      },
      knowledge: {
        idle: {
          title: "Capturing your key learnings?",
          message: "This is your chance to distill everything into actionable knowledge for the future.",
          tips: ["Focus on principles that could apply elsewhere", "Include specific skills you developed", "Mention resources that were particularly helpful"]
        },
        extended_idle: {
          title: "Knowledge is power!",
          message: "The insights you capture here will be valuable for future challenges and for others learning from your experience.",
          tips: ["Think about frameworks or models you discovered", "Consider how this knowledge connects to other areas", "What would you put in a \'lessons learned\' handbook?"]
        }
      }
    };

    return nudges?.[currentStage]?.[nudgeType] || nudges?.situation?.idle;
  };

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss();
  };

  const handleSnooze = () => {
    setIsVisible(false);
    // Re-show after 10 minutes
    setTimeout(() => setIsVisible(true), 10 * 60 * 1000);
  };

  if (!isVisible) return null;

  const content = getNudgeContent();

  return (
    <div className="fixed bottom-6 left-6 max-w-sm z-30 animate-slide-in">
      <div className="bg-card border border-border rounded-lg shadow-elevation-8 p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
              <Icon name="Lightbulb" size={20} color="var(--color-accent)" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-foreground mb-1">
              {content?.title}
            </h4>
            <p className="text-sm text-muted-foreground mb-3">
              {content?.message}
            </p>
            
            {content?.tips && (
              <div className="mb-4">
                <p className="text-xs font-medium text-foreground mb-2">Quick tips:</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {content?.tips?.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <Icon name="ArrowRight" size={12} className="mr-1 mt-0.5 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSnooze}
                iconName="Clock"
                iconPosition="left"
                iconSize={14}
              >
                Snooze
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDismiss}
                iconName="X"
                iconSize={14}
              >
                Dismiss
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskNudge;