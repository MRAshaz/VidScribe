import { TvMinimalPlay, Copy, Check } from 'lucide-react';
import SearchBar from './SearchBar';
import { useState } from 'react';

const Home = () => {
  // Define state as a string to satisfy TypeScript
  const [transcript, setTranscript] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(transcript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">    
      {/* Header Section */}
      <header className="w-full border-b border-gray-100 shadow-sm bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-20 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <TvMinimalPlay size={28} className="text-blue-600" />
            <span className="font-bold text-lg md:text-xl tracking-tight text-slate-800">VidScribe</span>
          </div>
        </div>
      </header>

      {/* Hero & Search Section */}
      <main className="flex flex-col items-center text-center px-4 pt-12 md:pt-20 pb-20">
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight max-w-3xl">
          Get Accurate Transcripts of Any <br className="hidden md:block" /> YouTube Video, Instantly
        </h1>

        <p className="text-base md:text-xl text-slate-500 mt-4 md:mt-6 mb-8 md:mb-10 max-w-xl">
          Paste the link below to generate text transcripts with timestamps, summary, and translation.
        </p>
        
        {/* We pass the setter function with the explicit string type */}
        <SearchBar onTranscriptReceived={(data: string) => setTranscript(data)} />

        {/* Transcript Result Display */}
        {transcript && (
          <div className="mt-12 w-full max-w-4xl bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h2 className="font-bold text-slate-800 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Video Transcript
              </h2>
              
              <button 
                onClick={handleCopy}
                className="flex items-center gap-2 text-sm text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors font-medium"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "Copied!" : "Copy Text"}
              </button>
            </div>

            <div className="p-6 text-left max-h-125 overflow-y-auto custom-scrollbar">
              <p className="text-slate-600 leading-relaxed whitespace-pre-wrap text-sm md:text-base">
                {transcript}
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full py-8 border-t border-slate-200 text-center text-slate-400 text-sm">
        <p>© 2026 VidScribe • No Login Required • Privacy Friendly</p>
      </footer>
    </div>
  );
};

export default Home;