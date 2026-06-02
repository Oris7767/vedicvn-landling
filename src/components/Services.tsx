import { useState, useEffect } from 'react';
import type { Service } from '../types';
import { createPayment, checkPaymentStatus } from '../lib/payment';
import { saveBooking } from '../lib/supabase';

// Services that don't require upfront payment
const NO_PAYMENT_SERVICES = ['phap-su'];

const services: Service[] = [
  {
    id: 'chiem-tinh-co-ban',
    title: 'Chiêm Tinh Vệ Đà - Gói Cơ Bản',
    description: 'Phân tích bản đồ sao gốc, chuyên sâu 1 vấn đề (tài chính, hôn nhân, sức khỏe...)',
    icon: '⭐',
    features: [
      'Phân tích bản đồ sao gốc',
      'Chuyên sâu 1 vấn đề',
      'Tư vấn tài chính, hôn nhân, sức khỏe',
    ],
    price: '1,000,000',
    priceLabel: 'Gói cơ bản',
  },
  {
    id: 'chiem-tinh-chuyen-sau',
    title: 'Chiêm Tinh Vệ Đà - Gói Chuyên Sâu',
    description: 'Phân tích toàn diện Đại vận, Tiểu vận, chòm sao Nakshatra, tiềm năng cá nhân và biện pháp khắc phục.',
    icon: '⭐',
    features: [
      'Phân tích Đại vận & Tiểu vận',
      'Chòm sao (Nakshatra) chuyên sâu',
      'Tiềm năng cá nhân',
      'Biện pháp khắc phục',
    ],
    price: '2,500,000',
    priceLabel: 'Gói chuyên sâu',
  },
  {
    id: 'chiem-tinh-prasna',
    title: 'Chiêm Tinh Đoán Sự (Prasna)',
    description: 'Động tâm 1 vấn đề cụ thể, kèm 30 phút tư vấn trực tiếp.',
    icon: '⭐',
    features: [
      'Động tâm 1 vấn đề',
      '30 phút tư vấn',
      'Giải đáp nhanh chóng',
    ],
    price: '1,000,000',
    priceLabel: 'Gói Prasna',
  },
  {
    id: 'tarot-1-cau',
    title: 'Tarot - 1 Câu Hỏi',
    description: 'Đọc bài Tarot 1 câu hỏi cụ thể. Áp dụng khu vực Q1, Q2, Bình Thạnh.',
    icon: '🃏',
    features: [
      '1 câu hỏi cụ thể',
      'Giải đáp nhanh',
      'Tư vấn định hướng',
    ],
    price: '120,000',
    priceLabel: 'Q1, Q2, Bình Thạnh',
  },
  {
    id: 'tarot-combo',
    title: 'Tarot - Combo 3 Câu Hỏi',
    description: 'Đọc bài Tarot combo 3 câu hỏi. Áp dụng khu vực Q1, Q2, Bình Thạnh.',
    icon: '🃏',
    features: [
      '3 câu hỏi',
      'Phân tích toàn diện hơn',
      'Tiết kiệm chi phí',
    ],
    price: '350,000',
    priceLabel: 'Q1, Q2, Bình Thạnh',
  },
  {
    id: 'tarot-offline',
    title: 'Tarot Offline',
    description: 'Đọc bài Tarot trực tiếp tại điểm dịch vụ. Áp dụng khu vực Q1, Q2, Bình Thạnh. Đặt trước 24h.',
    icon: '🃏',
    features: [
      'Gặp trực tiếp',
      'Book trước 24h',
      'Khu vực Q1, Q2, Bình Thạnh',
    ],
    price: '100,000',
    priceLabel: 'Q1, Q2, Bình Thạnh',
  },
  {
    id: 'kinh-dich',
    title: 'Kinh Dịch',
    description: 'Động tâm 1 vấn đề bằng Kinh Dịch, kèm 15 phút tư vấn.',
    icon: '📜',
    features: [
      'Động tâm 1 vấn đề',
      '15 phút tư vấn',
      'Giải đáp chính xác',
    ],
    price: '120,000',
    priceLabel: 'Gói cơ bản',
  },
  {
    id: 'phap-su',
    title: 'Các Pháp Sự Cầu Tài Lộc, Bình An',
    description: 'Nghi lễ cầu tài lộc, bình an, phong thủy theo Kinh Dịch.',
    icon: '🕯️',
    features: [
      'Cầu tài lộc',
      'Cầu bình an',
      'Phong thủy',
    ],
    price: 'Liên hệ',
    priceLabel: 'Liên hệ báo giá',
  },
];

