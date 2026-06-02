import type { Service } from '../types';

const services: Service[] = [
  {
    id: 'phong-thuy',
    title: 'Tư vấn Phong Thủy',
    description: 'Phân tích và điều chỉnh phong thủy nhà ở, văn phòng, cửa hàng để mang lại tài lộc và may mắn.',
    icon: '🏠',
    features: [
      'Xem phong thủy nhà ở',
      'Bố trí văn phòng',
      'Hướng nhà, cửa chính',
      'Chọn ngày động thổ',
    ],
  },
  {
    id: 'cau-an',
    title: 'Cầu an - Giải hạn',
    description: 'Nghi lễ cầu an, giải hạn theo tử vi cá nhân, giúp xua tan vận xui, mang lại bình an.',
    icon: '🕯️',
    features: [
      'Cầu an cửa ngõ',
      'Giải hạn tam tai',
      'Lễ bái gia tiên',
      'Xem ngày tốt xấu',
    ],
  },
  {
    id: 'tu-van-tam-linh',
    title: 'Tư vấn Tâm linh',
    description: 'Giải đáp thắc mắc về tâm linh, luận giải giấc mơ, và hướng dẫn tu tâm dưỡng tính.',
    icon: '✨',
    features: [
      'Luận giải giấc mơ',
      'Tư vấn tâm linh',
      'Hướng dẫn tu tâm',
      'Giải quyết trắc trở',
    ],
  },
  {
    id: 'lich-ngay-gio',
    title: 'Xem Lịch Ngày Giờ',
    description: 'Cung cấp thông tin lịch ngày, giờ hoàng đạo, hắc đạo, giúp bạn chọn thời điểm tốt nhất.',
    icon: '📅',
    features: [
      'Lịch vạn niên',
      'Giờ hoàng đạo',
      'Ngày kiêng kỵ',
      'Chọn ngày cưới',
    ],
  },
];

export function Services() {
  return (
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-stone-50 rounded-2xl p-6 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gold-200"
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-serif font-semibold text-stone-800 mb-3">
                {service.title}
              </h3>
              <p className="text-stone-600 mb-4 text-sm leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-stone-500">
                    <svg className="w-4 h-4 text-gold-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href={`#contact?service=${service.id}`}
                className="mt-6 inline-flex items-center gap-2 text-gold-600 font-medium hover:text-gold-700 transition-colors"
              >
                Đặt dịch vụ
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
