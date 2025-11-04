# AI Website Builder

An AI-powered website builder that generates complete, functional Next.js applications based on natural language descriptions. No login required, completely free to use.

## Features

- 🤖 **AI-Powered Generation**: Uses advanced AI models to understand requirements and generate complete websites
- ⚡ **Real-time Preview**: See your website running live in the browser using WebContainer technology
- 🎨 **Iterative Development**: Chat with the AI to refine and customize your website
- 📦 **Complete Code Generation**: Generates full Next.js projects with all necessary files
- 🔒 **Secure**: All AI credentials are server-side only
- 🆓 **No Login Required**: Start building immediately
- 🌐 **Built with Next.js 15 and TypeScript**

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
│   ├── api/
│   │   ├── chat/           # AI chat endpoint
│   │   └── health/         # Health check endpoint
│   ├── builder/
│   │   └── page.tsx        # Main AI builder interface
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Landing page
│   └── globals.css         # Global styles
├── lib/
│   ├── config.ts           # Environment configuration with validation
│   ├── ai-service.ts       # AI API integration
│   └── webcontainer-service.ts  # WebContainer management
├── components/             # React components (legacy chat components)
├── types/                  # TypeScript type definitions
└── .env.example           # Example environment variables
```

## How It Works

### 1. User Input
Users describe their desired website in natural language through a chat interface. No technical knowledge required.

### 2. AI Generation
The configured AI model analyzes the request and generates:
- Complete file structure
- React/Next.js components
- Styling with Tailwind CSS
- Configuration files
- Package dependencies

### 3. Automated Build
The system automatically:
- Mounts generated files to WebContainer
- Installs npm dependencies
- Starts the development server
- Shows build logs in real-time

### 4. Live Preview
The generated website runs instantly in the browser, allowing users to:
- See their website live
- Interact with it
- Request changes through additional chat messages
- Iterate until satisfied

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Zod** - Environment validation and type safety
- **WebContainer API** - In-browser Node.js runtime for live previews
- **AI Integration** - Configurable AI model (OpenAI, Anthropic, etc.)

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

## Usage Examples

### Example Prompts

1. **Landing Pages**
   - "Create a modern landing page for a SaaS product"
   - "Build a portfolio website with a hero section and project gallery"
   - "Make a restaurant website with menu and contact form"

2. **Web Applications**
   - "Build a todo app with local storage"
   - "Create a weather dashboard that fetches data from an API"
   - "Make a blog with multiple pages"

3. **Interactive Components**
   - "Create an image gallery with lightbox"
   - "Build a pricing calculator"
   - "Make an interactive form with validation"

### Iterative Refinement

After the initial generation, you can refine your website:
- "Make the header sticky"
- "Change the color scheme to blue and purple"
- "Add animation to the hero section"
- "Make it mobile responsive"

## Architecture

### AI Service Layer
The `lib/ai-service.ts` module handles all communication with the configured AI API:
- Formats prompts for code generation
- Parses AI responses
- Handles errors gracefully

### WebContainer Integration
The `lib/webcontainer-service.ts` module manages the in-browser development environment:
- Boots WebContainer instance
- Mounts generated files
- Installs dependencies
- Runs dev server
- Streams build logs

### API Routes
- `/api/chat` - Handles AI conversation and code generation
- `/api/health` - Health check endpoint with config validation

## Limitations

- WebContainer runs in the browser, so some Node.js features may be limited
- Large projects may take longer to install dependencies
- Preview is limited to the browser environment
- No persistent storage (projects are session-based)

## Future Enhancements

- Project export/download functionality
- GitHub integration for direct deployment
- Template library for quick starts
- Multi-page application support
- Database integration examples
- Authentication templates
- Dark mode for the builder interface
- Collaborative editing

## Documentation

- 📚 **[Quick Start Guide](./QUICKSTART.md)** - Get running in 5 minutes
- 📖 **[Usage Guide](./USAGE.md)** - Detailed usage instructions and examples
- 🚀 **[Deployment Guide](./DEPLOYMENT.md)** - Deploy to production
- ✨ **[Features Documentation](./FEATURES.md)** - Complete feature list
- 📋 **[Build Summary](./BUILD_SUMMARY.md)** - Technical implementation details

## Support & Community

- 💬 Questions? Check the documentation above
- 🐛 Found a bug? Open an issue
- 💡 Feature request? We'd love to hear it
- ⭐ Like the project? Give it a star!

## License

MIT
