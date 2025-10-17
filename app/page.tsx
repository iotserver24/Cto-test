'use client';

import { useState } from 'react';
import ChatList from '@/components/ChatList';
import ChatWindow from '@/components/ChatWindow';
import { Chat, Message } from '@/types';

const initialChats: Chat[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    avatar: '👩',
    lastMessage: 'Hey! How are you doing?',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    unread: 2,
  },
  {
    id: '2',
    name: 'Bob Smith',
    avatar: '👨',
    lastMessage: 'Did you see the game last night?',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    unread: 0,
  },
  {
    id: '3',
    name: 'Carol Williams',
    avatar: '👩‍🦰',
    lastMessage: 'Thanks for your help!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    unread: 1,
  },
  {
    id: '4',
    name: 'David Brown',
    avatar: '👨‍🦱',
    lastMessage: 'Let\'s meet tomorrow',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    unread: 0,
  },
  {
    id: '5',
    name: 'Emma Davis',
    avatar: '👩‍🦳',
    lastMessage: 'Perfect! See you then',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    unread: 0,
  },
];

const initialMessages: { [chatId: string]: Message[] } = {
  '1': [
    {
      id: '1',
      text: 'Hey! How are you doing?',
      timestamp: new Date(Date.now() - 1000 * 60 * 10),
      sender: 'them',
    },
    {
      id: '2',
      text: 'I\'m doing great! Thanks for asking',
      timestamp: new Date(Date.now() - 1000 * 60 * 8),
      sender: 'me',
    },
    {
      id: '3',
      text: 'That\'s wonderful to hear!',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      sender: 'them',
    },
  ],
  '2': [
    {
      id: '1',
      text: 'Did you see the game last night?',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      sender: 'them',
    },
  ],
  '3': [
    {
      id: '1',
      text: 'Could you help me with the project?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      sender: 'them',
    },
    {
      id: '2',
      text: 'Of course! What do you need?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      sender: 'me',
    },
    {
      id: '3',
      text: 'Thanks for your help!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      sender: 'them',
    },
  ],
  '4': [
    {
      id: '1',
      text: 'Let\'s meet tomorrow',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
      sender: 'them',
    },
  ],
  '5': [
    {
      id: '1',
      text: 'Perfect! See you then',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      sender: 'them',
    },
  ],
};

export default function Home() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [messages, setMessages] = useState<{ [chatId: string]: Message[] }>(initialMessages);

  const selectedChat = chats.find((chat) => chat.id === selectedChatId);

  const handleSendMessage = (text: string) => {
    if (!selectedChatId) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      timestamp: new Date(),
      sender: 'me',
    };

    setMessages((prev) => ({
      ...prev,
      [selectedChatId]: [...(prev[selectedChatId] || []), newMessage],
    }));

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === selectedChatId
          ? { ...chat, lastMessage: text, timestamp: new Date() }
          : chat
      )
    );
  };

  const handleSelectChat = (chatId: string) => {
    setSelectedChatId(chatId);
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId ? { ...chat, unread: 0 } : chat
      )
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <ChatList
        chats={chats}
        selectedChatId={selectedChatId}
        onSelectChat={handleSelectChat}
      />
      <ChatWindow
        chat={selectedChat}
        messages={selectedChatId ? messages[selectedChatId] || [] : []}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}
