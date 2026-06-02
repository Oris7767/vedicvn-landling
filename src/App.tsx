import { SEO } from './components/SEO';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Courses } from './components/Courses';
import { Services } from './components/Services';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { DividerIcons } from './components/DividerIcons';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <>
      <SEO
        title="Votive - Dịch vụ Tâm Linh & Phong Thủy"
        description="Dịch vụ tư vấn tâm linh, cầu an, giải hạn chuyên nghiệp. Đặt lịch tư vấn riêng với các chuyên gia phong thủy hàng đầu."
      />
      <div className="min-h-screen">
        <Header />
        <main>
          <Hero />
          <Courses />
          <Services />
          <About />
          <Contact />
          <DividerIcons />
        </main>
        <Footer />
      </div>
    </>
  );
}
