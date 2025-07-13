import React, { useState } from 'react';
import { Crown, Flame, Music, Droplets, Wheat, Sun, ArrowLeft } from 'lucide-react';
import TempleActivityCard from './TempleActivityCard';

function CharacterSelection() {
  const [isHebrew, setIsHebrew] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const roles = [
    {
      id: 'high-priest',
      icon: "👑",
      title: isHebrew ? "כהן גדול" : "High Priest",
      subtitle: isHebrew ? "מנהיג רוחני של העם" : "Spiritual Leader of the People",
      info: isHebrew ? 
        "הכהן הגדול היה הדמות הרוחנית הגבוהה ביותר בעם ישראל. הוא לבש בגדי קודש מיוחדים עם החושן והאפוד, ורק הוא יכול היה להיכנס לקודש הקדשים ביום הכיפורים. תפקידו כלל הנהגת כל עבודת בית המקדש, הוראה לעם, ופסיקה בשאלות הלכתיות חשובות." :
        "The High Priest was the highest spiritual figure among the people of Israel. He wore special sacred garments with the breastplate and ephod, and only he could enter the Holy of Holies on Yom Kippur. His role included leading all Temple service, teaching the people, and making decisions on important religious matters.",
      color: "bg-purple-100"
    },
    {
      id: 'priest',
      icon: "🔥",
      title: isHebrew ? "כהן" : "Priest",
      subtitle: isHebrew ? "משרת בקודש" : "Sacred Servant",
      info: isHebrew ? 
        "הכהנים היו צאצאי אהרן הכהן ושירתו בבית המקדש. הם הקריבו קרבנות, הדליקו את המנורה, הקטירו קטורת, וברכו את העם בברכת כהנים. הכהנים לבשו בגדי לבן מיוחדים ועברו טקסי טהרה לפני כל עבודה. הם גם לימדו תורה לעם ופסקו בדיני טהרה וטומאה." :
        "The priests were descendants of Aaron the priest and served in the Temple. They offered sacrifices, lit the menorah, burned incense, and blessed the people with the priestly blessing. The priests wore special white garments and underwent purification rituals before each service. They also taught Torah to the people and ruled on matters of purity and impurity.",
      color: "bg-orange-100"
    },
    {
      id: 'levite',
      icon: "🎵",
      title: isHebrew ? "לוי" : "Levite",
      subtitle: isHebrew ? "נגן ושומר בית המקדש" : "Temple Musician and Guardian",
      info: isHebrew ? 
        "הלויים היו בני שבט לוי ששירתו בבית המקדש בתפקידים שונים. חלקם היו נגנים ומשוררים שביצעו את השיר היומי ואת המוזיקה בחגים. אחרים שמרו על שערי בית המקדש, נקו את החצרות, ועזרו לכהנים בהכנת הקרבנות. הלויים גם לימדו תורה בערי הלויים ברחבי הארץ." :
        "The Levites were members of the tribe of Levi who served in the Temple in various roles. Some were musicians and singers who performed the daily song and music during festivals. Others guarded the Temple gates, cleaned the courtyards, and helped the priests prepare sacrifices. The Levites also taught Torah in the Levitical cities throughout the land.",
      color: "bg-blue-100"
    },
    {
      id: 'guard',
      icon: "🛡️",
      title: isHebrew ? "שומר" : "Temple Guard",
      subtitle: isHebrew ? "מגן על קדושת המקום" : "Protector of Sacred Space",
      info: isHebrew ? 
        "שומרי בית המקדש היו אחראים על אבטחת המקום הקדוש ושמירה על כללי הכניסה. הם עמדו בשערים, בדקו שרק אנשים טהורים נכנסים לחצרות, ודאגו לסדר במהלך החגים כשהמוני עולי רגל הגיעו לירושלים. השומרים גם היו אחראים על שמירת כלי הקודש ואוצרות בית המקדש." :
        "The Temple guards were responsible for securing the holy place and maintaining entrance regulations. They stood at the gates, checked that only pure people entered the courtyards, and maintained order during festivals when masses of pilgrims came to Jerusalem. The guards were also responsible for protecting the sacred vessels and Temple treasures.",
      color: "bg-green-100"
    },
    {
      id: 'scribe',
      icon: "📜",
      title: isHebrew ? "סופר" : "Scribe",
      subtitle: isHebrew ? "כותב ומעתיק כתבי קודש" : "Writer and Copier of Sacred Texts",
      info: isHebrew ? 
        "הסופרים היו חכמים שהתמחו בכתיבה ובהעתקה של כתבי הקודש. הם כתבו ספרי תורה, תפילין, מזוזות, וכתבו מסמכים רשמיים של בית המקדש. הסופרים גם שמרו על מסורת הכתיב הנכונה, ספרו אותיות ומילים בספרי התורה, ולימדו קריאה וכתיבה. תפקידם היה חיוני לשמירה על דיוק הטקסטים הקדושים." :
        "The scribes were scholars who specialized in writing and copying sacred texts. They wrote Torah scrolls, tefillin, mezuzot, and wrote official Temple documents. The scribes also preserved the tradition of correct writing, counted letters and words in Torah scrolls, and taught reading and writing. Their role was vital for maintaining the accuracy of sacred texts.",
      color: "bg-indigo-100"
    },
    {
      id: 'administrator',
      icon: "🏛️",
      title: isHebrew ? "מנהל בית המקדש" : "Temple Administrator",
      subtitle: isHebrew ? "מארגן את פעילות המקדש" : "Organizer of Temple Activities",
      info: isHebrew ? 
        "מנהלי בית המקדש היו אחראים על התפעול היומיומי של המקדש. הם תיאמו בין הכהנים והלויים, דאגו לאספקת חומרי הקרבנות, ניהלו את אוצר בית המקדש, וארגנו את לוחות הזמנים של העבודות השונות. המנהלים גם דאגו לתחזוקת המבנה, לניקיון, ולכל הצרכים הלוגיסטיים הנדרשים לתפקוד תקין של בית המקדש." :
        "Temple administrators were responsible for the daily operation of the Temple. They coordinated between priests and Levites, ensured the supply of sacrifice materials, managed the Temple treasury, and organized schedules for various services. The administrators also took care of building maintenance, cleanliness, and all logistical needs required for proper Temple functioning.",
      color: "bg-yellow-100"
    }
  ];

  const getActivitiesForRole = (roleId: string) => {
    const activities = {
      'high-priest': [
        {
          icon: "🕯️",
          title: isHebrew ? "עבודת יום הכיפורים" : "Yom Kippur Service",
          subtitle: isHebrew ? "כניסה לקודש הקדשים" : "Entering the Holy of Holies",
          info: isHebrew ? 
            "ביום הכיפורים, הכהן הגדול נכנס לקודש הקדשים - המקום הקדוש ביותר בבית המקדש. הוא מקטיר קטורת, מזה דם על הכפורת, ומתוודה על חטאי כל העם. זוהי העבודה הקדושה והמרכזית ביותר בשנה, שרק הכהן הגדול יכול לבצע." :
            "On Yom Kippur, the High Priest enters the Holy of Holies - the most sacred place in the Temple. He burns incense, sprinkles blood on the mercy seat, and confesses the sins of all the people. This is the most sacred and central service of the year, which only the High Priest can perform.",
          color: "bg-purple-50"
        },
        {
          icon: "👗",
          title: isHebrew ? "לבישת בגדי הזהב" : "Wearing the Golden Garments",
          subtitle: isHebrew ? "החושן והאפוד" : "The Breastplate and Ephod",
          info: isHebrew ? 
            "הכהן הגדול לובש שמונה בגדי קודש, כולל החושן עם שתים עשרה אבני חן המייצגות את שבטי ישראל, והאפוד המעוטר בזהב. הבגדים מסמלים את תפקידו כמתווך בין העם לבין הקב\"ה." :
            "The High Priest wears eight sacred garments, including the breastplate with twelve precious stones representing the tribes of Israel, and the ephod decorated with gold. The garments symbolize his role as mediator between the people and God.",
          color: "bg-amber-50"
        },
        {
          icon: "🔮",
          title: isHebrew ? "שאילת האורים ותומים" : "Consulting the Urim and Thummim",
          subtitle: isHebrew ? "קבלת הדרכה אלוהית" : "Receiving Divine Guidance",
          info: isHebrew ? 
            "האורים והתומים היו אמצעי לקבלת הדרכה אלוהית בשאלות חשובות לעם. הכהן הגדול היה שואל שאלות ומקבל תשובות דרך האבנים הקדושות שבחושן." :
            "The Urim and Thummim were means of receiving divine guidance on important questions for the people. The High Priest would ask questions and receive answers through the sacred stones in the breastplate.",
          color: "bg-blue-50"
        }
      ],
      'priest': [
        {
          icon: "🔥",
          title: isHebrew ? "הקרבת קרבנות" : "Offering Sacrifices",
          subtitle: isHebrew ? "עולות, שלמים ומנחות" : "Burnt, Peace and Meal Offerings",
          info: isHebrew ? 
            "הכהנים מקריבים קרבנות שונים על המזבח: עולות הנשרפות לגמרי, שלמים שחלקם נאכל, ומנחות מקמח ושמן. כל קרבן דורש הכנה מדויקת וטקס מיוחד." :
            "Priests offer various sacrifices on the altar: burnt offerings that are completely burned, peace offerings that are partially eaten, and meal offerings from flour and oil. Each sacrifice requires precise preparation and special ceremony.",
          color: "bg-orange-50"
        },
        {
          icon: "🕯️",
          title: isHebrew ? "הדלקת המנורה" : "Lighting the Menorah",
          subtitle: isHebrew ? "אור תמיד בהיכל" : "Eternal Light in the Sanctuary",
          info: isHebrew ? 
            "מדי יום מדליקים הכהנים את נרות המנורה הזהב בהיכל. המנורה בת שבעה קנים מאירה באור זהב טהור ומסמלת את האור האלוהי הנוכח בבית המקדש." :
            "Every day priests light the lamps of the golden menorah in the sanctuary. The seven-branched menorah shines with pure golden light and symbolizes the divine light present in the Temple.",
          color: "bg-yellow-50"
        },
        {
          icon: "💨",
          title: isHebrew ? "הקטרת הקטורת" : "Burning Incense",
          subtitle: isHebrew ? "ריח ניחוח לפני ה'" : "Sweet Fragrance Before God",
          info: isHebrew ? 
            "פעמיים ביום, בבוקר ובערב, מקטיר כהן קטורת על מזבח הזהב שבהיכל. הקטורת עולה כעשן ריחני ומסמלת את תפילות העם העולות השמימה." :
            "Twice daily, morning and evening, a priest burns incense on the golden altar in the sanctuary. The incense rises as fragrant smoke and symbolizes the prayers of the people ascending to heaven.",
          color: "bg-purple-50"
        }
      ],
      'levite': [
        {
          icon: "🎵",
          title: isHebrew ? "שיר של יום" : "Song of the Day",
          subtitle: isHebrew ? "מזמורים יומיים" : "Daily Psalms",
          info: isHebrew ? 
            "הלויים שרים מזמור מיוחד לכל יום בשבוע במהלך הקרבת התמיד. השיר מלווה בכלי נגינה ומעלה את רוח העבודה הקדושה." :
            "Levites sing a special psalm for each day of the week during the daily offering. The song is accompanied by musical instruments and elevates the spirit of sacred service.",
          color: "bg-blue-50"
        },
        {
          icon: "🎺",
          title: isHebrew ? "תקיעת חצוצרות" : "Sounding Trumpets",
          subtitle: isHebrew ? "איתות לעבודות הקודש" : "Signaling Sacred Services",
          info: isHebrew ? 
            "הלויים תוקעים בחצוצרות כסף במועדים מיוחדים, בראש חודש ובחגים. קול החצוצרות מכריז על תחילת עבודות קודש ומזמן את העם להתכונן." :
            "Levites sound silver trumpets on special occasions, new moons and festivals. The sound of trumpets announces the beginning of sacred services and calls the people to prepare.",
          color: "bg-silver-50"
        },
        {
          icon: "🚪",
          title: isHebrew ? "שמירת השערים" : "Guarding the Gates",
          subtitle: isHebrew ? "בקרת כניסה לחצרות" : "Controlling Access to Courtyards",
          info: isHebrew ? 
            "לויים שומרים על שערי בית המקדש ובודקים שרק אנשים טהורים נכנסים לחצרות הקדושות. הם מנחים את המבקרים ודואגים לסדר." :
            "Levites guard the Temple gates and ensure that only pure people enter the sacred courtyards. They guide visitors and maintain order.",
          color: "bg-green-50"
        }
      ],
      'guard': [
        {
          icon: "🛡️",
          title: isHebrew ? "סיור לילי" : "Night Watch",
          subtitle: isHebrew ? "שמירה על בית המקדש" : "Protecting the Temple",
          info: isHebrew ? 
            "השומרים עורכים סיורים לילה כדי לוודא שבית המקדש מוגן ובטוח. הם בודקים את כל הפינות ודואגים שלא יהיו פולשים או נזק למבנה הקדוש." :
            "Guards conduct night patrols to ensure the Temple is protected and secure. They check all corners and ensure there are no intruders or damage to the sacred structure.",
          color: "bg-gray-50"
        },
        {
          icon: "🔍",
          title: isHebrew ? "בדיקת טהרה" : "Purity Inspection",
          subtitle: isHebrew ? "וידוא כשרות המבקרים" : "Ensuring Visitor Eligibility",
          info: isHebrew ? 
            "השומרים בודקים שהמבקרים עומדים בדרישות הטהרה לפני כניסה לחצרות. הם מכירים את כל חוקי הטהרה ויכולים להדריך את העם." :
            "Guards check that visitors meet purity requirements before entering the courtyards. They know all the purity laws and can guide the people.",
          color: "bg-blue-50"
        },
        {
          icon: "💰",
          title: isHebrew ? "שמירת האוצר" : "Treasury Protection",
          subtitle: isHebrew ? "הגנה על כלי הקודש" : "Protecting Sacred Vessels",
          info: isHebrew ? 
            "השומרים אחראים על הגנת אוצר בית המקדש וכלי הקודש היקרים. הם דואגים שהכלים יישמרו במקום בטוח ולא יגנבו או ייפגעו." :
            "Guards are responsible for protecting the Temple treasury and precious sacred vessels. They ensure the vessels are kept in a safe place and are not stolen or damaged.",
          color: "bg-yellow-50"
        }
      ],
      'scribe': [
        {
          icon: "📜",
          title: isHebrew ? "כתיבת ספר תורה" : "Writing Torah Scrolls",
          subtitle: isHebrew ? "העתקה מדויקת של הכתובים" : "Precise Copying of Scriptures",
          info: isHebrew ? 
            "הסופרים כותבים ספרי תורה בדיוק מוחלט, בודקים כל אות ואות ומונים את המילים. עבודתם דורשת ריכוז רב וידע עמוק בכללי הכתיבה הקדושה." :
            "Scribes write Torah scrolls with absolute precision, checking every letter and counting words. Their work requires great concentration and deep knowledge of sacred writing rules.",
          color: "bg-parchment-50"
        },
        {
          icon: "🔢",
          title: isHebrew ? "ספירת אותיות" : "Counting Letters",
          subtitle: isHebrew ? "שמירה על דיוק הטקסט" : "Maintaining Text Accuracy",
          info: isHebrew ? 
            "הסופרים סופרים בקפידה את מספר האותיות, המילים והפסוקים בכל ספר תורה כדי לוודא שהעתקה מדויקת ללא שגיאות." :
            "Scribes carefully count the number of letters, words and verses in each Torah scroll to ensure accurate copying without errors.",
          color: "bg-blue-50"
        },
        {
          icon: "🎓",
          title: isHebrew ? "הוראת קריאה" : "Teaching Reading",
          subtitle: isHebrew ? "חינוך העם לקרוא כתבי קודש" : "Educating People to Read Sacred Texts",
          info: isHebrew ? 
            "הסופרים מלמדים את העם לקרוא ולכתוב, במיוחד את כתבי הקודש. הם פותחים בתי מדרש ומעבירים את המסורת הכתובה לדור הבא." :
            "Scribes teach the people to read and write, especially sacred texts. They open study houses and pass on the written tradition to the next generation.",
          color: "bg-green-50"
        }
      ],
      'administrator': [
        {
          icon: "📅",
          title: isHebrew ? "תיאום משמרות" : "Coordinating Shifts",
          subtitle: isHebrew ? "ארגון עבודת הכהנים והלויים" : "Organizing Priest and Levite Work",
          info: isHebrew ? 
            "המנהלים מארגנים את משמרות הכהנים והלויים, דואגים שכל עבודה תתבצע בזמן הנכון ועל ידי האנשים המתאימים." :
            "Administrators organize priest and Levite shifts, ensuring every task is performed at the right time by the appropriate people.",
          color: "bg-blue-50"
        },
        {
          icon: "🐄",
          title: isHebrew ? "רכישת קרבנות" : "Purchasing Sacrifices",
          subtitle: isHebrew ? "אספקת חיות לקרבנות" : "Supplying Animals for Sacrifices",
          info: isHebrew ? 
            "המנהלים דואגים לאספקה קבועה של חיות כשרות לקרבנות - פרים, כבשים, יונים ועוד. הם בודקים שהחיות תמימות ומתאימות לעבודה הקדושה." :
            "Administrators ensure a steady supply of kosher animals for sacrifices - bulls, sheep, doves and more. They check that the animals are unblemished and suitable for sacred service.",
          color: "bg-green-50"
        },
        {
          icon: "🧹",
          title: isHebrew ? "תחזוקת המקדש" : "Temple Maintenance",
          subtitle: isHebrew ? "שמירה על ניקיון וכשרות" : "Maintaining Cleanliness and Fitness",
          info: isHebrew ? 
            "המנהלים דואגים לניקיון בית המקדש, לתיקון נזקים ולהחלפת כלים שנפגעו. הם מוודאים שהמקום הקדוש נשאר ראוי לעבודת ה'." :
            "Administrators ensure Temple cleanliness, repair damage and replace damaged vessels. They make sure the sacred place remains worthy for divine service.",
          color: "bg-yellow-50"
        }
      ]
    };
    
    return activities[roleId as keyof typeof activities] || [];
  };

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
  };

  const handleBackToRoles = () => {
    setSelectedRole(null);
  };

  if (selectedRole) {
    const role = roles.find(r => r.id === selectedRole);
    const activities = getActivitiesForRole(selectedRole);

    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6 shadow-lg">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <button
              onClick={handleBackToRoles}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-all duration-200 font-semibold flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              {isHebrew ? 'חזור לתפקידים' : 'Back to Roles'}
            </button>
            <div className={`text-center flex-1 ${isHebrew ? 'font-hebrew' : ''}`} dir={isHebrew ? 'rtl' : 'ltr'}>
              <h1 className="text-4xl font-bold mb-2">
                {role?.title}
              </h1>
              <p className="text-xl opacity-90">
                {role?.subtitle}
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

        {/* Activities Content */}
        <div className="max-w-6xl mx-auto p-6">
          <div className={`text-center mb-8 ${isHebrew ? 'font-hebrew' : ''}`} dir={isHebrew ? 'rtl' : 'ltr'}>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {isHebrew ? 'הפעילויות שלך' : 'Your Activities'}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {isHebrew 
                ? 'גלה את העבודות והטקסים המיוחדים שאתה מבצע כחלק מתפקידך בבית המקדש השני.'
                : 'Discover the special tasks and rituals you perform as part of your role in the Second Temple.'
              }
            </p>
          </div>

          {/* Activities Grid */}
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
        </div>
      </div>
    );
  }

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
            <div
              key={index}
              className={`rounded-xl shadow-md p-6 cursor-pointer text-center transition-all duration-300 hover:shadow-lg hover:scale-105 ${role.color}`}
              dir={isHebrew ? "rtl" : "ltr"}
              onClick={() => handleRoleSelect(role.id)}
            >
              {/* Icon */}
              <div className="text-4xl mb-3">{role.icon}</div>
              
              {/* Title */}
              <h3 className={`text-xl font-bold mb-2 ${isHebrew ? "font-hebrew" : ""}`}>
                {role.title}
              </h3>
              
              {/* Subtitle */}
              <p className={`text-sm text-gray-600 mb-4 ${isHebrew ? "font-hebrew" : ""}`}>
                {role.subtitle}
              </p>

              {/* Select Button */}
              <div className={`inline-flex items-center gap-2 bg-white bg-opacity-60 px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:bg-opacity-80 transition-all ${isHebrew ? "font-hebrew" : ""}`}>
                {isHebrew ? 'בחר תפקיד זה' : 'Select This Role'}
              </div>
            </div>
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