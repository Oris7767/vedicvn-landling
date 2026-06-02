export function DividerIcons() {
  const images = [
    { src: '/images/yoga.jpg', alt: 'Yoga' },
    { src: '/images/ayurveda.jpg', alt: 'Ayurveda' },
    { src: '/images/dance.jpg', alt: 'Múa Ấn Độ' },
    { src: '/images/diya.jpg', alt: 'Diya' },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-stone-50">
      <div className="container-width">
        <div className="flex justify-center items-center gap-8">
          {images.map((img, i) => (
            <div
              key={i}
              className="w-28 h-28 rounded-full overflow-hidden border-2 border-gold-200 shadow-lg"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
