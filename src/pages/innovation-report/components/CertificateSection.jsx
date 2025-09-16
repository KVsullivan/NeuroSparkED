import React from 'react';
import Icon from '../../../components/AppIcon';

const CertificateSection = ({ 
  certificateId, 
  missionTitle, 
  learnerName, 
  completionDate, 
  validationCode 
}) => {
  return (
    <div className="bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 rounded-lg p-8 mb-6">
      <div className="text-center">
        {/* Certificate Header */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-full mr-4">
            <Icon name="Award" size={28} color="white" />
          </div>
          <div className="text-left">
            <h2 className="text-2xl font-bold text-foreground">Certificate of Completion</h2>
            <p className="text-sm text-muted-foreground">NeuroSparkED Innovation Program</p>
          </div>
        </div>

        {/* Certificate Content */}
        <div className="space-y-4 mb-6">
          <p className="text-lg text-foreground">
            This certifies that
          </p>
          <p className="text-3xl font-bold text-primary border-b-2 border-primary/20 pb-2 inline-block">
            {learnerName}
          </p>
          <p className="text-lg text-foreground">
            has successfully completed the mission
          </p>
          <p className="text-xl font-semibold text-accent">
            "{missionTitle}"
          </p>
          <p className="text-base text-muted-foreground">
            demonstrating proficiency in the SPARK methodology and innovative problem-solving
          </p>
        </div>

        {/* Certificate Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-border">
          <div className="text-left mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">Completion Date</p>
            <p className="font-medium text-foreground">{completionDate}</p>
          </div>
          
          <div className="text-center mb-4 md:mb-0">
            <div className="flex items-center justify-center w-12 h-12 bg-accent rounded-full mb-2 mx-auto">
              <Icon name="CheckCircle" size={20} color="white" />
            </div>
            <p className="text-xs text-muted-foreground">Verified Achievement</p>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Certificate ID</p>
            <p className="font-mono text-sm font-medium text-foreground">{certificateId}</p>
          </div>
        </div>

        {/* Validation Code */}
        <div className="mt-6 pt-4 border-t border-border/50">
          <p className="text-xs text-muted-foreground mb-1">Validation Code</p>
          <p className="font-mono text-sm text-foreground bg-muted px-3 py-1 rounded inline-block">
            {validationCode}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CertificateSection;