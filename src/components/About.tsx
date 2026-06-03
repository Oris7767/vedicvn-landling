export function About() {
  return (
    <section id="about" className="section-padding bg-gradient-to-br from-stone-100 to-amber-50/50">
      <div className="container-width">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-gold-600 font-medium mb-2 block">Về Votive Academy</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-800 mb-6">
              Hiểu bản thân để sống <br />
              <span className="text-gradient">tự do và có trách nhiệm</span>
            </h2>
            <div className="space-y-4 text-stone-600 leading-relaxed">
              <p>
                Votive Academy được thành lập với sứ mệnh đồng hành cùng những ai muốn
                hiểu rõ hơn về bản thân thông qua Chiêm tinh học Vệ Đà (Jyotish) —
                một hệ thống tri thức cổ truyền nhằm hỗ trợ nhận thức và phát triển nội tâm.
              </p>
              <p>
                Chúng tôi tin rằng chiêm tinh học phản ánh các xu hướng, tiềm năng và
                chu kỳ vận động của cuộc sống, nhưng mỗi cá nhân luôn có quyền lựa chọn
                cách phản ứng và hành động trước hoàn cảnh của mình.
              </p>
              <p>
                Mục tiêu của chúng tôi không phải dự đoán tương lai hay thay đổi vận mệnh,
                mà là giúp bạn hiểu rõ con đường mình đang bước đi, phát triển nhận thức
                và đưa ra những lựa chọn sáng suốt hơn.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-stone-800">Tự do ý chí</div>
                  <div className="text-sm text-stone-500">Không định mệnh tuyệt đối</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-stone-800">Tôn trọng</div>
                  <div className="text-sm text-stone-500">Không gieo sợ hãi</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-stone-800">Trung thực</div>
                  <div className="text-sm text-stone-500">Minh bạch trong diễn giải</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-stone-800">Bảo mật</div>
                  <div className="text-sm text-stone-500">Tôn trọng quyền riêng tư</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <span className="text-6xl text-gold-400/70">🕉️</span>
              <p className="mt-4 text-gold-600/80 font-serif italic text-lg">
                "Ánh sáng của tri thức không nhằm thay thế ý chí con người,
                mà giúp con người nhìn rõ con đường mình đang bước đi."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
