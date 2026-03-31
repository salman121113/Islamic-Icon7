import { useState } from 'react';
import { Search, BookOpenText, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { STORIES_DATABASE } from '../data/stories';
import { GoogleGenAI, GenerateContentResponse } from '@google/genai';

export default function Stories() {
  const [query, setQuery] = useState('');
  const [selectedStory, setSelectedStory] = useState<typeof stories_database[0]="" |="" null="">(null);
  const [aiContent, setAiContent] = useState<string |="" null="">(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string |="" null="">(null);

  const tags = [
    'নবী মুহাম্মদ (সাঃ)', 'আবু বকর (রাঃ)', 'উমর (রাঃ)', 'উসমান (রাঃ)', 'আলী (রাঃ)', 
    'উমাইয়া', 'আব্বাসীয়', 'খালিদ বিন ওয়ালিদ', 'সালাহউদ্দীন আইয়ুবী', 'তারিক বিন জিয়াদ',
    'নবী ঈসা (আঃ)', 'নবী মূসা (আঃ)', 'নবী ইব্রাহিম (আঃ)', 'নবী ইউসুফ (আঃ)', 'নবী নূহ (আঃ)',
    'আয়েশা (রাঃ)', 'ফাতেমা (রাঃ)'
  ];

  const executeSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    
    const term = searchTerm.toLowerCase();
    
    // First check local database
    const found = STORIES_DATABASE.find(s => 
      s.title.toLowerCase().includes(term) || 
      s.tags.some(t => t.toLowerCase().includes(term))
    );

    if (found) {
      setSelectedStory(found);
      setAiContent(null);
      setError(null);
      return;
    }

    // If not found locally, fetch from Gemini
    setSelectedStory(null);
    setAiContent('');
    setError(null);
    setIsSearching(true);

    try {
      // Initialize Gemini API
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const prompt = `আপনি একজন বিশেষজ্ঞ ইসলামী ইতিহাসবিদ। ব্যবহারকারী "${searchTerm}" লিখে সার্চ করেছেন। 
      যদি এই নামটি কোনো বিখ্যাত মুসলিম নবী, সাহাবী, খলিফা, ইমাম, বা ইসলামী ইতিহাসের কোনো মহান ব্যক্তির হয়, তবে তার একটি **অত্যন্ত বিস্তারিত, ব্যাপক এবং বইয়ের মতো দীর্ঘ** প্রামাণ্য জীবনী বাংলায় লিখুন। 
      জীবনীটি এতই বিস্তারিত হতে হবে যেন এটি পড়তে অনেক সময় লাগে এবং জীবনের কোনো ছোট বা বড় ঘটনা যেন বাদ না যায়। 
      এতে নিম্নলিখিত বিষয়গুলো বিস্তারিতভাবে অধ্যায় আকারে লিখবেন:
      ১. জন্ম, বংশপরিচয় ও বাল্যকাল
      ২. যৌবন ও বেড়ে ওঠা
      ৩. ইসলামে অবদান ও আত্মত্যাগ
      ৪. জীবনের সকল গুরুত্বপূর্ণ ঘটনা, যুদ্ধ বা অর্জন (পুঙ্খানুপুঙ্খ বর্ণনা)
      ৫. চরিত্র, গুণাবলী ও বাণী
      ৬. মৃত্যু/শাহাদাত এবং উত্তরাধিকার
      
      **খুব গুরুত্বপূর্ণ নির্দেশিকা:** 
      - লেখাটি অত্যন্ত সহজ, সাবলীল এবং প্রাঞ্জল বাংলায় হতে হবে যাতে যে কেউ সহজে পড়তে ও বুঝতে পারে।
      - সম্পূর্ণ লেখাটি শুধুমাত্র বাংলায় হবে। কোনো অবস্থাতেই কোনো ইংরেজি শব্দ বা অক্ষর (English words/letters) ব্যবহার করা যাবে না।
      - মার্কডাউন (Markdown) ফরম্যাট ব্যবহার করবেন (যেমন হেডিং এর জন্য ##, বোল্ড করার জন্য **)। 
      
      আর যদি নামটি ইসলামী ইতিহাসের কোনো ব্যক্তির না হয়, তবে বিনয়ের সাথে জানাবেন যে আপনি কেবল ইসলামী ব্যক্তিত্বদের জীবনী প্রদান করেন।`;

      const responseStream = await ai.models.generateContentStream({
        model: 'gemini-3.1-pro-preview',
        contents: prompt,
      });

      for await (const chunk of responseStream) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
          setAiContent(prev => (prev || '') + c.text);
        }
      }
    } catch (err) {
      console.error('Gemini API Error:', err);
      setError('তথ্য সংগ্রহ করতে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(query);
  };

  const handleTagClick = (t: string) => {
    setQuery(t);
    executeSearch(t);
  };

  return (
    <div classname="p-4 pb-24 h-full flex flex-col">
      <form onsubmit="{handleSubmit}" classname="relative mb-4 flex gap-2">
        <div classname="relative flex-1">
          <input type="text" value="{query}" onchange="{(e)" ==""> setQuery(e.target.value)}
            placeholder="নবী, সাহাবী বা ইমামের নাম লিখে খুঁজুন..."
            className="w-full border border-emerald-300 rounded-full py-3 pl-12 pr-4 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none shadow-sm"
          />
          <search classname="absolute left-4 top-3.5 text-gray-400" size="{20}"/>
        </div>
        <button type="submit" disabled="{isSearching" ||="" !query.trim()}="" classname="bg-emerald-600 text-white px-6 rounded-full font-medium hover:bg-emerald-700 disabled:opacity-50 transition-colors">
          খুঁজুন
        </button>
      </form>

      <div classname="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
        {tags.map(t => (
          <button key="{t}" onclick="{()" ==""> handleTagClick(t)} 
            className="whitespace-nowrap px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium hover:bg-emerald-200 transition-colors"
          >
            {t}
          </button>
        ))}
      </div>

      <div classname="flex-1 overflow-y-auto bg-white rounded-2xl shadow-sm border border-emerald-100 p-5">
        {selectedStory ? (
          <div classname="markdown-body text-gray-800">
            <h1 classname="text-2xl font-bold text-emerald-800 mb-4 pb-2 border-b border-emerald-100">
              {selectedStory.title}
            </h1>
            <reactmarkdown>{selectedStory.content}</ReactMarkdown>
          </div>
        ) : aiContent !== null ? (
          <div classname="markdown-body text-gray-800">
            <div classname="bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full inline-flex items-center gap-2 mb-4 border border-emerald-200">
              {isSearching ? 'AI তথ্য খুঁজছে এবং স্ক্রিনে আনছে...' : 'AI দ্বারা সংগৃহীত বিস্তারিত জীবনী'} {isSearching && <loader2 size="{12}" classname="animate-spin"/>}
            </div>
            <reactmarkdown>{aiContent}</ReactMarkdown>
          </div>
        ) : error ? (
          <div classname="h-full flex flex-col items-center justify-center text-red-500 space-y-4">
            <p>{error}</p>
          </div>
        ) : (
          <div classname="h-full flex flex-col items-center justify-center text-gray-400 space-y-4 opacity-70">
            <bookopentext size="{64}" classname="text-emerald-200"/>
            <p classname="text-center">উপরের তালিকা থেকে নির্বাচন করুন<br/>বা যেকোনো ইসলামী ব্যক্তিত্বের নাম লিখে খুঁজুন</p>
          </div>
        )}
      </div>
    </div>
  );
}
