import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import ExperienceSection from '@/components/ExperienceSection';
import VideoShowcase from '@/components/VideoShowcase';
import RoomsSection from '@/components/RoomsSection';
import FlavorSection from '@/components/FlavorSection';
import MomentSection from '@/components/MomentSection';
import ContactMapSection from '@/components/ContactMapSection';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';

function App() {
  const heroRef = useRef<HTMLElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);
  const [heroContentVisible] = useState(true);

  // Hiện cụm icon liên hệ nhanh (Maps/Zalo/Messenger/TikTok) ngay sau tương tác
  // đầu tiên của người dùng, tránh che khuất video Hero ngay khi vừa vào trang.
  useEffect(() => {
    if (!heroContentVisible || !floatingRef.current) return;

    const el = floatingRef.current;
    let revealed = false;

    const reveal = () => {
      if (revealed) return;
      revealed = true;
      gsap.to(el, {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.4,
        ease: 'power2.out',
      });
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener('scroll', reveal);
      window.removeEventListener('mousemove', reveal);
      window.removeEventListener('click', reveal);
      window.removeEventListener('touchstart', reveal);
      window.removeEventListener('wheel', reveal);
      window.removeEventListener('keydown', reveal);
    };

    const opts: AddEventListenerOptions = { passive: true };

    window.addEventListener('scroll', reveal, opts);
    window.addEventListener('mousemove', reveal, opts);
    window.addEventListener('click', reveal, opts);
    window.addEventListener('touchstart', reveal, opts);
    window.addEventListener('wheel', reveal, opts);
    window.addEventListener('keydown', reveal, opts);

    return cleanup;
  }, [heroContentVisible]);

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: '#0B0908' }}>
      <Nav heroRef={heroRef} visible={heroContentVisible} />

      <main className="relative z-[1]">
        <Hero ref={heroRef} visible={heroContentVisible} />
        <ExperienceSection />
        <VideoShowcase />
        <RoomsSection />
        <FlavorSection />
        <MomentSection />
        <ContactMapSection />
      </main>

      <Footer />

      <FloatingContact ref={floatingRef} />
    </div>
  );
}

export default App;

