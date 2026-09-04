import { useState } from 'react';
import { saveBooking } from '../lib/supabase';
import {
  NumerologyIcon,
  AyurvedaIcon,
  CelestialWheelIcon,
  FinancialCycleIcon,
} from './icons/VedicIcons';
import { Check, BookOpen, Clock, Award, X, Sparkles, ArrowRight } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  icon: (size?: number) => React.ReactNode;
  description: string;
  sessions: string;
  format: string;
  instructor: string;
  highlights: string[];
  special?: boolean;
}

const courses: Course[] = [
  {
    id: 'chiem-tinh-co-ban',
    title: 'Chiêm Tinh Vệ Đà Toàn Diện (4 Cấp Độ)',
    icon: (size = 32) => <CelestialWheelIcon size={size} className="text-votive-red" />,
    description: 'Lộ trình chuẩn hóa từ nhập môn đến phân tích chuyên sâu, thấu hiểu 27 chòm sao Nakshatra, 9 hành tinh Graha và 12 cung hoàng đạo trong hệ thống Jyotish chính thống.',
    sessions: '56 buổi (4 cấp độ)',
    format: 'Trực tuyến (Zoom & LMS)',
    instructor: 'Trâm Phạm (Chứng chỉ Gurukul Ấn Độ, BAVA Member)',
    special: true,
    highlights: [
      'Cấp I (8 buổi): Nền tảng triết học Vệ Đà, 12 nhà (Bhava) & 12 cung (Rashi)',
      'Cấp II (15 buổi): 9 hành tinh (Graha), tọa độ, sức mạnh & tương tác',
      'Cấp III (15 buổi): Giải mã 27 Nakshatra, Đại vận Vimshottari & D9 Navamsha',
      'Cấp IV (18 buổi): Thực hành phân tích lá số thực tế & phương pháp hóa giải',
    ],
  },
  {
    id: 'chiem-tinh-tai-chinh',
    title: 'Chiêm Tinh Tài Chính & Chu Kỳ Gann',
    icon: (size = 32) => <FinancialCycleIcon size={size} className="text-votive-red" />,
    description: 'Sự giao thoa giữa chiêm tinh Vệ Đà cổ điển và chu kỳ tài chính vĩ mô, ứng dụng nguyên lý hình học W.D. Gann để nhận diện vùng đảo chiều và nhịp vận động kinh tế.',
    sessions: 'Định kỳ hằng năm',
    format: 'Chuyên đề giới hạn',
    instructor: 'Trâm Phạm (Nghiên cứu Mundane & Financial Astrology)',
    special: true,
    highlights: [
      'Chu kỳ các đại hành tinh (Jupiter, Saturn, Rahu-Ketu) với thị trường tài chính',
      'Nhận diện các vùng đảo chiều xu hướng theo chu kỳ thiên văn',
      'Ứng dụng nguyên lý chu kỳ thời gian Gann vào phân tích thực chiến',
      'Tư duy quản trị rủi ro trên nền tảng chu kỳ tự nhiên',
    ],
  },
  {
    id: 'so-hoc',
    title: 'Số Học Vệ Đà (Vedic Numerology)',
    icon: (size = 32) => <NumerologyIcon size={size} className="text-votive-red" />,
    description: 'Các nhà hiền triết cổ xưa đã mã hóa năng lượng của 9 hành tinh vào 9 con số. Khóa học giúp bạn thấu suốt tần số rung động của họ tên và ngày sinh theo góc nhìn Vệ Đà.',
    sessions: '10 buổi học',
    format: 'Trực tuyến tương tác',
    instructor: 'Trâm Phạm (Học viện Votive)',
    highlights: [
      'Nhập môn triết lý Số Học Vệ Đà',
      'Mã hóa 9 hành tinh tương ứng với 9 con số nguyên bản',
      'Ý nghĩa số chủ đạo, số linh hồn và các con số ghép',
      'Ứng dụng dự đoán chu kỳ năm cá nhân và định hướng nghề nghiệp',
    ],
  },
  {
    id: 'ayurveda',
    title: 'Ayurveda & Bản Thiết Kế Thân - Tâm',
    icon: (size = 32) => <AyurvedaIcon size={size} className="text-votive-red" />,
    description: 'Cơ thể con người là một tiểu vũ trụ phản chiếu 5 nguyên tố tự nhiên. Khóa học giúp bạn nhận diện thể trạng gốc và phương pháp nuôi dưỡng cân bằng lối sống.',
    sessions: '8 buổi học',
    format: 'Trực tuyến tương tác',
    instructor: 'Trâm Phạm (Học viện Votive)',
    highlights: [
      'Năm nguyên tố cơ bản cấu thành vạn vật (Pancha Mahabhutas)',
      'Thấu hiểu 3 Dosha cốt lõi: Vata, Pitta, Kapha',
      'Nhận diện thể trạng gốc (Prakriti) và sự mất cân bằng (Vikriti)',
      'Thực hành hơi thở Pranayama, chế độ dinh dưỡng và nhịp sinh học tự nhiên',
    ],
  },
];

