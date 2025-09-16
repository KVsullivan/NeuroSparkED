import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

import { format } from 'date-fns';
import HeroSection from './components/HeroSection';
import PlatformOverview from './components/PlatformOverview';
import SuccessMetrics from './components/SuccessMetrics';
import TestimonialCards from './components/TestimonialCards';
import QuickStartActions from './components/QuickStartActions';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const HomeLanding = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userStats, setUserStats] = useState(null);
  const [communityMetrics, setCommunityMetrics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status and load user data
    const loadUserData = async () => {
      try {
        // Mock authentication check - in real app, this would check actual auth state
        const authStatus = localStorage.getItem('auth_status') === 'authenticated';
        setIsAuthenticated(authStatus);

        if (authStatus) {
          // Load user progress data
          const mockUserStats = {
            name: 'Alex',
            currentStreak: 7,
            totalXP: 2450,
            completedMissions: 12,
            recentProgress: [
              { missionId: 1, title: 'Smart City Transportation', progress: 85 },
              { missionId: 2, title: 'AI Ethics Framework', progress: 40 }
            ]
          };
          setUserStats(mockUserStats);
        }

        // Load community metrics
        const mockCommunityMetrics = {
          totalLearners: 15420,
          missionsCompleted: 48392,
          averageXPGain: 385,
          weeklyActiveUsers: 3247
        };
        setCommunityMetrics(mockCommunityMetrics);

        setIsLoading(false);
      } catch (error) {
        console.error('Error loading home data:', error);
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  const handleStartJourney = () => {
    navigate('/mission-dashboard');
  };

  const handleExploreDemo = () => {
    navigate('/mission-briefing');
  };

  const handleAuthenticate = (type) => {
    // Mock authentication - in real app, this would handle actual auth
    if (type === 'signup' || type === 'signin') {
      localStorage.setItem('auth_status', 'authenticated');
      setIsAuthenticated(true);
      // Navigate to mission dashboard after auth
      setTimeout(() => {
        navigate('/mission-dashboard');
      }, 1000);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="text-muted-foreground">Loading NeuroSparkED...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <Helmet>
        <title>NeuroSparkED - Transform Learning into Innovation</title>
        <meta name="description" content="Experience the future of education with NeuroSparkED's SPARK methodology. Transform traditional learning into engaging innovation challenges that build real-world skills and earn XP rewards." />
        <meta name="keywords" content="gamified learning, SPARK methodology, innovation education, XP rewards, mission-based learning" />
        <meta property="og:title" content="NeuroSparkED - Transform Learning into Innovation" />
        <meta property="og:description" content="Join thousands of learners using SPARK methodology to turn education into exciting innovation challenges." />
      </Helmet>

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <Icon name="Zap" size={20} color="white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">NeuroSparkED</h1>
                <p className="text-xs text-muted-foreground">Ignite Innovation</p>
              </div>
            </div>

            {!isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  onClick={() => handleAuthenticate('signin')}
                  iconName="LogIn"
                  iconPosition="left"
                  iconSize={16}
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => handleAuthenticate('signup')}
                  iconName="UserPlus"
                  iconPosition="left"
                  iconSize={16}
                >
                  Get Started
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Flame" size={16} />
                  <span>{userStats?.currentStreak} day streak</span>
                </div>
                <Button
                  onClick={handleStartJourney}
                  iconName="Play"
                  iconPosition="left"
                  iconSize={16}
                >
                  Continue Learning
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSection
        isAuthenticated={isAuthenticated}
        userStats={userStats}
        onStartJourney={handleStartJourney}
        onExploreDemo={handleExploreDemo}
        onAuthenticate={handleAuthenticate}
      />

      {/* Platform Overview */}
      <PlatformOverview />

      {/* Success Metrics */}
      <SuccessMetrics communityMetrics={communityMetrics} />

      {/* Testimonials */}
      <TestimonialCards />

      {/* Quick Start Actions */}
      <QuickStartActions
        isAuthenticated={isAuthenticated}
        onStartJourney={handleStartJourney}
        onAuthenticate={handleAuthenticate}
      />

      {/* Footer */}
      <footer className="bg-muted/50 border-t border-border">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <Icon name="Zap" size={16} color="white" />
                </div>
                <span className="text-lg font-bold text-foreground">NeuroSparkED</span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                Transforming education through gamified SPARK methodology. 
                Turn learning into innovation challenges that build real-world skills.
              </p>
              <div className="text-xs text-muted-foreground">
                © {format(new Date(), 'yyyy')} NeuroSparkED. Building the future of learning.
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Platform</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="hover:text-foreground cursor-pointer">Mission Dashboard</div>
                <div className="hover:text-foreground cursor-pointer">SPARK Workspace</div>
                <div className="hover:text-foreground cursor-pointer">Progress Tracking</div>
                <div className="hover:text-foreground cursor-pointer">Innovation Reports</div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Community</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="hover:text-foreground cursor-pointer">Success Stories</div>
                <div className="hover:text-foreground cursor-pointer">Achievement Gallery</div>
                <div className="hover:text-foreground cursor-pointer">Learning Resources</div>
                <div className="hover:text-foreground cursor-pointer">Support Center</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeLanding;