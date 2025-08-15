'use client';

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, MapPin, Calendar, Heart, ArrowRight } from 'lucide-react';

// Fix for default markers in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/images/marker-icon-2x.png',
  iconUrl: '/images/marker-icon.png',
  shadowUrl: '/images/marker-shadow.png',
});

// Travel locations data
const locations = [
  {
    id: 'spain-home',
    name: 'Madrid, Spain',
    coordinates: [40.4168, -3.7038] as [number, number],
    type: 'home',
    description: 'My home base - where every adventure begins and ends',
    image: '/images/madrid.jpg',
    visitDate: 'Home Base',
    memories: 'Favorite cafés, morning runs in Retiro Park, tapas nights with friends',
    blogPosts: [],
    highlights: ['Retiro Park', 'Malasaña District', 'Mercado San Miguel'],
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
  },
];

// Travel routes (connections between locations)
const routes = [
  { from: 'spain-home', to: 'barcelona', type: 'train' },
  { from: 'spain-home', to: 'paris', type: 'plane' },
  { from: 'paris', to: 'london', type: 'train' },
  { from: 'spain-home', to: 'lisbon', type: 'car' },
];

interface TravelMapProps {
  view: 'journey' | 'stories' | 'home';
}

export default function TravelMap({ view }: TravelMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<typeof locations[0] | null>(null);

  useEffect(() => {
    if (!mapContainer.current || mapInstance.current) return;

    // Initialize map centered on Spain
    const map = L.map(mapContainer.current, {
      center: [40.4168, -3.7038],
      zoom: view === 'home' ? 7 : 5,
      zoomControl: false,
    });

    // Add custom zoom control
    L.control.zoom({
      position: 'bottomright'
    }).addTo(map);

    // Add watercolor-style tiles for artistic effect
    L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg', {
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>',
      maxZoom: 18,
    }).addTo(map);

    // Add labels overlay
    L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}.png', {
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>',
      maxZoom: 18,
      opacity: 0.7,
    }).addTo(map);

    // Create custom icons
    const homeIcon = L.divIcon({
      html: `
        <div class="relative">
          <div class="absolute inset-0 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
          <div class="relative bg-yellow-500 rounded-full p-2 shadow-lg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
          </div>
        </div>
      `,
      className: 'custom-home-marker',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const visitedIcon = L.divIcon({
      html: `
        <div class="bg-coral-500 rounded-full p-2 shadow-lg border-2 border-white">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
          </svg>
        </div>
      `,
      className: 'custom-visited-marker',
      iconSize: [36, 36],
      iconAnchor: [18, 36],
    });

    const upcomingIcon = L.divIcon({
      html: `
        <div class="bg-teal-500 rounded-full p-2 shadow-lg border-2 border-white opacity-70">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
          </svg>
        </div>
      `,
      className: 'custom-upcoming-marker',
      iconSize: [36, 36],
      iconAnchor: [18, 36],
    });

    // Add markers for each location
    locations.forEach(location => {
      let icon;
      if (location.type === 'home') {
        icon = homeIcon;
      } else if (location.type === 'upcoming') {
        icon = upcomingIcon;
      } else {
        icon = visitedIcon;
      }

      const marker = L.marker(location.coordinates, { icon })
        .addTo(map)
        .bindPopup(`
          <div class="p-2">
            <h3 class="font-bold text-lg">${location.name}</h3>
            <p class="text-sm text-gray-600">${location.description}</p>
            <button 
              onclick="window.postMessage({ type: 'SELECT_LOCATION', id: '${location.id}' }, '*')"
              class="mt-2 text-blue-500 hover:text-blue-700 text-sm font-medium"
            >
              View Details →
            </button>
          </div>
        `, {
          maxWidth: 300,
          className: 'custom-popup'
        });

      // Add hover effect
      marker.on('mouseover', function(this: L.Marker) {
        this.openPopup();
      });
    });

    // Draw routes between locations
    if (view === 'journey') {
      routes.forEach(route => {
        const fromLocation = locations.find(l => l.id === route.from);
        const toLocation = locations.find(l => l.id === route.to);
        
        if (fromLocation && toLocation) {
          const polyline = L.polyline(
            [fromLocation.coordinates, toLocation.coordinates],
            {
              color: '#8B7355',
              weight: 2,
              opacity: 0.6,
              dashArray: '10, 10',
              className: 'animated-route'
            }
          ).addTo(map);
        }
      });
    }

    // Handle location selection messages
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'SELECT_LOCATION') {
        const location = locations.find(l => l.id === event.data.id);
        if (location) {
          setSelectedLocation(location);
        }
      }
    };

    window.addEventListener('message', handleMessage);

    mapInstance.current = map;

    return () => {
      window.removeEventListener('message', handleMessage);
      map.remove();
      mapInstance.current = null;
    };
  }, [view]);

  // Handle view changes
  useEffect(() => {
    if (!mapInstance.current) return;

    if (view === 'home') {
      // Focus on Spain
      mapInstance.current.setView([40.4168, -3.7038], 7, {
        animate: true,
        duration: 1
      });
    } else if (view === 'journey') {
      // Show broader view
      mapInstance.current.setView([45, 10], 5, {
        animate: true,
        duration: 1
      });
    }
  }, [view]);

  return (
    <>
      <div ref={mapContainer} className="w-full h-[600px] relative" />
      
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
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <button
                  onClick={() => setSelectedLocation(null)}
                  className="absolute top-4 right-4 bg-white/90 rounded-full p-2 z-10"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="h-64 bg-gradient-to-b from-blue-300 to-blue-500 rounded-t-2xl" />
                
                <div className="p-6">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {selectedLocation.name}
                  </h2>
                  
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
                  
                  <p className="text-gray-700 mb-4">
                    {selectedLocation.description}
                  </p>
                  
                  <div className="bg-amber-50 rounded-lg p-4 mb-4">
                    <h3 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      Memories
                    </h3>
                    <p className="text-amber-800">
                      {selectedLocation.memories}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Highlights
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedLocation.highlights.map((highlight, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
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