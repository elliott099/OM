import React, { useState, useEffect } from 'react';
import MagneticCursor from './components/MagneticCursor';
import Page1 from './components/Page1';
import { ThemeProvider } from './context/ThemeContext';
import Page2 from './components/Page2';
import Navbar from './components/Navbar';
import Page3 from './components/Page3';
import Footer from './components/Footer';

const App = () => {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <ThemeProvider>
      <MagneticCursor />
      <Navbar visible={visible} />
      <Page1 />
      <Page2 />
      <Page3 />
      <Footer />
    </ThemeProvider>
  );
};

export default App;
