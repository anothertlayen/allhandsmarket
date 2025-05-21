# AllHandsMarket

AllHandsMarket is a non-monetary marketplace platform where users can share resources, skills, and items with their community. The platform features an AI-powered chat assistant to help users find what they need and connect with others.

## Features

- **User Authentication**: Secure login and registration with email/password or OAuth providers
- **Marketplace Listings**: Create, browse, and search for items and services
- **Messaging System**: Direct messaging between users
- **AI Chat Assistant**: LLM-powered assistant to help users navigate the platform
- **User Profiles**: Detailed user profiles with ratings and reviews
- **Responsive Design**: Mobile-friendly interface built with Next.js and Tailwind CSS

## Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **AI Integration**: OpenAI API
- **Image Storage**: Cloudinary (or similar service)

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- MongoDB (local or Atlas)
- OpenAI API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/allhandsmarket.git
   cd allhandsmarket
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Fill in the required environment variables

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
allhandsmarket/
├── app/                  # Next.js app router
│   ├── api/              # API routes
│   ├── components/       # React components
│   ├── lib/              # Utility functions
│   └── models/           # MongoDB models
├── public/               # Static assets
├── styles/               # Global styles
└── types/                # TypeScript type definitions
```

## API Routes

- `/api/auth/*` - Authentication endpoints
- `/api/users/*` - User management
- `/api/listings/*` - Marketplace listings
- `/api/messages/*` - User messaging
- `/api/chat/*` - AI chat functionality
- `/api/reviews/*` - User reviews
- `/api/search/*` - Search functionality

## Deployment

### Manual Deployment to Vercel

1. Push your code to GitHub:
   ```bash
   git push origin main
   ```

2. Deploy using our deployment script:
   ```bash
   npm run deploy
   ```

   Or deploy directly with Vercel CLI:
   ```bash
   npm run deploy:prod
   ```

3. Set up environment variables in the Vercel dashboard:
   - `MONGODB_URI`: Your MongoDB connection string
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `NEXTAUTH_SECRET`: A random string for NextAuth.js
   - `NEXTAUTH_URL`: Your production URL

### Automated Deployment

We've set up GitHub Actions for continuous deployment. When you push to the main branch, your changes will automatically be deployed to Vercel.

For more detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenAI for providing the AI capabilities
- Next.js team for the amazing framework
- Vercel for hosting and deployment
- All contributors and community members
