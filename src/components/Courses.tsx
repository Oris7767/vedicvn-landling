import { useState } from 'react';

const courses = [
  {
    id: 'so-hoc',
    title: 'Số Học Vệ Đà',
    icon: '🔢',
    description: 'Các nhà hiền triết cổ xưa đã mã hóa ý nghĩa của các hành tinh vào 9 con số. Lớp Số học Vệ Đà khái quát hóa toàn bộ ý niệm này, cho phép bạn thấu hiểu những con số mình nhìn thấy hằng ngày.',
    sessions: '10 buổi',
    format: 'Online',
    instructor: 'Trâm Phạm (Chứng chỉ Gurukul học viện top 3 Ấn Độ)',
    highlights: [
      'Nhập môn Số Học',
      'Khái quát 3 khái niệm Ayurveda cho 9 con số',
      'Ý nghĩa 9 con số và các số ghép',
      'Tính toán và dự đoán',
    ],
  },
  {
    id: 'ayurveda',
    title: 'Ayurveda',
    icon: '🌿',
    description: 'Cơ thể con người chính là một vi vũ trụ thu nhỏ, phản chiếu chính xác tỷ lệ của 5 nguyên tố hình thành nên vũ trụ. Lớp học giúp bạn thấu hiểu "bản thiết kế năng lượng" độc bản của chính mình.',
    sessions: '8 buổi',
    format: 'Online',
    instructor: 'Trâm Phạm (Chứng chỉ Gurukul học viện top 3 Ấn Độ)',
    highlights: [
      'Nhập môn Ayurveda',
      'Năm nguyên tố cơ bản',
      'Thấu hiểu 3 Dosha (Vata, Pitta, Kapha)',
      'Nhận diện thể trạng gốc và sự mất cân bằng',
      'Thực hành kiểm soát hơi thở (Pranayama)',
    ],
  },
  {
    id: 'chiem-tinh-co-ban',
    title: 'Chiêm Tinh Vệ Đà Cơ Bản',
    icon: '⭐',
    description: 'Lộ trình chiêm tinh từ cơ bản đến nâng cao, giúp bạn hiểu về 27 chòm sao, 9 hành tinh và 12 cung hoàng đạo trong hệ thống chiêm tinh Vedic chính thống.',
    sessions: '56 buổi (4 cấp)',
    format: 'Online',
    instructor: 'Trâm Phạm (Chứng chỉ Gurukul học viện top 3 Ấn Độ)',
    highlights: [
      'Cấp I (8 buổi): Giới thiệu chiêm tinh Vedic, 12 nhà, 12 cung hoàng đạo',
      'Cấp II (15 buổi): 9 hành tinh, tọa độ và sức ảnh hưởng',
      'Cấp III (15 buổi): Giải nghĩa 27 chòm sao, Đại Vận, Tiểu Vận',
      'Cấp IV (18 buổi): Phân tích chuyên sâu và thực hành',
    ],
  },
  {
    id: 'chiem-tinh-tai-chinh',
    title: 'Chiêm Tinh Tài Chính',
    icon: '📈',
    description: 'Sự kết hợp giữa chiêm tinh Vệ Đà cổ điển và chu kỳ tài chính hiện đại, ứng dụng nguyên lý Gann để dự đoán biến động giá và xác định thời điểm mua bán quan trọng.',
    sessions: 'Định kỳ hằng năm',
    format: 'Online',
    instructor: 'Trâm Phạm (Chứng chỉ Gurukul học viện top 3 Ấn Độ)',
    highlights: [
      'Chu kỳ hành tinh và nhịp vận động kinh tế toàn cầu',
      'Nhận diện vùng đảo chiều thị trường',
      'Dự đoán xu hướng và tối ưu chiến lược đầu tư',
      'Ứng dụng nguyên lý Gann',
    ],
    special: true,
  },
];

