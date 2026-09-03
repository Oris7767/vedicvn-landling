export function DividerIcons() {
  const images = [
    { src: '/images/diya.jpg', alt: 'Ngọn đèn Diya', label: 'Ánh Sáng Jyotish' },
    { src: '/images/ayurveda.jpg', alt: 'Tri thức Ayurveda', label: 'Dược Liệu & Thân Tâm' },
    { src: '/images/yoga.jpg', alt: 'Thiền Định Yoga', label: 'Thực Hành Tĩnh Tâm' },
    { src: '/images/dance.jpg', alt: 'Văn Hóa Cổ Truyền', label: 'Văn Hóa Vệ Đà' },
  ];

  return (
    <section className="py-14 border-t border-votive-border/60 bg-votive-surface/30">
      <div className="container-width px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 items-center justify-center max-w-4xl mx-auto">
          {images.map((img, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-votive-border/80 shadow-sm group-hover:border-votive-red/50 group-hover:shadow-md transition-all duration-300 p-1 bg-white">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <span className="text-xs font-serif font-semibold text-votive-text mt-3">
                {img.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
