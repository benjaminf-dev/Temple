import React, { useState } from 'react';
import { Zap, Shield, Brain, ChevronRight } from 'lucide-react';

interface Character {
  id: string;
  name: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  abilities: string[];
}

function ModernCharacterSelection() {
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const [hoveredCharacter, setHoveredCharacter] = useState<string | null>(null);

  const characters: Character[] = [
    {
      id: 'warrior',
      name: 'Cyber Warrior',
      description: 'Enhanced combat specialist with advanced weaponry and tactical systems.',
      image: 'https://images.pexels.com/photos/8728382/pexels-photo-8728382.jpeg?auto=compress&cs=tinysrgb&w=400',
      icon: <Shield className="w-8 h-8" />,
      abilities: ['Combat Mastery', 'Tactical Analysis', 'Weapon Systems']
    },
    {
      id: 'technomancer',
      name: 'Technomancer',
      description: 'Master of digital realms with the power to manipulate technology.',
      image: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=400',
      icon: <Brain className="w-8 h-8" />,
      abilities: ['Code Manipulation', 'AI Control', 'System Override']
    },
    {
      id: 'energy-adept',
      name: 'Energy Adept',
      description: 'Harnesses pure energy to bend reality and unleash devastating attacks.',
      image: 'https://images.pexels.com/photos/8728381/pexels-photo-8728381.jpeg?auto=compress&cs=tinysrgb&w=400',
      icon: <Zap className="w-8 h-8" />,
      abilities: ['Energy Projection', 'Reality Shift', 'Plasma Control']
    }
  ];

  const handleCharacterSelect = (characterId: string) => {
    setSelectedCharacter(characterId);
  };

  const handleConfirmSelection = () => {
    if (selectedCharacter) {
      alert(`You selected: ${characters.find(c => c.id === selectedCharacter)?.name}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `
          linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }}></div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4 tracking-wider">
            Choose Your Character
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
          <p className="text-xl text-gray-300 mt-6 max-w-2xl">
            Select your avatar and embark on an epic journey through the digital frontier
          </p>
        </div>

        {/* Character Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
          {characters.map((character) => (
            <div
              key={character.id}
              className={`relative group cursor-pointer transition-all duration-500 transform hover:scale-105 ${
                selectedCharacter === character.id ? 'scale-105' : ''
              }`}
              onMouseEnter={() => setHoveredCharacter(character.id)}
              onMouseLeave={() => setHoveredCharacter(null)}
              onClick={() => handleCharacterSelect(character.id)}
            >
              {/* Glow effect for selected card */}
              {selectedCharacter === character.id && (
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-2xl blur-lg opacity-75 animate-pulse"></div>
              )}
              
              {/* Card */}
              <div className={`relative bg-slate-800/80 backdrop-blur-xl rounded-2xl overflow-hidden border transition-all duration-300 ${
                selectedCharacter === character.id 
                  ? 'border-blue-400 shadow-2xl shadow-blue-400/25' 
                  : 'border-slate-700 hover:border-slate-600'
              }`}>
                {/* Character Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                  
                  {/* Icon overlay */}
                  <div className="absolute top-4 right-4 p-3 bg-slate-900/80 rounded-full text-blue-400 backdrop-blur-sm">
                    {character.icon}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-3 tracking-wide">
                    {character.name}
                  </h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {character.description}
                  </p>

                  {/* Abilities */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-blue-400 mb-2 uppercase tracking-wider">
                      Core Abilities
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {character.abilities.map((ability, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-slate-700/50 text-gray-300 text-xs rounded-full border border-slate-600"
                        >
                          {ability}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Select Button */}
                  <button
                    className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                      selectedCharacter === character.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                        : 'bg-slate-700/50 text-gray-300 hover:bg-slate-600/50 border border-slate-600 hover:border-slate-500'
                    }`}
                  >
                    {selectedCharacter === character.id ? 'Selected' : 'Select'}
                    <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${
                      selectedCharacter === character.id ? 'rotate-90' : ''
                    }`} />
                  </button>
                </div>

                {/* Hover glow effect */}
                {hoveredCharacter === character.id && selectedCharacter !== character.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-2xl pointer-events-none"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Confirm Button */}
        {selectedCharacter && (
          <div className="mt-12 animate-fade-in">
            <button
              onClick={handleConfirmSelection}
              className="px-12 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold text-lg rounded-xl shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 transform hover:scale-105 tracking-wide"
            >
              Confirm Selection
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default ModernCharacterSelection;