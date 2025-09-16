import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const PlatformOverview = () => {
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

  const features = [
    {
      icon: 'Target',
      title: 'Mission-Based Learning',
      description: 'Tackle real-world challenges through engaging missions that combine theory with practical application.',
      highlight: 'Interactive Challenges'
    },
    {
      icon: 'Gamepad2',
      title: 'Gamified Experience',
      description: 'Earn XP, unlock achievements, and build learning streaks that keep you motivated and engaged.',
      highlight: 'XP & Achievements'
    },
    {
      icon: 'Brain',
      title: 'SPARK Methodology',
      description: 'Follow our proven 5-stage learning process: Situation, Plan, Action, Reflection, Knowledge.',
      highlight: '5-Stage Process'
    },
    {
      icon: 'Users',
      title: 'Community Learning',
      description: 'Connect with fellow learners, share insights, and collaborate on innovative solutions.',
      highlight: 'Collaborative Environment'
    },
    {
      icon: 'BarChart3',
      title: 'Progress Tracking',
      description: 'Monitor your growth with detailed analytics, skill development charts, and learning insights.',
      highlight: 'Detailed Analytics'
    },
    {
      icon: 'Award',
      title: 'Innovation Reports',
      description: 'Generate professional reports showcasing your completed projects and acquired skills.',
      highlight: 'Professional Certificates'
    }
  ];

  return (
    <section ref={ref} className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-foreground mb-6"
          >
            Why Choose{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              NeuroSparkED
            </span>
            ?
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Our platform revolutionizes education by combining gamification, 
            real-world application, and proven learning methodologies.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features?.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group p-6 bg-background rounded-xl border border-border hover:border-primary/50 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center group-hover:from-primary group-hover:to-accent transition-all duration-300">
                    <Icon 
                      name={feature?.icon} 
                      size={24} 
                      className="group-hover:text-white transition-colors duration-300" 
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {feature?.title}
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    {feature?.description}
                  </p>
                  <div className="inline-flex items-center space-x-1 text-sm text-primary font-medium">
                    <Icon name="Sparkles" size={14} />
                    <span>{feature?.highlight}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Process Flow Visualization */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-20"
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-12"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Your Learning Journey
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From selecting missions to earning certifications, every step is designed 
              to maximize your learning experience.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {[
              { step: 1, title: 'Choose Mission', icon: 'Search', color: 'from-blue-500 to-cyan-500' },
              { step: 2, title: 'SPARK Process', icon: 'Zap', color: 'from-purple-500 to-pink-500' },
              { step: 3, title: 'Track Progress', icon: 'TrendingUp', color: 'from-green-500 to-emerald-500' },
              { step: 4, title: 'Earn Rewards', icon: 'Trophy', color: 'from-orange-500 to-red-500' }
            ]?.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative text-center"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${step?.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Icon name={step?.icon} size={24} color="white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-foreground text-background rounded-full flex items-center justify-center text-sm font-bold">
                  {step?.step}
                </div>
                <h4 className="font-semibold text-foreground">
                  {step?.title}
                </h4>
                
                {/* Arrow connector (except for last item) */}
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-6 h-0.5 bg-gradient-to-r from-muted-foreground/50 to-transparent">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 border-r border-t border-muted-foreground/50 rotate-45"></div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PlatformOverview;