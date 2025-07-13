import React, { useState } from 'react';
import { Crown, Flame, Music, Droplets, Wheat, Sun } from 'lucide-react';
import TempleActivityCard from './TempleActivityCard';

function CharacterSelection() {
  const [isHebrew, setIsHebrew] = useState(false);

  const roles = [
    {
      icon: "👑",
      title: isHebrew ? "כהן גדול" : "High Priest",
      subtitle: isHebrew ? "מנהיג רוחני של העם" : "Spiritual Leader of the People",
      info: isHebrew ? 
        "הכהן הגדול היה הדמות הרוחנית הגבוהה ביותר בעם ישראל. הוא לבש בגדי קודש מיוחדים עם החושן והאפוד, ורק הוא יכול היה להיכנס לקודש הקדשים ביום הכיפורים. תפקידו כלל הנהגת כל עבודת בית המקדש, הוראה לעם, ופסיקה בשאלות הלכתיות חשובות." :
        "The High Priest was the highest spiritual figure among the people of Israel. He wore special sacred garments with the breastplate and ephod, and only he could enter the Holy of Holies on Yom Kippur. His role included leading all Temple service, teaching the people, and making decisions on important religious matters.",
      color: "bg-purple-100"
    },
    {
      icon: "🔥",
      title: isHebrew ? "כהן" : "Priest",
      subtitle: isHebrew ? "משרת בקודש" : "Sacred Servant",
      info: isHebrew ? 
        "הכהנים היו צאצאי אהרן הכהן ושירתו בבית המקדש. הם הקריבו קרבנות, הדליקו את המנורה, הקטירו קטורת, וברכו את העם בברכת כהנים. הכהנים לבשו בגדי לבן מיוחדים ועברו טקסי טהרה לפני כל עבודה. הם גם לימדו תורה לעם ופסקו בדיני טהרה וטומאה." :
        "The priests were descendants of Aaron the priest and served in the Temple. They offered sacrifices, lit the menorah, burned incense, and blessed the people with the priestly blessing. The priests wore special white garments and underwent purification rituals before each service. They also taught Torah to the people and ruled on matters of purity and impurity.",
      color: "bg-orange-100"
    },
    {
      icon: "🎵",
      title: isHebrew ? "לוי" : "Levite",
      subtitle: isHebrew ? "נגן ושומר בית המקדש" : "Temple Musician and Guardian",
      info: isHebrew ? 
        "הלויים היו בני שבט לוי ששירתו בבית המקדש בתפקידים שונים. חלקם היו נגנים ומשוררים שביצעו את השיר היומי ואת המוזיקה בחגים. אחרים שמרו על שערי בית המקדש, נקו את החצרות, ועזרו לכהנים בהכנת הקרבנות. הלויים גם לימדו תורה בערי הלויים ברחבי הארץ." :
        "The Levites were members of the tribe of Levi who served in the Temple in various roles. Some were musicians and singers who performed the daily song and music during festivals. Others guarded the Temple gates, cleaned the courtyards, and helped the priests prepare sacrifices. The Levites also taught Torah in the Levitical cities throughout the land.",
      color: "bg-blue-100"
    },
    {
      icon: "🛡️",
      title: isHebrew ? "שומר" : "Temple Guard",
      subtitle: isHebrew ? "מגן על קדושת המקום" : "Protector of Sacred Space",
      info: isHebrew ? 
        "שומרי בית המקדש היו אחראים על אבטחת המקום הקדוש ושמירה על כללי הכניסה. הם עמדו בשערים, בדקו שרק אנשים טהורים נכנסים לחצרות, ודאגו לסדר במהלך החגים כשהמוני עולי רגל הגיעו לירושלים. השומרים גם היו אחראים על שמירת כלי הקודש ואוצרות בית המקדש." :
        "The Temple guards were responsible for securing the holy place and maintaining entrance regulations. They stood at the gates, checked that only pure people entered the courtyards, and maintained order during festivals when masses of pilgrims came to Jerusalem. The guards were also responsible for protecting the sacred vessels and Temple treasures.",
      color: "bg-green-100"
    },
    {
      icon: "📜",
      title: isHebrew ? "סופר" : "Scribe",
      subtitle: isHebrew ? "כותב ומעתיק כתבי קודש" : "Writer and Copier of Sacred Texts",
      info: isHebrew ? 
        "הסופרים היו חכמים שהתמחו בכתיבה ובהעתקה של כתבי הקודש. הם כתבו ספרי תורה, תפילין, מזוזות, וכתבו מסמכים רשמיים של בית המקדש. הסופרים גם שמרו על מסורת הכתיב הנכונה, ספרו אותיות ומילים בספרי התורה, ולימדו קריאה וכתיבה. תפקידם היה חיוני לשמירה על דיוק הטקסטים הקדושים." :
        "The scribes were scholars who specialized in writing and copying sacred texts. They wrote Torah scrolls, tefillin, mezuzot, and wrote official Temple documents. The scribes also preserved the tradition of correct writing, counted letters and words in Torah scrolls, and taught reading and writing. Their role was vital for maintaining the accuracy of sacred texts.",
      color: "bg-indigo-100"
    },
    {
      icon: "🏛️",
      title: isHebrew ? "מנהל בית המקדש" : "Temple Administrator",
      subtitle: isHebrew ? "מארגן את פעילות המקדש" : "Organizer of Temple Activities",
      info: isHebrew ? 
        "מנהלי בית המקדש היו אחראים על התפעול היומיומי של המקדש. הם תיאמו בין הכהנים והלויים, דאגו לאספקת חומרי הקרבנות, ניהלו את אוצר בית המקדש, וארגנו את לוחות הזמנים של העבודות השונות. המנהלים גם דאגו לתחזוקת המבנה, לניקיון, ולכל הצרכים הלוגיסטיים הנדרשים לתפקוד תקין של בית המקדש." :
        "Temple administrators were responsible for the daily operation of the Temple. They coordinated between priests and Levites, ensured the supply of sacrifice materials, managed the Temple treasury, and organized schedules for various services. The administrators also took care of building maintenance, cleanliness, and all logistical needs required for proper Temple functioning.",
      color: "bg-yellow-100"
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

        {/* Role Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {roles.map((role, index) => (
            <TempleActivityCard
              key={index}
              icon={role.icon}
              title={role.title}
              subtitle={role.subtitle}
              info={role.info}
              color={role.color}
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