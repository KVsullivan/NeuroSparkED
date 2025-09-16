import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResponsePanel = ({ 
  currentStage, 
  stageData, 
  onResponseChange, 
  onSave, 
  onNext, 
  onPrevious,
  canProceed,
  isFirstStage,
  isLastStage 
}) => {
  const [response, setResponse] = useState(stageData?.response || '');
  const [lastSaved, setLastSaved] = useState(null);
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);

  useEffect(() => {
    setResponse(stageData?.response || '');
  }, [currentStage, stageData]);

  const handleResponseChange = (e) => {
    const newResponse = e?.target?.value;
    setResponse(newResponse);
    onResponseChange(newResponse);
  };

  const handleSave = () => {
    onSave(response);
    setLastSaved(new Date());
    setShowSaveConfirmation(true);
    setTimeout(() => setShowSaveConfirmation(false), 2000);
  };

  const handleNext = () => {
    handleSave();
    onNext();
  };

  const handlePrevious = () => {
    handleSave();
    onPrevious();
  };

  const wordCount = response?.split(' ')?.filter(word => word?.trim() !== '')?.length;
  const charCount = response?.length;
  const minWords = {
    situation: 50,
    plan: 75,
    action: 100,
    reflection: 75,
    knowledge: 60
  }?.[currentStage] || 50;

  const isMinWordsMet = wordCount >= minWords;
  const progressPercentage = Math.min((wordCount / minWords) * 100, 100);

  return (
    <div className="bg-card h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Your Response</h3>
          <div className="flex items-center space-x-4">
            {/* Word Count Indicator */}
            <div className="flex items-center space-x-2">
              <div className={`w-12 h-2 bg-muted rounded-full overflow-hidden`}>
                <div 
                  className={`h-full transition-all duration-300 ${
                    isMinWordsMet ? 'bg-success' : 'bg-primary'
                  }`}
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <span className={`text-sm font-medium ${
                isMinWordsMet ? 'text-success' : 'text-muted-foreground'
              }`}>
                {wordCount}/{minWords} words
              </span>
            </div>

            {/* Auto-save Status */}
            {showSaveConfirmation && (
              <div className="flex items-center space-x-1 text-success text-sm">
                <Icon name="Check" size={14} />
                <span>Saved</span>
              </div>
            )}
          </div>
        </div>

        {/* Quick Tips */}
        <div className="bg-muted/50 rounded-lg p-3">
          <p className="text-sm text-muted-foreground">
            <Icon name="Info" size={14} className="inline mr-1" />
            Be specific and detailed. Your responses will be included in your Innovation Report.
          </p>
        </div>
      </div>
      {/* Response Input Area */}
      <div className="flex-1 p-6">
        <div className="h-full">
          <textarea
            value={response}
            onChange={handleResponseChange}
            placeholder={`Share your thoughts for the ${currentStage} stage. Be specific and provide concrete examples...`}
            className="w-full h-full resize-none border border-border rounded-lg p-4 text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            style={{ minHeight: '300px' }}
          />
        </div>
      </div>
      {/* Footer with Actions */}
      <div className="p-6 border-t border-border">
        <div className="flex items-center justify-between">
          {/* Character Count */}
          <div className="text-sm text-muted-foreground">
            {charCount?.toLocaleString()} characters
            {lastSaved && (
              <span className="ml-4">
                Last saved: {lastSaved?.toLocaleTimeString()}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={handleSave}
              iconName="Save"
              iconPosition="left"
              iconSize={16}
            >
              Save Progress
            </Button>

            {!isFirstStage && (
              <Button
                variant="secondary"
                onClick={handlePrevious}
                iconName="ArrowLeft"
                iconPosition="left"
                iconSize={16}
              >
                Previous
              </Button>
            )}

            <Button
              variant={isLastStage ? "success" : "default"}
              onClick={handleNext}
              disabled={!canProceed}
              iconName={isLastStage ? "Award" : "ArrowRight"}
              iconPosition="right"
              iconSize={16}
            >
              {isLastStage ? 'Generate Report' : 'Next Stage'}
            </Button>
          </div>
        </div>

        {/* Validation Messages */}
        {!canProceed && (
          <div className="mt-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="AlertTriangle" size={16} color="var(--color-warning)" />
              <span className="text-sm text-warning">
                {!isMinWordsMet 
                  ? `Please write at least ${minWords - wordCount} more words to continue.`
                  : 'Please ensure your response addresses the key questions.'
                }
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResponsePanel;