# Tinggal Sewa - Property Rental Platform

A modern property rental platform built with React, TypeScript, and Vite. Tinggal Sewa allows users to browse, search, and book rental properties with ease.

## Features

- Browse available properties
- Search and filter properties by location, price, and amenities
- Detailed property listings with images and descriptions
- User authentication and profile management
- Booking management
- Responsive design for mobile and desktop

## Tech Stack

- **Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **UI Components**: Radix UI primitives with custom styling
- **State Management**: Zustand
- **Form Handling**: React Hook Form with Zod validation
- **API Client**: Axios with React Query
- **Routing**: React Router v7
- **Authentication**: JWT with cookie-based storage

## Getting Started

### Prerequisites

- Node.js (v18 or newer)
- Yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/tinggal-sewa-fe.git
   cd tinggal-sewa-fe
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Start the development server:
   ```bash
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Scripts

- `yarn dev` - Start the development server
- `yarn build` - Build for production
- `yarn lint` - Lint the codebase
- `yarn preview` - Preview the production build locally

## Project Structure

```
src/
├── assets/       # Static assets like images
├── components/   # Reusable UI components
├── data/         # Static data and mock data
├── hooks/        # Custom React hooks
├── layouts/      # Layout components
├── lib/          # Utility functions and helpers
├── modules/      # Feature-based modules
├── routes/       # Route definitions
├── services/     # API services and data fetching
├── store/        # State management
├── types/        # TypeScript type definitions
└── app.tsx       # Main app component
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
