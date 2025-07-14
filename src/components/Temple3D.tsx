import React, { useState } from 'react';
import { Crown, Flame, Music, Award, Eye, Lightbulb, Sparkles, ArrowLeft, ExternalLink, Info } from 'lucide-react';

interface Avatar {
  id: string;
  name: string;
  hebrewName: string;
  image: string;
  description: string;
  hebrewDescription: string;
  tooltip: string;
  hebrewTooltip: string;
  zone: string;
  hebrewZone: string;
  sanctityLevel: number;
  activities: string[];
  stats: {
    purity: number;
    knowledge: number;
    experience: number;
  };
}

interface Activity {
  id: string;
  name: string;
  hebrewName: string;
  description: string;
  hebrewDescription: string;
  artifact: string;
  difficulty: number;
  badge: string;
  fact: string;
  hebrewFact: string;
  requiredRoles: string[];
  interactiveElements: string[];
}

interface Badge {
  id: string;
  name: string;
  hebrewName: string;
  icon: string;
  earned: boolean;
  description: string;
}

function Temple3D() {
  const [isHebrew, setIsHebrew] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskProgress, setTaskProgress] = useState(0);
  const [showTempleInstituteModal, setShowTempleInstituteModal] = useState(false);
  const [purityLevel, setPurityLevel] = useState(100);
  const [sanctityAccess, setSanctityAccess] = useState(1);
  const [badges, setBadges] = useState<Badge[]>([
    { 
      id: 'menorah', 
      name: 'Menorah Mastery', 
      hebrewName: 'מומחה המנורה', 
      icon: '🕯️', 
      earned: false,
      description: 'Successfully assembled the golden menorah with all 42 decorations'
    },
    { 
      id: 'incense', 
      name: 'Incense Expert', 
      hebrewName: 'מומחה הקטורת', 
      icon: '💨', 
      earned: false,
      description: 'Mixed the 11 sacred spices in perfect proportions'
    },
    { 
      id: 'blessing', 
      name: 'Blessing Master', 
      hebrewName: 'מומחה הברכה', 
      icon: '🙏', 
      earned: false,
      description: 'Performed the Priestly Blessing with proper hand positions'
    },
    { 
      id: 'chant', 
      name: 'Temple Musician', 
      hebrewName: 'נגן המקדש', 
      icon: '🎵', 
      earned: false,
      description: 'Led the daily psalm with musical accompaniment'
    }
  ]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [menorahKnobs, setMenorahKnobs] = useState([false, false, false, false, false, false, false]);
  const [incenseSpices, setIncenseSpices] = useState<number[]>([]);

  const avatars: Avatar[] = [
    {
      id: 'young-kohen',
      name: 'Young Kohen',
      hebrewName: 'כהן צעיר',
      image: '👨‍🦳',
      description: 'Regular priest responsible for daily Temple duties',
      hebrewDescription: 'כהן רגיל האחראי על עבודות המקדש היומיות',
      tooltip: 'Young Kohen – Responsible for menorah, incense duties.',
      hebrewTooltip: 'כהן צעיר - אחראי על המנורה ועבודות הקטורת.',
      zone: 'Inner Courtyard',
      hebrewZone: 'חצר פנימית',
      sanctityLevel: 2,
      activities: ['inspect-menorah', 'prepare-incense'],
      stats: { purity: 85, knowledge: 70, experience: 60 }
    },
    {
      id: 'kohen-gadol',
      name: 'High Priest (Kohen Gadol)',
      hebrewName: 'כהן גדול',
      image: '👴',
      description: 'Supreme spiritual leader with access to Holy of Holies',
      hebrewDescription: 'מנהיג רוחני עליון עם גישה לקודש הקדשים',
      tooltip: 'High Priest – Leads on Yom Kippur, offers Priestly Blessing.',
      hebrewTooltip: 'כהן גדול - מוביל ביום הכיפורים, נותן ברכת כהנים.',
      zone: 'Sanctuary / Holy of Holies',
      hebrewZone: 'היכל / קודש הקדשים',
      sanctityLevel: 3,
      activities: ['inspect-menorah', 'prepare-incense', 'lead-blessing'],
      stats: { purity: 100, knowledge: 95, experience: 90 }
    },
    {
      id: 'levite',
      name: 'Levite (Temple Musician)',
      hebrewName: 'לוי (נגן המקדש)',
      image: '🎭',
      description: 'Sacred musician leading Temple chants and ceremonies',
      hebrewDescription: 'נגן קדוש המוביל זמירות וטקסים במקדש',
      tooltip: 'Levite – Performs daily chants and trumpet fanfare.',
      hebrewTooltip: 'לוי - מבצע זמירות יומיות ותקיעות חצוצרה.',
      zone: "Court of Israel's Musical Platform",
      hebrewZone: 'דוכן המוזיקה בעזרת ישראל',
      sanctityLevel: 1,
      activities: ['perform-chant'],
      stats: { purity: 80, knowledge: 75, experience: 85 }
    }
  ];

  const activities: Activity[] = [
    {
      id: 'inspect-menorah',
      name: 'Inspect Menorah',
      hebrewName: 'בדיקת המנורה',
      description: '7 branches, crafted from one solid gold piece, decorated with 42 almond-style knobs',
      hebrewDescription: '7 קנים, מעוצבת מחתיכת זהב אחת, מקושטת ב-42 כפתורים בסגנון שקד',
      artifact: '🕯️',
      difficulty: 2,
      badge: 'menorah',
      fact: 'The western lamp remains lit continuously—from evening through the night. Every morning, Kohanim used tongs and an ash-tray to clean the lamps on the second stair.',
      hebrewFact: 'הנר המערבי נשאר דולק ברציפות - מהערב עד הלילה. כל בוקר, הכהנים השתמשו במלקחיים ובמגש אפר לניקוי הנרות במדרגה השנייה.',
      requiredRoles: ['young-kohen', 'kohen-gadol'],
      interactiveElements: ['knobs', 'flame', 'cleaning']
    },
    {
      id: 'prepare-incense',
      name: 'Prepare Incense',
      hebrewName: 'הכנת הקטורת',
      description: 'Mix 11 sacred spices in precise proportions for the daily offering',
      hebrewDescription: 'ערבוב 11 בשמים קדושים ביחסים מדויקים לקרבן היומי',
      artifact: '💨',
      difficulty: 3,
      badge: 'incense',
      fact: 'The incense contained 11 spices including frankincense, myrrh, and saffron. It was prepared according to ancient formulas passed down through generations.',
      hebrewFact: 'הקטורת הכילה 11 בשמים כולל לבונה, מור וכרכום. היא הוכנה לפי נוסחאות עתיקות שהועברו דרך הדורות.',
      requiredRoles: ['young-kohen', 'kohen-gadol'],
      interactiveElements: ['spices', 'mixing', 'proportions']
    },
    {
      id: 'lead-blessing',
      name: 'Lead Priestly Blessing',
      hebrewName: 'הובלת ברכת כהנים',
      description: 'Perform the ancient Priestly Blessing with proper hand positions',
      hebrewDescription: 'ביצוע ברכת כהנים העתיקה עם מיקום ידיים נכון',
      artifact: '🙏',
      difficulty: 4,
      badge: 'blessing',
      fact: 'The Priestly Blessing was performed daily after the morning sacrifice. The priests would raise their hands in a specific formation while reciting the three-fold blessing.',
      hebrewFact: 'ברכת כהנים בוצעה מדי יום לאחר קרבן השחר. הכהנים היו מרימים את ידיהם בצורה מיוחדת תוך כדי אמירת הברכה המשולשת.',
      requiredRoles: ['kohen-gadol'],
      interactiveElements: ['hand-positions', 'blessing-text', 'timing']
    },
    {
      id: 'perform-chant',
      name: 'Perform Levite Chant',
      hebrewName: 'ביצוע זמירת הלויים',
      description: 'Lead the daily psalm with musical accompaniment and trumpet fanfare',
      hebrewDescription: 'הובלת המזמור היומי עם ליווי מוזיקלי ותקיעות חצוצרה',
      artifact: '🎵',
      difficulty: 2,
      badge: 'chant',
      fact: 'Levites sang different psalms for each day of the week during the daily offering. They used various instruments including harps, lyres, and silver trumpets.',
      hebrewFact: 'הלויים שרו מזמורים שונים לכל יום בשבוע במהלך הקרבן היומי. הם השתמשו בכלי נגינה שונים כולל נבלים, כנורות וחצוצרות כסף.',
      requiredRoles: ['levite'],
      interactiveElements: ['psalm-selection', 'instruments', 'timing']
    }
  ];

  const handleAvatarSelect = (avatar: Avatar) => {
    setSelectedAvatar(avatar);
    setSanctityAccess(avatar.sanctityLevel);
    setPurityLevel(avatar.stats.purity);
  };

  const handleActivitySelect = (activityId: string) => {
    const activity = activities.find(a => a.id === activityId);
    if (activity && selectedAvatar && activity.requiredRoles.includes(selectedAvatar.id)) {
      setCurrentActivity(activity);
      setShowTaskModal(true);
      setTaskProgress(0);
      // Reset interactive elements
      setMenorahKnobs([false, false, false, false, false, false, false]);
      setIncenseSpices([]);
    }
  };

  const handleMenorahKnob = (index: number) => {
    const newKnobs = [...menorahKnobs];
    newKnobs[index] = true;
    setMenorahKnobs(newKnobs);
    
    const completedKnobs = newKnobs.filter(Boolean).length;
    setTaskProgress((completedKnobs / 7) * 100);
  };

  const handleSpiceMix = (spiceIndex: number) => {
    if (incenseSpices.length < 11 && !incenseSpices.includes(spiceIndex)) {
      const newSpices = [...incenseSpices, spiceIndex];
      setIncenseSpices(newSpices);
      setTaskProgress((newSpices.length / 11) * 100);
    }
  };

  const completeTask = () => {
    if (currentActivity) {
      setCompletedTasks([...completedTasks, currentActivity.id]);
      setBadges(badges.map(badge => 
        badge.id === currentActivity.badge 
          ? { ...badge, earned: true }
          : badge
      ));
      setShowTaskModal(false);
      setCurrentActivity(null);
    }
  };

  // Avatar Selection Screen
  if (!selectedAvatar) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6 shadow-lg">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className={`text-center flex-1 ${isHebrew ? 'font-hebrew' : ''}`} dir={isHebrew ? 'rtl' : 'ltr'}>
              <h1 className="text-4xl font-bold mb-2">
                {isHebrew ? 'כניסה לבית המקדש' : 'Temple Entrance'}
              </h1>
              <p className="text-xl opacity-90">
                {isHebrew ? 'בחירת אווטר ומשימה ראשונה' : 'Avatar Selection & First Interactive Task'}
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowTempleInstituteModal(true)}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-all duration-200 font-semibold flex items-center gap-2"
              >
                <Info size={20} />
                {isHebrew ? 'למד עוד' : 'Learn More'}
              </button>
              <button
                onClick={() => setIsHebrew(!isHebrew)}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-all duration-200 font-semibold"
              >
                {isHebrew ? 'English' : 'עברית'}
              </button>
            </div>
          </div>
        </div>

        {/* Avatar Selection */}
        <div className="max-w-6xl mx-auto p-6">
          <div className={`text-center mb-8 ${isHebrew ? 'font-hebrew' : ''}`} dir={isHebrew ? 'rtl' : 'ltr'}>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {isHebrew ? 'בחר את האווטר שלך' : 'Choose Your Avatar'}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {isHebrew 
                ? 'כל אווטר מציע חוויה ייחודית עם גישה לאזורים שונים במקדש ופעילויות מיוחדות.'
                : 'Each avatar offers a unique experience with access to different Temple zones and special activities.'
              }
            </p>
          </div>

          {/* Avatar Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {avatars.map((avatar) => (
              <div
                key={avatar.id}
                className="bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105"
                onClick={() => handleAvatarSelect(avatar)}
                dir={isHebrew ? 'rtl' : 'ltr'}
              >
                {/* Avatar Image */}
                <div className="text-center mb-4">
                  <div className="text-6xl mb-3">{avatar.image}</div>
                  <h3 className={`text-xl font-bold mb-2 ${isHebrew ? 'font-hebrew' : ''}`}>
                    {isHebrew ? avatar.hebrewName : avatar.name}
                  </h3>
                  <p className={`text-sm text-gray-600 mb-4 ${isHebrew ? 'font-hebrew' : ''}`}>
                    {isHebrew ? avatar.hebrewDescription : avatar.description}
                  </p>
                </div>

                {/* Tooltip */}
                <div className="bg-amber-50 p-3 rounded-lg mb-4">
                  <p className={`text-sm font-medium ${isHebrew ? 'font-hebrew' : ''}`}>
                    {isHebrew ? avatar.hebrewTooltip : avatar.tooltip}
                  </p>
                </div>

                {/* Stats */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className={`text-xs ${isHebrew ? 'font-hebrew' : ''}`}>
                      {isHebrew ? 'טהרה' : 'Purity'}
                    </span>
                    <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${avatar.stats.purity}%` }}
                      ></div>
                    </div>
                    <span className="text-xs">{avatar.stats.purity}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`text-xs ${isHebrew ? 'font-hebrew' : ''}`}>
                      {isHebrew ? 'ידע' : 'Knowledge'}
                    </span>
                    <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${avatar.stats.knowledge}%` }}
                      ></div>
                    </div>
                    <span className="text-xs">{avatar.stats.knowledge}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`text-xs ${isHebrew ? 'font-hebrew' : ''}`}>
                      {isHebrew ? 'ניסיון' : 'Experience'}
                    </span>
                    <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full"
                        style={{ width: `${avatar.stats.experience}%` }}
                      ></div>
                    </div>
                    <span className="text-xs">{avatar.stats.experience}%</span>
                  </div>
                </div>

                {/* Zone Access */}
                <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-3 rounded-lg mb-4">
                  <p className={`text-xs font-semibold mb-1 ${isHebrew ? 'font-hebrew' : ''}`}>
                    {isHebrew ? 'גישה לאזור:' : 'Zone Access:'}
                  </p>
                  <p className={`text-sm ${isHebrew ? 'font-hebrew' : ''}`}>
                    {isHebrew ? avatar.hebrewZone : avatar.zone}
                  </p>
                  <div className="flex items-center mt-2">
                    <span className={`text-xs mr-2 ${isHebrew ? 'font-hebrew' : ''}`}>
                      {isHebrew ? 'רמת קדושה:' : 'Sanctity Level:'}
                    </span>
                    <div className="flex">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-3 h-3 rounded-full mr-1 ${
                            i < avatar.sanctityLevel ? 'bg-yellow-400' : 'bg-gray-300'
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Select Button */}
                <button className={`w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-200 ${isHebrew ? 'font-hebrew' : ''}`}>
                  {isHebrew ? 'בחר אווטר זה' : 'Select This Avatar'}
                </button>
              </div>
            ))}
          </div>

          {/* Temple Institute Link */}
          <div className="text-center mt-12">
            <button
              onClick={() => setShowTempleInstituteModal(true)}
              className={`inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold ${isHebrew ? 'font-hebrew' : ''}`}
            >
              <ExternalLink size={20} />
              {isHebrew ? 'למד עוד במכון המקדש' : 'Learn More at Temple Institute'}
            </button>
          </div>
        </div>

        {/* Temple Institute Modal */}
        {showTempleInstituteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 shadow-2xl">
              <div className={`text-center ${isHebrew ? 'font-hebrew' : ''}`} dir={isHebrew ? 'rtl' : 'ltr'}>
                <h2 className="text-3xl font-bold mb-4">
                  {isHebrew ? 'מכון המקדש' : 'Temple Institute'}
                </h2>
                <p className="text-gray-600 mb-6">
                  {isHebrew 
                    ? 'למד עוד על בית המקדש, כלי הקודש והעבודה הקדושה מהמקור הרשמי.'
                    : 'Learn more about the Temple, sacred vessels, and holy service from the official source.'
                  }
                </p>
                <div className="space-y-4 mb-6">
                  <a
                    href="https://templeinstitute.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {isHebrew ? 'בקר באתר מכון המקדש' : 'Visit Temple Institute Website'}
                  </a>
                  <p className="text-sm text-gray-500">
                    {isHebrew 
                      ? 'האתר יפתח בחלון חדש'
                      : 'Website will open in a new window'
                    }
                  </p>
                </div>
                <button
                  onClick={() => setShowTempleInstituteModal(false)}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  {isHebrew ? 'סגור' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Main Temple Experience
  const availableActivities = activities.filter(a => 
    selectedAvatar && a.requiredRoles.includes(selectedAvatar.id)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Header with HUD */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-4 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => setSelectedAvatar(null)}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-all duration-200 font-semibold flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              {isHebrew ? 'חזור לבחירת אווטר' : 'Back to Avatar Selection'}
            </button>
            
            <div className={`text-center flex-1 ${isHebrew ? 'font-hebrew' : ''}`} dir={isHebrew ? 'rtl' : 'ltr'}>
              <h1 className="text-2xl font-bold">
                {isHebrew ? selectedAvatar.hebrewName : selectedAvatar.name}
              </h1>
              <p className="text-sm opacity-90">
                {isHebrew ? selectedAvatar.hebrewZone : selectedAvatar.zone}
              </p>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setShowTempleInstituteModal(true)}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-2 rounded-lg transition-all duration-200"
              >
                <Info size={16} />
              </button>
              <button
                onClick={() => setIsHebrew(!isHebrew)}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-all duration-200 font-semibold"
              >
                {isHebrew ? 'EN' : 'עב'}
              </button>
            </div>
          </div>
          
          {/* HUD - Purity Meter and Sanctity Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <span className={`text-sm font-semibold ${isHebrew ? 'font-hebrew' : ''}`}>
                  {isHebrew ? 'מד טהרה' : 'Purity Meter'}
                </span>
                <span className="text-sm">{purityLevel}%</span>
              </div>
              <div className="bg-white bg-opacity-30 rounded-full h-2">
                <div 
                  className="bg-blue-300 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${purityLevel}%` }}
                ></div>
              </div>
            </div>
            
            <div className="bg-white bg-opacity-20 rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <span className={`text-sm font-semibold ${isHebrew ? 'font-hebrew' : ''}`}>
                  {isHebrew ? 'רמת קדושה' : 'Sanctity Level'}
                </span>
                <span className="text-sm">{sanctityAccess}/3</span>
              </div>
              <div className="bg-white bg-opacity-30 rounded-full h-2">
                <div 
                  className="bg-yellow-300 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(sanctityAccess / 3) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Temple Environment */}
      <div className="max-w-6xl mx-auto p-6">
        {/* Zone Display */}
        <div className="bg-gradient-to-b from-sky-200 to-amber-100 rounded-xl p-8 mb-6 shadow-lg relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent"></div>
          </div>
          
          <div className={`text-center mb-6 relative z-10 ${isHebrew ? 'font-hebrew' : ''}`} dir={isHebrew ? 'rtl' : 'ltr'}>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {isHebrew ? selectedAvatar.hebrewZone : selectedAvatar.zone}
            </h2>
            <p className="text-lg text-gray-600">
              {isHebrew ? 'בחר פעילות לביצוע' : 'Choose an activity to perform'}
            </p>
          </div>
          
          {/* 3D Environment Representation */}
          <div className="relative bg-gradient-to-t from-amber-200 to-amber-100 rounded-lg p-8 mb-6 min-h-64">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 rounded-lg"></div>
            <div className="relative z-10 flex justify-center items-center h-full">
              <div className="text-8xl opacity-80 animate-pulse">
                {selectedAvatar.image}
              </div>
            </div>
            
            {/* Activity Overlay Menu (top-right corner) */}
            <div className="absolute top-4 right-4 space-y-2">
              {availableActivities.map(activity => (
                <button
                  key={activity.id}
                  onClick={() => handleActivitySelect(activity.id)}
                  className={`block bg-white bg-opacity-80 hover:bg-opacity-100 p-3 rounded-lg shadow-md transition-all duration-200 text-2xl ${
                    completedTasks.includes(activity.id) ? 'ring-2 ring-green-400' : ''
                  }`}
                  title={isHebrew ? activity.hebrewName : activity.name}
                >
                  {activity.artifact}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {availableActivities.map(activity => (
            <div
              key={activity.id}
              className={`bg-white rounded-xl shadow-md p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                completedTasks.includes(activity.id) ? 'border-2 border-green-400 bg-green-50' : ''
              }`}
              onClick={() => handleActivitySelect(activity.id)}
              dir={isHebrew ? 'rtl' : 'ltr'}
            >
              <div className="text-center">
                <div className="text-4xl mb-3">{activity.artifact}</div>
                <h3 className={`text-xl font-bold mb-2 ${isHebrew ? 'font-hebrew' : ''}`}>
                  {isHebrew ? activity.hebrewName : activity.name}
                </h3>
                <p className={`text-sm text-gray-600 mb-4 ${isHebrew ? 'font-hebrew' : ''}`}>
                  {isHebrew ? activity.hebrewDescription : activity.description}
                </p>
                
                {/* Difficulty Indicator */}
                <div className="flex justify-center items-center gap-2 mb-4">
                  <span className={`text-xs ${isHebrew ? 'font-hebrew' : ''}`}>
                    {isHebrew ? 'קושי:' : 'Difficulty:'}
                  </span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full mr-1 ${
                          i < activity.difficulty ? 'bg-orange-400' : 'bg-gray-300'
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
                
                {completedTasks.includes(activity.id) ? (
                  <div className={`text-green-600 font-semibold ${isHebrew ? 'font-hebrew' : ''}`}>
                    ✓ {isHebrew ? 'הושלם' : 'Completed'}
                  </div>
                ) : (
                  <div className={`text-blue-600 font-semibold ${isHebrew ? 'font-hebrew' : ''}`}>
                    {isHebrew ? 'לחץ לביצוע' : 'Click to Perform'}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Achievement Sidebar */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className={`text-xl font-bold mb-4 ${isHebrew ? 'font-hebrew' : ''}`} dir={isHebrew ? 'rtl' : 'ltr'}>
            {isHebrew ? 'הישגים' : 'Achievements'}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {badges.map(badge => (
              <div
                key={badge.id}
                className={`text-center p-4 rounded-lg transition-all duration-300 ${
                  badge.earned 
                    ? 'bg-green-100 border-2 border-green-400' 
                    : 'bg-gray-100 opacity-50'
                }`}
                dir={isHebrew ? 'rtl' : 'ltr'}
              >
                <div className="text-3xl mb-2">{badge.icon}</div>
                <h4 className={`text-sm font-semibold mb-1 ${isHebrew ? 'font-hebrew' : ''}`}>
                  {isHebrew ? badge.hebrewName : badge.name}
                </h4>
                {badge.earned && (
                  <div className={`text-xs text-green-600 font-medium ${isHebrew ? 'font-hebrew' : ''}`}>
                    {isHebrew ? 'הושג!' : 'Earned!'}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Task Modal */}
      {showTaskModal && currentActivity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-4xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className={`text-center ${isHebrew ? 'font-hebrew' : ''}`} dir={isHebrew ? 'rtl' : 'ltr'}>
              <div className="text-6xl mb-4">{currentActivity.artifact}</div>
              <h2 className="text-3xl font-bold mb-2">
                {isHebrew ? currentActivity.hebrewName : currentActivity.name}
              </h2>
              <p className="text-gray-600 mb-6">
                {isHebrew ? currentActivity.hebrewDescription : currentActivity.description}
              </p>
              
              {/* Interactive Task Area */}
              <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-8 rounded-lg mb-6">
                <h3 className="text-xl font-semibold mb-6">
                  {isHebrew ? 'משימה אינטראקטיבית' : 'Interactive Task'}
                </h3>
                
                {/* Menorah Task */}
                {currentActivity.id === 'inspect-menorah' && (
                  <div className="space-y-6">
                    <p className="text-sm mb-4">
                      {isHebrew 
                        ? 'לחץ על כל אחד מ-7 הכפתורים בצורת שקד כדי להרכיב את המנורה הזהב'
                        : 'Click each of the 7 almond-shaped knobs to assemble the golden menorah'
                      }
                    </p>
                    <div className="flex justify-center items-center space-x-2">
                      {menorahKnobs.map((completed, i) => (
                        <button
                          key={i}
                          onClick={() => handleMenorahKnob(i)}
                          disabled={completed}
                          className={`w-12 h-12 rounded-full transition-all duration-300 ${
                            completed 
                              ? 'bg-yellow-400 shadow-lg transform scale-110' 
                              : 'bg-yellow-200 hover:bg-yellow-300 cursor-pointer'
                          }`}
                        >
                          {completed ? '🕯️' : '○'}
                        </button>
                      ))}
                    </div>
                    {taskProgress === 100 && (
                      <div className="text-4xl animate-bounce">🔥</div>
                    )}
                  </div>
                )}
                
                {/* Incense Task */}
                {currentActivity.id === 'prepare-incense' && (
                  <div className="space-y-6">
                    <p className="text-sm mb-4">
                      {isHebrew 
                        ? 'בחר 11 בשמים שונים ברצף הנכון להכנת הקטורת'
                        : 'Select 11 different spices in the correct sequence to prepare the incense'
                      }
                    </p>
                    <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
                      {['🌿', '🌸', '🍯', '🧂', '🌰', '🌾', '🌹', '🍃', '🌺', '🌻', '🌷', '🌼'].map((spice, i) => (
                        <button
                          key={i}
                          onClick={() => handleSpiceMix(i)}
                          disabled={incenseSpices.includes(i)}
                          className={`w-16 h-16 rounded-lg transition-all duration-300 ${
                            incenseSpices.includes(i)
                              ? 'bg-green-200 border-2 border-green-400'
                              : 'bg-amber-200 hover:bg-amber-300 cursor-pointer'
                          }`}
                        >
                          {spice}
                        </button>
                      ))}
                    </div>
                    <div className="text-sm">
                      {isHebrew ? 'נבחרו:' : 'Selected:'} {incenseSpices.length}/11
                    </div>
                  </div>
                )}
                
                {/* Progress Bar */}
                <div className="mt-6">
                  <div className="bg-gray-200 rounded-full h-3 mb-2">
                    <div 
                      className="bg-green-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${taskProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {isHebrew ? 'התקדמות' : 'Progress'}: {Math.round(taskProgress)}%
                  </p>
                </div>
                
                {taskProgress === 100 && (
                  <div className="mt-6">
                    <div className="text-green-600 mb-4 text-xl">
                      <Sparkles className="inline mr-2" />
                      {isHebrew ? 'משימה הושלמה בהצלחה!' : 'Task Completed Successfully!'}
                    </div>
                    <button
                      onClick={completeTask}
                      className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold"
                    >
                      {isHebrew ? 'קבל תג הישג' : 'Claim Achievement Badge'}
                    </button>
                  </div>
                )}
              </div>
              
              {/* Educational Fact */}
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h4 className="font-semibold mb-3 text-lg">
                  {isHebrew ? 'עובדה מעניינת מהמקורות:' : 'Fascinating Fact from Sources:'}
                </h4>
                <p className="text-sm leading-relaxed">
                  {isHebrew ? currentActivity.hebrewFact : currentActivity.fact}
                </p>
                <div className="mt-4">
                  <a
                    href="https://templeinstitute.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    <ExternalLink size={16} />
                    {isHebrew ? 'למד עוד במכון המקדש' : 'Learn more at Temple Institute'}
                  </a>
                </div>
              </div>
              
              {/* Reminder Popup */}
              {taskProgress === 100 && currentActivity.id === 'inspect-menorah' && (
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
                  <p className={`text-sm text-yellow-800 ${isHebrew ? 'font-hebrew' : ''}`}>
                    {isHebrew 
                      ? 'תזכורת: אסוף שמן זית ופתילות מחר בבוקר לעבודת ההדלקה.'
                      : 'Reminder: Collect olive oil & wicks tomorrow morning for lighting duty.'
                    }
                  </p>
                </div>
              )}
              
              <button
                onClick={() => setShowTaskModal(false)}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                {isHebrew ? 'סגור' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Temple Institute Modal */}
      {showTempleInstituteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 shadow-2xl">
            <div className={`text-center ${isHebrew ? 'font-hebrew' : ''}`} dir={isHebrew ? 'rtl' : 'ltr'}>
              <h2 className="text-3xl font-bold mb-4">
                {isHebrew ? 'מכון המקדש' : 'Temple Institute'}
              </h2>
              <p className="text-gray-600 mb-6">
                {isHebrew 
                  ? 'למד עוד על בית המקדש, כלי הקודש והעבודה הקדושה מהמקור הרשמי. האתר מכיל מידע מפורט על כל היבטי עבודת המקדש.'
                  : 'Learn more about the Temple, sacred vessels, and holy service from the official source. The site contains detailed information about all aspects of Temple service.'
                }
              </p>
              <div className="space-y-4 mb-6">
                <a
                  href="https://templeinstitute.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  {isHebrew ? 'בקר באתר מכון המקדש' : 'Visit Temple Institute Website'}
                </a>
                <p className="text-sm text-gray-500">
                  {isHebrew 
                    ? 'האתר יפתח בחלון חדש ויספק מידע מקיף על המקדש'
                    : 'Website will open in a new window with comprehensive Temple information'
                  }
                </p>
              </div>
              <button
                onClick={() => setShowTempleInstituteModal(false)}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                {isHebrew ? 'סגור' : 'Close'}
              </button>
            </div>
          </div>
        )}
      )}
    </div>
  );
}

export default Temple3D;