import React, { useState, useEffect } from "react";

const ClockWidget = () => {
  // State to hold current time
  const [time, setTime] = useState(new Date());
  // State to hold position and movement direction
  const [position, setPosition] = useState({ x: 50, y: 50, dx: 0.5, dy: 0.5 });
  // State to handle hover effect
  const [isHovered, setIsHovered] = useState(false);

  // Effect to update time every second
  useEffect(() => {
    // Start the timer
    const timerId = setInterval(() => {
      // Update the time
      setTime(new Date());
    }, 1000);

    // Clean up function to clear the interval
    return () => clearInterval(timerId);
  }, []);

  // Effect to move the clock widget
  useEffect(() => {
    const moveInterval = setInterval(() => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const widgetSize = 170; // Approximate size of the widget

      // Calculate the new position based on the time
      setPosition((prevPos) => {
        let newX = prevPos.x + prevPos.dx;
        let newY = prevPos.y + prevPos.dy;
        let newDx = prevPos.dx;
        let newDy = prevPos.dy;

        // Reverse direction if hitting the horizontal boundaries
        if (newX + widgetSize > viewportWidth || newX < 0) {
          newDx = -newDx;
          newX = prevPos.x;
        }
        // Reverse direction if hitting the vertical boundaries
        if (newY + widgetSize > viewportHeight || newY < 0) {
          newDy = -newDy;
          newY = prevPos.y;
        }
        return { ...prevPos, x: newX, y: newY, dx: newDx, dy: newDy };
      });
    }, 10); // Move every 10 milliseconds for smooth animation

    return () => clearInterval(moveInterval);
  }, []);

  // Format time as HH:MM:SS
  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const formattedTime = formatTime(time);

  const glowClass = isHovered ? "ring-4 ring-blue-500 ring-opacity-50" : "";

  return (
    <div
      className={`absolute transition-transform duration-100 ease-linear transform hover:scale-105 rounded-full p-4 md:p-6 bg-gradient-to-br from-gray-700 to-gray-800 shadow-xl border-2 border-gray-600 ${glowClass}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative text-white font-mono text-center">
        {/* Analog clock representation - a simple circle */}
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white flex items-center justify-center relative">
          {/* Digital time display */}
          <div className="text-xl md:text-2xl font-bold tracking-widest leading-none">
            {formattedTime}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClockWidget;
