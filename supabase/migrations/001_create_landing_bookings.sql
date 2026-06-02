-- Create landing_bookings table for votive-landing form submissions
CREATE TABLE IF NOT EXISTS public.landing_bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  type TEXT NOT NULL CHECK (type IN ('contact', 'service', 'course')),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service TEXT,
  course TEXT,
  message TEXT,
  birth_date TEXT,
  birth_time TEXT,
  location TEXT
);

-- Enable Row Level Security
ALTER TABLE public.landing_bookings ENABLE ROW LEVEL SECURITY;

-- Allow insert from anon users (for public form submissions)
CREATE POLICY "Allow anon insert" ON public.landing_bookings
  FOR INSERT TO anon
  WITH CHECK (true);

-- Allow select for authenticated users (for admin dashboard)
CREATE POLICY "Allow authenticated select" ON public.landing_bookings
  FOR SELECT TO authenticated
  USING (true);

-- Add index for faster queries
CREATE INDEX idx_landing_bookings_type ON public.landing_bookings(type);
CREATE INDEX idx_landing_bookings_created_at ON public.landing_bookings(created_at);
CREATE INDEX idx_landing_bookings_email ON public.landing_bookings(email);
