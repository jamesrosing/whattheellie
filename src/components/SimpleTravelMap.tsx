'use client';

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, Heart, Navigation } from 'lucide-react';

// Fix for default markers in Next.js - must be done before any map initialization
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: '/images/marker-icon-2x.png',
    iconUrl: '/images/marker-icon.png',
    shadowUrl: '/images/marker-shadow.png',
  });
}

// Travel locations data
const locations = [
  {
    id: 'spain-home',
    name: 'Madrid, Spain',
    coordinates: [40.4168, -3.7038] as [number, number],
    type: 'home',
    description: 'My home base - where every adventure begins and ends',
    visitDate: 'Home Base',
    memories: 'Sunrise runs in Retiro Park, discovering hidden tapas bars in La Latina',
    highlights: ['Retiro Park', 'La Latina', 'Malasaña'],
  },
  {
    id: 'barcelona',
    name: 'Barcelona, Spain',
    coordinates: [41.3851, 2.1734] as [number, number],
    type: 'visited',
    description: 'Weekend escapes to the Mediterranean',
    visitDate: 'Multiple visits',
    memories: 'Sunrise at Bunkers del Carmel, getting lost in Gothic Quarter',
    highlights: ['Sagrada Familia', 'Park Güell', 'La Barceloneta'],
  },
  {
    id: 'paris',
    name: 'Paris, France',
    coordinates: [48.8566, 2.3522] as [number, number],
    type: 'visited',
    description: 'City of lights and unexpected adventures',
    visitDate: 'March 2024',
    memories: 'Picnic by the Seine, jazz in hidden Marais clubs',
    highlights: ['Montmartre', 'Latin Quarter', 'Musée Rodin'],
  },
  {
    id: 'lisbon',
    name: 'Lisbon, Portugal',
    coordinates: [38.7223, -9.1393] as [number, number],
    type: 'visited',
    description: 'Pastel de nata and fado nights',
    visitDate: 'May 2024',
    memories: 'Tram 28 adventures, sunset at Miradouro',
    highlights: ['Belém', 'Alfama', 'LX Factory'],
  },
];

interface TravelMapProps {
  view?: 'journey' | 'stories' | 'home';
}

export default function SimpleTravelMap({ view = 'journey' }: TravelMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<typeof locations[0] | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Ensure we're in the browser
    if (typeof window === 'undefined' || !mapContainer.current) return;
    
    // Prevent multiple initialization
    if (mapInstance.current) return;

    try {
      // Initialize the map
      const map = L.map(mapContainer.current, {
        center: [45, 0],
        zoom: 5,
        scrollWheelZoom: false,
      });

      // Add tile layer with watercolor style
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map);

      // Create custom icons
      const createIcon = (color: string) => {
        return L.divIcon({
          html: `
            <div class="relative">
              <div class="absolute inset-0 bg-${color}-500 rounded-full animate-ping opacity-75"></div>
              <div class="relative bg-${color}-600 rounded-full p-2 shadow-lg border-2 border-white">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                </svg>
              </div>
            </div>
          `,
          className: 'custom-div-icon',
          iconSize: [32, 32],
          iconAnchor: [16, 32],
        });
      };

      // Add markers for each location
      locations.forEach(location => {
        const iconColor = location.type === 'home' ? 'yellow' : 
                         location.type === 'visited' ? 'blue' : 'gray';
        
        const marker = L.marker(location.coordinates, {
          icon: createIcon(iconColor),
        }).addTo(map);

        // Create popup content
        marker.bindPopup(`
          <div class="p-2">
            <h3 class="font-bold text-lg mb-1">${location.name}</h3>
            <p class="text-sm text-gray-600 mb-2">${location.description}</p>
            <div class="flex items-center gap-2 text-xs text-gray-500">
              <span>${location.visitDate}</span>
            </div>
          </div>
        `);

        // Add click handler
        marker.on('click', () => {
          setSelectedLocation(location);
        });
      });

      // Store map instance
      mapInstance.current = map;
      setMapLoaded(true);

      // Adjust view based on prop
      if (view === 'home') {
        map.setView([40.4168, -3.7038], 7);
      } else if (view === 'journey') {
        map.setView([45, 0], 5);
      }

      // Invalidate size to ensure proper rendering
      setTimeout(() => {
        map.invalidateSize();
      }, 100);

    } catch (error) {
      console.error('Error initializing map:', error);
    }

    // Cleanup
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []); // Only run once on mount

  // Handle view changes
  useEffect(() => {
    if (!mapInstance.current || !mapLoaded) return;

    if (view === 'home') {
      mapInstance.current.setView([40.4168, -3.7038], 7, {
        animate: true,
        duration: 1
      });
    } else if (view === 'journey') {
      mapInstance.current.setView([45, 0], 5, {
        animate: true,
        duration: 1
      });
    } else if (view === 'stories') {
      mapInstance.current.setView([43, 2], 6, {
        animate: true,
        duration: 1
      });
    }
  }, [view, mapLoaded]);

  return (
    <>
      <div 
        ref={mapContainer} 
        className="w-full h-[600px] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-900"
        style={{ minHeight: '600px' }}
      />
      
      {/* Loading indicator */}
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-black/80 rounded-2xl">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Navigation className="w-8 h-8 text-primary" />
          </motion.div>
        </div>
      )}
      
      {/* Location Detail Modal */}
      <AnimatePresence>
        {selectedLocation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedLocation(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">{selectedLocation.name}</h2>
                    <p className="text-muted-foreground flex items-center gap-2 mt-1">
                      <Calendar className="w-4 h-4" />
                      {selectedLocation.visitDate}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedLocation(null)}
                    className="p-2 hover:bg-accent rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <p className="text-foreground mb-4">{selectedLocation.description}</p>
                
                <div className="bg-muted/50 dark:bg-muted/20 rounded-lg p-4 mb-4">
                  <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    Memories
                  </h3>
                  <p className="text-sm text-muted-foreground">{selectedLocation.memories}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    Highlights
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedLocation.highlights.map((highlight, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}