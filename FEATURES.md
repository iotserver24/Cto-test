# AI Website Builder - Feature Documentation

## Overview

The AI Website Builder is a complete, production-ready application that allows users to generate fully functional websites through natural language conversations with AI. No login required, completely free to use.

## Core Features

### 1. AI-Powered Code Generation

**Location**: `/lib/ai-service.ts`, `/app/api/chat/route.ts`

- Configurable AI model (OpenAI, Anthropic, or any OpenAI-compatible API)
- System prompt engineering for optimal code generation
- Structured JSON response parsing
- Error handling and retry logic
- Server-side only (credentials never exposed to client)

**Key Functions**:
- `callAI()` - Makes API calls to configured AI service
- `createSystemPrompt()` - Generates optimized system prompts for code generation

### 2. WebContainer Integration

**Location**: `/lib/webcontainer-service.ts`

- In-browser Node.js runtime using WebContainer API
- Real-time file system operations
- Dependency installation within the browser
- Development server startup
- Build log streaming

**Key Functions**:
- `getWebContainer()` - Initializes and returns WebContainer instance
- `convertFilesToFileTree()` - Converts flat file structure to WebContainer tree
- `mountFiles()` - Mounts generated files to container
- `installDependencies()` - Runs npm install
- `startDevServer()` - Starts Next.js dev server

### 3. Interactive Chat Interface

**Location**: `/app/builder/page.tsx`

- Real-time chat with AI
- Message history
- Loading states and animations
- Responsive design
- Error handling
- Auto-scroll to latest message

**Features**:
- User message input
- AI response display
- File generation indicators
- Build status updates
- Clean, modern UI

### 4. Live Preview System

**Location**: `/app/builder/page.tsx` (iframe component)

- Real-time website preview
- Isolated iframe environment
- Automatic URL updates
- External tab opening
- Responsive preview window

**Capabilities**:
- Shows running website immediately
- Interactive preview (fully functional)
- Updates automatically on rebuild
- Safe sandboxing

### 5. Build Log Console

**Location**: `/app/builder/page.tsx` (build log section)

- Real-time build output
- Color-coded logs
- Timestamps
- Auto-scroll
- Terminal-style UI

**Shows**:
- WebContainer initialization
- File mounting status
- npm install progress
- Dev server startup
- Error messages

### 6. Environment Configuration

**Location**: `/lib/config.ts`, `.env.example`

- Zod-based validation
- Type-safe environment access
- Server-side only enforcement
- Clear error messages
- Optional variables support

**Protected Variables**:
- AI_MODEL_NAME (required)
- AI_API_URL (required)
- AI_API_KEY (required)
- WEBCONTAINER_CLIENT_TOKEN (optional)

### 7. Landing Page

**Location**: `/app/page.tsx`

- Modern, attractive design
- Feature highlights
- How-it-works section
- Call-to-action
- Navigation to builder

**Sections**:
- Hero with gradient text
- Feature cards (3 columns)
- Step-by-step guide (4 steps)
- Links to builder and demo

### 8. Legacy Chat Demo

**Location**: `/app/chat-demo/page.tsx`

- WhatsApp-style interface
- Multiple conversations
- Message history
- Timestamps
- Unread badges
- Read receipts

**Components Used**:
- ChatList
- ChatWindow
- Type definitions from `/types`

### 9. Health Check API

**Location**: `/app/api/health/route.ts`

- Configuration validation
- Endpoint for monitoring
- Returns config status
- Error handling

**Response**:
```json
{
  "status": "ok",
  "config": {
    "modelName": "gpt-4",
    "apiUrl": "https://api.openai.com/v1"
  }
}
```

### 10. API Rate Limiting Ready

The architecture is prepared for rate limiting:
- Centralized API routes
- Error handling structure
- Request/response logging hooks

## Technical Architecture

### Frontend (Client-Side)
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State**: React Hooks (useState, useEffect, useRef)
- **WebContainer**: @webcontainer/api

### Backend (Server-Side)
- **API Routes**: Next.js API routes with Node.js runtime
- **Validation**: Zod schemas
- **AI Integration**: Fetch API with OpenAI-compatible endpoints
- **Environment**: Validated config module

