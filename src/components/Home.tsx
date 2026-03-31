import { BookOpen, Heart, Star, Moon, Clock, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

interface HomeProps {
  setActiveTab: (tab: string) => void;
}

const dailyInspirations = [
  {
    quran: {
      text: "নিশ্চয়ই নামায অশ্লীল ও গর্হিত কাজ থেকে বিরত রাখে।",
      ref: "সূরা আল-আনকাবুত: ৪৫"
    },
    hadith: {
      text: "তোমাদের মধ্যে সর্বোত্তম ব্যক্তি সে, যে নিজে কুরআন শেখে এবং অন্যকে শেখায়।",
      ref: "সহীহ বুখারী: ৫০২৭"
    }
  },
  {
    quran: {
      text: "নিশ্চয়ই কষ্টের সাথেই রয়েছে স্বস্তি।",
      ref: "সূরা আল-ইনশিরাহ: ৫"
    },
    hadith: {
      text: "যে ব্যক্তি মানুষের প্রতি দয়া করে না, আল্লাহ তার প্রতি দয়া করেন না।",
      ref: "সহীহ বুখারী: ৭৩৭৬"
    }
  },
  {
    quran: {
      text: "তোমরা আমাকে স্মরণ করো, আমিও তোমাদের স্মরণ করব।",
      ref: "সূরা আল-বাকারাহ: ১৫২"
    },
    hadith: {
      text: "পবিত্রতা ঈমানের অঙ্গ।",
      ref: "সহীহ মুসলিম: ২২৩"
    }
  },
  {
    quran: {
      text: "আল্লাহর রহমত থেকে নিরাশ হয়ো না।",
      ref: "সূরা আয-যুমার: ৫৩"
    },
    hadith: {
      text: "প্রকৃত বীর সে নয় যে কুস্তিতে কাউকে হারিয়ে দেয়, বরং প্রকৃত বীর সে যে রাগের সময় নিজেকে নিয়ন্ত্রণ করতে পারে।",
      ref: "সহীহ বুখারী: ৬১১৪"
    }
  },
  {
    quran: {
      text: "আর তোমরা আল্লাহর রজ্জুকে দৃঢ়ভাবে আঁকড়ে ধরো এবং পরস্পর বিচ্ছিন্ন হয়ো না।",
      ref: "সূরা আল-ইমরান: ১০৩"
    },
    hadith: {
      text: "যে ব্যক্তি আল্লাহ ও শেষ দিনের প্রতি ঈমান রাখে, সে যেন ভালো কথা বলে অথবা চুপ থাকে।",
      ref: "সহীহ বুখারী: ৬০১৮"
    }
  }
];

export default function Home({ setActiveTab }: HomeProps) {
  // Get the day of the year to change content daily at midnight
  const getDayOfYear = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  };

  const todayIndex = getDayOfYear() % dailyInspirations.length;
  const content = dailyInspirations[todayIndex];

  return (
    <div classname="pb-24 h-full overflow-y-auto bg-slate-50">
      {/* Hero Section with Kaaba */}
      <motion.div initial="{{" opacity:="" 0="" }}="" animate="{{" opacity:="" 1="" }}="" transition="{{" duration:="" 0.5="" }}="" classname="relative h-72 w-full shadow-lg">
        <img src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&amp;w=1200&amp;auto=format&amp;fit=crop" alt="Holy Kaaba" classname="w-full h-full object-cover"/>
        <div classname="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center justify-end text-white p-6 text-center">
          <h1 classname="text-3xl font-bold mb-2 tracking-wide">দ্বীন ও দুনিয়া</h1>
          <p classname="text-sm opacity-90 font-medium bg-black/30 px-4 py-1.5 rounded-full backdrop-blur-sm">আপনার প্রতিদিনের ইসলামী জীবনসঙ্গী</p>
        </div>
      </motion.div>

      {/* Content Sections */}
      <div classname="p-4 space-y-5 -mt-6 relative z-10">
        
        {/* Daily Info / Date */}
        <motion.div initial="{{" opacity:="" 0,="" y:="" 20="" }}="" animate="{{" opacity:="" 1,="" y:="" 0="" }}="" transition="{{" delay:="" 0.1="" }}="" classname="bg-white rounded-2xl p-4 shadow-md border border-emerald-100 flex items-center justify-between">
          <div classname="flex items-center gap-3">
            <div classname="bg-emerald-100 p-2.5 rounded-xl text-emerald-600">
              <calendar size="{20}"/>
            </div>
            <div>
              <p classname="text-xs text-gray-500 font-medium">আজকের দিন</p>
              <p classname="text-sm font-bold text-gray-800">আলহামদুলিল্লাহ, একটি নতুন দিন</p>
            </div>
          </div>
          <div classname="text-right">
            <clock size="{20}" classname="text-emerald-500 inline-block mb-1"/>
            <p classname="text-[10px] text-gray-400 font-medium">সময় অমূল্য</p>
          </div>
        </motion.div>

        {/* Info Card 1: Quran */}
        <motion.div initial="{{" opacity:="" 0,="" y:="" 20="" }}="" animate="{{" opacity:="" 1,="" y:="" 0="" }}="" transition="{{" delay:="" 0.2="" }}="" classname="bg-white rounded-2xl p-5 shadow-md border border-emerald-100 flex items-start gap-4 hover:shadow-lg transition-shadow">
          <div classname="bg-emerald-50 p-3 rounded-2xl text-emerald-600 shrink-0">
            <bookopen size="{24}"/>
          </div>
          <div>
            <h3 classname="font-bold text-gray-800 text-base mb-1.5">কুরআনের আলো</h3>
            <p classname="text-gray-600 text-sm leading-relaxed italic">
              "{content.quran.text}"
            </p>
            <p classname="text-emerald-600 font-semibold text-xs mt-2">— {content.quran.ref}</p>
          </div>
        </motion.div>

        {/* Info Card 2: Hadith */}
        <motion.div initial="{{" opacity:="" 0,="" y:="" 20="" }}="" animate="{{" opacity:="" 1,="" y:="" 0="" }}="" transition="{{" delay:="" 0.3="" }}="" classname="bg-white rounded-2xl p-5 shadow-md border border-emerald-100 flex items-start gap-4 hover:shadow-lg transition-shadow">
          <div classname="bg-emerald-50 p-3 rounded-2xl text-emerald-600 shrink-0">
            <heart size="{24}"/>
          </div>
          <div>
            <h3 classname="font-bold text-gray-800 text-base mb-1.5">রাসূল (সাঃ) এর বাণী</h3>
            <p classname="text-gray-600 text-sm leading-relaxed italic">
              "{content.hadith.text}"
            </p>
            <p classname="text-emerald-600 font-semibold text-xs mt-2">— {content.hadith.ref}</p>
          </div>
        </motion.div>

        {/* Quick Links / Info */}
        <motion.div initial="{{" opacity:="" 0,="" y:="" 20="" }}="" animate="{{" opacity:="" 1,="" y:="" 0="" }}="" transition="{{" delay:="" 0.4="" }}="" classname="grid grid-cols-2 gap-4 pt-2">
          <button onclick="{()" ==""> setActiveTab('stories')}
            className="bg-gradient-to-br from-emerald-500 to-emerald-700 text-white rounded-2xl p-5 shadow-md flex flex-col items-center text-center transform hover:scale-105 transition-all active:scale-95"
          >
            <moon size="{32}" classname="mb-3 opacity-90"/>
            <h4 classname="font-bold text-sm">জীবনী</h4>
            <p classname="text-[10px] opacity-80 mt-1.5 leading-tight">নবীদের ও সাহাবীদের বিস্তারিত জীবনী</p>
          </button>
          <button onclick="{()" ==""> setActiveTab('hadith')}
            className="bg-gradient-to-br from-teal-500 to-teal-700 text-white rounded-2xl p-5 shadow-md flex flex-col items-center text-center transform hover:scale-105 transition-all active:scale-95"
          >
            <star size="{32}" classname="mb-3 opacity-90"/>
            <h4 classname="font-bold text-sm">সহীহ হাদিস</h4>
            <p classname="text-[10px] opacity-80 mt-1.5 leading-tight">প্রতিদিনের জন্য নির্বাচিত হাদিস</p>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
