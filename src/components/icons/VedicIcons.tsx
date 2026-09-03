import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

// Diya Lamp (Ngọn đèn dầu Vệ Đà - Biểu tượng xua tan bóng tối vô minh)
export function DiyaIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M12 2c-.5 1.5-2 3-2 5a2 2 0 0 0 4 0c0-2-1.5-3.5-2-5z" fill="currentColor" fillOpacity="0.3" />
      <path d="M4 14c0 4.418 3.582 7 8 7s8-2.582 8-7H4z" />
      <path d="M4 14h16c0-2.5-3-4-8-4s-8 1.5-8 4z" />
      <line x1="9" y1="21" x2="15" y2="21" />
    </svg>
  );
}

// Sacred Lotus (Hoa sen Vệ Đà - Thanh tịnh & Tỉnh thức)
export function LotusIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M12 3c-1.5 3-4 6.5-4 9.5a4 4 0 0 0 8 0C16 9.5 13.5 6 12 3z" />
      <path d="M12 12.5C9.5 8 5 9 3 13.5c-.8 1.8 0 4 2 5 2.5 1.3 5-1.5 7-6z" />
      <path d="M12 12.5c2.5-4.5 7-3.5 9 1 1 2.2 0 4.5-2 5-2.5 1.3-5-1.5-7-6z" />
      <path d="M7 19.5c2 1 3.5 1.5 5 1.5s3-.5 5-1.5" />
    </svg>
  );
}

// Nakshatra Wheel / Celestial Compass (Bản đồ sao & 27 chòm sao)
export function CelestialWheelIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v5" />
      <path d="M12 16v5" />
      <path d="M3 12h5" />
      <path d="M16 12h5" />
      <path d="m5.6 5.6 3.6 3.6" />
      <path d="m14.8 14.8 3.6 3.6" />
      <path d="m18.4 5.6-3.6 3.6" />
      <path d="m9.2 14.8-3.6 3.6" />
    </svg>
  );
}

// Sun Graha (Surya - Ý thức & Bản ngã)
export function SuryaIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <circle cx="12" cy="12" r="5" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

// Moon Graha (Chandra - Tâm trí & Cảm xúc)
export function ChandraIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c.2-.18.42-.34.64-.48-.65-.41-1.33-.62-2-.62z" />
    </svg>
  );
}

// Horary Prasna / Moment of Question (Đoán sự - Thời khắc động tâm)
export function PrasnaIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 15" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2" opacity="0.5" />
    </svg>
  );
}

// Financial Cycles / Gann (Chiêm tinh tài chính & Chu kỳ Gann)
export function FinancialCycleIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M3 3v18h18" />
      <path d="m19 7-6 6-4-4-5 5" />
      <circle cx="19" cy="7" r="2" fill="currentColor" />
      <path d="M14 7h5v5" />
    </svg>
  );
}

// Ayurveda Elements (5 nguyên tố & Thân tâm)
export function AyurvedaIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z" />
      <path d="M12 7a2 2 0 0 1 2 2c0 2-2 4-2 4s-2-2-2-4a2 2 0 0 1 2-2z" />
    </svg>
  );
}

// Vedic Numerology (Số học Vệ Đà)
export function NumerologyIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 8h3v8" />
      <path d="M14 8h2a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-2v3h4" />
    </svg>
  );
}

// Tarot Deck (Biểu tượng bài Tarot cổ điển)
export function TarotCardIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <circle cx="12" cy="12" r="3" />
      <path d="m12 6 .5 1.5L14 8l-1.5.5L12 10l-.5-1.5L10 8l1.5-.5z" fill="currentColor" fillOpacity="0.4" />
      <path d="m12 14 .5 1.5L14 16l-1.5.5L12 18l-.5-1.5L10 16l1.5-.5z" fill="currentColor" fillOpacity="0.4" />
    </svg>
  );
}

// I-Ching Trigram (Biểu tượng Quẻ Kinh Dịch)
export function IChingIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <line x1="8" y1="8" x2="16" y2="8" />
      <line x1="8" y1="12" x2="11" y2="12" />
      <line x1="13" y1="12" x2="16" y2="12" />
      <line x1="8" y1="16" x2="16" y2="16" />
    </svg>
  );
}

// Puja / Sacred Ritual (Nghi thức truyền thống)
export function RitualFlameIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}
