import React from 'react';
import Icon from '../../../components/AppIcon';

const MissionScenario = ({ mission }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center space-x-3 mb-4">
        <Icon name="BookOpen" size={20} color="var(--color-primary)" />
        <h3 className="text-lg font-semibold text-foreground">Mission Scenario</h3>
      </div>
      <div className="prose prose-sm max-w-none">
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 border-l-4 border-primary p-4 rounded-r-lg mb-4">
          <p className="text-foreground leading-relaxed mb-0">
            {mission?.scenario}
          </p>
        </div>
        
        {/* Challenge Context */}
        <div className="mb-6">
          <h4 className="text-md font-semibold text-foreground mb-3 flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} color="var(--color-warning)" />
            <span>The Challenge</span>
          </h4>
          <p className="text-muted-foreground leading-relaxed">
            {mission?.challenge}
          </p>
        </div>
        
        {/* Your Role */}
        <div className="mb-6">
          <h4 className="text-md font-semibold text-foreground mb-3 flex items-center space-x-2">
            <Icon name="User" size={16} color="var(--color-accent)" />
            <span>Your Role</span>
          </h4>
          <p className="text-muted-foreground leading-relaxed">
            {mission?.yourRole}
          </p>
        </div>
        
        {/* Key Stakeholders */}
        {mission?.stakeholders && mission?.stakeholders?.length > 0 && (
          <div className="mb-6">
            <h4 className="text-md font-semibold text-foreground mb-3 flex items-center space-x-2">
              <Icon name="Users" size={16} color="var(--color-secondary)" />
              <span>Key Stakeholders</span>
            </h4>
            <div className="grid gap-3">
              {mission?.stakeholders?.map((stakeholder, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full flex-shrink-0">
                    <Icon name="User" size={14} color="var(--color-primary)" />
                  </div>
                  <div>
                    <h5 className="font-medium text-foreground">{stakeholder?.role}</h5>
                    <p className="text-sm text-muted-foreground">{stakeholder?.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Success Vision */}
        <div className="bg-success/5 border border-success/20 rounded-lg p-4">
          <h4 className="text-md font-semibold text-foreground mb-3 flex items-center space-x-2">
            <Icon name="Trophy" size={16} color="var(--color-success)" />
            <span>Vision of Success</span>
          </h4>
          <p className="text-muted-foreground leading-relaxed mb-0">
            {mission?.successVision}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MissionScenario;