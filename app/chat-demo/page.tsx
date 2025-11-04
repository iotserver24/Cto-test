'use client';

import { useState } from 'react';
import ChatList from '@/components/ChatList';
import ChatWindow from '@/components/ChatWindow';
import { Chat, Message } from '@/types';
import Link from 'next/link';

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
];

const initialMessages: { [chatId: string]: Message[] } = {
  '1': [
    {
      id: '1',
      text: 'Hey! How are you doing?',
      timestamp: new Date(Date.now() - 1000 * 60 * 10),
      sender: 'them',
    },
  ],
};

export default function ChatDemoPage() {
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
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">WhatsApp-Style Chat Demo</h1>
        <Link href="/" className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-blue-50">
          ← Back Home
        </Link>
      </div>
      <div className="flex flex-1 overflow-hidden">
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
    </div>
  );
}
