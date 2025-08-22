'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Plane, Home, Camera, Calendar, MapPin, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Dynamically import map component to avoid SSR issues
const MapComponent = dynamic(() => import('@/components/MapboxTravelMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <Navigation className="w-8 h-8 text-primary" />
      </motion.div>
    </div>
  ),
});

// Travel statistics
const stats = {
  countries: 23,
  cities: 67,
  miles: 45280,
  days: 892,
  photos: 3456,
  stories: 89
};

export default function MapPage() {
  const [selectedView, setSelectedView] = useState<'journey' | 'stories' | 'home'>('journey');
  const [showStats, setShowStats] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-5">
        <Header />
        
        {/* Page Title with Animation */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center my-8"
        >
          <h1 className="text-h1 text-foreground mb-4">
            My Adventure Map
          </h1>
          <p className="text-lg text-muted-foreground">
            From my home in Spain to the corners of the world
          </p>
        </motion.div>

        {/* View Controls */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-6">
          <button
            onClick={() => setSelectedView('journey')}
            className={`px-4 md:px-6 py-2 md:py-3 rounded-full flex items-center gap-2 transition-all text-sm md:text-base ${
              selectedView === 'journey' 
                ? 'bg-primary text-primary-foreground shadow-lg' 
                : 'bg-card text-muted-foreground hover:shadow-md'
            }`}
          >
            <Plane className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden sm:inline">Journey View</span>
            <span className="sm:hidden">Journey</span>
          </button>
          
          <button
            onClick={() => setSelectedView('stories')}
            className={`px-4 md:px-6 py-2 md:py-3 rounded-full flex items-center gap-2 transition-all text-sm md:text-base ${
              selectedView === 'stories' 
                ? 'bg-accent text-accent-foreground shadow-lg' 
                : 'bg-card text-muted-foreground hover:shadow-md'
            }`}
          >
            <Camera className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden sm:inline">Story Mode</span>
            <span className="sm:hidden">Stories</span>
          </button>
          
          <button
            onClick={() => setSelectedView('home')}
            className={`px-4 md:px-6 py-2 md:py-3 rounded-full flex items-center gap-2 transition-all text-sm md:text-base ${
              selectedView === 'home' 
                ? 'bg-primary text-primary-foreground shadow-lg' 
                : 'bg-card text-muted-foreground hover:shadow-md'
            }`}
          >
            <Home className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden sm:inline">Mi Casa</span>
            <span className="sm:hidden">Home</span>
          </button>
        </div>

        {/* Map Container */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-8">
          <MapComponent view={selectedView} />
          
          {/* Floating Stats Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowStats(!showStats)}
            className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm p-3 rounded-full shadow-lg dark:shadow-xl"
          >
            <Calendar className="w-6 h-6 text-muted-foreground" />
          </motion.button>
        </div>

        {/* Statistics Panel */}
        <AnimatePresence>
          {showStats && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 mb-8"
            >
              {Object.entries(stats).map(([key, value], index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-xl p-3 md:p-4 text-center shadow-md dark:shadow-xl"
                >
                  <div className="text-2xl md:text-3xl font-bold text-primary">
                    {value.toLocaleString()}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground capitalize">
                    {key}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Story Section for Selected Location */}
        <div className="bg-card rounded-2xl p-8 mb-8 shadow-lg dark:shadow-xl">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Featured Adventure
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground">
              Click on any location on the map to explore the stories, photos, and memories 
              from that adventure. Each pin holds a unique chapter of my journey.
            </p>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}