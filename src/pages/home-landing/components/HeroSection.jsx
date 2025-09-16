import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = ({ 
  isAuthenticated, 
  userStats, 
  onStartJourney, 
  onExploreDemo, 
  onAuthenticate 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const xpFloatingVariants = {
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section ref={ref} className="relative py-20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/5 rounded-full"
        />
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Welcome Message for Authenticated Users */}
          {isAuthenticated && userStats && (
            <motion.div
              variants={itemVariants}
              className="mb-6 p-4 bg-primary/10 rounded-xl border border-primary/20"
            >
              <div className="flex items-center justify-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Icon name="User" size={20} />
                  <span className="text-foreground font-medium">
                    Welcome back, {userStats?.name}!
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Icon name="Flame" size={16} />
                    <span>{userStats?.currentStreak} day streak</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={16} />
                    <span>{userStats?.totalXP?.toLocaleString()} XP</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold text-foreground mb-6"
          >
            Transform Learning Into{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Innovation
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Experience education reimagined through our{' '}
            <span className="font-semibold text-foreground">SPARK methodology</span>.
            Turn traditional learning into engaging innovation challenges that build 
            real-world skills and unlock your potential.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12"
          >
            {!isAuthenticated ? (
              <>
                <Button
                  size="xl"
                  onClick={() => onAuthenticate('signup')}
                  iconName="Rocket"
                  iconPosition="left"
                  className="w-full sm:w-auto"
                >
                  Start Your Learning Journey
                </Button>
                <Button
                  variant="outline"
                  size="xl"
                  onClick={onExploreDemo}
                  iconName="Play"
                  iconPosition="left"
                  className="w-full sm:w-auto"
                >
                  Explore Demo Mission
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="xl"
                  onClick={onStartJourney}
                  iconName="Target"
                  iconPosition="left"
                  className="w-full sm:w-auto"
                >
                  Continue Your Missions
                </Button>
                {userStats?.recentProgress?.length > 0 && (
                  <div className="text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Icon name="Clock" size={14} />
                      <span>
                        Resume: {userStats?.recentProgress?.[0]?.title} ({userStats?.recentProgress?.[0]?.progress}%)
                      </span>
                    </div>
                  </div>
                )}
              </>
            )}
          </motion.div>

          {/* Floating XP Rewards Animation */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center space-x-8 mb-12"
          >
            {[
              { icon: 'Star', value: '+250 XP', color: 'text-yellow-500' },
              { icon: 'Trophy', value: 'Achievement', color: 'text-orange-500' },
              { icon: 'Target', value: 'Mission Complete', color: 'text-green-500' }
            ]?.map((item, index) => (
              <motion.div
                key={index}
                variants={xpFloatingVariants}
                animate="float"
                style={{ animationDelay: `${index * 0.5}s` }}
                className="flex items-center space-x-2 p-3 bg-background/80 backdrop-blur-sm rounded-xl border border-border shadow-lg"
              >
                <Icon name={item?.icon} size={20} className={item?.color} />
                <span className="text-sm font-medium text-foreground">
                  {item?.value}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* SPARK Methodology Preview */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-3xl mx-auto"
          >
            {[
              { letter: 'S', word: 'Situation', icon: 'Search' },
              { letter: 'P', word: 'Plan', icon: 'Map' },
              { letter: 'A', word: 'Action', icon: 'Zap' },
              { letter: 'R', word: 'Reflect', icon: 'Eye' },
              { letter: 'K', word: 'Knowledge', icon: 'Brain' }
            ]?.map((stage, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center p-4 bg-muted/50 rounded-xl border border-border hover:border-primary/50 transition-all duration-200"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-2">
                  <Icon name={stage?.icon} size={20} color="white" />
                </div>
                <div className="text-lg font-bold text-primary mb-1">
                  {stage?.letter}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stage?.word}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;