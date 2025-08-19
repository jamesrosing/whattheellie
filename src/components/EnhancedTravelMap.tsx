'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, MapPin, Calendar, Heart, ArrowRight, Navigation, Plane, Camera } from 'lucide-react';

// Enhanced performance with dynamic import for marker clustering
let MarkerClusterGroup: any;
if (typeof window !== 'undefined') {
  import('leaflet.markercluster').then((module) => {
    MarkerClusterGroup = module.default;
  });
}

// Fix for default markers in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/images/marker-icon-2x.png',
  iconUrl: '/images/marker-icon.png',
  shadowUrl: '/images/marker-shadow.png',
});

// Enhanced travel locations with more metadata
const locations = [
  {
    id: 'spain-home',
    name: 'Madrid, Spain',
    coordinates: [40.4168, -3.7038] as [number, number],
    type: 'home',
    description: 'My home base - where every adventure begins and ends',
    image: '/images/madrid.jpg',
    visitDate: 'Home Base',
    memories: 'Sunrise runs in Retiro Park, discovering hidden tapas bars in La Latina, Sunday afternoons at the Prado, flamenco nights in Lavapiés',
    blogPosts: [],
    highlights: ['Retiro Park', 'La Latina', 'Malasaña', 'Mercado San Miguel', 'El Rastro', 'Prado Museum'],
    mood: '🏠',
    season: 'year-round',
    favoriteTime: 'sunset',
  },
  {
    id: 'barcelona',
    name: 'Barcelona, Spain',
    coordinates: [41.3851, 2.1734] as [number, number],
    type: 'visited',
    description: 'Weekend escapes to the Mediterranean',
    image: '/images/barcelona.jpg',
    visitDate: 'Multiple visits',
    memories: 'Sunrise at Bunkers del Carmel, getting lost in Gothic Quarter',
    blogPosts: [],
    highlights: ['Sagrada Familia', 'Park Güell', 'La Barceloneta'],
    mood: '🏖️',
    season: 'spring',
    favoriteTime: 'early morning',
  },
  {
    id: 'paris',
    name: 'Paris, France',
    coordinates: [48.8566, 2.3522] as [number, number],
    type: 'visited',
    description: 'City of lights and unexpected adventures',
    image: '/images/paris.jpg',
    visitDate: 'March 2024',
    memories: 'Picnic by the Seine, jazz in hidden Marais clubs',
    blogPosts: [],
    highlights: ['Montmartre', 'Latin Quarter', 'Musée Rodin'],
    mood: '🎨',
    season: 'spring',
    favoriteTime: 'twilight',
  },
  {
    id: 'lisbon',
    name: 'Lisbon, Portugal',
    coordinates: [38.7223, -9.1393] as [number, number],
    type: 'visited',
    description: 'Pastel de nata and fado nights',
    image: '/images/lisbon.jpg',
    visitDate: 'May 2024',
    memories: 'Tram 28 adventures, sunset at Miradouro da Senhora do Monte',
    blogPosts: [],
    highlights: ['Belém', 'Alfama', 'LX Factory'],
    mood: '🎵',
    season: 'spring',
    favoriteTime: 'golden hour',
  },
  {
    id: 'london',
    name: 'London, UK',
    coordinates: [51.5074, -0.1278] as [number, number],
    type: 'visited',
    description: 'Where I left the corporate world behind',
    image: '/images/london.jpg',
    visitDate: 'Former home',
    memories: 'The day I quit my job, last view from the office tower',
    blogPosts: [],
    highlights: ['Camden Market', 'Shoreditch', 'Richmond Park'],
    mood: '💼',
    season: 'autumn',
    favoriteTime: 'rainy afternoons',
  },
  {
    id: 'tokyo',
    name: 'Tokyo, Japan',
    coordinates: [35.6762, 139.6503] as [number, number],
    type: 'upcoming',
    description: 'Dream destination - cherry blossoms await',
    image: '/images/tokyo.jpg',
    visitDate: 'Spring 2025',
    memories: 'Planning to experience hanami season',
    blogPosts: [],
    highlights: ['Shibuya', 'Asakusa', 'Mount Fuji day trip'],
    mood: '🌸',
    season: 'spring',
    favoriteTime: 'cherry blossom season',
  },
];

// Enhanced routes with animation metadata
const routes = [
  { from: 'spain-home', to: 'barcelona', type: 'train', duration: '3h', mode: 'fast' },
  { from: 'spain-home', to: 'paris', type: 'plane', duration: '2h', mode: 'direct' },
  { from: 'paris', to: 'london', type: 'train', duration: '2.5h', mode: 'tunnel' },
  { from: 'spain-home', to: 'lisbon', type: 'car', duration: '6h', mode: 'scenic' },
];

