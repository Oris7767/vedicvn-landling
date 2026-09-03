import { ArrowLeft, FileText, ShieldAlert } from 'lucide-react';

interface TermsPageProps {
  onBack?: () => void;
}

export function TermsPage({ onBack }: TermsPageProps) {
  return (
    <div className="min-h-screen bg-votive-bg pt-24 pb-20 font-sans">
      <div className="container-width max-w-3xl mx-auto px-4 sm:px-6">
        <button
          onClick={onBack}
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-votive-red hover:text-[#800d0c] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Quay lại trang chủ</span>
        </button>

        <div className="glass-card rounded-3xl overflow-hidden border border-votive-border shadow-elevated">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-votive-red via-[#8d0f0e] to-[#700b0a] p-8 sm:p-10 text-center text-white">
            <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
              <FileText className="w-7 h-7 text-votive-sand" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight mb-2">
              Chính Sách & Điều Khoản Dịch Vụ
            </h1>
            <p className="text-xs sm:text-sm font-sans tracking-wider text-votive-sand/90 uppercase font-semibold">
              VEDICVN ACADEMY · TERMS OF SERVICE & POLICIES
            </p>
          </div>

          <div className="p-6 sm:p-10 space-y-8 text-xs sm:text-sm text-votive-text/80 leading-relaxed">
            <section className="space-y-3">
              <p>
                Chào mừng bạn đến với <strong>Votive Academy</strong> (thuộc hệ sinh thái <strong>VedicVN</strong>).
              </p>
              <p>
                Trước khi đăng ký dịch vụ tư vấn chiêm tinh cá nhân, giải đoán lá số, Prasna (Horary Astrology), báo cáo chiêm tinh hoặc tham gia các khóa học do Votive Academy cung cấp, vui lòng đọc kỹ các điều khoản dưới đây.
              </p>
              <div className="p-4 rounded-xl bg-votive-surface border border-votive-border flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-votive-red shrink-0 mt-0.5" />
                <p className="text-xs text-votive-text leading-snug">
                  <strong>Lưu ý quan trọng:</strong> Việc hoàn tất thanh toán hoặc gửi biểu mẫu sử dụng dịch vụ đồng nghĩa với việc bạn xác nhận đã đọc, hiểu và đồng ý tuân thủ toàn bộ các điều khoản và chính sách này.
                </p>
              </div>
            </section>

            <section className="space-y-3 pb-6 border-b border-votive-border/70">
              <h2 className="text-base font-serif font-bold text-votive-text">
                1. Tuyên bố miễn trừ trách nhiệm (Disclaimer)
              </h2>
              <div className="space-y-2 text-xs leading-relaxed text-votive-muted">
                <p>
                  <strong>1.1. Tính chất dịch vụ:</strong> Mọi nội dung tư vấn, phân tích, giải đoán, dự báo và định hướng được cung cấp bởi Votive Academy dựa trên hệ thống Chiêm tinh học Vệ Đà (Vedic Astrology/Jyotish) cùng các phương pháp nghiên cứu liên quan. Những thông tin này chỉ mang tính chất tham khảo, phát triển nhận thức cá nhân, định hướng và hỗ trợ tinh thần.
                </p>
                <p>
                  <strong>1.2. Không thay thế tư vấn chuyên môn:</strong> Các thông tin được cung cấp không phải là lời khuyên pháp lý, đầu tư, tài chính, y tế, tâm lý trị liệu hoặc bất kỳ dịch vụ chuyên môn được cấp phép nào khác. Khách hàng được khuyến nghị tham khảo các chuyên gia có thẩm quyền trước khi đưa ra các quyết định quan trọng.
                </p>
                <p>
                  <strong>1.3. Tự do ý chí và trách nhiệm cá nhân:</strong> Chiêm tinh học phản ánh các xu hướng, tiềm năng và chu kỳ năng lượng tại một thời điểm nhất định, không phải là sự bảo đảm cho một kết quả cụ thể. Mọi quyết định, lựa chọn và hành động trong cuộc sống đều thuộc quyền tự do ý chí và trách nhiệm cá nhân của khách hàng.
                </p>
              </div>
            </section>

            <section className="space-y-3 pb-6 border-b border-votive-border/70">
              <h2 className="text-base font-serif font-bold text-votive-text">
                2. Chính sách bảo mật thông tin (Privacy Policy)
              </h2>
              <div className="space-y-2 text-xs leading-relaxed text-votive-muted">
                <p>
                  <strong>2.1. Thông tin thu thập:</strong> Votive Academy chỉ thu thập các thông tin cần thiết phục vụ cho việc lập lá số, phân tích và liên hệ, bao gồm: Họ và tên, Ngày tháng năm sinh, Giờ sinh chính xác, Nơi sinh (tỉnh/thành phố, quốc gia), Số điện thoại và Địa chỉ email.
                </p>
                <p>
                  <strong>2.2. Cam kết bảo mật:</strong> Chúng tôi cam kết bảo mật tuyệt đối mọi thông tin cá nhân, dữ liệu lá số và nội dung trao đổi trong quá trình tư vấn. Thông tin của khách hàng sẽ không được chia sẻ, chuyển giao hoặc tiết lộ cho bất kỳ bên thứ ba nào khi chưa có sự đồng ý rõ ràng bằng văn bản từ khách hàng, trừ trường hợp có yêu cầu từ cơ quan pháp luật có thẩm quyền.
                </p>
                <p>
                  <strong>2.3. Lưu trữ dữ liệu:</strong> Dữ liệu lá số và các ghi chú tư vấn được lưu trữ trong hệ thống bảo mật nội bộ nhằm phục vụ việc theo dõi và hỗ trợ khách hàng trong các lần tư vấn tiếp theo (nếu có). File ghi âm buổi tư vấn trực tiếp (nếu có) sẽ được cấp quyền truy cập riêng cho khách hàng và tự động xóa sau 30 ngày kể từ ngày bàn giao.
                </p>
              </div>
            </section>

            <section className="space-y-3 pb-6 border-b border-votive-border/70">
              <h2 className="text-base font-serif font-bold text-votive-text">
                3. Chính sách thanh toán & Không hoàn tiền (Payment & Refund Policy)
              </h2>
              <div className="space-y-2 text-xs leading-relaxed text-votive-muted">
                <p>
                  <strong>3.1. Xác nhận thanh toán:</strong> Lịch hẹn tư vấn hoặc suất tham gia khóa học chỉ được xác nhận chính thức sau khi Votive Academy nhận được đầy đủ khoản thanh toán tương ứng với dịch vụ đã chọn qua cổng thanh toán tự động (Sepay/VietQR) hoặc chuyển khoản ngân hàng.
                </p>
                <p>
                  <strong>3.2. Chính sách không hoàn tiền:</strong> Do tính chất đặc thù của dịch vụ tư vấn cá nhân hóa (đòi hỏi chuyên gia dành thời gian nghiên cứu, lập bản đồ sao và chuẩn bị trước buổi tư vấn), <strong>tất cả các khoản thanh toán cho dịch vụ tư vấn và khóa học là cuối cùng và không được hoàn lại dưới bất kỳ hình thức nào</strong> sau khi đã thanh toán thành công.
                </p>
                <p>
                  <strong>3.3. Chính sách dời lịch:</strong> Trong trường hợp bất khả kháng, khách hàng có thể yêu cầu dời lịch hẹn tối thiểu 24 giờ trước thời gian đã định. Mỗi lịch hẹn chỉ được hỗ trợ dời tối đa 01 lần trong vòng 30 ngày kể từ ngày đặt lịch ban đầu. Yêu cầu dời lịch báo trước dưới 24 giờ sẽ không được chấp thuận và buổi tư vấn được xem là đã hoàn tất.
                </p>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-serif font-bold text-votive-text">
                4. Quyền sở hữu trí tuệ
              </h2>
              <p className="text-xs text-votive-muted">
                Toàn bộ tài liệu, giáo trình, bài giảng, hình ảnh, văn bản, báo cáo phân tích và các sản phẩm trí tuệ khác do Votive Academy phát hành đều thuộc quyền sở hữu độc quyền của Votive Academy và hệ sinh thái VedicVN. Nghiêm cấm mọi hành vi sao chép, tái phân phối hoặc thương mại hóa khi chưa có sự cho phép bằng văn bản.
              </p>
            </section>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button onClick={onBack} className="btn-secondary text-sm px-6 py-2.5">
            ← Trở về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
}
