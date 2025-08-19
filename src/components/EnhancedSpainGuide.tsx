/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  MapPin, Clock, Users, Mountain, Utensils, Music, 
  Calendar, Heart, Info, ChevronRight, Book, Compass,
  Sun, Wine, Castle, Church, Train, Camera, ArrowUp
} from 'lucide-react';

// Enhanced section navigation with progress tracking
const sections = [
  { id: 'history', label: 'History', icon: Clock, color: 'from-amber-500 to-orange-600' },
  { id: 'geography', label: 'Geography', icon: Mountain, color: 'from-green-500 to-emerald-600' },
  { id: 'people', label: 'People & Culture', icon: Users, color: 'from-purple-500 to-pink-600' },
  { id: 'cuisine', label: 'Cuisine', icon: Utensils, color: 'from-red-500 to-rose-600' },
  { id: 'destinations', label: 'Must-Visit', icon: MapPin, color: 'from-blue-500 to-indigo-600' },
  { id: 'hidden', label: 'Hidden Gems', icon: Compass, color: 'from-teal-500 to-cyan-600' },
  { id: 'festivals', label: 'Festivals', icon: Calendar, color: 'from-yellow-500 to-amber-600' },
  { id: 'practical', label: 'Travel Tips', icon: Info, color: 'from-gray-500 to-slate-600' },
];

