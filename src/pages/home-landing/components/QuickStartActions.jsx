import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickStartActions = ({ isAuthenticated, onStartJourney, onAuthenticate }) => {
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

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-foreground mb-6"
          >
            Ready to{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Spark
            </span>
            {' '}Your Learning?
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto"
          >
            {!isAuthenticated ? (
              'Join thousands of learners who are transforming their skills through our innovative SPARK methodology. Start your journey today!'
            ) : (
              'Continue your learning adventure with new missions, challenges, and opportunities to grow your skills.'
            )}
          </motion.p>

          {!isAuthenticated ? (
            /* New User Actions */
            (<motion.div
              variants={itemVariants}
              className="space-y-8"
            >
              {/* Primary CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Button
                  size="xl"
                  onClick={() => onAuthenticate('signup')}
                  iconName="Rocket"
                  iconPosition="left"
                  className="w-full sm:w-auto text-lg px-12 py-4 shadow-lg hover:shadow-xl"
                >
                  Start Learning Journey
                </Button>
                <Button
                  variant="outline"
                  size="xl"
                  onClick={() => onAuthenticate('signin')}
                  iconName="LogIn"
                  iconPosition="left"
                  className="w-full sm:w-auto text-lg px-12 py-4"
                >
                  Sign In
                </Button>
              </div>
              {/* Quick Preview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                {[
                  {
                    icon: 'Gamepad2',
                    title: 'Gamified Learning',
                    description: 'Earn XP and unlock achievements',
                    highlight: '100+ Badges Available'
                  },
                  {
                    icon: 'Target',
                    title: 'Real Projects',
                    description: 'Work on industry-relevant challenges',
                    highlight: '50+ Mission Types'
                  },
                  {
                    icon: 'Users',
                    title: 'Community Support',
                    description: 'Learn with peers worldwide',
                    highlight: '15K+ Active Learners'
                  }
                ]?.map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    className="p-6 bg-background/80 backdrop-blur-sm rounded-xl border border-border hover:border-primary/50 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon name={feature?.icon} size={24} className="text-primary" />
                    </div>
                    <h3 className="font-bold text-foreground mb-2">
                      {feature?.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {feature?.description}
                    </p>
                    <div className="text-xs font-medium text-primary">
                      {feature?.highlight}
                    </div>
                  </motion.div>
                ))}
              </div>
              {/* Trust Indicators */}
              <motion.div
                variants={itemVariants}
                className="flex items-center justify-center space-x-8 text-sm text-muted-foreground"
              >
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={16} className="text-green-500" />
                  <span>Secure Platform</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} className="text-blue-500" />
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Award" size={16} className="text-purple-500" />
                  <span>Certified Learning</span>
                </div>
              </motion.div>
            </motion.div>)
          ) : (
            /* Authenticated User Actions */
            (<motion.div
              variants={itemVariants}
              className="space-y-8"
            >
              {/* Continue Learning CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Button
                  size="xl"
                  onClick={onStartJourney}
                  iconName="Play"
                  iconPosition="left"
                  className="w-full sm:w-auto text-lg px-12 py-4 shadow-lg hover:shadow-xl"
                >
                  Continue Your Missions
                </Button>
                <Button
                  variant="outline"
                  size="xl"
                  onClick={() => window.location.href = '/progress-tracking'}
                  iconName="BarChart3"
                  iconPosition="left"
                  className="w-full sm:w-auto text-lg px-12 py-4"
                >
                  View Progress
                </Button>
              </div>
              {/* Quick Access Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                {[
                  {
                    icon: 'Target',
                    title: 'New Missions',
                    description: 'Explore fresh challenges',
                    action: () => onStartJourney(),
                    actionText: 'Browse Missions'
                  },
                  {
                    icon: 'BookOpen',
                    title: 'SPARK Workspace',
                    description: 'Continue active projects',
                    action: () => window.location.href = '/spark-workspace',
                    actionText: 'Open Workspace'
                  },
                  {
                    icon: 'FileText',
                    title: 'Innovation Reports',
                    description: 'View completed projects',
                    action: () => window.location.href = '/innovation-report',
                    actionText: 'View Reports'
                  }
                ]?.map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    className="p-6 bg-background/80 backdrop-blur-sm rounded-xl border border-border hover:border-primary/50 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon name={feature?.icon} size={24} className="text-primary" />
                    </div>
                    <h3 className="font-bold text-foreground mb-2">
                      {feature?.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {feature?.description}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={feature?.action}
                      iconName="ArrowRight"
                      iconPosition="right"
                      iconSize={14}
                      fullWidth
                    >
                      {feature?.actionText}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>)
          )}

          {/* Bottom Message */}
          <motion.div
            variants={itemVariants}
            className="mt-12 p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border border-primary/20"
          >
            <div className="flex items-center justify-center space-x-3 mb-2">
              <Icon name="Sparkles" size={20} className="text-primary" />
              <span className="text-lg font-semibold text-foreground">
                Join the Learning Revolution
              </span>
              <Icon name="Sparkles" size={20} className="text-accent" />
            </div>
            <p className="text-muted-foreground">
              Transform your potential into practical skills through immersive, 
              gamified learning experiences designed for the modern world.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default QuickStartActions;