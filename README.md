# WhatsApp-Like Chat Application

A modern, responsive chat application built with Next.js that mimics the WhatsApp interface and functionality.

## Features

- 💬 Real-time message display
- 📱 Responsive design (mobile and desktop)
- 👥 Multiple chat conversations
- ✅ Read receipts (double check marks)
- 🔔 Unread message badges
- ⏰ Timestamp formatting
- 🎨 WhatsApp-inspired UI design
- 🌐 Built with Next.js 15 and TypeScript

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
.
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main chat page with state management
│   └── globals.css         # Global styles
├── components/
│   ├── ChatList.tsx        # Left sidebar with chat list
│   └── ChatWindow.tsx      # Main chat window with messages
├── types/
│   └── index.ts            # TypeScript type definitions
└── utils/
    └── dateUtils.ts        # Date formatting utilities
```

## Features Explained

### Chat List
- Search functionality UI
- Multiple chat conversations
- Unread message count badges
- Last message preview
- Relative timestamps (e.g., "5m", "2h", "1d")

### Chat Window
- Message bubbles (sent/received)
- Auto-scroll to latest message
- WhatsApp-style background pattern
- Emoji and attachment buttons
- Read receipts on sent messages
- Responsive layout

### State Management
- Local state management with React hooks
- Message history per conversation
- Unread count tracking
- Real-time UI updates

## Technologies Used

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Hooks** - State management

## Customization

You can customize the initial chats and messages by modifying the `initialChats` and `initialMessages` objects in `app/page.tsx`.

## Future Enhancements

- Backend integration for real messaging
- User authentication
- Image and file sharing
- Voice messages
- Group chats
- Status updates
- Dark mode toggle
- Real-time notifications

## License

MIT
