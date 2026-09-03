import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { DiyaIcon } from './icons/VedicIcons';

const ethicsContent = {
  sections: [
    {
      title: 'BỘ QUY TẮC ĐẠO ĐỨC NGHỀ NGHIỆP',
      subtitle: 'VEDICVN ACADEMY · CODE OF PROFESSIONAL ETHICS',
    },
    {
      title: 'Tuyên ngôn & Sứ mệnh',
      content: `Tại Votive Academy (thuộc hệ sinh thái VedicVN), chúng tôi xem Chiêm tinh học Vệ Đà (Jyotish) là một hệ thống tri thức cổ truyền nhằm hỗ trợ con người hiểu rõ hơn về bản thân, các chu kỳ vận hành của cuộc sống và những tiềm năng phát triển nội tại.

Chúng tôi cam kết thực hành và giảng dạy chiêm tinh học với tinh thần trung thực, trách nhiệm học thuật, tôn trọng quyền tự do cá nhân và hướng tới sự phát triển lành mạnh, tỉnh thức của cộng đồng.`,
    },
    {
      title: '1. Tôn trọng tự do ý chí (Free Will)',
      content: `Chúng tôi tin rằng chiêm tinh học không quyết định số phận con người.

Lá số phản ánh các xu hướng, tiềm năng, bài học và chu kỳ vận động của năng lượng, nhưng mỗi cá nhân luôn có quyền lựa chọn cách phản ứng và hành động trước hoàn cảnh của mình.

Votive Academy kiên quyết bài trừ tư duy định mệnh tuyệt đối hoặc sự phụ thuộc mù quáng vào bất kỳ chuyên gia, hệ thống hay công cụ dự đoán nào.`,
    },
    {
      title: '2. Không gieo sợ hãi (No Fear-Mongering)',
      content: `Chúng tôi cam kết tuyệt đối không sử dụng nỗi sợ hãi để thu hút khách hàng hoặc thúc đẩy việc bán sản phẩm và dịch vụ tâm linh.

Chúng tôi không đưa ra các tuyên bố mang tính đe dọa như:
• Chắc chắn gặp đại họa, đoản mệnh
• Chắc chắn phá sản, vỡ nợ
• Chắc chắn ly hôn, chia rẽ gia đạo
• Bị nguyền rủa hoặc tác động bởi thế lực siêu nhiên
• Phải mua vật phẩm phong thủy hoặc làm lễ đắt tiền để tránh tai ương

Mọi phân tích đều được trình bày trên tinh thần khách quan, cân bằng, thấu tình đạt lý và hướng tới giải pháp tích cực.`,
    },
    {
      title: '3. Không cam kết thay đổi vận mệnh mù quáng',
      content: `Chúng tôi không bao giờ tuyên bố có khả năng:
• Thay đổi số phận của người khác
• Xóa bỏ nghiệp quả tức thì
• Bảo đảm giàu sang phú quý hay thành công 100%
• Bảo đảm hàn gắn hoặc kết hôn chắc chắn
• Chữa lành bệnh tật thay cho y khoa

Các biện pháp hỗ trợ truyền thống Vệ Đà như mantra, thiền định, puja, vrata, dana (bố thí) hay lối sống cân bằng Ayurveda được giới thiệu nhằm mục đích nuôi dưỡng tâm thức và tinh thần, không phải là sự bảo đảm thay thế cho hành động thực tế.`,
    },
    {
      title: '4. Trung thực và minh bạch trong diễn giải',
      content: `Chúng tôi cam kết:
• Không cố tình phóng đại hay thi vị hóa kết quả
• Không đưa ra những khẳng định vượt quá phạm vi chuyên môn và dữ liệu thiên văn
• Không bóp méo dữ liệu để chiều theo tâm lý ưa nghe lời đường mật của khách hàng
• Không diễn giải theo hướng tạo sự phụ thuộc tâm lý dài hạn

Khi tồn tại nhiều khả năng diễn giải theo các trường phái Jyotish cổ điển, chúng tôi sẽ trình bày các góc nhìn khác nhau một cách minh bạch.`,
    },
    {
      title: '5. Tôn trọng quyền riêng tư & Bảo mật dữ liệu',
      content: `Thông tin cá nhân, ngày giờ nơi sinh, cấu trúc lá số và mọi nội dung trao đổi trong buổi tư vấn đều được xem là thông tin riêng tư tuyệt đối.

Chúng tôi cam kết:
• Không tiết lộ thông tin của khách hàng cho bất kỳ bên thứ ba nào
• Không sử dụng lá số của khách hàng làm ví dụ giảng dạy công khai khi chưa có sự đồng thuận bằng văn bản
• Mọi file ghi âm tư vấn được lưu trữ trong môi trường bảo mật riêng biệt`,
    },
    {
      title: '6. Tôn trọng ranh giới chuyên môn',
      content: `Chúng tôi hiểu rõ giới hạn của chiêm tinh học và không đóng vai trò thay thế cho:
• Bác sĩ y khoa hoặc chuyên gia trị liệu tâm lý
• Luật sư hoặc tư vấn pháp lý
• Cố vấn tài chính hoặc chuyên gia quản lý quỹ đầu tư

Trong các trường hợp cần thiết, chúng tôi luôn chủ động khuyến nghị khách hàng tìm kiếm sự can thiệp từ các chuyên gia có thẩm quyền và bằng cấp phù hợp.`,
    },
    {
      title: '7. Phụng sự tri thức và sự thật',
      content: `Votive Academy cam kết theo đuổi tinh thần học thuật, nghiên cứu và thực hành chiêm tinh học Vệ Đà một cách nghiêm túc dựa trên kinh điển (BPHS, Phaladeepika) kết hợp dữ liệu tính toán thiên văn chuẩn xác Swiss Ephemeris.

Mục tiêu tối thượng của việc học và thực hành chiêm tinh không phải để đoán mò tương lai, mà là để hiểu rõ bản thân, phát triển nhận thức và sống có trách nhiệm hơn với cuộc đời của chính mình.`,
    },
  ],
};

