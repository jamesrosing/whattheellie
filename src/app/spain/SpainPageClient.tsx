/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Clock, Users, Mountain, Utensils, Music, 
  Calendar, Heart, Info, ChevronRight, Book, Compass,
  Sun, Wine, Castle, Church, Train, Camera, Menu, X
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Navigation sections
const sections = [
  { id: 'history', label: 'History', icon: Clock, color: 'text-amber-600 dark:text-amber-400' },
  { id: 'geography', label: 'Geography', icon: Mountain, color: 'text-green-600 dark:text-green-400' },
  { id: 'people', label: 'People & Culture', icon: Users, color: 'text-blue-600 dark:text-blue-400' },
  { id: 'cuisine', label: 'Cuisine', icon: Utensils, color: 'text-red-600 dark:text-red-400' },
  { id: 'destinations', label: 'Must-Visit', icon: MapPin, color: 'text-purple-600 dark:text-purple-400' },
  { id: 'hidden', label: 'Hidden Gems', icon: Compass, color: 'text-teal-600 dark:text-teal-400' },
  { id: 'festivals', label: 'Festivals', icon: Calendar, color: 'text-orange-600 dark:text-orange-400' },
  { id: 'practical', label: 'Travel Tips', icon: Info, color: 'text-indigo-600 dark:text-indigo-400' },
];

