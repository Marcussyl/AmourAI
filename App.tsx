
import React, { useState, useEffect, useRef } from 'react';
import { Heart, Stars, MapPin, Send, Sparkles, Music2, Music, Volume2, VolumeX } from 'lucide-react';
import FloatingHearts from './components/FloatingHearts';
import LoveLetterGenerator from './components/LoveLetterGenerator';
import DatePlanner from './components/DatePlanner';
import Hero from './components/Hero';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'letter' | 'date'>('letter');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Background music URL (Romantic piano instrumental)
  const musicUrl = "https://cdn.pixabay.com/audio/2022/02/07/audio_d0c6ff1bdd.mp3";

  useEffect(() => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.play().catch(err => {
          console.log("Autoplay blocked or audio error:", err);
          setIsMusicPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMusicPlaying]);

  return (
    <div className="min-h-screen font-inter text-slate-900 selection:bg-romantic-200">
      <FloatingHearts />
      
      {/* Actual Audio Element */}
      <audio 
        ref={audioRef}
        src={musicUrl}
        loop
        preload="auto"
      />
      
      {/* Navigation & Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Heart className="text-romantic-500 fill-romantic-500" size={24} />
          <span className="font-dancing text-2xl font-bold text-romantic-600">AmourAI</span>
        </div>
        
        <button 
          onClick={() => setIsMusicPlaying(!isMusicPlaying)}
          className={`p-2 rounded-full transition-all ${
            isMusicPlaying 
            ? 'bg-romantic-100 text-romantic-600 shadow-inner' 
            : 'hover:bg-romantic-50 text-slate-400'
          }`}
          title={isMusicPlaying ? "Mute Music" : "Play Romantic Music"}
        >
          {isMusicPlaying ? <Volume2 size={20} className="animate-pulse" /> : <VolumeX size={20} />}
        </button>
      </header>

      <main className="pt-24 pb-20 container mx-auto px-4 max-w-6xl">
        <Hero />

        {/* Action Selection */}
        <div className="mt-16 flex flex-col items-center">
          <div className="flex p-1 bg-white/50 backdrop-blur rounded-2xl border border-white/40 shadow-sm mb-12">
            <button
              onClick={() => setActiveTab('letter')}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl transition-all duration-300 ${
                activeTab === 'letter' 
                ? 'bg-romantic-500 text-white shadow-lg' 
                : 'text-slate-600 hover:bg-romantic-50'
              }`}
            >
              <Send size={18} />
              <span>Love Letter</span>
            </button>
            <button
              onClick={() => setActiveTab('date')}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl transition-all duration-300 ${
                activeTab === 'date' 
                ? 'bg-romantic-500 text-white shadow-lg' 
                : 'text-slate-600 hover:bg-romantic-50'
              }`}
            >
              <MapPin size={18} />
              <span>Date Ideas</span>
            </button>
          </div>

          <div className="w-full">
            {activeTab === 'letter' ? <LoveLetterGenerator /> : <DatePlanner />}
          </div>
        </div>
      </main>

      <footer className="py-12 text-center text-slate-400 text-sm">
        <p>© 2024 AmourAI. Made with ❤️ for your special someone.</p>
      </footer>
    </div>
  );
};

export default App;
