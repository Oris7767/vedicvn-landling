import { ChevronDown, ArrowRight, ShieldCheck } from 'lucide-react';
import type { Page } from '../App';
import { DiyaIcon } from './icons/VedicIcons';

interface HeroProps {
  onNavigate: (page: Page) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 15%, rgba(243, 235, 218, 0.9) 0%, rgba(250, 247, 238, 1) 70%)',
      }}
    >
      {/* Decorative celestial background ambient aura */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-votive-sand/20 blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] rounded-full bg-votive-terra/10 blur-2xl" />
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] rounded-full bg-votive-red/5 blur-3xl" />
      </div>

      <div className="container-width relative z-10 text-center px-4 sm:px-6">
        {/* Top badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-votive-surface border border-votive-border/80 text-votive-red text-xs md:text-sm font-medium mb-8 shadow-sm">
          <DiyaIcon size={16} className="text-votive-red animate-pulse" />
          <span>Hệ Sinh Thái Chiêm Tinh Vệ Đà · VedicVN</span>
        </div>

        {/* Main H1 Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-votive-text mb-6 leading-[1.15] tracking-tight">
          Khai Trí Tuệ. <br className="hidden sm:inline" />
          <span className="text-gradient-crimson">Mở Hướng Đi.</span>
        </h1>

        {/* Lead description */}
        <p className="text-base sm:text-lg md:text-xl text-votive-text/80 max-w-2xl mx-auto mb-5 leading-relaxed font-sans font-normal">
          Dịch vụ luận giải Chiêm Tinh Vệ Đà (<span className="font-medium text-votive-text">Jyotish</span>) chuẩn học thuật, tư vấn Prasna thời khắc và hệ thống đào tạo chuyên sâu từ <span className="font-semibold text-votive-red">Votive Academy</span>.
        </p>

        {/* Ethical motto note */}
        <div className="max-w-2xl mx-auto mb-10 px-5 py-3 rounded-2xl bg-white/60 border border-votive-border/70 backdrop-blur-sm">
          <p className="text-xs sm:text-sm text-votive-muted italic leading-relaxed">
            "Chiêm tinh phản ánh các xu hướng, tiềm năng và chu kỳ vận động — chúng tôi không quyết định số phận, mà đồng hành giúp bạn đưa ra lựa chọn sáng suốt trên tinh thần tự do ý chí."
          </p>
        </div>

        {/* Action CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#services"
            className="btn-primary text-base sm:text-lg px-8 py-4 w-full sm:w-auto shadow-md group"
          >
            <span>Khám phá dịch vụ tư vấn</span>
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
          <button
            onClick={() => onNavigate('ethics')}
            className="btn-secondary text-base sm:text-lg px-8 py-4 w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-5 h-5 text-votive-red" />
            <span>Quy tắc đạo đức</span>
          </button>
        </div>

        {/* Key Metrics / Trust Bar */}
        <div className="mt-16 pt-10 border-t border-votive-border/60 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {[
            { value: '6+', label: 'Năm kinh nghiệm Jyotish' },
            { value: '1,000+', label: 'Hồ sơ tư vấn hoàn thành' },
            { value: 'BAVA', label: 'Thành viên Hiệp hội Anh Quốc' },
            { value: '100%', label: 'Bảo mật & Tôn trọng ý chí' },
          ].map((stat, i) => (
            <div key={i} className="text-center p-3 rounded-xl bg-white/40 border border-votive-border/40">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-votive-red mb-0.5">
                {stat.value}
              </div>
              <div className="text-xs text-votive-muted font-medium font-sans">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle Scroll Down Prompt */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-60 hover:opacity-100 transition-opacity">
        <a href="#services" className="flex flex-col items-center gap-1 text-votive-muted hover:text-votive-red text-xs transition-colors">
          <span>Cuộn để xem</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