interface EnhancedTravelMapProps {
  view: 'journey' | 'stories' | 'home';
  className?: string;
  onLocationSelect?: (location: typeof locations[0]) => void;
}

// Enhanced loading skeleton component
const MapSkeleton = () => (
  <div className="w-full h-[600px] bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl overflow-hidden relative">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <div className="h-8 w-32 bg-white/40 rounded animate-pulse"></div>
        <div className="h-8 w-8 bg-white/40 rounded-full animate-pulse"></div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-20 bg-white/30 rounded-lg animate-pulse" style={{ animationDelay: `${i * 100}ms` }}></div>
        ))}
      </div>
    </div>
    <div className="absolute bottom-4 right-4 flex items-center gap-2 text-blue-600">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <Navigation className="w-6 h-6" />
      </motion.div>
      <span className="text-sm font-medium">Loading adventure map...</span>
    </div>
  </div>
);

// Enhanced tooltip component with rich content
const RichTooltip = ({ location, onViewDetails }: { location: typeof locations[0], onViewDetails: () => void }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9, y: 10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.9, y: 10 }}
    className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden max-w-sm"
  >
    <div className="h-32 bg-gradient-to-br from-blue-400 to-indigo-500 relative">
      <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full text-xs font-medium">
        {location.mood}
      </div>
      <div className="absolute bottom-2 left-3 text-white">
        <h3 className="font-bold text-lg">{location.name}</h3>
        <p className="text-sm opacity-90">{location.visitDate}</p>
      </div>
    </div>
    
    <div className="p-4 space-y-3">
      <p className="text-gray-700 text-sm">{location.description}</p>
      
      <div className="flex items-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {location.season}
        </span>
        <span className="flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {location.type === 'home' ? 'Home' : location.type === 'upcoming' ? 'Planned' : 'Visited'}
        </span>
      </div>
      
      <div className="flex flex-wrap gap-1">
        {location.highlights.slice(0, 3).map((highlight, index) => (
          <span key={index} className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
            {highlight}
          </span>
        ))}
        {location.highlights.length > 3 && (
          <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-500">
            +{location.highlights.length - 3}
          </span>
        )}
      </div>
      
      <button
        onClick={onViewDetails}
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-indigo-600 transition-all flex items-center justify-center gap-2"
      >
        <Camera className="w-4 h-4" />
        View Adventure
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  </motion.div>
);

