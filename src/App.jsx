import ChatInterface from './components/ChatInterface';

function App() {
  return (
    <div className="flex flex-col h-screen bg-[#0a0f1a] text-gray-100 font-sans">
      {/* Header pushed fully to the left */}
      <header className="bg-gray-900/80 backdrop-blur-md border-b border-gray-800 p-4 shadow-sm z-10 w-full">
        <div className="flex items-center gap-3 px-2 w-full">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <span className="text-xl">💪</span>
          </div>
          <h1 className="font-extrabold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            IronMind AI
          </h1>
        </div>
      </header>
      
      {/* Main Container - fully expanded, zero padding on the sides */}
      <main className="flex-1 overflow-hidden w-full h-full flex flex-col">
        <ChatInterface />
      </main>
    </div>
  );
}

export default App;