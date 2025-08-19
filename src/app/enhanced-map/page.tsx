'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Plane, Home, Camera, Calendar, MapPin, Navigation, Target, Globe, Route } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// Enhanced dynamic imports with better loading states
const EnhancedTravelMap = dynamic(() => import('@/components/EnhancedTravelMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
      <div className="absolute bottom-4 right-4 flex items-center gap-2 text-blue-600">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Navigation className="w-8 h-8" />
        </motion.div>
        <span className="text-lg font-medium">Loading enhanced map...</span>
      </div>
    </div>
  ),
});

// Import performance and accessibility components
import { MobileTabNavigation } from '@/components/MobileEnhancements';
import { AccessibleMotion, ScreenReaderAnnouncement, AccessibilityToolbar } from '@/components/AccessibilityEnhancements';
import { MemoizedMotion } from '@/components/PerformanceOptimizations';

// Enhanced travel statistics with animations
const enhancedStats = {
  countries: { value: 23, label: 'Countries', icon: Globe, color: 'from-blue-500 to-cyan-500' },
  cities: { value: 67, label: 'Cities', icon: MapPin, color: 'from-green-500 to-emerald-500' },
  miles: { value: 45280, label: 'Miles', icon: Route, color: 'from-purple-500 to-pink-500' },
  days: { value: 892, label: 'Days', icon: Calendar, color: 'from-orange-500 to-red-500' },
  photos: { value: 3456, label: 'Photos', icon: Camera, color: 'from-yellow-500 to-amber-500' },
  stories: { value: 89, label: 'Stories', icon: Target, color: 'from-indigo-500 to-purple-500' }
};

// Enhanced view options with better UX
const viewOptions = [
  {
    id: 'journey',
    label: 'Journey View',
    icon: Plane,
    description: 'See all my travels with routes and connections',
    color: 'from-red-500 to-pink-500'
  },
  {
    id: 'stories',
    label: 'Story Mode',
    icon: Camera,
    description: 'Explore memories and experiences from each place',
    color: 'from-blue-500 to-indigo-500'
  },
  {
    id: 'home',
    label: 'Mi Casa',
    icon: Home,
    description: 'Focus on my Spanish home base and nearby adventures',
    color: 'from-yellow-500 to-orange-500'
  }
] as const;

// Animated counter component
const AnimatedCounter = ({ 
  value, 
  duration = 2, 
  delay = 0 
}: { 
  value: number; 
  duration?: number; 
  delay?: number; 
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const increment = value / (duration * 60); // 60fps
      const timer = setInterval(() => {
        setCount(prev => {
          const next = prev + increment;
          if (next >= value) {
            clearInterval(timer);
            return value;
          }
          return next;
        });
      }, 1000 / 60);

      return () => clearInterval(timer);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [value, duration, delay]);

  return <span>{Math.floor(count).toLocaleString()}</span>;
};

// Enhanced stats card component
const EnhancedStatsCard = ({ 
  stat, 
  index 
}: { 
  stat: typeof enhancedStats[keyof typeof enhancedStats]; 
  index: number; 
}) => {
  const Icon = stat.icon;

  return (
    <AccessibleMotion
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.05, 
        y: -5,
        transition: { duration: 0.2 }
      }}
      className={`bg-gradient-to-br ${stat.color} p-6 rounded-2xl text-white shadow-lg hover:shadow-xl transition-shadow duration-300`}
    >
      <div className="flex items-center justify-between mb-3">
        <Icon className="w-8 h-8" />
        <div className="text-right">
          <div className="text-3xl font-bold">
            <AnimatedCounter value={stat.value} delay={index * 0.2} />
          </div>
        </div>
      </div>
      <div className="text-sm font-medium opacity-90">{stat.label}</div>
    </AccessibleMotion>
  );
};

