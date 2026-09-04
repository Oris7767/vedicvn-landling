import type { Page } from '../App';
import { ExternalLink, ShieldCheck } from 'lucide-react';
import { DiyaIcon } from './icons/VedicIcons';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1f1712] text-stone-300 border-t border-stone-800 relative z-10 font-sans">
      <div className="container-width py-14 px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#home" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-stone-900 border border-stone-700 flex items-center justify-center p-1">
                <img src="/votive-logo.png" alt="VedicVN Votive" className="h-full w-auto object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-serif font-bold text-white tracking-tight flex items-center gap-1.5">
                  VedicVN
                  <span className="text-[10px] font-sans font-semibold uppercase px-1.5 py-0.5 rounded bg-votive-red text-white">
                    Academy
                  </span>
                </span>
                <span className="text-[11px] text-stone-400 font-sans">
                  Học Viện & Tư Vấn Chiêm Tinh Vệ Đà (Jyotish)
                </span>
              </div>
            </a>

            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Votive Academy thực hành Chiêm tinh học Vệ Đà với tinh thần trung thực, trách nhiệm học thuật và tuyệt đối tôn trọng quyền tự do ý chí của mỗi cá nhân.
            </p>

            <div className="p-3.5 rounded-xl bg-stone-900/90 border border-stone-800 text-xs text-stone-400 max-w-sm space-y-1">
              <div className="flex items-center gap-2 text-stone-300 font-medium">
                <DiyaIcon size={14} className="text-votive-red" />
                <span>Thành viên Hiệp hội Chiêm Tinh Vệ Đà Anh Quốc (BAVA)</span>
              </div>
              <p className="text-[11px] text-stone-500">
                Tính toán thiên văn chuẩn xác với Swiss Ephemeris & Lahiri Ayanamsha.
              </p>
            </div>
          </div>

          {/* Col 3: Dịch vụ tư vấn */}
          <div>
            <h4 className="text-white font-serif font-semibold text-sm uppercase tracking-wider mb-4">
              Tư Vấn 1-1
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-400">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Chiêm Tinh Vệ Đà - Cơ Bản
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Chiêm Tinh Vệ Đà - Chuyên Sâu
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Chiêm Tinh Đoán Sự (Prasna)
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Tarot & Kinh Dịch
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Nghi Lễ Cầu An & Tài Lộc
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Khóa học học viện */}
          <div>
            <h4 className="text-white font-serif font-semibold text-sm uppercase tracking-wider mb-4">
              Khóa Học
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-400">
              <li>
                <a href="#courses" className="hover:text-white transition-colors">
                  Chiêm Tinh Vệ Đà (4 Cấp Độ)
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-white transition-colors">
                  Chiêm Tinh Tài Chính & Gann
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-white transition-colors">
                  Số Học Vệ Đà (Numerology)
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-white transition-colors">
                  Ayurveda & Cân Bằng Thân - Tâm
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Hệ sinh thái & Pháp lý */}
          <div>
            <h4 className="text-white font-serif font-semibold text-sm uppercase tracking-wider mb-4">
              Hệ Sinh Thái
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-400">
              <li>
                <a
                  href="https://vedicvn.com/vedic-chart"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1 text-votive-sand"
                >
                  <span>Lập lá số Vệ Đà miễn phí</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              </li>
              <li>
                <a
                  href="https://vedicvn.com/panchang"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Lịch Panchang hôm nay</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              </li>
              <li>
                <a
                  href="https://vedicvn.com/blog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Blog Tri Thức Jyotish</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              </li>
              <li className="pt-2 border-t border-stone-800">
                <button
                  onClick={() => onNavigate('ethics')}
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-votive-red" />
                  <span>Bộ quy tắc đạo đức</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('terms')}
                  className="hover:text-white transition-colors text-left"
                >
                  Điều khoản dịch vụ & Bảo mật
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar: Copyright & Social Channels */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-stone-500">
          <p>© {currentYear} VedicVN Academy. All rights reserved. Thuộc hệ sinh thái VedicVN.</p>

          <div className="flex items-center gap-3">
            <a
              href="https://zalo.me/0385448747"
              target="_blank"
              rel="noopener noreferrer"
              className="h-8 px-3 rounded-full bg-stone-900 border border-stone-800 flex items-center gap-1.5 hover:bg-[#0068FF] hover:border-[#0068FF] hover:text-white transition-colors text-stone-300 font-medium"
              title="Hotline / Zalo: 0385 448 747"
            >
              <span className="text-[11px] font-bold text-[#0068FF] group-hover:text-white">Zalo</span>
              <span className="text-[11px]">0385 448 747</span>
            </a>
            <a
              href="https://x.com/VotiveAstrology"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center hover:bg-votive-red hover:text-white transition-colors"
              title="X / Twitter"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/votive.edu/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center hover:bg-votive-red hover:text-white transition-colors"
              title="Facebook"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="https://t.me/votiveacademy"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center hover:bg-votive-red hover:text-white transition-colors"
              title="Telegram"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@votive.vedicvn"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center hover:bg-votive-red hover:text-white transition-colors"
              title="TikTok"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
