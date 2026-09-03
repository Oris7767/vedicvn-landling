import { ShieldCheck, HeartHandshake, Eye, Lock, Award } from 'lucide-react';
import { DiyaIcon, LotusIcon } from './icons/VedicIcons';

export function About() {
  const principles = [
    {
      icon: Eye,
      title: 'Tôn trọng tự do ý chí',
      desc: 'Chiêm tinh học phản ánh xu hướng và chu kỳ năng lượng, không quyết định số phận. Quyền quyết định luôn thuộc về bạn.',
    },
    {
      icon: HeartHandshake,
      title: 'Không gieo sợ hãi',
      desc: 'Tuyệt đối không đe dọa tai ương hay lợi dụng nỗi sợ để bán vật phẩm tâm linh. Mọi phân tích đều khách quan và tỉnh thức.',
    },
    {
      icon: ShieldCheck,
      title: 'Trung thực trong diễn giải',
      desc: 'Minh bạch nguồn gốc luận giải theo kinh điển Jyotish, không phóng đại kết quả và không khẳng định vượt quá phạm vi.',
    },
    {
      icon: Lock,
      title: 'Bảo mật thông tin tuyệt đối',
      desc: 'Dữ liệu sinh nhật và mọi nội dung chia sẻ trong buổi tư vấn được cam kết bảo mật quyền riêng tư 100%.',
    },
  ];

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="container-width">
        {/* Top Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="badge-parchment mb-3">
            <DiyaIcon size={14} className="text-votive-red" />
            Về Chúng Tôi & Người Sáng Lập
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-votive-text mb-4 tracking-tight">
            Hiểu Bản Thân Để Sống Tự Do & Có Trách Nhiệm
          </h2>
          <p className="text-sm sm:text-base text-votive-muted leading-relaxed font-sans">
            Votive Academy thuộc hệ sinh thái VedicVN — Được kiến tạo để kết nối cộng đồng với dòng chảy tri thức Chiêm tinh học Vệ Đà (Jyotish) nguyên bản, khoa học và nhân văn.
          </p>
        </div>

        {/* 2-Column Story: Founder & Methodology */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-16">
          {/* Left Column: Founder Trâm Phạm Profile */}
          <div className="lg:col-span-7 space-y-5 text-sm sm:text-base text-votive-text/90 leading-relaxed font-sans">
            <div className="p-6 rounded-2xl glass-card border border-votive-sand/80 shadow-sm space-y-4">
              <div className="flex items-center gap-3 border-b border-votive-border pb-4">
                <div className="w-12 h-12 rounded-xl bg-votive-surface border border-votive-border flex items-center justify-center text-votive-red">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold text-votive-text">
                    Founder Trâm Phạm
                  </h3>
                  <p className="text-xs font-medium text-votive-red">
                    Thành viên Hiệp hội Chiêm Tinh Vệ Đà Anh Quốc (BAVA)
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-votive-text/80 leading-relaxed">
                Được đào tạo chính quy và hoàn thành các chương trình tu nghiệp chiêm tinh Vệ Đà tại <strong>Viện Gurukul uy tín thuộc Top 3 Ấn Độ</strong>, Trâm Phạm sáng lập Votive Academy với tâm nguyện đưa tri thức Jyotish cổ truyền trở về đúng vị thế học thuật cao quý.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-votive-surface/70 border border-votive-border text-center">
                  <div className="text-xs font-semibold text-votive-text">BAVA Member</div>
                  <div className="text-[11px] text-votive-muted mt-0.5">Tiêu chuẩn quốc tế</div>
                </div>
                <div className="p-3 rounded-xl bg-votive-surface/70 border border-votive-border text-center">
                  <div className="text-xs font-semibold text-votive-text">Gurukul Alumni</div>
                  <div className="text-[11px] text-votive-muted mt-0.5">Chính thống Ấn Độ</div>
                </div>
                <div className="p-3 rounded-xl bg-votive-surface/70 border border-votive-border text-center">
                  <div className="text-xs font-semibold text-votive-text">Swiss Ephemeris</div>
                  <div className="text-[11px] text-votive-muted mt-0.5">Dữ liệu thiên văn học</div>
                </div>
              </div>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm text-votive-muted leading-relaxed pl-1">
              <p>
                Khác biệt với các phương pháp dự đoán may rủi, Chiêm tinh học Vệ Đà (Jyotish - nghĩa là <em>"Ánh sáng của tri thức"</em>) sử dụng hệ thống hoàng đạo thiên văn thực (<strong>Sidereal Zodiac</strong>) cùng phương pháp hiệu chỉnh <strong>Lahiri Ayanamsha</strong>, tính toán chuẩn xác vị trí các thiên thể theo thời gian thực.
              </p>
              <p>
                Mục tiêu của chúng tôi không phải là nói trước định mệnh hay hứa hẹn phép màu thay đổi vận hạn, mà là trao cho bạn chiếc chìa khóa để thấu suốt bản thiết kế nội tâm, nhận diện thời điểm thuận lợi và thử thách, từ đó làm chủ cuộc đời mình.
              </p>
            </div>
          </div>

          {/* Right Column: Sacred Geometry Visual Banner */}
          <div className="lg:col-span-5">
            <div className="p-8 sm:p-10 rounded-3xl glass-card border border-votive-sand/90 text-center relative overflow-hidden shadow-elevated">
              <div className="w-20 h-20 rounded-full bg-votive-surface border-2 border-votive-border flex items-center justify-center mx-auto mb-6 shadow-sm">
                <DiyaIcon size={40} className="text-votive-red" />
              </div>

              <blockquote className="font-serif italic text-lg sm:text-xl text-votive-text leading-snug mb-6">
                "Ánh sáng của tri thức không nhằm thay thế ý chí con người, mà giúp con người nhìn rõ con đường mình đang bước đi."
              </blockquote>

              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-votive-red">
                <LotusIcon size={16} />
                <span>Jyotir Vidya · Tri Thức Của Ánh Sáng</span>
                <LotusIcon size={16} />
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Ethics & Integrity */}
        <div className="pt-10 border-t border-votive-border/60">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-votive-text mb-2">
              4 Trụ Cột Đạo Đức Thực Hành Của Votive Academy
            </h3>
            <p className="text-xs sm:text-sm text-votive-muted">
              Cam kết nền tảng trong mọi buổi tư vấn và chương trình giảng dạy
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="p-6 rounded-2xl glass-card glass-card-hover border border-votive-border flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-votive-surface border border-votive-border flex items-center justify-center mb-4 text-votive-red">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-serif font-bold text-votive-text mb-2">
                      {item.title}
                    </h4>
                    <p className="text-xs text-votive-muted leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
