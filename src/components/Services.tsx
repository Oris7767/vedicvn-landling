import { useState, useEffect } from 'react';
import type { Service } from '../types';
import { createPayment, checkPaymentStatus } from '../lib/payment';
import { saveBooking } from '../lib/supabase';
import {
  CelestialWheelIcon,
  SuryaIcon,
  PrasnaIcon,
  TarotCardIcon,
  IChingIcon,
  RitualFlameIcon,
  DiyaIcon,
} from './icons/VedicIcons';
import {
  Check,
  Clock,
  QrCode,
  ShieldCheck,
  AlertCircle,
  Copy,
  ExternalLink,
  X,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

// Services that don't require upfront payment
const NO_PAYMENT_SERVICES = ['phap-su', 'tarot-offline'];

type ServiceCategory = 'all' | 'jyotish' | 'tarot-iching' | 'special';

interface ExtendedService extends Service {
  category: 'jyotish' | 'tarot-iching' | 'special';
  badge?: string;
  isPopular?: boolean;
}

const services: ExtendedService[] = [
  {
    id: 'chiem-tinh-co-ban',
    title: 'Chiêm Tinh Vệ Đà - Gói Cơ Bản',
    description: 'Phân tích bản đồ sao gốc D1, 12 nhà và trọng tâm 1 khía cạnh (tài chính, hôn nhân, sự nghiệp hoặc sức khỏe).',
    category: 'jyotish',
    badge: 'Phổ biến',
    features: [
      'Phân tích bản đồ sao gốc (D1 Rashi Chart)',
      'Giải mã Cung Mọc (Lagna) & 9 Graha',
      'Tư vấn trọng tâm 1 khía cạnh đời sống',
      'Thời lượng: 45 phút trao đổi trực tiếp',
      'Bàn giao file ghi âm buổi luận giải',
    ],
    price: '1,000,000',
    priceLabel: 'Gói cơ bản',
  },
  {
    id: 'chiem-tinh-chuyen-sau',
    title: 'Chiêm Tinh Vệ Đà - Gói Chuyên Sâu',
    description: 'Phân tích toàn diện Đại vận Vimshottari, Tiểu vận, chòm sao Nakshatra, tiềm năng nghiệp quả và biện pháp hóa giải (Remedies).',
    category: 'jyotish',
    badge: 'Khuyên dùng / Bestseller',
    isPopular: true,
    features: [
      'Phân tích song song D1 Rashi & D9 Navamsha',
      'Giải mã chi tiết 27 Nakshatra & Phân độ',
      'Đại vận Vimshottari & Tiểu vận 5 năm',
      'Biện pháp hóa giải & cân bằng thân tâm',
      'Thời lượng: 90 phút tư vấn chuyên sâu 1-1',
      'Bàn giao file ghi âm & bản tóm tắt cá nhân',
    ],
    price: '2,500,000',
    priceLabel: 'Gói chuyên sâu',
  },
  {
    id: 'chiem-tinh-prasna',
    title: 'Chiêm Tinh Đoán Sự (Prasna)',
    description: 'Động tâm giải đoán 1 vấn đề cụ thể tại thời khắc khởi ý niệm (Horary Astrology), hỗ trợ quyết định bước ngoặt.',
    category: 'jyotish',
    badge: 'Vấn thời khắc',
    features: [
      'Lập lá số tại thời điểm khởi tâm câu hỏi',
      'Phân tích nút thắt quyết định cấp bách',
      '30 phút tư vấn giải đáp trực tiếp',
      'Phù hợp: hợp tác, di chuyển, giao dịch lớn',
    ],
    price: '1,000,000',
    priceLabel: 'Gói Prasna',
  },
  {
    id: 'tarot-1-cau',
    title: 'Tarot - 1 Câu Hỏi',
    description: 'Đọc bài Tarot giải đáp 1 câu hỏi cụ thể, định hướng nhanh. Áp dụng khu vực Q1, Q2, Bình Thạnh hoặc Online.',
    category: 'tarot-iching',
    features: [
      '1 câu hỏi cụ thể, trọng tâm',
      'Giải đáp nhanh chóng, thấu suốt',
      'Tư vấn định hướng giải pháp tích cực',
    ],
    price: '120,000',
    priceLabel: 'Q1, Q2, Bình Thạnh',
  },
  {
    id: 'tarot-combo',
    title: 'Tarot - Combo 3 Câu Hỏi',
    description: 'Đọc bài Tarot combo 3 câu hỏi liên hoàn, phân tích toàn diện nhiều khía cạnh của một vấn đề nan giải.',
    category: 'tarot-iching',
    badge: 'Tiết kiệm',
    features: [
      '3 câu hỏi liên kết đa chiều',
      'Phân tích nguồn cơn & xu hướng phát triển',
      'Định hướng lựa chọn phù hợp nhất',
      'Tiết kiệm chi phí so với từng câu đơn lẻ',
    ],
    price: '350,000',
    priceLabel: 'Q1, Q2, Bình Thạnh',
  },
  {
    id: 'tarot-offline',
    title: 'Tarot Offline Trực Tiếp',
    description: 'Trải nghiệm đọc bài Tarot trực tiếp mặt đối mặt tại điểm dịch vụ (Q1, Q2, Bình Thạnh). Yêu cầu đặt trước 24h.',
    category: 'tarot-iching',
    features: [
      'Gặp gỡ trực tiếp chuyên gia tư vấn',
      'Tương tác trực quan với trải bài cổ điển',
      'Khu vực Q1, Q2, Bình Thạnh',
      'Đặt trước tối thiểu 24 giờ',
    ],
    price: 'Liên hệ',
    priceLabel: 'Liên hệ báo giá',
  },
  {
    id: 'kinh-dich',
    title: 'Chiêm Đoán Kinh Dịch',
    description: 'Động tâm giải quẻ Kinh Dịch cho một vấn đề thời cuộc, công việc hoặc định hướng hành động.',
    category: 'tarot-iching',
    features: [
      'Gieo quẻ theo thời điểm động tâm',
      '15 phút luận giải ý nghĩa quẻ Thoán & Hào',
      'Chỉ dẫn hành động "biết tiến biết thoái"',
    ],
    price: '120,000',
    priceLabel: 'Gói cơ bản',
  },
  {
    id: 'phap-su',
    title: 'Các Pháp Sự Cầu Tài Lộc, Bình An',
    description: 'Tư vấn và thực hiện nghi lễ cầu an, tài lộc, cân bằng năng lượng không gian sống theo nguyên lý tri thức cổ truyền.',
    category: 'special',
    features: [
      'Cầu an gia đạo & tĩnh tâm',
      'Cân bằng năng lượng không gian sống',
      'Tư vấn phong thủy theo Kinh Dịch',
      'Khảo sát và tư vấn theo từng trường hợp',
    ],
    price: 'Liên hệ',
    priceLabel: 'Liên hệ báo giá',
  },
];

function getServiceIcon(id: string) {
  switch (id) {
    case 'chiem-tinh-co-ban':
      return <CelestialWheelIcon size={32} className="text-votive-red" />;
    case 'chiem-tinh-chuyen-sau':
      return <SuryaIcon size={32} className="text-votive-red" />;
    case 'chiem-tinh-prasna':
      return <PrasnaIcon size={32} className="text-votive-red" />;
    case 'tarot-1-cau':
    case 'tarot-combo':
    case 'tarot-offline':
      return <TarotCardIcon size={32} className="text-votive-red" />;
    case 'kinh-dich':
      return <IChingIcon size={32} className="text-votive-red" />;
    case 'phap-su':
      return <RitualFlameIcon size={32} className="text-votive-red" />;
    default:
      return <DiyaIcon size={32} className="text-votive-red" />;
  }
}

type ModalStep = 'payment' | 'confirmed' | 'form' | 'success';

function ServiceModal({
  service,
  onClose,
  onShowPolicy,
}: {
  service: ExtendedService;
  onClose: () => void;
  onShowPolicy: () => void;
}) {
  const [step, setStep] = useState<ModalStep>('payment');
  const [paymentData, setPaymentData] = useState<{
    paymentCode: string;
    amount: number;
    qrUrl?: string;
    instructions: string;
    bankAccount?: string;
    bankName?: string;
  } | null>(null);
  const [isCreatingPayment, setIsCreatingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

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
  const [countdown, setCountdown] = useState(300); // 5 minutes = 300 seconds

  const needsBirthInfo = ['chiem-tinh-co-ban', 'chiem-tinh-chuyen-sau', 'chiem-tinh-prasna'].includes(service.id);
  const needPayment = !NO_PAYMENT_SERVICES.includes(service.id) && service.price !== 'Liên hệ';

  // Countdown timer
  useEffect(() => {
    if (step !== 'payment' || countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [step, countdown]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

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
          setCountdown(300);
        }
      } catch {
        setPaymentError('Không thể tạo mã thanh toán tự động. Bạn vẫn có thể điền thông tin để được hỗ trợ trực tiếp.');
      } finally {
        setIsCreatingPayment(false);
      }
    };

    initPayment();
  }, [needPayment, service.id, service.title, service.price]);

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
      alert('Không thể gửi thông tin. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyCode = () => {
    if (paymentData?.paymentCode) {
      navigator.clipboard.writeText(paymentData.paymentCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full max-h-[92vh] overflow-y-auto border border-votive-border shadow-2xl animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-votive-border p-5 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-votive-surface border border-votive-border flex items-center justify-center shrink-0">
              {getServiceIcon(service.id)}
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-votive-text leading-snug">
                {service.title}
              </h3>
              <p className="text-sm font-semibold text-votive-red mt-0.5">
                {service.price === 'Liên hệ' ? 'Liên hệ báo giá' : `${service.price} VNĐ`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-votive-muted hover:text-votive-red rounded-xl hover:bg-votive-surface transition-colors"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Step 1: Payment with Sepay VietQR */}
          {step === 'payment' && needPayment && (
            <div className="text-center">
              {isCreatingPayment ? (
                <div className="py-12">
                  <div className="w-12 h-12 border-3 border-votive-red border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-sm text-votive-muted font-medium">Đang tạo cổng thanh toán bảo mật VietQR...</p>
                </div>
              ) : paymentError ? (
                <div className="py-8">
                  <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <p className="text-sm text-red-700 mb-4">{paymentError}</p>
                  <button
                    onClick={() => setStep('form')}
                    className="btn-primary text-sm px-6 py-2.5"
                  >
                    Bỏ qua và điền thông tin đặt lịch
                  </button>
                </div>
              ) : paymentData ? (
                <>
                  <div className="mb-4">
                    <span className="badge-parchment text-xs mb-2 inline-flex items-center gap-1.5">
                      <QrCode className="w-3.5 h-3.5 text-votive-red" />
                      Thanh Toán Nhanh Qua VietQR
                    </span>
                    <h4 className="text-base font-semibold text-votive-text">
                      Quét mã để kích hoạt lịch tư vấn tự động
                    </h4>
                  </div>

                  {/* Payment Details Card */}
                  <div className="bg-votive-surface/70 border border-votive-border rounded-xl p-4 mb-4 text-left space-y-2.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-votive-muted">Số tiền thanh toán:</span>
                      <span className="font-bold text-base text-votive-red">
                        {paymentData.amount.toLocaleString('vi-VN')} VNĐ
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-votive-muted">Nội dung chuyển khoản:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-votive-text bg-white px-2 py-0.5 rounded border border-votive-border">
                          {paymentData.paymentCode}
                        </span>
                        <button
                          onClick={handleCopyCode}
                          className="p-1 text-votive-muted hover:text-votive-red transition-colors"
                          title="Sao chép mã"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    {copiedCode && (
                      <p className="text-[11px] text-green-700 text-right">Đã sao chép mã thành công!</p>
                    )}
                  </div>

                  {/* Countdown Timer */}
                  <div
                    className={`mb-4 py-2 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-2 ${
                      countdown <= 60
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>Mã thanh toán có hiệu lực trong:</span>
                    <span className="font-mono font-bold text-sm">{formatTime(countdown)}</span>
                  </div>

                  {/* VietQR Code Frame */}
                  {paymentData.qrUrl && (
                    <div className="bg-white border border-votive-border rounded-2xl p-4 shadow-sm inline-block mb-4">
                      <img
                        src={paymentData.qrUrl}
                        alt="VietQR Code"
                        className="w-56 h-56 object-contain mx-auto"
                      />
                      <a
                        href={paymentData.qrUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-votive-red hover:underline mt-2"
                      >
                        <span>Mở mã QR trong tab mới</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}

                  <p className="text-xs text-votive-muted mb-4 leading-relaxed">
                    Hệ thống sẽ tự động phát hiện chuyển khoản và chuyển bạn sang bước điền thông tin sau 1-3 giây.
                  </p>

                  <div className="pt-2 border-t border-votive-border flex items-center justify-between text-xs">
                    <span className="text-votive-muted">Chưa thể quét QR lúc này?</span>
                    <button
                      onClick={() => setStep('form')}
                      className="text-votive-red hover:underline font-medium"
                    >
                      Điền thông tin trước
                    </button>
                  </div>
                </>
              ) : null}
            </div>
          )}

          {/* Confirmed Animation */}
          {step === 'confirmed' && (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-200 animate-scale-in">
                <Check className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-serif font-bold text-votive-text mb-1">
                Thanh toán đã được ghi nhận!
              </h4>
              <p className="text-sm text-votive-muted">Đang chuyển sang phần hoàn thiện thông tin lá số...</p>
            </div>
          )}

          {/* Step 2: Information Form */}
          {step === 'form' && (
            <>
              {needPayment && (
                <div className="mb-5 p-3 bg-green-50/80 border border-green-200 rounded-xl flex items-center gap-2.5 text-xs text-green-800">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                  <span>Bước 2/2: Vui lòng cung cấp thông tin để chuyên gia chuẩn bị phân tích.</span>
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-votive-text">Họ và tên của bạn *</label>
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Văn A"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-votive-border bg-white focus:ring-2 focus:ring-votive-red/30 focus:border-votive-red outline-none text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-votive-text">Email nhận bài *</label>
                    <input
                      type="email"
                      required
                      placeholder="ban@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-votive-border bg-white focus:ring-2 focus:ring-votive-red/30 focus:border-votive-red outline-none text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-votive-text">Số điện thoại / Zalo *</label>
                    <input
                      type="tel"
                      required
                      placeholder="0912 345 678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-votive-border bg-white focus:ring-2 focus:ring-votive-red/30 focus:border-votive-red outline-none text-sm"
                    />
                  </div>
                </div>

                {/* Birth details required for astrology */}
                {needsBirthInfo && (
                  <div className="bg-votive-surface/70 border border-votive-border rounded-xl p-4 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-semibold text-votive-red">
                      <DiyaIcon size={16} />
                      <span>Thông tin sinh nhật để lập bản đồ sao chính xác</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <div>
                        <label className="block text-[11px] text-votive-muted mb-1">Ngày sinh *</label>
                        <input
                          type="date"
                          required
                          value={formData.birthDate}
                          onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-votive-border bg-white text-xs outline-none focus:border-votive-red"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-votive-muted mb-1">Giờ sinh (Giấy khai sinh)</label>
                        <input
                          type="time"
                          value={formData.birthTime}
                          onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-votive-border bg-white text-xs outline-none focus:border-votive-red"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-votive-muted mb-1">Nơi sinh (Tỉnh / Thành)</label>
                        <input
                          type="text"
                          placeholder="Hà Nội, TP.HCM..."
                          value={formData.birthPlace}
                          onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-votive-border bg-white text-xs outline-none focus:border-votive-red"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-votive-text">Nội dung hoặc câu hỏi cần tập trung</label>
                  <textarea
                    placeholder="Mô tả bối cảnh hoặc câu hỏi cần chuyên gia tư vấn kỹ càng..."
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-votive-border bg-white focus:ring-2 focus:ring-votive-red/30 focus:border-votive-red outline-none text-sm resize-none"
                  />
                </div>

                {/* Consent to Terms & Ethics */}
                <div className="p-3 bg-white border border-votive-border rounded-xl">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded text-votive-red focus:ring-votive-red"
                    />
                    <span className="text-xs text-votive-muted leading-relaxed">
                      Tôi đã đọc và đồng ý với{' '}
                      <button
                        type="button"
                        onClick={onShowPolicy}
                        className="text-votive-red hover:underline font-medium"
                      >
                        Chính sách & Điều khoản dịch vụ
                      </button>{' '}
                      của Votive Academy.
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !acceptedTerms}
                  className="btn-primary w-full py-3.5 text-sm shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Đang gửi hồ sơ...' : 'Xác nhận đặt lịch tư vấn'}
                </button>
              </form>
            </>
          )}

          {/* Step 3: Success */}
          {step === 'success' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-200">
                <Check className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-serif font-bold text-votive-text mb-2">
                Hồ sơ đã được gửi thành công!
              </h4>
              <p className="text-sm text-votive-muted mb-6 leading-relaxed max-w-sm mx-auto">
                Chuyên viên tư vấn của Votive Academy sẽ chủ động liên hệ với bạn trong vòng 24 giờ qua Zalo/Email để xác nhận thời gian chi tiết.
              </p>
              <button
                onClick={onClose}
                className="btn-primary text-sm px-8 py-2.5"
              >
                Hoàn tất
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
    <div
      className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto border border-votive-border shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-votive-border mb-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-votive-red" />
            <h3 className="text-xl font-serif font-bold text-votive-text">
              Chính sách & Điều khoản Dịch vụ
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-votive-muted hover:text-votive-red transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6 text-sm text-votive-text/90 leading-relaxed font-sans">
          <section>
            <h4 className="font-serif font-semibold text-base text-votive-red mb-2">
              1. Tuyên bố miễn trừ trách nhiệm (Disclaimer)
            </h4>
            <p className="text-xs text-votive-muted mb-2">
              Mọi nội dung phân tích dựa trên Hệ thống Chiêm tinh học Vệ Đà (Jyotish) chỉ mang tính chất định hướng nhận thức và hỗ trợ tinh thần. Thông tin không thay thế lời khuyên y tế, pháp lý, đầu tư tài chính chuyên nghiệp. Mọi quyết định luôn thuộc về tự do ý chí và trách nhiệm cá nhân của khách hàng.
            </p>
          </section>

          <section>
            <h4 className="font-serif font-semibold text-base text-votive-red mb-2">
              2. Bảo mật thông tin tuyệt đối
            </h4>
            <p className="text-xs text-votive-muted mb-2">
              Thông tin sinh nhật, lá số và nội dung buổi tư vấn được giữ bí mật 100%. File ghi âm trao đổi trực tiếp sẽ được lưu trữ bảo mật và cấp quyền truy cập riêng cho khách hàng.
            </p>
          </section>

          <section>
            <h4 className="font-serif font-semibold text-base text-votive-red mb-2">
              3. Chính sách thanh toán & Dời lịch
            </h4>
            <p className="text-xs text-votive-muted mb-2">
              Khách hàng có thể thông báo dời lịch tư vấn trước tối thiểu 24 giờ. Các khoản phí tư vấn đã thực hiện dịch vụ hoặc vắng mặt quá 15 phút không báo trước sẽ không áp dụng hoàn tiền.
            </p>
          </section>
        </div>

        <div className="mt-8 pt-4 border-t border-votive-border">
          <button
            onClick={onClose}
            className="btn-primary w-full py-3 text-sm font-medium"
          >
            Tôi đã hiểu và đồng ý
          </button>
        </div>
      </div>
    </div>
  );
}

export function Services() {
  const [selectedService, setSelectedService] = useState<ExtendedService | null>(null);
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');

  const filteredServices = services.filter((s) => {
    if (activeCategory === 'all') return true;
    return s.category === activeCategory;
  });

  return (
    <>
      <section id="services" className="section-padding relative">
        <div className="container-width">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="badge-parchment mb-3">
              <DiyaIcon size={14} className="text-votive-red" />
              Tư Vấn Chuyên Sâu 1-1
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-votive-text mb-4 tracking-tight">
              Dịch Vụ Luận Giải & Cố Vấn
            </h2>
            <p className="text-sm sm:text-base text-votive-muted leading-relaxed font-sans">
              Toàn bộ các gói dịch vụ được hướng dẫn bởi tri thức cổ truyền Vệ Đà, đảm bảo tính chuẩn xác, tận tâm và tuyệt đối tôn trọng tự do ý chí.
            </p>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              {[
                { id: 'all', label: 'Tất cả dịch vụ (8)' },
                { id: 'jyotish', label: 'Chiêm Tinh Vệ Đà (3)' },
                { id: 'tarot-iching', label: 'Tarot & Kinh Dịch (4)' },
                { id: 'special', label: 'Nghi Lễ & Cố Vấn (1)' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id as ServiceCategory)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                    activeCategory === tab.id
                      ? 'bg-votive-red text-white shadow-sm'
                      : 'bg-white/80 border border-votive-border text-votive-muted hover:text-votive-text hover:border-votive-sand'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Service Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className={`glass-card glass-card-hover rounded-2xl p-6 sm:p-7 flex flex-col justify-between relative ${
                  service.isPopular
                    ? 'border-2 border-votive-red/50 shadow-md ring-1 ring-votive-red/20'
                    : ''
                }`}
              >
                {/* Popular / Best value badge */}
                {service.badge && (
                  <div className="absolute -top-3 right-6">
                    <span
                      className={`text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm ${
                        service.isPopular
                          ? 'bg-votive-red text-white'
                          : 'bg-votive-surface border border-votive-border text-votive-red'
                      }`}
                    >
                      {service.badge}
                    </span>
                  </div>
                )}

                <div>
                  {/* Icon & Price */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-votive-surface border border-votive-border flex items-center justify-center p-2.5 shadow-sm">
                      {getServiceIcon(service.id)}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-serif font-bold text-votive-red tracking-tight">
                        {service.price === 'Liên hệ' ? (
                          <span>Liên hệ</span>
                        ) : (
                          <>
                            {service.price}
                            <span className="text-xs font-sans font-normal text-votive-muted ml-1">VNĐ</span>
                          </>
                        )}
                      </div>
                      <span className="text-[11px] text-votive-muted font-medium">
                        {service.priceLabel}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-serif font-bold text-votive-text mb-2.5 leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-votive-muted leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Features list */}
                  <div className="pt-4 border-t border-votive-border/60 mb-6">
                    <ul className="space-y-2.5">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-votive-text/80">
                          <Check className="w-4 h-4 text-votive-red shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card CTA button */}
                <button
                  onClick={() => setSelectedService(service)}
                  className={`w-full py-3 px-4 rounded-xl font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                    service.isPopular
                      ? 'btn-primary shadow-sm'
                      : 'bg-votive-surface border border-votive-border text-votive-text hover:bg-votive-red hover:text-white hover:border-votive-red'
                  }`}
                >
                  <span>{service.price === 'Liên hệ' ? 'Liên hệ đặt lịch' : 'Đặt lịch & Thanh toán'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Ethics guarantee footer bar */}
          <div className="mt-14 p-5 rounded-2xl bg-white/70 border border-votive-border/80 backdrop-blur-sm max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-votive-red shrink-0" />
              <p className="text-xs text-votive-muted leading-snug">
                Mọi buổi tư vấn đều được bảo mật 100% và tuân thủ chặt chẽ <strong>Bộ Quy Tắc Đạo Đức Nghề Nghiệp</strong> của Votive Academy.
              </p>
            </div>
            <button
              onClick={() => setShowPolicyModal(true)}
              className="text-xs font-semibold text-votive-red hover:underline whitespace-nowrap"
            >
              Xem chính sách dịch vụ →
            </button>
          </div>
        </div>
      </section>

      {/* Booking / Payment Modal */}
      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onShowPolicy={() => setShowPolicyModal(true)}
        />
      )}

      {/* Policy Modal */}
      {showPolicyModal && (
        <PolicyModal onClose={() => setShowPolicyModal(false)} />
      )}
    </>
  );
}
