import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import BottomNav from './components/BottomNav';
import Home from './components/Home';
import Tracker from './components/Tracker';
import Hadith from './components/Hadith';
import Stories from './components/Stories';
import SelfImprovement from './components/SelfImprovement';
import AIChat from './components/AIChat';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div classname="flex flex-col h-screen w-full bg-slate-50 overflow-hidden relative">
      {activeTab !== 'chat' && activeTab !== 'home' && (
        <header classname="bg-emerald-600 text-white p-4 text-center font-bold text-xl shadow-md z-10 flex items-center justify-center gap-2">
          <span>🌙</span> Islamic icon
        </header>
      )}

      <main classname="flex-1 overflow-y-auto overflow-x-hidden relative">
        <animatepresence mode="wait">
          <motion.div key="{activeTab}" initial="{{" opacity:="" 0,="" y:="" 10="" }}="" animate="{{" opacity:="" 1,="" y:="" 0="" }}="" exit="{{" opacity:="" 0,="" y:="" -10="" }}="" transition="{{" duration:="" 0.2,="" ease:="" "easeinout"="" }}="" classname="h-full">
            {activeTab === 'home' && <home setactivetab="{setActiveTab}"/>}
            {activeTab === 'tracker' && <tracker/>}
            {activeTab === 'hadith' && <hadith/>}
            {activeTab === 'stories' && <stories/>}
            {activeTab === 'improve' && <selfimprovement/>}
            {activeTab === 'chat' && <aichat/>}
          </motion.div>
        </AnimatePresence>
      </main>

      <bottomnav activetab="{activeTab}" setactivetab="{setActiveTab}"/>
    </div>
  );
}

