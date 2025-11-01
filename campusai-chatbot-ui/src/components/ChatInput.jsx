import React from "react";

const ChatInput = ({onSend}) => {
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState([]);

  const handleSend = async (e) => {
    e.preventDefault();
    
        onSend(input);
        setInput('');
      
};

  return (
    <form
      onSubmit={handleSend}
      className="flex items-center gap-2 p-3 bg-white rounded-xl shadow-md border"
    >
      <textarea
        className="flex-1 resize-none border-none outline-none p-2 rounded-md text-sm"
        rows="1"
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
      >
        Send
      </button>
    </form>
  );
};

export default ChatInput;
