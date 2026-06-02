import { useState } from 'react';
import type { Service } from '../types';

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

function ServiceModal({ service, onClose }: { service: Service; onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    birthDate: '',
    birthTime: '',
    birthPlace: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const needsBirthInfo = ['chiem-tinh-co-ban', 'chiem-tinh-chuyen-sau'].includes(service.id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const apiUrl = import.meta.env.VITE_BOOKING_API_URL || '/api/booking';
      await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          serviceType: service.id,
          birthDate: formData.birthDate,
          birthTime: formData.birthTime,
          birthPlace: formData.birthPlace,
          message: formData.message,
          preferredDate: '',
        }),
      });
      setSubmitted(true);
    } catch {
      alert('Không thể gửi. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
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
                <p className="text-gold-600 font-medium">Từ {service.price} VNĐ</p>
              )}
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
            <svg className="w-6 h-6 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-stone-800 mb-2">Đặt dịch vụ thành công!</h4>
              <p className="text-stone-600">Chúng tôi sẽ liên hệ với bạn trong 24 giờ để xác nhận và hướng dẫn thanh toán.</p>
              <button onClick={onClose} className="mt-4 text-gold-600 hover:text-gold-700 font-medium">
                Đóng
              </button>
            </div>
          ) : (
            <>
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

              <form onSubmit={handleSubmit} className="space-y-4">
                <h4 className="font-medium text-stone-800">Đặt dịch vụ</h4>

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

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full disabled:opacity-50"
                >
                  {isSubmitting ? 'Đang gửi...' : 'Đặt dịch vụ & Thanh toán'}
                </button>

                {service.price && (
                  <p className="text-center text-sm text-stone-500">
                    Phí dịch vụ: <strong className="text-gold-600">{service.price} VNĐ</strong>
                  </p>
                )}
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function Services() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

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
                      <p className="text-lg font-bold text-gold-600">{service.price}</p>
                      <p className="text-xs text-stone-500">VNĐ</p>
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
        <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
      )}
    </>
  );
}
