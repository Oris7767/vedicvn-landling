import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'cancelled';

export interface LandingBooking {
  id?: string;
  created_at?: string;
  type: 'contact' | 'service' | 'course';
  name: string;
  email: string;
  phone: string;
  service?: string;
  course?: string;
  message?: string;
  birth_date?: string;
  birth_time?: string;
  location?: string;
  payment_status?: PaymentStatus;
  payment_code?: string;
  payment_amount?: number;
  paid_at?: string;
}

export async function saveBooking(data: LandingBooking) {
  const { data: result, error } = await supabase
    .from('landing_bookings')
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return result;
}
