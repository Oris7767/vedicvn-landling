const API_URL = import.meta.env.VITE_PAYMENT_API_URL || '';

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
  const response = await fetch(`${API_URL}/create-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chartHash: `${data.serviceId}_${Date.now()}`,
      packageId: data.serviceId,
      description: `Thanh toan ${data.serviceName} - ${data.customerName}`,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create payment');
  }

  return response.json();
}

export async function checkPaymentStatus(orderId: string): Promise<PaymentStatus> {
  const response = await fetch(`${API_URL}/check-status`, {
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
