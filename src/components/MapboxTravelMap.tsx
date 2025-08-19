'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, MapPin, Calendar, Heart, Navigation, Camera, 
  Plane, Home, Mountain, Layers, Globe, Sun, Moon,
  ZoomIn, ZoomOut, Compass
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Set the Mapbox access token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

// Travel locations data with real coordinates
const locations = [
  {
    id: 'madrid',
    name: 'Madrid, Spain',
    coordinates: [-3.7038, 40.4168] as [number, number],
    type: 'home',
    description: 'My home base - where every adventure begins and ends',
    visitDate: 'Home Base',
    memories: 'Sunrise runs in Retiro Park, discovering hidden tapas bars in La Latina, Sunday afternoons at the Prado',
    highlights: ['Retiro Park', 'La Latina', 'Malasaña', 'Prado Museum'],
    photos: ['/images/madrid.jpg'],
  },
  {
    id: 'barcelona',
    name: 'Barcelona, Spain',
    coordinates: [2.1734, 41.3851] as [number, number],
    type: 'visited',
    description: 'Weekend escapes to the Mediterranean',
    visitDate: 'Multiple visits',
    memories: 'Sunrise at Bunkers del Carmel, getting lost in Gothic Quarter, beach days at Barceloneta',
    highlights: ['Sagrada Familia', 'Park Güell', 'La Barceloneta', 'Gothic Quarter'],
    photos: ['/images/barcelona.jpg'],
  },
  {
    id: 'paris',
    name: 'Paris, France',
    coordinates: [2.3522, 48.8566] as [number, number],
    type: 'visited',
    description: 'City of lights and unexpected adventures',
    visitDate: 'March 2024',
    memories: 'Picnic by the Seine, jazz in hidden Marais clubs, sunrise at Trocadéro',
    highlights: ['Montmartre', 'Latin Quarter', 'Musée Rodin', 'Le Marais'],
    photos: ['/images/paris.jpg'],
  },
  {
    id: 'lisbon',
    name: 'Lisbon, Portugal',
    coordinates: [-9.1393, 38.7223] as [number, number],
    type: 'visited',
    description: 'Pastel de nata and fado nights',
    visitDate: 'May 2024',
    memories: 'Tram 28 adventures, sunset at Miradouro da Senhora do Monte, getting lost in Alfama',
    highlights: ['Belém', 'Alfama', 'LX Factory', 'Sintra day trip'],
    photos: ['/images/lisbon.jpg'],
  },
  {
    id: 'london',
    name: 'London, UK',
    coordinates: [-0.1278, 51.5074] as [number, number],
    type: 'visited',
    description: 'Where I left the corporate world behind',
    visitDate: 'Former home',
    memories: 'The day I quit my job, last view from the office tower, first day of freedom',
    highlights: ['Camden Market', 'Shoreditch', 'Richmond Park', 'Thames walks'],
    photos: ['/images/london.jpg'],
  },
  {
    id: 'tokyo',
    name: 'Tokyo, Japan',
    coordinates: [139.6503, 35.6762] as [number, number],
    type: 'upcoming',
    description: 'Dream destination - cherry blossoms await',
    visitDate: 'Spring 2025',
    memories: 'Planning to experience hanami season, dreaming of ramen and temples',
    highlights: ['Shibuya', 'Asakusa', 'Mount Fuji', 'Cherry blossoms'],
    photos: ['/images/tokyo.jpg'],
  },
  {
    id: 'malaga',
    name: 'Málaga, Spain',
    coordinates: [-4.4214, 36.7213] as [number, number],
    type: 'visited',
    description: 'Sun, sea, and Southern Spanish charm',
    visitDate: 'Summer 2024',
    memories: 'Beach sunsets, exploring white villages, tapas by the sea',
    highlights: ['Alcazaba', 'Beaches', 'Picasso Museum', 'Caminito del Rey'],
    photos: ['/images/malaga.jpg'],
  },
];

// Map styles available
const mapStyles = [
  { id: 'satellite-streets-v12', name: 'Satellite', icon: Camera },
  { id: 'outdoors-v12', name: 'Terrain', icon: Mountain },
  { id: 'streets-v12', name: 'Streets', icon: MapPin },
  { id: 'dark-v11', name: 'Dark', icon: Moon },
  { id: 'light-v11', name: 'Light', icon: Sun },
];

interface MapboxTravelMapProps {
  view?: 'journey' | 'stories' | 'home';
}

