/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState } from 'react';
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Clock, Users, Mountain, Utensils, Music, 
  Calendar, Heart, Info, ChevronRight, Book, Compass,
  Sun, Wine, Castle, Church, Train, Camera
} from 'lucide-react';
import Image from 'next/image';

// Navigation sections
const sections = [
  { id: 'history', label: 'History', icon: Clock },
  { id: 'geography', label: 'Geography', icon: Mountain },
  { id: 'people', label: 'People & Culture', icon: Users },
  { id: 'cuisine', label: 'Cuisine', icon: Utensils },
  { id: 'destinations', label: 'Must-Visit', icon: MapPin },
  { id: 'hidden', label: 'Hidden Gems', icon: Compass },
  { id: 'festivals', label: 'Festivals', icon: Calendar },
  { id: 'practical', label: 'Travel Tips', icon: Info },
];

export default function SpainGuidePage() {
  const [activeSection, setActiveSection] = useState('history');
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  const toggleCard = (cardId: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(cardId)) {
      newExpanded.delete(cardId);
    } else {
      newExpanded.add(cardId);
    }
    setExpandedCards(newExpanded);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-5">
        <Header />
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative h-[400px] rounded-3xl overflow-hidden mb-8"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-yellow-500 opacity-90" />
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-display font-medium mb-4">España</h1>
              <p className="text-xl md:text-2xl font-cerebri font-light mb-2">The Complete Guide</p>
              <p className="text-lg opacity-90">History • Culture • Adventures • Secrets</p>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-8 sticky top-0 z-40">
          <div className="flex overflow-x-auto gap-2 pb-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                    activeSection === section.id
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {section.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Sections */}
        <AnimatePresence mode="wait">
          {activeSection === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-display font-medium text-gray-900 mb-6 flex items-center gap-3">
                  <Clock className="w-8 h-8 text-red-600" />
                  5,000 Years of Spanish History
                </h2>
                
                {/* Timeline */}
                <div className="space-y-6">
                  <TimelineItem
                    era="Prehistoric Iberia (3000 BCE - 218 BCE)"
                    title="The Ancient Foundations"
                    description="From the cave paintings of Altamira to the mysterious Iberians and Celts, early Spain was a crossroads of ancient civilizations. The Phoenicians founded Cádiz (1100 BCE), Europe's oldest continuously inhabited city."
                    highlights={[
                      "Altamira Cave: 'Sistine Chapel of Paleolithic Art'",
                      "Tartessos: Legendary wealthy kingdom mentioned by Greeks",
                      "Celtic Castros: Fortified hilltop settlements in Galicia"
                    ]}
                    expanded={expandedCards.has('prehistoric')}
                    onToggle={() => toggleCard('prehistoric')}
                  />
                  
                  <TimelineItem
                    era="Roman Hispania (218 BCE - 409 CE)"
                    title="The Roman Golden Age"
                    description="Rome transformed Hispania into one of the empire's wealthiest provinces. Emperors Trajan and Hadrian were born here. The Romans left an indelible mark: language, law, architecture."
                    highlights={[
                      "Segovia Aqueduct: 2,000-year-old engineering marvel",
                      "Mérida: Complete Roman city with theater, amphitheater, circus",
                      "Via Augusta: 1,500km Roman road still partly in use"
                    ]}
                    expanded={expandedCards.has('roman')}
                    onToggle={() => toggleCard('roman')}
                    details="The Romans didn't just conquer Hispania; they transformed it into the empire's cultural heartland. Seneca the philosopher, Martial the poet, and Emperors Trajan, Hadrian, and Theodosius were all Hispanic Romans. The province produced gold, silver, olive oil, and garum (fermented fish sauce) for the empire. Latin evolved into the various Romance languages of the peninsula. Roman law became the foundation of Spanish legal tradition."
                  />
                  
                  <TimelineItem
                    era="Al-Andalus (711 - 1492)"
                    title="The Islamic Golden Age"
                    description="For nearly 800 years, Islamic civilization flourished in Iberia. Al-Andalus became Europe's most sophisticated society: a beacon of science, poetry, and religious tolerance."
                    highlights={[
                      "Córdoba: Largest city in Europe (10th century), 400,000 inhabitants",
                      "Alhambra: Last flowering of Islamic architecture in Europe",
                      "School of Translators: Preserved Greek & Roman knowledge for Europe"
                    ]}
                    expanded={expandedCards.has('islamic')}
                    onToggle={() => toggleCard('islamic')}
                    details="The Umayyad Caliphate of Córdoba rivaled Baghdad and Constantinople. The Great Mosque of Córdoba, with its forest of horseshoe arches, remains one of Islam's architectural treasures. Scholars like Averroes and Maimonides worked here. Agricultural innovations included irrigation systems still used today, plus oranges, lemons, rice, cotton, and sugarcane. The Arabic influence persists in 4,000+ Spanish words (almohada, aceite, azúcar) and in the 'ole' of flamenco (from 'Allah')."
                  />
                  
                  <TimelineItem
                    era="The Reconquista (722 - 1492)"
                    title="The Christian Reconquest"
                    description="A 770-year struggle that shaped Spanish identity. Small Christian kingdoms in the north gradually reconquered the peninsula, creating the legendary figures of El Cid and the Catholic Monarchs."
                    highlights={[
                      "Santiago de Compostela: Pilgrimage route uniting Christian Europe",
                      "El Cid: Historical warrior became national legend",
                      "1492: Granada falls, Columbus sails, Jews expelled"
                    ]}
                    expanded={expandedCards.has('reconquista')}
                    onToggle={() => toggleCard('reconquista')}
                    details="The Reconquista wasn't a continuous war but centuries of shifting alliances, where Christian and Muslim rulers often fought alongside each other. The Camino de Santiago became Europe's most important pilgrimage. Military orders like Santiago and Calatrava became powerful forces. The year 1492 marked three world-changing events: Granada's fall ended Islamic rule, Columbus 'discovered' America, and the Alhambra Decree expelled Jews, ending centuries of convivencia (coexistence)."
                  />
                  
                  <TimelineItem
                    era="Spanish Empire (1492 - 1898)"
                    title="When Spain Ruled the World"
                    description="The first global empire on which 'the sun never set.' Spanish conquistadors, missionaries, and settlers spread Spanish language and culture across four continents."
                    highlights={[
                      "1519-1521: Cortés conquers Aztec Empire",
                      "1565: Manila Galleon trade links Asia-Americas",
                      "Spanish dollar: World's first global currency"
                    ]}
                    expanded={expandedCards.has('empire')}
                    onToggle={() => toggleCard('empire')}
                    details="At its peak under Philip II, Spain controlled territories from the Philippines to the Netherlands, from California to Tierra del Fuego. The flow of American silver through Seville made it Europe's richest city. The Spanish tercios dominated European battlefields for 150 years. This era produced the Siglo de Oro (Golden Age) of arts: Cervantes wrote Don Quixote, Velázquez painted Las Meninas, and Spanish became a global language. The empire's legacy: 500 million Spanish speakers today."
                  />
                  
                  <TimelineItem
                    era="Modern Spain (1898 - Present)"
                    title="From Disaster to Democracy"
                    description="The loss of Cuba, civil war, dictatorship, and triumphant return to democracy. Modern Spain emerged from isolation to become a vibrant European democracy."
                    highlights={[
                      "1936-39: Civil War tears nation apart",
                      "1975: Franco dies, democracy begins",
                      "1986: Joins EU, modernization accelerates"
                    ]}
                    expanded={expandedCards.has('modern')}
                    onToggle={() => toggleCard('modern')}
                    details="The 1898 'Disaster' (loss of last colonies) triggered soul-searching and the Generation of '98 writers. The Second Republic (1931-39) brought progressive reforms but ended in devastating civil war. Franco's dictatorship (1939-75) isolated Spain until the 1960s tourism boom. The peaceful transition to democracy after Franco's death became a model for other nations. Today's Spain balances strong regional identities (Catalonia, Basque Country) within a democratic framework. It's the EU's fourth-largest economy and world's second-most visited country."
                  />
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
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-display font-medium text-gray-900 mb-6 flex items-center gap-3">
                  <Mountain className="w-8 h-8 text-red-600" />
                  The Lay of the Land
                </h2>

                <div className="prose prose-lg max-w-none text-gray-700 mb-8">
                  <p>
                    Spain is Europe's most geographically diverse country, occupying 85% of the Iberian Peninsula. 
                    At 505,990 km², it's Western Europe's second-largest country, with landscapes ranging from 
                    snow-capped peaks to sun-baked deserts, from verdant Atlantic coasts to Mediterranean paradise.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <RegionCard
                    title="The Meseta Central"
                    icon={Mountain}
                    description="The vast central plateau (average 600m elevation) covers 40% of Spain. Hot, dry summers and cold winters define this continental heart."
                    details={[
                      "Madrid: Europe's highest capital (667m)",
                      "La Mancha: Don Quixote's windmill country",
                      "Extremadura: Cork oak forests and conquistador birthplace"
                    ]}
                  />
                  
                  <RegionCard
                    title="Green Spain (España Verde)"
                    icon={Sun}
                    description="The Atlantic north from Galicia to the Basque Country. Lush, rainy, Celtic-influenced, with Europe's best seafood."
                    details={[
                      "Galician Rías: Fjord-like estuaries with mussel farms",
                      "Picos de Europa: Dramatic limestone peaks",
                      "Basque Country: Unique culture and language"
                    ]}
                  />
                  
                  <RegionCard
                    title="Mediterranean Coast"
                    icon={Sun}
                    description="2,000km of legendary coastline from Costa Brava to Costa del Sol. Mild winters, hot summers, 300+ days of sunshine."
                    details={[
                      "Costa Brava: Wild cliffs and hidden coves",
                      "Valencia: Fertile huerta and paella birthplace",
                      "Costa del Sol: Europe's California"
                    ]}
                  />
                  
                  <RegionCard
                    title="The Pyrenees"
                    icon={Mountain}
                    description="Natural border with France, stretching 430km from Atlantic to Mediterranean. Peaks over 3,000m, glacial valleys, Romanesque churches."
                    details={[
                      "Ordesa Valley: Spain's Grand Canyon",
                      "Val d'Aran: Catalan valley with its own language",
                      "Camino Aragonés: Lesser-known pilgrim route"
                    ]}
                  />
                  
                  <RegionCard
                    title="Andalucía"
                    icon={Sun}
                    description="Spain's deep south: flamenco homeland, Moorish heritage, whitewashed villages, olive groves stretching to the horizon."
                    details={[
                      "Sierra Nevada: Skiing 40km from the beach",
                      "Doñana: Europe's most important wetland",
                      "Cabo de Gata: Europe's only desert"
                    ]}
                  />
                  
                  <RegionCard
                    title="The Islands"
                    icon={Compass}
                    description="Two archipelagos with distinct personalities: party-loving Balearics in the Mediterranean, volcanic Canaries in the Atlantic."
                    details={[
                      "Mallorca: Beyond the resorts, mountain villages and turquoise calas",
                      "Tenerife: Spain's highest peak, El Teide (3,715m)",
                      "La Palma: 'La Isla Bonita', stargazing paradise"
                    ]}
                  />
                </div>

                <div className="mt-8 p-6 bg-amber-50 rounded-xl">
                  <h3 className="text-xl font-bold text-amber-900 mb-3">Climate Zones</h3>
                  <div className="space-y-2 text-amber-800">
                    <p>• <strong>Oceanic:</strong> North coast - mild, rainy, green year-round (15-20°C summer)</p>
                    <p>• <strong>Mediterranean:</strong> East/south coasts - hot dry summers, mild winters (25-30°C summer)</p>
                    <p>• <strong>Continental:</strong> Central plateau - extreme temperatures (-10°C to 40°C)</p>
                    <p>• <strong>Mountain:</strong> Pyrenees/Sierra Nevada - alpine conditions, snow 6 months</p>
                    <p>• <strong>Subtropical:</strong> Canary Islands - eternal spring (18-24°C year-round)</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'people' && (
            <motion.div
              key="people"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-display font-medium text-gray-900 mb-6 flex items-center gap-3">
                  <Users className="w-8 h-8 text-red-600" />
                  The Spanish People & Culture
                </h2>

                <div className="prose prose-lg max-w-none text-gray-700 mb-8">
                  <p>
                    Spain's 47 million inhabitants aren't a monolithic group but a vibrant tapestry of regional 
                    identities, languages, and traditions. Understanding Spain means understanding that a Galician 
                    fisherman, Andalusian olive farmer, and Catalan tech entrepreneur might feel as different from 
                    each other as a Scot from a Sicilian.
                  </p>
                </div>

                <div className="space-y-6">
                  <CultureSection
                    title="Languages & Identity"
                    icon={Book}
                    content={
                      <div className="space-y-4">
                        <p className="text-gray-700">
                          While Castilian Spanish is the official national language, Spain recognizes four co-official 
                          regional languages, each representing distinct cultural identities:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <h4 className="font-semibold text-red-700">Catalan/Valencian</h4>
                            <p className="text-sm text-gray-600">10 million speakers in Catalonia, Valencia, Balearics. Closer to French than Spanish.</p>
                          </div>
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <h4 className="font-semibold text-red-700">Galician</h4>
                            <p className="text-sm text-gray-600">2.4 million speakers. Related to Portuguese, Celtic influence in culture.</p>
                          </div>
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <h4 className="font-semibold text-red-700">Basque (Euskera)</h4>
                            <p className="text-sm text-gray-600">750,000 speakers. Europe's oldest language, predating Indo-European languages.</p>
                          </div>
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <h4 className="font-semibold text-red-700">Aranese</h4>
                            <p className="text-sm text-gray-600">5,000 speakers in Val d'Aran. Variety of Occitan from southern France.</p>
                          </div>
                        </div>
                      </div>
                    }
                  />

                  <CultureSection
                    title="Social Life & Customs"
                    icon={Heart}
                    content={
                      <div className="space-y-4">
                        <div className="p-4 bg-rose-50 rounded-lg">
                          <h4 className="font-semibold text-rose-900 mb-2">The Spanish Schedule</h4>
                          <p className="text-rose-800 text-sm mb-2">
                            Spain operates on its own clock, 2-3 hours later than northern Europe:
                          </p>
                          <ul className="text-sm text-rose-700 space-y-1">
                            <li>• Breakfast: 8-10am (coffee and toast)</li>
                            <li>• Lunch: 2-4pm (main meal, often 3 courses)</li>
                            <li>• Siesta: 2-5pm (shops close, especially in summer)</li>
                            <li>• Merienda: 5-6pm (afternoon snack for kids)</li>
                            <li>• Dinner: 9-11pm (lighter than lunch)</li>
                            <li>• Nightlife: Starts at midnight, clubs fill at 2am</li>
                          </ul>
                        </div>
                        
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <h4 className="font-semibold text-blue-900 mb-2">Family & Social Values</h4>
                          <ul className="text-sm text-blue-800 space-y-1">
                            <li>• Family is paramount - Sunday lunches are sacred</li>
                            <li>• Children stay up late, included in social life</li>
                            <li>• Physical contact normal - cheek kisses, touching while talking</li>
                            <li>• Loud, animated conversation is engagement, not aggression</li>
                            <li>• Work to live, not live to work mentality</li>
                          </ul>
                        </div>
                      </div>
                    }
                  />

                  <CultureSection
                    title="Flamenco: The Soul of Spain"
                    icon={Music}
                    content={
                      <div className="space-y-4">
                        <p className="text-gray-700">
                          Born in Andalucía from the fusion of Romani, Moorish, Jewish, and Andalusian cultures, 
                          flamenco is Spain's most visceral art form. UNESCO recognized it as Intangible Cultural Heritage.
                        </p>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="text-center p-4 bg-orange-50 rounded-lg">
                            <h5 className="font-semibold text-orange-900">Cante (Song)</h5>
                            <p className="text-sm text-orange-700">Deep, emotional singing from the soul</p>
                          </div>
                          <div className="text-center p-4 bg-orange-50 rounded-lg">
                            <h5 className="font-semibold text-orange-900">Baile (Dance)</h5>
                            <p className="text-sm text-orange-700">Passionate, percussive footwork and arm movements</p>
                          </div>
                          <div className="text-center p-4 bg-orange-50 rounded-lg">
                            <h5 className="font-semibold text-orange-900">Toque (Guitar)</h5>
                            <p className="text-sm text-orange-700">Complex rhythms and techniques unique to flamenco</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 italic">
                          Best experienced in Seville's Triana, Granada's Sacromonte caves, or Jerez's tabancos.
                        </p>
                      </div>
                    }
                  />
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'cuisine' && (
            <motion.div
              key="cuisine"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-display font-medium text-gray-900 mb-6 flex items-center gap-3">
                  <Utensils className="w-8 h-8 text-red-600" />
                  Spanish Cuisine: A Regional Feast
                </h2>

                <div className="prose prose-lg max-w-none text-gray-700 mb-8">
                  <p>
                    Spanish cuisine is not one but many - each region fiercely proud of its specialties. From 
                    Michelin-starred molecular gastronomy to humble tapas bars unchanged for centuries, Spain 
                    offers one of the world's richest culinary landscapes.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <CuisineCard
                    region="Basque Country"
                    specialty="Pintxos & Michelin Stars"
                    description="World's highest concentration of Michelin stars. San Sebastián's pintxos bars are culinary laboratories."
                    dishes={[
                      "Bacalao al pil-pil: Cod in emulsified olive oil",
                      "Txangurro: Spider crab in its shell",
                      "Idiazábal: Smoked sheep cheese",
                      "Txakoli: Slightly sparkling white wine"
                    ]}
                    icon={Wine}
                  />
                  
                  <CuisineCard
                    region="Galicia"
                    specialty="Seafood Paradise"
                    description="Atlantic bounty: percebes (gooseneck barnacles), pulpo (octopus), and the world's best mussels."
                    dishes={[
                      "Pulpo a la gallega: Octopus with paprika",
                      "Empanada gallega: Savory pie with tuna or meat",
                      "Lacón con grelos: Pork shoulder with turnip greens",
                      "Albariño: Crisp white wine from Rías Baixas"
                    ]}
                    icon={Wine}
                  />
                  
                  <CuisineCard
                    region="Catalonia"
                    specialty="Mar i Muntanya"
                    description="'Sea and Mountain' - combining seafood with meat, plus innovative modern cuisine in Barcelona."
                    dishes={[
                      "Suquet de peix: Fisherman's stew",
                      "Calçots: Grilled spring onions with romesco",
                      "Crema catalana: Original crème brûlée",
                      "Cava: Spain's champagne from Penedès"
                    ]}
                    icon={Wine}
                  />
                  
                  <CuisineCard
                    region="Valencia"
                    specialty="Rice Masters"
                    description="Birthplace of paella and dozens of other rice dishes. The Mediterranean's garden."
                    dishes={[
                      "Paella valenciana: Original with rabbit, beans, snails",
                      "Fideuà: Like paella but with noodles",
                      "Horchata: Tiger nut milk drink",
                      "Agua de Valencia: Cava and orange juice cocktail"
                    ]}
                    icon={Wine}
                  />
                  
                  <CuisineCard
                    region="Andalucía"
                    specialty="Tapas & Sherry"
                    description="Tapas culture was born here. Jerez's sherry triangle produces the world's most complex wines."
                    dishes={[
                      "Gazpacho/Salmorejo: Cold tomato soups",
                      "Pescaíto frito: Fried fish Málaga-style",
                      "Jamón ibérico de bellota: Acorn-fed ham",
                      "Fino/Manzanilla: Dry sherries perfect with tapas"
                    ]}
                    icon={Wine}
                  />
                  
                  <CuisineCard
                    region="Castilla"
                    specialty="Roasts & Stews"
                    description="Hearty inland cuisine: wood-fired ovens, suckling pig, aged Manchego cheese."
                    dishes={[
                      "Cochinillo asado: Roast suckling pig (Segovia)",
                      "Cocido madrileño: Madrid's chickpea stew",
                      "Manchego: Spain's most famous cheese",
                      "Ribera del Duero: Powerful red wines"
                    ]}
                    icon={Wine}
                  />
                </div>

                <div className="mt-8 p-6 bg-yellow-50 rounded-xl">
                  <h3 className="text-xl font-bold text-yellow-900 mb-3">Essential Food Experiences</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-yellow-800">
                    <div>
                      <strong>Morning:</strong> Chocolate con churros at Madrid's San Ginés
                    </div>
                    <div>
                      <strong>Lunch:</strong> Menu del día at a neighborhood bar (€10-15)
                    </div>
                    <div>
                      <strong>Evening:</strong> Tapas crawl in Seville's Macarena district
                    </div>
                    <div>
                      <strong>Special:</strong> Calçotada feast in Catalonia (January-March)
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'destinations' && (
            <motion.div
              key="destinations"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-display font-medium text-gray-900 mb-6 flex items-center gap-3">
                  <MapPin className="w-8 h-8 text-red-600" />
                  Essential Destinations
                </h2>

                <div className="space-y-6">
                  <DestinationCard
                    city="Madrid"
                    tagline="The Sleepless Capital"
                    description="Spain's vibrant capital combines world-class art, legendary nightlife, and perfect neighborhood life."
                    mustSee={[
                      "Prado Museum: Velázquez's Las Meninas",
                      "Retiro Park: Sunday drum circles at sunset",
                      "Malasaña: Hipster paradise with vintage shops",
                      "El Rastro: Europe's best flea market (Sundays)"
                    ]}
                    insiderTip="Skip tourist-trap tapas. Head to Calle Ponzano for where madrileños actually eat."
                    bestTime="September-November, March-May"
                  />
                  
                  <DestinationCard
                    city="Barcelona"
                    tagline="Modernist Marvel by the Sea"
                    description="Gaudí's playground where medieval lanes meet modernist boulevards and urban beaches."
                    mustSee={[
                      "Sagrada Familia: Book sunset tickets for magical light",
                      "Park Güell: Early morning before crowds",
                      "Barri Gòtic: Get lost in medieval maze",
                      "Bunkers del Carmel: Secret sunrise viewpoint"
                    ]}
                    insiderTip="Avoid Las Ramblas restaurants. Eat in Gràcia or Poble Sec neighborhoods."
                    bestTime="May-June, September-October"
                  />
                  
                  <DestinationCard
                    city="Seville"
                    tagline="Flamenco's Beating Heart"
                    description="Orange blossoms, Holy Week processions, and the most Spanish city in Spain."
                    mustSee={[
                      "Cathedral & Giralda: Largest Gothic cathedral in world",
                      "Real Alcázar: Moorish palace still used by royalty",
                      "Triana: Authentic flamenco in ceramic workshop district",
                      "Metropol Parasol: Wooden mushrooms with city views"
                    ]}
                    insiderTip="April Feria is magical but book accommodation 6 months ahead. Visit in February for orange blossoms without crowds."
                    bestTime="February-April, October-November"
                  />
                  
                  <DestinationCard
                    city="Granada"
                    tagline="Last Moorish Kingdom"
                    description="Where the Alhambra crowns a city of tapas, cave flamenco, and Sierra Nevada views."
                    mustSee={[
                      "Alhambra: Book 3 months ahead, visit at sunset",
                      "Albaicín: Moorish quarter with tea shops",
                      "Sacromonte: Cave houses and authentic flamenco",
                      "Mirador San Nicolás: Alhambra views at sunset"
                    ]}
                    insiderTip="Free tapas with every drink! Order a beer, get a full plate. Bar hop for dinner."
                    bestTime="March-May, September-November"
                  />
                  
                  <DestinationCard
                    city="San Sebastián"
                    tagline="Culinary Capital"
                    description="Beautiful Belle Époque resort with the world's best food scene per capita."
                    mustSee={[
                      "La Concha Beach: Europe's best urban beach",
                      "Old Town pintxos crawl: Start at Gandarias",
                      "Monte Igueldo: Funicular to vintage amusement park",
                      "Zurriola: Surfer beach with younger vibe"
                    ]}
                    insiderTip="Thursday nights are 'Pintxo-Pote' - cheap pintxos and drinks in Gros district."
                    bestTime="May-June, September"
                  />
                  
                  <DestinationCard
                    city="Santiago de Compostela"
                    tagline="End of the Camino"
                    description="Mystical granite city where thousands of pilgrims complete their journey."
                    mustSee={[
                      "Cathedral: Hug the saint, see the Botafumeiro swing",
                      "Old Town: Europe's best-preserved medieval center",
                      "Mercado de Abastos: Galicia's freshest seafood",
                      "Alameda Park: Views over terracotta rooftops"
                    ]}
                    insiderTip="Even if not doing the Camino, get a pilgrim's credential and walk the last 10km for the certificate."
                    bestTime="May-June, September"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'hidden' && (
            <motion.div
              key="hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-display font-medium text-gray-900 mb-6 flex items-center gap-3">
                  <Compass className="w-8 h-8 text-red-600" />
                  Hidden Gems & Secret Spain
                </h2>

                <div className="prose prose-lg max-w-none text-gray-700 mb-8">
                  <p>
                    Beyond the tourist trail lies the Spain that Spaniards keep to themselves - whitewashed villages 
                    clinging to cliffsides, secret beaches accessible only by footpath, and towns where time stopped 
                    in the medieval age.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <HiddenGemCard
                    name="Cudillero, Asturias"
                    type="Fishing Village"
                    description="Amphitheater of colorful houses cascading to a tiny port. No beaches, just pure Asturian fishing culture."
                    secret="Friday's fish market at 5pm when boats return. Eat at Casa Julio (no sign, above the port)."
                    howToReach="3 hours from Santiago, 1 hour from Oviedo. No train, rent a car."
                  />
                  
                  <HiddenGemCard
                    name="Albarracín, Aragón"
                    type="Medieval Town"
                    description="Pink-hued medieval town frozen in time. Voted Spain's most beautiful village, yet few foreigners visit."
                    secret="Stay overnight when day-trippers leave. Walk the walls at sunset for pure magic."
                    howToReach="2.5 hours from Valencia, 3 hours from Madrid. Car essential."
                  />
                  
                  <HiddenGemCard
                    name="Cabo de Gata, Almería"
                    type="Desert Coast"
                    description="Europe's only desert meets pristine Mediterranean. Volcanic cliffs, hidden coves, no development."
                    secret="Playa de los Muertos - hike down cliff to perfect beach. Las Salinas for flamingos."
                    howToReach="45 min from Almería. Rent a car, roads are rough but worth it."
                  />
                  
                  <HiddenGemCard
                    name="Picos de Europa"
                    type="Mountain Paradise"
                    description="Dramatic limestone peaks just 20km from the coast. Bears, wolves, and cheese caves."
                    secret="Naranjo de Bulnes base camp for non-climbers. Cabrales cheese aging caves tour."
                    howToReach="Fly to Asturias or Santander, rent car. Base in Cangas de Onís."
                  />
                  
                  <HiddenGemCard
                    name="Setenil de las Bodegas"
                    type="Cave Town"
                    description="Houses built into and under massive rock overhangs. Streets are literally under rocks."
                    secret="Bar Frasquito's terrace inside the rock. Visit during August festival."
                    howToReach="20 min from Ronda. Combine with white village route."
                  />
                  
                  <HiddenGemCard
                    name="Formentera"
                    type="Island Escape"
                    description="Ibiza's chill little sister. Caribbean-blue water, no airport, no crowds."
                    secret="Rent a bike, not a car. Es Caló for sunrise, Cap de Barbaria lighthouse for sunset."
                    howToReach="30-min ferry from Ibiza. Day trips possible but stay overnight."
                  />
                </div>

                <div className="mt-8 p-6 bg-green-50 rounded-xl">
                  <h3 className="text-xl font-bold text-green-900 mb-3">Secret Experiences</h3>
                  <ul className="space-y-2 text-green-800">
                    <li>• <strong>Bardenas Reales:</strong> Mars-like desert in Navarra used for Game of Thrones</li>
                    <li>• <strong>Caminito del Rey:</strong> Restored cliff-edge walkway in Málaga</li>
                    <li>• <strong>Las Médulas:</strong> Roman gold mines turned surreal red landscape</li>
                    <li>• <strong>Gaztelugatxe:</strong> Basque hermitage on rocky island (Dragonstone in GoT)</li>
                    <li>• <strong>Monasterio de Piedra:</strong> Waterfalls and lakes in Aragón monastery</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'festivals' && (
            <motion.div
              key="festivals"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-display font-medium text-gray-900 mb-6 flex items-center gap-3">
                  <Calendar className="w-8 h-8 text-red-600" />
                  Festivals & Celebrations
                </h2>

                <div className="prose prose-lg max-w-none text-gray-700 mb-8">
                  <p>
                    Spain doesn't just celebrate - it explodes in joy. Every town has its festa, from solemn 
                    religious processions to chaotic food fights. These aren't tourist shows but genuine 
                    community celebrations where visitors become participants.
                  </p>
                </div>

                <div className="space-y-4">
                  <FestivalCard
                    name="Semana Santa (Holy Week)"
                    date="March/April (Easter week)"
                    location="Seville, Málaga, Granada"
                    description="Haunting processions with hooded penitents carrying elaborate floats through candlelit streets. Seville's is most famous, but smaller towns offer intimate experiences."
                    tip="Book accommodation 6 months ahead. Málaga is less crowded than Seville."
                  />
                  
                  <FestivalCard
                    name="Feria de Abril"
                    date="Two weeks after Easter"
                    location="Seville"
                    description="A week of flamenco, horses, and sherry in decorated casetas (tents). Women in flamenco dresses, men on horseback, dancing until dawn."
                    tip="Many casetas are private - make local friends or find public ones."
                  />
                  
                  <FestivalCard
                    name="San Fermín (Running of the Bulls)"
                    date="July 6-14"
                    location="Pamplona"
                    description="Hemingway made it famous. Eight days of mayhem: bull runs at 8am, parties until 6am. White clothes, red scarves, and lots of sangria."
                    tip="Watch the run from a balcony (book months ahead). Don't run unless you're serious."
                  />
                  
                  <FestivalCard
                    name="La Tomatina"
                    date="Last Wednesday of August"
                    location="Buñol, Valencia"
                    description="20,000 people throw 150,000 tomatoes at each other for one hour. Pure, glorious chaos."
                    tip="Wear old clothes, goggles essential. Book ticket online in advance."
                  />
                  
                  <FestivalCard
                    name="Las Fallas"
                    date="March 15-19"
                    location="Valencia"
                    description="Giant satirical sculptures fill the streets, then burn in massive bonfires. Fireworks, paella, and controlled pyromania."
                    tip="March 19 is the big burn. Afternoon mascletà fireworks are as impressive as night ones."
                  />
                  
                  <FestivalCard
                    name="Carnaval"
                    date="February/March"
                    location="Cádiz, Tenerife"
                    description="Cádiz has satirical singing groups roasting politicians. Tenerife rivals Rio with parades and parties."
                    tip="Cádiz is funnier, Tenerife is flashier. Both are non-stop parties."
                  />
                </div>

                <div className="mt-8 p-6 bg-purple-50 rounded-xl">
                  <h3 className="text-xl font-bold text-purple-900 mb-3">Local Festivals Worth Planning Around</h3>
                  <ul className="space-y-2 text-purple-800 text-sm">
                    <li>• <strong>Els Castells (Catalonia):</strong> Human towers up to 10 levels high</li>
                    <li>• <strong>Batalla del Vino (Haro):</strong> Wine fight with thousands of liters</li>
                    <li>• <strong>Fiesta de San Juan (beaches):</strong> Midsummer bonfires and midnight swims</li>
                    <li>• <strong>La Patum (Berga):</strong> Fire-breathing dragons and devils</li>
                    <li>• <strong>Moros y Cristianos (Alcoy):</strong> Mock battles in elaborate costumes</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'practical' && (
            <motion.div
              key="practical"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-display font-medium text-gray-900 mb-6 flex items-center gap-3">
                  <Info className="w-8 h-8 text-red-600" />
                  Essential Travel Intelligence
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <PracticalCard
                    title="Getting Around"
                    icon={Train}
                    tips={[
                      "AVE high-speed trains: Madrid-Barcelona in 2.5 hours, book advance for discounts",
                      "RENFE website is clunky - use Trainline app instead",
                      "Bus often better than train for short routes (ALSA is main company)",
                      "Rent a car for exploring regions, not for cities",
                      "BlaBlaCar for cheap rides between cities"
                    ]}
                  />
                  
                  <PracticalCard
                    title="Money Matters"
                    icon={Wine}
                    tips={[
                      "Cards accepted everywhere except small bars/markets",
                      "Tipping: Round up for coffee, 5-10% restaurants, €1 per bag for hotels",
                      "Menu del día: Weekday lunch deal €10-15 for 3 courses + wine",
                      "Avoid tourist menu boards with photos",
                      "Spanish people eat late - restaurants dead before 9pm"
                    ]}
                  />
                  
                  <PracticalCard
                    title="Cultural Intelligence"
                    icon={Heart}
                    tips={[
                      "Two kisses (starting with right cheek) for greetings",
                      "Loud conversation is normal, not rude",
                      "Shops close 2-5pm, all day Sunday",
                      "Learn 'perdón' (excuse me) and 'lo siento' (sorry)",
                      "Dress up more than northern Europe - flip-flops only at beach"
                    ]}
                  />
                  
                  <PracticalCard
                    title="Survival Spanish"
                    icon={Book}
                    tips={[
                      "¿Cuánto cuesta? - How much?",
                      "¿Dónde está...? - Where is...?",
                      "No hablo español - I don't speak Spanish",
                      "La cuenta, por favor - The bill, please",
                      "Una caña - Small draft beer (the magic word)"
                    ]}
                  />
                </div>

                <div className="mt-8 p-6 bg-blue-50 rounded-xl">
                  <h3 className="text-xl font-bold text-blue-900 mb-3">Insider Knowledge</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-blue-800 text-sm">
                    <div>
                      <strong>Pharmacy Power:</strong> Spanish pharmacists can prescribe many medications
                    </div>
                    <div>
                      <strong>Sunday Savior:</strong> Chinese bazaars open when everything else closed
                    </div>
                    <div>
                      <strong>Free Culture:</strong> Many museums free last 2 hours before closing
                    </div>
                    <div>
                      <strong>Water:</strong> Tap water safe everywhere, but locals prefer bottled
                    </div>
                    <div>
                      <strong>August:</strong> Cities empty, coast packed, many restaurants closed
                    </div>
                    <div>
                      <strong>Tickets:</strong> Book Alhambra 3 months ahead, Sagrada Familia 1 month
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-red-50 rounded-xl">
                  <h3 className="text-xl font-bold text-red-900 mb-3">Avoid These Mistakes</h3>
                  <ul className="space-y-2 text-red-800">
                    <li>❌ Expecting paella everywhere (it's Valencian)</li>
                    <li>❌ Ordering sangria (locals drink tinto de verano)</li>
                    <li>❌ Speaking loud English assuming no one understands</li>
                    <li>❌ Wearing football jerseys in wrong city (Real Madrid in Barcelona)</li>
                    <li>❌ Swimming at city beaches in Barcelona (go to Costa Brava)</li>
                    <li>❌ Eating dinner at 7pm (you'll be alone)</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Footer />
      </div>
    </div>
  );
}

// Component definitions
function TimelineItem({ 
  era, 
  title, 
  description, 
  highlights, 
  expanded, 
  onToggle,
  details 
}: {
  era: string;
  title: string;
  description: string;
  highlights: string[];
  expanded: boolean;
  onToggle: () => void;
  details?: string;
}) {
  return (
    <div className="border-l-4 border-red-600 pl-6">
      <div className="text-sm text-red-600 font-semibold">{era}</div>
      <h3 className="text-2xl font-bold text-gray-900 mt-1">{title}</h3>
      <p className="text-gray-700 mt-2">{description}</p>
      
      <div className="mt-4 space-y-2">
        {highlights.map((highlight, index) => (
          <div key={index} className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
            <span className="text-sm text-gray-600">{highlight}</span>
          </div>
        ))}
      </div>
      
      {details && (
        <>
          <button
            onClick={onToggle}
            className="mt-4 text-red-600 hover:text-red-700 flex items-center gap-1 text-sm font-medium"
          >
            {expanded ? 'Show less' : 'Learn more'}
            <ChevronRight className={`w-4 h-4 transition-transform ${expanded ? 'rotate-90' : ''}`} />
          </button>
          
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm text-gray-700">
                  {details}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

function RegionCard({ 
  title, 
  icon: Icon, 
  description, 
  details 
}: {
  title: string;
  icon: any;
  description: string;
  details: string[];
}) {
  return (
    <div className="p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <Icon className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
        <div>
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <p className="text-gray-700 mt-2">{description}</p>
          <ul className="mt-3 space-y-1">
            {details.map((detail, index) => (
              <li key={index} className="text-sm text-gray-600">• {detail}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function CultureSection({ 
  title, 
  icon: Icon, 
  content 
}: {
  title: string;
  icon: any;
  content: React.ReactNode;
}) {
  return (
    <div className="p-6 bg-gray-50 rounded-xl">
      <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
        <Icon className="w-6 h-6 text-red-600" />
        {title}
      </h3>
      {content}
    </div>
  );
}

function CuisineCard({ 
  region, 
  specialty, 
  description, 
  dishes, 
  icon: Icon 
}: {
  region: string;
  specialty: string;
  description: string;
  dishes: string[];
  icon: any;
}) {
  return (
    <div className="p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{region}</h3>
          <p className="text-sm text-red-600 font-medium">{specialty}</p>
        </div>
        <Icon className="w-6 h-6 text-red-600" />
      </div>
      <p className="text-gray-700 mb-4">{description}</p>
      <ul className="space-y-2">
        {dishes.map((dish, index) => (
          <li key={index} className="text-sm text-gray-600">• {dish}</li>
        ))}
      </ul>
    </div>
  );
}

function DestinationCard({ 
  city, 
  tagline, 
  description, 
  mustSee, 
  insiderTip, 
  bestTime 
}: {
  city: string;
  tagline: string;
  description: string;
  mustSee: string[];
  insiderTip: string;
  bestTime: string;
}) {
  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{city}</h3>
          <p className="text-indigo-600 font-medium">{tagline}</p>
        </div>
        <Camera className="w-6 h-6 text-indigo-600" />
      </div>
      <p className="text-gray-700 mb-4">{description}</p>
      
      <div className="space-y-3">
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Must See:</h4>
          <ul className="space-y-1">
            {mustSee.map((item, index) => (
              <li key={index} className="text-sm text-gray-600">• {item}</li>
            ))}
          </ul>
        </div>
        
        <div className="p-3 bg-yellow-100 rounded-lg">
          <p className="text-sm"><strong className="text-yellow-900">Insider Tip:</strong> <span className="text-yellow-800">{insiderTip}</span></p>
        </div>
        
        <div className="text-sm text-gray-500">
          <strong>Best Time:</strong> {bestTime}
        </div>
      </div>
    </div>
  );
}

function HiddenGemCard({ 
  name, 
  type, 
  description, 
  secret, 
  howToReach 
}: {
  name: string;
  type: string;
  description: string;
  secret: string;
  howToReach: string;
}) {
  return (
    <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{name}</h3>
          <p className="text-sm text-emerald-600 font-medium">{type}</p>
        </div>
        <Compass className="w-6 h-6 text-emerald-600" />
      </div>
      <p className="text-gray-700 mb-3">{description}</p>
      
      <div className="space-y-3">
        <div className="p-3 bg-emerald-100 rounded-lg">
          <p className="text-sm text-emerald-900"><strong>The Secret:</strong> {secret}</p>
        </div>
        
        <div className="text-sm text-gray-600">
          <strong>How to Reach:</strong> {howToReach}
        </div>
      </div>
    </div>
  );
}

function FestivalCard({ 
  name, 
  date, 
  location, 
  description, 
  tip 
}: {
  name: string;
  date: string;
  location: string;
  description: string;
  tip: string;
}) {
  return (
    <div className="p-5 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{name}</h3>
          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {date}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {location}
            </span>
          </div>
        </div>
      </div>
      <p className="text-gray-700 mb-3">{description}</p>
      <div className="p-3 bg-purple-100 rounded-lg">
        <p className="text-sm text-purple-900"><strong>Pro Tip:</strong> {tip}</p>
      </div>
    </div>
  );
}

function PracticalCard({ 
  title, 
  icon: Icon, 
  tips 
}: {
  title: string;
  icon: any;
  tips: string[];
}) {
  return (
    <div className="p-6 bg-gray-50 rounded-xl">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Icon className="w-5 h-5 text-red-600" />
        {title}
      </h3>
      <ul className="space-y-2">
        {tips.map((tip, index) => (
          <li key={index} className="text-sm text-gray-700">• {tip}</li>
        ))}
      </ul>
    </div>
  );
}