function CourseModal({ course, onClose }: { course: typeof courses[0]; onClose: () => void }) {
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
      const apiUrl = import.meta.env.VITE_CONTACT_API_URL || '/api/contact';
      await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          subject: `Đăng ký khóa học: ${course.title}`,
          message: `Tôi muốn đăng ký khóa học ${course.title}. ${formData.message}`,
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
            <span className="text-3xl">{course.icon}</span>
            <h3 className="text-xl font-serif font-bold text-stone-800">{course.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-stone-100 rounded-full transition-colors"
          >
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
              <h4 className="text-lg font-semibold text-stone-800 mb-2">Đăng ký thành công!</h4>
              <p className="text-stone-600">Chúng tôi sẽ liên hệ với bạn trong 24 giờ để tư vấn chi tiết về khóa học.</p>
              <button onClick={onClose} className="mt-4 text-gold-600 hover:text-gold-700 font-medium">
                Đóng
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-stone-600 mb-4">{course.description}</p>
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="px-3 py-1 bg-gold-100 text-gold-700 rounded-full text-sm">
                    {course.sessions}
                  </span>
                  <span className="px-3 py-1 bg-stone-100 text-stone-600 rounded-full text-sm">
                    {course.format}
                  </span>
                  {course.special && (
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                      Khai giảng định kỳ
                    </span>
                  )}
                </div>
                <p className="text-sm text-stone-500">{course.instructor}</p>
              </div>

              <div className="bg-stone-50 rounded-xl p-4 mb-6">
                <h4 className="font-medium text-stone-800 mb-3">Nội dung khóa học</h4>
                <ul className="space-y-2">
                  {course.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-stone-600">
                      <svg className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <h4 className="font-medium text-stone-800">Đăng ký tư vấn</h4>
                <div>
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
                    type="tel"
                    required
                    placeholder="Số điện thoại *"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                  <textarea
                    placeholder="Ghi chú (tùy chọn)"
                    rows={2}
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
                  {isSubmitting ? 'Đang gửi...' : 'Đăng ký tư vấn'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function Courses() {
  const [selectedCourse, setSelectedCourse] = useState<typeof courses[0] | null>(null);

  return (
    <>
      <section id="courses" className="section-padding bg-gradient-to-br from-stone-50 to-amber-50/30">
        <div className="container-width">
          <div className="text-center mb-16">
            <span className="text-gold-600 font-medium mb-2 block">Về khóa học</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-800 mb-4">
              Khoa học ánh sáng từ Vệ Đà
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Lộ trình đào tạo chiêm tinh học Vedic được giảng viên Trâm Phạm nghiên cứu và phát triển,
              đã chứng minh hiệu quả trong suốt nhiều năm. Kiến thức từ lớp học hoàn toàn phù hợp với
              người mới chưa biết gì về chiêm tinh, và cả người đã học rất nhiều nhưng chưa thể tự luận giải.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="group bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-stone-100 hover:border-gold-200"
              >
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-4xl">{course.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-serif font-semibold text-stone-800 mb-1">
                      {course.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs px-2 py-0.5 bg-gold-50 text-gold-600 rounded-full">
                        {course.sessions}
                      </span>
                      <span className="text-xs px-2 py-0.5 bg-stone-100 text-stone-500 rounded-full">
                        {course.format}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-stone-600 text-sm mb-4 line-clamp-3">
                  {course.description}
                </p>

                <ul className="space-y-1.5 mb-4">
                  {course.highlights.slice(0, 3).map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-stone-500">
                      <svg className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="line-clamp-1">{item}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-xs text-stone-400 mb-4">{course.instructor}</p>

                <button
                  onClick={() => setSelectedCourse(course)}
                  className="w-full py-2.5 px-4 bg-stone-100 hover:bg-gold-50 text-stone-700 hover:text-gold-700 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  Tìm hiểu thêm
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-block bg-white rounded-2xl p-6 shadow-lg border border-stone-100">
              <p className="text-stone-600 mb-2">Giảng viên: <strong className="text-stone-800">Trâm Phạm</strong></p>
              <p className="text-sm text-stone-500">Chứng chỉ Gurukul học viện top 3 Ấn Độ</p>
              <p className="text-xs text-stone-400 mt-2">Học phí bao gồm video record và tài liệu được Votive biên soạn</p>
            </div>
          </div>
        </div>
      </section>

      {selectedCourse && (
        <CourseModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
      )}
    </>
  );
}
