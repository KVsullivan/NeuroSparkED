import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { 
      label: 'Missions', 
      path: '/mission-dashboard', 
      icon: 'Compass',
      description: 'Discover and start new learning missions'
    },
    { 
      label: 'Progress', 
      path: '/progress-tracking', 
      icon: 'TrendingUp',
      description: 'Track your achievements and analytics'
    }
  ];

  const secondaryItems = [
    { label: 'Settings', path: '/settings', icon: 'Settings' },
    { label: 'Help', path: '/help', icon: 'HelpCircle' },
    { label: 'Profile', path: '/profile', icon: 'User' }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const isActivePath = (path) => {
    if (path === '/mission-dashboard') {
      return ['/mission-dashboard', '/mission-briefing', '/spark-workspace', '/innovation-report']?.includes(location?.pathname);
    }
    return location?.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-card border-b border-border">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Icon name="Zap" size={20} color="white" />
          </div>
          <span className="text-xl font-bold text-foreground">NeuroSparkED</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <Button
              key={item?.path}
              variant={isActivePath(item?.path) ? "default" : "ghost"}
              onClick={() => handleNavigation(item?.path)}
              iconName={item?.icon}
              iconPosition="left"
              iconSize={18}
              className="px-4 py-2"
            >
              {item?.label}
            </Button>
          ))}
        </nav>

        {/* Desktop Secondary Actions */}
        <div className="hidden md:flex items-center space-x-2">
          <Button
            variant="ghost"
            onClick={() => handleNavigation('/settings')}
            iconName="Settings"
            iconSize={18}
            className="px-3"
          />
          <Button
            variant="ghost"
            onClick={() => handleNavigation('/help')}
            iconName="HelpCircle"
            iconSize={18}
            className="px-3"
          />
          <Button
            variant="outline"
            onClick={() => handleNavigation('/profile')}
            iconName="User"
            iconPosition="left"
            iconSize={18}
            className="px-4"
          >
            Profile
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          iconName={isMenuOpen ? "X" : "Menu"}
          iconSize={20}
          className="md:hidden px-2"
        />
      </div>
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <div className="px-4 py-2 space-y-1">
            {navigationItems?.map((item) => (
              <Button
                key={item?.path}
                variant={isActivePath(item?.path) ? "default" : "ghost"}
                onClick={() => handleNavigation(item?.path)}
                iconName={item?.icon}
                iconPosition="left"
                iconSize={18}
                fullWidth
                className="justify-start px-4 py-3"
              >
                <div className="flex flex-col items-start">
                  <span className="font-medium">{item?.label}</span>
                  <span className="text-xs text-muted-foreground">{item?.description}</span>
                </div>
              </Button>
            ))}
            
            <div className="border-t border-border pt-2 mt-2">
              {secondaryItems?.map((item) => (
                <Button
                  key={item?.path}
                  variant="ghost"
                  onClick={() => handleNavigation(item?.path)}
                  iconName={item?.icon}
                  iconPosition="left"
                  iconSize={18}
                  fullWidth
                  className="justify-start px-4 py-2"
                >
                  {item?.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;