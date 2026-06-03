interface TermsPageProps {
  onBack?: () => void;
}

export function TermsPage({ onBack }: TermsPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-amber-50/30 to-stone-100 pt-24 pb-16">
      <div className="container-width max-w-3xl mx-auto">
        <button
          onClick={onBack}
          className="mb-8 inline-flex items-center gap-2 text-gold-600 hover:text-gold-700 font-medium transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Quay lại trang chủ
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-gold-600 to-amber-500 p-8 text-center">
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-white">
              Chính sách và Điều khoản Dịch vụ
            </h1>
            <p className="text-gold-100 mt-2 font-medium">VOTIVE ACADEMY</p>
          </div>

          <div className="p-8 space-y-8 text-stone-600 leading-relaxed">
            <section>
              <p className="mb-4">
                Chào mừng bạn đến với Votive Academy.
              </p>
              <p className="mb-4">
                Trước khi đăng ký dịch vụ tư vấn chiêm tinh cá nhân, giải đoán lá số, Prasna (Horary Astrology), báo cáo chiêm tinh hoặc tham gia các khóa học do Votive Academy cung cấp, vui lòng đọc kỹ các điều khoản dưới đây.
              </p>
              <p className="bg-stone-50 p-4 rounded-lg border border-stone-200">
                <strong>Lưu ý quan trọng:</strong> Việc hoàn tất thanh toán hoặc sử dụng dịch vụ đồng nghĩa với việc bạn xác nhận đã đọc, hiểu và đồng ý tuân thủ toàn bộ các điều khoản và chính sách này.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-stone-800 mb-3 pb-2 border-b border-stone-200">
                1. Tuyên bố miễn trừ trách nhiệm (Disclaimer)
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-stone-700 mb-1">1.1. Tính chất dịch vụ</h3>
                  <p>Các nội dung tư vấn, phân tích, giải đoán, dự báo và định hướng được cung cấp bởi Votive Academy dựa trên hệ thống Chiêm tinh học Vệ Đà (Vedic Astrology/Jyotish) cùng các phương pháp nghiên cứu liên quan. Những thông tin này chỉ mang tính chất tham khảo, phát triển nhận thức cá nhân, định hướng và hỗ trợ tinh thần.</p>
                </div>
                <div>
                  <h3 className="font-medium text-stone-700 mb-1">1.2. Không thay thế tư vấn chuyên môn</h3>
                  <p>Các thông tin được cung cấp không phải là lời khuyên pháp lý, đầu tư, tài chính, y tế, tâm lý trị liệu hoặc bất kỳ dịch vụ chuyên môn được cấp phép nào khác. Khách hàng được khuyến nghị tham khảo các chuyên gia có chuyên môn phù hợp trước khi đưa ra các quyết định quan trọng.</p>
                </div>
                <div>
                  <h3 className="font-medium text-stone-700 mb-1">1.3. Tự do ý chí và trách nhiệm cá nhân</h3>
                  <p>Chiêm tinh học phản ánh các xu hướng, tiềm năng và chu kỳ năng lượng tại một thời điểm nhất định, không phải là sự bảo đảm cho một kết quả cụ thể. Mọi quyết định, lựa chọn và hành động trong cuộc sống đều thuộc quyền tự do ý chí và trách nhiệm cá nhân của khách hàng.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-stone-800 mb-3 pb-2 border-b border-stone-200">
                2. Không cam kết kết quả (No Guarantee)
              </h2>
              <p className="mb-3">Votive Academy không cam kết hoặc bảo đảm bất kỳ kết quả cụ thể nào liên quan đến:</p>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li>Tài chính và đầu tư</li>
                <li>Nghề nghiệp và kinh doanh</li>
                <li>Hôn nhân và các mối quan hệ</li>
                <li>Sức khỏe thể chất hoặc tinh thần</li>
                <li>Học tập hoặc các lĩnh vực khác trong cuộc sống</li>
              </ul>
              <p>Kết quả thực tế phụ thuộc vào nhiều yếu tố như hoàn cảnh cá nhân, môi trường sống, lựa chọn, hành động và các yếu tố khách quan khác ngoài phạm vi kiểm soát của Votive Academy.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-stone-800 mb-3 pb-2 border-b border-stone-200">
                3. Chính sách bảo mật thông tin (Privacy Policy)
              </h2>
              <p className="mb-3">Votive Academy tôn trọng quyền riêng tư của khách hàng và cam kết áp dụng các biện pháp bảo mật hợp lý nhằm bảo vệ thông tin cá nhân.</p>
              <div className="space-y-3">
                <div>
                  <h3 className="font-medium text-stone-700 mb-1">3.1. Dữ liệu thu thập</h3>
                  <p>Để thực hiện dịch vụ, chúng tôi có thể thu thập: họ và tên, ngày/tháng/năm sinh, giờ sinh, nơi sinh, email liên hệ và thông tin cần thiết liên quan đến câu hỏi hoặc nội dung tư vấn.</p>
                </div>
                <div>
                  <h3 className="font-medium text-stone-700 mb-1">3.2. Cam kết bảo mật</h3>
                  <p>Votive Academy không bán, trao đổi hoặc chia sẻ dữ liệu cá nhân của khách hàng cho bên thứ ba vì mục đích thương mại. Thông tin chỉ được tiết lộ khi có sự đồng ý rõ ràng từ khách hàng hoặc theo yêu cầu từ cơ quan nhà nước có thẩm quyền.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-stone-800 mb-3 pb-2 border-b border-stone-200">
                4. Thông tin đầu vào của khách hàng
              </h2>
              <p>Khách hàng chịu trách nhiệm về tính chính xác của toàn bộ thông tin cung cấp bao gồm ngày sinh, giờ sinh, nơi sinh và thông tin bối cảnh liên quan. Votive Academy không chịu trách nhiệm đối với các sai lệch trong kết quả phân tích phát sinh từ thông tin không chính xác hoặc không đầy đủ.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-stone-800 mb-3 pb-2 border-b border-stone-200">
                5. Chính sách thanh toán và hoàn tiền (Payment & Refund Policy)
              </h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-medium text-stone-700 mb-1">5.1. Thanh toán</h3>
                  <p>Dịch vụ chỉ được xác nhận sau khi khách hàng hoàn tất thanh toán theo hướng dẫn được cung cấp.</p>
                </div>
                <div>
                  <h3 className="font-medium text-stone-700 mb-1">5.2. Chính sách hoàn tiền</h3>
                  <p>Do đặc thù dịch vụ dựa trên kiến thức chuyên môn, thời gian nghiên cứu và chuẩn bị cá nhân hóa cho từng trường hợp, các khoản thanh toán được xem là không hoàn lại sau khi quá trình chuẩn bị hoặc thực hiện dịch vụ đã bắt đầu. Ngoại lệ duy nhất là các trường hợp pháp luật có quy định khác.</p>
                </div>
                <div>
                  <h3 className="font-medium text-stone-700 mb-1">5.3. Dời lịch hẹn</h3>
                  <p>Khách hàng vui lòng thông báo ít nhất 24 giờ trước thời gian hẹn nếu cần thay đổi lịch. Mỗi buổi tư vấn chỉ được hỗ trợ dời lịch tối đa một lần.</p>
                </div>
                <div>
                  <h3 className="font-medium text-stone-700 mb-1">5.4. Muộn giờ và vắng mặt</h3>
                  <p>Thời gian chờ tối đa là 15 phút. Nếu khách hàng không tham gia sau 15 phút và không có thông báo trước, buổi tư vấn được xem là vắng mặt không lý do (No-show). Trong trường hợp này, khoản thanh toán sẽ không được hoàn lại hoặc chuyển đổi sang lịch hẹn khác.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-stone-800 mb-3 pb-2 border-b border-stone-200">
                6. Quyền sở hữu trí tuệ (Intellectual Property)
              </h2>
              <p className="mb-3">Toàn bộ nội dung do Votive Academy tạo ra bao gồm báo cáo chiêm tinh, tài liệu học tập, giáo trình, bài giảng, hình ảnh, video, bản ghi tư vấn và bài viết nghiên cứu đều thuộc quyền sở hữu trí tuệ của Votive Academy hoặc các tác giả liên quan.</p>
              <p className="mb-3"><strong>Nghiêm cấm:</strong> sao chép hàng loạt, chỉnh sửa sai lệch, đăng tải công khai, bán lại, chuyển giao cho bên thứ ba, sử dụng để huấn luyện AI hoặc tạo sản phẩm cạnh tranh.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-stone-800 mb-3 pb-2 border-b border-stone-200">
                7. Quy tắc ứng xử và quyền từ chối phục vụ
              </h2>
              <p className="mb-3">Khách hàng và chiêm tinh gia cần duy trì thái độ lịch sự, tôn trọng và hợp tác trong suốt quá trình làm việc.</p>
              <p>Votive Academy có quyền từ chối hoặc chấm dứt dịch vụ nếu khách hàng có hành vi xúc phạm, đe dọa, quấy rối, sử dụng ngôn từ thù địch, cung cấp thông tin sai lệch, yêu cầu thực hiện hoạt động trái pháp luật hoặc xâm phạm quyền riêng tư của người khác.</p>
            </section>

            <section className="bg-gold-50 p-6 rounded-xl border border-gold-200">
              <h2 className="text-lg font-semibold text-stone-800 mb-3">
                Điều khoản chấp thuận
              </h2>
              <p className="text-stone-600">
                Việc thanh toán, đăng ký hoặc sử dụng bất kỳ dịch vụ nào của Votive Academy đồng nghĩa với việc khách hàng xác nhận rằng đã đọc toàn bộ điều khoản, đã hiểu rõ nội dung và đồng ý tuân thủ tất cả các quy định được nêu trong văn bản này.
              </p>
            </section>

            <section className="text-center pt-4">
              <p className="text-stone-500 italic">
                Cảm ơn bạn đã tin tưởng lựa chọn Votive Academy đồng hành trên hành trình khám phá bản thân, phát triển nhận thức và thấu hiểu các chu kỳ vận hành của cuộc sống.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
