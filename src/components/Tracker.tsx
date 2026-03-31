import { useState, useEffect } from 'react';

const getTodayKey = () => new Date().toISOString().split('T')[0];

export default function Tracker() {
  const [prayers, setPrayers] = useState({ fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false });
  const [quranPages, setQuranPages] = useState<number |="" ''="">('');
  const [booksRead, setBooksRead] = useState<number |="" ''="">('');
  const [goodDeeds, setGoodDeeds] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(`tracker_${getTodayKey()}`);
    if (saved) {
      const data = JSON.parse(saved);
      setPrayers(data.prayers || { fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false });
      setQuranPages(data.quranPages || '');
      setBooksRead(data.booksRead || '');
      setGoodDeeds(data.goodDeeds || '');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(`tracker_${getTodayKey()}`, JSON.stringify({ prayers, quranPages, booksRead, goodDeeds }));
  }, [prayers, quranPages, booksRead, goodDeeds]);

  const getCompletedPrayersCount = () => {
    return Object.values(prayers).filter(Boolean).length;
  };

  const completedPrayers = getCompletedPrayersCount();

  return (
    <div classname="p-4 space-y-6 pb-24 h-full overflow-y-auto">
      <div classname="bg-white p-5 rounded-2xl shadow-sm border border-emerald-100">
        <h2 classname="font-bold text-lg mb-4 text-emerald-800 border-b pb-2">নামাজ (Daily Prayers)</h2>
        <div classname="grid grid-cols-2 gap-3">
          {[
            { id: 'fajr', label: 'ফজর' },
            { id: 'dhuhr', label: 'যোহর' },
            { id: 'asr', label: 'আসর' },
            { id: 'maghrib', label: 'মাগরিব' },
            { id: 'isha', label: 'এশা' },
          ].map(prayer => (
            <label key="{prayer.id}" classname="flex items-center space-x-3 p-2 rounded-lg hover:bg-emerald-50 cursor-pointer transition-colors">
              <input type="checkbox" checked="{prayers[prayer.id" as="" keyof="" typeof="" prayers]}="" onchange="{(e)" ==""> setPrayers({ ...prayers, [prayer.id]: e.target.checked })}
                className="w-5 h-5 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
              />
              <span classname="text-gray-700 font-medium">{prayer.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div classname="bg-white p-5 rounded-2xl shadow-sm border border-emerald-100">
        <h2 classname="font-bold text-lg mb-4 text-emerald-800 border-b pb-2">অধ্যয়ন (Study)</h2>
        <div classname="space-y-4">
          <div>
            <label classname="block text-sm font-medium text-gray-700 mb-1">কুরআন তিলাওয়াত (কত পৃষ্ঠা?)</label>
            <input type="number" value="{quranPages}" onchange="{(e)" ==""> setQuranPages(e.target.value ? Number(e.target.value) : '')}
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              placeholder="পৃষ্ঠার সংখ্যা লিখুন..."
            />
          </div>
          <div>
            <label classname="block text-sm font-medium text-gray-700 mb-1">ইসলামিক বই পড়া (কত পৃষ্ঠা?)</label>
            <input type="number" value="{booksRead}" onchange="{(e)" ==""> setBooksRead(e.target.value ? Number(e.target.value) : '')}
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              placeholder="পৃষ্ঠার সংখ্যা লিখুন..."
            />
          </div>
        </div>
      </div>

      <div classname="bg-white p-5 rounded-2xl shadow-sm border border-emerald-100">
        <h2 classname="font-bold text-lg mb-4 text-emerald-800 border-b pb-2">ভালো কাজ (Good Deeds)</h2>
        <textarea value="{goodDeeds}" onchange="{(e)" ==""> setGoodDeeds(e.target.value)}
          className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all h-24 resize-none"
          placeholder="আজ কী কী ভালো কাজ করেছেন? (যেমন: দান করা, পিতামাতাকে সাহায্য করা, জিকির করা...)"
        />
      </div>

      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 rounded-2xl shadow-lg text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-white opacity-10 transform -skew-x-12 -translate-x-20"></div>
        <h2 className="text-xl font-bold mb-4 relative z-10 border-b border-white/20 pb-2">আজকের আমলের সারসংক্ষেপ</h2>
        <div className="space-y-3 relative z-10 text-emerald-50">
          {completedPrayers > 0 && (
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-300"></span>
              {completedPrayers === 5 ? 'মাশাআল্লাহ! ৫ ওয়াক্ত নামাজই আদায় করেছেন।' : `${completedPrayers} ওয়াক্ত নামাজ আদায় করেছেন।`}
            </p>
          )}
          {Number(quranPages) > 0 && (
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-300"></span>
              {quranPages} পৃষ্ঠা কুরআন তিলাওয়াত করেছেন।
            </p>
          )}
          {Number(booksRead) > 0 && (
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-300"></span>
              {booksRead} পৃষ্ঠা ইসলামিক বই পড়েছেন।
            </p>
          )}
          {goodDeeds.trim().length > 0 && (
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-300"></span>
              আজকের দিনে কিছু ভালো কাজ করেছেন।
            </p>
          )}
          
          {completedPrayers === 0 && !quranPages && !booksRead && !goodDeeds.trim() && (
            <p className="opacity-80 italic text-center mt-2">এখনো কোনো আমল যোগ করা হয়নি। আল্লাহ আমাদের বেশি বেশি নেক আমল করার তৌফিক দিন।</p>
          )}
        </div>
      </div>
    </div>
  );
}
