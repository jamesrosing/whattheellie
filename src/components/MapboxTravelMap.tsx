'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, MapPin, Calendar, Heart, Navigation, Camera, 
  Plane, Home, Mountain, Layers, Globe, Sun, Moon,
  Menu
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
  },
];

// Map styles available - Updated for Mapbox GL JS v3
const mapStyles = [
  { id: 'standard', name: 'Standard', icon: Globe },
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
  const [is3D, setIs3D] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [terrainEnabled, setTerrainEnabled] = useState(false);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const initializingRef = useRef(false); // Prevent double initialization

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current || initializingRef.current) return;
    
    initializingRef.current = true; // Mark as initializing

    const timer = setTimeout(() => {
      if (!mapContainer.current || map.current) return;

      try {
        console.log('🗺️ Creating Mapbox GL JS v3 map...');
        console.log('🗺️ Container element:', mapContainer.current);
        console.log('🗺️ Container dimensions:', {
          width: mapContainer.current.offsetWidth,
          height: mapContainer.current.offsetHeight,
        });
        console.log('🗺️ Using style:', `mapbox://styles/mapbox/${currentStyle}`);
        console.log('🗺️ Token:', mapboxgl.accessToken ? 'Set' : 'Not set');
        
        // Enhanced v3 initialization with optimizations
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: `mapbox://styles/mapbox/${currentStyle}`, // Use correct style format
          center: [-3.7038, 40.4168], // Madrid
          zoom: view === 'home' ? 8 : 6,
          pitch: 0, // Start flat for better initial load
          bearing: 0,
          antialias: true,
          maxPitch: 85, // v3 default increased to 85°
        });

        const mapInstance = map.current;

        // Enhanced v3 error handling
        mapInstance.on('error', (e: any) => {
          console.error('🗺️ Mapbox v3 error:', e.error);
          if (e.error?.message?.includes('token')) {
            console.error('🗺️ Token error - check NEXT_PUBLIC_MAPBOX_TOKEN');
          }
        });

        mapInstance.on('styleerror', (e: any) => {
          console.error('🗺️ Mapbox v3 style error:', e.error);
        });

        mapInstance.on('webglcontextlost', () => {
          console.warn('🗺️ WebGL context lost - attempting recovery');
        });

        mapInstance.on('load', () => {
          console.log('🗺️ Mapbox v3 map loaded successfully!');
          
          // Add v3 enhanced 3D terrain if enabled
          if (terrainEnabled) {
            console.log('🗺️ Adding v3 enhanced terrain...');
            try {
              mapInstance.addSource('mapbox-dem', {
                type: 'raster-dem',
                url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
                tileSize: 512,
                maxzoom: 14
              });
              
              mapInstance.setTerrain({ 
                source: 'mapbox-dem', 
                exaggeration: 1.5 
              });

              // v3 enhanced sky layer with better atmosphere
              mapInstance.addLayer({
                id: 'sky',
                type: 'sky',
                paint: {
                  'sky-type': 'atmosphere',
                  'sky-atmosphere-sun': [0.0, 90.0],
                  'sky-atmosphere-sun-intensity': 15,
                  'sky-gradient-center': [0, 0],
                  'sky-gradient-radius': 90,
                }
              }, 'bottom'); // Use v3 slot system
            } catch (error) {
              console.warn('🗺️ Terrain not available for this style:', error);
            }
          }

          // Enhanced markers with v3 optimizations
          locations.forEach((location) => {
            const colors = {
              home: '#EAB308',
              visited: '#3B82F6', 
              upcoming: '#6B7280',
            };

            const marker = new mapboxgl.Marker({ 
              color: colors[location.type as keyof typeof colors] || colors.visited,
              scale: 1.1,
            })
              .setLngLat(location.coordinates)
              .setPopup(
                new mapboxgl.Popup({ 
                  offset: 25,
                  closeButton: true,
                  closeOnClick: false,
                  maxWidth: '300px'
                })
                  .setHTML(`
                    <div class="p-3">
                      <h3 class="font-bold text-lg mb-2">${location.name}</h3>
                      <p class="text-sm text-gray-600 mb-2">${location.description}</p>
                      <div class="flex items-center gap-2 text-xs text-gray-500">
                        <span>📅 ${location.visitDate}</span>
                      </div>
                    </div>
                  `)
              )
              .addTo(mapInstance);

            // Store marker reference
            markersRef.current.push(marker);
          });

          setMapLoaded(true);
        });

        // Add basic controls
        mapInstance.addControl(new mapboxgl.NavigationControl(), 'top-right');

      } catch (error) {
        console.error('🗺️ Error creating map:', error);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (map.current) {
        map.current.remove();
        map.current = null;
        setMapLoaded(false);
      }
      initializingRef.current = false; // Reset initialization flag
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle style changes - Updated for v3
  const changeMapStyle = useCallback((styleId: string) => {
    if (!map.current) return;
    console.log('🗺️ Changing to style:', styleId);
    map.current.setStyle(`mapbox://styles/mapbox/${styleId}`);
    setCurrentStyle(styleId);
  }, []);

  // Toggle 3D view - Enhanced for v3
  const toggle3D = useCallback(() => {
    if (!map.current) return;
    
    const newPitch = is3D ? 0 : 60; // Use higher pitch for better 3D effect
    map.current.easeTo({
      pitch: newPitch,
      duration: 1000
    });
    setIs3D(!is3D);
  }, [is3D]);

  // Toggle v3 terrain
  const toggleTerrain = useCallback(() => {
    if (!map.current) return;
    
    if (terrainEnabled) {
      console.log('🗺️ Disabling v3 terrain...');
      map.current.setTerrain(null);
      if (map.current.getLayer('sky')) {
        map.current.removeLayer('sky');
      }
      if (map.current.getSource('mapbox-dem')) {
        map.current.removeSource('mapbox-dem');
      }
    } else {
      console.log('🗺️ Enabling v3 terrain...');
      try {
        if (!map.current.getSource('mapbox-dem')) {
          map.current.addSource('mapbox-dem', {
            type: 'raster-dem',
            url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
            tileSize: 512,
            maxzoom: 14
          });
        }
        
        map.current.setTerrain({ 
          source: 'mapbox-dem', 
          exaggeration: 1.5 
        });

        if (!map.current.getLayer('sky')) {
          map.current.addLayer({
            id: 'sky',
            type: 'sky',
            paint: {
              'sky-type': 'atmosphere',
              'sky-atmosphere-sun': [0.0, 90.0],
              'sky-atmosphere-sun-intensity': 15,
              'sky-gradient-center': [0, 0],
              'sky-gradient-radius': 90,
            }
          });
        }
      } catch (error) {
        console.warn('🗺️ Could not enable terrain:', error);
        return;
      }
    }
    setTerrainEnabled(!terrainEnabled);
  }, [terrainEnabled]);

  // Fly to location
  const flyToLocation = useCallback((location: typeof locations[0]) => {
    if (!map.current) return;
    
    map.current.flyTo({
      center: location.coordinates,
      zoom: 12,
      pitch: is3D ? 60 : 0,
      bearing: 20,
      duration: 3000,
    });
    setShowControls(false);
  }, [is3D]);

  return (
    <>
      {/* Map Container */}
      <div className="relative w-full h-[400px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
        <div 
          ref={mapContainer} 
          id="mapbox-container"
          className="absolute inset-0"
          style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        />
        
        {/* Mobile Controls Toggle */}
        <button
          onClick={() => setShowControls(!showControls)}
          className="md:hidden absolute top-4 left-4 z-20 bg-card/90 backdrop-blur-sm p-3 rounded-lg shadow-lg"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Desktop Style Controls - Enhanced for v3 */}
        <div className="hidden md:block absolute top-4 left-4 z-10">
          <div className="bg-card/90 backdrop-blur-sm rounded-lg shadow-lg p-2">
            <div className="flex flex-col gap-1">
              {mapStyles.slice(0, 4).map((style) => {
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
        </div>

        {/* Mobile Controls Overlay */}
        <AnimatePresence>
          {showControls && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="md:hidden absolute inset-0 bg-black/50 z-30"
                onClick={() => setShowControls(false)}
              />
              {/* Sidebar */}
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                className={cn(
                  "absolute top-0 left-0 bottom-0 z-40 bg-card/95 backdrop-blur-sm",
                  "w-72 overflow-y-auto shadow-2xl md:hidden"
                )}
              >
              {/* Mobile header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="font-semibold">Map Controls</h3>
                <button onClick={() => setShowControls(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 space-y-4">
                {/* Style Controls */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Map Style</h4>
                  {mapStyles.map((style) => {
                    const Icon = style.icon;
                    return (
                      <button
                        key={style.id}
                        onClick={() => changeMapStyle(style.id)}
                        className={cn(
                          "w-full flex items-center gap-2 px-3 py-2 rounded-md transition-colors text-sm",
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

                {/* 3D Toggle */}
                <button
                  onClick={toggle3D}
                  className={cn(
                    "w-full bg-card/90 backdrop-blur-sm rounded-lg shadow-lg px-4 py-2 flex items-center gap-2",
                    "hover:bg-accent transition-colors",
                    is3D && "bg-primary text-primary-foreground"
                  )}
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">{is3D ? '3D On' : '3D Off'}</span>
                </button>

                {/* v3 Terrain Toggle */}
                <button
                  onClick={toggleTerrain}
                  className={cn(
                    "w-full bg-card/90 backdrop-blur-sm rounded-lg shadow-lg px-4 py-2 flex items-center gap-2",
                    "hover:bg-accent transition-colors",
                    terrainEnabled && "bg-primary text-primary-foreground"
                  )}
                >
                  <Mountain className="w-4 h-4" />
                  <span className="text-sm">{terrainEnabled ? 'Terrain On' : 'Terrain Off'}</span>
                </button>

                {/* Quick Travel */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Quick Travel</h4>
                  <div className="space-y-1">
                    {locations.map((location) => (
                      <button
                        key={location.id}
                        onClick={() => flyToLocation(location)}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-sm text-left"
                      >
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{location.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
            </>
          )}
        </AnimatePresence>

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