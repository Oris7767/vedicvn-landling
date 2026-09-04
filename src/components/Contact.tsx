import { useState, type FormEvent } from 'react';
import { saveBooking } from '../lib/supabase';
import { DiyaIcon } from './icons/VedicIcons';
import {
  Mail,
  Phone,
  Clock,
  MapPin,
  Send,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  MessageSquare,
} from 'lucide-react';

const SERVICE_OPTIONS = [
  { value: 'chiem-tinh-co-ban', label: 'Chiêm Tinh Vệ Đà - Cơ Bản' },
  { value: 'chiem-tinh-chuyen-sau', label: 'Chiêm Tinh Vệ Đà - Chuyên Sâu' },
  { value: 'chiem-tinh-prasna', label: 'Chiêm Tinh Đoán Sự (Prasna)' },
  { value: 'tarot-1-cau', label: 'Tarot - 1 Câu Hỏi' },
  { value: 'tarot-combo', label: 'Tarot - Combo 3 Câu Hỏi' },
  { value: 'tarot-offline', label: 'Tarot Offline' },
  { value: 'kinh-dich', label: 'Chiêm Đoán Kinh Dịch' },
  { value: 'phap-su', label: 'Pháp Sự Cầu An & Tài Lộc' },
  { value: 'khoa-hoc', label: 'Tư Vấn Khóa Học Học Viện' },
  { value: 'khac', label: 'Nhu cầu tư vấn khác' },
];

