export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  price?: string;
  priceLabel?: string;
}

export interface Course {
  id: string;
  title: string;
  icon: string;
  description: string;
  sessions: string;
  format: string;
  instructor: string;
  highlights: string[];
  special?: boolean;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  preferredDate: string;
  message: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface ServiceBookingFormData {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  birthDate?: string;
  birthTime?: string;
  birthPlace?: string;
  message: string;
}

export interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
}

export interface SepayCreateOrderBody {
  chartHash: string;
  packageId: '1' | '2' | '3' | '4' | string;
  description?: string;
  amount?: number;
  serviceType?: string;
}

export interface SepayCheckStatusBody {
  orderId: string;
}
