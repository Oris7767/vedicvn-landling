export interface ServicePrice {
  id: string;
  amount: number;
}

export const SERVICE_PRICES: ServicePrice[] = [
  { id: 'chiem-tinh-co-ban', amount: 1000000 },
  { id: 'chiem-tinh-chuyen-sau', amount: 2500000 },
  { id: 'chiem-tinh-prasna', amount: 1000000 },
  { id: 'tarot-1-cau', amount: 120000 },
  { id: 'tarot-combo', amount: 350000 },
  { id: 'tarot-offline', amount: 100000 },
  { id: 'kinh-dich', amount: 120000 },
  { id: 'phap-su', amount: 0 },
];

export function getServiceAmount(serviceId: string): number | null {
  const service = SERVICE_PRICES.find(s => s.id === serviceId);
  return service?.amount ?? null;
}

export function hasFixedPrice(serviceId: string): boolean {
  const service = SERVICE_PRICES.find(s => s.id === serviceId);
  return service !== undefined && service.amount > 0;
}