### Security Features

1. **Environment Variable Protection**
   - Server-side only access
   - Runtime validation
   - Type safety
   - Never exposed to client

2. **CORS Headers**
   - Required for WebContainer
   - SharedArrayBuffer support
   - Cross-origin isolation

3. **API Security**
   - Credentials in environment only
   - No client-side API keys
   - Validated requests

### Performance Optimizations

1. **WebContainer Singleton**
   - Single instance reused
   - Cached across requests
   - Faster subsequent builds

2. **Static Generation**
   - Landing page pre-rendered
   - Optimal loading times
   - SEO friendly

3. **Code Splitting**
   - Automatic by Next.js
   - Lazy loading
   - Optimized bundles

### User Experience Features

1. **No Login Required**
   - Immediate access
   - Zero friction
   - Privacy-focused

2. **Real-time Feedback**
   - Build logs
   - Progress indicators
   - Error messages
   - Success confirmations

3. **Iterative Development**
   - Conversational interface
   - Context preservation
   - Incremental changes
   - Refinement support

4. **Responsive Design**
   - Mobile-friendly
   - Tablet support
   - Desktop optimized
   - Flexible layouts

## Integration Points

### AI Service Integration
- Any OpenAI-compatible API
- Configurable model
- Custom endpoints supported
- Error resilience

### WebContainer Integration
- StackBlitz technology
- Browser-based Node.js
- No server backend needed
- Client-side builds

## File Structure Summary

```
├── app/
│   ├── api/
│   │   ├── chat/route.ts         # AI chat endpoint
│   │   └── health/route.ts       # Health check
│   ├── builder/page.tsx          # Main builder UI
│   ├── chat-demo/page.tsx        # Demo chat app
│   ├── page.tsx                  # Landing page
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── lib/
│   ├── config.ts                 # Environment config
│   ├── ai-service.ts             # AI integration
│   └── webcontainer-service.ts   # WebContainer management
├── components/                    # React components
├── types/                        # TypeScript types
├── .env.example                  # Environment template
├── DEPLOYMENT.md                 # Deployment guide
├── USAGE.md                      # Usage guide
└── FEATURES.md                   # This file
```

## Development Workflow

1. User describes website
2. Chat sent to `/api/chat`
3. AI generates code (JSON response)
4. Response parsed on client
5. Files mounted to WebContainer
6. npm install runs
7. Dev server starts
8. Preview URL generated
9. Website shown in iframe
10. User iterates with more prompts

## Testing Strategy

### Manual Testing
- Chat functionality
- Code generation
- Build process
- Preview rendering
- Error handling

### Automated Testing (Recommended)
- Unit tests for utilities
- Integration tests for API routes
- E2E tests for user flows
- Performance benchmarks

## Monitoring & Observability

### Key Metrics
- AI API response time
- WebContainer boot time
- Build success rate
- Error frequency
- User session duration

### Logging Points
- API calls
- Build starts/completions
- Errors and failures
- User interactions

## Extensibility

The architecture supports:
- Multiple AI providers
- Custom templates
- Additional file types
- Enhanced previews
- Collaboration features
- Project persistence
- Export functionality
- GitHub integration

## Known Limitations

1. **Session-based**: Projects don't persist across sessions
2. **Browser-only**: Requires modern browser with SharedArrayBuffer
3. **No backend**: Generated sites are frontend only
4. **API costs**: Each generation uses AI API credits
5. **Build time**: Complex projects take time to build

## Future Roadmap

- [ ] Project save/load functionality
- [ ] Template library
- [ ] Multi-page site generation
- [ ] GitHub deployment integration
- [ ] Collaborative editing
- [ ] Dark mode
- [ ] Code export
- [ ] Version history
- [ ] AI model switching
- [ ] Custom component library

## Credits

Built with:
- Next.js by Vercel
- WebContainer by StackBlitz
- Tailwind CSS
- OpenAI (or compatible) API
- TypeScript
- Zod

## License

MIT License - Feel free to use, modify, and distribute.
