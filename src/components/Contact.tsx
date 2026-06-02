import { useState, type FormEvent } from 'react';
import { saveBooking } from '../lib/supabase';

const SERVICE_OPTIONS = [
  { value: 'chiem-tinh-vedic', label: 'Chiêm Tinh Vệ Đà' },
  { value: 'tarot', label: 'Tarot' },
  { value: 'phong-thuy', label: 'Tư vấn Phong Thủy' },
  { value: 'cau-an', label: 'Cầu an - Giải hạn' },
  { value: 'tu-van-tam-linh', label: 'Tư vấn Tâm linh' },
  { value: 'lich-ngay-gio', label: 'Xem Lịch Ngày Giờ' },
  { value: 'khoa-hoc', label: 'Khóa học Vedic' },
  { value: 'khac', label: 'Dịch vụ khác' },
];

const ASTROLOGY_SERVICES = ['chiem-tinh-vedic'];

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await saveBooking({
        type: 'contact',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: `${formData.subject}: ${formData.message}`,
      });
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      alert('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <svg className="w-12 h-12 text-green-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-lg font-semibold text-green-800 mb-2">Gửi thành công!</h3>
        <p className="text-green-700">Chúng tôi sẽ liên hệ với bạn trong 24 giờ.</p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-4 text-green-600 hover:text-green-700 font-medium"
        >
          Gửi thêm tin nhắn
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Họ và tên *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none transition-colors"
            placeholder="Nguyễn Văn A"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Email *</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none transition-colors"
            placeholder="email@example.com"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Số điện thoại *</label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none transition-colors"
            placeholder="0912 345 678"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Chủ đề</label>
          <select
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none transition-colors"
          >
            <option value="">Chọn chủ đề</option>
            <option value="tu-van">Tư vấn dịch vụ</option>
            <option value="dat-lich">Đặt lịch hẹn</option>
            <option value="khoa-hoc">Tư vấn khóa học</option>
            <option value="giai-dap">Giải đáp thắc mắc</option>
            <option value="khac">Khác</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">Nội dung tin nhắn *</label>
        <textarea
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none transition-colors resize-none"
          placeholder="Mô tả ngắn gọn về vấn đề bạn cần tư vấn..."
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Đang gửi...' : 'Gửi liên hệ'}
      </button>
    </form>
  );
}

function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    birthDate: '',
    birthTime: '',
    birthPlace: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await saveBooking({
        type: 'service',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.serviceType,
        message: formData.message,
        birth_date: formData.birthDate,
        birth_time: formData.birthTime,
        location: formData.birthPlace,
      });
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        serviceType: '',
        birthDate: '',
        birthTime: '',
        birthPlace: '',
        message: '',
      });
    } catch {
      alert('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const needsBirthInfo = ASTROLOGY_SERVICES.includes(formData.serviceType);

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <svg className="w-12 h-12 text-green-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-lg font-semibold text-green-800 mb-2">Đặt lịch thành công!</h3>
        <p className="text-green-700">Chúng tôi sẽ xác nhận và liên hệ với bạn sớm nhất.</p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-4 text-green-600 hover:text-green-700 font-medium"
        >
          Đặt lịch khác
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Họ và tên *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none transition-colors"
            placeholder="Nguyễn Văn A"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Email *</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none transition-colors"
            placeholder="email@example.com"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Số điện thoại *</label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none transition-colors"
            placeholder="0912 345 678"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Dịch vụ *</label>
          <select
            required
            value={formData.serviceType}
            onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none transition-colors"
          >
            <option value="">Chọn dịch vụ</option>
            {SERVICE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {needsBirthInfo && (
        <div className="bg-amber-50 rounded-xl p-4 space-y-4">
          <h5 className="font-medium text-stone-700 flex items-center gap-2">
            <span>⭐</span> Thông tin sinh nhật để luận giải chiêm tinh
          </h5>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-600 mb-1">Ngày sinh *</label>
              <input
                type="date"
                required
                value={formData.birthDate}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-600 mb-1">Giờ sinh</label>
              <input
                type="time"
                value={formData.birthTime}
                onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-600 mb-1">Nơi sinh</label>
              <input
                type="text"
                value={formData.birthPlace}
                onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none transition-colors"
                placeholder="TP. Hồ Chí Minh"
              />
            </div>
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">Nội dung cần tư vấn</label>
        <textarea
          rows={3}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none transition-colors resize-none"
          placeholder="Mô tả thêm về nhu cầu của bạn..."
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Đang xử lý...' : 'Đặt lịch tư vấn'}
      </button>
    </form>
  );
}

export function Contact() {
  const [activeTab, setActiveTab] = useState<'contact' | 'booking'>('contact');

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container-width">
        <div className="text-center mb-12">
          <span className="text-gold-600 font-medium mb-2 block">Liên hệ với chúng tôi</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-800 mb-4">
            Sẵn sàng hỗ trợ bạn
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Điền thông tin và chúng tôi sẽ liên hệ lại trong 24 giờ để tư vấn
            và đặt lịch hẹn phù hợp với bạn.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-gradient-to-br from-gold-50 to-amber-50 rounded-2xl p-8">
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setActiveTab('contact')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'contact'
                    ? 'bg-gold-600 text-white'
                    : 'bg-white text-stone-600 hover:bg-stone-100'
                }`}
              >
                Liên hệ
              </button>
              <button
                onClick={() => setActiveTab('booking')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'booking'
                    ? 'bg-gold-600 text-white'
                    : 'bg-white text-stone-600 hover:bg-stone-100'
                }`}
              >
                Đặt lịch hẹn
              </button>
            </div>

            {activeTab === 'contact' ? <ContactForm /> : <BookingForm />}
          </div>

          <div className="space-y-6">
            <div className="bg-stone-50 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-stone-800 mb-1">Địa chỉ</h3>
                  <p className="text-stone-600">TP. Hồ Chí Minh, Việt Nam</p>
                </div>
              </div>
            </div>

            <div className="bg-stone-50 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-stone-800 mb-1">Email</h3>
                  <p className="text-stone-600">votive@vedicvn.com</p>
                </div>
              </div>
            </div>

            <div className="bg-stone-50 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-stone-800 mb-1">Điện thoại</h3>
                  <p className="text-stone-600">0385448747</p>
                  <p className="text-sm text-stone-500 mt-1">Thứ 2 - Thứ 7: 8:00 - 18:00</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gold-100 to-amber-100 rounded-xl p-6">
              <h4 className="font-semibold text-stone-800 mb-3">Lưu ý khi đặt lịch</h4>
              <ul className="space-y-2 text-sm text-stone-600">
                <li className="flex items-start gap-2">
                  <span className="text-gold-600">★</span>
                  Dịch vụ Chiêm Tinh Vệ Đà cần cung cấp ngày, giờ và nơi sinh để luận giải chính xác
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-600">★</span>
                  Chúng tôi sẽ liên hệ xác nhận trong vòng 24 giờ
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
