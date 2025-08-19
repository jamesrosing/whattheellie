'use client';

import { useEffect, useRef, useState, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Eye, EyeOff, Type, Contrast } from 'lucide-react';

// Accessibility preferences context
interface AccessibilityPreferences {
  reducedMotion: boolean;
  highContrast: boolean;
  largeText: boolean;
  screenReader: boolean;
  autoPlay: boolean;
}

const AccessibilityContext = createContext<{
  preferences: AccessibilityPreferences;
  updatePreference: (key: keyof AccessibilityPreferences, value: boolean) => void;
}>({
  preferences: {
    reducedMotion: false,
    highContrast: false,
    largeText: false,
    screenReader: false,
    autoPlay: true,
  },
  updatePreference: () => {},
});

export const AccessibilityProvider = ({ children }: { children: React.ReactNode }) => {
  const [preferences, setPreferences] = useState<AccessibilityPreferences>({
    reducedMotion: false,
    highContrast: false,
    largeText: false,
    screenReader: false,
    autoPlay: true,
  });

  // Load preferences from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('accessibility-preferences');
      if (saved) {
        setPreferences(JSON.parse(saved));
      }

      // Detect system preferences
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;

      setPreferences(prev => ({
        ...prev,
        reducedMotion: prefersReducedMotion,
        highContrast: prefersHighContrast,
      }));
    }
  }, []);

  // Save preferences to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessibility-preferences', JSON.stringify(preferences));
    }
  }, [preferences]);

  const updatePreference = (key: keyof AccessibilityPreferences, value: boolean) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  return (
    <AccessibilityContext.Provider value={{ preferences, updatePreference }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => useContext(AccessibilityContext);

// Skip to content link
export const SkipToContent = () => (
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
  >
    Skip to main content
  </a>
);

// Screen reader announcements
export const ScreenReaderAnnouncement = ({ 
  message, 
  priority = 'polite' 
}: { 
  message: string;
  priority?: 'polite' | 'assertive';
}) => {
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    setAnnouncement(message);
    const timer = setTimeout(() => setAnnouncement(''), 1000);
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div
      role="status"
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
    >
      {announcement}
    </div>
  );
};

// Focus trap for modals
export const FocusTrap = ({ 
  children, 
  isActive 
}: { 
  children: React.ReactNode;
  isActive: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLElement | null>(null);
  const lastFocusableRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const focusableElements = containerRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    if (focusableElements.length > 0) {
      firstFocusableRef.current = focusableElements[0];
      lastFocusableRef.current = focusableElements[focusableElements.length - 1];
      
      // Focus first element
      firstFocusableRef.current.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstFocusableRef.current) {
            e.preventDefault();
            lastFocusableRef.current?.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastFocusableRef.current) {
            e.preventDefault();
            firstFocusableRef.current?.focus();
          }
        }
      }

      if (e.key === 'Escape') {
        // Let parent handle escape
        e.stopPropagation();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isActive]);

  return (
    <div ref={containerRef}>
      {children}
    </div>
  );
};

// Accessible motion wrapper
export const AccessibleMotion = ({ 
  children, 
  ...motionProps 
}: { 
  children: React.ReactNode;
  [key: string]: any;
}) => {
  const { preferences } = useAccessibility();

  const adjustedProps = preferences.reducedMotion
    ? {
        ...motionProps,
        animate: motionProps.animate ? { ...motionProps.animate } : undefined,
        transition: { duration: 0.01 },
        initial: false,
      }
    : motionProps;

  return <motion.div {...adjustedProps}>{children}</motion.div>;
};

// Loading state with accessibility
export const AccessibleLoading = ({ 
  message = 'Loading content...',
  className = '' 
}: {
  message?: string;
  className?: string;
}) => {
  const { preferences } = useAccessibility();

  return (
    <div 
      className={`flex items-center justify-center p-8 ${className}`}
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      {!preferences.reducedMotion && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mr-3"
        />
      )}
      <span className={preferences.screenReader ? 'sr-only' : ''}>
        {message}
      </span>
    </div>
  );
};

// Accessible form field
export const AccessibleField = ({ 
  label, 
  id, 
  error, 
  required, 
  description,
  children 
}: {
  label: string;
  id: string;
  error?: string;
  required?: boolean;
  description?: string;
  children: React.ReactNode;
}) => {
  const errorId = `${id}-error`;
  const descriptionId = `${id}-description`;

  return (
    <div className="space-y-2">
      <label 
        htmlFor={id}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-label="required">
            *
          </span>
        )}
      </label>
      
      {description && (
        <p id={descriptionId} className="text-sm text-gray-600">
          {description}
        </p>
      )}
      
      <div className="relative">
        {children}
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg 
              className="h-5 w-5 text-red-500" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path 
                fillRule="evenodd" 
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
                clipRule="evenodd" 
              />
            </svg>
          </div>
        )}
      </div>
      
      {error && (
        <p 
          id={errorId}
          className="text-sm text-red-600"
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
};

// Accessibility toolbar
export const AccessibilityToolbar = () => {
  const { preferences, updatePreference } = useAccessibility();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 bg-blue-600 text-white p-3 rounded-full shadow-lg z-50 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Open accessibility settings"
      >
        <Eye className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <FocusTrap isActive={isOpen}>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Accessibility Settings</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Close accessibility settings"
                  >
                    <EyeOff className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <VolumeX className="w-5 h-5 text-gray-600" />
                      <span>Reduce Motion</span>
                    </div>
                    <button
                      onClick={() => updatePreference('reducedMotion', !preferences.reducedMotion)}
                      className={`w-12 h-6 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        preferences.reducedMotion ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                      role="switch"
                      aria-checked={preferences.reducedMotion}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        preferences.reducedMotion ? 'transform translate-x-6' : ''
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Contrast className="w-5 h-5 text-gray-600" />
                      <span>High Contrast</span>
                    </div>
                    <button
                      onClick={() => updatePreference('highContrast', !preferences.highContrast)}
                      className={`w-12 h-6 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        preferences.highContrast ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                      role="switch"
                      aria-checked={preferences.highContrast}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        preferences.highContrast ? 'transform translate-x-6' : ''
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Type className="w-5 h-5 text-gray-600" />
                      <span>Large Text</span>
                    </div>
                    <button
                      onClick={() => updatePreference('largeText', !preferences.largeText)}
                      className={`w-12 h-6 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        preferences.largeText ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                      role="switch"
                      aria-checked={preferences.largeText}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        preferences.largeText ? 'transform translate-x-6' : ''
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Volume2 className="w-5 h-5 text-gray-600" />
                      <span>Auto-play Media</span>
                    </div>
                    <button
                      onClick={() => updatePreference('autoPlay', !preferences.autoPlay)}
                      className={`w-12 h-6 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        preferences.autoPlay ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                      role="switch"
                      aria-checked={preferences.autoPlay}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        preferences.autoPlay ? 'transform translate-x-6' : ''
                      }`} />
                    </button>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200 text-sm text-gray-600">
                  Settings are saved automatically and persist across sessions.
                </div>
              </motion.div>
            </FocusTrap>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};