function CourseModal({
  course,
  onClose,
}: {
  course: Course;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await saveBooking({
        type: 'course',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: course.title,
        message: formData.message || `Đăng ký khóa học: ${course.title}`,
      });
      setSubmitted(true);
    } catch {
      alert('Không thể gửi đăng ký. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-votive-border shadow-2xl animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-votive-border p-5 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-votive-surface border border-votive-border flex items-center justify-center">
              {course.icon(24)}
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-votive-text leading-snug">
                Đăng Ký Tư Vấn Khóa Học
              </h3>
              <p className="text-xs text-votive-muted">{course.title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-votive-muted hover:text-votive-red rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-14 h-14 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-200">
                <Check className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-serif font-bold text-votive-text mb-2">
                Đăng ký thành công!
              </h4>
              <p className="text-xs text-votive-muted mb-6 leading-relaxed">
                Bộ phận học vụ của Votive Academy sẽ gửi đề cương chi tiết và liên hệ tư vấn lộ trình học phù hợp nhất cho bạn trong 24 giờ (Hotline/Zalo: <a href="https://zalo.me/0385448747" target="_blank" rel="noopener noreferrer" className="font-semibold text-votive-red hover:underline">0385 448 747</a>).
              </p>
              <button
                onClick={onClose}
                className="btn-primary text-sm px-6 py-2.5"
              >
                Đóng
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3 bg-votive-surface/80 border border-votive-border rounded-xl text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-votive-muted">Thời lượng:</span>
                  <span className="font-semibold text-votive-text">{course.sessions}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-votive-muted">Hình thức:</span>
                  <span className="font-semibold text-votive-text">{course.format}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-votive-muted">Giảng viên:</span>
                  <span className="font-semibold text-votive-red">{course.instructor}</span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-votive-text">Họ và tên của bạn *</label>
                <input
                  type="text"
                  required
                  placeholder="Nguyễn Văn A"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-votive-border bg-white text-sm outline-none focus:ring-2 focus:ring-votive-red/30 focus:border-votive-red"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-votive-text">Email nhận đề cương *</label>
                  <input
                    type="email"
                    required
                    placeholder="ban@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-votive-border bg-white text-sm outline-none focus:ring-2 focus:ring-votive-red/30 focus:border-votive-red"
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-votive-border bg-white text-sm outline-none focus:ring-2 focus:ring-votive-red/30 focus:border-votive-red"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-votive-text">Mục tiêu học tập hoặc ghi chú</label>
                <textarea
                  placeholder="Ví dụ: Chưa từng học chiêm tinh, muốn học để tự xem lá số bản thân..."
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-votive-border bg-white text-sm outline-none focus:ring-2 focus:ring-votive-red/30 focus:border-votive-red resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full py-3.5 text-sm shadow-md disabled:opacity-50"
              >
                {isSubmitting ? 'Đang gửi đăng ký...' : 'Gửi yêu cầu tư vấn & nhận đề cương'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export function Courses() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  return (
    <>
      <section id="courses" className="section-padding bg-votive-surface/40 border-t border-votive-border/60 relative">
        <div className="container-width">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="badge-parchment mb-3">
              <BookOpen className="w-3.5 h-3.5 text-votive-red" />
              Đào Tạo Học Thuật
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-votive-text mb-4 tracking-tight">
              Chương Trình Đào Tạo Votive Academy
            </h2>
            <p className="text-sm sm:text-base text-votive-muted leading-relaxed font-sans">
              Hệ thống giáo trình chuẩn hóa từ các viện chiêm tinh uy tín tại Ấn Độ, truyền tải tri thức Jyotish, Ayurveda và Số học một cách khoa học, thực chứng và ứng dụng cao.
            </p>
          </div>

          {/* Courses Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className={`glass-card glass-card-hover rounded-2xl p-7 flex flex-col justify-between relative ${
                  course.special ? 'border-votive-sand' : ''
                }`}
              >
                <div>
                  {/* Top Meta Header */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-13 h-13 rounded-2xl bg-votive-surface border border-votive-border flex items-center justify-center p-3 shadow-sm">
                        {course.icon(30)}
                      </div>
                      <div>
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-votive-red">
                          {course.format}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-votive-muted mt-0.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{course.sessions}</span>
                        </div>
                      </div>
                    </div>

                    {course.special && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-votive-red/10 text-votive-red border border-votive-red/20">
                        <Sparkles className="w-3 h-3" />
                        Chuyên sâu
                      </span>
                    )}
                  </div>

                  {/* Course Title & Summary */}
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-votive-text mb-3 leading-snug">
                    {course.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-votive-muted leading-relaxed mb-6">
                    {course.description}
                  </p>

                  {/* Instructor Badge */}
                  <div className="mb-6 p-3 rounded-xl bg-votive-surface/70 border border-votive-border/70 flex items-center gap-2.5 text-xs text-votive-text">
                    <Award className="w-4 h-4 text-votive-red shrink-0" />
                    <span>
                      Giảng dạy: <strong>{course.instructor}</strong>
                    </span>
                  </div>

                  {/* Highlights Syllabus List */}
                  <div className="pt-5 border-t border-votive-border/60 mb-6">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-votive-text mb-3">
                      Nội dung trọng tâm:
                    </h4>
                    <ul className="space-y-2.5">
                      {course.highlights.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-votive-text/80 leading-snug">
                          <Check className="w-4 h-4 text-votive-red shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Enrollment Button */}
                <button
                  onClick={() => setSelectedCourse(course)}
                  className="btn-secondary w-full py-3 text-sm font-medium hover:bg-votive-red hover:text-white hover:border-votive-red flex items-center justify-center gap-2 group transition-all"
                >
                  <span>Đăng ký nhận đề cương chi tiết</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>

          {/* Academic Lineage Note */}
          <div className="mt-12 text-center">
            <p className="text-xs text-votive-muted max-w-xl mx-auto italic">
              * Tất cả học viên tốt nghiệp các cấp độ Chiêm Tinh Vệ Đà sẽ được cấp chứng nhận hoàn thành khóa học từ Votive Academy và hỗ trợ tham gia cộng đồng nghiên cứu Jyotish liên tục.
            </p>
          </div>
        </div>
      </section>

      {/* Course Enrollment Modal */}
      {selectedCourse && (
        <CourseModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </>
  );
}
