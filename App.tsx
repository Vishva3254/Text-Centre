
import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CounterPage from './pages/CounterPage';
import GrammarPage from './pages/GrammarPage';
import TTSPage from './pages/TTSPage';
import CapitalizePage from './pages/CapitalizePage';
import CalligraphyPage from './pages/CalligraphyPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <header className="sticky top-0 z-50 glass border-b border-zinc-200">
          <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold group-hover:scale-105 transition-transform">
                T
              </div>
              <span className="text-xl font-bold tracking-tight">Text Centre</span>
            </Link>
            <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-zinc-600">
              <Link to="/counter" className="hover:text-indigo-600 transition-colors">Counter</Link>
              <Link to="/grammar" className="hover:text-indigo-600 transition-colors">Grammar</Link>
              <Link to="/tts" className="hover:text-indigo-600 transition-colors">Speech</Link>
              <Link to="/capitalize" className="hover:text-indigo-600 transition-colors">Capitalize</Link>
              <Link to="/calligraphy" className="hover:text-indigo-600 transition-colors">Styles</Link>
            </div>
          </nav>
        </header>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/counter" element={<CounterPage />} />
            <Route path="/grammar" element={<GrammarPage />} />
            <Route path="/tts" element={<TTSPage />} />
            <Route path="/capitalize" element={<CapitalizePage />} />
            <Route path="/calligraphy" element={<CalligraphyPage />} />
          </Routes>
        </main>

        <footer className="bg-white border-t border-zinc-200 py-12">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-zinc-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Text Centre. Built for the modern web.</p>
            <div className="mt-4 md:mt-0 flex space-x-8">
              <span>Free Forever</span>
              <span>No Signup</span>
              <span>AI Powered</span>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
