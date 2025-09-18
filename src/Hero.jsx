import React from "react";


function Hero() {
  return (
    <section className="px-4 sm:px-6 md:px-12 lg:px-20 py-8 ">
      <div
        className="relative rounded-3xl overflow-hidden shadow-lg h-[180px] sm:h-[220px] md:h-[280px] flex items-center"
        style={{
          backgroundImage: "url('')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-blue-700 bg-opacity-70"></div>

        {/* Content */}
        <div className="relative z-9 text-white px-4 sm:px-6 md:px-8">
          <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-4">
            Full-stack Engineering for Developers Bootcamp 2024
          </h1>
          <div className="flex items-center gap-2 text-sm">
            {/* Icon */}
            <span className="bg-white text-blue-700 rounded-full p-1">
              {/* Replace with your icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </span>
            <span>A Course by STEM Link</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
