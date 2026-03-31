import { useState, useEffect } from 'react';
import { ai } from '../lib/gemini';
import { Loader2, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function SelfImprovement() {
  const [article, setArticle] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchArticle = async (dateKey: string) => {
    setLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: `Write a comprehensive, highly motivational Islamic article in Bengali on "How I can change myself for the better today". Focus on practical steps, Tazkiyah (purification of the soul), overcoming modern distractions, and building strong habits. Use Quranic verses and Hadith. Format in Markdown with clear headings and bullet points. Make it feel like a personal daily advice.`
      });
      const text = response.text || '';
      setArticle(text);
      localStorage.setItem(`improvement_${dateKey}`, text);
    } catch (error) {
      console.error(error);
      setArticle('দুঃখিত, আজকের লেখাটি লোড করতে সমস্যা হয়েছে। আপনার ইন্টারনেট সংযোগ চেক করুন।');
    }
    setLoading(false);
  };

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const cached = localStorage.getItem(`improvement_${today}`);
    
    if (cached) {
      setArticle(cached);
    } else {
      fetchArticle(today);
    }
  }, []);

  return (
    <div classname="p-4 pb-24 h-full flex flex-col">
      <div classname="bg-gradient-to-r from-teal-600 to-emerald-700 p-6 rounded-t-2xl text-white shadow-md relative overflow-hidden">
        <sparkles classname="absolute top-4 right-4 opacity-20" size="{64}"/>
        <h2 classname="text-2xl font-bold relative z-10">নিজেকে পরিবর্তন করুন</h2>
        <p classname="opacity-90 mt-1 relative z-10">আজকের অনুপ্রেরণা ও দিকনির্দেশনা</p>
      </div>
      
      <div classname="flex-1 overflow-y-auto bg-white rounded-b-2xl shadow-sm border border-t-0 border-emerald-100 p-6">
        {loading ? (
          <div classname="h-full flex flex-col items-center justify-center text-emerald-600 space-y-4 py-20">
            <loader2 classname="animate-spin" size="{40}"/>
            <p classname="font-medium animate-pulse">আজকের দিকনির্দেশনা প্রস্তুত করা হচ্ছে...</p>
          </div>
        ) : (
          <div classname="markdown-body text-gray-800">
            <reactmarkdown>{article}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
