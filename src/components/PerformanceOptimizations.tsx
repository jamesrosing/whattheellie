'use client';

import { memo, useMemo, lazy, Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

// Enhanced skeleton components for different content types
export const MapSkeleton = memo(() => (
  <div className="w-full h-[600px] bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl overflow-hidden relative animate-pulse">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      <div className="grid grid-cols-3 gap-4 mt-8">
        {[...Array(6)].map((_, i) => (
          <Skeleton 
            key={i} 
            className="h-20 w-full" 
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
      </div>
    </div>
    <div className="absolute bottom-4 right-4 flex items-center gap-2 text-blue-600">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"
      />
      <span className="text-sm font-medium">Loading adventure map...</span>
    </div>
  </div>
));

export const ContentSkeleton = memo(({ lines = 3 }: { lines?: number }) => (
  <div className="animate-pulse space-y-4">
    <Skeleton className="h-8 w-3/4" />
    {[...Array(lines)].map((_, i) => (
      <Skeleton key={i} className="h-4 w-full" />
    ))}
    <Skeleton className="h-4 w-2/3" />
  </div>
));

export const CardSkeleton = memo(() => (
  <div className="bg-white rounded-2xl p-6 shadow-lg animate-pulse">
    <div className="flex items-start gap-4">
      <Skeleton className="w-12 h-12 rounded-full" />
      <div className="flex-1 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  </div>
));

// Lazy loading wrapper with enhanced loading states
export const LazySection = memo(({ 
  loader, 
  fallback,
  className = '' 
}: { 
  loader: () => Promise<any>;
  fallback?: React.ReactNode;
  className?: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [component, setComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !component) {
          setIsVisible(true);
          loader().then((module) => {
            setComponent(() => module.default || module);
          });
        }
      },
      { rootMargin: '200px' }
    );

    const element = document.querySelector(`[data-lazy-section="${className}"]`);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [loader, component, className]);

  const Component = component;

  return (
    <div data-lazy-section={className} className={className}>
      {Component ? (
        <Component />
      ) : isVisible ? (
        fallback || <ContentSkeleton lines={5} />
      ) : (
        <div className="h-64 bg-gray-100 rounded-2xl animate-pulse" />
      )}
    </div>
  );
});

// Progressive image loading with blur-up effect
export const ProgressiveImage = memo(({ 
  src, 
  alt, 
  className = '',
  placeholder = '/images/placeholder.webp',
  ...props 
}: {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  [key: string]: any;
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder/blur layer */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: imageLoaded ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300"
      >
        <div className="w-full h-full bg-gray-200 animate-pulse" />
      </motion.div>

      {/* Actual image */}
      <motion.img
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ 
          opacity: imageLoaded ? 1 : 0,
          scale: imageLoaded ? 1 : 1.1
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        src={imageError ? placeholder : src}
        alt={alt}
        onLoad={() => setImageLoaded(true)}
        onError={() => {
          setImageError(true);
          setImageLoaded(true);
        }}
        className="w-full h-full object-cover"
        {...props}
      />
    </div>
  );
});

// Virtual scrolling for large lists
export const VirtualScrollList = memo(({ 
  items, 
  renderItem, 
  itemHeight = 100,
  containerHeight = 400,
  className = ''
}: {
  items: any[];
  renderItem: (item: any, index: number) => React.ReactNode;
  itemHeight?: number;
  containerHeight?: number;
  className?: string;
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  
  const visibleItems = useMemo(() => {
    const start = Math.floor(scrollTop / itemHeight);
    const end = Math.min(
      start + Math.ceil(containerHeight / itemHeight) + 1,
      items.length
    );
    
    return {
      start,
      end,
      items: items.slice(start, end)
    };
  }, [scrollTop, itemHeight, containerHeight, items]);

  const totalHeight = items.length * itemHeight;

  return (
    <div 
      className={`overflow-auto ${className}`}
      style={{ height: containerHeight }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div 
          style={{ 
            transform: `translateY(${visibleItems.start * itemHeight}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0
          }}
        >
          {visibleItems.items.map((item, index) => (
            <div key={visibleItems.start + index} style={{ height: itemHeight }}>
              {renderItem(item, visibleItems.start + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

// Memoized animation wrapper
export const MemoizedMotion = memo(({ 
  children, 
  ...motionProps 
}: { 
  children: React.ReactNode;
  [key: string]: any;
}) => (
  <motion.div {...motionProps}>
    {children}
  </motion.div>
));

// Performance monitoring hook
export const usePerformanceMonitor = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'measure') {
            console.log(`${entry.name}: ${entry.duration}ms`);
          }
        });
      });

      observer.observe({ entryTypes: ['measure'] });

      return () => observer.disconnect();
    }
  }, []);
};

// Bundle size monitoring
export const getBundleInfo = () => {
  if (typeof window !== 'undefined') {
    const scripts = Array.from(document.querySelectorAll('script[src]'));
    const totalSize = scripts.reduce((total, script) => {
      const src = script.getAttribute('src');
      return total + (src ? src.length : 0);
    }, 0);

    return {
      scriptCount: scripts.length,
      estimatedSize: `${(totalSize / 1024).toFixed(2)}KB`,
      performance: window.performance.timing
    };
  }
  return null;
};

// Code splitting utilities
export const createAsyncComponent = (loader: () => Promise<any>) => {
  const AsyncComponent = lazy(loader);
  
  return memo((props: any) => (
    <Suspense fallback={<ContentSkeleton lines={3} />}>
      <AsyncComponent {...props} />
    </Suspense>
  ));
};

// Export display names for debugging
MapSkeleton.displayName = 'MapSkeleton';
ContentSkeleton.displayName = 'ContentSkeleton';
CardSkeleton.displayName = 'CardSkeleton';
LazySection.displayName = 'LazySection';
ProgressiveImage.displayName = 'ProgressiveImage';
VirtualScrollList.displayName = 'VirtualScrollList';
MemoizedMotion.displayName = 'MemoizedMotion';