import { useState, useEffect } from 'react';
import '../components/Hero.css';

export default function Hero() {
  const angleOptions = [22, 52, 67];
  const [angleIndex, setAngleIndex] = useState(0);
  const [imageVisible, setImageVisible] = useState(false);

  const angle = angleOptions[angleIndex];

  useEffect(() => {
    let touchStartY = null;

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;

      if (!imageVisible) {
        setImageVisible(true);
        return;
      }

      if (Math.abs(deltaY) > 30) {
        if (deltaY > 0) {
          setAngleIndex((prev) => Math.min(prev + 1, angleOptions.length - 1));
        } else {
          setAngleIndex((prev) => Math.max(prev - 1, 0));
        }
      }
    };

    const handleWheel = (e) => {
      e.preventDefault();

      if (!imageVisible) {
        setImageVisible(true);
        return;
      }

      if (e.deltaY > 0) {
        setAngleIndex((prev) => Math.min(prev + 1, angleOptions.length - 1));
      } else {
        setAngleIndex((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  });

  const openNav = () => {
    document.body.classList.add('nav-open');
  };

  const closeNav = () => {
    document.body.classList.remove('nav-open');
  };

  return (
    <div className="main">
      {/* Header with logo and hamburger */}
      <div className="header">
        <div className="logo">advop</div>
        <div className="hamburger" onClick={openNav}>☰</div>
      </div>

      {/* Off-canvas navigation */}
      <div className="offcanvas">
        <div className="close" onClick={closeNav}>×</div>
        <ul>
          <li>About Us</li>
          <li>Our Approach</li>
          <li>Our Services</li>
          <li>Our Work</li>
          <li>Contact Us</li>
        </ul>
      </div>

      {/* Triangle-masked image */}
      <svg width="800" height="800" viewBox="0 0 800 800">
        <defs>
          <clipPath id="triangle-mask">
            <polygon
              points="400,100 700,700 100,700"
              transform={`rotate(${angle} 400 400)`}
              stroke="red"
              fill="none"
              strokeWidth="2"
            />
          </clipPath>
        </defs>

        <g transform="scale(0.9) translate(44 44)">
          <image
            className={`fade-in ${imageVisible ? 'visible' : ''}`}
            href="src/assets/images/handshake-bg.png"
            x="0"
            y="0"
            width="800"
            height="800"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#triangle-mask)"
          />
        </g>
      </svg>

      {/* Central text */}
      <div className="overlay-text">
        <h1>
          we partner with <span>YOU,</span>
        </h1>
        <p>to make it happen</p>
      </div>

      {/* Bottom tagline */}
      <div className="bottom-text">
        <p>Not just an agency.</p>
        <p>Your partner in thinking</p>
        <p>curious, creative, and committed</p>
        <p>to clarity and transformation.</p>
      </div>
    </div>
  );
}
