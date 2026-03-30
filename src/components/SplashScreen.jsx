import React, { useEffect, useState } from 'react';

function SplashScreen({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 800); // Wait for exit animation
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`splash-screen ${!isVisible ? 'exit' : ''}`}>
      <div className="splash-content">
        <div className="splash-logo">
          <i className="fa-solid fa-bolt-lightning"></i>
        </div>
        <h1 className="splash-title">NEXBOARD</h1>
        <div className="splash-loader">
          <div className="loader-bar"></div>
        </div>
      </div>
      <div className="splash-bg-top"></div>
      <div className="splash-bg-bottom"></div>
    </div>
  );
}

export default SplashScreen;
