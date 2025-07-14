import React from 'react';
import { X, Award, Star, Flame } from 'lucide-react';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
}

interface BadgePanelProps {
  isOpen: boolean;
  onClose: () => void;
  badges: Badge[];
  isHebrew?: boolean;
}

function BadgePanel({ isOpen, onClose, badges, isHebrew = false }: BadgePanelProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-bold text-gray-800 ${isHebrew ? 'font-hebrew' : ''}`}>
            {isHebrew ? 'התגים שלי' : 'My Badges'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            aria-label="Close badge panel"
          >
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-4 rounded-lg border-2 transition-all ${
                badge.earned 
                  ? 'bg-yellow-50 border-yellow-200 shadow-sm' 
                  : 'bg-gray-50 border-gray-200 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="text-2xl">{badge.icon}</div>
                <div className="flex-1">
                  <h3 className={`font-semibold ${badge.earned ? 'text-gray-900' : 'text-gray-500'} ${isHebrew ? 'font-hebrew' : ''}`}>
                    {badge.name}
                  </h3>
                  {badge.earned && badge.earnedDate && (
                    <p className="text-xs text-gray-500">
                      {isHebrew ? 'הושג ב:' : 'Earned:'} {badge.earnedDate}
                    </p>
                  )}
                </div>
                {badge.earned && (
                  <Award className="text-yellow-500" size={20} />
                )}
              </div>
              <p className={`text-sm ${badge.earned ? 'text-gray-700' : 'text-gray-400'} ${isHebrew ? 'font-hebrew' : ''}`}>
                {badge.description}
              </p>
            </div>
          ))}
        </div>

        {badges.filter(b => b.earned).length === 0 && (
          <div className="text-center py-8">
            <Star className="text-gray-300 mx-auto mb-4" size={48} />
            <p className={`text-gray-500 ${isHebrew ? 'font-hebrew' : ''}`}>
              {isHebrew ? 'עדיין לא הרווחת תגים. המשך לחקור את בית המקדש!' : 'No badges earned yet. Keep exploring the Temple!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BadgePanel;