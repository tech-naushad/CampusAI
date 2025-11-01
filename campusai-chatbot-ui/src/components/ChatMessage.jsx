import React from 'react';
import { FaUser, FaRobot } from 'react-icons/fa';

const ChatMessage = ({ message }) => {
  const isUser = message.role === 'user';



  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`flex items-start gap-2 max-w-[100%] ${
          isUser ? 'flex-row-reverse' : 'flex-row'
        }`}
      >
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isUser ? 'bg-blue-500' : 'bg-green-500'
          } text-white`}
        >
          {isUser ? <FaUser /> : <FaRobot />}
        </div>
        <div
          className={`p-3 rounded-2xl ${
            isUser ? 'bg-blue-500 text-white' : 'bg-white text-gray-900'
          } shadow`}
        >
          <div dangerouslySetInnerHTML={{ __html: message.content }} />          
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