const ASTROLOGY_SERVICES = [
  'chiem-tinh-co-ban',
  'chiem-tinh-chuyen-sau',
  'chiem-tinh-prasna',
];

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
        message: `${formData.subject ? `[${formData.subject}] ` : ''}${formData.message}`,
      });
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-8 text-center bg-green-50/80 border border-green-200 rounded-2xl animate-fade-in">
        <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-3" />
        <h3 className="text-lg font-serif font-bold text-votive-text mb-1">
          Gửi tin nhắn thành công!
        </h3>
        <p className="text-xs text-votive-muted mb-4">
          Cảm ơn bạn. Chúng tôi sẽ phản hồi qua email hoặc Zalo trong vòng 24 giờ.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-xs font-semibold text-votive-red hover:underline"
        >
          Gửi thêm tin nhắn khác
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <label className="block text-xs font-semibold text-votive-text">Họ và tên *</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl border border-votive-border bg-white text-sm outline-none focus:ring-2 focus:ring-votive-red/30 focus:border-votive-red transition-all"
          placeholder="Nguyễn Văn A"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-3.5">
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-votive-text">Email liên hệ *</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-votive-border bg-white text-sm outline-none focus:ring-2 focus:ring-votive-red/30 focus:border-votive-red transition-all"
            placeholder="email@example.com"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-votive-text">Số điện thoại / Zalo *</label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-votive-border bg-white text-sm outline-none focus:ring-2 focus:ring-votive-red/30 focus:border-votive-red transition-all"
            placeholder="0912 345 678"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="block text-xs font-semibold text-votive-text">Chủ đề quan tâm</label>
        <select
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl border border-votive-border bg-white text-sm outline-none focus:ring-2 focus:ring-votive-red/30 focus:border-votive-red transition-all"
        >
          <option value="">Chọn chủ đề cần hỗ trợ</option>
          <option value="tu-van-dich-vu">Tư vấn chọn gói dịch vụ chiêm tinh</option>
          <option value="dat-lich-1-1">Đặt lịch tư vấn trực tiếp với Founder</option>
          <option value="khoa-hoc">Tìm hiểu các khóa học Votive Academy</option>
          <option value="khac">Câu hỏi & góp ý khác</option>
        </select>
      </div>

      <div className="space-y-1">
        <label className="block text-xs font-semibold text-votive-text">Nội dung tin nhắn *</label>
        <textarea
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl border border-votive-border bg-white text-sm outline-none focus:ring-2 focus:ring-votive-red/30 focus:border-votive-red transition-all resize-none"
          placeholder="Mô tả tóm tắt nội dung bạn muốn trao đổi..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full py-3.5 text-sm shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
      >
        <Send className="w-4 h-4" />
        <span>{isSubmitting ? 'Đang gửi...' : 'Gửi tin nhắn'}</span>
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
      alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const needsBirthInfo = ASTROLOGY_SERVICES.includes(formData.serviceType);

  if (submitted) {
    return (
      <div className="p-8 text-center bg-green-50/80 border border-green-200 rounded-2xl animate-fade-in">
        <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-3" />
        <h3 className="text-lg font-serif font-bold text-votive-text mb-1">
          Đặt lịch thành công!
        </h3>
        <p className="text-xs text-votive-muted mb-4">
          Bộ phận học vụ sẽ liên hệ qua số điện thoại để sắp xếp lịch hẹn phù hợp nhất.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-xs font-semibold text-votive-red hover:underline"
        >
          Đặt lịch dịch vụ khác
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <label className="block text-xs font-semibold text-votive-text">Họ và tên của bạn *</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl border border-votive-border bg-white text-sm outline-none focus:ring-2 focus:ring-votive-red/30 focus:border-votive-red transition-all"
          placeholder="Nguyễn Văn A"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-3.5">
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-votive-text">Email nhận bài *</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-votive-border bg-white text-sm outline-none focus:ring-2 focus:ring-votive-red/30 focus:border-votive-red transition-all"
            placeholder="email@example.com"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-votive-text">Số điện thoại / Zalo *</label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-votive-border bg-white text-sm outline-none focus:ring-2 focus:ring-votive-red/30 focus:border-votive-red transition-all"
            placeholder="0912 345 678"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="block text-xs font-semibold text-votive-text">Gói dịch vụ mong muốn *</label>
        <select
          required
          value={formData.serviceType}
          onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl border border-votive-border bg-white text-sm outline-none focus:ring-2 focus:ring-votive-red/30 focus:border-votive-red transition-all"
        >
          <option value="">Chọn dịch vụ bạn muốn đặt lịch</option>
          {SERVICE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {needsBirthInfo && (
        <div className="p-4 rounded-xl bg-votive-surface/70 border border-votive-border space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-votive-red">
            <DiyaIcon size={16} />
            <span>Thông tin ngày giờ sinh (Giấy khai sinh)</span>
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
              <label className="block text-[11px] text-votive-muted mb-1">Giờ sinh chính xác</label>
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
                value={formData.birthPlace}
                onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-votive-border bg-white text-xs outline-none focus:border-votive-red"
                placeholder="TP. Hồ Chí Minh"
              />
            </div>
          </div>
        </div>
      )}

      <div className="space-y-1">
        <label className="block text-xs font-semibold text-votive-text">Ghi chú yêu cầu tư vấn</label>
        <textarea
          rows={3}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl border border-votive-border bg-white text-sm outline-none focus:ring-2 focus:ring-votive-red/30 focus:border-votive-red transition-all resize-none"
          placeholder="Mô tả ngắn gọn về nhu cầu hoặc thời gian thuận tiện của bạn..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full py-3.5 text-sm shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
      >
        <Calendar className="w-4 h-4" />
        <span>{isSubmitting ? 'Đang gửi...' : 'Gửi yêu cầu đặt lịch hẹn'}</span>
      </button>
    </form>
  );
}

export function Contact() {
  const [activeTab, setActiveTab] = useState<'booking' | 'contact'>('booking');

  return (
    <section id="contact" className="section-padding bg-votive-surface/50 border-t border-votive-border/70 relative">
      <div className="container-width">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="badge-parchment mb-3">
            <DiyaIcon size={14} className="text-votive-red" />
            Kết Nối & Đồng Hành
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-votive-text mb-4 tracking-tight">
            Liên Hệ Với Votive Academy
          </h2>
          <p className="text-sm sm:text-base text-votive-muted leading-relaxed font-sans">
            Điền thông tin đặt lịch hẹn hoặc gửi tin nhắn trao đổi. Chuyên viên học vụ sẽ liên hệ phản hồi bạn trong vòng 24 giờ.
          </p>
        </div>

        {/* 2-Column Container */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Form with Tabs */}
          <div className="lg:col-span-7 glass-card rounded-3xl p-6 sm:p-8 border border-votive-border shadow-sm">
            {/* Tab switchers */}
            <div className="flex p-1 rounded-2xl bg-votive-surface border border-votive-border mb-6">
              <button
                onClick={() => setActiveTab('booking')}
                className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                  activeTab === 'booking'
                    ? 'bg-votive-red text-white shadow-sm'
                    : 'text-votive-muted hover:text-votive-text'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Đặt lịch tư vấn</span>
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                  activeTab === 'contact'
                    ? 'bg-votive-red text-white shadow-sm'
                    : 'text-votive-muted hover:text-votive-text'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Gửi tin nhắn</span>
              </button>
            </div>

            {activeTab === 'booking' ? <BookingForm /> : <ContactForm />}
          </div>

          {/* Right Column: Contact Channels & Credentials */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card rounded-3xl p-7 border border-votive-border space-y-6 shadow-sm">
              <h3 className="text-xl font-serif font-bold text-votive-text border-b border-votive-border pb-4">
                Thông Tin Trực Tiếp
              </h3>

              <div className="space-y-4 text-sm text-votive-text/90">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-votive-surface border border-votive-border flex items-center justify-center text-votive-red shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-votive-muted">Email hỗ trợ học vụ</div>
                    <a
                      href="mailto:contact@vedicvn.com"
                      className="font-medium hover:text-votive-red transition-colors"
                    >
                      contact@vedicvn.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-votive-surface border border-votive-border flex items-center justify-center text-votive-red shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-votive-muted">Hotline / Zalo tư vấn</div>
                    <div className="flex flex-wrap items-center gap-2 mt-0.5">
                      <a
                        href="tel:0385448747"
                        className="font-medium hover:text-votive-red transition-colors"
                      >
                        0385 448 747
                      </a>
                      <a
                        href="https://zalo.me/0385448747"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200 transition-colors"
                      >
                        Chat Zalo
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-votive-surface border border-votive-border flex items-center justify-center text-votive-red shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-votive-muted">Thời gian làm việc</div>
                    <div className="font-medium">Thứ Hai - Thứ Bảy: 09:00 - 18:30</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-votive-surface border border-votive-border flex items-center justify-center text-votive-red shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-votive-muted">Địa chỉ làm việc</div>
                    <div className="font-medium">
                      Văn phòng TP. Hồ Chí Minh (Hỗ trợ tư vấn Online toàn cầu & Trực tiếp tại điểm hẹn Q1, Q2)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Confidentiality card */}
            <div className="p-5 rounded-2xl bg-votive-surface/80 border border-votive-border/80 flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-votive-red shrink-0 mt-0.5" />
              <p className="text-xs text-votive-muted leading-relaxed">
                Mọi thông tin cá nhân và dữ liệu sinh nhật cung cấp qua biểu mẫu được mã hóa và bảo vệ theo tiêu chuẩn bảo mật của hệ sinh thái VedicVN.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
