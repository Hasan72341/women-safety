# Women Safety App - Frontend

React-based frontend for the Women Safety Application using Vite.

## Features

- Real-time safety dashboard
- Emergency response interface
- Settings management
- Fully responsive design optimized for mobile devices
- Demo modes for presentation and testing
- Auto-emergency triggering for critical threats
- Touch-friendly controls and gestures

## Tech Stack

- React 18
- Vite
- Material-UI (MUI) with responsive components
- React Router
- JavaScript (ES6+)
- CSS3 with mobile-first approach

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

The app will be available at http://localhost:5173

**Hot Module Replacement (HMR) Features:**
- Instant updates without full page reloads
- Error overlays for quick debugging
- Fast refresh for React components
- Automatic server restart on config changes

### Environment Configuration

The app uses environment variables for configuration:
- `.env` - Default environment variables
- `.env.development` - Development-specific settings
- `.env.production` - Production-specific settings

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components
│   ├── pages/           # Page components
│   ├── services/        # API services
│   ├── hooks/           # Custom hooks
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── index.html           # HTML template
└── vite.config.js       # Vite configuration
```

## Pages

1. **Dashboard** (`/`) - Main safety monitoring interface
   - Demo controls for presentation modes
   - Real-time safety metrics display
   - Auto-emergency triggering for critical threats
   - Visual threat level indicators
   - Fully responsive design for all screen sizes

2. **Emergency** (`/emergency`) - Emergency response screen
   - Countdown timer for 112 emergency calls
   - Contact notification status
   - Location sharing visualization
   - Evidence collection display
   - Cancel and loud alarm buttons
   - Mobile-optimized layout

3. **Settings** (`/settings`) - User preferences and configuration
   - Responsive form layouts
   - Touch-friendly controls
   - Mobile-first design approach

## Components

- Real-time safety metrics display
- Emergency contact management
- Location services configuration
- Threat assessment visualization
- Evidence collection interface

## Services

- API service for backend communication
- Mock data for demonstration purposes

## Styling

- Material-UI components with custom theme
- Fully responsive design with mobile-first approach
- Optimized for touch interactions
- Accessible UI components
- Consistent design across all screen sizes

## Demo Features

For presentation and demonstration purposes, the app includes special demo modes:

1. **Escalating Threat Demo** - Gradually increases threat levels to show system response
2. **Critical Threat Demo** - Immediately simulates a critical threat scenario
3. **Auto-Emergency Triggering** - Automatically triggers emergency response for critical threats
4. **Real-time Data Simulation** - Dynamic data updates every 2 seconds

## Mobile Features

- Touch-optimized interface
- Responsive grid layouts
- Adaptive typography
- Mobile-friendly navigation
- Gesture support
- Optimized for both portrait and landscape orientations

## Future Enhancements

- WebSocket integration for real-time updates
- Push notifications
- Offline support
- Internationalization
- Dark/light theme toggle
- Accessibility improvements
- Progressive Web App (PWA) support
