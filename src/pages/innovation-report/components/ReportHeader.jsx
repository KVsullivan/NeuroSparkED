import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReportHeader = ({ 
  missionTitle, 
  completionDate, 
  learnerName, 
  xpEarned, 
  onDownload, 
  onShare, 
  onPrint 
}) => {
  return (
    <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Report Info */}
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <div className="flex items-center justify-center w-10 h-10 bg-success rounded-full">
              <Icon name="Award" size={20} color="white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Innovation Report</h1>
              <p className="text-sm text-muted-foreground">Mission Completion Certificate</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Mission</p>
              <p className="text-sm font-medium text-foreground">{missionTitle}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Completed By</p>
              <p className="text-sm font-medium text-foreground">{learnerName}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Date</p>
              <p className="text-sm font-medium text-foreground">{completionDate}</p>
            </div>
          </div>
        </div>

        {/* XP Achievement */}
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-accent/20 rounded-full mb-2">
              <Icon name="Zap" size={24} color="var(--color-accent)" />
            </div>
            <p className="text-lg font-bold text-accent">+{xpEarned}</p>
            <p className="text-xs text-muted-foreground">XP Earned</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3 mt-6 pt-4 border-t border-border/50">
        <Button
          variant="default"
          onClick={onDownload}
          iconName="Download"
          iconPosition="left"
          iconSize={16}
          className="px-4 py-2"
        >
          Download Report
        </Button>
        
        <Button
          variant="outline"
          onClick={onShare}
          iconName="Share2"
          iconPosition="left"
          iconSize={16}
          className="px-4 py-2"
        >
          Share Achievement
        </Button>
        
        <Button
          variant="ghost"
          onClick={onPrint}
          iconName="Printer"
          iconPosition="left"
          iconSize={16}
          className="px-4 py-2"
        >
          Print
        </Button>
      </div>
    </div>
  );
};

export default ReportHeader;