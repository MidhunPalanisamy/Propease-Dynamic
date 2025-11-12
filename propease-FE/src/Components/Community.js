import React, { useState } from 'react';
import './CSS/Community.css';
import send from '../Assets/send.png';

const Community = ({ username = "User" }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello everyone!", username: "John", isCurrentUser: false },
    { id: 2, text: "Hi there!", username: "User", isCurrentUser: true },
    { id: 3, text: "How are you all?", username: "Sarah", isCurrentUser: false },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        text: newMessage,
        username: username,
        isCurrentUser: true
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div>
      <h1 className="community-title">Community Page</h1>
      
      <div className="messages-container">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.isCurrentUser ? 'user-message' : 'other-message'}`}
          >
            <span className="message-username">{message.username}</span>
            <div className="message-content">{message.text}</div>
          </div>
        ))}
      </div>

      <input 
        className="community-input" 
        type="text" 
        placeholder="Type your message here..." 
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button className="community-button" onClick={handleSendMessage}>
        <img style={{ width: '50px', height: '50px' }} src={send} alt="Send" />
      </button>
    </div>
  );
};

export default Community;
