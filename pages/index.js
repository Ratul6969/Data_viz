import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import ThemeToggle from '../components/ThemeToggle';
import CSVPanel from '../components/CSVPanel';
import ChatBox from '../components/ChatBox';
import { GiHamburgerMenu } from 'react-icons/gi';

export default function Home() {
  const [csvPanelOpen, setCsvPanelOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentSampleText, setCurrentSampleText] = useState("");
  const router = useRouter();
  const mainRef = useRef(null);

  // Dummy function for handling chat prompt submission
  const handlePromptSubmit = (prompt) => {
    console.log("User prompt submitted:", prompt);
    // Update sample text for graph images
    setCurrentSampleText(prompt);
  };

  // Handle login button click - navigate to login page
  const handleLoginClick = () => {
    router.push('/login');
  };

  // Toggle CSV panel
  const toggleCsvPanel = () => {
    setCsvPanelOpen(!csvPanelOpen);
  };

  // Mouse enter handler for CSV panel with improved sensitivity
  const handleMouseEnter = () => {
    setCsvPanelOpen(true);
  };

  // Mouse leave handler for CSV panel
  const handleMouseLeave = () => {
    setCsvPanelOpen(false);
  };

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If panel is open and the click is outside the panel and not on the toggle button
      if (csvPanelOpen && 
          mainRef.current && 
          !event.target.closest('.csv-panel') && 
          !event.target.closest('.hamburger-btn')) {
        setCsvPanelOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [csvPanelOpen]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 relative">
      {/* Header with centered logo and positioned controls */}
      <div className="w-full flex items-center justify-between p-4 fixed top-0 z-10 bg-gray-50 dark:bg-gray-900">
        {/* Left side - Hamburger menu */}
        <div className="flex-1 flex justify-start">
          <button 
            onClick={toggleCsvPanel} 
            className="p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 hamburger-btn"
            aria-label="Toggle sidebar"
          >
            <GiHamburgerMenu size={24} />
          </button>
        </div>
        
        {/* Center - Logo */}
        <div className="flex-1 flex justify-center">
          <h1 className="logo text-center">DataViz</h1>
        </div>
        
        {/* Right side - Theme toggle and login */}
        <div className="flex-1 flex justify-end items-center space-x-4">
          <ThemeToggle />
          <button 
            onClick={handleLoginClick}
            className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600"
          >
            Login
          </button>
        </div>
      </div>
      
      {/* CSV Panel with improved hover sensitivity - covers full height */}
      <div 
        className="fixed top-0 left-0 h-full z-20 csv-panel"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Hover area - invisible but detects mouse - full height */}
        <div 
          className="absolute top-0 left-0 h-full w-12"
          style={{ cursor: csvPanelOpen ? 'default' : 'pointer' }}
        ></div>
        
        {/* Actual panel */}
        <div 
          className={`h-full bg-white dark:bg-gray-800 shadow transform transition-transform duration-300 ${
            csvPanelOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          style={{ width: '300px' }}
        >
          <CSVPanel />
        </div>
      </div>
      
      <main className="p-4 pt-24 flex flex-col items-center space-y-8" ref={mainRef}>
        <div className="w-full max-w-2xl">
          <ChatBox 
            isLoggedIn={isLoggedIn} 
            onPromptSubmit={handlePromptSubmit}
            onSampleTextChange={setCurrentSampleText}
          />
        </div>
      </main>
      
      <footer className="w-full p-4 bg-gray-200 dark:bg-gray-800 text-center">
        <p className="text-sm">&copy; 2025 DataViz Analytics</p>
      </footer>
    </div>
  );
}