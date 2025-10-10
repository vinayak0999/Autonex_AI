# Autonex AI Industrial Automation Platform

## Overview

This is a modern React-based web application for Autonex AI, an industrial automation company that builds AI-powered digital twins for manufacturing operations. The platform showcases the company's vision, services, and industry solutions through an elegant, motion-rich user interface. Built with a full-stack TypeScript architecture, the application features a marketing website with sections for hero content, vision statements, service descriptions, industry applications, and contact functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, using Vite as the build tool for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing with a single-page application structure
- **Styling**: Tailwind CSS with a custom design system following shadcn/ui component library patterns, featuring industrial-themed colors (dark navy, electric blue, industrial orange) and Inter font
- **UI Components**: Comprehensive set of Radix UI primitives wrapped in custom components for accessibility and consistency
- **Animations**: Framer Motion for sophisticated page transitions, parallax effects, smooth scrolling with Lenis, and magnetic button interactions
- **State Management**: TanStack Query for server state management with built-in caching and background updates

### Backend Architecture
- **Server**: Express.js with TypeScript running on Node.js, configured for both development and production environments
- **API Structure**: RESTful endpoints with `/api` prefix, structured for future expansion of CRUD operations
- **Middleware**: Request logging, JSON parsing, error handling, and development-specific tooling integration
- **Storage Interface**: Abstracted storage layer with in-memory implementation for users, designed to easily swap for database integration

### Design System
- **Component Library**: Custom implementation based on shadcn/ui with extensive Radix UI primitives
- **Theme System**: Light/dark mode support with CSS variables for consistent color management
- **Typography**: Inter for UI text, JetBrains Mono for technical content
- **Layout**: Responsive 12-column grid system with Tailwind spacing units
- **Industrial Theme**: Grid overlays, geometric shapes, dashboard-style elements, and technical line patterns

### Motion and Interactions
- **Smooth Scrolling**: Lenis integration for enhanced scroll behavior across the application
- **Page Animations**: Framer Motion variants for staggered animations, slide-ins, and scale effects
- **Interactive Elements**: Magnetic buttons with physics-based hover effects and count-up animations
- **Performance**: Optimized animations with proper viewport detection and reduced motion considerations

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form with Zod validation
- **Build Tools**: Vite with React plugin, TypeScript compiler, PostCSS with Tailwind
- **Routing**: Wouter for lightweight SPA routing

### UI and Styling
- **Component Library**: Extensive Radix UI primitives (@radix-ui/react-*)
- **Styling**: Tailwind CSS with custom configuration, class-variance-authority for component variants
- **Icons**: Lucide React for consistent iconography
- **Animations**: Framer Motion for advanced animations, Lenis for smooth scrolling

### Backend and Database
- **Server**: Express.js with TypeScript support via tsx
- **Database ORM**: Drizzle ORM configured for PostgreSQL with migration support
- **Database Provider**: Neon Database serverless PostgreSQL (@neondatabase/serverless)
- **Session Management**: Connect-pg-simple for PostgreSQL session storage

### Development and Build Tools
- **TypeScript**: Full type safety across client and server with shared schema definitions
- **Build System**: Vite for development and production builds, esbuild for server bundling
- **Development**: Replit-specific plugins for runtime error overlay and cartographer integration
- **Utilities**: Date-fns for date manipulation, clsx and tailwind-merge for conditional styling

### State Management and Data Fetching
- **Query Management**: TanStack React Query for server state, caching, and background updates
- **Form Handling**: React Hook Form with Hookform Resolvers for validation integration
- **Schema Validation**: Zod for runtime type validation and Drizzle-Zod for database schema integration

### Production Considerations
- The application is configured for deployment with proper build optimization, static asset handling, and environment-based configuration
- Database migrations are managed through Drizzle Kit with PostgreSQL dialect
- Session management and user authentication infrastructure is prepared but not fully implemented
- API routes are structured for easy expansion with proper error handling and request logging