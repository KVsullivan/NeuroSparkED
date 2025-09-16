import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const MissionHeader = ({ mission }) => {
  return (
    <div className="relative bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6 mb-6 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-gradient-to-br from-primary to-accent"></div>
      </div>
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg">
              <Icon name={mission?.icon} size={24} color="white" />
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                  {mission?.category}
                </span>
                <span className="text-sm text-muted-foreground">Mission #{mission?.id}</span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{mission?.title}</h1>
            </div>
          </div>
          
          {/* Mission Image */}
          <div className="hidden md:block w-24 h-24 rounded-lg overflow-hidden">
            <Image 
              src={mission?.image} 
              alt={mission?.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <p className="text-muted-foreground text-lg leading-relaxed mb-4">
          {mission?.description}
        </p>
        
        {/* Mission Tags */}
        <div className="flex flex-wrap gap-2">
          {mission?.tags?.map((tag, index) => (
            <span 
              key={index}
              className="text-xs font-medium text-foreground bg-muted px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MissionHeader;