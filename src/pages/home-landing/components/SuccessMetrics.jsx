import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SuccessMetrics = ({ communityMetrics }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [animatedValues, setAnimatedValues] = useState({
    totalLearners: 0,
    missionsCompleted: 0,
    averageXPGain: 0,
    weeklyActiveUsers: 0
  });

  useEffect(() => {
    if (isInView && communityMetrics) {
      // Animate numbers counting up
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = duration / steps;

      const intervals = Object.keys(communityMetrics)?.map(key => {
        const target = communityMetrics?.[key];
        const stepValue = target / steps;
        let current = 0;

        return setInterval(() => {
          current += stepValue;
          if (current >= target) {
            current = target;
            clearInterval(intervals?.find(i => i === this));
          }
          setAnimatedValues(prev => ({
            ...prev,
            [key]: Math.floor(current)
          }));
        }, increment);
      });

      return () => {
        intervals?.forEach(interval => clearInterval(interval));
      };
    }
  }, [isInView, communityMetrics]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const metrics = [
    {
      icon: 'Users',
      label: 'Active Learners',
      value: animatedValues?.totalLearners,
      suffix: '+',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      icon: 'CheckCircle',
      label: 'Missions Completed',
      value: animatedValues?.missionsCompleted,
      suffix: '+',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      icon: 'Star',
      label: 'Average XP Earned',
      value: animatedValues?.averageXPGain,
      suffix: ' XP',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    },
    {
      icon: 'Activity',
      label: 'Weekly Active',
      value: animatedValues?.weeklyActiveUsers,
      suffix: '+',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    }
  ];

  return (
    <section ref={ref} className="py-20 bg-background">
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
            Join a Growing{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Community
            </span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Thousands of learners worldwide are already transforming their skills 
            through our innovative approach to education.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {metrics?.map((metric, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="p-6 bg-muted/50 rounded-xl border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 ${metric?.bgColor} rounded-xl flex items-center justify-center`}>
                  <Icon name={metric?.icon} size={24} className={metric?.color} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {metric?.value?.toLocaleString()}{metric?.suffix}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {metric?.label}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Achievement Highlights */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: 'Globe',
              title: 'Global Reach',
              description: 'Learners from 50+ countries are using our platform',
              highlight: '95% satisfaction rate'
            },
            {
              icon: 'Award',
              title: 'Skill Mastery',
              description: 'Average skill improvement of 40% per mission',
              highlight: '10,000+ skills unlocked'
            },
            {
              icon: 'Briefcase',
              title: 'Career Impact',
              description: '78% report improved job performance',
              highlight: '2.3x faster promotion'
            }
          ]?.map((achievement, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl border border-primary/20"
            >
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name={achievement?.icon} size={20} color="white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {achievement?.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-2">
                    {achievement?.description}
                  </p>
                  <div className="text-sm font-semibold text-primary">
                    {achievement?.highlight}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SuccessMetrics;