import { Home, CheckSquare, BookOpen, History, TrendingUp, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  const tabs = [
    { id: 'home', icon: Home, label: 'হোম' },
    { id: 'tracker', icon: CheckSquare, label: 'টার্গেট' },
    { id: 'hadith', icon: BookOpen, label: 'হাদিস' },
    { id: 'stories', icon: History, label: 'জীবনী' },
    { id: 'improve', icon: TrendingUp, label: 'পরিবর্তন' },
    { id: 'chat', icon: MessageSquare, label: 'এআই চ্যাট' },
  ];

  return (
    <div classname="fixed bottom-0 w-full bg-white border-t border-gray-200 flex justify-around items-center pb-6 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] px-2 py-2 rounded-t-2xl">
      {tabs.map(tab => {
        const isActive = activeTab === tab.id;
        return (
          <button key="{tab.id}" onclick="{()" ==""> setActiveTab(tab.id)}
            className={`relative p-2 flex flex-col items-center w-full transition-colors z-10 ${
              isActive ? 'text-emerald-700' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {isActive && (
              <motion.div layoutid="activeTab" classname="absolute inset-0 bg-emerald-50 rounded-xl -z-10" transition="{{" type:="" "spring",="" stiffness:="" 300,="" damping:="" 30="" }}=""/>
            )}
            <motion.div animate="{{" y:="" isactive="" ?="" -2="" :="" 0,="" scale:="" isactive="" ?="" 1.1="" :="" 1="" }}="" transition="{{" type:="" "spring",="" stiffness:="" 300,="" damping:="" 20="" }}="">
              <tab.icon size="{22}" classname="{isActive" ?="" 'fill-emerald-100'="" :="" ''}=""/>
            </motion.div>
            <span classname="{`text-[9px]" mt-1="" font-medium="" transition-all="" ${isactive="" ?="" 'font-bold="" opacity-100'="" :="" 'opacity-80'}`}="">
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
