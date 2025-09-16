import React, { useState, useEffect } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';

const SkillRadarChart = () => {
  const [skillData, setSkillData] = useState([
    {
      skill: 'Problem Solving',
      current: 85,
      previous: 65,
      fullMark: 100
    },
    {
      skill: 'Critical Thinking',
      current: 78,
      previous: 60,
      fullMark: 100
    },
    {
      skill: 'Innovation',
      current: 92,
      previous: 70,
      fullMark: 100
    },
    {
      skill: 'Research',
      current: 88,
      previous: 75,
      fullMark: 100
    },
    {
      skill: 'Communication',
      current: 75,
      previous: 55,
      fullMark: 100
    },
    {
      skill: 'Collaboration',
      current: 82,
      previous: 68,
      fullMark: 100
    }
  ]);

  const [selectedView, setSelectedView] = useState('comparison');
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    // Trigger animation when view changes
    setAnimationKey(prev => prev + 1);
  }, [selectedView]);

  const getAverageImprovement = () => {
    const improvements = skillData?.map(skill => skill?.current - skill?.previous);
    const average = improvements?.reduce((sum, imp) => sum + imp, 0) / improvements?.length;
    return Math.round(average);
  };

  const getTopSkill = () => {
    return skillData?.reduce((top, skill) => 
      skill?.current > top?.current ? skill : top
    );
  };

  const getMostImproved = () => {
    return skillData?.reduce((most, skill) => {
      const currentImprovement = skill?.current - skill?.previous;
      const mostImprovement = most?.current - most?.previous;
      return currentImprovement > mostImprovement ? skill : most;
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Skill Development</h3>
          <p className="text-sm text-muted-foreground">Track your competency growth across learning domains</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setSelectedView('current')}
            className={`px-3 py-1 text-sm rounded-md transition-colors duration-150 ${
              selectedView === 'current' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            Current
          </button>
          <button
            onClick={() => setSelectedView('comparison')}
            className={`px-3 py-1 text-sm rounded-md transition-colors duration-150 ${
              selectedView === 'comparison' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            Progress
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Radar Chart */}
        <div className="lg:col-span-2">
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart key={animationKey} data={skillData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                <PolarGrid stroke="var(--color-border)" />
                <PolarAngleAxis 
                  dataKey="skill" 
                  tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]} 
                  tick={{ fontSize: 10, fill: 'var(--color-muted-foreground)' }}
                />
                
                {selectedView === 'comparison' && (
                  <Radar
                    name="Previous"
                    dataKey="previous"
                    stroke="var(--color-muted-foreground)"
                    fill="var(--color-muted-foreground)"
                    fillOpacity={0.1}
                    strokeWidth={2}
                    dot={{ fill: 'var(--color-muted-foreground)', strokeWidth: 2, r: 4 }}
                  />
                )}
                
                <Radar
                  name="Current"
                  dataKey="current"
                  stroke="var(--color-primary)"
                  fill="var(--color-primary)"
                  fillOpacity={0.2}
                  strokeWidth={3}
                  dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 5 }}
                />
                
                {selectedView === 'comparison' && (
                  <Legend 
                    wrapperStyle={{ 
                      fontSize: '12px',
                      color: 'var(--color-foreground)'
                    }}
                  />
                )}
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skill Insights */}
        <div className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="TrendingUp" size={16} color="var(--color-success)" />
              <span className="text-sm font-medium text-foreground">Average Growth</span>
            </div>
            <div className="text-2xl font-bold text-success mb-1">
              +{getAverageImprovement()}%
            </div>
            <p className="text-xs text-muted-foreground">Across all skills</p>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Award" size={16} color="var(--color-primary)" />
              <span className="text-sm font-medium text-foreground">Top Skill</span>
            </div>
            <div className="text-lg font-bold text-foreground mb-1">
              {getTopSkill()?.skill}
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-sm font-medium text-primary">
                {getTopSkill()?.current}%
              </div>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-1000"
                  style={{ width: `${getTopSkill()?.current}%` }}
                />
              </div>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Zap" size={16} color="var(--color-accent)" />
              <span className="text-sm font-medium text-foreground">Most Improved</span>
            </div>
            <div className="text-lg font-bold text-foreground mb-1">
              {getMostImproved()?.skill}
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-muted-foreground">
                {getMostImproved()?.previous}%
              </span>
              <Icon name="ArrowRight" size={12} color="var(--color-accent)" />
              <span className="text-accent font-medium">
                {getMostImproved()?.current}%
              </span>
              <span className="text-accent text-xs">
                (+{getMostImproved()?.current - getMostImproved()?.previous}%)
              </span>
            </div>
          </div>

          {/* Skill Breakdown */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground">Skill Levels</h4>
            {skillData?.map((skill, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground truncate flex-1 mr-2">
                  {skill?.skill}
                </span>
                <div className="flex items-center space-x-2">
                  <span className="text-foreground font-medium w-8 text-right">
                    {skill?.current}%
                  </span>
                  {skill?.current > skill?.previous && (
                    <Icon name="TrendingUp" size={12} color="var(--color-success)" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillRadarChart;