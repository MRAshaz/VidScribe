import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

// 1. Define the interface for props to fix the 'implicitly has any type' error
interface SearchBarProps {
  onTranscriptReceived: (data: string) => void;
}

const SearchBar = ({ onTranscriptReceived }: SearchBarProps) => {
  // Define types for state
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleFetch = async () => {
    // Basic validation to prevent empty calls
    if (!videoUrl.trim()) {
      alert("Please enter a valid YouTube URL");
      return;
    }

    setLoading(true);
    try {
      // encodeURIComponent ensures special characters like ? and = in the URL don't break the API call
      const encodedUrl = encodeURIComponent(videoUrl.trim());
      
      const response = await fetch(`https://vidscribebackend.onrender.com/transcript/${encodedUrl}`);
      
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();
      
      // Pass the 'result' from FastAPI back to Home.tsx
      onTranscriptReceived(data.result);
      
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Could not reach the server. Make sure your FastAPI backend is running on port 8000.");
    } finally {
      setLoading(false);
    }
  };

  // Allow users to press 'Enter' to trigger the search
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleFetch();
    }
  };

  return (
    <div className="w-full max-w-3xl px-4">
      {/* Container: Stacks on mobile (flex-col), side-by-side on desktop (md:flex-row) */}
      <div className="flex flex-col md:flex-row items-center gap-3 w-full">
        
        <div className="relative w-full">
          {/* Icon/Loader logic */}
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            {loading ? (
              <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
            ) : (
              <Search className="h-5 w-5 text-slate-400" />
            )}
          </div>
          
          <input
            type="text"
            value={videoUrl}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVideoUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Paste YouTube link here (e.g. https://youtu.be/...)"
            className="block w-full pl-11 pr-4 py-4 bg-white border border-slate-200 rounded-2xl md:rounded-full text-slate-900 shadow-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400"
          />
        </div>

        <button 
          onClick={handleFetch}
          disabled={loading}
          className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-2xl md:rounded-full shadow-lg hover:shadow-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {loading ? "Processing..." : "Get Transcript"}
        </button>
      </div>
    </div>
  );
};

export default SearchBar;