export default function SpainPageClient() {
  const [activeSection, setActiveSection] = useState('history');
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      }
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const toggleCard = (cardId: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(cardId)) {
      newExpanded.delete(cardId);
    } else {
      newExpanded.add(cardId);
    }
    setExpandedCards(newExpanded);
  };

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    if (!isDesktop) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex relative">
      {/* Mobile Menu Button */}
      {!isDesktop && (
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed top-20 left-4 z-50 p-2 bg-card rounded-lg shadow-lg dark:shadow-xl lg:hidden"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      )}

      {/* Sidebar Navigation */}
      <AnimatePresence>
        {(isSidebarOpen || isDesktop) && (
          <>
            {/* Mobile Overlay */}
            {!isDesktop && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSidebarOpen(false)}
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              />
            )}

            {/* Sidebar */}
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={cn(
                "fixed lg:sticky top-0 left-0 h-screen w-72 bg-card border-r border-border z-40",
                "flex flex-col shadow-xl dark:shadow-2xl",
                isDesktop ? "mt-0" : "pt-20"
              )}
            >
              {/* Sidebar Header */}
              <div className="p-6 border-b border-border">
                <h2 className="text-2xl font-garamond font-medium text-foreground">
                  España Guide
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Navigate through Spain's treasures
                </p>
              </div>

              {/* Navigation Items */}
              <nav className="flex-1 overflow-y-auto p-4">
                <ul className="space-y-2">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    const isActive = activeSection === section.id;
                    
                    return (
                      <li key={section.id}>
                        <button
                          onClick={() => handleSectionChange(section.id)}
                          className={cn(
                            "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                            "hover:bg-accent hover:translate-x-1",
                            isActive && "bg-accent shadow-md translate-x-1"
                          )}
                        >
                          <Icon className={cn("w-5 h-5", section.color)} />
                          <span className={cn(
                            "font-medium text-sm",
                            isActive ? "text-foreground" : "text-muted-foreground"
                          )}>
                            {section.label}
                          </span>
                          {isActive && (
                            <ChevronRight className="w-4 h-4 ml-auto text-muted-foreground" />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Sidebar Footer */}
              <div className="p-4 border-t border-border">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Sun className="w-4 h-4" />
                  <span>Best time: April - October</span>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className={cn(
        "flex-1 min-h-screen",
        isDesktop ? "ml-0" : "w-full"
      )}>
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative h-[300px] lg:h-[400px] overflow-hidden mb-8"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-yellow-500 dark:from-red-800 dark:to-yellow-700" />
          <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <div className="text-center px-4">
              <h1 className="hero-text text-white mb-4 drop-shadow-lg">España</h1>
              <p className="hero-tagline text-xl md:text-2xl text-white/95 mb-2">The Complete Guide</p>
              <p className="text-lg text-white/80">History • Culture • Adventures • Secrets</p>
            </div>
          </div>
        </motion.div>

        {/* Content Sections */}
        <div className="px-4 lg:px-8 pb-12">
          <AnimatePresence mode="wait">
            {activeSection === 'history' && (
              <motion.div
                key="history"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-lg dark:shadow-xl">
                  <h2 className="text-h2 text-foreground mb-6 flex items-center gap-3">
                    <Clock className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                    5,000 Years of Spanish History
                  </h2>
                  
                  <div className="prose prose-lg dark:prose-invert max-w-none text-foreground mb-8">
                    <p className="text-body">
                      From prehistoric cave paintings to modern democracy, Spain's history reads like an epic novel. 
                      The Iberian Peninsula has been home to Celts, Romans, Visigoths, Muslims, and Christians, 
                      each leaving indelible marks on the culture, architecture, and soul of modern Spain.
                    </p>
                  </div>

                  {/* Timeline */}
                  <div className="space-y-4">
                    {[
                      { era: 'Prehistoric', period: '30,000 BCE', event: 'Altamira cave paintings created' },
                      { era: 'Ancient', period: '218 BCE', event: 'Roman conquest begins' },
                      { era: 'Medieval', period: '711 CE', event: 'Muslim conquest of Iberia' },
                      { era: 'Reconquista', period: '1492', event: 'Fall of Granada, Columbus discovers America' },
                      { era: 'Golden Age', period: '16th-17th century', event: 'Spanish Empire at its peak' },
                      { era: 'Modern', period: '1978', event: 'Democratic constitution established' },
                    ].map((item, index) => (
                      <TimelineItem key={index} {...item} />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeSection === 'geography' && (
              <motion.div
                key="geography"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-lg dark:shadow-xl">
                  <h2 className="text-h2 text-foreground mb-6 flex items-center gap-3">
                    <Mountain className="w-8 h-8 text-green-600 dark:text-green-400" />
                    Diverse Landscapes
                  </h2>
                  
                  <div className="prose prose-lg dark:prose-invert max-w-none text-foreground mb-8">
                    <p className="text-body">
                      Spain is Europe's second-largest country, offering an incredible diversity of landscapes 
                      from snow-capped Pyrenees to sun-drenched Mediterranean beaches, from verdant Galician 
                      forests to the lunar landscapes of Almería.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <RegionCard 
                      title="Northern Spain"
                      description="Green Spain - Galicia, Asturias, Cantabria, Basque Country"
                      highlights={['Camino de Santiago', 'Picos de Europa', 'Atlantic coastline']}
                    />
                    <RegionCard 
                      title="Central Spain"
                      description="The Meseta plateau - Madrid, Castilla"
                      highlights={['High altitude plains', 'Continental climate', 'Historic cities']}
                    />
                    <RegionCard 
                      title="Mediterranean Coast"
                      description="From Catalonia to Andalusia"
                      highlights={['Costa Brava', 'Valencia beaches', 'Costa del Sol']}
                    />
                    <RegionCard 
                      title="The Islands"
                      description="Balearics and Canaries"
                      highlights={['Mallorca', 'Ibiza', 'Tenerife', 'Lanzarote']}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Add more sections here following the same pattern */}
            
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

// Timeline Item Component
const TimelineItem = ({ era, period, event }: { era: string; period: string; event: string }) => (
  <motion.div 
    whileHover={{ x: 4 }}
    className="flex gap-4 p-4 bg-muted/50 dark:bg-muted/20 rounded-lg hover:bg-muted/70 dark:hover:bg-muted/30 transition-colors"
  >
    <div className="flex-shrink-0 w-24">
      <div className="text-sm font-semibold text-primary">{era}</div>
      <div className="text-xs text-muted-foreground">{period}</div>
    </div>
    <div className="flex-1">
      <p className="text-foreground">{event}</p>
    </div>
  </motion.div>
);

// Region Card Component
const RegionCard = ({ 
  title, 
  description, 
  highlights 
}: { 
  title: string; 
  description: string; 
  highlights: string[] 
}) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    className="p-6 bg-muted/30 dark:bg-muted/10 rounded-xl hover:shadow-md transition-all"
  >
    <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground mb-4">{description}</p>
    <ul className="space-y-1">
      {highlights.map((item, i) => (
        <li key={i} className="text-sm text-foreground flex items-center gap-2">
          <ChevronRight className="w-3 h-3 text-primary" />
          {item}
        </li>
      ))}
    </ul>
  </motion.div>
);