# Fang Yuan AI Chat Application

## Overview

This is a full-stack web application that provides an AI-powered chat interface featuring Fang Yuan, a character from "Reverend Insanity." The application combines a React frontend with an Express.js backend, utilizing Google's Gemini AI for generating character-appropriate responses. The system features a mystical, dark theme with animated UI components and real-time chat functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a monorepo structure with clear separation between client and server code:

- **Frontend**: React with TypeScript, built using Vite
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM (active database connection)
- **AI Integration**: Google Gemini API for character-based responses
- **UI Framework**: Tailwind CSS with shadcn/ui components
- **Animation**: Framer Motion for smooth transitions and effects

## Key Components

### Frontend Architecture
- **React Single Page Application**: Uses Wouter for lightweight routing
- **Component Library**: shadcn/ui components with custom mystical theming
- **State Management**: React Query (@tanstack/react-query) for server state
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Animation**: Framer Motion for interactive elements like the mystical orb and typewriter effects

### Backend Architecture
- **Express.js Server**: RESTful API with middleware for logging and error handling
- **Storage Layer**: PostgreSQL database with Drizzle ORM for persistent data storage
- **AI Service**: Dedicated Gemini service for generating character-specific responses
- **Session Management**: Chat sessions tracked by unique session IDs with database persistence

### Database Schema
- **Users Table**: Basic user authentication structure (id, username, password)
- **Chat Messages Table**: Stores conversation history (id, sessionId, message, isUser, timestamp)
- **Drizzle Configuration**: Set up for PostgreSQL with migration support

## Data Flow

1. **Chat Initiation**: User enters initial message on home page
2. **Session Creation**: Frontend generates unique session ID
3. **Message Processing**: Backend receives message, saves to storage, retrieves conversation history
4. **AI Generation**: Gemini API generates Fang Yuan character response using conversation context
5. **Response Storage**: AI response saved to storage and returned to client
6. **UI Updates**: Frontend displays messages with typewriter animation effects

## External Dependencies

### Core Dependencies
- **@google/genai**: Google Gemini AI integration
- **@neondatabase/serverless**: Database connection (Neon PostgreSQL)
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **framer-motion**: Animation library
- **wouter**: Lightweight React router

### UI Dependencies
- **@radix-ui/react-***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library

## Deployment Strategy

### Development Setup
- **Vite Development Server**: Hot module replacement for frontend
- **tsx**: TypeScript execution for backend development
- **Concurrent Development**: Frontend and backend run simultaneously

### Production Build
- **Frontend**: Vite builds optimized static assets to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Environment Variables**: 
  - `DATABASE_URL`: PostgreSQL connection string
  - `GEMINI_API_KEY` or `GOOGLE_API_KEY`: AI service authentication

### Key Features
- **Character-Consistent AI**: Fang Yuan personality maintained through enhanced system prompts with ruthless pragmatism
- **Divine UI Theme**: Clean white/gold aesthetic with dark mode support and mystical animations
- **Advanced Session Management**: Session export, history clearing, and new session creation
- **Enhanced Chat Experience**: Message reactions, copy functionality, and hover effects
- **Responsive Design**: Works across desktop and mobile devices with theme switching
- **Real-time Chat**: Instant message exchange with enhanced loading animations
- **Session Persistence**: Chat history maintained per session with export capabilities
- **Input Enhancements**: Character counter, input validation, and improved UX
- **Error Handling**: Comprehensive error handling with user-friendly toast notifications

## Recent Changes (Phase 2 - January 2025)
- ✓ Added dark/light theme toggle with system preference detection
- ✓ Enhanced Fang Yuan AI personality with more calculating and strategic responses
- ✓ Implemented session management with export and clear functionality
- ✓ Added message reactions and copy-to-clipboard features
- ✓ Created sophisticated loading animations with floating particles
- ✓ Improved input field with character counter and validation
- ✓ Enhanced chat interface with hover effects and message interactions
- ✓ Updated design to clean white/gold aesthetic inspired by sliding-timer reference
- ✓ Migrated from in-memory to PostgreSQL database with persistent storage
- ✓ Set up Drizzle ORM with proper database schema and migrations

The application is designed to be easily deployable to platforms like Replit, with automatic database provisioning and environment variable management.