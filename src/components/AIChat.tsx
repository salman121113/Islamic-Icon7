import { useState, useEffect, useRef } from 'react';
import { ai } from '../lib/gemini';
import { Mic, Send, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function AIChat() {
  const [messages, setMessages] = useState<{role: 'user'|'model', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const chatRef = useRef<any>(null);
  const messagesEndRef = useRef<htmldivelement>(null);

  useEffect(() => {
    chatRef.current = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: 'তুমি একজন জ্ঞানী, দয়ালু ইসলামিক স্কলার এবং বন্ধু। তুমি ব্যবহারকারীকে তার ঈমান মজবুত করতে এবং নিজেকে পরিবর্তন করতে সাহায্য করবে। শুধুমাত্র কুরআন এবং সহীহ হাদিসের আলোকে উত্তর দেবে। বাংলায় কথা বলবে। ব্যবহারকারীকে সবসময় উৎসাহিত করবে।'
      }
    });
    setMessages([{ role: 'model', text: 'আসসালামু আলাইকুম! আমি আপনার ইসলামিক এআই সহকারী। আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?' }]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const response = await chatRef.current.sendMessage({ message: userMsg });
      setMessages(prev => [...prev, { role: 'model', text: response.text }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: 'দুঃখিত, একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।' }]);
    }
    setLoading(false);
  };

  const toggleListen = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('আপনার ব্রাউজার ভয়েস রিকগনিশন সাপোর্ট করে না।');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'bn-BD';
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  return (
    <div classname="flex flex-col h-full bg-slate-50">
      <div classname="bg-emerald-600 text-white p-4 flex items-center gap-3 shadow-md z-10 shrink-0">
        <div classname="bg-white p-2 rounded-full text-emerald-600">
          <bot size="{24}"/>
        </div>
        <div>
          <h2 classname="font-bold text-lg">ইসলামিক এআই সহকারী</h2>
          <p classname="text-xs opacity-90">আপনার ঈমান ও আমলের সাথী</p>
        </div>
      </div>

      <div classname="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, i) => (
          <div key="{i}" classname="{`flex" ${m.role="==" 'user'="" ?="" 'justify-end'="" :="" 'justify-start'}`}="">
            <div classname="{`max-w-[85%]" p-3.5="" rounded-2xl="" ${="" m.role="==" 'user'="" ?="" 'bg-emerald-600="" text-white="" rounded-br-sm="" shadow-md'="" :="" 'bg-white="" text-gray-800="" rounded-bl-sm="" shadow-md="" border="" border-emerald-100'="" }`}="">
              {m.role === 'model' ? (
                <div classname="markdown-body text-sm leading-relaxed">
                  <reactmarkdown>{m.text}</ReactMarkdown>
                </div>
              ) : (
                <p classname="text-sm leading-relaxed">{m.text}</p>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div classname="flex justify-start">
            <div classname="bg-white p-4 rounded-2xl rounded-bl-sm shadow-md border border-emerald-100 flex gap-2 items-center">
              <div classname="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
              <div classname="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style="{{" animationdelay:="" '0.2s'="" }}=""></div>
              <div classname="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style="{{" animationdelay:="" '0.4s'="" }}=""></div>
            </div>
          </div>
        )}
        <div ref="{messagesEndRef}" classname="h-4"/>
      </div>

      <div classname="p-3 bg-white border-t border-gray-200 shrink-0 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
        <div classname="flex gap-2 items-end max-w-4xl mx-auto">
          <button onclick="{toggleListen}" classname="{`p-3.5" rounded-full="" transition-all="" shrink-0="" ${="" islistening="" ?="" 'bg-red-500="" text-white="" animate-pulse="" shadow-lg="" shadow-red-200'="" :="" 'bg-gray-100="" text-gray-600="" hover:bg-gray-200="" hover:text-emerald-600'="" }`}="">
            <mic size="{22}/">
          </button>
          <div classname="flex-1 relative bg-gray-50 rounded-3xl border border-gray-200 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all shadow-inner">
            <textarea value="{input}" onchange="{e" ==""> setInput(e.target.value)} 
              onKeyDown={e => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              className="w-full bg-transparent px-5 py-3.5 focus:outline-none resize-none h-14 max-h-32 text-gray-700 placeholder-gray-400 scrollbar-hide" 
              placeholder="আপনার প্রশ্ন লিখুন বা বলুন..." 
              rows={1}
            />
          </div>
          <button 
            onClick={handleSend} 
            disabled={!input.trim() || loading}
            className="p-3.5 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 disabled:opacity-50 disabled:hover:bg-emerald-600 transition-all shrink-0 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            <Send size={22} className={input.trim() && !loading ? 'translate-x-0.5' : ''}/>
          </button>
        </div>
      </div>
    </div>
  );
}
