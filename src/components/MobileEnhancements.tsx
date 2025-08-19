'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, PanInfo, useMotionValue, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, Menu, X, ArrowUp } from 'lucide-react';

// Enhanced mobile navigation drawer
export const MobileDrawer = ({
  isOpen,
  onClose,
  children,
  className = '',
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}) => {
  const y = useMotionValue(0);
  const opacity = useTransform(y, [0, 300], [1, 0]);

  const handleDragEnd = (_event: any, info: PanInfo) => {
    if (info.velocity.y > 500 || info.offset.y > 150) {
      onClose();
    }
  };

  useEffect(() => {
    if (!isOpen) {
      y.set(0);
    }
  }, [isOpen, y]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-50 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      aria-modal={isOpen}
      role="dialog"
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black"
        style={{ opacity }}
        onClick={onClose}
        aria-label="Close drawer"
        tabIndex={-1}
      />

      {/* Drawer */}
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 300 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        style={{ y }}
        initial={{ y: '100%' }}
        animate={{ y: isOpen ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[80vh] overflow-hidden ${className}`}
      >
        {/* Drag handle */}
        <div className="flex justify-center py-3">
          <div className="w-12 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Content */}
        <div className="px-6 pb-6 overflow-y-auto max-h-[calc(80vh-4rem)]">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};

// Swipeable card component for mobile
export const SwipeableCard = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  className = '',
  threshold = 100,
}: {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  className?: string;
  threshold?: number;
}) => {
  const x = useMotionValue(0);
  const scale = useTransform(x, [-threshold, 0, threshold], [0.95, 1, 0.95]);
  const rotate = useTransform(x, [-threshold, 0, threshold], [-10, 0, 10]);

  const handleDragEnd = (_event: any, info: PanInfo) => {
    if (Math.abs(info.offset.x) > threshold) {
      if (info.offset.x > 0 && onSwipeRight) {
        onSwipeRight();
      } else if (info.offset.x < 0 && onSwipeLeft) {
        onSwipeLeft();
      }
      x.set(0);
    } else {
      x.set(0);
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: -threshold * 2, right: threshold * 2 }}
      dragElastic={0.1}
      style={{ x, scale, rotate }}
      onDragEnd={handleDragEnd}
      whileDrag={{ cursor: 'grabbing' }}
      className={`touch-pan-y ${className}`}
    >
      {children}
    </motion.div>
  );
};

// Touch-optimized carousel
export const TouchCarousel = ({
  items,
  renderItem,
  className = '',
  itemClassName = '',
  autoPlay = false,
  autoPlayDelay = 3000,
}: {
  items: any[];
  renderItem: (item: any, index: number) => React.ReactNode;
  className?: string;
  itemClassName?: string;
  autoPlay?: boolean;
  autoPlayDelay?: number;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay) {
      autoPlayRef.current = setInterval(nextSlide, autoPlayDelay);
      return () => {
        if (autoPlayRef.current) {
          clearInterval(autoPlayRef.current);
          autoPlayRef.current = null;
        }
      };
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
    };
  }, [autoPlay, autoPlayDelay, nextSlide]);

  // Touch handling
  const handleDragEnd = (_event: any, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      prevSlide();
    } else if (info.offset.x < -threshold) {
      nextSlide();
    }
  };

  const pauseAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  };

  const resumeAutoPlay = () => {
    if (autoPlay && !autoPlayRef.current) {
      autoPlayRef.current = setInterval(nextSlide, autoPlayDelay);
    }
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onTouchStart={pauseAutoPlay}
      onTouchEnd={resumeAutoPlay}
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={resumeAutoPlay}
    >
      <motion.div
        ref={containerRef}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        animate={{ x: `-${currentIndex * 100}%` }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="flex touch-pan-y"
      >
        {items.map((item, index) => (
          <motion.div
            key={index}
            className={`min-w-full ${itemClassName}`}
            style={{ flex: '0 0 100%' }}
          >
            {renderItem(item, index)}
          </motion.div>
        ))}
      </motion.div>

      {/* Navigation dots */}
      <div className="flex justify-center space-x-2 mt-4">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-blue-500 scale-125'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            type="button"
          />
        ))}
      </div>

      {/* Navigation arrows for larger screens */}
      <div className="hidden md:flex">
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors"
          aria-label="Previous slide"
          type="button"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors"
          aria-label="Next slide"
          type="button"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

// Mobile-optimized tab navigation
export const MobileTabNavigation = ({
  tabs,
  activeTab,
  onTabChange,
  className = '',
}: {
  tabs: { id: string; label: string; icon?: React.ReactNode }[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  return (
    <>
      {/* Mobile tab trigger */}
      <div className={`md:hidden ${className}`}>
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="flex items-center justify-between w-full p-4 bg-white rounded-lg shadow-md"
          type="button"
          aria-label="Open tab navigation"
        >
          <div className="flex items-center gap-3">
            {activeTabData?.icon}
            <span className="font-medium">{activeTabData?.label}</span>
          </div>
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Desktop tabs */}
      <div className={`hidden md:flex space-x-2 ${className}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === tab.id
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            type="button"
            aria-current={activeTab === tab.id ? 'page' : undefined}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Mobile drawer */}
      <MobileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Select Section</h3>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100"
              type="button"
              aria-label="Close tab navigation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                onTabChange(tab.id);
                setIsDrawerOpen(false);
              }}
              className={`flex items-center gap-3 w-full p-4 rounded-lg text-left transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-50 border-l-4 border-blue-500 text-blue-700'
                  : 'hover:bg-gray-50'
              }`}
              type="button"
              aria-current={activeTab === tab.id ? 'page' : undefined}
            >
              {tab.icon}
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </MobileDrawer>
    </>
  );
};

