import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage = ({ onGetStarted }: LandingPageProps) => {
  const [blinkingText, setBlinkingText] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlinkingText(prev => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-pixel-sky to-pixel-forest">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Moving Clouds */}
        <div className="absolute top-10 left-0 w-32 h-16 bg-pixel-cloud opacity-80 rounded-pixel animate-[slide-in-right_20s_linear_infinite]" />
        <div className="absolute top-20 left-0 w-24 h-12 bg-pixel-cloud opacity-60 rounded-pixel animate-[slide-in-right_25s_linear_infinite]" style={{ animationDelay: '-10s' }} />
        <div className="absolute top-32 left-0 w-20 h-10 bg-pixel-cloud opacity-70 rounded-pixel animate-[slide-in-right_30s_linear_infinite]" style={{ animationDelay: '-5s' }} />
        
        {/* Falling Leaves */}
        <div className="absolute top-0 left-1/4 w-2 h-2 bg-pixel-leaf opacity-80 animate-[fade-in_3s_ease-in-out_infinite]" style={{ animationDelay: '0s' }} />
        <div className="absolute top-0 left-1/2 w-2 h-2 bg-pixel-leaf opacity-60 animate-[fade-in_4s_ease-in-out_infinite]" style={{ animationDelay: '1s' }} />
        <div className="absolute top-0 left-3/4 w-2 h-2 bg-pixel-leaf opacity-70 animate-[fade-in_5s_ease-in-out_infinite]" style={{ animationDelay: '2s' }} />
        
        {/* Mountain Silhouette */}
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-pixel-earth to-transparent" />
        <div className="absolute bottom-32 left-0 w-full">
          <svg viewBox="0 0 1200 200" className="w-full h-32 fill-pixel-mountain opacity-80">
            <polygon points="0,200 200,50 400,120 600,30 800,90 1000,40 1200,80 1200,200" />
          </svg>
        </div>
        
        {/* Trees */}
        <div className="absolute bottom-16 left-20 w-8 h-16 bg-pixel-tree opacity-90" />
        <div className="absolute bottom-16 left-40 w-6 h-12 bg-pixel-tree opacity-80" />
        <div className="absolute bottom-16 right-20 w-8 h-16 bg-pixel-tree opacity-90" />
        <div className="absolute bottom-16 right-40 w-6 h-12 bg-pixel-tree opacity-80" />
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-pixel-forest rounded-sm pixel-shadow" />
            <h1 className="font-pixel text-lg text-pixel-light">THE GREEN PATH</h1>
          </div>
          <Button 
            onClick={onGetStarted}
            variant="outline" 
            className="font-pixel text-xs px-4 py-2 bg-pixel-light/10 border-pixel-light hover:bg-pixel-light hover:text-pixel-dark transition-all duration-300"
          >
            LOGIN
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-6">
        <div className="text-center max-w-4xl mx-auto">
          {/* Subtitle */}
          <p className="font-pixel text-sm text-pixel-light/80 mb-4 tracking-wider">
            START YOUR
          </p>
          
          {/* Main Title */}
          <h1 className="font-pixel text-4xl md:text-6xl lg:text-7xl text-pixel-light mb-6 leading-tight">
            <span className="text-pixel-forest">Environmental</span><br />
            <span className="text-pixel-ocean">Learning</span><br />
            <span className="text-pixel-earth">Adventure</span>
          </h1>
          
          {/* Description */}
          <p className="font-digital text-base md:text-lg text-pixel-light/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            The most fun and engaging way to learn about climate change and sustainability through gamified experiences
          </p>
          
          {/* Call to Action Button */}
          <Button 
            onClick={onGetStarted}
            className="font-pixel text-lg px-8 py-4 bg-gradient-to-r from-pixel-forest to-pixel-ocean hover:from-pixel-ocean hover:to-pixel-forest text-pixel-light border-2 border-pixel-light hover:scale-105 transition-all duration-300 pixel-shadow-lg animate-pulse"
          >
            GET STARTED
          </Button>
          
          {/* Blinking Text */}
          <p className={`font-pixel text-xs text-pixel-light/60 mt-6 transition-opacity duration-300 ${blinkingText ? 'opacity-100' : 'opacity-30'}`}>
            ▼ PRESS ENTER TO BEGIN ▼
          </p>
        </div>
        
        {/* Pixel Computer Icon */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
          <div className="relative w-16 h-16 animate-bounce">
            <div className="w-12 h-8 bg-pixel-light border-2 border-pixel-dark mx-auto" />
            <div className="w-8 h-6 bg-pixel-dark mx-auto" />
            <div className="w-4 h-2 bg-pixel-light mx-auto" />
            <div className="absolute top-2 left-3 w-6 h-4 bg-pixel-ocean" />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 p-6 text-center">
        <div className="max-w-6xl mx-auto">
          <p className="font-pixel text-xs text-pixel-light/60">
            SUPPORTED BY ENVIRONMENTAL EDUCATION INITIATIVE
          </p>
        </div>
      </footer>

      {/* Pixel Art Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-4 h-4 bg-pixel-forest opacity-60 animate-pulse" />
      <div className="absolute top-1/3 right-10 w-3 h-3 bg-pixel-ocean opacity-80 animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/4 left-20 w-2 h-2 bg-pixel-earth opacity-70 animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-1/3 right-20 w-2 h-2 bg-pixel-leaf opacity-60 animate-pulse" style={{ animationDelay: '0.5s' }} />
    </div>
  );
};

export default LandingPage;