import { ShieldCheck, Award, Compass, BookOpen } from 'lucide-react';

export function TrustStrip() {
  const trustPoints = [
    {
      icon: Award,
      title: 'BAVA Member',
      desc: 'Hiệp hội Chiêm Tinh Vệ Đà Anh Quốc',
    },
    {
      icon: Compass,
      title: 'Swiss Ephemeris',
      desc: 'Tọa độ thiên văn Sidereal độ chính xác cao',
    },
    {
      icon: BookOpen,
      title: 'Kinh điển Jyotish',
      desc: 'Kế thừa BPHS & Phaladeepika',
    },
    {
      icon: ShieldCheck,
      title: 'Đạo đức & Tự do ý chí',
      desc: 'Không định mệnh cực đoan, không mê tín',
    },
  ];

  return (
    <section className="border-y border-votive-border/70 bg-white/70 backdrop-blur-md relative z-20">
      <div className="container-width py-6 px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {trustPoints.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-center gap-3.5 group">
                <div className="w-10 h-10 rounded-xl bg-votive-surface border border-votive-border flex items-center justify-center shrink-0 group-hover:border-votive-red/40 transition-colors">
                  <Icon className="w-5 h-5 text-votive-red" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-votive-text tracking-tight">
                    {item.title}
                  </div>
                  <div className="text-xs text-votive-muted mt-0.5 leading-snug">
                    {item.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
