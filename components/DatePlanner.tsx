
import React, { useState } from 'react';
import { MapPin, Loader2, Sparkles, Navigation } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { generateDateIdeas } from '../services/geminiService';

const DatePlanner: React.FC = () => {
  const [formData, setFormData] = useState({
    city: '',
    budget: 'moderate',
    vibe: 'romantic'
  });
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult('');
    try {
      const ideas = await generateDateIdeas(formData);
      setResult(ideas || '');
    } catch (err) {
      alert("The stars are misaligned. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <div className="glass p-8 rounded-3xl shadow-xl space-y-6">
        <h3 className="text-2xl font-playfair font-bold text-slate-800 flex items-center gap-2">
          <MapPin className="text-romantic-500" size={20} />
          Plan the Perfect Night
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">City / Location</label>
            <input
              type="text"
              required
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-romantic-300 transition-all"
              placeholder="e.g. Taipei, London, My Backyard"
              value={formData.city}
              onChange={e => setFormData({...formData, city: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Budget</label>
              <select
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-romantic-300 transition-all"
                value={formData.budget}
                onChange={e => setFormData({...formData, budget: e.target.value})}
              >
                <option value="budget-friendly">Budget Friendly</option>
                <option value="moderate">Moderate</option>
                <option value="luxury">Luxury / Spoil Them</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Vibe</label>
              <select
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-romantic-300 transition-all"
                value={formData.vibe}
                onChange={e => setFormData({...formData, vibe: e.target.value})}
              >
                <option value="romantic">Classic Romantic</option>
                <option value="adventurous">Adventurous</option>
                <option value="cozy">Cozy & Quiet</option>
                <option value="artsy">Artsy & Creative</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-romantic-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-romantic-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                <Sparkles size={20} />
                Generate Ideas
              </>
            )}
          </button>
        </form>
      </div>

      <div className={`min-h-[400px] flex flex-col ${!result && !loading ? 'justify-center items-center border-2 border-dashed border-romantic-200 rounded-3xl' : ''}`}>
        {!result && !loading ? (
          <div className="text-center space-y-4 opacity-40">
            <Navigation size={64} className="mx-auto text-romantic-300" />
            <p className="font-playfair text-xl">Your itinerary will appear here...</p>
          </div>
        ) : loading ? (
          <div className="flex flex-col items-center justify-center flex-1 space-y-4">
            <Loader2 className="animate-spin text-romantic-500" size={48} />
            <p className="text-romantic-600 font-dancing text-2xl animate-pulse">Scouting the best spots...</p>
          </div>
        ) : (
          <div className="glass p-8 rounded-3xl shadow-xl relative animate-in fade-in slide-in-from-bottom-4 duration-700 flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-6 border-b border-romantic-100 pb-4">
              <span className="text-xs font-bold text-romantic-500 uppercase tracking-widest">Romantic Itinerary</span>
              <Sparkles className="text-romantic-400" size={18} />
            </div>
            <div className="prose prose-romantic max-w-none flex-1 overflow-auto pr-2">
              <ReactMarkdown>{result}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DatePlanner;
