export function About() {
  return (
    <section id="about" className="section-padding bg-gradient-to-br from-stone-100 to-amber-50/50">
      <div className="container-width">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-gold-600 font-medium mb-2 block">Về chúng tôi</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-800 mb-6">
              Định hướng tâm linh <br />
              <span className="text-gradient">Kiến tạo bình an</span>
            </h2>
            <div className="space-y-4 text-stone-600 leading-relaxed">
              <p>
                Votive được thành lập với sứ mệnh mang đến sự bình an và định hướng 
                đúng đắn cho những ai đang tìm kiếm sự giải thoát khỏi những trắc trở 
                trong cuộc sống.
              </p>
              <p>
                Đội ngũ chuyên gia của chúng tôi gồm những người có kiến thức sâu rộng 
                về tâm linh, phong thủy và các nghi lễ truyền thống. Mỗi dịch vụ đều 
                được thực hiện với sự tôn trọng và đạo đức nghề nghiệp cao nhất.
              </p>
              <p>
                Chúng tôi tin rằng tâm linh là một phần quan trọng trong cuộc sống, 
                giúp con người tìm thấy ý nghĩa, sự cân bằng và hướng đi đúng đắn.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-stone-800">Bảo mật</div>
                  <div className="text-sm text-stone-500">Thông tin được bảo mật</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-stone-800">Nhanh chóng</div>
                  <div className="text-sm text-stone-500">Phản hồi trong 24h</div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative divider symbol */}
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <span className="text-6xl text-gold-400/70">🕉️</span>
              <p className="mt-4 text-gold-600/80 font-serif italic text-lg">
                "Tâm an, vạn sự tự tại"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
