import { useState, type FormEvent } from 'react';

const PRICING_PLANS = [
  {
    id: 'basic',
    name: 'Cơ bản',
    price: '500,000',
    description: 'Phù hợp cho nhu cầu tư vấn đơn giản',
    features: [
      'Tư vấn 1 vấn đề',
      'Thời lượng 30 phút',
      'Hỗ trợ qua điện thoại',
      'Ghi chú tư vấn',
    ],
    popular: false,
  },
  {
    id: 'standard',
    name: 'Tiêu chuẩn',
    price: '1,200,000',
    description: 'Dịch vụ tư vấn toàn diện',
    features: [
      'Tư vấn 3 vấn đề',
      'Thời lượng 60 phút',
      'Video call hoặc điện thoại',
      'Báo cáo chi tiết',
      'Theo dõi sau tư vấn',
    ],
    popular: true,
  },
  {
    id: 'premium',
    name: 'Cao cấp',
    price: '2,500,000',
    description: 'Giải pháp tâm linh toàn diện',
    features: [
      'Không giới hạn vấn đề',
      'Thời lượng 90 phút',
      'Gặp mặt trực tiếp',
      'Báo cáo chi tiết + phác thảo',
      '3 lần theo dõi miễn phí',
      'Ưu tiên đặt lịch',
    ],
    popular: false,
  },
];

export function Payment() {
  const [paymentMethod, setPaymentMethod] = useState<'vietqr' | 'banking'>('vietqr');
  const [selectedPlan, setSelectedPlan] = useState<string>('standard');
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedPlanData = PRICING_PLANS.find((p) => p.id === selectedPlan);

  const handlePayment = async (e: FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const paymentApiUrl = import.meta.env.VITE_PAYMENT_API_URL || '/api/payment';

    try {
      const response = await fetch(paymentApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: selectedPlan,
          amount: selectedPlanData?.price,
          method: paymentMethod,
        }),
      });

      if (response.ok) {
        alert('Đang chuyển hướng đến trang thanh toán...');
      } else {
        alert('Có lỗi xảy ra. Vui lòng thử lại.');
      }
    } catch {
      alert('Không thể kết nối. Vui lòng thử lại sau.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section id="payment" className="section-padding bg-gradient-to-br from-stone-100 to-amber-50/50">
      <div className="container-width">
        <div className="text-center mb-12">
          <span className="text-gold-600 font-medium mb-2 block">Thanh toán dịch vụ</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-800 mb-4">
            Chọn gói dịch vụ phù hợp
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Thanh toán dễ dàng qua chuyển khoản ngân hàng hoặc mã QR VietQR. 
            Hoàn tiền 100% nếu không hài lòng.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`relative cursor-pointer rounded-2xl p-6 transition-all duration-300 ${
                selectedPlan === plan.id
                  ? 'bg-white shadow-xl ring-2 ring-gold-500'
                  : 'bg-white hover:shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gold-600 text-white text-sm font-medium rounded-full">
                  Phổ biến nhất
                </div>
              )}
              <div className="text-center mb-4">
                <h3 className="text-xl font-semibold text-stone-800 mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl font-bold text-gold-600">{plan.price}</span>
                  <span className="text-stone-500">VNĐ</span>
                </div>
                <p className="text-sm text-stone-500 mt-2">{plan.description}</p>
              </div>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-stone-600">
                    <svg className="w-4 h-4 text-gold-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <div
                className={`w-5 h-5 mx-auto rounded-full border-2 flex items-center justify-center ${
                  selectedPlan === plan.id
                    ? 'border-gold-600 bg-gold-600'
                    : 'border-stone-300'
                }`}
              >
                {selectedPlan === plan.id && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-xl mx-auto bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-xl font-semibold text-stone-800 mb-6 text-center">
            Thông tin thanh toán
          </h3>

          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setPaymentMethod('vietqr')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                paymentMethod === 'vietqr'
                  ? 'bg-gold-600 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              VietQR
            </button>
            <button
              onClick={() => setPaymentMethod('banking')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                paymentMethod === 'banking'
                  ? 'bg-gold-600 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              Chuyển khoản
            </button>
          </div>

          {paymentMethod === 'vietqr' ? (
            <div className="text-center">
              <div className="bg-stone-100 rounded-xl p-6 mb-4">
                <div className="w-48 h-48 mx-auto bg-white rounded-lg flex items-center justify-center">
                  <div className="text-center text-stone-400">
                    <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                    <p className="text-sm">QR Code</p>
                    <p className="text-xs">(Placeholder)</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-stone-500">
                Quét mã QR bằng ứng dụng ngân hàng để thanh toán
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-stone-50 rounded-lg p-4">
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <span className="text-stone-500">Ngân hàng:</span>
                  <span className="col-span-2 font-medium text-stone-800">Vietcombank</span>
                  <span className="text-stone-500">Số TK:</span>
                  <span className="col-span-2 font-medium text-stone-800 font-mono">1234567890</span>
                  <span className="text-stone-500">Tên TK:</span>
                  <span className="col-span-2 font-medium text-stone-800">VOTIVE COMPANY</span>
                  <span className="text-stone-500">Chi nhánh:</span>
                  <span className="col-span-2 text-stone-600">TP. Hồ Chí Minh</span>
                </div>
              </div>
              <p className="text-sm text-stone-500">
                Vui lòng ghi rõ nội dung chuyển khoản: <strong>"VOTIVE [Số điện thoại] [Gói dịch vụ]"</strong>
              </p>
            </div>
          )}

          <form onSubmit={handlePayment} className="mt-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-stone-700 mb-1">Số điện thoại đã đăng ký</label>
              <input
                type="tel"
                required
                placeholder="0912 345 678"
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={isProcessing}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Đang xử lý...' : `Thanh toán ${selectedPlanData?.price} VNĐ`}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
