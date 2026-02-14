
import React from 'react';
import { Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="text-center space-y-6 max-w-3xl mx-auto">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-romantic-100 text-romantic-600 text-sm font-semibold tracking-wide uppercase">
        <Sparkles size={14} />
        <span>Valentine's Special</span>
      </div>
      <h1 className="text-5xl md:text-7xl font-playfair font-bold text-slate-900 leading-tight">
        Express Your Love <br />
        <span className="text-romantic-600 font-dancing italic">Beyond Words</span>
      </h1>
      <p className="text-lg text-slate-600 font-light leading-relaxed px-4">
        Our AI understands the nuances of your heart. Whether you're looking to pen a timeless letter 
        or plan a night to remember, we're here to help you create magic.
      </p>
    </section>
  );
};

export default Hero;
