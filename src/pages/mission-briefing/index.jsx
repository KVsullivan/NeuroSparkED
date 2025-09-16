import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ProgressHeader from '../../components/ui/ProgressHeader';
import MissionBreadcrumbs from '../../components/ui/MissionBreadcrumbs';
import QuickActionButton from '../../components/ui/QuickActionButton';
import AchievementToast from '../../components/ui/AchievementToast';
import MissionHeader from './components/MissionHeader';
import MissionMetadata from './components/MissionMetadata';
import MissionObjectives from './components/MissionObjectives';
import MissionScenario from './components/MissionScenario';
import MissionProgress from './components/MissionProgress';
import MissionActions from './components/MissionActions';

const MissionBriefing = () => {
  const [selectedMission, setSelectedMission] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Mock mission data
  const missionData = {
    id: "SPARK-001",
    title: "Sustainable Campus Initiative",
    category: "Environmental Innovation",
    icon: "Leaf",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
    description: "Design and propose a comprehensive sustainability program for your educational institution that addresses environmental challenges while engaging the campus community.",
    difficulty: "intermediate",
    estimatedTime: "2-3 hours",
    xpReward: 350,
    tags: ["Sustainability", "Innovation", "Community Engagement", "Environmental Science"],
    prerequisites: [
      "Basic understanding of environmental concepts",
      "Completed at least 2 beginner missions",
      "Access to campus information or similar institution"
    ],
    skillsToLearn: [
      "Systems Thinking",
      "Stakeholder Analysis",
      "Proposal Writing",
      "Impact Assessment",
      "Community Engagement"
    ],
    completionRate: 78,
    scenario: `Your educational institution has committed to achieving carbon neutrality by 2030, but current sustainability efforts are fragmented and lack student engagement. The administration has recognized that meaningful change requires innovative approaches that go beyond traditional recycling programs and energy-saving measures.`,
    challenge: `The challenge lies in creating a holistic sustainability program that not only reduces environmental impact but also educates and engages the entire campus community. You need to balance ambitious environmental goals with practical implementation constraints, limited budgets, and diverse stakeholder interests.`,
    yourRole: `As a sustainability innovation consultant, you'll analyze the current state of campus sustainability, identify key opportunities for improvement, and develop a comprehensive proposal that addresses environmental, social, and economic dimensions of sustainability while ensuring community buy-in and long-term viability.`,
    stakeholders: [
      {
        role: "Campus Administration",
        description: "Focused on cost-effectiveness and institutional reputation"
      },
      {
        role: "Student Body",
        description: "Interested in meaningful participation and visible impact"
      },
      {
        role: "Faculty & Staff",
        description: "Concerned with integration into academic and operational activities"
      },
      {
        role: "Local Community",
        description: "Interested in broader environmental and economic benefits"
      }
    ],
    successVision: `A thriving, carbon-neutral campus where sustainability is seamlessly integrated into daily operations, academic curricula, and community culture. Students, faculty, and staff actively participate in environmental stewardship, creating a model that other institutions can replicate and adapt.`,
    objectives: [
      "Analyze current sustainability practices and identify improvement opportunities",
      "Develop stakeholder engagement strategies for diverse campus communities",
      "Create measurable sustainability goals with realistic timelines",
      "Design innovative programs that integrate education with environmental action",
      "Propose funding mechanisms and resource allocation strategies"
    ],
    expectedOutcomes: [
      "Comprehensive sustainability assessment and gap analysis",
      "Detailed implementation roadmap with phases and milestones",
      "Stakeholder engagement plan with specific tactics for each group",
      "Budget proposal with cost-benefit analysis",
      "Professional innovation report suitable for institutional presentation"
    ],
    requirements: [
      "Complete all five SPARK stages: Situation, Plan, Action, Reflection, Knowledge",
      "Provide thoughtful responses with minimum 100 words per reflection",
      "Include at least 3 specific, measurable sustainability initiatives",
      "Address budget considerations and implementation challenges",
      "Demonstrate understanding of systems thinking and stakeholder dynamics"
    ],
    successCriteria: [
      "Clear problem definition with supporting evidence and data",
      "Innovative solutions that go beyond conventional approaches",
      "Realistic implementation plan with timeline and resource requirements",
      "Evidence of critical thinking and reflection throughout the process",
      "Professional-quality final report with actionable recommendations"
    ]
  };

  useEffect(() => {
    // Simulate loading mission data
    const loadMission = async () => {
      setIsLoading(true);
      
      // Check if there's a selected mission from navigation state
      const missionFromState = location?.state?.selectedMission;
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setSelectedMission(missionFromState || missionData);
      setIsLoading(false);
    };

    loadMission();
  }, [location?.state]);

  useEffect(() => {
    // Update page title
    if (selectedMission) {
      document.title = `${selectedMission?.title} - Mission Briefing | NeuroSparkED`;
    }
  }, [selectedMission]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <ProgressHeader />
        <MissionBreadcrumbs />
        
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading mission briefing...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedMission) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <ProgressHeader />
        
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Mission Not Found</h2>
            <p className="text-muted-foreground mb-6">The requested mission could not be loaded.</p>
            <button
              onClick={() => navigate('/mission-dashboard')}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProgressHeader />
      <MissionBreadcrumbs />
      
      <main className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <MissionHeader mission={selectedMission} />
            <MissionScenario mission={selectedMission} />
            <MissionObjectives mission={selectedMission} />
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <MissionMetadata mission={selectedMission} />
            <MissionProgress />
            <MissionActions mission={selectedMission} />
          </div>
        </div>
      </main>
      
      <QuickActionButton />
      <AchievementToast />
    </div>
  );
};

export default MissionBriefing;