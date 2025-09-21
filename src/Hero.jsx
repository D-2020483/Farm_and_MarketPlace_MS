import React from "react";

function Hero() {
  return (
    <section className="px-4 sm:px-5 md:px-12 lg:px-20 py-8 pt-12 sm:pt-16 md:pt-5">
      <div
        className="relative rounded-3xl overflow-hidden shadow-lg h-[180px] sm:h-[220px] md:h-[280px] flex items-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/hero01.png')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-opacity-70 bg-gradient-to-b from-gray-900 to-transparent"></div>

        {/* Content */}
        <div className="relative z-9 text-emerald-300 px-4 sm:px-6 md:px-8 w-full">
          <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-4 text-center">
            Welcome to AgriSense
          </h1>
          {/* New text below the heading */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-light mb-4 max-w-4xl mx-auto text-center text-emerald-50 text-semibold">
            Choose your role to get started with smart farm management and marketplace.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
