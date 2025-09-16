import React from 'react';
import Icon from '../../../components/AppIcon';

const SparkSection = ({ title, icon, content, index }) => {
  const sectionColors = {
    0: { bg: 'bg-primary/10', border: 'border-primary/20', icon: 'var(--color-primary)' },
    1: { bg: 'bg-accent/10', border: 'border-accent/20', icon: 'var(--color-accent)' },
    2: { bg: 'bg-warning/10', border: 'border-warning/20', icon: 'var(--color-warning)' },
    3: { bg: 'bg-success/10', border: 'border-success/20', icon: 'var(--color-success)' },
    4: { bg: 'bg-secondary/10', border: 'border-secondary/20', icon: 'var(--color-secondary)' }
  };

  const colors = sectionColors?.[index] || sectionColors?.[0];

  return (
    <div className={`${colors?.bg} ${colors?.border} border rounded-lg p-6 mb-6`}>
      <div className="flex items-center space-x-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 bg-card rounded-full shadow-sm">
          <Icon name={icon} size={20} color={colors?.icon} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">SPARK Methodology - Stage {index + 1}</p>
        </div>
      </div>
      <div className="bg-card rounded-md p-4 border border-border/50">
        <div className="prose prose-sm max-w-none">
          {content?.split('\n')?.map((paragraph, idx) => (
            paragraph?.trim() && (
              <p key={idx} className="text-foreground mb-3 last:mb-0 leading-relaxed">
                {paragraph?.trim()}
              </p>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default SparkSection;