interface EthicsPageProps {
  onBack?: () => void;
}

export function EthicsPage({ onBack }: EthicsPageProps) {
  return (
    <div className="min-h-screen bg-votive-bg pt-24 pb-20 font-sans">
      <div className="container-width max-w-3xl mx-auto px-4 sm:px-6">
        {/* Back button */}
        <button
          onClick={onBack}
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-votive-red hover:text-[#800d0c] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Quay lại trang chủ</span>
        </button>

        {/* Main Document Card */}
        <div className="glass-card rounded-3xl overflow-hidden border border-votive-border shadow-elevated">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-votive-red via-[#8d0f0e] to-[#700b0a] p-8 sm:p-10 text-center text-white relative">
            <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
              <DiyaIcon size={28} className="text-votive-sand" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight mb-2">
              {ethicsContent.sections[0].title}
            </h1>
            <p className="text-xs sm:text-sm font-sans tracking-wider text-votive-sand/90 uppercase font-semibold">
              {ethicsContent.sections[0].subtitle}
            </p>
          </div>

          {/* Document Content */}
          <div className="p-6 sm:p-10 space-y-8 text-sm sm:text-base leading-relaxed text-votive-text/90">
            {ethicsContent.sections.slice(1).map((section, index) => (
              <div key={index} className="space-y-3 pb-6 border-b border-votive-border/70 last:border-none last:pb-0">
                <h2 className="text-base sm:text-lg font-serif font-bold text-votive-red flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-votive-red shrink-0" />
                  <span>{section.title}</span>
                </h2>
                <p className="text-xs sm:text-sm text-votive-text/80 leading-relaxed whitespace-pre-line font-sans">
                  {section.content}
                </p>
              </div>
            ))}

            {/* Bottom Commitment */}
            <div className="pt-6 border-t border-votive-border text-center">
              <p className="font-serif italic text-base text-votive-text mb-4">
                "Ánh sáng của tri thức không nhằm thay thế ý chí con người, mà giúp con người nhìn rõ con đường mình đang bước đi."
              </p>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-votive-red uppercase tracking-wider">
                <span>Học Viện & Tư Vấn Chiêm Tinh Vệ Đà VedicVN</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button Bottom */}
        <div className="mt-8 text-center">
          <button
            onClick={onBack}
            className="btn-secondary text-sm px-6 py-2.5"
          >
            ← Trở về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
}