export default function MapboxTravelMap({ view = 'journey' }: MapboxTravelMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<typeof locations[0] | null>(null);
  const [currentStyle, setCurrentStyle] = useState('satellite-streets-v12');
  const [is3D, setIs3D] = useState(true);
  const [mapLoaded, setMapLoaded] = useState(false);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Create the map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: `mapbox://styles/mapbox/${currentStyle}`,
      center: view === 'home' ? [-3.7038, 40.4168] : [10, 45],
      zoom: view === 'home' ? 8 : 4,
      pitch: is3D ? 45 : 0,
      bearing: 0,
      antialias: true,
    });

    const mapInstance = map.current;

    mapInstance.on('load', () => {
      // Add 3D terrain if enabled
      if (is3D) {
        mapInstance.addSource('mapbox-dem', {
          type: 'raster-dem',
          url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
          tileSize: 512,
          maxzoom: 14,
        });
        mapInstance.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });
      }

      // Add sky layer for better 3D effect
      mapInstance.addLayer({
        id: 'sky',
        type: 'sky',
        paint: {
          'sky-type': 'atmosphere',
          'sky-atmosphere-sun': [0.0, 90.0],
          'sky-atmosphere-sun-intensity': 15,
        },
      });

      // Add markers for each location
      locations.forEach((location) => {
        // Create custom marker element
        const el = document.createElement('div');
        el.className = 'custom-marker';
        
        // Style based on location type
        const colors: Record<string, string> = {
          home: 'bg-yellow-500 border-yellow-300',
          visited: 'bg-blue-500 border-blue-300',
          upcoming: 'bg-gray-400 border-gray-300',
        };
        
        const colorClass = colors[location.type] || colors.visited;

        el.innerHTML = `
          <div class="relative cursor-pointer transform hover:scale-110 transition-transform">
            <div class="absolute inset-0 ${colorClass} rounded-full animate-ping opacity-75"></div>
            <div class="relative ${colorClass} rounded-full p-2 shadow-lg border-2 border-white">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
              </svg>
            </div>
          </div>
        `;

        // Create marker
        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat(location.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 })
              .setHTML(`
                <div class="p-3 max-w-xs">
                  <h3 class="font-bold text-lg mb-1">${location.name}</h3>
                  <p class="text-sm text-gray-600 mb-2">${location.description}</p>
                  <div class="flex items-center gap-2 text-xs text-gray-500">
                    <span>${location.visitDate}</span>
                  </div>
                </div>
              `)
          )
          .addTo(mapInstance);

        // Add click event
        el.addEventListener('click', () => {
          setSelectedLocation(location);
        });

        markersRef.current.push(marker);
      });

      setMapLoaded(true);
    });

    // Add navigation controls
    mapInstance.addControl(new mapboxgl.NavigationControl(), 'top-right');
    mapInstance.addControl(new mapboxgl.ScaleControl(), 'bottom-right');
    mapInstance.addControl(new mapboxgl.FullscreenControl(), 'top-right');

    // Add geolocate control
    mapInstance.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      }),
      'top-right'
    );

    return () => {
      mapInstance.remove();
    };
  }, []);

  // Handle style changes
  const changeMapStyle = useCallback((styleId: string) => {
    if (!map.current) return;
    map.current.setStyle(`mapbox://styles/mapbox/${styleId}`);
    setCurrentStyle(styleId);
  }, []);

  // Toggle 3D terrain
  const toggle3D = useCallback(() => {
    if (!map.current) return;
    
    if (is3D) {
      map.current.setPitch(0);
      map.current.setTerrain(null);
    } else {
      map.current.setPitch(45);
      if (map.current.getSource('mapbox-dem')) {
        map.current.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });
      }
    }
    setIs3D(!is3D);
  }, [is3D]);

  // Fly to location
  const flyToLocation = useCallback((location: typeof locations[0]) => {
    if (!map.current) return;
    
    map.current.flyTo({
      center: location.coordinates,
      zoom: 12,
      pitch: is3D ? 60 : 0,
      bearing: 20,
      duration: 3000,
      essential: true,
    });
  }, [is3D]);

  // Handle view changes
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    if (view === 'home') {
      map.current.flyTo({
        center: [-3.7038, 40.4168],
        zoom: 8,
        pitch: is3D ? 45 : 0,
        duration: 2000,
      });
    } else if (view === 'journey') {
      map.current.flyTo({
        center: [10, 45],
        zoom: 4,
        pitch: is3D ? 45 : 0,
        duration: 2000,
      });
    } else if (view === 'stories') {
      map.current.flyTo({
        center: [2, 43],
        zoom: 5,
        pitch: is3D ? 30 : 0,
        duration: 2000,
      });
    }
  }, [view, mapLoaded, is3D]);

  return (
    <>
      {/* Map Container */}
      <div className="relative w-full h-[600px] rounded-2xl overflow-hidden shadow-2xl">
        <div ref={mapContainer} className="absolute inset-0" />
        
        {/* Map Controls Overlay */}
        <div className="absolute top-4 left-4 z-10 space-y-2">
          {/* Style Switcher */}
          <div className="bg-card/90 backdrop-blur-sm rounded-lg shadow-lg p-2">
            <div className="flex flex-col gap-1">
              {mapStyles.map((style) => {
                const Icon = style.icon;
                return (
                  <button
                    key={style.id}
                    onClick={() => changeMapStyle(style.id)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-md transition-colors text-sm",
                      currentStyle === style.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{style.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3D Toggle */}
          <button
            onClick={toggle3D}
            className={cn(
              "bg-card/90 backdrop-blur-sm rounded-lg shadow-lg px-4 py-2 flex items-center gap-2",
              "hover:bg-accent transition-colors",
              is3D && "bg-primary text-primary-foreground"
            )}
          >
            <Globe className="w-4 h-4" />
            <span className="text-sm">{is3D ? '3D On' : '3D Off'}</span>
          </button>
        </div>

        {/* Quick Travel */}
        <div className="absolute bottom-4 left-4 z-10">
          <div className="bg-card/90 backdrop-blur-sm rounded-lg shadow-lg p-2">
            <p className="text-xs font-medium mb-2 px-2">Quick Travel</p>
            <div className="flex flex-col gap-1 max-h-48 overflow-y-auto">
              {locations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => flyToLocation(location)}
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-sm text-left"
                >
                  <MapPin className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{location.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loading indicator */}
        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Navigation className="w-8 h-8 text-primary" />
            </motion.div>
          </div>
        )}
      </div>

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
                    <h2 className="text-h2 text-foreground">{selectedLocation.name}</h2>
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
                
                <div className="mb-4">
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

                <button
                  onClick={() => {
                    flyToLocation(selectedLocation);
                    setSelectedLocation(null);
                  }}
                  className="w-full bg-primary text-primary-foreground rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
                >
                  <Plane className="w-4 h-4" />
                  Fly to Location
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}