export default function EnhancedTravelMap({ view, className = '', onLocationSelect }: EnhancedTravelMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markersGroup = useRef<L.LayerGroup | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<typeof locations[0] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tooltipLocation, setTooltipLocation] = useState<typeof locations[0] | null>(null);

  // Memoize expensive calculations
  const filteredLocations = useMemo(() => {
    if (view === 'home') {
      return locations.filter(loc => loc.type === 'home' || loc.id === 'barcelona');
    }
    return locations;
  }, [view]);

  const mapConfig = useMemo(() => ({
    center: view === 'home' ? [40.4168, -3.7038] : [45, 10],
    zoom: view === 'home' ? 7 : 5,
  }), [view]);

  // Enhanced marker creation with better performance
  const createCustomIcon = useCallback((location: typeof locations[0]) => {
    const iconConfigs = {
      home: {
        html: `
          <div class="relative">
            <div class="absolute inset-0 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
            <div class="relative bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full p-3 shadow-lg border-2 border-white">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
            </div>
          </div>
        `,
        size: [44, 44],
        anchor: [22, 44],
      },
      visited: {
        html: `
          <div class="bg-gradient-to-br from-coral-400 to-red-500 rounded-full p-2.5 shadow-lg border-2 border-white hover:scale-110 transition-transform">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
            </svg>
          </div>
        `,
        size: [38, 38],
        anchor: [19, 38],
      },
      upcoming: {
        html: `
          <div class="bg-gradient-to-br from-teal-400 to-blue-500 rounded-full p-2.5 shadow-lg border-2 border-white opacity-80 hover:opacity-100 hover:scale-110 transition-all">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
            </svg>
          </div>
        `,
        size: [38, 38],
        anchor: [19, 38],
      },
    };

    const config = iconConfigs[location.type];
    return L.divIcon({
      html: config.html,
      className: 'custom-marker-enhanced',
      iconSize: config.size,
      iconAnchor: config.anchor,
    });
  }, []);

  // Initialize map with performance optimizations
  useEffect(() => {
    if (!mapContainer.current || mapInstance.current) return;

    const map = L.map(mapContainer.current, {
      center: mapConfig.center as [number, number],
      zoom: mapConfig.zoom,
      zoomControl: false,
      preferCanvas: true, // Better performance for many markers
      worldCopyJump: true,
    });

    // Enhanced custom zoom control
    L.control.zoom({
      position: 'bottomright'
    }).addTo(map);

    // High-quality tile layers with fallback
    const primaryTiles = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg', {
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>',
      maxZoom: 18,
    });

    const labelTiles = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}.png', {
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>',
      maxZoom: 18,
      opacity: 0.7,
    });

    primaryTiles.addTo(map);
    labelTiles.addTo(map);

    // Create markers group for better performance
    const group = L.layerGroup().addTo(map);
    markersGroup.current = group;

    mapInstance.current = map;
    setIsLoading(false);

    return () => {
      map.remove();
      mapInstance.current = null;
      markersGroup.current = null;
    };
  }, [mapConfig]);

  // Update markers when filtered locations change
  useEffect(() => {
    if (!mapInstance.current || !markersGroup.current) return;

    markersGroup.current.clearLayers();

    filteredLocations.forEach(location => {
      const icon = createCustomIcon(location);
      const marker = L.marker(location.coordinates, { icon })
        .addTo(markersGroup.current!);

      // Enhanced hover interactions
      marker.on('mouseover', () => {
        setTooltipLocation(location);
      });

      marker.on('mouseout', () => {
        setTooltipLocation(null);
      });

      marker.on('click', () => {
        setSelectedLocation(location);
        onLocationSelect?.(location);
      });
    });

    // Add routes for journey view with enhanced animations
    if (view === 'journey') {
      routes.forEach(route => {
        const fromLocation = filteredLocations.find(l => l.id === route.from);
        const toLocation = filteredLocations.find(l => l.id === route.to);
        
        if (fromLocation && toLocation) {
          const routeColors = {
            train: '#8B7355',
            plane: '#4ECDC4',
            car: '#FF6B6B',
          };

          const polyline = L.polyline(
            [fromLocation.coordinates, toLocation.coordinates],
            {
              color: routeColors[route.type as keyof typeof routeColors],
              weight: 3,
              opacity: 0.7,
              dashArray: route.type === 'plane' ? '5, 10' : route.type === 'train' ? '10, 5' : undefined,
              className: 'animated-route'
            }
          ).addTo(markersGroup.current!);

          // Add route type indicator
          const midpoint = L.latLng(
            (fromLocation.coordinates[0] + toLocation.coordinates[0]) / 2,
            (fromLocation.coordinates[1] + toLocation.coordinates[1]) / 2
          );

          const routeIcon = route.type === 'plane' ? '✈️' : route.type === 'train' ? '🚂' : '🚗';
          const routeMarker = L.divIcon({
            html: `<div class="bg-white rounded-full px-2 py-1 text-xs font-medium shadow-md">${routeIcon} ${route.duration}</div>`,
            className: 'route-indicator',
            iconSize: [60, 24],
            iconAnchor: [30, 12],
          });

          L.marker(midpoint, { icon: routeMarker }).addTo(markersGroup.current!);
        }
      });
    }
  }, [filteredLocations, view, createCustomIcon, onLocationSelect]);

  // Smooth view transitions
  useEffect(() => {
    if (!mapInstance.current) return;

    mapInstance.current.setView(mapConfig.center as [number, number], mapConfig.zoom, {
      animate: true,
      duration: 1,
    });
  }, [mapConfig]);

  if (isLoading) {
    return <MapSkeleton />;
  }

  return (
    <div className={`relative ${className}`}>
      <div ref={mapContainer} className="w-full h-[600px] rounded-2xl overflow-hidden shadow-xl" />
      
      {/* Enhanced tooltip */}
      <AnimatePresence>
        {tooltipLocation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-4 left-4 z-[1000] pointer-events-none"
          >
            <RichTooltip 
              location={tooltipLocation} 
              onViewDetails={() => {
                setSelectedLocation(tooltipLocation);
                setTooltipLocation(null);
              }} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced location detail modal */}
      <AnimatePresence>
        {selectedLocation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[1001] p-4"
            onClick={() => setSelectedLocation(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <button
                  onClick={() => setSelectedLocation(null)}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 z-10 hover:bg-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="h-72 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute bottom-4 left-6 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{selectedLocation.mood}</span>
                      <div>
                        <h2 className="text-3xl font-bold">{selectedLocation.name}</h2>
                        <p className="text-lg opacity-90">{selectedLocation.favoriteTime}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 max-h-96 overflow-y-auto">
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {selectedLocation.visitDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {selectedLocation.type === 'home' ? 'Home Base' : 
                       selectedLocation.type === 'upcoming' ? 'Upcoming Adventure' : 'Visited'}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {selectedLocation.description}
                  </p>
                  
                  <div className="bg-amber-50 rounded-xl p-4 mb-6">
                    <h3 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      Cherished Memories
                    </h3>
                    <p className="text-amber-800 leading-relaxed">
                      {selectedLocation.memories}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Must-See Highlights
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedLocation.highlights.map((highlight, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="px-3 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg text-sm text-gray-700 border border-blue-100"
                        >
                          {highlight}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}