# AI Writing Assistant - Office Add-in

A Microsoft Office add-in that provides AI-powered writing assistance including translation, rewriting, and grammar checking using Claude API.

## Features

- Translation to English with professional tone
- Text rewriting for improved clarity and engagement
- Grammar and spelling correction
- Modern UI with responsive design

## Prerequisites

- Node.js 18+ and npm
- Microsoft Office (Word)
- Claude API key

## Setup

1. Clone the repository
```bash
git clone [your-repo-url]
cd [your-repo-name]
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your Claude API key:
```
CLAUDE_API_KEY=your_api_key_here
```

4. Start the development server
```bash
npm run dev
```

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Add your environment variables in Vercel's project settings:
   - `CLAUDE_API_KEY`: Your Claude API key

### Office Add-in Deployment

1. Update the manifest.xml with your production URL
2. Package and deploy the add-in following Microsoft's guidelines

## Development

- Built with Next.js and TypeScript
- Uses Claude API for AI capabilities
- Implements Microsoft Office Add-in framework

## License

MIT 