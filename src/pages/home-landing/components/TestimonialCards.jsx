import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const TestimonialCards = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Product Manager',
      company: 'TechFlow Inc.',
      avatar: '👩‍💼',
      quote: 'NeuroSparkED transformed how I approach problem-solving. The SPARK methodology gave me a structured way to tackle complex challenges.',
      achievement: 'Completed 15 missions',
      xp: 4250,
      badges: ['Innovation Leader', 'SPARK Master', 'Problem Solver']
    },
    {
      id: 2,
      name: 'Marcus Rodriguez',
      role: 'Software Engineer',
      company: 'DataSync Solutions',
      avatar: '👨‍💻',
      quote: 'The gamified approach kept me engaged throughout my learning journey. I gained practical skills that I use daily in my work.',
      achievement: 'Completed 22 missions',
      xp: 6875,
      badges: ['Code Wizard', 'Team Player', 'Innovation Expert']
    },
    {
      id: 3,
      name: 'Dr. Emily Watson',
      role: 'Research Scientist',
      company: 'BioTech Innovations',
      avatar: '👩‍🔬',
      quote: 'The real-world application focus of each mission helped me bridge the gap between theoretical knowledge and practical implementation.',
      achievement: 'Completed 18 missions',
      xp: 5320,
      badges: ['Research Master', 'Scientific Method', 'Data Analyst']
    },
    {
      id: 4,
      name: 'Alex Thompson',
      role: 'Design Lead',
      company: 'Creative Studios',
      avatar: '👨‍🎨',
      quote: 'The collaborative aspects and community engagement made learning feel less isolated and more inspiring.',
      achievement: 'Completed 12 missions',
      xp: 3890,
      badges: ['Design Thinking', 'Creative Problem Solver', 'Team Lead']
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        (prevIndex + 1) % testimonials?.length
      );
    }, 5000); // Auto-rotate every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials?.length]);

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

  const currentTestimonial = testimonials?.[currentIndex];

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
            Success{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Stories
            </span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Hear from learners who have transformed their careers and skills 
            through our innovative platform.
          </motion.p>
        </motion.div>

        {/* Main Featured Testimonial */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto mb-12"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="p-8 bg-background rounded-2xl border border-border shadow-lg"
            >
              <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">
                {/* Avatar and Info */}
                <div className="flex-shrink-0 text-center md:text-left">
                  <div className="w-20 h-20 text-4xl bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mb-4 mx-auto md:mx-0">
                    {currentTestimonial?.avatar}
                  </div>
                  <h3 className="text-lg font-bold text-foreground">
                    {currentTestimonial?.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-1">
                    {currentTestimonial?.role}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {currentTestimonial?.company}
                  </p>
                  
                  {/* Achievement Stats */}
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-center md:justify-start space-x-2 text-sm">
                      <Icon name="Trophy" size={14} className="text-yellow-500" />
                      <span className="text-muted-foreground">{currentTestimonial?.achievement}</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start space-x-2 text-sm">
                      <Icon name="Star" size={14} className="text-purple-500" />
                      <span className="text-muted-foreground">{currentTestimonial?.xp?.toLocaleString()} XP</span>
                    </div>
                  </div>
                </div>

                {/* Quote and Badges */}
                <div className="flex-1">
                  <div className="mb-6">
                    <Icon name="Quote" size={24} className="text-primary/30 mb-4" />
                    <p className="text-lg text-foreground leading-relaxed italic">
                      "{currentTestimonial?.quote}"
                    </p>
                  </div>

                  {/* Achievement Badges */}
                  <div className="flex flex-wrap gap-2">
                    {currentTestimonial?.badges?.map((badge, index) => (
                      <div
                        key={index}
                        className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20"
                      >
                        {badge}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Testimonial Navigation Dots */}
          <div className="flex items-center justify-center space-x-2 mt-8">
            {testimonials?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-primary w-8' :'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Testimonial Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials?.slice(0, 3)?.map((testimonial, index) => (
            <motion.div
              key={testimonial?.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="p-6 bg-background rounded-xl border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-12 h-12 text-xl bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                  {testimonial?.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">
                    {testimonial?.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial?.role}
                  </p>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                "{testimonial?.quote}"
              </p>
              
              <div className="flex items-center space-x-4 text-xs">
                <div className="flex items-center space-x-1 text-yellow-500">
                  <Icon name="Star" size={12} />
                  <span>{testimonial?.xp?.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1 text-green-500">
                  <Icon name="CheckCircle" size={12} />
                  <span>{testimonial?.badges?.length} badges</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialCards;