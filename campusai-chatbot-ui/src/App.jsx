import React, { useState } from "react";
import {
  Send,
  Menu,
  Plus,
  Search,
  BookOpen,
  GraduationCap,
  Calendar,
  Users,
  FileText,
  Settings,
  MessageSquare,
  MoreHorizontal,
  Trash2,
} from "lucide-react";

export default function UniversityChatbot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your University AI Assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [activeCategory, setActiveCategory] = useState("general");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchHistory, setSearchHistory] = useState([
    {
      id: 1,
      title: "Course Registration Help",
      category: "academics",
      date: "2 hours ago",
    },
    {
      id: 2,
      title: "Library Hours",
      category: "facilities",
      date: "1 day ago",
    },
    {
      id: 3,
      title: "Financial Aid Information",
      category: "admissions",
      date: "2 days ago",
    },
    {
      id: 4,
      title: "Campus Events This Week",
      category: "events",
      date: "3 days ago",
    },
  ]);
  const [currentConversationId, setCurrentConversationId] = useState(null);

  const categories = [
    { id: "general", name: "General", icon: MessageSquare },
    { id: "academics", name: "Academics", icon: BookOpen },
    { id: "admissions", name: "Admissions", icon: GraduationCap },
    { id: "events", name: "Events", icon: Calendar },
    { id: "facilities", name: "Facilities", icon: Users },
    { id: "resources", name: "Resources", icon: FileText },
  ];

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = {
        id: messages.length + 1,
        text: input,
        sender: "user",
        timestamp: new Date(),
      };
      setMessages([...messages, userMessage]);

      try {
        const url =
          "http://127.0.0.1:8000/search?query=" + encodeURIComponent(input);
        const res = await fetch(url);
        const reader = res.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let htmlContent = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          htmlContent += decoder.decode(value);
          // You can update the UI with the new chunk here if needed
          const botMessage = {
            id: messages.length + 1,
            text: htmlContent,
            sender: "bot",
            timestamp: new Date(),
          };
          setMessages([...messages, botMessage]);
        }
        let fullResponse = "";
      } catch (error) {
        console.error("Error logging message:", error);
      }

      if (!currentConversationId) {
        const newHistory = {
          id: searchHistory.length + 1,
          title: input.substring(0, 40) + (input.length > 40 ? "..." : ""),
          category: activeCategory,
          date: "Just now",
        };
        setSearchHistory([newHistory, ...searchHistory]);
        setCurrentConversationId(newHistory.id);
      }
      setInput("");
      // setTimeout(() => {
      //   const botMessage = {
      //     id: messages.length + 2,
      //     text: getBotResponse(input, activeCategory),
      //     sender: "bot",
      //     timestamp: new Date(),
      //   };
      //   setMessages((prev) => [...prev, botMessage]);
      // }, 1000);
    }
  };

  const getBotResponse = (query, category) => {
    const responses = {
      academics:
        "I can help you with course information, registration, academic calendar, grades, and more. What specific academic topic would you like to know about?",
      admissions:
        "I'm here to assist with admissions requirements, application deadlines, scholarships, and financial aid. What would you like to know?",
      events:
        "Let me help you find information about campus events, workshops, seminars, and activities. What kind of event are you interested in?",
      facilities:
        "I can provide information about campus facilities including libraries, labs, sports centers, and student services. What facility would you like to know about?",
      resources:
        "I can guide you to various university resources including online portals, student services, career center, and counseling. What resource do you need?",
      general:
        "I'm here to help! You can ask me about academics, admissions, events, facilities, or any other university-related questions.",
    };
    return responses[category] || responses.general;
  };

  const loadConversation = (historyItem) => {
    setCurrentConversationId(historyItem.id);
    setActiveCategory(historyItem.category);
    setMessages([
      {
        id: 1,
        text: "Hello! I'm your University AI Assistant. How can I help you today?",
        sender: "bot",
        timestamp: new Date(),
      },
      { id: 2, text: historyItem.title, sender: "user", timestamp: new Date() },
    ]);
    setSidebarOpen(false);
  };

  const startNewChat = () => {
    setMessages([
      {
        id: 1,
        text: "Hello! I'm your University AI Assistant. How can I help you today?",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
    setCurrentConversationId(null);
    setActiveCategory("general");
    setSidebarOpen(false);
  };

  const deleteHistory = (id, e) => {
    e.stopPropagation();
    setSearchHistory(searchHistory.filter((item) => item.id !== id));
    if (currentConversationId === id) startNewChat();
  };

  return (
    <div className="flex h-screen font-sans bg-gray-50">
      {/* Left Sidebar with Toggle */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-30 bg-white border-r border-gray-200 shadow transition-transform
          duration-300 flex flex-col
          w-[85vw] max-w-xs sm:max-w-none sm:w-60 md:w-72
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          sm:translate-x-0
        `}
      >
        {/* New Chat Button */}
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={startNewChat}
            className="w-full flex items-center justify-center gap-2 bg-gray-50 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-100 transition-all shadow-sm font-medium border border-gray-200"
          >
            <Plus size={20} /> New Chat
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent text-sm text-gray-700"
              style={{ background: "#f9fafb" }}
            />
          </div>
        </div>

        {/* Conversation History */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-100">
          <div className="p-3">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
              Recent Conversations
            </h3>
            <div className="space-y-1">
              {searchHistory.map((item) => (
                <div
                  key={item.id}
                  onClick={() => loadConversation(item)}
                  className={`group flex items-start justify-between p-3 rounded-lg cursor-pointer transition-all ${
                    currentConversationId === item.id
                      ? "bg-gray-100 border border-gray-300"
                      : "hover:bg-gray-50 border border-transparent"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {item.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500 capitalize">
                        {item.category}
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">{item.date}</span>
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

        {/* Settings Button */}
        <div className="p-4 border-t border-gray-200">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-all text-gray-700 border border-gray-200">
            <Settings size={20} />
            <span className="text-sm font-medium">Settings</span>
          </button>
        </div>
      </aside>

      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-30 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen relative sm:ml-60 md:ml-72 transition-all">
        {/* Header with Toggle Button */}
        <header className="bg-white border-b border-gray-200 shadow-sm px-3 sm:px-6 py-2 flex items-center justify-between relative z-10">
          {/* Hamburger Menu Button for Mobile */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="inline-flex sm:hidden p-2 rounded hover:bg-gray-100 transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu size={24} className="text-gray-600" />
          </button>

          {/* App Title */}
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-800">
                University AI Assistant
              </h1>
              <p className="text-xs sm:text-sm text-gray-500">
                Powered by Advanced AI
              </p>
            </div>
          </div>

          {/* User Avatar */}
          <div>
            <div className="h-9 w-9 sm:h-10 sm:w-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold shadow-sm">
              UA
            </div>
          </div>
        </header>

        {/* Category Tabs */}
        <div className="overflow-x-auto px-3 sm:px-6 pt-2 pb-3 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-100">
          <div className="flex gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-all ${
                    activeCategory === cat.id
                      ? "bg-gray-200 text-gray-900 shadow"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-sm">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto px-2 py-4 space-y-4 sm:px-6 sm:py-6 bg-gray-50 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-100">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`
                flex gap-2 max-w-full sm:max-w-2xl md:max-w-3xl
                ${msg.sender === "user" ? "flex-row-reverse" : ""}
              `}
              >
                <div
                  className={`flex-shrink-0 h-9 w-9 sm:h-10 sm:w-10 rounded-full flex items-center justify-center border border-gray-200 shadow bg-white text-gray-600 font-semibold`}
                >
                  {msg.sender === "user" ? "You" : "AI"}
                </div>
                <div
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`px-4 py-3 sm:px-5 rounded-2xl shadow-sm text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-gray-200 text-gray-900 border border-gray-300"
                        : "bg-white text-gray-800 border border-gray-200"
                    }`}
                  >
                    <p
                    style={{ fontSize: "0.94rem" }}
                    dangerouslySetInnerHTML={{ __html: msg.text }}
                  />
                  </div>
                  <span className="text-xs text-gray-400 mt-1 px-2">
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 bg-white p-3 sm:p-4 sticky bottom-0 z-10">
          <div className="max-w-4xl mx-auto flex gap-2 items-end">
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  !e.shiftKey &&
                  (e.preventDefault(), handleSend())
                }
                placeholder={`Ask about ${categories
                  .find((c) => c.id === activeCategory)
                  ?.name.toLowerCase()}...`}
                className="w-full px-4 py-3 pr-10 bg-gray-100 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm resize-none text-gray-900"
                rows={1}
                style={{ maxHeight: "120px", background: "#f3f4f6" }}
              />
              <button className="absolute right-3 bottom-4 p-1 text-gray-400 hover:text-gray-600 transition-colors">
                <MoreHorizontal size={20} />
              </button>
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="bg-gray-200 text-gray-900 p-3 sm:p-4 rounded-2xl hover:bg-gray-300 disabled:opacity-60 shadow border border-gray-300"
            >
              <Send size={20} />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            AI Assistant can make mistakes. Please verify important information.
          </p>
        </div>
      </div>
    </div>
  );
}
