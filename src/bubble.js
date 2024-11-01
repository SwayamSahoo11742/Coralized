import React, { useEffect } from 'react';

const BubbleEffect = () => {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const body = document.querySelector('body');
      const circle = document.createElement('span');
      circle.className = "ballspan";
      const x = e.clientX; // Use clientX to get the mouse position relative to the viewport
      const y = e.clientY; // Use clientY to get the mouse position relative to the viewport

      circle.style.left = `${x}px`;
      circle.style.top = `${y}px`;
      const size = Math.random() * 100;
      circle.style.width = `${20+size}px`; // Fixed size for the bubble
      circle.style.height = `${20+size}px`; // Fixed size for the bubble

      // Add the bubble to the body
      body.appendChild(circle);

      // Remove the bubble after a longer timeout (to match animation duration)
      setTimeout(() => {
        circle.remove();
      }, 1000); // Remove after 1 second
    };

    // Add the event listener
    document.addEventListener('mousemove', handleMouseMove);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); // Empty array to run only on mount

  return;
};

export default BubbleEffect;
