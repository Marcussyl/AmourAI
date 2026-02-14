
import React, { useState, useRef } from 'react';
import { Heart, Loader2, Copy, Check, Wand2, Download } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { toPng } from 'html-to-image';
import { generateLoveLetter } from '../services/geminiService';

const LoveLetterGenerator: React.FC = () => {
  const [formData, setFormData] = useState({
    recipient: '',
    sender: '',
    mood: 'poetic',
    memories: ''
  });
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const letterRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult('');
    try {
      const letter = await generateLoveLetter(formData);
      setResult(letter || '');
    } catch (err) {
      alert("Failed to create magic. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadAsImage = async () => {
    if (letterRef.current === null) return;
    
    setIsExporting(true);
    try {
      // Increased delay to ensure all fonts and styles are fully parsed by the browser
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const dataUrl = await toPng(letterRef.current, { 
        cacheBust: true,
        backgroundColor: '#fffcfc',
        pixelRatio: 2,
        // Filter out the header row with buttons and "A Letter of Love" text
        filter: (node: HTMLElement) => {
          const exclusionClasses = ['no-export'];
          return !exclusionClasses.some(cls => node.classList?.contains(cls));
        }
      });
      
      const link = document.createElement('a');
      link.download = `Love-Letter-to-${formData.recipient || 'My-Love'}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Download failed:', err);
      alert("Could not save the image. This sometimes happens due to browser security restrictions on external fonts. You can still use the 'Copy' button to save the text!");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <div className="glass p-8 rounded-3xl shadow-xl space-y-6">
        <h3 className="text-2xl font-playfair font-bold text-slate-800 flex items-center gap-2">
          <Heart className="text-romantic-500" size={20} />
          Compose Your Message
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">To</label>
              <input
                type="text"
                required
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-romantic-300 transition-all"
                placeholder="Lover's Name"
                value={formData.recipient}
                onChange={e => setFormData({...formData, recipient: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">From</label>
              <input
                type="text"
                required
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-romantic-300 transition-all"
                placeholder="Your Name"
                value={formData.sender}
                onChange={e => setFormData({...formData, sender: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Mood</label>
            <select
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-romantic-300 transition-all"
              value={formData.mood}
              onChange={e => setFormData({...formData, mood: e.target.value})}
            >
              <option value="poetic">Poetic & Deep</option>
              <option value="funny">Lighthearted & Funny</option>
              <option value="classic">Classic & Sincere</option>
              <option value="short">Short & Sweet</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Special Memories / Details</label>
            <textarea
              rows={4}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-romantic-300 transition-all resize-none"
              placeholder="E.g., our first walk in Central Park, your love for jazz, that time we got lost..."
              value={formData.memories}
              onChange={e => setFormData({...formData, memories: e.target.value})}
            />
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
                <Wand2 size={20} />
                Generate Love Letter
              </>
            )}
          </button>
        </form>
      </div>

      <div className={`min-h-[400px] flex flex-col ${!result && !loading ? 'justify-center items-center border-2 border-dashed border-romantic-200 rounded-3xl' : ''}`}>
        {!result && !loading ? (
          <div className="text-center space-y-4 opacity-40">
            <Heart size={64} className="mx-auto text-romantic-300" />
            <p className="font-playfair text-xl">Your letter will appear here...</p>
          </div>
        ) : loading ? (
          <div className="flex flex-col items-center justify-center flex-1 space-y-4">
            <Loader2 className="animate-spin text-romantic-500" size={48} />
            <p className="text-romantic-600 font-dancing text-2xl animate-pulse">Whispering to the hearts...</p>
          </div>
        ) : (
          <div className="flex flex-col flex-1 h-full">
            <div className="glass p-8 rounded-3xl shadow-xl relative animate-in fade-in slide-in-from-bottom-4 duration-700 flex-1 flex flex-col overflow-hidden" ref={letterRef}>
              <div className="flex justify-between items-center mb-6 border-b border-romantic-100 pb-4 no-export">
                <span className="text-xs font-bold text-romantic-500 uppercase tracking-widest">A Letter of Love</span>
                <div className="flex gap-2">
                  <button 
                    onClick={copyToClipboard}
                    className="p-2 hover:bg-romantic-100 rounded-lg text-romantic-600 transition-colors flex items-center gap-2 text-sm font-medium"
                    title="Copy Text"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button 
                    onClick={downloadAsImage}
                    disabled={isExporting}
                    className="p-2 hover:bg-romantic-100 rounded-lg text-romantic-600 transition-colors flex items-center gap-2 text-sm font-medium disabled:opacity-50"
                    title="Download as Image"
                  >
                    {isExporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                    <span className="hidden sm:inline">{isExporting ? 'Saving...' : 'Save Image'}</span>
                  </button>
                </div>
              </div>
              
              <div className="prose prose-romantic max-w-none flex-1 overflow-auto mt-4 pr-2">
                <div className="font-dancing text-2xl text-slate-800 leading-relaxed">
                  <ReactMarkdown>{result}</ReactMarkdown>
                </div>
              </div>
              
              <div className="mt-6 flex justify-center opacity-30">
                <Heart className="text-romantic-500 fill-romantic-500" size={24} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoveLetterGenerator;
