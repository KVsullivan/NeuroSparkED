import React from 'react';
import Icon from '../../../components/AppIcon';

const PromptPanel = ({ currentStage, stageData }) => {
  const getStageConfig = (stage) => {
    const configs = {
      situation: {
        title: 'Understand the Situation',
        icon: 'Eye',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        prompts: [
          `What is the core challenge or opportunity you're addressing?`,
          `Who are the key stakeholders affected by this situation?`,
          `What constraints or limitations do you need to consider?`,
          `What resources are currently available to you?`
        ],
        examples: [
          `"Our team struggles with remote collaboration, affecting project delivery times and team morale."`,
          `"There's an opportunity to reduce customer support response time using automation."`
        ],
        minWords: 50
      },
      plan: {
        title: 'Develop Your Plan',
        icon: 'Target',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        prompts: [
          `What is your primary objective for addressing this situation?`,
          `What specific steps will you take to achieve this objective?`,
          `What timeline will you follow for implementation?`,
          `How will you measure success?`
        ],
        examples: [
          `"Implement weekly video check-ins and shared project dashboards within 2 weeks."`,`"Deploy chatbot for common queries, reducing response time by 60% in 30 days."`
        ],
        minWords: 75
      },
      action: {
        title: 'Take Action',
        icon: 'Zap',
        color: 'text-purple-600',
        bgColor: 'bg-purple-50',
        prompts: [
          `What specific actions have you taken or will you take?`,
          `What tools, methods, or approaches are you using?`,
          `How are you tracking progress during implementation?`,
          `What adjustments have you made along the way?`
        ],
        examples: [
          `"Set up Slack channels for each project, implemented daily standups, created shared Notion workspace."`,`"Configured Intercom chatbot with 20 common FAQ responses, trained team on escalation process."`
        ],
        minWords: 100
      },
      reflection: {
        title: 'Reflect on Results',
        icon: 'Mirror',
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        prompts: [
          `What worked well in your approach?`,
          `What challenges did you encounter?`,
          `What would you do differently next time?`,
          `What unexpected insights did you gain?`
        ],
        examples: [
          `"Video calls improved team connection, but timezone differences required flexible scheduling."`,`"Chatbot handled 70% of queries successfully, but needed more nuanced responses for complex issues."`
        ],
        minWords: 75
      },
      knowledge: {
        title: 'Capture Knowledge',
        icon: 'BookOpen',
        color: 'text-indigo-600',
        bgColor: 'bg-indigo-50',
        prompts: [
          `What key principles or frameworks did you learn?`,
          `What skills did you develop or strengthen?`,
          `How can this knowledge be applied to future situations?`,
          `What resources would you recommend to others?`
        ],
        examples: [
          `"Learned importance of asynchronous communication tools and regular check-in cadence for remote teams."`,`"Discovered that automation works best when combined with human oversight for complex customer needs."`
        ],
        minWords: 60
      }
    };
    
    return configs?.[stage] || configs?.situation;
  };

  const config = getStageConfig(currentStage);
  const wordCount = stageData?.response?.split(' ')?.filter(word => word?.trim() !== '')?.length || 0;
  const isMinWordsMet = wordCount >= config?.minWords;

  return (
    <div className="bg-card border-r border-border h-full overflow-y-auto">
      <div className="p-6">
        {/* Stage Header */}
        <div className={`${config?.bgColor} rounded-lg p-4 mb-6`}>
          <div className="flex items-center space-x-3 mb-2">
            <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-sm">
              <Icon name={config?.icon} size={20} color={config?.color?.replace('text-', '#')} />
            </div>
            <div>
              <h2 className={`text-xl font-bold ${config?.color}`}>
                {config?.title}
              </h2>
              <p className="text-sm text-muted-foreground">
                Stage {Object.keys({situation: 1, plan: 2, action: 3, reflection: 4, knowledge: 5})?.[Object.keys({situation: 1, plan: 2, action: 3, reflection: 4, knowledge: 5})?.indexOf(currentStage)]} of 5
              </p>
            </div>
          </div>
        </div>

        {/* Prompts Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <Icon name="HelpCircle" size={18} className="mr-2" />
            Guiding Questions
          </h3>
          <div className="space-y-3">
            {config?.prompts?.map((prompt, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground rounded-full text-xs font-medium flex-shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <p className="text-sm text-foreground leading-relaxed">{prompt}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Examples Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <Icon name="Lightbulb" size={18} className="mr-2" />
            Example Responses
          </h3>
          <div className="space-y-3">
            {config?.examples?.map((example, index) => (
              <div key={index} className="p-4 bg-accent/10 border-l-4 border-accent rounded-r-lg">
                <p className="text-sm text-foreground italic">{example}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-2" />
            Requirements
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li className="flex items-center">
              <Icon 
                name={isMinWordsMet ? "CheckCircle" : "Circle"} 
                size={14} 
                color={isMinWordsMet ? "var(--color-success)" : "var(--color-muted-foreground)"} 
                className="mr-2" 
              />
              Minimum {config?.minWords} words ({wordCount} current)
            </li>
            <li className="flex items-center">
              <Icon name="Circle" size={14} className="mr-2" />
              Address at least 2 guiding questions
            </li>
            <li className="flex items-center">
              <Icon name="Circle" size={14} className="mr-2" />
              Provide specific, actionable details
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PromptPanel;