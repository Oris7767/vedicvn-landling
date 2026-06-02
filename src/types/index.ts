export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
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

export interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
}

export interface SepayCreateOrderBody {
  chartHash: string;
  packageId: '1' | '2' | '3' | '4';
  description?: string;
}

export interface SepayCheckStatusBody {
  orderId: string;
}
