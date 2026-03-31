import { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import { HADITH_DATABASE } from '../data/hadiths';

export default function Hadith() {
  const [dailyHadiths, setDailyHadiths] = useState<{arabic: string, bengali: string, reference: string}[]>([]);

  useEffect(() => {
    // Calculate a unique day index based on the current local date
    const updateHadiths = () => {
      const now = new Date();
      // Use local timezone date string to ensure it changes exactly at midnight local time
      const dateString = now.toLocaleDateString('en-US'); 
      const dayIndex = Math.floor(new Date(dateString).getTime() / 86400000);
      
      // We will show ALL hadiths from the database (or up to 100)
      const itemsToShow = Math.min(100, HADITH_DATABASE.length);
      const startIndex = (dayIndex * itemsToShow) % HADITH_DATABASE.length;
      
      const selected = [];
      for (let i = 0; i < itemsToShow; i++) {
        selected.push(HADITH_DATABASE[(startIndex + i) % HADITH_DATABASE.length]);
      }
      setDailyHadiths(selected);
    };

    updateHadiths();

    // Set up a timer to check if midnight has passed
    const interval = setInterval(() => {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        updateHadiths();
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div classname="p-4 space-y-4 pb-24 h-full overflow-y-auto">
      <div classname="bg-emerald-600 text-white p-6 rounded-2xl shadow-md flex items-center gap-4 sticky top-0 z-20">
        <bookopen size="{32}" classname="opacity-80"/>
        <div>
          <h2 classname="text-xl font-bold">আজকের হাদিস ভাণ্ডার</h2>
          <p classname="text-sm opacity-90">প্রতিদিন রাত ১২টায় নতুন হাদিস আপডেট হয়</p>
        </div>
      </div>

      <div classname="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-emerald-800 text-sm text-center font-medium">
        আজকের জন্য {dailyHadiths.length} টি সহীহ হাদিস দেওয়া হলো
      </div>

      <div classname="space-y-6">
        {dailyHadiths.map((h, i) => (
          <div key="{i}" classname="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-emerald-500 relative overflow-hidden">
            <div classname="absolute top-0 right-0 text-9xl text-emerald-50 opacity-30 font-serif leading-none -mt-4 -mr-2">"</div>
            
            {/* Arabic Text */}
            <p classname="text-right text-2xl font-arabic text-gray-800 leading-loose mb-4 relative z-10" dir="rtl">
              {h.arabic}
            </p>
            
            {/* Divider */}
            <div classname="w-full h-px bg-emerald-100 my-4 relative z-10"></div>
            
            {/* Bengali Text */}
            <p classname="text-gray-700 text-lg leading-relaxed relative z-10">
              {h.bengali}
            </p>
            
            {/* Reference */}
            <div classname="mt-4 inline-block bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold relative z-10">
              {h.reference}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
