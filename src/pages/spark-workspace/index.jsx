import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ProgressHeader from '../../components/ui/ProgressHeader';
import MissionBreadcrumbs from '../../components/ui/MissionBreadcrumbs';
import QuickActionButton from '../../components/ui/QuickActionButton';
import AchievementToast, { triggerAchievement } from '../../components/ui/AchievementToast';
import StageProgress from './components/StageProgress';
import PromptPanel from './components/PromptPanel';
import ResponsePanel from './components/ResponsePanel';
import ProgressSidebar from './components/ProgressSidebar';
import TaskNudge from './components/TaskNudge';

const SparkWorkspace = () => {
  const navigate = useNavigate();
  const [currentStage, setCurrentStage] = useState('situation');
  const [completedStages, setCompletedStages] = useState([]);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [showTaskNudge, setShowTaskNudge] = useState(false);

  // Mock user progress data
  const [userProgress, setUserProgress] = useState({
    xp: 2450,
    level: 8,
    streak: 12,
    nextLevelXP: 3000,
    completedMissions: 15,
    totalMissions: 24
  });

  // Mock SPARK stage data
  const [stageData, setStageData] = useState({
    situation: {
      response: `Our remote development team of 12 members across 4 time zones is struggling with effective collaboration and communication. Daily standups are challenging due to timezone differences, project visibility is limited, and team members often work in isolation without clear understanding of dependencies. This has led to delayed deliveries, duplicated work, and decreased team morale. Key stakeholders include the development team, project managers, and clients expecting timely delivery. Current resources include Slack for communication, Jira for project management, and GitHub for code collaboration, but these tools aren't being used optimally for our distributed setup.`,
      timestamp: new Date('2025-01-08T10:30:00'),
      wordCount: 95
    },
    plan: {
      response: '',
      timestamp: null,
      wordCount: 0
    },
    action: {
      response: '',
      timestamp: null,
      wordCount: 0
    },
    reflection: {
      response: '',
      timestamp: null,
      wordCount: 0
    },
    knowledge: {
      response: '',
      timestamp: null,
      wordCount: 0
    }
  });

  useEffect(() => {
    // Load saved progress from localStorage
    const savedProgress = localStorage.getItem('neurosparked-spark-progress');
    if (savedProgress) {
      const parsed = JSON.parse(savedProgress);
      setCurrentStage(parsed?.currentStage || 'situation');
      setCompletedStages(parsed?.completedStages || []);
      setStageData(prev => ({ ...prev, ...parsed?.stageData }));
    }

    // Update activity timestamp on any interaction
    const updateActivity = () => setLastActivity(Date.now());
    document.addEventListener('click', updateActivity);
    document.addEventListener('keypress', updateActivity);

    return () => {
      document.removeEventListener('click', updateActivity);
      document.removeEventListener('keypress', updateActivity);
    };
  }, []);

  useEffect(() => {
    // Auto-save progress
    const progressData = {
      currentStage,
      completedStages,
      stageData,
      lastSaved: new Date()?.toISOString()
    };
    localStorage.setItem('neurosparked-spark-progress', JSON.stringify(progressData));
  }, [currentStage, completedStages, stageData]);

  const handleStageClick = (stageId) => {
    if (completedStages?.includes(stageId) || stageId === currentStage) {
      setCurrentStage(stageId);
    }
  };

  const handleResponseChange = (response) => {
    const wordCount = response?.split(' ')?.filter(word => word?.trim() !== '')?.length;
    setStageData(prev => ({
      ...prev,
      [currentStage]: {
        ...prev?.[currentStage],
        response,
        wordCount,
        timestamp: new Date()
      }
    }));
    setLastActivity(Date.now());
  };

  const handleSave = (response) => {
    const wordCount = response?.split(' ')?.filter(word => word?.trim() !== '')?.length;
    setStageData(prev => ({
      ...prev,
      [currentStage]: {
        ...prev?.[currentStage],
        response,
        wordCount,
        timestamp: new Date()
      }
    }));
    
    // Trigger save achievement
    triggerAchievement('xp_gain', { 
      amount: 25, 
      reason: `Progress saved in ${currentStage} stage` 
    });
  };

  const canProceedToNext = () => {
    const currentData = stageData?.[currentStage];
    const minWords = {
      situation: 50,
      plan: 75,
      action: 100,
      reflection: 75,
      knowledge: 60
    }?.[currentStage] || 50;

    return currentData?.wordCount >= minWords;
  };

  const handleNext = () => {
    if (!canProceedToNext()) return;

    // Mark current stage as completed
    if (!completedStages?.includes(currentStage)) {
      setCompletedStages(prev => [...prev, currentStage]);
      
      // Award XP for stage completion
      const stageXP = {
        situation: 50,
        plan: 75,
        action: 100,
        reflection: 75,
        knowledge: 100
      }?.[currentStage] || 50;

      setUserProgress(prev => ({
        ...prev,
        xp: prev?.xp + stageXP
      }));

      triggerAchievement('xp_gain', { 
        amount: stageXP, 
        reason: `${currentStage?.charAt(0)?.toUpperCase() + currentStage?.slice(1)} stage completed` 
      });
    }

    // Navigate to next stage or report
    const stages = ['situation', 'plan', 'action', 'reflection', 'knowledge'];
    const currentIndex = stages?.indexOf(currentStage);
    
    if (currentIndex < stages?.length - 1) {
      setCurrentStage(stages?.[currentIndex + 1]);
    } else {
      // All stages completed, navigate to innovation report
      triggerAchievement('mission_complete', { 
        missionName: 'Remote Team Collaboration Challenge' 
      });
      navigate('/innovation-report');
    }
  };

  const handlePrevious = () => {
    const stages = ['situation', 'plan', 'action', 'reflection', 'knowledge'];
    const currentIndex = stages?.indexOf(currentStage);
    
    if (currentIndex > 0) {
      setCurrentStage(stages?.[currentIndex - 1]);
    }
  };

  const isFirstStage = currentStage === 'situation';
  const isLastStage = currentStage === 'knowledge';

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProgressHeader />
      <MissionBreadcrumbs />
      <div className="flex-1">
        <StageProgress 
          currentStage={currentStage}
          completedStages={completedStages}
          onStageClick={handleStageClick}
        />
        
        <div className="flex h-[calc(100vh-280px)]">
          {/* Main Content Area */}
          <div className="flex-1 flex">
            {/* Prompt Panel */}
            <div className="w-1/2 lg:w-2/5">
              <PromptPanel 
                currentStage={currentStage}
                stageData={stageData?.[currentStage]}
              />
            </div>
            
            {/* Response Panel */}
            <div className="w-1/2 lg:w-3/5">
              <ResponsePanel
                currentStage={currentStage}
                stageData={stageData?.[currentStage]}
                onResponseChange={handleResponseChange}
                onSave={handleSave}
                onNext={handleNext}
                onPrevious={handlePrevious}
                canProceed={canProceedToNext()}
                isFirstStage={isFirstStage}
                isLastStage={isLastStage}
              />
            </div>
          </div>
          
          {/* Progress Sidebar */}
          <div className="hidden xl:block">
            <ProgressSidebar 
              userProgress={userProgress}
              currentStage={currentStage}
              completedStages={completedStages}
            />
          </div>
        </div>
      </div>
      {/* Task Nudge */}
      <TaskNudge
        currentStage={currentStage}
        lastActivity={lastActivity}
        onDismiss={() => setShowTaskNudge(false)}
      />
      <QuickActionButton />
      <AchievementToast />
    </div>
  );
};

export default SparkWorkspace;