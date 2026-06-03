import type { Page } from '../App';

interface HeroProps {
  onNavigate: (page: Page) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-100 via-amber-50 to-stone-100 pt-20"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-gold-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-amber-200/20 rounded-full blur-3xl" />
      </div>

      <div className="container-width relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-100 rounded-full text-gold-700 text-sm font-medium mb-6">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z" />
          </svg>
          Chiêm Tinh Học Vệ Đà (Jyotish)
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-stone-800 mb-6 leading-tight">
          Hiểu rõ bản thân, <br />
          <span className="text-gradient">nhận ra tiềm năng và chu kỳ cuộc sống</span>
        </h1>

        <p className="text-lg md:text-xl text-stone-600 max-w-2xl mx-auto mb-6 leading-relaxed">
          Votive Academy cung cấp dịch vụ phân tích lá số chiêm tinh Vệ Đà, tư vấn Prasna
          (Chiêm Tinh Đoán Sự) và hỗ trợ nhận thức cá nhân dựa trên tri thức cổ truyền.
        </p>
        <p className="text-sm text-stone-500 max-w-2xl mx-auto mb-10 leading-relaxed italic">
          Chúng tôi không quyết định số phận. Chiêm tinh phản ánh xu hướng và tiềm năng —
          mỗi cá nhân luôn có quyền lựa chọn cách phản ứng trước hoàn cảnh.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#services" className="btn-primary text-lg px-8 py-4">
            Khám phá dịch vụ
          </a>
          <button
            onClick={() => onNavigate('ethics')}
            className="btn-secondary text-lg px-8 py-4"
          >
            Đọc đạo đức nghề nghiệp
          </button>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
          {[
            { value: '10+', label: 'Năm kinh nghiệm' },
            { value: '5000+', label: 'Khách hàng' },
            { value: '98%', label: 'Hài lòng' },
            { value: '24/7', label: 'Hỗ trợ' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gold-600 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-stone-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-gold-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
}