// Pull-to-refresh component
export const PullToRefresh = ({
  onRefresh,
  children,
  className = '',
  threshold = 80,
}: {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
  className?: string;
  threshold?: number;
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const y = useMotionValue(0);

  const handleDrag = (_event: any, info: PanInfo) => {
    if (info.offset.y > 0) {
      setPullDistance(info.offset.y);
    }
  };

  const handleDragEnd = async (_event: any, info: PanInfo) => {
    if (info.offset.y > threshold && !isRefreshing) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
        setPullDistance(0);
      }
    } else {
      setPullDistance(0);
    }
  };

  const pullProgress = Math.min(pullDistance / threshold, 1);

  return (
    <motion.div
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.2}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      style={{ y }}
      className={`overflow-hidden ${className}`}
    >
      {/* Pull indicator */}
      <motion.div
        animate={{ height: isRefreshing ? 60 : pullDistance > 0 ? 60 : 0 }}
        className="bg-blue-50 flex items-center justify-center overflow-hidden"
      >
        <div className="flex items-center gap-2 text-blue-600">
          <motion.div
            animate={{
              rotate: isRefreshing ? 360 : pullProgress * 180,
            }}
            transition={{
              rotate: isRefreshing
                ? { duration: 1, repeat: Infinity, ease: 'linear' }
                : { duration: 0.2 },
            }}
          >
            <ArrowUp className="w-5 h-5" />
          </motion.div>
          <span className="text-sm font-medium">
            {isRefreshing
              ? 'Refreshing...'
              : pullProgress >= 1
              ? 'Release to refresh'
              : 'Pull to refresh'}
          </span>
        </div>
      </motion.div>

      {children}
    </motion.div>
  );
};

// Accessible touch target component
export const TouchTarget = ({
  children,
  onPress,
  className = '',
  minSize = 44,
  hapticFeedback = false,
}: {
  children: React.ReactNode;
  onPress: () => void;
  className?: string;
  minSize?: number;
  hapticFeedback?: boolean;
}) => {
  const handlePress = (e?: React.MouseEvent | React.KeyboardEvent) => {
    if (hapticFeedback && typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(10);
    }
    onPress();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handlePress(e);
    }
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={handlePress}
      onKeyDown={handleKeyDown}
      className={`inline-flex items-center justify-center ${className}`}
      style={{ minHeight: minSize, minWidth: minSize }}
      // Accessibility
      role="button"
      tabIndex={0}
      type="button"
    >
      {children}
    </motion.button>
  );
};