# Agent Creator Platform

A modern web application for developers to create, deploy, and manage AI agents. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🚀 **Easy Agent Creation**: Step-by-step wizard to create AI agents
- 🤖 **Multiple Agent Types**: Support for chatbots, assistants, automation, and analytics agents
- 📊 **Real-time Analytics**: Monitor agent performance and usage metrics
- 🔧 **Flexible Configuration**: Customize models, temperature, tokens, and system prompts
- 🎨 **Modern UI**: Beautiful, responsive interface built with Tailwind CSS
- 📱 **Mobile Friendly**: Optimized for all device sizes
- 🔒 **Secure**: Enterprise-grade security with encrypted API keys

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **Validation**: Zod
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd agent-creator-platform
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── components/          # React components
│   │   ├── AgentCreator.tsx # Agent creation wizard
│   │   ├── AgentList.tsx    # Agent management
│   │   └── AgentDashboard.tsx # Analytics dashboard
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Main page
│   └── types.ts             # TypeScript types
├── public/                  # Static assets
├── package.json             # Dependencies
├── tailwind.config.js       # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

## Agent Types

### Chatbot
- Conversational AI for customer support and engagement
- Handles user queries and provides automated responses

### Assistant
- General-purpose AI assistant for various tasks
- Can be customized for specific use cases

### Automation
- Automated workflows and task execution
- Integrates with external APIs and services

### Analytics
- Data analysis and insights generation
- Processes and visualizes data

## Configuration Options

### Model Selection
- GPT-4
- GPT-3.5 Turbo
- Claude-3

### Parameters
- **Temperature**: Controls creativity (0-2)
- **Max Tokens**: Response length limit
- **System Prompt**: Defines agent personality and behavior

### Memory Configuration
- Conversation history
- Vector storage
- Redis integration
- No memory option

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Environment Variables

Create a `.env.local` file:

```env
# Add your environment variables here
NEXT_PUBLIC_API_URL=your_api_url
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Join our community

---

Built with ❤️ for the AI community