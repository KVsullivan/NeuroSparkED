import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterSystem = ({ onFilterChange, totalMissions, filteredCount }) => {
  const [activeFilters, setActiveFilters] = useState({
    difficulty: 'all',
    topic: 'all',
    status: 'all'
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const filterOptions = {
    difficulty: [
      { value: 'all', label: 'All Levels', count: totalMissions },
      { value: 'beginner', label: 'Beginner', count: 8 },
      { value: 'intermediate', label: 'Intermediate', count: 12 },
      { value: 'advanced', label: 'Advanced', count: 4 }
    ],
    topic: [
      { value: 'all', label: 'All Topics', count: totalMissions },
      { value: 'innovation', label: 'Innovation', count: 6 },
      { value: 'technology', label: 'Technology', count: 8 },
      { value: 'business', label: 'Business', count: 5 },
      { value: 'design', label: 'Design', count: 3 },
      { value: 'sustainability', label: 'Sustainability', count: 2 }
    ],
    status: [
      { value: 'all', label: 'All Status', count: totalMissions },
      { value: 'not-started', label: 'Not Started', count: 9 },
      { value: 'in-progress', label: 'In Progress', count: 6 },
      { value: 'completed', label: 'Completed', count: 9 }
    ]
  };

  const handleFilterChange = (category, value) => {
    const newFilters = { ...activeFilters, [category]: value };
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    const resetFilters = { difficulty: 'all', topic: 'all', status: 'all' };
    setActiveFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const hasActiveFilters = Object.values(activeFilters)?.some(filter => filter !== 'all');

  return (
    <div className="bg-card rounded-xl border border-border p-4 mb-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} color="var(--color-foreground)" />
          <h3 className="text-lg font-semibold text-foreground">Filter Missions</h3>
          {filteredCount !== totalMissions && (
            <span className="text-sm text-muted-foreground">
              ({filteredCount} of {totalMissions} missions)
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              onClick={clearAllFilters}
              iconName="X"
              iconPosition="left"
              iconSize={14}
              className="text-sm"
            >
              Clear All
            </Button>
          )}
          
          <Button
            variant="ghost"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconSize={16}
            className="md:hidden"
          />
        </div>
      </div>
      {/* Filter Options */}
      <div className={`space-y-4 ${isExpanded ? 'block' : 'hidden md:block'}`}>
        {/* Quick Filter Chips */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={activeFilters?.status === 'not-started' ? "default" : "outline"}
            onClick={() => handleFilterChange('status', activeFilters?.status === 'not-started' ? 'all' : 'not-started')}
            iconName="Play"
            iconPosition="left"
            iconSize={14}
            className="text-sm"
          >
            Available
          </Button>
          
          <Button
            variant={activeFilters?.status === 'in-progress' ? "default" : "outline"}
            onClick={() => handleFilterChange('status', activeFilters?.status === 'in-progress' ? 'all' : 'in-progress')}
            iconName="Lightbulb"
            iconPosition="left"
            iconSize={14}
            className="text-sm"
          >
            In Progress
          </Button>
          
          <Button
            variant={activeFilters?.status === 'completed' ? "default" : "outline"}
            onClick={() => handleFilterChange('status', activeFilters?.status === 'completed' ? 'all' : 'completed')}
            iconName="CheckCircle"
            iconPosition="left"
            iconSize={14}
            className="text-sm"
          >
            Completed
          </Button>
        </div>

        {/* Detailed Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Difficulty Filter */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Difficulty</label>
            <div className="space-y-1">
              {filterOptions?.difficulty?.map((option) => (
                <button
                  key={option?.value}
                  onClick={() => handleFilterChange('difficulty', option?.value)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-150 ${
                    activeFilters?.difficulty === option?.value
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option?.label}</span>
                    <span className="text-xs">{option?.count}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Topic Filter */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Topic</label>
            <div className="space-y-1">
              {filterOptions?.topic?.map((option) => (
                <button
                  key={option?.value}
                  onClick={() => handleFilterChange('topic', option?.value)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-150 ${
                    activeFilters?.topic === option?.value
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option?.label}</span>
                    <span className="text-xs">{option?.count}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Status</label>
            <div className="space-y-1">
              {filterOptions?.status?.map((option) => (
                <button
                  key={option?.value}
                  onClick={() => handleFilterChange('status', option?.value)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-150 ${
                    activeFilters?.status === option?.value
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option?.label}</span>
                    <span className="text-xs">{option?.count}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSystem;