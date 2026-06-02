const API_URL = import.meta.env.VITE_PAYMENT_API_URL || '';

const SERVICE_ID_MAP: Record<string, string> = {
  'chiem-tinh-co-ban': 'chiem-tinh-co-ban',
  'chiem-tinh-chuyen-sau': 'chiem-tinh-chuyen-sau',
  'chiem-tinh-prasna': 'chiem-tinh-prasna',
  'tarot-1-cau': 'tarot-1-cau',
  'tarot-combo': 'tarot-combo',
  'tarot-offline': 'tarot-offline',
  'kinh-dich': 'kinh-dich',
  'phap-su': 'phap-su',
};

export interface PaymentResponse {
  paymentCode: string;
  amount: number;
  content: string;
  instructions: string;
  qrUrl?: string;
  bankAccount?: string;
  bankName?: string;
}

export interface PaymentStatus {
  status: 'pending' | 'paid' | 'failed' | 'expired';
  paidAt: string | null;
  amount: number;
}

export async function createPayment(data: {
  serviceId: string;
  serviceName: string;
  amount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  birthDate?: string;
  birthTime?: string;
  birthPlace?: string;
  message?: string;
}): Promise<PaymentResponse> {
  const packageId = SERVICE_ID_MAP[data.serviceId] || data.serviceId;
  
  const response = await fetch(`${API_URL}/payment/create-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chartHash: `${data.serviceId}_${Date.now()}`,
      packageId,
      amount: data.amount,
      description: `Thanh toan ${data.serviceName} - ${data.customerName}`,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create payment');
  }

  return response.json();
}

export async function checkPaymentStatus(orderId: string): Promise<PaymentStatus> {
  const response = await fetch(`${API_URL}/payment/check-status`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderId }),
  });

  if (!response.ok) {
    throw new Error('Failed to check payment status');
  }

  return response.json();
}

export function openQRPayment(qrUrl: string) {
  window.open(qrUrl, '_blank');
}

export async function waitForPayment(
  orderId: string,
  onStatusChange: (status: PaymentStatus) => void,
  maxAttempts = 30,
  intervalMs = 5000
): Promise<PaymentStatus> {
  for (let i = 0; i < maxAttempts; i++) {
    const status = await checkPaymentStatus(orderId);
    onStatusChange(status);

    if (status.status === 'paid') {
      return status;
    }

    await new Promise(resolve => setTimeout(resolve, intervalMs));
  }

  throw new Error('Payment timeout');
}
