import { useState, useRef, useEffect } from 'react';
import { Send, Dumbbell, User, AlertCircle, Loader2, Zap } from 'lucide-react';
import { generateGymResponse } from '../services/huggingface';

const SUGGESTED_PROMPTS = [
  "Can you suggest a high-calorie meal plan for a clean bulk?",
  "What is the best rep range for hypertrophy?",
  "How do I break through a bench press plateau?",
  "Suggest a 4-day upper/lower split."
];

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, error]);

  const handleSend = async (textToSubmit) => {
    const text = textToSubmit || input;
    if (!text.trim()) return;

    const newUserMessage = { role: 'user', content: text };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput('');
    setError(null);
    setIsLoading(true);

    try {
      const responseText = await generateGymResponse(text);
      setMessages((prev) => [...prev, { role: 'bot', content: responseText }]);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatBotMessage = (text) => {
    return text.split('\n').map((line, index) => {
      const cleanLine = line.trim();
      if (!cleanLine) return null;

      const renderBold = (str) => {
        return str.split(/(\*\*.*?\*\*)/g).map((part, i) => 
          part.startsWith('**') && part.endsWith('**') 
            ? <strong key={i} className="text-white font-semibold">{part.replace(/\*\*/g, '')}</strong> 
            : part
        );
      };

      if (cleanLine.startsWith('* ') || cleanLine.startsWith('- ')) {
        return (
          <div key={index} className="flex gap-3 mt-2 text-left items-start w-full">
            <span className="text-cyan-500 mt-[2px] flex-shrink-0">•</span>
            <span className="text-gray-300">{renderBold(cleanLine.substring(2).trim())}</span>
          </div>
        );
      }

      return (
        <div key={index} className="mt-4 text-left w-full text-gray-300">
          {renderBold(cleanLine)}
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col w-full h-full bg-gray-900 overflow-hidden relative">
      
      {/* Chat Area - REMOVED the buggy pb-32 from here */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#0a0f1a] custom-scrollbar">
        
        <div className="w-full max-w-5xl mx-auto space-y-6">
          
          {/* Empty State */}
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-6">
              <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center text-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.15)] border border-gray-700">
                <Zap size={48} strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="text-3xl font-extrabold text-white tracking-tight">Level Up Your Gains</h2>
                <p className="text-gray-400 mt-2 max-w-md mx-auto">Your AI personal trainer is ready. Tap a prompt below or ask anything about training and nutrition.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-3xl mt-8">
                {SUGGESTED_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(prompt)}
                    className="p-4 text-left text-sm bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl hover:bg-gray-800 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.1)] transition-all duration-300 text-gray-300 hover:text-white font-medium group"
                  >
                    <span className="text-cyan-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity">▸</span>
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Message Bubbles */}
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-4 w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'bot' && (
                <div className="w-10 h-10 rounded-xl bg-gray-800 border border-gray-700 flex-shrink-0 flex items-center justify-center text-cyan-400 shadow-sm mt-1">
                  <Dumbbell size={20} />
                </div>
              )}
              
              <div className={`max-w-[85%] md:max-w-[80%] rounded-2xl p-5 shadow-sm text-[15px] ${
                msg.role === 'user' 
                  ? 'bg-gradient-to-br from-cyan-600 to-blue-700 text-white rounded-tr-sm shadow-blue-900/20' 
                  : 'bg-gray-800/80 border border-gray-700 rounded-tl-sm'
              }`}>
                <div className="leading-relaxed w-full">
                  {msg.role === 'user' ? (
                    <p className="whitespace-pre-wrap text-white">{msg.content}</p>
                  ) : (
                    <div className="flex flex-col w-full">
                      {formatBotMessage(msg.content)}
                    </div>
                  )}
                </div>
              </div>

              {msg.role === 'user' && (
                <div className="w-10 h-10 rounded-xl bg-blue-900/50 border border-blue-800 flex-shrink-0 flex items-center justify-center text-blue-300 mt-1">
                  <User size={20} />
                </div>
              )}
            </div>
          ))}

          {/* Loading State */}
          {isLoading && (
            <div className="flex gap-4 w-full justify-start animate-pulse">
              <div className="w-10 h-10 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center text-cyan-400 mt-1">
                <Dumbbell size={20} />
              </div>
              <div className="bg-gray-800/80 border border-gray-700 rounded-2xl rounded-tl-sm px-5 py-4 flex items-center gap-3">
                <Loader2 className="animate-spin text-cyan-500" size={18} />
                <span className="text-gray-400 text-sm font-medium">Coach is strategizing...</span>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="flex gap-4 w-full justify-start">
              <div className="w-10 h-10 rounded-xl bg-red-950/50 border border-red-900/50 flex items-center justify-center text-red-500 flex-shrink-0 mt-1">
                <AlertCircle size={20} />
              </div>
              <div className="bg-red-950/30 border border-red-900/50 rounded-2xl rounded-tl-sm p-5 text-red-400 flex flex-col gap-3 text-sm max-w-[80%]">
                <p className="text-base">{error}</p>
                <button 
                  onClick={() => handleSend(messages[messages.length - 1]?.content)}
                  className="text-red-300 font-semibold hover:text-white transition-colors flex items-center gap-1 w-max px-3 py-1.5 bg-red-900/40 rounded-lg hover:bg-red-900/60"
                >
                  <Zap size={14} /> Try again
                </button>
              </div>
            </div>
          )}

          {/* THE FIX: Invisible spacer block to push content above the floating input */}
          <div className="h-32 md:h-40 w-full flex-shrink-0" />
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Floating Input Area */}
      <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 bg-gradient-to-t from-[#0a0f1a] via-[#0a0f1a]/80 to-transparent pointer-events-none z-10">
        <div className="flex items-center gap-3 max-w-5xl mx-auto w-full pointer-events-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            placeholder="Ask about workouts, macros, or form..."
            className="flex-1 p-4 bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-2xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 disabled:opacity-50 transition-all text-white placeholder-gray-500 shadow-2xl shadow-black/50"
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="p-3 bg-cyan-600 text-white rounded-xl hover:bg-cyan-500 disabled:opacity-50 disabled:hover:bg-cyan-600 transition-all shadow-lg shadow-cyan-900/20 flex items-center justify-center group"
          >
            <Send size={18} className={`transform group-hover:translate-x-1 transition-transform ${isLoading ? "opacity-50" : ""}`} />
          </button>
        </div>
      </div>
    </div>
  );
}