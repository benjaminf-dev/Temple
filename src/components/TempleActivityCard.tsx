import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface TempleActivityCardProps {
  icon: string;
  title: string;
  subtitle: string;
  info: string;
  color: string;
  isHebrew?: boolean;
}

function TempleActivityCard({ 
  icon, 
  title, 
  subtitle, 
  info, 
  color, 
  isHebrew = false 
}: TempleActivityCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`rounded-xl shadow-md p-4 cursor-pointer text-center transition-all duration-300 hover:shadow-lg hover:scale-105 ${color}`}
      dir={isHebrew ? 'rtl' : 'ltr'}
      onClick={() => setOpen(!open)}
    >
      <div className="text-3xl mb-2">{icon}</div>
      <h3 className={`text-xl font-bold mb-1 ${isHebrew ? 'font-hebrew' : ''}`}>
        {title}
      </h3>
      <p className={`text-sm text-gray-600 mb-2 ${isHebrew ? 'font-hebrew' : ''}`}>
        {subtitle}
      </p>

      {/* Toggle Indicator */}
      <div className={`inline-flex items-center gap-1 text-xs text-gray-500 mb-2 ${
        isHebrew ? 'flex-row-reverse font-hebrew' : ''
      }`}>
        {open ? (
          <>
            {isHebrew ? 'הסתר פרטים' : 'Hide Details'}
            <ChevronUp size={14} />
          </>
        ) : (
          <>
            {isHebrew ? 'הצג פרטים' : 'Show Details'}
            <ChevronDown size={14} />
          </>
        )}
      </div>

      {/* Expanded Content - Inside the same card */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div
          className={`bg-white bg-opacity-60 backdrop-blur-sm rounded-lg p-3 text-sm shadow-inner ${
            isHebrew 
              ? 'text-right font-hebrew leading-relaxed' 
              : 'text-left leading-relaxed'
          }`}
        >
          {info}
        </div>
      </div>
    </div>
  );
}

export default TempleActivityCard;