type ModalStep = 'payment' | 'confirmed' | 'form' | 'success';

function ServiceModal({ service, onClose, onShowPolicy }: { service: Service; onClose: () => void; onShowPolicy: () => void }) {
  const [step, setStep] = useState<ModalStep>('payment');
  const [paymentData, setPaymentData] = useState<{ paymentCode: string; amount: number; qrUrl?: string; instructions: string } | null>(null);
  const [isCreatingPayment, setIsCreatingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    birthDate: '',
    birthTime: '',
    birthPlace: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const needsBirthInfo = ['chiem-tinh-co-ban', 'chiem-tinh-chuyen-sau'].includes(service.id);
  const needPayment = !NO_PAYMENT_SERVICES.includes(service.id);

  // Poll payment status
  useEffect(() => {
    if (step !== 'payment' || !paymentData) return;

    const pollInterval = setInterval(async () => {
      try {
        const status = await checkPaymentStatus(paymentData.paymentCode);
        if (status.status === 'paid') {
          setStep('confirmed');
          setTimeout(() => setStep('form'), 1500);
          clearInterval(pollInterval);
        }
      } catch {
        // Ignore polling errors
      }
    }, 3000);

    return () => clearInterval(pollInterval);
  }, [step, paymentData]);

  // Create payment on mount for services with fixed price
  useEffect(() => {
    if (!needPayment) {
      setStep('form');
      return;
    }

    const initPayment = async () => {
      setIsCreatingPayment(true);
      setPaymentError(null);

      try {
        const amount = Number(service.price?.replace(/,/g, '') || 0);
        if (amount > 0) {
          const result = await createPayment({
            serviceId: service.id,
            serviceName: service.title,
            amount,
            customerName: '',
            customerEmail: '',
            customerPhone: '',
          });
          setPaymentData(result);
        }
      } catch {
        setPaymentError('Không thể tạo thanh toán. Vui lòng thử lại.');
      } finally {
        setIsCreatingPayment(false);
      }
    };

    initPayment();
  }, [needPayment, service.id, service.title, service.price]);

  const handleOpenQR = () => {
    if (paymentData?.qrUrl) {
      window.open(paymentData.qrUrl, '_blank');
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!acceptedTerms) {
      alert('Vui lòng đồng ý với Chính sách và Điều khoản dịch vụ.');
      return;
    }

    setIsSubmitting(true);

    try {
      await saveBooking({
        type: 'service',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: service.title,
        message: formData.message,
        birth_date: formData.birthDate,
        birth_time: formData.birthTime,
        location: formData.birthPlace,
        payment_status: needPayment ? 'paid' : undefined,
        payment_code: paymentData?.paymentCode,
        payment_amount: paymentData?.amount,
        paid_at: needPayment ? new Date().toISOString() : undefined,
      });
      setStep('success');
    } catch {
      alert('Không thể gửi. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setPaymentData(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={handleClose}>
      <div
        className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-stone-200 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{service.icon}</span>
            <div>
              <h3 className="text-xl font-serif font-bold text-stone-800">{service.title}</h3>
              {service.price && (
                <p className="text-gold-600 font-medium">
                  {service.price === 'Liên hệ' ? 'Liên hệ báo giá' : `${service.price} VNĐ`}
                </p>
              )}
            </div>
          </div>
          <button onClick={handleClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
            <svg className="w-6 h-6 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {/* Step: Payment (for paid services) */}
          {step === 'payment' && needPayment && (
            <div className="text-center">
              {isCreatingPayment ? (
                <div className="py-8">
                  <div className="w-16 h-16 border-4 border-gold-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-stone-600">Đang tạo mã thanh toán...</p>
                </div>
              ) : paymentError ? (
                <div className="py-8">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">❌</span>
                  </div>
                  <p className="text-red-600 mb-4">{paymentError}</p>
                  <button onClick={() => window.location.reload()} className="px-6 py-2 bg-gold-600 text-white rounded-lg">
                    Thử lại
                  </button>
                </div>
              ) : paymentData ? (
                <>
                  <h4 className="text-lg font-semibold text-stone-800 mb-4">Quét mã QR để thanh toán</h4>

                  <div className="bg-stone-50 rounded-xl p-4 mb-4">
                    <p className="text-sm text-stone-500 mb-1">Số tiền cần thanh toán</p>
                    <p className="text-2xl font-bold text-gold-600">
                      {paymentData.amount.toLocaleString('vi-VN')} VNĐ
                    </p>
                  </div>

                  <div className="bg-amber-50 rounded-xl p-4 mb-4">
                    <p className="text-sm text-stone-500 mb-1">Nội dung chuyển khoản</p>
                    <p className="text-lg font-mono font-bold text-stone-800">
                      {paymentData.paymentCode}
                    </p>
                  </div>

                  {paymentData.qrUrl && (
                    <button
                      onClick={handleOpenQR}
                      className="mb-4 px-6 py-3 bg-gold-600 hover:bg-gold-700 text-white rounded-lg font-medium transition-colors inline-flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                      </svg>
                      Mở QR thanh toán
                    </button>
                  )}

                  <p className="text-sm text-stone-500 mb-4">
                    Đang chờ thanh toán... Vui lòng không đóng cửa sổ này.
                  </p>
                </>
              ) : null}
            </div>
          )}

          {/* Step: Confirmed - Payment success */}
          {step === 'confirmed' && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-green-600 mb-2">Thanh toán thành công!</h4>
              <p className="text-stone-600">Đang chuyển sang điền thông tin...</p>
            </div>
          )}

          {/* Step: Form */}
          {step === 'form' && (
            <>
              {needPayment && (
                <div className="mb-4 p-3 bg-green-50 rounded-lg flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-green-700 text-sm font-medium">Đã thanh toán thành công</span>
                </div>
              )}

              <div className="mb-6">
                <p className="text-stone-600 mb-4">{service.description}</p>
                <div className="bg-stone-50 rounded-xl p-4 mb-4">
                  <h4 className="font-medium text-stone-800 mb-3">Dịch vụ bao gồm</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-stone-600">
                        <svg className="w-4 h-4 text-gold-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <h4 className="font-medium text-stone-800">Thông tin của bạn</h4>

                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <input
                      type="text"
                      required
                      placeholder="Họ và tên *"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Email *"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="Số điện thoại *"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none"
                    />
                  </div>
                </div>

                {needsBirthInfo && (
                  <div className="bg-amber-50 rounded-xl p-4 space-y-4">
                    <h5 className="font-medium text-stone-700 flex items-center gap-2">
                      <span>📋</span> Thông tin sinh nhật để luận giải
                    </h5>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <input
                          type="date"
                          required
                          placeholder="Ngày sinh *"
                          value={formData.birthDate}
                          onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none"
                        />
                      </div>
                      <div>
                        <input
                          type="time"
                          placeholder="Giờ sinh"
                          value={formData.birthTime}
                          onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Nơi sinh"
                          value={formData.birthPlace}
                          onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <textarea
                    placeholder="Nội dung cần tư vấn (tùy chọn)"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none resize-none"
                  />
                </div>

                <div className="bg-stone-50 rounded-lg p-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="mt-1 w-5 h-5 rounded border-stone-300 text-gold-600 focus:ring-gold-500 cursor-pointer"
                    />
                    <span className="text-sm text-stone-600">
                      Tôi đã đọc và đồng ý với{' '}
                      <button
                        type="button"
                        onClick={onShowPolicy}
                        className="text-gold-600 hover:text-gold-700 underline font-medium"
                      >
                        Chính sách và Điều khoản dịch vụ
                      </button>{' '}
                      của Votive Academy
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !acceptedTerms}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Đang gửi...' : 'Xác nhận đặt dịch vụ'}
                </button>
              </form>
            </>
          )}

          {/* Step: Success */}
          {step === 'success' && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-stone-800 mb-2">Đặt dịch vụ thành công!</h4>
              <p className="text-stone-600 mb-4">
                {needPayment
                  ? 'Thanh toán đã được xác nhận. Chúng tôi sẽ liên hệ với bạn trong 24 giờ.'
                  : 'Chúng tôi sẽ liên hệ với bạn trong 24 giờ để xác nhận và báo giá.'}
              </p>
              <button onClick={handleClose} className="px-6 py-2 bg-gold-600 hover:bg-gold-700 text-white rounded-lg font-medium">
                Đóng
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PolicyModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-stone-200 p-6 flex items-center justify-between">
          <h3 className="text-xl font-serif font-bold text-stone-800">Chính sách và Điều khoản dịch vụ</h3>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
            <svg className="w-6 h-6 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6 text-sm text-stone-600">
          <section>
            <h4 className="font-semibold text-stone-800 mb-2">1. Tuyên bố miễn trừ trách nhiệm (Disclaimer)</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Tính chất dịch vụ:</strong> Mọi phân tích, diễn giải và dự đoán dựa trên Hệ thống Chiêm tinh học Vệ Đà chỉ mang tính chất hướng dẫn, tham khảo và hỗ trợ tinh thần.</li>
              <li><strong>Không thay thế chuyên gia:</strong> Thông tin không có giá trị thay thế cho lời khuyên chuyên môn về pháp lý, tài chính, y tế hoặc tâm lý.</li>
              <li><strong>Trách nhiệm cá nhân:</strong> Quyết định cuối cùng luôn thuộc về tự do ý chí và trách nhiệm cá nhân 100% của khách hàng.</li>
            </ul>
          </section>

          <section>
            <h4 className="font-semibold text-stone-800 mb-2">2. Chính sách bảo mật</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Chúng tôi chỉ thu thập thông tin cần thiết: Họ tên, Ngày sinh, Giờ sinh, Nơi sinh, Email.</li>
              <li>Mọi thông tin cá nhân và nội dung trao đổi được giữ bí mật tuyệt đối.</li>
              <li>File ghi âm/ghi hình sẽ tự động xóa sau <strong>30 ngày</strong> kể từ ngày bàn giao.</li>
            </ul>
          </section>

          <section>
            <h4 className="font-semibold text-stone-800 mb-2">3. Chính sách thanh toán & Không hoàn tiền</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Không hoàn tiền:</strong> Tất cả các khoản thanh toán là <strong>cuối cùng và không được hoàn lại</strong> dưới bất kỳ lý do gì.</li>
              <li><strong>Dời lịch:</strong> Thông báo trước ít nhất <strong>24 giờ</strong>, được hỗ trợ dời tối đa <strong>01 lần</strong>.</li>
              <li><strong>Vắng mặt:</strong> Quá 15 phút không thông báo = mất quyền hoàn tiền và dời lịch.</li>
            </ul>
          </section>

          <section>
            <h4 className="font-semibold text-stone-800 mb-2">4. Quyền sở hữu trí tuệ</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Tài liệu, báo cáo và file ghi âm là tài sản của Votive Academy.</li>
              <li>Nghiêm cấm sao chép, phát tán công khai hoặc thương mại hóa nếu chưa có sự đồng ý bằng văn bản.</li>
            </ul>
          </section>

          <section>
            <h4 className="font-semibold text-stone-800 mb-2">5. Quy tắc ứng xử</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Tôn trọng, cởi mở trong buổi tư vấn.</li>
              <li>Nghiêm cấm hành vi thù địch, xúc phạm chuyên gia.</li>
              <li>Không yêu cầu giải đoán lá số bên thứ ba khi chưa có sự đồng ý.</li>
            </ul>
          </section>

          <div className="pt-4 border-t border-stone-200 text-center">
            <p className="text-stone-500 italic">
              Cảm ơn bạn đã tin tưởng Votive Academy!
            </p>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-stone-200 p-4">
          <button
            onClick={onClose}
            className="w-full py-3 bg-gold-600 hover:bg-gold-700 text-white rounded-lg font-medium transition-colors"
          >
            Đã hiểu
          </button>
        </div>
      </div>
    </div>
  );
}

export function Services() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showPolicyModal, setShowPolicyModal] = useState(false);

  return (
    <>
      <section id="services" className="section-padding bg-white">
        <div className="container-width">
          <div className="text-center mb-16">
            <span className="text-gold-600 font-medium mb-2 block">Dịch vụ của chúng tôi</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-800 mb-4">
              Giải pháp tâm linh toàn diện
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Đa dạng dịch vụ tâm linh, được thực hiện bởi đội ngũ chuyên gia
              với nhiều năm kinh nghiệm và đạo đức nghề nghiệp.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="group bg-stone-50 rounded-2xl p-6 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gold-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-5xl">{service.icon}</span>
                  {service.price && (
                    <div className="text-right">
                      <p className="text-lg font-bold text-gold-600">
                        {service.price === 'Liên hệ' ? 'Liên hệ' : service.price}
                      </p>
                      {service.price !== 'Liên hệ' && (
                        <p className="text-xs text-stone-500">VNĐ</p>
                      )}
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-serif font-semibold text-stone-800 mb-3">
                  {service.title}
                </h3>
                <p className="text-stone-600 mb-4 text-sm leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-4">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-stone-500">
                      <svg className="w-4 h-4 text-gold-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setSelectedService(service)}
                  className="w-full py-2.5 px-4 bg-gold-600 hover:bg-gold-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  Đặt dịch vụ
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onShowPolicy={() => setShowPolicyModal(true)}
        />
      )}

      {showPolicyModal && (
        <PolicyModal onClose={() => setShowPolicyModal(false)} />
      )}
    </>
  );
}
