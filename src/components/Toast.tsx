import React, { useEffect, useState } from 'react';
import { X, Award } from 'lucide-react';

interface ToastProps {
  message: string;
  badge?: string;
  onClose: () => void;
  onViewBadge?: () => void;
  autoCloseDelay?: number;
}

function Toast({ message, badge, onClose, onViewBadge, autoCloseDelay = 5000 }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, autoCloseDelay);

    return () => clearTimeout(timer);
  }, [autoCloseDelay]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed z-50 transition-all duration-300 ${
      isClosing ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'
    } 
    /* Desktop positioning - upper right */
    top-4 right-4 
    /* Mobile positioning - centered */
    sm:top-4 sm:right-4 max-sm:top-1/2 max-sm:left-1/2 max-sm:-translate-x-1/2 max-sm:-translate-y-1/2`}>
      <div className="bg-white border border-green-200 rounded-lg shadow-lg p-4 max-w-sm min-w-[300px]">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="text-2xl">🎉</div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 mb-2">
                {message}
              </p>
              {badge && onViewBadge && (
                <button
                  onClick={onViewBadge}
                  className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                  aria-label={`View ${badge} badge details`}
                >
                  <Award size={12} />
                  View Badge
                </button>
              )}
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            aria-label="Close notification"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Toast;