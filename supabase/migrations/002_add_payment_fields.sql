-- Add payment status to landing_bookings table
ALTER TABLE public.landing_bookings
ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'cancelled'));

-- Add payment code for Sepay integration
ALTER TABLE public.landing_bookings
ADD COLUMN IF NOT EXISTS payment_code TEXT;

-- Add payment amount
ALTER TABLE public.landing_bookings
ADD COLUMN IF NOT EXISTS payment_amount INTEGER;

-- Add paid_at timestamp
ALTER TABLE public.landing_bookings
ADD COLUMN IF NOT EXISTS paid_at TIMESTAMP WITH TIME ZONE;

-- Add index for payment status queries
CREATE INDEX IF NOT EXISTS idx_landing_bookings_payment_status ON public.landing_bookings(payment_status);
CREATE INDEX IF NOT EXISTS idx_landing_bookings_payment_code ON public.landing_bookings(payment_code);
