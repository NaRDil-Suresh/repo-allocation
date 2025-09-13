import React, { useState, useEffect } from 'react';
import './LoadingPage.css';

const LoadingPage = ({ onLoadingComplete }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [logoScale, setLogoScale] = useState(0);
  const [textOpacity, setTextOpacity] = useState(0);
  const [textY, setTextY] = useState(20);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Start animations after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // Logo scale animation
    const logoTimer = setTimeout(() => {
      setLogoScale(1);
    }, 300);

    // Text animations
    const textTimer = setTimeout(() => {
      setTextOpacity(1);
      setTextY(0);
    }, 800);

    // Complete loading after animations
    const completeTimer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        if (onLoadingComplete) {
          onLoadingComplete();
        }
      }, 500); // Wait for fade out animation
    }, 2500);

    return () => {
      clearTimeout(timer);
      clearTimeout(logoTimer);
      clearTimeout(textTimer);
      clearTimeout(completeTimer);
    };
  }, [onLoadingComplete]);

  return (
    <div className={`loading-page ${isVisible ? 'visible' : ''} ${isFadingOut ? 'fading-out' : ''}`}>
      <div className="loading-container">
        {/* Logo */}
        <div 
          className="logo-container"
          style={{ transform: `scale(${logoScale})` }}
        >
          <div className="logo">
            <span className="logo-text">NaRDil</span>
          </div>
        </div>

        {/* Attribution Text */}
        <div 
          className="attribution"
          style={{ 
            opacity: textOpacity,
            transform: `translateY(${textY}px)`
          }}
        >
          <p>:)</p>
        </div>

        {/* Loading Dots */}
        <div className="loading-dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage; 