import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function ChatBox({ isLoggedIn, onPromptSubmit }) {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [typingIndex, setTypingIndex] = useState(0); // Controls typing effect
  const chatContainerRef = useRef(null);

  const sampleQuestions = [
    "Show me a bar chart of AQI Average over months.",
    "Generate a pie chart for user engagement.",
    "Visualize a line graph of monthly revenue.",
    "Create a scatter plot for data distribution."
  ];

  useEffect(() => {
    if (!isLoggedIn) {
      let index = 0;
      let typingTimeout;

      const cycleQuestions = () => {
        setTypingIndex(0); // Reset typing effect
        setCurrentQuestion(''); // Clear previous text

        let charIndex = 0;
        typingTimeout = setInterval(() => {
          setCurrentQuestion(sampleQuestions[index].slice(0, charIndex + 1)); // Type letter by letter
          charIndex++;

          if (charIndex === sampleQuestions[index].length) {
            clearInterval(typingTimeout);
            setTimeout(() => {
              index = (index + 1) % sampleQuestions.length; // Move to next question
              cycleQuestions();
            }, 2000); // Keep the full text visible for 2 seconds before switching
          }
        }, 40); // Typing speed (adjust for faster/slower effect)
      };

      cycleQuestions();
      return () => clearTimeout(typingTimeout);
    }
  }, [isLoggedIn]);

  const handleSend = () => {
    if (!message.trim()) return;
    setChatHistory(prev => [...prev, { text: message, sender: 'user' }]);

    if (!isLoggedIn) {
      setChatHistory(prev => [
        ...prev,
        { 
          text: <>You need to login or signup for further use. <Link href="/login"><span className="underline text-blue-500">Click here to login</span></Link></>, 
          sender: 'system' 
        }
      ]);
    } else {
      onPromptSubmit(message);
      setChatHistory(prev => [...prev, { text: "Processing your request...", sender: 'ai' }]);
    }
    setMessage('');
  };

  return (
    <div className="border rounded-lg p-4 bg-white dark:bg-gray-700 shadow relative">
      <div className="h-64 overflow-y-auto mb-4 pt-20" ref={chatContainerRef}>
        {chatHistory.length === 0 ? (
          <p className="text-gray-500">No messages yet...</p>
        ) : (
          chatHistory.map((msg, index) => (
            <div key={index} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block px-3 py-1 rounded ${
                msg.sender === 'user' 
                  ? 'bg-blue-500 text-white' 
                  : msg.sender === 'ai' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-yellow-300 text-gray-800'
              }`}>
                {msg.text}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Sample Question - Typewriter effect in the same position */}
      {!isLoggedIn && (
        <div className="absolute top-0 left-0 w-full px-4 pt-4 text-center">
          <p className="text-gray-600 dark:text-gray-300 text-lg whitespace-nowrap overflow-hidden border-r-4 border-gray-500 dark:border-gray-300 pr-1 animate-typewriter">
            {currentQuestion}
          </p>
        </div>
      )}

      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Type your query..."
          className="flex-grow border rounded px-3 py-2 focus:outline-none focus:ring dark:bg-gray-600 dark:text-white"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button 
          onClick={handleSend} 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}
