import React, { useState, useEffect } from 'react';
import { Info, ExternalLink, Award, Flame, Sparkles, CheckCircle } from 'lucide-react';
import Toast from './Toast';
import BadgePanel from './BadgePanel';

interface Avatar {
  id: string;
  name: string;
  hebrewName: string;
  description: string;
  tooltip: string;
  purityLevel: number;
  knowledgeLevel: number;
  experienceLevel: number;
  zoneAccess: number;
  image: string;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
}

interface Ingredient {
  id: string;
  name: string;
  hebrewName: string;
  placed: boolean;
  correct: boolean;
}

function Temple3D() {
  const [showAvatarModal, setShowAvatarModal] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: 'balsam', name: 'Balsam', hebrewName: 'נטף', placed: false, correct: false },
    { id: 'onycha', name: 'Onycha', hebrewName: 'שחלת', placed: false, correct: false },
    { id: 'galbanum', name: 'Galbanum', hebrewName: 'חלבנה', placed: false, correct: false },
    { id: 'frankincense', name: 'Frankincense', hebrewName: 'לבונה זכה', placed: false, correct: false },
    { id: 'myrrh', name: 'Myrrh', hebrewName: 'מור', placed: false, correct: false },
    { id: 'cassia', name: 'Cassia', hebrewName: 'קציעה', placed: false, correct: false },
    { id: 'spikenard', name: 'Spikenard', hebrewName: 'שבולת נרד', placed: false, correct: false },
    { id: 'saffron', name: 'Saffron', hebrewName: 'כרכום', placed: false, correct: false },
    { id: 'costus', name: 'Costus', hebrewName: 'קושט', placed: false, correct: false },
    { id: 'aromatic-bark', name: 'Aromatic Bark', hebrewName: 'קליפה', placed: false, correct: false },
    { id: 'cinnamon', name: 'Cinnamon', hebrewName: 'קינמון', placed: false, correct: false }
  ]);
  const [grindingProgress, setGrindingProgress] = useState(0);
  const [selectedSmokeHerb, setSelectedSmokeHerb] = useState('');
  const [badges, setBadges] = useState<Badge[]>([
    {
      id: 'ketoret-apprentice',
      name: 'Ketoret Apprentice',
      description: 'Successfully prepared sacred incense following ancient Temple traditions',
      icon: '🔥',
      earned: false
    },
    {
      id: 'menorah-master',
      name: 'Menorah Master',
      description: 'Properly maintained the golden menorah with seven branches',
      icon: '🕯️',
      earned: false
    },
    {
      id: 'temple-scholar',
      name: 'Temple Scholar',
      description: 'Demonstrated deep knowledge of Temple rituals and practices',
      icon: '📜',
      earned: false
    }
  ]);
  const [showTempleInstituteModal, setShowTempleInstituteModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showBadgePanel, setShowBadgePanel] = useState(false);
  const [purityLevel, setPurityLevel] = useState(85);
  const [isHebrew, setIsHebrew] = useState(false);

  const avatars: Avatar[] = [
    {
      id: 'young-kohen',
      name: 'Young Kohen',
      hebrewName: 'כהן צעיר',
      description: 'Regular priest responsible for daily Temple duties',
      tooltip: 'Young Kohen – eligible to prepare daily ketoret incense and maintain the menorah',
      purityLevel: 85,
      knowledgeLevel: 70,
      experienceLevel: 60,
      zoneAccess: 2,
      image: '👨‍🦳'
    },
    {
      id: 'high-priest',
      name: 'High Priest (Kohen Gadol)',
      hebrewName: 'כהן גדול',
      description: 'Supreme spiritual leader with access to Holy of Holies',
      tooltip: 'High Priest – leads Yom Kippur service, offers Priestly Blessing, prepares special ketoret',
      purityLevel: 100,
      knowledgeLevel: 95,
      experienceLevel: 90,
      zoneAccess: 3,
      image: '👑'
    },
    {
      id: 'levite',
      name: 'Levite',
      hebrewName: 'לוי',
      description: 'Temple musician and guardian',
      tooltip: 'Levite – performs daily chants, trumpet fanfare, assists in ketoret preparation',
      purityLevel: 75,
      knowledgeLevel: 80,
      experienceLevel: 70,
      zoneAccess: 1,
      image: '🎵'
    }
  ];

  const smokeHerbs = [
    { id: 'jordan-amber', name: 'Jordan Amber', correct: false },
    { id: 'ma-aleh-ashan', name: "Ma'aleh Ashan", correct: true },
    { id: 'cyprus-wine', name: 'Cyprus Wine', correct: false },
    { id: 'sodom-salt', name: 'Sodom Salt', correct: false }
  ];

  const handleAvatarSelect = (avatar: Avatar) => {
    setSelectedAvatar(avatar);
    setPurityLevel(avatar.purityLevel);
    setShowAvatarModal(false);
  };

  const handleIngredientDrop = (ingredientId: string) => {
    setIngredients(prev => prev.map(ing => 
      ing.id === ingredientId 
        ? { ...ing, placed: true, correct: true }
        : ing
    ));
  };

  const handleGrinding = () => {
    if (grindingProgress < 100) {
      setGrindingProgress(prev => Math.min(prev + 10, 100));
    }
  };

  const handleSmokeHerbSelect = (herbId: string) => {
    setSelectedSmokeHerb(herbId);
    if (herbId === 'ma-aleh-ashan') {
      setTimeout(() => setCurrentStep(4), 1000);
    }
  };

  const completeIncenseRitual = () => {
    // Update badge as earned
    setBadges(prev => prev.map(badge => 
      badge.id === 'ketoret-apprentice' 
        ? { ...badge, earned: true, earnedDate: new Date().toLocaleDateString() }
        : badge
    ));
    
    // Show toast notification
    setToastMessage("You earned the 'Ketoret Apprentice' badge!");
    setShowToast(true);
    
    // Close modal and return to main activity menu
    setCurrentStep(1);
    
    // Update purity level
    setPurityLevel(prev => Math.min(prev + 10, 100));
  };

  const handleViewBadge = () => {
    setShowToast(false);
    setShowBadgePanel(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (showBadgePanel) {
        setShowBadgePanel(false);
      } else if (showTempleInstituteModal) {
        setShowTempleInstituteModal(false);
      } else if (showAvatarModal) {
        // Don't allow closing avatar modal with ESC on first load
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown as any);
    return () => document.removeEventListener('keydown', handleKeyDown as any);
  }, [showBadgePanel, showTempleInstituteModal, showAvatarModal]);

  const allIngredientsPlaced = ingredients.every(ing => ing.placed);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Avatar Selection Modal */}
      {showAvatarModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={(e) => e.target === e.currentTarget && setShowAvatarModal(false)}
        >
          <div className="bg-white rounded-xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {isHebrew ? 'בחר את הדמות שלך' : 'Choose Your Avatar'}
              </h2>
              <p className="text-gray-600 mb-4">
                {isHebrew 
                  ? 'כל דמות מציעה חוויה ייחודית בעבודת הקטורת הקדושה'
                  : 'Each avatar offers a unique experience in the sacred ketoret preparation'
                }
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-blue-600">
                <Info size={16} />
                <button 
                  onClick={() => setShowTempleInstituteModal(true)}
                  className="hover:underline flex items-center gap-1"
                >
                  {isHebrew ? 'למד עוד במכון המקדש' : 'Learn more at Temple Institute'}
                  <ExternalLink size={14} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {avatars.map((avatar) => (
                <div
                  key={avatar.id}
                  className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg p-6 cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
                  onClick={() => handleAvatarSelect(avatar)}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-3">{avatar.image}</div>
                    <h3 className="text-xl font-bold mb-2">
                      {isHebrew ? avatar.hebrewName : avatar.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {avatar.description}
                    </p>
                    
                    {/* Stats */}
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-xs">
                        <span>{isHebrew ? 'טהרה' : 'Purity'}</span>
                        <span>{avatar.purityLevel}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${avatar.purityLevel}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex justify-between text-xs">
                        <span>{isHebrew ? 'ידע' : 'Knowledge'}</span>
                        <span>{avatar.knowledgeLevel}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${avatar.knowledgeLevel}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Tooltip */}
                    <div className="bg-white bg-opacity-60 p-3 rounded text-xs text-gray-700">
                      {avatar.tooltip}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-6">
              <button
                onClick={() => setIsHebrew(!isHebrew)}
                className="text-sm text-blue-600 hover:underline"
              >
                {isHebrew ? 'English' : 'עברית'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Temple Institute Modal */}
      {showTempleInstituteModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={(e) => e.target === e.currentTarget && setShowTempleInstituteModal(false)}
        >
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Temple Institute</h3>
              <p className="text-gray-600 mb-6">
                The Temple Institute is dedicated to rebuilding the Holy Temple in Jerusalem. 
                Learn about authentic Temple vessels, priestly garments, and sacred rituals.
              </p>
              <div className="flex gap-4 justify-center">
                <a
                  href="https://templeinstitute.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  Visit Temple Institute
                  <ExternalLink size={16} />
                </a>
                <button
                  onClick={() => setShowTempleInstituteModal(false)}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Temple Interface */}
      {selectedAvatar && (
        <div className="min-h-screen">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-4 shadow-lg">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="text-2xl">{selectedAvatar.image}</div>
                <div>
                  <h1 className="text-xl font-bold">
                    {isHebrew ? selectedAvatar.hebrewName : selectedAvatar.name}
                  </h1>
                  <p className="text-sm opacity-90">
                    {isHebrew ? 'הכנת קטורת בחדר אבטינס' : 'Ketoret Preparation - Chamber of Avtinas'}
                  </p>
                </div>
              </div>
              
              {/* HUD */}
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-xs opacity-75">{isHebrew ? 'טהרה' : 'Purity'}</div>
                  <div className="text-lg font-bold">{purityLevel}%</div>
                </div>
                <div className="text-center">
                  <div className="text-xs opacity-75">{isHebrew ? 'תגים' : 'Badges'}</div>
                  <div className="text-lg font-bold">{badges.filter(b => b.earned).length}</div>
                </div>
                <button
                  onClick={() => setShowTempleInstituteModal(true)}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded text-sm flex items-center gap-1"
                >
                  <Info size={14} />
                  {isHebrew ? 'מכון המקדש' : 'Temple Institute'}
                </button>
              </div>
            </div>
          </div>

          {/* Activity Menu */}
          <div className="fixed top-20 right-4 bg-white rounded-lg shadow-lg p-4 z-40">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="text-amber-500" size={20} />
              <span className="font-semibold">{isHebrew ? 'פעילויות' : 'Activities'}</span>
            </div>
            <button className="w-full bg-amber-100 hover:bg-amber-200 p-2 rounded text-sm flex items-center gap-2 transition-colors">
              <Flame size={16} />
              {isHebrew ? 'הכן קטורת' : 'Prepare Incense'}
            </button>
          </div>

          {/* Main Content */}
          <div className="max-w-6xl mx-auto p-6">
            {/* Step 1: Ingredient Assembly */}
            {currentStep === 1 && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold mb-4">
                    {isHebrew ? 'שלב 1: איסוף רכיבים' : 'Step 1: Ingredient Assembly'}
                  </h2>
                  <p className="text-gray-600">
                    {isHebrew 
                      ? 'גרור כל תבלין נכון אל המכתש כפי שמצוין בשמות ל:לד-לח'
                      : 'Drag each correct spice onto the mortar as specified in Exodus 30:34-38'
                    }
                  </p>
                </div>

                {/* Ingredients Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {ingredients.map((ingredient) => (
                    <div
                      key={ingredient.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        ingredient.placed 
                          ? 'bg-green-100 border-green-300' 
                          : 'bg-amber-50 border-amber-200 hover:border-amber-300'
                      }`}
                      onClick={() => !ingredient.placed && handleIngredientDrop(ingredient.id)}
                    >
                      <div className="text-center">
                        {ingredient.placed && <CheckCircle className="text-green-500 mx-auto mb-2" size={20} />}
                        <div className="font-semibold text-sm">
                          {isHebrew ? ingredient.hebrewName : ingredient.name}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Salt from Sodom */}
                  <div className="p-4 rounded-lg border-2 bg-blue-50 border-blue-200">
                    <div className="text-center">
                      <div className="font-semibold text-sm">
                        {isHebrew ? 'מלח סדומית' : 'Salt from Sodom'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress */}
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-2">
                    {ingredients.filter(i => i.placed).length} / 11 {isHebrew ? 'רכיבים' : 'ingredients'}
                  </div>
                  {allIngredientsPlaced && (
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors"
                    >
                      {isHebrew ? 'המשך לטחינה' : 'Continue to Grinding'}
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Grinding */}
            {currentStep === 2 && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold mb-4">
                    {isHebrew ? 'שלב 2: טחינה בדיוק' : 'Step 2: Grinding with Precision'}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {isHebrew 
                      ? 'השתמש במכתש הווירטואלי לטחון עד שמד הריח מתמלא'
                      : 'Use virtual pestle to grind until aroma bar fills'
                    }
                  </p>
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <p className="text-sm text-amber-800">
                      {isHebrew 
                        ? 'בית אבטינס שמר על מתכוני הקטורת - סירובם ללמד אחרים כמעט עלה להם בתפקידם'
                        : 'Bet Avtinas guarded ketoret recipes – refusal to teach others almost cost them their role'
                      }
                    </p>
                  </div>
                </div>

                {/* Grinding Interface */}
                <div className="text-center">
                  <div className="mb-6">
                    <div className="text-6xl mb-4">🥣</div>
                    <button
                      onClick={handleGrinding}
                      className="bg-amber-600 text-white px-8 py-4 rounded-lg hover:bg-amber-700 transition-colors text-lg"
                      disabled={grindingProgress >= 100}
                    >
                      {isHebrew ? 'טחן' : 'Grind'}
                    </button>
                  </div>

                  {/* Progress Bar */}
                  <div className="max-w-md mx-auto mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span>{isHebrew ? 'ריח' : 'Aroma'}</span>
                      <span>{grindingProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div 
                        className="bg-gradient-to-r from-amber-400 to-orange-500 h-4 rounded-full transition-all duration-300" 
                        style={{ width: `${grindingProgress}%` }}
                      ></div>
                    </div>
                  </div>

                  {grindingProgress >= 100 && (
                    <button
                      onClick={() => setCurrentStep(3)}
                      className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      {isHebrew ? 'המשך להוספת מעלה עשן' : "Continue to Add Ma'aleh Ashan"}
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Ma'aleh Ashan */}
            {currentStep === 3 && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold mb-4">
                    {isHebrew ? 'שלב 3: הוסף מעלה עשן' : "Step 3: Add Ma'aleh Ashan"}
                  </h2>
                  <p className="text-gray-600">
                    {isHebrew 
                      ? 'בחר את עשב העישון הנכון מהרשימה'
                      : 'Choose the right smoke-making herb from the list'
                    }
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8">
                  {smokeHerbs.map((herb) => (
                    <button
                      key={herb.id}
                      onClick={() => handleSmokeHerbSelect(herb.id)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedSmokeHerb === herb.id
                          ? herb.correct 
                            ? 'bg-green-100 border-green-300'
                            : 'bg-red-100 border-red-300'
                          : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {herb.name}
                    </button>
                  ))}
                </div>

                {selectedSmokeHerb === 'ma-aleh-ashan' && (
                  <div className="text-center">
                    <div className="text-6xl mb-4">💨</div>
                    <div className="bg-green-50 p-4 rounded-lg mb-4">
                      <p className="text-green-800">
                        {isHebrew 
                          ? 'ויקרא מציין עליית קטורת ישרה'
                          : 'Leviticus notes straight incense ascent'
                        }
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Golden Altar */}
            {currentStep === 4 && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold mb-4">
                    {isHebrew ? 'שלב 4: הקטרה על מזבח הזהב' : 'Step 4: Burn on Golden Altar'}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {isHebrew 
                      ? 'העבר לסצנת מזבח הקטורת הזהב בהיכל'
                      : 'Switch scene to golden incense altar in Sanctuary'
                    }
                  </p>
                </div>

                <div className="text-center">
                  <div className="text-8xl mb-6">🔥</div>
                  <div className="bg-gradient-to-t from-amber-100 to-yellow-50 p-6 rounded-lg mb-6">
                    <div className="text-4xl mb-4">✨💨✨</div>
                    <p className="text-amber-800 italic">
                      {isHebrew 
                        ? '"והיתה לכם לקדש קדשים..." (שמות ל:לח)'
                        : '"It shall be unto you most holy..." (Exodus 30:38)'
                      }
                    </p>
                  </div>

                  <button
                    onClick={completeIncenseRitual}
                    className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors text-lg"
                  >
                    {isHebrew ? 'השלם את הטקס' : 'Complete Ritual'}
                  </button>
                </div>
              </div>
            )}

            {/* Badges Display */}
            {badges.filter(b => b.earned).length > 0 && (
              <div className="fixed bottom-4 left-4 bg-white rounded-lg shadow-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="text-yellow-500" size={20} />
                  <span className="font-semibold">{isHebrew ? 'תגים' : 'Badges'}</span>
                </div>
                {badges.filter(b => b.earned).map((badge) => (
                  <div key={badge.id} className="bg-yellow-50 p-2 rounded text-sm mb-2">
                    {badge.icon} {badge.name}
                  </div>
                ))}
                <button
                  onClick={() => setShowBadgePanel(true)}
                  className="text-xs text-blue-600 hover:underline mt-2"
                >
                  {isHebrew ? 'הצג את כל התגים' : 'View All Badges'}
                </button>
                {badges.find(b => b.id === 'ketoret-apprentice' && b.earned) && (
                  <div className="bg-blue-50 p-2 rounded text-xs mt-2">
                    {isHebrew 
                      ? 'עובדה מעניינת: קטורת מוקרבת בוקר וערב; כהן גדול מוסיף נוספת ביום הכיפורים'
                      : 'Fun fact: Incense offered morning & afternoon; Kohen Gadol added extra on Yom Kippur'
                    }
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Toast Notification */}
          {showToast && (
            <Toast
              message={toastMessage}
              badge="Ketoret Apprentice"
              onClose={handleCloseToast}
              onViewBadge={handleViewBadge}
              autoCloseDelay={5000}
            />
          )}

          {/* Badge Panel */}
          <BadgePanel
            isOpen={showBadgePanel}
            onClose={() => setShowBadgePanel(false)}
            badges={badges}
            isHebrew={isHebrew}
          />
        </div>
      )}
    </div>
  );
}

export default Temple3D;