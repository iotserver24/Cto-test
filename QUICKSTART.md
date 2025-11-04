# 🚀 Quick Start Guide

Get your AI Website Builder running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- AI API key (OpenAI, Anthropic, or compatible)

## Step 1: Clone & Install

```bash
# Navigate to project directory
cd ai-website-builder

# Install dependencies
npm install
```

## Step 2: Configure Environment

```bash
# Copy example environment file
cp .env.example .env.local
```

Edit `.env.local` with your credentials:

```env
AI_MODEL_NAME=gpt-4
AI_API_URL=https://api.openai.com/v1
AI_API_KEY=sk-your-actual-api-key-here
```

### Getting an API Key

#### OpenAI
1. Go to https://platform.openai.com
2. Sign up or log in
3. Navigate to API Keys
4. Create new secret key
5. Copy and use in `.env.local`

#### Other Providers
- **Anthropic**: https://console.anthropic.com
- **OpenRouter**: https://openrouter.ai
- **Local Models**: Use LM Studio or Ollama with OpenAI-compatible endpoint

## Step 3: Start Development Server

```bash
npm run dev
```

The application will start at: **http://localhost:3000**

## Step 4: Start Building!

1. Open http://localhost:3000 in your browser
2. Click "Start Building"
3. Describe your website: 
   ```
   "Create a landing page for a coffee shop with a hero section, 
    menu, and contact form"
   ```
4. Watch the AI generate and build your site!
5. See the live preview
6. Iterate and refine

## Common First Prompts

### Landing Page
```
Create a modern landing page for a SaaS product with:
- Hero section with headline and CTA
- Features section (3 features)
- Pricing table
- Footer
Use blue and purple gradients
```

### Portfolio
```
Build a portfolio website with:
- Hero section with my name and title
- About section
- Project gallery (6 projects)
- Contact form
Use a dark theme
```

### Web App
```
Create a todo list application with:
- Input to add todos
- List with checkboxes
- Delete buttons
- Filter buttons (All, Active, Completed)
Store data in localStorage
```

## Troubleshooting

### "Config validation failed"
❌ Problem: Environment variables not set
✅ Solution: Check `.env.local` exists and has correct values

### "WebContainer not loading"
❌ Problem: Browser not supported
✅ Solution: Use Chrome, Edge, or modern Firefox

### "AI API error"
❌ Problem: Invalid API key or insufficient credits
✅ Solution: Verify API key and check account balance

### "npm install failed"
❌ Problem: Network issues or dependency conflicts
✅ Solution: Check build logs, try simpler project first

## Tips for Success

1. **Start Simple**: Begin with basic layouts
2. **Be Specific**: Describe exactly what you want
3. **Iterate**: Make changes incrementally
4. **Check Logs**: Build console shows what's happening
5. **Use Examples**: Copy prompts from USAGE.md

## Next Steps

Once running:
- ✅ Read [USAGE.md](./USAGE.md) for advanced prompts
- ✅ Check [FEATURES.md](./FEATURES.md) for capabilities
- ✅ Review [DEPLOYMENT.md](./DEPLOYMENT.md) for going live
- ✅ Explore the chat demo at `/chat-demo`

## Need Help?

1. Check documentation files
2. Review example prompts
3. Test with health endpoint: http://localhost:3000/api/health
4. Verify environment variables are loaded

## Production Deployment

Ready to deploy? See [DEPLOYMENT.md](./DEPLOYMENT.md) for:
- Vercel deployment (1-click)
- Netlify setup
- Docker configuration
- VPS deployment

## API Costs

Be aware of AI API costs:
- GPT-4: ~$0.03 per generation
- GPT-3.5: ~$0.002 per generation
- Consider using cheaper models for testing

## Architecture Overview

```
User → Chat Input → /api/chat → AI API → Generated Code
                                              ↓
                                        WebContainer
                                              ↓
                                        npm install
                                              ↓
                                         Dev Server
                                              ↓
                                        Live Preview
```

## What You Get

✅ Complete Next.js applications
✅ React components
✅ Tailwind CSS styling
✅ TypeScript support
✅ Responsive designs
✅ Interactive features

## Limitations

❌ No backend/database (frontend only)
❌ No real API integrations (mock data)
❌ Session-based (no persistence)
❌ Browser-only (requires modern features)

## Success Checklist

Before starting:
- [ ] Node.js installed
- [ ] Dependencies installed (`npm install`)
- [ ] `.env.local` created
- [ ] AI API key configured
- [ ] Dev server running
- [ ] Browser at http://localhost:3000

Ready to build? Click "Start Building" and describe your dream website! 🚀

---

**Happy Building! 🎉**

*For detailed documentation, see README.md*
*For usage examples, see USAGE.md*
*For deployment, see DEPLOYMENT.md*
