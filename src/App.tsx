import { useState } from 'react';
import { SEO } from './components/SEO';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Courses } from './components/Courses';
import { Services } from './components/Services';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { DividerIcons } from './components/DividerIcons';
import { Footer } from './components/Footer';
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
          title="Bộ Quy Tắc Đạo Đức Nghề Nghiệp - Votive Academy"
          description="Bộ quy tắc đạo đức nghề nghiệp của Votive Academy - Chiêm tinh học Vệ Đà với tinh thần trung thực, trách nhiệm và tôn trọng tự do ý chí."
        />
        <EthicsPage onBack={handleBack} />
      </>
    );
  }

  if (currentPage === 'terms') {
    return (
      <>
        <SEO
          title="Chính Sách và Điều Khoản Dịch Vụ - Votive Academy"
          description="Chính sách và điều khoản dịch vụ của Votive Academy. Vui lòng đọc kỹ trước khi sử dụng dịch vụ."
        />
        <TermsPage onBack={handleBack} />
      </>
    );
  }

  return (
    <>
      <SEO
        title="Votive Academy - Chiêm Tinh Học Vệ Đà"
        description="Dịch vụ phân tích lá số chiêm tinh Vệ Đà, tư vấn Prasna (Chiêm Tinh Đoán Sự) và hỗ trợ nhận thức cá nhân dựa trên tri thức cổ truyền."
      />
      <div className="min-h-screen">
        <Header />
        <main>
          <Hero onNavigate={setCurrentPage} />
          <Courses />
          <Services />
          <About />
          <Contact />
          <DividerIcons />
        </main>
        <Footer onNavigate={setCurrentPage} />
      </div>
    </>
  );
}
