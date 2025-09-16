import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ProgressHeader from '../../components/ui/ProgressHeader';
import MissionBreadcrumbs from '../../components/ui/MissionBreadcrumbs';
import QuickActionButton from '../../components/ui/QuickActionButton';
import AchievementToast from '../../components/ui/AchievementToast';
import StatsPanel from './components/StatsPanel';
import MissionCard from './components/MissionCard';
import FilterSystem from './components/FilterSystem';
import AchievementBadges from './components/AchievementBadges';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const MissionDashboard = () => {
  const [missions, setMissions] = useState([]);
  const [filteredMissions, setFilteredMissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  useEffect(() => {
    // Load missions data
    const loadMissions = () => {
      const mockMissions = [
        {
          id: 1,
          title: "Smart City Transportation Challenge",
          description: `Design an innovative transportation solution for urban environments that reduces traffic congestion while improving accessibility for all citizens.\n\nThis mission focuses on sustainable mobility, user experience design, and systems thinking to create practical solutions for modern cities.`,
          difficulty: "Intermediate",
          estimatedTime: "3-4 hours",
          xpReward: 350,
          topic: "innovation",
          progress: 0,
          isNew: true
        },
        {
          id: 2,
          title: "Sustainable Energy Innovation Lab",
          description: `Explore renewable energy solutions and design a comprehensive plan for implementing clean energy systems in residential communities.\n\nDevelop practical strategies for energy efficiency, cost reduction, and environmental impact minimization.`,
          difficulty: "Advanced",
          estimatedTime: "4-5 hours",
          xpReward: 500,
          topic: "sustainability",
          progress: 45,
          isNew: false
        },
        {
          id: 3,
          title: "Digital Health Platform Design",
          description: `Create a user-centered digital health platform that improves patient engagement and healthcare accessibility.\n\nFocus on user interface design, data privacy, and creating meaningful health insights for users.`,
          difficulty: "Intermediate",
          estimatedTime: "3-4 hours",
          xpReward: 400,
          topic: "technology",
          progress: 100,
          isNew: false
        },
        {
          id: 4,
          title: "Community Engagement App Concept",
          description: `Design a mobile application that strengthens local community connections and promotes civic participation.\n\nExplore social impact design, user engagement strategies, and community building through technology.`,
          difficulty: "Beginner",
          estimatedTime: "2-3 hours",
          xpReward: 250,
          topic: "design",
          progress: 75,
          isNew: false
        },
        {
          id: 5,
          title: "Circular Economy Business Model",
          description: `Develop a business model that implements circular economy principles to reduce waste and create sustainable value chains.\n\nAnalyze market opportunities, stakeholder needs, and environmental impact reduction strategies.`,
          difficulty: "Advanced",
          estimatedTime: "4-6 hours",
          xpReward: 550,
          topic: "business",
          progress: 0,
          isNew: true
        },
        {
          id: 6,
          title: "AI Ethics Framework Development",
          description: `Create a comprehensive framework for ethical AI implementation in business environments.\n\nExamine bias prevention, transparency requirements, and responsible AI governance practices.`,
          difficulty: "Advanced",
          estimatedTime: "5-6 hours",
          xpReward: 600,
          topic: "technology",
          progress: 20,
          isNew: false
        },
        {
          id: 7,
          title: "Food Security Innovation Challenge",
          description: `Design innovative solutions to address food security challenges in urban and rural communities.\n\nFocus on sustainable agriculture, distribution systems, and community-based food programs.`,
          difficulty: "Intermediate",
          estimatedTime: "3-4 hours",
          xpReward: 375,
          topic: "sustainability",
          progress: 100,
          isNew: false
        },
        {
          id: 8,
          title: "Remote Work Culture Design",
          description: `Develop strategies and tools for creating effective remote work cultures that maintain team cohesion and productivity.\n\nExplore communication tools, virtual collaboration methods, and employee engagement techniques.`,
          difficulty: "Beginner",
          estimatedTime: "2-3 hours",
          xpReward: 275,
          topic: "business",
          progress: 0,
          isNew: false
        },
        {
          id: 9,
          title: "Inclusive Design Workshop Series",
          description: `Create a comprehensive workshop series that teaches inclusive design principles for digital products and services.\n\nCover accessibility standards, diverse user needs, and practical implementation strategies.`,
          difficulty: "Intermediate",
          estimatedTime: "4-5 hours",
          xpReward: 425,
          topic: "design",
          progress: 60,
          isNew: false
        },
        {
          id: 10,
          title: "Climate Action Communication Strategy",
          description: `Develop an effective communication strategy to engage diverse audiences in climate action initiatives.\n\nFocus on message framing, audience segmentation, and multi-channel communication approaches.`,
          difficulty: "Beginner",
          estimatedTime: "2-3 hours",
          xpReward: 300,
          topic: "sustainability",
          progress: 0,
          isNew: true
        }
      ];

      setMissions(mockMissions);
      setFilteredMissions(mockMissions);
      setIsLoading(false);
    };

    loadMissions();
  }, []);

  const handleFilterChange = (filters) => {
    let filtered = missions;

    // Apply difficulty filter
    if (filters?.difficulty !== 'all') {
      filtered = filtered?.filter(mission => 
        mission?.difficulty?.toLowerCase() === filters?.difficulty
      );
    }

    // Apply topic filter
    if (filters?.topic !== 'all') {
      filtered = filtered?.filter(mission => 
        mission?.topic === filters?.topic
      );
    }

    // Apply status filter
    if (filters?.status !== 'all') {
      filtered = filtered?.filter(mission => {
        switch (filters?.status) {
          case 'not-started':
            return mission?.progress === 0;
          case 'in-progress':
            return mission?.progress > 0 && mission?.progress < 100;
          case 'completed':
            return mission?.progress === 100;
          default:
            return true;
        }
      });
    }

    setFilteredMissions(filtered);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <ProgressHeader />
        <div className="flex items-center justify-center h-96">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="text-muted-foreground">Loading missions...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Mission Dashboard - NeuroSparkED</title>
        <meta name="description" content="Discover and start engaging SPARK missions that transform learning into real-world innovation challenges. Track your progress and earn XP through gamified educational experiences." />
      </Helmet>
      <Header />
      <ProgressHeader />
      <MissionBreadcrumbs />
      <main className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome back, Learner! 🚀
              </h1>
              <p className="text-muted-foreground">
                Ready to tackle your next SPARK mission? Choose from {missions?.length} available challenges.
              </p>
            </div>
            
            {/* View Mode Toggle */}
            <div className="hidden md:flex items-center space-x-2 bg-muted rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                onClick={() => setViewMode('grid')}
                iconName="Grid3X3"
                iconSize={16}
                className="px-3 py-2"
              />
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                onClick={() => setViewMode('list')}
                iconName="List"
                iconSize={16}
                className="px-3 py-2"
              />
            </div>
          </div>
        </div>

        {/* Stats Panel */}
        <StatsPanel />

        {/* Achievement Badges */}
        <AchievementBadges />

        {/* Filter System */}
        <FilterSystem 
          onFilterChange={handleFilterChange}
          totalMissions={missions?.length}
          filteredCount={filteredMissions?.length}
        />

        {/* Mission Grid/List */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Available Missions</h2>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Compass" size={16} />
              <span>{filteredMissions?.length} missions found</span>
            </div>
          </div>

          {filteredMissions?.length === 0 ? (
            <div className="text-center py-12">
              <Icon name="Search" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No missions found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters to see more missions.
              </p>
              <Button
                variant="outline"
                onClick={() => handleFilterChange({ difficulty: 'all', topic: 'all', status: 'all' })}
                iconName="RotateCcw"
                iconPosition="left"
                iconSize={16}
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className={
              viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" :"space-y-4"
            }>
              {filteredMissions?.map((mission) => (
                <MissionCard key={mission?.id} mission={mission} />
              ))}
            </div>
          )}
        </div>

        {/* Quick Stats Footer */}
        <div className="bg-muted/50 rounded-xl p-6 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="text-2xl font-bold text-foreground mb-1">
                {missions?.filter(m => m?.progress === 0)?.length}
              </div>
              <div className="text-sm text-muted-foreground">Ready to Start</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent mb-1">
                {missions?.filter(m => m?.progress > 0 && m?.progress < 100)?.length}
              </div>
              <div className="text-sm text-muted-foreground">In Progress</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-success mb-1">
                {missions?.filter(m => m?.progress === 100)?.length}
              </div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
          </div>
        </div>
      </main>
      <QuickActionButton />
      <AchievementToast />
    </div>
  );
};

export default MissionDashboard;