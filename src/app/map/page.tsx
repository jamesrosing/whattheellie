'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Plane, Home, Camera, Calendar, MapPin, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Dynamically import map component to avoid SSR issues
const MapComponent = dynamic(() => import('@/components/TravelMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-[#F4E8D0] flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <Navigation className="w-8 h-8 text-amber-600" />
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
    <div className="min-h-screen bg-gradient-to-b from-[#F4E8D0] to-white">
      <div className="container mx-auto px-5">
        <Header />
        
        {/* Page Title with Animation */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center my-8"
        >
          <h1 className="text-4xl md:text-5xl font-display font-medium text-[#3E2723] mb-4">
            My Adventure Map
          </h1>
          <p className="text-lg text-[#8B7355]">
            From my home in Spain to the corners of the world
          </p>
        </motion.div>

        {/* View Controls */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setSelectedView('journey')}
            className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all ${
              selectedView === 'journey' 
                ? 'bg-[#FF6B6B] text-white shadow-lg' 
                : 'bg-white text-[#8B7355] hover:shadow-md'
            }`}
          >
            <Plane className="w-5 h-5" />
            Journey View
          </button>
          
          <button
            onClick={() => setSelectedView('stories')}
            className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all ${
              selectedView === 'stories' 
                ? 'bg-[#4ECDC4] text-white shadow-lg' 
                : 'bg-white text-[#8B7355] hover:shadow-md'
            }`}
          >
            <Camera className="w-5 h-5" />
            Story Mode
          </button>
          
          <button
            onClick={() => setSelectedView('home')}
            className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all ${
              selectedView === 'home' 
                ? 'bg-[#FFD700] text-[#3E2723] shadow-lg' 
                : 'bg-white text-[#8B7355] hover:shadow-md'
            }`}
          >
            <Home className="w-5 h-5" />
            Mi Casa
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
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg"
          >
            <Calendar className="w-6 h-6 text-[#8B7355]" />
          </motion.button>
        </div>

        {/* Statistics Panel */}
        <AnimatePresence>
          {showStats && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8"
            >
              {Object.entries(stats).map(([key, value], index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-4 text-center shadow-md"
                >
                  <div className="text-3xl font-bold text-[#FF6B6B]">
                    {value.toLocaleString()}
                  </div>
                  <div className="text-sm text-[#8B7355] capitalize">
                    {key}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Story Section for Selected Location */}
        <div className="bg-white rounded-2xl p-8 mb-8 shadow-lg">
          <h2 className="text-2xl font-bold text-[#3E2723] mb-4">
            Featured Adventure
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-[#8B7355]">
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