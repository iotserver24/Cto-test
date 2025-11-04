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

### 1. Install Dependencies

First, install the dependencies:

```bash
npm install
```

### 2. Configure Environment Variables

Copy the example environment file and configure it with your credentials:

```bash
cp .env.example .env.local
```

Then edit `.env.local` and provide the required values:

- **AI_MODEL_NAME** (required): The name/identifier of the AI model to use (e.g., `gpt-4`)
- **AI_API_URL** (required): The API endpoint URL for your AI service (e.g., `https://api.openai.com/v1`)
- **AI_API_KEY** (required): Your API key for authentication with the AI service
- **WEBCONTAINER_CLIENT_TOKEN** (optional): WebContainer client token for enhanced features

Example `.env.local`:
```env
AI_MODEL_NAME=gpt-4
AI_API_URL=https://api.openai.com/v1
AI_API_KEY=sk-your-actual-api-key-here
```

**Important Security Notes:**
- Never commit your `.env.local` file to version control
- All environment variables are server-side only and will not be exposed to the browser
- The application will fail fast with a clear error message if required environment variables are missing

### 3. Run the Development Server

Once configured, run the development server:

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
├── lib/
│   └── config.ts           # Environment configuration with validation
├── types/
│   └── index.ts            # TypeScript type definitions
├── utils/
│   └── dateUtils.ts        # Date formatting utilities
└── .env.example            # Example environment variables
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
- **Zod** - Environment validation and type safety

## Configuration

### Environment Variables

The application uses environment variables for AI service configuration. All values are validated at runtime using Zod schemas and are server-side only for security.

**Required Variables:**
- `AI_MODEL_NAME`: The AI model identifier
- `AI_API_URL`: The AI service API endpoint
- `AI_API_KEY`: API authentication key

**Optional Variables:**
- `WEBCONTAINER_CLIENT_TOKEN`: Optional token for WebContainer features

### Using the Config Module

The `lib/config.ts` module provides typed getters for environment variables:

```typescript
import { getAIModelName, getAIApiUrl, getAIApiKey } from '@/lib/config';

// In API routes or server components
const modelName = getAIModelName();
const apiUrl = getAIApiUrl();
const apiKey = getAIApiKey();
```

**Important:** The config module can only be used in server-side code (API routes, Server Components, Server Actions). Attempting to use it in client components will throw an error.

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