// Enhanced parallax hero component
const ParallaxHero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  return (
    <motion.div 
      ref={ref}
      style={{ y, opacity }}
      className="relative h-[70vh] rounded-3xl overflow-hidden mb-8 bg-gradient-to-br from-red-600 via-orange-500 to-yellow-500"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 0.8, 1],
          }}
          transition={{ 
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            scale: { duration: 12, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute bottom-20 left-20 w-24 h-24 bg-white/10 rounded-full"
        />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center text-white">
        <div className="text-center max-w-4xl mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold mb-6"
          >
            España
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-2xl md:text-3xl mb-4 font-light"
          >
            The Complete Guide
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex items-center justify-center gap-6 text-lg"
          >
            <span className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              History
            </span>
            <span className="w-1 h-1 bg-white rounded-full"></span>
            <span className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Culture
            </span>
            <span className="w-1 h-1 bg-white rounded-full"></span>
            <span className="flex items-center gap-2">
              <Compass className="w-5 h-5" />
              Adventures
            </span>
            <span className="w-1 h-1 bg-white rounded-full"></span>
            <span className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Secrets
            </span>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Enhanced sticky navigation with progress indicator
const StickyNavigation = ({ 
  activeSection, 
  onSectionChange, 
  scrollProgress 
}: { 
  activeSection: string; 
  onSectionChange: (id: string) => void;
  scrollProgress: number;
}) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div 
      className={`sticky top-0 z-40 transition-all duration-500 ${
        isSticky ? 'bg-white/95 backdrop-blur-lg shadow-lg' : 'bg-white'
      }`}
      animate={{ y: isSticky ? 0 : 0 }}
    >
      {/* Progress bar */}
      <div className="h-1 bg-gray-200">
        <motion.div
          className="h-full bg-gradient-to-r from-red-500 to-yellow-500"
          style={{ width: `${scrollProgress * 100}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <div className="container mx-auto px-5 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            Complete Spain Guide
          </h2>
          <div className="text-sm text-gray-500">
            {Math.round(scrollProgress * 100)}% complete
          </div>
        </div>

        {/* Enhanced navigation */}
        <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
          {sections.map((section, index) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            
            return (
              <motion.button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all relative overflow-hidden ${
                  isActive
                    ? 'text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSection"
                    className={`absolute inset-0 bg-gradient-to-r ${section.color} rounded-full`}
                    transition={{ type: "spring", duration: 0.6 }}
                  />
                )}
                <div className="relative flex items-center gap-2 z-10">
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{section.label}</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

// Enhanced 3D card component
const Enhanced3DCard = ({ 
  children, 
  className = '',
  delay = 0 
}: { 
  children: React.ReactNode; 
  className?: string;
  delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        y: 50,
        rotateX: 15,
        scale: 0.9
      }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0,
        rotateX: 0,
        scale: 1
      } : {}}
      transition={{ 
        duration: 0.8, 
        delay,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{
        scale: 1.02,
        rotateY: 2,
        rotateX: -2,
        transition: { duration: 0.3 }
      }}
      className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500 transform-gpu ${className}`}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
    >
      {children}
    </motion.div>
  );
};

// Floating back to top button
const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-red-500 to-yellow-500 text-white p-3 rounded-full shadow-lg z-50"
        >
          <ArrowUp className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

interface EnhancedSpainGuideProps {
  className?: string;
}

export default function EnhancedSpainGuide({ className = '' }: EnhancedSpainGuideProps) {
  const [activeSection, setActiveSection] = useState('history');
  const { scrollYProgress } = useScroll();

  // Section scroll handling
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 120;
      const elementPosition = element.offsetTop - headerOffset;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen bg-gradient-to-b from-amber-50 to-white ${className}`}>
      {/* Enhanced Parallax Hero */}
      <ParallaxHero />

      {/* Enhanced Sticky Navigation */}
      <StickyNavigation 
        activeSection={activeSection}
        onSectionChange={scrollToSection}
        scrollProgress={scrollYProgress.get()}
      />

      {/* Content Sections */}
      <div className="container mx-auto px-5 space-y-16 pb-16">
        {/* History Section */}
        <Enhanced3DCard delay={0.1}>
          <section id="history" className="p-8">
            <motion.h2 
              className="text-4xl font-bold text-gray-900 mb-6 flex items-center gap-3"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Clock className="w-8 h-8 text-amber-600" />
              5,000 Years of Spanish History
            </motion.h2>
            
            <div className="prose prose-lg max-w-none text-gray-700 mb-8">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                From prehistoric cave paintings to modern democracy, Spain's story is one of 
                continuous cultural fusion. Each civilization left its mark, creating the 
                rich tapestry that defines Spain today.
              </motion.p>
            </div>

            {/* Interactive timeline would go here */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  era: "Prehistoric Iberia",
                  period: "3000-218 BCE",
                  highlight: "Altamira Cave Paintings",
                  color: "from-stone-400 to-stone-600"
                },
                {
                  era: "Roman Hispania", 
                  period: "218 BCE-409 CE",
                  highlight: "Emperors Trajan & Hadrian",
                  color: "from-red-400 to-red-600"
                },
                {
                  era: "Al-Andalus",
                  period: "711-1492",
                  highlight: "Córdoba Caliphate",
                  color: "from-green-400 to-green-600"
                }
              ].map((era, index) => (
                <motion.div
                  key={era.era}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className={`p-6 rounded-xl bg-gradient-to-br ${era.color} text-white transform transition-transform duration-300`}
                >
                  <h3 className="font-bold text-xl mb-2">{era.era}</h3>
                  <p className="text-sm opacity-90 mb-3">{era.period}</p>
                  <p className="text-sm font-medium">{era.highlight}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </Enhanced3DCard>

        {/* Geography Section */}
        <Enhanced3DCard delay={0.2}>
          <section id="geography" className="p-8">
            <motion.h2 
              className="text-4xl font-bold text-gray-900 mb-6 flex items-center gap-3"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Mountain className="w-8 h-8 text-green-600" />
              Diverse Landscapes
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Pyrenees", icon: "🏔️", description: "Natural border with France" },
                { name: "Mediterranean Coast", icon: "🏖️", description: "2,000km of coastline" },
                { name: "Meseta Central", icon: "🌾", description: "Central plateau heartland" },
                { name: "Green Spain", icon: "🌲", description: "Lush Atlantic north" },
                { name: "Andalusian Plains", icon: "🫒", description: "Olive grove landscapes" },
                { name: "Island Paradises", icon: "🏝️", description: "Balearics & Canaries" }
              ].map((region, index) => (
                <motion.div
                  key={region.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05,
                    rotate: 1,
                    transition: { duration: 0.3 }
                  }}
                  className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300"
                >
                  <div className="text-4xl mb-3">{region.icon}</div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{region.name}</h3>
                  <p className="text-gray-600 text-sm">{region.description}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </Enhanced3DCard>

        {/* Continue with other sections... */}
        {/* This is a foundation - you would continue with cuisine, destinations, etc. */}
      </div>

      {/* Back to top button */}
      <BackToTopButton />
    </div>
  );
}