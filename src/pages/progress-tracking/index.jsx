import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ProgressHeader from '../../components/ui/ProgressHeader';
import MissionBreadcrumbs from '../../components/ui/MissionBreadcrumbs';
import QuickActionButton from '../../components/ui/QuickActionButton';
import AchievementToast from '../../components/ui/AchievementToast';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import all progress tracking components
import ProgressOverview from './components/ProgressOverview';
import SkillRadarChart from './components/SkillRadarChart';
import MissionTimeline from './components/MissionTimeline';
import StreakCalendar from './components/StreakCalendar';
import AchievementGallery from './components/AchievementGallery';
import ProgressExport from './components/ProgressExport';

const ProgressTracking = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading progress data
    const loadProgressData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
    };

    loadProgressData();

    // Update document title
    document.title = 'Progress Tracking - NeuroSparkED';
  }, []);

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: 'BarChart3',
      description: 'General progress and statistics'
    },
    {
      id: 'skills',
      label: 'Skills',
      icon: 'Target',
      description: 'Skill development radar'
    },
    {
      id: 'missions',
      label: 'Missions',
      icon: 'Compass',
      description: 'Mission timeline and history'
    },
    {
      id: 'streak',
      label: 'Activity',
      icon: 'Calendar',
      description: 'Daily streak and calendar'
    },
    {
      id: 'achievements',
      label: 'Achievements',
      icon: 'Award',
      description: 'Badges and milestones'
    },
    {
      id: 'export',
      label: 'Export',
      icon: 'Download',
      description: 'Download progress reports'
    }
  ];

  const renderTabContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your progress data...</p>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <ProgressOverview />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <SkillRadarChart />
              <div className="space-y-6">
                <MissionTimeline />
              </div>
            </div>
          </div>
        );
      case 'skills':
        return <SkillRadarChart />;
      case 'missions':
        return <MissionTimeline />;
      case 'streak':
        return <StreakCalendar />;
      case 'achievements':
        return <AchievementGallery />;
      case 'export':
        return <ProgressExport />;
      default:
        return <ProgressOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProgressHeader />
      <MissionBreadcrumbs />
      <main className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Progress Tracking</h1>
            <p className="text-muted-foreground">
              Monitor your learning journey and celebrate your achievements
            </p>
          </div>
          
          <div className="flex items-center space-x-3 mt-4 lg:mt-0">
            <Button
              variant="outline"
              onClick={() => navigate('/mission-dashboard')}
              iconName="Plus"
              iconPosition="left"
              iconSize={16}
            >
              New Mission
            </Button>
            
            <Button
              variant="secondary"
              onClick={() => setActiveTab('export')}
              iconName="Share"
              iconPosition="left"
              iconSize={16}
            >
              Share Progress
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          {/* Desktop Tabs */}
          <div className="hidden lg:flex items-center space-x-1 bg-muted/30 p-1 rounded-lg">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 ${
                  activeTab === tab?.id
                    ? 'bg-card text-foreground shadow-elevation-2'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile Dropdown */}
          <div className="lg:hidden">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e?.target?.value)}
              className="w-full px-4 py-3 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {tabs?.map((tab) => (
                <option key={tab?.id} value={tab?.id}>
                  {tab?.label} - {tab?.description}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-[600px]">
          {renderTabContent()}
        </div>

        {/* Quick Stats Footer */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-primary mb-1">2,450</div>
              <div className="text-sm text-muted-foreground">Total XP</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-success mb-1">15</div>
              <div className="text-sm text-muted-foreground">Missions</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-warning mb-1">12</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent mb-1">47.5</div>
              <div className="text-sm text-muted-foreground">Hours</div>
            </div>
          </div>
        </div>

        {/* Motivational Message */}
        <div className="mt-8 bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-lg p-6 text-center">
          <Icon name="TrendingUp" size={32} color="var(--color-primary)" className="mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Keep Up the Great Work!</h3>
          <p className="text-muted-foreground mb-4">
            You're making excellent progress on your learning journey. Every mission completed brings you closer to mastery.
          </p>
          <Button
            variant="default"
            onClick={() => navigate('/mission-dashboard')}
            iconName="ArrowRight"
            iconPosition="right"
            iconSize={16}
          >
            Continue Learning
          </Button>
        </div>
      </main>
      <QuickActionButton />
      <AchievementToast />
    </div>
  );
};

export default ProgressTracking;