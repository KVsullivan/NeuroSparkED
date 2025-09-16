import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const MissionObjectives = ({ mission }) => {
  const [expandedSection, setExpandedSection] = useState('objectives');

  const sections = [
    {
      id: 'objectives',
      title: 'Learning Objectives',
      icon: 'Target',
      content: mission?.objectives
    },
    {
      id: 'outcomes',
      title: 'Expected Outcomes',
      icon: 'Award',
      content: mission?.expectedOutcomes
    },
    {
      id: 'requirements',
      title: 'Requirements',
      icon: 'CheckSquare',
      content: mission?.requirements
    },
    {
      id: 'criteria',
      title: 'Success Criteria',
      icon: 'Star',
      content: mission?.successCriteria
    }
  ];

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Mission Overview</h3>
      <div className="space-y-3">
        {sections?.map((section) => (
          <div key={section?.id} className="border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection(section?.id)}
              className="w-full flex items-center justify-between p-4 bg-muted/50 hover:bg-muted transition-colors duration-150"
            >
              <div className="flex items-center space-x-3">
                <Icon name={section?.icon} size={18} color="var(--color-primary)" />
                <span className="font-medium text-foreground">{section?.title}</span>
              </div>
              <Icon 
                name={expandedSection === section?.id ? "ChevronUp" : "ChevronDown"} 
                size={18} 
                color="var(--color-muted-foreground)" 
              />
            </button>
            
            {expandedSection === section?.id && (
              <div className="p-4 bg-card">
                <ul className="space-y-2">
                  {section?.content?.map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Icon name="ArrowRight" size={14} color="var(--color-accent)" className="mt-1 flex-shrink-0" />
                      <span className="text-sm text-foreground leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MissionObjectives;