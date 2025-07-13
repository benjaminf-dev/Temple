import React, { useState } from 'react';
import { Crown, Flame, Music, Droplets, Wheat, Sun } from 'lucide-react';
import TempleActivityCard from './TempleActivityCard';

function CharacterSelection() {
  const [isHebrew, setIsHebrew] = useState(false);

  const activities = [
    {
      icon: "🎵",
      title: isHebrew ? "שיר של יום" : "Shir Shel Yom",
      subtitle: isHebrew ? "שיר יומי של הלויים" : "Daily Song of the Levites",
      info: isHebrew ? 
        "הלויים שרו שיר מיוחד כל יום בבית המקדש. כל יום היה לו תהילים משלו שהתאים לאופי היום ולמשמעותו הרוחנית." :
        "The Levites sang a special song each day in the Temple. Each day had its own psalm that matched the character and spiritual significance of that day.",
      color: "bg-blue-100"
    },
    {
      icon: "🔥",
      title: isHebrew ? "הקטרת קטורת" : "Incense Offering",
      subtitle: isHebrew ? "הקטרת הסמים הקדושים" : "Burning of Sacred Spices",
      info: isHebrew ? 
        "הקטורת הייתה תערובת של 11 סמים קדושים שהוקטרה פעמיים ביום - בבוקר ובערב. הריח הנעים עלה לשמים כסמל לתפילות העם." :
        "The incense was a mixture of 11 sacred spices burned twice daily - morning and evening. The pleasant aroma rose to heaven as a symbol of the people's prayers.",
      color: "bg-purple-100"
    },
    {
      icon: "💧",
      title: isHebrew ? "טהרה ריטואלית" : "Ritual Purity",
      subtitle: isHebrew ? "הכנה רוחנית לעבודה" : "Spiritual Preparation for Service",
      info: isHebrew ? 
        "הכהנים והלויים היו צריכים לעבור טקסי טהרה מיוחדים לפני כל עבודה בבית המקדש. זה כלל רחיצה במקווה ולבישת בגדי קודש." :
        "The priests and Levites had to undergo special purification rituals before any Temple service. This included immersion in a mikveh and wearing sacred garments.",
      color: "bg-cyan-100"
    },
    {
      icon: "🌾",
      title: isHebrew ? "מנחת התמיד" : "Daily Meal Offering",
      subtitle: isHebrew ? "קרבן הקמח והשמן" : "Flour and Oil Sacrifice",
      info: isHebrew ? 
        "מנחת התמיד הייתה קרבן יומי של קמח דק מעורב בשמן זית וליבונה. היא הוקרבה יחד עם קרבן העולה כסמל לתודה ולהכרת הטוב." :
        "The daily meal offering was a daily sacrifice of fine flour mixed with olive oil and frankincense. It was offered together with the burnt offering as a symbol of gratitude and thanksgiving.",
      color: "bg-amber-100"
    },
    {
      icon: "☀️",
      title: isHebrew ? "הדלקת המנורה" : "Lighting the Menorah",
      subtitle: isHebrew ? "הדלקת נרות הזהב" : "Lighting the Golden Lamps",
      info: isHebrew ? 
        "המנורה הזהב הייתה מוארת תמיד בבית המקדש. הכהנים היו מדליקים ומכבים את הנרות בזמנים קבועים, ומוודאים שהאור לא יכבה לעולם." :
        "The golden menorah was always lit in the Temple. The priests would light and extinguish the lamps at set times, ensuring that the light would never go out completely.",
      color: "bg-yellow-100"
    },
    {
      icon: "👑",
      title: isHebrew ? "ברכת כהנים" : "Priestly Blessing",
      subtitle: isHebrew ? "ברכה לעם ישראל" : "Blessing for the People of Israel",
      info: isHebrew ? 
        "הכהנים היו מברכים את העם בברכה המיוחדת: 'יברכך ה' וישמרך, יאר ה' פניו אליך ויחנך, ישא ה' פניו אליך וישם לך שלום'." :
        "The priests would bless the people with the special blessing: 'May the Lord bless you and keep you, may the Lord make His face shine upon you and be gracious to you, may the Lord lift up His face to you and give you peace'.",
      color: "bg-indigo-100"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className={`text-center flex-1 ${isHebrew ? 'font-hebrew' : ''}`} dir={isHebrew ? 'rtl' : 'ltr'}>
            <h1 className="text-4xl font-bold mb-2">
              {isHebrew ? 'בית המקדש השני' : 'The Second Temple'}
            </h1>
            <p className="text-xl opacity-90">
              {isHebrew ? 'משחק תפקידים של עבודה קדושה' : 'Sacred Service RPG'}
            </p>
          </div>
          <button
            onClick={() => setIsHebrew(!isHebrew)}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-all duration-200 font-semibold"
          >
            {isHebrew ? 'English' : 'עברית'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        <div className={`text-center mb-8 ${isHebrew ? 'font-hebrew' : ''}`} dir={isHebrew ? 'rtl' : 'ltr'}>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {isHebrew ? 'בחר את התפקיד שלך' : 'Choose Your Role'}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {isHebrew 
              ? 'גלה את עולם העבודה הקדושה בבית המקדש השני. כל תפקיד מציע חוויה ייחודית ומשמעותית בעבודת הקודש.'
              : 'Discover the world of sacred service in the Second Temple. Each role offers a unique and meaningful experience in holy worship.'
            }
          </p>
        </div>

        {/* Activity Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {activities.map((activity, index) => (
            <TempleActivityCard
              key={index}
              icon={activity.icon}
              title={activity.title}
              subtitle={activity.subtitle}
              info={activity.info}
              color={activity.color}
              isHebrew={isHebrew}
            />
          ))}
        </div>

        {/* Footer */}
        <div className={`text-center mt-12 text-gray-500 ${isHebrew ? 'font-hebrew' : ''}`} dir={isHebrew ? 'rtl' : 'ltr'}>
          <p>
            {isHebrew 
              ? 'חוויה חינוכית אינטראקטיבית על החיים בבית המקדש השני'
              : 'An interactive educational experience about life in the Second Temple'
            }
          </p>
        </div>
      </div>
    </div>
  );
}

export default CharacterSelection;