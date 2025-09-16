import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MissionTimeline = () => {
  const [missions, setMissions] = useState([
    {
      id: 1,
      title: "Urban Sustainability Challenge",
      description: "Develop innovative solutions for sustainable city living",
      completedDate: "2025-01-05",
      xpEarned: 250,
      status: "completed",
      category: "Environmental Science",
      duration: "3.5 hours",
      reportUrl: "#",
      skills: ["Problem Solving", "Research", "Innovation"]
    },
    {
      id: 2,
      title: "Digital Wellness Initiative",
      description: "Create strategies for healthy technology use in education",
      completedDate: "2025-01-03",
      xpEarned: 200,
      status: "completed",
      category: "Digital Literacy",
      duration: "2.8 hours",
      reportUrl: "#",
      skills: ["Critical Thinking", "Communication"]
    },
    {
      id: 3,
      title: "Community Innovation Lab",
      description: "Design solutions for local community challenges",
      completedDate: "2024-12-28",
      xpEarned: 300,
      status: "completed",
      category: "Social Innovation",
      duration: "4.2 hours",
      reportUrl: "#",
      skills: ["Collaboration", "Innovation", "Research"]
    },
    {
      id: 4,
      title: "Future Learning Spaces",
      description: "Reimagine educational environments for the digital age",
      completedDate: "2024-12-25",
      xpEarned: 275,
      status: "completed",
      category: "Education Technology",
      duration: "3.8 hours",
      reportUrl: "#",
      skills: ["Innovation", "Critical Thinking"]
    },
    {
      id: 5,
      title: "Climate Action Workshop",
      description: "Develop actionable climate solutions for young leaders",
      completedDate: "2024-12-20",
      xpEarned: 225,
      status: "completed",
      category: "Environmental Science",
      duration: "3.1 hours",
      reportUrl: "#",
      skills: ["Problem Solving", "Research"]
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const categories = ['all', ...new Set(missions.map(m => m.category))];

  const filteredMissions = missions?.filter(mission => filter === 'all' || mission?.category === filter)?.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.completedDate) - new Date(a.completedDate);
      } else if (sortBy === 'xp') {
        return b?.xpEarned - a?.xpEarned;
      }
      return 0;
    });

  const totalXP = missions?.reduce((sum, mission) => sum + mission?.xpEarned, 0);
  const totalHours = missions?.reduce((sum, mission) => sum + parseFloat(mission?.duration), 0);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCategoryIcon = (category) => {
    const iconMap = {
      'Environmental Science': 'Leaf',
      'Digital Literacy': 'Smartphone',
      'Social Innovation': 'Users',
      'Education Technology': 'GraduationCap'
    };
    return iconMap?.[category] || 'BookOpen';
  };

  const getCategoryColor = (category) => {
    const colorMap = {
      'Environmental Science': 'var(--color-success)',
      'Digital Literacy': 'var(--color-primary)',
      'Social Innovation': 'var(--color-accent)',
      'Education Technology': 'var(--color-warning)'
    };
    return colorMap?.[category] || 'var(--color-muted-foreground)';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Mission Timeline</h3>
          <p className="text-sm text-muted-foreground">
            {missions?.length} missions completed • {totalXP?.toLocaleString()} XP earned • {totalHours?.toFixed(1)} hours
          </p>
        </div>
        
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <select
            value={filter}
            onChange={(e) => setFilter(e?.target?.value)}
            className="px-3 py-1 text-sm border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {categories?.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="px-3 py-1 text-sm border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="date">Sort by Date</option>
            <option value="xp">Sort by XP</option>
          </select>
        </div>
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredMissions?.map((mission, index) => (
          <div key={mission?.id} className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors duration-150">
            {/* Timeline Indicator */}
            <div className="flex flex-col items-center">
              <div 
                className="flex items-center justify-center w-10 h-10 rounded-full border-2"
                style={{ 
                  backgroundColor: `${getCategoryColor(mission?.category)}20`,
                  borderColor: getCategoryColor(mission?.category)
                }}
              >
                <Icon 
                  name={getCategoryIcon(mission?.category)} 
                  size={18} 
                  color={getCategoryColor(mission?.category)} 
                />
              </div>
              {index < filteredMissions?.length - 1 && (
                <div className="w-px h-8 bg-border mt-2" />
              )}
            </div>

            {/* Mission Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-foreground mb-1">
                    {mission?.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    {mission?.description}
                  </p>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <div className="flex items-center space-x-1 text-xs text-accent bg-accent/10 px-2 py-1 rounded-full">
                    <Icon name="Zap" size={12} />
                    <span>+{mission?.xpEarned}</span>
                  </div>
                </div>
              </div>

              {/* Mission Details */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-3">
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={12} />
                  <span>{formatDate(mission?.completedDate)}</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={12} />
                  <span>{mission?.duration}</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Icon name="Tag" size={12} />
                  <span>{mission?.category}</span>
                </div>
              </div>

              {/* Skills & Actions */}
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {mission?.skills?.map((skill, skillIndex) => (
                    <span 
                      key={skillIndex}
                      className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  iconName="FileText"
                  iconPosition="left"
                  iconSize={14}
                  className="ml-4"
                >
                  View Report
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredMissions?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Search" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <h4 className="text-lg font-medium text-foreground mb-2">No missions found</h4>
          <p className="text-muted-foreground">Try adjusting your filters to see more results.</p>
        </div>
      )}
    </div>
  );
};

export default MissionTimeline;