export default function EnhancedMapPage() {
  const [selectedView, setSelectedView] = useState<'journey' | 'stories' | 'home'>('journey');
  const [showStats, setShowStats] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [announcement, setAnnouncement] = useState('');

  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 300], [0, -50]);
  const heroOpacity = useTransform(scrollY, [0, 200], [1, 0.8]);

  // Handle view changes with announcements
  const handleViewChange = (view: 'journey' | 'stories' | 'home') => {
    setSelectedView(view);
    const viewData = viewOptions.find(v => v.id === view);
    setAnnouncement(`Switched to ${viewData?.label}. ${viewData?.description}`);
  };

  // Handle location selection
  const handleLocationSelect = (location: any) => {
    setSelectedLocation(location);
    setAnnouncement(`Selected ${location.name}. ${location.description}`);
  };

  useEffect(() => {
    // Auto-show stats after initial load for better UX
    const timer = setTimeout(() => setShowStats(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F4E8D0] to-white">
      <div className="container mx-auto px-5">
        {/* Accessibility enhancements */}
        <ScreenReaderAnnouncement message={announcement} />
        <AccessibilityToolbar />

        <Header />
        
        {/* Enhanced parallax hero */}
        <motion.div 
          style={{ y: headerY, opacity: heroOpacity }}
          className="text-center my-8"
        >
          <motion.h1 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-[#3E2723] mb-4"
          >
            My Enhanced Adventure Map
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-[#8B7355] mb-6"
          >
            From my home in Spain to the corners of the world
          </motion.p>
          
          {/* Enhanced subtitle with animated icons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center justify-center gap-6 text-[#8B7355]"
          >
            <span className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0 }}
              >
                <Globe className="w-5 h-5" />
              </motion.div>
              Interactive
            </span>
            <span className="w-1 h-1 bg-[#8B7355] rounded-full"></span>
            <span className="flex items-center gap-2">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <Camera className="w-5 h-5" />
              </motion.div>
              Immersive
            </span>
            <span className="w-1 h-1 bg-[#8B7355] rounded-full"></span>
            <span className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                <Target className="w-5 h-5" />
              </motion.div>
              Accessible
            </span>
          </motion.div>
        </motion.div>

        {/* Enhanced mobile-friendly view controls */}
        <div className="mb-6">
          {/* Desktop view */}
          <div className="hidden md:flex justify-center gap-4">
            {viewOptions.map((option) => {
              const Icon = option.icon;
              const isActive = selectedView === option.id;
              
              return (
                <motion.button
                  key={option.id}
                  onClick={() => handleViewChange(option.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-8 py-4 rounded-2xl flex items-center gap-3 transition-all overflow-hidden ${
                    isActive 
                      ? 'text-white shadow-lg transform scale-105' 
                      : 'bg-white text-[#8B7355] hover:shadow-md hover:scale-102'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeViewBackground"
                      className={`absolute inset-0 bg-gradient-to-r ${option.color} rounded-2xl`}
                      transition={{ type: "spring", duration: 0.6 }}
                    />
                  )}
                  <div className="relative flex items-center gap-3 z-10">
                    <Icon className="w-6 h-6" />
                    <div className="text-left">
                      <div className="font-semibold">{option.label}</div>
                      <div className="text-xs opacity-80">{option.description}</div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Mobile view using enhanced component */}
          <div className="md:hidden">
            <MobileTabNavigation
              tabs={viewOptions.map(option => ({
                id: option.id,
                label: option.label,
                icon: <option.icon className="w-5 h-5" />
              }))}
              activeTab={selectedView}
              onTabChange={(tabId) => handleViewChange(tabId as any)}
            />
          </div>
        </div>

        {/* Enhanced map container */}
        <main id="main-content" className="relative">
          <motion.div 
            className="rounded-3xl overflow-hidden shadow-2xl mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <EnhancedTravelMap 
              view={selectedView} 
              onLocationSelect={handleLocationSelect}
            />
            
            {/* Enhanced floating stats button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowStats(!showStats)}
              className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              aria-label={showStats ? "Hide statistics" : "Show statistics"}
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-6 h-6 text-[#8B7355]" />
                <span className="text-sm font-medium text-[#8B7355] hidden sm:inline">
                  {showStats ? 'Hide Stats' : 'Show Stats'}
                </span>
              </div>
            </motion.button>
          </motion.div>
        </main>

        {/* Enhanced statistics panel */}
        <AnimatePresence mode="wait">
          {showStats && (
            <MemoizedMotion
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
              className="mb-8"
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-[#3E2723] mb-2">
                  My Travel Journey in Numbers
                </h2>
                <p className="text-[#8B7355]">
                  Every statistic tells a story of adventure and discovery
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {Object.entries(enhancedStats).map(([key, stat], index) => (
                  <EnhancedStatsCard
                    key={key}
                    stat={stat}
                    index={index}
                  />
                ))}
              </div>
            </MemoizedMotion>
          )}
        </AnimatePresence>

        {/* Enhanced featured adventure section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="bg-white rounded-3xl p-8 mb-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-[#3E2723] mb-2">
                Featured Adventure
              </h2>
              <p className="text-[#8B7355]">
                {selectedLocation 
                  ? `Currently exploring: ${selectedLocation.name}`
                  : 'Click on any location on the map to explore detailed stories, photos, and memories from that adventure.'
                }
              </p>
            </div>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-4xl"
            >
              🗺️
            </motion.div>
          </div>
          
          {selectedLocation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {selectedLocation.name}
              </h3>
              <p className="text-gray-700 mb-4">{selectedLocation.memories}</p>
              <div className="flex flex-wrap gap-2">
                {selectedLocation.highlights.slice(0, 3).map((highlight: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        <Footer />
      </div>
    </div>
  );
}