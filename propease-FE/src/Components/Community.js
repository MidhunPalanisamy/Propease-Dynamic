import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import MainNavBar from './MainNavBar';

const Community = ({ username }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const stompClient = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws');
    stompClient.current = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        stompClient.current.subscribe('/topic/messages', (message) => {
          const received = JSON.parse(message.body);
          setMessages((prev) => [...prev, received]);
        });
      },
    });

    stompClient.current.activate();

    return () => {
      if (stompClient.current) {
        stompClient.current.deactivate();
      }
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() === '') return;
    const message = { username, content: input };
    stompClient.current.publish({
      destination: '/app/chat',
      body: JSON.stringify(message),
    });
    setInput('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
        <MainNavBar />
      <h2>Community Chat</h2>
      <div style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'auto' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ margin: '10px 0' }}>
            <strong>{msg.username}:</strong> {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div style={{ marginTop: '10px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message"
          style={{ width: '80%', padding: '8px' }}
        />
        <button onClick={sendMessage} style={{ padding: '8px 12px' }}>Send</button>
      </div>
    </div>
  );
};

export default Community;
