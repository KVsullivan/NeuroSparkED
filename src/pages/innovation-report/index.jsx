import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ProgressHeader from '../../components/ui/ProgressHeader';
import MissionBreadcrumbs from '../../components/ui/MissionBreadcrumbs';
import QuickActionButton from '../../components/ui/QuickActionButton';
import AchievementToast, { triggerAchievement } from '../../components/ui/AchievementToast';
import ReportHeader from './components/ReportHeader';
import ReportPreview from './components/ReportPreview';
import CompletionCelebration from './components/CompletionCelebration';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const InnovationReport = () => {
  const navigate = useNavigate();
  const [showCelebration, setShowCelebration] = useState(true);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  // Mock report data
  const [reportData] = useState({
    missionTitle: "Sustainable Urban Transportation Challenge",
    learnerName: "Alex Johnson",
    completionDate: "September 8, 2025",
    missionDuration: "3 hours 45 minutes",
    reportId: "NSE-2025-0908-001",
    certificateId: "CERT-NSE-20250908-AJ001",
    validationCode: "VLD-8F2A-9B3C-1D4E",
    xpEarned: 350,
    executiveSummary: `This innovation report presents a comprehensive analysis of sustainable urban transportation challenges and proposes an integrated solution combining electric micro-mobility, smart traffic management, and community engagement strategies. Through the SPARK methodology, this project demonstrates practical problem-solving skills and innovative thinking applied to real-world urban planning challenges.`,
    sparkResponses: {
      situation: `Urban transportation in metropolitan areas faces critical challenges including traffic congestion, air pollution, and limited parking infrastructure. Current public transportation systems are often inadequate for last-mile connectivity, leading to increased private vehicle dependency.\n\nKey stakeholders include city planners, residents, environmental agencies, and transportation companies. The situation requires immediate attention as urban populations continue to grow and environmental concerns intensify.`,
      plan: `The strategic approach involves developing an integrated micro-mobility network with electric scooters and bikes, implementing smart traffic light systems, and creating community-based transportation hubs.\n\nPhase 1: Pilot program in downtown core area\nPhase 2: Expansion to residential neighborhoods\nPhase 3: Integration with existing public transit\n\nSuccess metrics include reduced traffic congestion by 25%, decreased carbon emissions by 30%, and improved citizen satisfaction scores.`,
      action: `Implementation began with stakeholder mapping and community surveys to understand transportation patterns. Partnerships were established with electric vehicle manufacturers and local government agencies.\n\nKey actions taken:\n- Conducted feasibility studies for 15 potential hub locations\n- Developed mobile app prototype for integrated booking system\n- Created pilot program proposal with budget projections\n- Engaged community leaders through town hall meetings`,
      reflection: `The project revealed the complexity of urban transportation systems and the importance of community buy-in for successful implementation. Initial resistance from traditional taxi services highlighted the need for inclusive transition strategies.\n\nLessons learned include the critical role of data-driven decision making and the value of iterative design processes. Future improvements would include earlier engagement with all stakeholder groups and more comprehensive environmental impact assessments.`,
      knowledge: `This experience enhanced understanding of systems thinking, stakeholder management, and sustainable development principles. Key competencies developed include project management, data analysis, and community engagement strategies.\n\nThe SPARK methodology proved effective for structured problem-solving, particularly in complex multi-stakeholder environments. This knowledge will be applicable to future urban planning challenges and innovation projects requiring collaborative solutions.`
    },
    achievements: {
      totalXP: 2800,
      currentLevel: 9,
      xpGainedThisMission: 350
    },
    streakData: {
      currentStreak: 13,
      longestStreak: 18
    },
    skillsGained: [
      "Systems Thinking",
      "Stakeholder Management", 
      "Sustainable Development",
      "Data Analysis",
      "Community Engagement",
      "Project Management"
    ]
  });

  useEffect(() => {
    // Trigger achievement notifications
    if (!showCelebration) {
      setTimeout(() => {
        triggerAchievement('mission_complete', { 
          missionName: reportData?.missionTitle 
        });
      }, 1000);
      
      setTimeout(() => {
        triggerAchievement('xp_gain', { 
          amount: reportData?.xpEarned, 
          reason: 'Mission completion bonus' 
        });
      }, 2000);
    }
  }, [showCelebration, reportData]);

  const handleDownloadReport = async () => {
    setIsGeneratingReport(true);
    
    try {
      // Generate HTML report with embedded CSS
      const reportHTML = generateHTMLReport(reportData);
      
      // Create downloadable file
      const blob = new Blob([reportHTML], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Innovation_Report_${reportData?.reportId}.html`;
      document.body?.appendChild(link);
      link?.click();
      document.body?.removeChild(link);
      URL.revokeObjectURL(url);
      
      // Trigger success notification
      triggerAchievement('badge_earned', { 
        badgeName: 'Report Generator' 
      });
      
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const generateHTMLReport = (data) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Innovation Report - ${data?.missionTitle}</title>
    <style>
        body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #1A1D23; max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; border-bottom: 2px solid #0066FF; padding-bottom: 20px; margin-bottom: 30px; }
        .title { color: #0066FF; font-size: 2.5em; margin-bottom: 10px; }
        .subtitle { color: #6B7280; font-size: 1.2em; }
        .section { margin-bottom: 30px; padding: 20px; border-left: 4px solid #00FF66; background: #F9FAFB; }
        .section-title { color: #001F3F; font-size: 1.5em; margin-bottom: 15px; }
        .certificate { border: 3px solid #0066FF; padding: 30px; text-align: center; margin: 40px 0; background: linear-gradient(135deg, #F0F8FF, #E6F7FF); }
        .xp-badge { display: inline-block; background: #00FF66; color: white; padding: 10px 20px; border-radius: 25px; font-weight: bold; }
        @media print { body { margin: 0; padding: 15px; } }
    </style>
</head>
<body>
    <div class="header">
        <h1 class="title">${data?.missionTitle}</h1>
        <p class="subtitle">Innovation Report & Learning Artifact</p>
        <p>Completed by: <strong>${data?.learnerName}</strong> | Date: <strong>${data?.completionDate}</strong></p>
        <span class="xp-badge">+${data?.xpEarned} XP Earned</span>
    </div>
    
    <div class="section">
        <h2 class="section-title">Executive Summary</h2>
        <p>${data?.executiveSummary}</p>
    </div>
    
    <div class="section">
        <h2 class="section-title">Situation Analysis</h2>
        <p>${data?.sparkResponses?.situation?.replace(/\n/g, '</p><p>')}</p>
    </div>
    
    <div class="section">
        <h2 class="section-title">Strategic Planning</h2>
        <p>${data?.sparkResponses?.plan?.replace(/\n/g, '</p><p>')}</p>
    </div>
    
    <div class="section">
        <h2 class="section-title">Action Implementation</h2>
        <p>${data?.sparkResponses?.action?.replace(/\n/g, '</p><p>')}</p>
    </div>
    
    <div class="section">
        <h2 class="section-title">Reflection & Learning</h2>
        <p>${data?.sparkResponses?.reflection?.replace(/\n/g, '</p><p>')}</p>
    </div>
    
    <div class="section">
        <h2 class="section-title">Knowledge Integration</h2>
        <p>${data?.sparkResponses?.knowledge?.replace(/\n/g, '</p><p>')}</p>
    </div>
    
    <div class="certificate">
        <h2>Certificate of Completion</h2>
        <p>This certifies that <strong>${data?.learnerName}</strong> has successfully completed the mission "${data?.missionTitle}" using the SPARK methodology.</p>
        <p><strong>Certificate ID:</strong> ${data?.certificateId}</p>
        <p><strong>Validation Code:</strong> ${data?.validationCode}</p>
    </div>
    
    <footer style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #E5E7EB; color: #6B7280;">
        <p>Generated by NeuroSparkED Innovation Platform</p>
        <p>Report ID: ${data?.reportId} | Generated: ${new Date()?.toLocaleString()}</p>
    </footer>
</body>
</html>`;
  };

  const handleShareReport = () => {
    if (navigator.share) {
      navigator.share({
        title: `Innovation Report - ${reportData?.missionTitle}`,
        text: `I just completed a mission on NeuroSparkED and earned ${reportData?.xpEarned} XP!`,
        url: window.location?.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard?.writeText(
        `I just completed "${reportData?.missionTitle}" on NeuroSparkED and earned ${reportData?.xpEarned} XP! 🚀`
      );
      triggerAchievement('badge_earned', { badgeName: 'Social Sharer' });
    }
  };

  const handlePrintReport = () => {
    window.print();
  };

  const handleContinueToDashboard = () => {
    navigate('/mission-dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProgressHeader />
      <MissionBreadcrumbs />
      {/* Completion Celebration Modal */}
      {showCelebration && (
        <CompletionCelebration
          xpEarned={reportData?.xpEarned}
          onContinue={() => setShowCelebration(false)}
        />
      )}
      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Report Header */}
        <ReportHeader
          missionTitle={reportData?.missionTitle}
          completionDate={reportData?.completionDate}
          learnerName={reportData?.learnerName}
          xpEarned={reportData?.xpEarned}
          onDownload={handleDownloadReport}
          onShare={handleShareReport}
          onPrint={handlePrintReport}
        />

        {/* Report Preview */}
        <div className="mt-8">
          <ReportPreview reportData={reportData} />
        </div>

        {/* Next Steps */}
        <div className="mt-8 bg-card border border-border rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Icon name="ArrowRight" size={20} color="var(--color-primary)" />
            <h3 className="text-lg font-semibold text-foreground">What's Next?</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant="default"
              onClick={handleContinueToDashboard}
              iconName="Compass"
              iconPosition="left"
              iconSize={16}
              fullWidth
              className="justify-start"
            >
              <div className="text-left">
                <div className="font-medium">Explore New Missions</div>
                <div className="text-sm text-primary-foreground/80">Discover more challenges</div>
              </div>
            </Button>
            
            <Button
              variant="outline"
              onClick={() => navigate('/progress-tracking')}
              iconName="TrendingUp"
              iconPosition="left"
              iconSize={16}
              fullWidth
              className="justify-start"
            >
              <div className="text-left">
                <div className="font-medium">View Progress</div>
                <div className="text-sm text-muted-foreground">Track your achievements</div>
              </div>
            </Button>
          </div>
        </div>
      </main>
      {/* Loading Overlay for Report Generation */}
      {isGeneratingReport && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 flex items-center justify-center">
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-foreground font-medium">Generating your report...</p>
            <p className="text-sm text-muted-foreground">This may take a few moments</p>
          </div>
        </div>
      )}
      <QuickActionButton />
      <AchievementToast />
    </div>
  );
};

export default InnovationReport;