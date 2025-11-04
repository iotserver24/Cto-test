# Deployment Guide

## Prerequisites

Before deploying, ensure you have:
1. AI API credentials (OpenAI, Anthropic, or compatible API)
2. A hosting platform account (Vercel, Netlify, etc.)

## Environment Variables

You must set these environment variables in your deployment platform:

### Required
- `AI_MODEL_NAME` - The AI model to use (e.g., `gpt-4`, `gpt-3.5-turbo`)
- `AI_API_URL` - Your AI API endpoint (e.g., `https://api.openai.com/v1`)
- `AI_API_KEY` - Your AI API key

### Optional
- `WEBCONTAINER_CLIENT_TOKEN` - WebContainer token for enhanced features

## Vercel Deployment

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/ai-website-builder)

### Manual Deployment

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Set environment variables:
```bash
vercel env add AI_MODEL_NAME
vercel env add AI_API_URL
vercel env add AI_API_KEY
```

5. Redeploy with environment variables:
```bash
vercel --prod
```

## Netlify Deployment

1. Connect your repository to Netlify

2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`

3. Add environment variables in Netlify dashboard:
   - Go to Site settings → Environment variables
   - Add all required variables

4. Deploy!

## Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t ai-website-builder .
docker run -p 3000:3000 \
  -e AI_MODEL_NAME=gpt-4 \
  -e AI_API_URL=https://api.openai.com/v1 \
  -e AI_API_KEY=your-key-here \
  ai-website-builder
```

## Self-Hosted (VPS/Cloud)

1. Clone repository:
```bash
git clone https://github.com/yourusername/ai-website-builder.git
cd ai-website-builder
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local`:
```bash
cp .env.example .env.local
# Edit .env.local with your credentials
```

4. Build:
```bash
npm run build
```

5. Start:
```bash
npm start
```

6. Setup process manager (PM2):
```bash
npm install -g pm2
pm2 start npm --name "ai-builder" -- start
pm2 save
pm2 startup
```

## Environment-Specific Configuration

### Development
```env
AI_MODEL_NAME=gpt-3.5-turbo
AI_API_URL=https://api.openai.com/v1
AI_API_KEY=sk-dev-key
```

### Production
```env
AI_MODEL_NAME=gpt-4
AI_API_URL=https://api.openai.com/v1
AI_API_KEY=sk-prod-key
```

## Post-Deployment Checklist

- [ ] Verify health endpoint: `https://your-domain.com/api/health`
- [ ] Test AI generation with a simple prompt
- [ ] Check WebContainer functionality
- [ ] Verify environment variables are loaded
- [ ] Test on different browsers
- [ ] Check CORS headers are set correctly
- [ ] Monitor API usage and costs
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Configure analytics if needed

## Troubleshooting

### "Config validation failed" error
- Verify all environment variables are set
- Check for typos in variable names
- Ensure AI_API_URL is a valid URL

### WebContainer not loading
- Ensure CORS headers are properly set in `next.config.ts`
- Check browser console for errors
- Verify the domain supports SharedArrayBuffer

### AI API errors
- Check API key validity
- Verify API endpoint URL
- Check rate limits
- Monitor API credits/usage

## Monitoring

### Recommended Tools
- **Vercel Analytics** - Built-in for Vercel deployments
- **Sentry** - Error tracking
- **LogRocket** - Session replay
- **Datadog** - Infrastructure monitoring

### Key Metrics to Monitor
- AI API response times
- WebContainer boot times
- Error rates
- User session duration
- API cost per session

## Security Considerations

1. **Never expose AI_API_KEY to the client**
   - All AI calls go through `/api/chat` endpoint
   - Keys are server-side only

2. **Rate Limiting**
   - Consider adding rate limiting to `/api/chat`
   - Prevent abuse of AI API

3. **Input Validation**
   - Validate user prompts
   - Sanitize generated code if storing

4. **CORS**
   - Configure properly for WebContainer
   - Don't allow all origins in production

## Cost Optimization

1. **Use cheaper models for development**
   - `gpt-3.5-turbo` for testing
   - `gpt-4` for production

2. **Implement caching**
   - Cache common requests
   - Store generated templates

3. **Set token limits**
   - Limit max_tokens in AI requests
   - Prevent unexpectedly large costs

4. **Monitor usage**
   - Track API calls per user
   - Set budget alerts

## Scaling

### Horizontal Scaling
- Deploy multiple instances behind load balancer
- Use Redis for session storage if needed

### Vertical Scaling
- Increase memory for WebContainer operations
- Use faster CPUs for build processes

### CDN
- Serve static assets through CDN
- Cache generated previews when possible

## Support

For issues or questions:
- Check [USAGE.md](./USAGE.md) for usage guidelines
- Review [README.md](./README.md) for project overview
- Open an issue on GitHub
