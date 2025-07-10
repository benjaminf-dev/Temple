import React, { useState, useRef, useEffect } from 'react';
import { Crown, Music, Heart, Sparkles, Scroll, Shield, Star, Flame, Eye, Users, ExternalLink, BookOpen, X } from 'lucide-react';

const StatBar = ({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) => (
  <div className="mb-3">
    <div className="flex items-center justify-between mb-1">
      <span className="text-sm font-medium text-amber-800 flex items-center gap-1">
        {icon}
        {label}
      </span>
      <span className="text-sm font-bold text-amber-900">{value}</span>
    </div>
    <div className="w-full bg-amber-200 rounded-full h-2">
      <div 
        className="bg-gradient-to-r from-amber-500 to-yellow-500 h-2 rounded-full transition-all duration-700 ease-out"
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

interface Character {
  id: string;
  name: string;
  title: string;
  description: string;
  longDescription: string;
  garments: string;
  stats: {
    purityLevel: number;
    torahKnowledge: number;
    tribalStatus: number;
  };
  sacredDuties: string[];
  icon: React.ReactNode;
  bgColor: string;
  accentColor: string;
}

interface EducationalResource {
  title: string;
  url: string;
  description: string;
  relevantFor: string[];
  icon: React.ReactNode;
}

interface AnimatedCharacter {
  id: string;
  x: number;
  y: number;
  role: 'kohen' | 'levi' | 'worker';
  action: string;
  icon: React.ReactNode;
  color: string;
}

const characters: Character[] = [
  {
    id: 'kohen',
    name: 'Kohen',
    title: 'Sacred Priest of the Most High',
    description: 'Descendant of Aaron, chosen by divine lottery to perform the holiest Temple rituals.',
    longDescription: 'You are a Kohen, a sacred priest descended from Aaron HaKohen. Each morning you participate in the lottery (goral) to determine your Temple duties. Dressed in white linen garments (bigdei lavan) with the golden sash (avnet) and priestly turban (mitznefet), you perform the most sacred rituals of the Temple service.',
    garments: 'White linen tunic, golden sash (avnet), priestly turban (mitznefet)',
    stats: {
      purityLevel: 95,
      torahKnowledge: 90,
      tribalStatus: 100
    },
    sacredDuties: [
      'Korban Tamid (Daily Sacrifice)',
      'Lighting the Menorah',
      'Burning Incense on Golden Altar',
      'Birkat Kohanim (Priestly Blessing)'
    ],
    icon: <Crown className="w-8 h-8" />,
    bgColor: 'from-yellow-50 to-amber-100',
    accentColor: 'border-yellow-400'
  },
  {
    id: 'levi',
    name: 'Levi',
    title: 'Temple Singer and Guardian',
    description: 'Sacred musician and Temple guardian, singing psalms during the divine service.',
    longDescription: 'You are a Levi, chosen from the tribe of Levi to serve in the Temple. Wearing a simple tunic, you stand upon the duchan (platform) singing the sacred psalms during korbanot. Your lyre and cymbals accompany the divine service, and you guard the Temple gates with vigilance.',
    garments: 'Simple linen tunic, prayer shawl, Temple service belt',
    stats: {
      purityLevel: 85,
      torahKnowledge: 85,
      tribalStatus: 90
    },
    sacredDuties: [
      'Singing Psalms on the Duchan',
      'Playing Sacred Instruments',
      'Guarding Temple Gates',
      'Assisting Kohanim in Rituals'
    ],
    icon: <Music className="w-8 h-8" />,
    bgColor: 'from-blue-50 to-indigo-100',
    accentColor: 'border-blue-400'
  },
  {
    id: 'yisrael',
    name: 'Yisrael',
    title: 'Faithful Pilgrim of Israel',
    description: 'Humble Israelite bringing offerings during the pilgrimage festivals.',
    longDescription: 'You are a Yisrael, one of the faithful children of Israel. You have journeyed to Jerusalem for the pilgrimage festival (Pesach, Shavuot, or Sukkot), bringing your animal sacrifice. As part of the Ma\'amadot, you represent the people during the sacred service, watching from the designated areas of the Temple courtyard.',
    garments: 'Modest woolen robes, prayer shawl (tallit), festival garments',
    stats: {
      purityLevel: 75,
      torahKnowledge: 80,
      tribalStatus: 75
    },
    sacredDuties: [
      'Bringing Festival Offerings',
      'Participating in Ma\'amadot',
      'Pilgrimage Observance',
      'Learning Laws of Korbanot'
    ],
    icon: <Heart className="w-8 h-8" />,
    bgColor: 'from-green-50 to-emerald-100',
    accentColor: 'border-green-400'
  }
];

const templeActivities = [
  {
    id: 'morning-service',
    name: 'Shacharit Service',
    description: 'Participate in the morning Temple service',
    icon: <Flame className="w-6 h-6" />,
    color: 'from-orange-100 to-red-200',
    borderColor: 'border-orange-300'
  },
  {
    id: 'korban-tamid',
    name: 'Korban Tamid',
    description: 'The daily perpetual offering',
    icon: <Star className="w-6 h-6" />,
    color: 'from-yellow-100 to-amber-200',
    borderColor: 'border-yellow-300'
  },
  {
    id: 'psalm-singing',
    name: 'Psalm of the Day',
    description: 'Sing the daily psalm on the duchan',
    icon: <Music className="w-6 h-6" />,
    color: 'from-blue-100 to-indigo-200',
    borderColor: 'border-blue-300'
  },
  {
    id: 'incense-offering',
    name: 'Ketoret (Incense)',
    description: 'Burn incense on the golden altar',
    icon: <Sparkles className="w-6 h-6" />,
    color: 'from-purple-100 to-violet-200',
    borderColor: 'border-purple-300'
  },
  {
    id: 'menorah-lighting',
    name: 'Lighting the Menorah',
    description: 'Kindle the seven-branched Menorah',
    icon: <Flame className="w-6 h-6" />,
    color: 'from-yellow-100 to-orange-200',
    borderColor: 'border-yellow-300'
  },
  {
    id: 'purity-preparation',
    name: 'Ritual Purity',
    description: 'Prepare through mikvah and purification',
    icon: <Eye className="w-6 h-6" />,
    color: 'from-cyan-100 to-blue-200',
    borderColor: 'border-cyan-300'
  }
];

const educationalResources: EducationalResource[] = [
  {
    title: "Daily Temple Service",
    url: "https://templeinstitute.org/a-day-in-the-holy-temple-part-9",
    description: "Learn about the daily rituals and services performed in the Temple",
    relevantFor: ["kohen", "levi", "yisrael"],
    icon: <Flame className="w-4 h-4" />
  },
  {
    title: "Priestly Garments",
    url: "https://templeinstitute.org/priestly-garments",
    description: "Detailed information about the sacred vestments worn by the Kohanim",
    relevantFor: ["kohen"],
    icon: <Crown className="w-4 h-4" />
  },
  {
    title: "Role of the Levites",
    url: "https://templeinstitute.org/a-day-in-the-holy-temple-part-8",
    description: "Understanding the sacred duties and musical service of the Levites",
    relevantFor: ["levi"],
    icon: <Music className="w-4 h-4" />
  },
  {
    title: "Temple Architecture",
    url: "https://templeinstitute.org/the-holy-temple-illustrated/",
    description: "Explore the sacred design and layout of the Second Temple",
    relevantFor: ["kohen", "levi", "yisrael"],
    icon: <Shield className="w-4 h-4" />
  },
  {
    title: "Pilgrimage Festivals",
    url: "https://templeinstitute.org/a-day-in-the-holy-temple-part-11",
    description: "Learn about the three pilgrimage festivals and Temple observances",
    relevantFor: ["yisrael"],
    icon: <Heart className="w-4 h-4" />
  }
];

// Animated Temple Scene Component
const TempleScene = ({ onServicePanelClick }: { onServicePanelClick: (event: React.MouseEvent) => void }) => {
  const [animatedCharacters] = useState<AnimatedCharacter[]>([
    { id: '1', x: 25, y: 60, role: 'kohen', action: 'offering sacrifice', icon: <Crown className="w-4 h-4" />, color: 'text-yellow-600' },
    { id: '2', x: 15, y: 75, role: 'levi', action: 'singing psalms', icon: <Music className="w-4 h-4" />, color: 'text-blue-600' },
    { id: '3', x: 35, y: 75, role: 'levi', action: 'playing instruments', icon: <Music className="w-4 h-4" />, color: 'text-blue-600' },
    { id: '4', x: 70, y: 80, role: 'worker', action: 'carrying wood', icon: <Flame className="w-4 h-4" />, color: 'text-amber-600' },
    { id: '5', x: 80, y: 65, role: 'kohen', action: 'lighting menorah', icon: <Sparkles className="w-4 h-4" />, color: 'text-yellow-600' },
  ]);

  return (
    <div className="relative w-full h-96 bg-gradient-to-b from-amber-100 via-yellow-200 to-orange-300 rounded-3xl overflow-hidden border-4 border-amber-400 shadow-2xl">
      {/* Golden hour lighting effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/30 via-transparent to-orange-400/20" />
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-yellow-400/40 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-10 right-1/3 w-24 h-24 bg-amber-400/30 rounded-full blur-2xl animate-pulse delay-1000" />
      
      {/* Temple architecture silhouettes */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-amber-800/60 to-transparent" />
      <div className="absolute bottom-0 left-1/4 w-16 h-24 bg-amber-900/80 rounded-t-lg" /> {/* Column */}
      <div className="absolute bottom-0 right-1/4 w-16 h-24 bg-amber-900/80 rounded-t-lg" /> {/* Column */}
      
      {/* Central Altar */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
        <div className="w-20 h-12 bg-gradient-to-b from-amber-700 to-amber-900 rounded-lg shadow-lg relative">
          {/* Altar flames */}
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <Flame className="w-6 h-6 text-orange-500 animate-pulse" />
          </div>
          <div className="absolute -top-2 left-1/3">
            <Flame className="w-4 h-4 text-red-500 animate-pulse delay-300" />
          </div>
          <div className="absolute -top-2 right-1/3">
            <Flame className="w-4 h-4 text-yellow-500 animate-pulse delay-700" />
          </div>
          {/* Smoke effect */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-2 h-8 bg-gradient-to-t from-gray-400/60 to-transparent rounded-full animate-pulse" />
        </div>
      </div>

      {/* Animated Characters */}
      {animatedCharacters.map((char) => (
        <div
          key={char.id}
          className={`absolute transition-all duration-3000 ease-in-out ${char.color}`}
          style={{ 
            left: `${char.x}%`, 
            top: `${char.y}%`,
            animation: `float 4s ease-in-out infinite ${char.id === '1' ? '0s' : char.id === '2' ? '1s' : char.id === '3' ? '2s' : char.id === '4' ? '3s' : '4s'}`
          }}
        >
          <div className="relative">
            {char.icon}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-amber-800 whitespace-nowrap opacity-75">
              {char.action}
            </div>
          </div>
        </div>
      ))}

      {/* Interactive UI Button */}
      <button
        onClick={onServicePanelClick}
        className="absolute top-4 right-4 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 border-2 border-yellow-400"
      >
        <BookOpen className="w-4 h-4" />
        <span className="font-medium">Temple Service Activities</span>
      </button>

      {/* Ambient particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-yellow-400/60 rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );
};

// Animated Info Panel Component
const TempleServicePanel = ({ 
  isVisible, 
  position, 
  onClose 
}: { 
  isVisible: boolean; 
  position: { x: number; y: number }; 
  onClose: () => void;
}) => {
  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Animated Panel */}
      <div 
        className="fixed z-50 animate-in slide-in-from-top-4 fade-in duration-500 ease-out"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: '90vw',
          maxHeight: '90vh'
        }}
      >
        <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 rounded-3xl shadow-2xl border-4 border-amber-400 overflow-hidden max-w-4xl relative">
          {/* Parchment-style background texture */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full bg-gradient-to-br from-amber-200 via-yellow-100 to-orange-200" />
            {/* Subtle texture lines */}
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-full h-px bg-amber-300/20"
                style={{ top: `${i * 5}%` }}
              />
            ))}
          </div>

          {/* Gold leaf border pattern */}
          <div className="absolute inset-0 border-8 border-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 rounded-3xl pointer-events-none" />
          <div className="absolute inset-2 border-2 border-yellow-300/50 rounded-2xl pointer-events-none" />

          {/* Header with close button */}
          <div className="relative z-10 bg-gradient-to-r from-amber-600 to-yellow-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Flame className="w-8 h-8" />
                <h2 className="text-3xl font-bold">Daily Temple Service</h2>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 p-8 max-h-[70vh] overflow-y-auto">
            {/* Historical Illustration */}
            <div className="mb-8 text-center">
              <div className="bg-gradient-to-br from-amber-100 to-yellow-200 rounded-2xl p-6 border-4 border-amber-300 shadow-lg relative overflow-hidden">
                {/* Artistic representation of Korban Tamid */}
                <div className="w-full h-80 bg-gradient-to-b from-yellow-100 to-amber-200 rounded-xl border-2 border-amber-400 flex items-center justify-center relative">
                  {/* Background temple architecture */}
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-300/20 to-yellow-200/20" />
                  
                  {/* Temple columns */}
                  <div className="absolute left-8 top-8 w-6 h-48 bg-gradient-to-b from-amber-700 to-amber-900 rounded-t-lg" />
                  <div className="absolute right-8 top-8 w-6 h-48 bg-gradient-to-b from-amber-700 to-amber-900 rounded-t-lg" />
                  
                  {/* Central scene */}
                  <div className="relative z-10 text-center">
                    {/* Large bronze altar */}
                    <div className="mb-6">
                      <div className="w-48 h-32 bg-gradient-to-b from-amber-700 to-amber-900 rounded-lg mx-auto mb-4 shadow-2xl relative">
                        {/* Altar flames - more dramatic */}
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                          <Flame className="w-12 h-12 text-orange-500 animate-pulse" />
                        </div>
                        <div className="absolute -top-4 left-1/3">
                          <Flame className="w-8 h-8 text-red-500 animate-pulse delay-300" />
                        </div>
                        <div className="absolute -top-4 right-1/3">
                          <Flame className="w-8 h-8 text-yellow-500 animate-pulse delay-700" />
                        </div>
                        <div className="absolute -top-3 left-1/4">
                          <Flame className="w-6 h-6 text-orange-600 animate-pulse delay-1000" />
                        </div>
                        <div className="absolute -top-3 right-1/4">
                          <Flame className="w-6 h-6 text-red-400 animate-pulse delay-1300" />
                        </div>
                        
                        {/* Smoke columns */}
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-4 h-16 bg-gradient-to-t from-gray-400/60 to-transparent rounded-full animate-pulse" />
                        <div className="absolute -top-10 left-1/3 w-3 h-12 bg-gradient-to-t from-gray-300/40 to-transparent rounded-full animate-pulse delay-500" />
                        <div className="absolute -top-10 right-1/3 w-3 h-12 bg-gradient-to-t from-gray-300/40 to-transparent rounded-full animate-pulse delay-1000" />
                        
                        {/* Altar details */}
                        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-4 bg-amber-800 rounded" />
                        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-28 h-3 bg-amber-900 rounded" />
                      </div>
                      
                      {/* Kohen figure - more detailed */}
                      <div className="flex justify-center mb-4">
                        <div className="relative">
                          <div className="w-12 h-20 bg-white rounded-t-full relative shadow-lg">
                            <Crown className="w-6 h-6 text-yellow-600 absolute -top-2 left-1/2 transform -translate-x-1/2" />
                            <div className="w-10 h-3 bg-yellow-500 absolute top-12 left-1/2 transform -translate-x-1/2 rounded shadow" />
                            <div className="w-8 h-2 bg-amber-600 absolute top-16 left-1/2 transform -translate-x-1/2 rounded" />
                            {/* Arms positioned for offering */}
                            <div className="absolute top-8 -left-2 w-4 h-2 bg-white rounded-full transform rotate-45" />
                            <div className="absolute top-8 -right-2 w-4 h-2 bg-white rounded-full transform -rotate-45" />
                          </div>
                          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-amber-800 font-medium">
                            Kohen offering Tamid
                          </div>
                        </div>
                      </div>
                      
                      {/* Levites on duchan platform */}
                      <div className="flex justify-center gap-4 mb-4">
                        <div className="relative">
                          <div className="w-8 h-12 bg-blue-200 rounded-t-full relative shadow">
                            <Music className="w-4 h-4 text-blue-600 absolute -top-1 left-1/2 transform -translate-x-1/2" />
                            <div className="w-6 h-2 bg-blue-400 absolute top-8 left-1/2 transform -translate-x-1/2 rounded" />
                          </div>
                          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-blue-800">
                            Levi
                          </div>
                        </div>
                        <div className="relative">
                          <div className="w-8 h-12 bg-blue-200 rounded-t-full relative shadow">
                            <Music className="w-4 h-4 text-blue-600 absolute -top-1 left-1/2 transform -translate-x-1/2" />
                            <div className="w-6 h-2 bg-blue-400 absolute top-8 left-1/2 transform -translate-x-1/2 rounded" />
                          </div>
                          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-blue-800">
                            Levi
                          </div>
                        </div>
                        <div className="relative">
                          <div className="w-8 h-12 bg-blue-200 rounded-t-full relative shadow">
                            <Music className="w-4 h-4 text-blue-600 absolute -top-1 left-1/2 transform -translate-x-1/2" />
                            <div className="w-6 h-2 bg-blue-400 absolute top-8 left-1/2 transform -translate-x-1/2 rounded" />
                          </div>
                          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-blue-800">
                            Levi
                          </div>
                        </div>
                      </div>

                      {/* Platform for Levites */}
                      <div className="w-32 h-4 bg-gradient-to-b from-amber-600 to-amber-800 rounded mx-auto mb-2 shadow-lg" />
                    </div>
                    
                    <p className="text-amber-800 font-medium text-lg italic">
                      "The Kohen offers the Korban Tamid as Levites sing psalms on the duchan"
                    </p>
                  </div>
                  
                  {/* Decorative golden elements */}
                  <div className="absolute top-6 left-6 w-12 h-12 bg-yellow-400/20 rounded-full animate-pulse" />
                  <div className="absolute top-12 right-8 w-8 h-8 bg-amber-400/20 rounded-full animate-pulse delay-1000" />
                  <div className="absolute bottom-8 left-12 w-6 h-6 bg-orange-400/20 rounded-full animate-pulse delay-2000" />
                  <div className="absolute bottom-12 right-6 w-10 h-10 bg-yellow-300/20 rounded-full animate-pulse delay-1500" />
                </div>
              </div>
            </div>

            {/* Descriptive Text */}
            <div className="bg-white/60 rounded-2xl p-6 border-2 border-amber-300 mb-6 relative">
              <div className="absolute top-4 right-4">
                <a
                  href="https://templeinstitute.org/a-day-in-the-holy-temple-part-9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-amber-700 hover:text-amber-900 transition-colors duration-200 text-sm"
                >
                  <BookOpen className="w-4 h-4" />
                  Learn More
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              
              <h3 className="text-2xl font-bold text-amber-900 mb-4 flex items-center gap-2">
                <Star className="w-6 h-6" />
                The Daily Korban Tamid
              </h3>
              
              <p className="text-amber-800 leading-relaxed text-lg mb-4">
                Each morning, the Kohanim begin the sacred service with the Korban Tamid. A lamb is sacrificed, 
                its blood is sprinkled on the altar, and incense is offered. Levites sing psalms during this daily ritual, 
                bringing harmony to the Temple.
              </p>
              
              <p className="text-amber-800 leading-relaxed text-lg">
                This perpetual offering represents the eternal covenant between the Divine and Israel. As the sacrifice 
                burns upon the bronze altar, the smoke rises heavenward, carrying the prayers and devotion of the entire nation. 
                The Levites' voices echo through the sacred courts, their ancient melodies sanctifying the morning air.
              </p>
            </div>

            {/* Educational Resources */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {educationalResources.slice(0, 4).map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-blue-50 to-indigo-100 hover:from-blue-100 hover:to-indigo-200 rounded-xl p-4 border-2 border-blue-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg group"
                >
                  <div className="flex items-start gap-3">
                    <div className="text-blue-600 mt-1 group-hover:text-blue-700 transition-colors">
                      {resource.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-blue-900 mb-1 flex items-center gap-2">
                        {resource.title}
                        <ExternalLink className="w-3 h-3 opacity-60" />
                      </h4>
                      <p className="text-blue-800 text-sm leading-relaxed">{resource.description}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Biblical Quote */}
            <div className="text-center bg-gradient-to-r from-amber-100 to-yellow-100 rounded-2xl p-6 border-2 border-amber-300">
              <blockquote className="text-amber-900 italic text-xl font-medium mb-2">
                "Command the children of Israel, and say to them: My offering, My food for My fire-offerings, 
                My sweet savor, you shall observe to offer to Me in its due season."
              </blockquote>
              <cite className="text-amber-700 text-sm">— Numbers 28:2</cite>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function CharacterSelection() {
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const [hoveredCharacter, setHoveredCharacter] = useState<string | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentActivity, setCurrentActivity] = useState<string | null>(null);
  const [activityMessage, setActivityMessage] = useState<string>('');
  const [purityLevel, setPurityLevel] = useState(100);
  const [dayPhase, setDayPhase] = useState<'dawn' | 'morning' | 'afternoon' | 'evening'>('dawn');
  const [showServicePanel, setShowServicePanel] = useState(false);
  const [panelPosition, setPanelPosition] = useState({ x: 0, y: 0 });

  const handleCharacterSelect = (characterId: string) => {
    setSelectedCharacter(characterId);
  };

  const handleStartJourney = () => {
    setGameStarted(true);
  };

  const handleBackToSelection = () => {
    setGameStarted(false);
    setSelectedCharacter(null);
    setCurrentActivity(null);
  };

  const getActivityMessage = (activity: string, character: Character) => {
    const messages: Record<string, Record<string, string>> = {
      'morning-service': {
        kohen: 'You participate in the goral (lottery) and are chosen to perform the morning service. With trembling hands, you approach the mizbeach (altar) as the first light of dawn breaks over the Temple.',
        levi: 'You take your place on the duchan with your fellow Levites. Your voice joins the sacred chorus as the morning service begins, your lyre resonating through the Temple courts.',
        yisrael: 'As part of the Ma\'amadot, you stand in the designated area, representing all of Israel as you witness the sacred morning service with awe and reverence.'
      },
      'korban-tamid': {
        kohen: 'You have been chosen by lottery to offer the korban tamid. With precise movements learned through generations, you prepare the lamb and approach the altar with the sacred fire.',
        levi: 'You assist the Kohen in preparing the korban tamid, ensuring all vessels are pure and ready. Your knowledge of Temple procedures guides every step.',
        yisrael: 'You watch in silent reverence as the korban tamid is offered on behalf of all Israel. The smoke rises heavenward, carrying the prayers of the nation.'
      },
      'psalm-singing': {
        kohen: 'Though your primary duty is at the altar, you join your voice with the Levites in the psalm of the day, your priestly blessing adding sanctity to the song.',
        levi: 'Standing on the duchan, you lead the singing of today\'s psalm. Your voice, trained from youth, carries the ancient melodies that have echoed in this holy place for generations.',
        yisrael: 'You listen as the Levites sing the psalm of the day. The sacred words wash over you, connecting you to the divine presence that dwells in this holy place.'
      },
      'incense-offering': {
        kohen: 'You have been chosen for the most coveted service - offering the ketoret on the golden altar. With hands purified and heart prepared, you enter the Heichal (sanctuary) alone.',
        levi: 'You prepare the sacred spices for the ketoret, grinding them according to the ancient formula. Though you cannot enter the sanctuary, your preparation is essential.',
        yisrael: 'From the courtyard, you see the smoke of the ketoret rising from within the sanctuary. You know that your prayers ascend with that sacred smoke.'
      },
      'menorah-lighting': {
        kohen: 'You approach the golden Menorah with the sacred fire. Each of the seven lamps must be kindled with precision, bringing light to the sanctuary of the Most High.',
        levi: 'You prepare the pure olive oil for the Menorah, ensuring its quality meets the highest standards. Your careful preparation enables the sacred light to burn.',
        yisrael: 'Though you cannot see the Menorah directly, you know that its light burns within the sanctuary, symbolizing the eternal light of Torah and divine presence.'
      },
      'purity-preparation': {
        kohen: 'You immerse in the mikvah and don your sacred garments. Every detail of your preparation is crucial, for you will stand before the Holy One in service.',
        levi: 'You purify yourself according to the laws of the Temple. Your purity enables you to serve in the sacred precincts and assist in the holy work.',
        yisrael: 'You prepare yourself through ritual purification, ensuring you are worthy to enter the Temple courts and participate in the sacred service.'
      }
    };

    return messages[activity]?.[character.id] || 'You engage in sacred Temple service.';
  };

  const handleActivitySelect = (activityId: string) => {
    const character = characters.find(c => c.id === selectedCharacter);
    if (!character) return;
    
    // Prevent selecting if already in progress
    if (currentActivity) return;

    setCurrentActivity(activityId);
    const message = getActivityMessage(activityId, character);
    setActivityMessage(message);

    // Simulate purity level changes based on activity
    if (activityId === 'purity-preparation') {
      setPurityLevel(100);
    } else {
      setPurityLevel(prev => Math.max(70, prev - 5));
    }
    
    // Clear activity after 4 seconds
    setTimeout(() => {
      setCurrentActivity(null);
      setActivityMessage('');
    }, 4000);
  };

  const handleServicePanelToggle = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPanelPosition({
      x: rect.left + rect.width / 2,
      y: rect.bottom + 10
    });
    setShowServicePanel(!showServicePanel);
  };

  const getAvailableActivities = (characterId: string) => {
    switch (characterId) {
      case 'kohen':
        return templeActivities;
      case 'levi':
        return templeActivities.filter(a => !['incense-offering', 'menorah-lighting'].includes(a.id));
      case 'yisrael':
        return templeActivities.filter(a => !['incense-offering', 'menorah-lighting', 'korban-tamid'].includes(a.id));
      default:
        return [];
    }
  };

  if (gameStarted && selectedCharacter) {
    const character = characters.find(c => c.id === selectedCharacter);
    if (!character) return null;

    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 via-yellow-50 to-orange-50 relative overflow-hidden">
        {/* Cinematic background effects */}
        <div className="absolute inset-0 bg-gradient-to-t from-amber-100/30 to-transparent" />
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-20 left-1/4 w-64 h-64 bg-yellow-400 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-60 right-1/3 w-48 h-48 bg-amber-400 rounded-full blur-2xl animate-pulse delay-1000" />
          <div className="absolute bottom-40 left-1/2 w-80 h-80 bg-orange-400 rounded-full blur-3xl animate-pulse delay-2000" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-8">
          {/* Header with character info */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="text-amber-600">{character.icon}</div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 bg-clip-text text-transparent">
                {character.name} - {character.title}
              </h1>
            </div>
            <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-yellow-200 mb-6">
              <p className="text-xl text-amber-800 leading-relaxed mb-4">
                {character.longDescription}
              </p>
              <div className="text-amber-700 text-lg">
                <strong>Sacred Garments:</strong> {character.garments}
              </div>
            </div>
          </div>

          {/* Cinematic Temple Scene */}
          <div className="max-w-6xl mx-auto mb-8">
            <TempleScene onServicePanelClick={handleServicePanelToggle} />
          </div>

          {/* Temple Service Panel */}
          <TempleServicePanel 
            isVisible={showServicePanel}
            position={panelPosition}
            onClose={() => setShowServicePanel(false)}
          />

          {/* Temple Status Panel */}
          <div className="max-w-6xl mx-auto mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-yellow-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <h3 className="text-lg font-bold text-amber-900 mb-2">Temple Phase</h3>
                  <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-xl p-3">
                    <div className="text-orange-600 mb-1">
                      <Flame className="w-6 h-6 mx-auto" />
                    </div>
                    <span className="text-orange-900 font-medium capitalize">{dayPhase}</span>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-bold text-amber-900 mb-2">Purity Level</h3>
                  <div className="bg-gradient-to-r from-cyan-100 to-blue-100 rounded-xl p-3">
                    <div className="text-cyan-600 mb-1">
                      <Eye className="w-6 h-6 mx-auto" />
                    </div>
                    <span className="text-cyan-900 font-medium">{purityLevel}%</span>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-bold text-amber-900 mb-2">Torah Knowledge</h3>
                  <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-3">
                    <div className="text-green-600 mb-1">
                      <Scroll className="w-6 h-6 mx-auto" />
                    </div>
                    <span className="text-green-900 font-medium">{character.stats.torahKnowledge}%</span>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-bold text-amber-900 mb-2">Tribal Status</h3>
                  <div className="bg-gradient-to-r from-purple-100 to-violet-100 rounded-xl p-3">
                    <div className="text-purple-600 mb-1">
                      <Shield className="w-6 h-6 mx-auto" />
                    </div>
                    <span className="text-purple-900 font-medium">{character.stats.tribalStatus}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sacred Duties */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-yellow-200">
              <h3 className="text-2xl font-bold text-amber-900 mb-4 text-center">Your Sacred Duties</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {character.sacredDuties.map((duty, index) => (
                  <div key={index} className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-xl p-4 border border-amber-200">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                        <Star className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-amber-900 font-medium">{duty}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Temple Activities */}
          <div className="max-w-6xl mx-auto mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-yellow-200">
              <h3 className="text-2xl font-bold text-amber-900 mb-6 text-center">Temple Service Activities</h3>
              
              {/* Activity Message */}
              {currentActivity && activityMessage && (
                <div className="mb-6 p-6 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-xl border border-amber-300">
                  <p className="text-amber-900 text-center font-medium text-lg leading-relaxed">{activityMessage}</p>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getAvailableActivities(selectedCharacter).map((activity) => (
                  <button 
                    key={activity.id}
                    onClick={() => handleActivitySelect(activity.id)}
                    disabled={currentActivity !== null}
                    className={`bg-gradient-to-br ${activity.color} hover:scale-105 rounded-xl p-4 border ${activity.borderColor} transition-all duration-300 ${
                      currentActivity !== null ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg cursor-pointer'
                    }`}
                  >
                    <div className="text-center">
                      <div className="flex justify-center mb-3 text-amber-700">
                        {activity.icon}
                      </div>
                      <h4 className="font-bold text-amber-900 mb-2">{activity.name}</h4>
                      <p className="text-amber-800 text-sm">{activity.description}</p>
                      {currentActivity === activity.id && (
                        <div className="mt-2 text-xs text-amber-600 font-medium">
                          In Progress...
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-center space-y-4">
            <div className="space-x-4">
              <button 
                onClick={() => setDayPhase(prev => {
                  const phases: Array<'dawn' | 'morning' | 'afternoon' | 'evening'> = ['dawn', 'morning', 'afternoon', 'evening'];
                  const currentIndex = phases.indexOf(prev);
                  return phases[(currentIndex + 1) % phases.length];
                })}
                className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Advance Temple Service
              </button>
              <button 
                onClick={handleBackToSelection}
                className="bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Choose Different Role
              </button>
            </div>
          </div>
        </div>

        {/* CSS for floating animation */}
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-yellow-50 to-orange-50 relative overflow-hidden">
      {/* Cinematic background */}
      <div className="absolute inset-0 bg-gradient-to-t from-amber-100/20 to-transparent" />
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-1/4 w-32 h-32 bg-yellow-300 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-1/4 w-24 h-24 bg-amber-300 rounded-full blur-2xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-orange-300 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Crown className="w-10 h-10 text-yellow-600" />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 bg-clip-text text-transparent">
              The Second Temple
            </h1>
            <Crown className="w-10 h-10 text-yellow-600" />
          </div>
          <h2 className="text-3xl font-bold text-amber-800 mb-4">Choose Your Sacred Role</h2>
          <p className="text-xl text-amber-800 max-w-4xl mx-auto leading-relaxed">
            Enter the sacred courts of the Beit HaMikdash in Jerusalem during the Second Temple period. 
            Your heritage and calling will determine your role in the divine service, following the ancient traditions 
            as preserved by the Temple Institute.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-8">
          {characters.map((character) => (
            <div
              key={character.id}
              className={`relative group cursor-pointer transition-all duration-500 transform hover:scale-105 ${
                selectedCharacter === character.id ? 'scale-105 ring-4 ring-yellow-400' : ''
              }`}
              onClick={() => handleCharacterSelect(character.id)}
              onMouseEnter={() => setHoveredCharacter(character.id)}
              onMouseLeave={() => setHoveredCharacter(null)}
            >
              <div className={`bg-gradient-to-br ${character.bgColor} rounded-3xl p-6 shadow-2xl border-2 ${character.accentColor} h-full relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 bg-white/80 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <div className="text-amber-600 group-hover:text-yellow-600 transition-colors duration-300">
                      {character.icon}
                    </div>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-amber-900 mb-2">{character.name}</h3>
                  <p className="text-amber-700 font-medium text-lg mb-3">{character.title}</p>
                  <p className="text-amber-800 text-sm leading-relaxed mb-4">{character.description}</p>
                  <div className="text-xs text-amber-700 bg-white/40 rounded-lg p-2">
                    <strong>Garments:</strong> {character.garments}
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <StatBar label="Purity Level" value={character.stats.purityLevel} icon={<Sparkles className="w-3 h-3" />} />
                  <StatBar label="Torah Knowledge" value={character.stats.torahKnowledge} icon={<Scroll className="w-3 h-3" />} />
                  <StatBar label="Tribal Status" value={character.stats.tribalStatus} icon={<Shield className="w-3 h-3" />} />
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-amber-900 mb-2">Sacred Duties:</h4>
                  {character.sacredDuties.map((duty, index) => (
                    <div key={index} className="text-xs text-amber-800 bg-white/40 rounded-full px-3 py-1 inline-block mr-2 mb-1">
                      {duty}
                    </div>
                  ))}
                </div>
                
                {/* Character-specific educational link */}
                <div className="mt-4 pt-4 border-t border-amber-200">
                  {educationalResources
                    .filter(resource => resource.relevantFor.includes(character.id) && resource.relevantFor.length === 1)
                    .slice(0, 1)
                    .map((resource, index) => (
                      <a
                        key={index}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs text-amber-700 hover:text-amber-900 transition-colors duration-200"
                      >
                        <BookOpen className="w-3 h-3" />
                        Learn about {character.name} role
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ))}
                </div>

                {selectedCharacter === character.id && (
                  <div className="absolute top-4 right-4 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-4 h-4 bg-white rounded-full" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {selectedCharacter && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-yellow-200">
              {(() => {
                const character = characters.find(c => c.id === selectedCharacter);
                return character ? (
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <div className="text-amber-600">{character.icon}</div>
                      <h2 className="text-3xl font-bold text-amber-900">
                        You have chosen: {character.name}
                      </h2>
                    </div>
                    <p className="text-amber-800 text-lg leading-relaxed mb-6">
                      {character.longDescription}
                    </p>
                    <button 
                      onClick={handleStartJourney}
                      className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                      Enter the Sacred Temple Courts
                    </button>
                  </div>
                ) : null;
              })()}
            </div>
          </div>
        )}

        <div className="text-center mt-12 text-amber-700">
          <p className="text-sm italic">
            "And let them make Me a sanctuary, that I may dwell among them" - Exodus 25:8
          </p>
        </div>
      </div>
    </div>
  );
}