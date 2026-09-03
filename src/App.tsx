import { useState } from 'react';
import { SEO } from './components/SEO';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { Services } from './components/Services';
import { Courses } from './components/Courses';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { DividerIcons } from './components/DividerIcons';
import { Footer } from './components/Footer';
import { ChatWidget } from './components/ChatWidget';
import { EthicsPage } from './components/EthicsPage';
import { TermsPage } from './components/TermsPage';

type Page = 'home' | 'ethics' | 'terms';

export type { Page };

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const handleBack = () => {
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentPage === 'ethics') {
    return (
      <>
        <SEO
          title="Bộ Quy Tắc Đạo Đức Nghề Nghiệp | VedicVN Academy"
          description="Bộ quy tắc đạo đức nghề nghiệp của Votive Academy thuộc hệ sinh thái VedicVN — Chiêm tinh học Vệ Đà với tinh thần trung thực, trách nhiệm và tôn trọng tự do ý chí."
        />
        <EthicsPage onBack={handleBack} />
      </>
    );
  }

  if (currentPage === 'terms') {
    return (
      <>
        <SEO
          title="Chính Sách & Điều Khoản Dịch Vụ | VedicVN Academy"
          description="Chính sách và điều khoản dịch vụ của Votive Academy thuộc hệ sinh thái VedicVN. Vui lòng đọc kỹ trước khi sử dụng dịch vụ tư vấn và tham gia khóa học."
        />
        <TermsPage onBack={handleBack} />
      </>
    );
  }

  return (
    <>
      <SEO
        title="VedicVN Academy & Tư Vấn Chiêm Tinh Vệ Đà (Jyotish) | Hệ sinh thái VedicVN"
        description="Dịch vụ luận giải Chiêm Tinh Vệ Đà (Jyotish) chuẩn học thuật, tư vấn Prasna thời khắc và hệ thống đào tạo chiêm tinh Vệ Đà từ cơ bản đến chuyên sâu từ Votive Academy."
      />
      <div className="min-h-screen flex flex-col bg-votive-bg text-votive-text selection:bg-votive-red selection:text-white">
        <Header onNavigate={setCurrentPage} />
        <main className="flex-1">
          <Hero onNavigate={setCurrentPage} />
          <TrustStrip />
          <Services />
          <Courses />
          <About />
          <Contact />
          <DividerIcons />
        </main>
        <Footer onNavigate={setCurrentPage} />
        <ChatWidget />
      </div>
    </>
  );
}
