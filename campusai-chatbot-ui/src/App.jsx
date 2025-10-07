import React, { useState } from 'react';
import { Send, Menu, Plus, Search, BookOpen, GraduationCap, Calendar, Users, FileText, Settings, MessageSquare, MoreHorizontal, Trash2 } from 'lucide-react';

export default function UniversityChatbot() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your University AI Assistant. How can I help you today?", sender: 'bot', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [activeCategory, setActiveCategory] = useState('general');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchHistory, setSearchHistory] = useState([
    { id: 1, title: 'Course Registration Help', category: 'academics', date: '2 hours ago' },
    { id: 2, title: 'Library Hours', category: 'facilities', date: '1 day ago' },
    { id: 3, title: 'Financial Aid Information', category: 'admissions', date: '2 days ago' },
    { id: 4, title: 'Campus Events This Week', category: 'events', date: '3 days ago' }
  ]);
  const [currentConversationId, setCurrentConversationId] = useState(null);

  const categories = [
    { id: 'general', name: 'General', icon: MessageSquare },
    { id: 'academics', name: 'Academics', icon: BookOpen },
    { id: 'admissions', name: 'Admissions', icon: GraduationCap },
    { id: 'events', name: 'Events', icon: Calendar },
    { id: 'facilities', name: 'Facilities', icon: Users },
    { id: 'resources', name: 'Resources', icon: FileText }
  ];

  const handleSend = () => {
    if (input.trim()) {
      const userMessage = {
        id: messages.length + 1,
        text: input,
        sender: 'user',
        timestamp: new Date()
      };
      
      setMessages([...messages, userMessage]);
      
      // Save to history if it's a new conversation
      if (!currentConversationId) {
        const newHistory = {
          id: searchHistory.length + 1,
          title: input.substring(0, 40) + (input.length > 40 ? '...' : ''),
          category: activeCategory,
          date: 'Just now'
        };
        setSearchHistory([newHistory, ...searchHistory]);
        setCurrentConversationId(newHistory.id);
      }
      
      setInput('');
      
      // Simulate bot response
      setTimeout(() => {
        const botMessage = {
          id: messages.length + 2,
          text: getBotResponse(input, activeCategory),
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      }, 1000);
    }
  };

  const getBotResponse = (query, category) => {
    const responses = {
      academics: "I can help you with course information, registration, academic calendar, grades, and more. What specific academic topic would you like to know about?",
      admissions: "I'm here to assist with admissions requirements, application deadlines, scholarships, and financial aid. What would you like to know?",
      events: "Let me help you find information about campus events, workshops, seminars, and activities. What kind of event are you interested in?",
      facilities: "I can provide information about campus facilities including libraries, labs, sports centers, and student services. What facility would you like to know about?",
      resources: "I can guide you to various university resources including online portals, student services, career center, and counseling. What resource do you need?",
      general: "I'm here to help! You can ask me about academics, admissions, events, facilities, or any other university-related questions."
    };
    return responses[category] || responses.general;
  };

  const loadConversation = (historyItem) => {
    setCurrentConversationId(historyItem.id);
    setActiveCategory(historyItem.category);
    setMessages([
      { id: 1, text: "Hello! I'm your University AI Assistant. How can I help you today?", sender: 'bot', timestamp: new Date() },
      { id: 2, text: historyItem.title, sender: 'user', timestamp: new Date() }
    ]);
  };

  const startNewChat = () => {
    setMessages([
      { id: 1, text: "Hello! I'm your University AI Assistant. How can I help you today?", sender: 'bot', timestamp: new Date() }
    ]);
    setCurrentConversationId(null);
    setActiveCategory('general');
  };

  const deleteHistory = (id, e) => {
    e.stopPropagation();
    setSearchHistory(searchHistory.filter(item => item.id !== id));
    if (currentConversationId === id) {
      startNewChat();
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-sans">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-72' : 'w-0'} transition-all duration-300 bg-white border-r border-slate-200 flex flex-col shadow-lg overflow-hidden`}>
        <div className="p-4 border-b border-slate-200">
          <button 
            onClick={startNewChat}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg font-medium"
          >
            <Plus size={20} />
            New Chat
          </button>
        </div>
        
        <div className="p-4 border-b border-slate-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <div className="p-3">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">Recent Conversations</h3>
            <div className="space-y-1">
              {searchHistory.map(item => (
                <div
                  key={item.id}
                  onClick={() => loadConversation(item)}
                  className={`group flex items-start justify-between p-3 rounded-lg cursor-pointer transition-all ${
                    currentConversationId === item.id 
                      ? 'bg-blue-50 border border-blue-200' 
                      : 'hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">{item.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-500 capitalize">{item.category}</span>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs text-slate-500">{item.date}</span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => deleteHistory(item.id, e)}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded transition-all"
                  >
                    <Trash2 size={14} className="text-red-500" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-slate-200">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-50 transition-all text-slate-700">
            <Settings size={20} />
            <span className="text-sm font-medium">Settings</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 shadow-sm">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <Menu size={24} className="text-slate-600" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-slate-800">University AI Assistant</h1>
                <p className="text-sm text-slate-500">Powered by Advanced AI</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold shadow-md">
                UA
              </div>
            </div>
          </div>
          
          {/* Category Tabs */}
          <div className="px-4 pb-3 overflow-x-auto">
            <div className="flex gap-2">
              {categories.map(cat => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-all ${
                      activeCategory === cat.id
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="text-sm">{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-3 max-w-3xl ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center shadow-md ${
                  msg.sender === 'user' 
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                    : 'bg-gradient-to-br from-slate-600 to-slate-700'
                } text-white font-semibold`}>
                  {msg.sender === 'user' ? 'You' : 'AI'}
                </div>
                <div className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`px-5 py-3 rounded-2xl shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                      : 'bg-white text-slate-800 border border-slate-200'
                  }`}>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                  </div>
                  <span className="text-xs text-slate-400 mt-1 px-2">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="border-t border-slate-200 bg-white p-4 shadow-lg">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-3 items-end">
              <div className="flex-1 relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                  placeholder={`Ask about ${categories.find(c => c.id === activeCategory)?.name.toLowerCase()}...`}
                  className="w-full px-5 py-4 pr-12 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                  rows="1"
                  style={{ maxHeight: '120px' }}
                />
                <button className="absolute right-3 bottom-4 p-1 text-slate-400 hover:text-slate-600 transition-colors">
                  <MoreHorizontal size={20} />
                </button>
              </div>
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                <Send size={20} />
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-3 text-center">
              AI Assistant can make mistakes. Please verify important information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}