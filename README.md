# NaRDil Project Management Tool

A modern React-based project management application with a beautiful UI featuring a schedule tab on the left edge of the screen.

## Features

- **Modern UI Design**: Clean and responsive interface with gradient sidebar
- **Schedule Tab**: Interactive calendar with event management
- **Sidebar Navigation**: Fixed sidebar with multiple tabs (Schedule, Projects, Tasks, Team, Reports)
- **Responsive Design**: Works on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

Start the development server:
```bash
npm start
```

The application will open in your browser at `http://localhost:3000`.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (not recommended)

## Project Structure

```
src/
├── components/
│   ├── Sidebar.js          # Sidebar navigation component
│   ├── Sidebar.css         # Sidebar styles
│   ├── Schedule.js         # Schedule/calendar component
│   └── Schedule.css        # Schedule styles
├── App.js                  # Main application component
├── App.css                 # Main app styles
├── index.js                # Application entry point
└── index.css               # Global styles
```

## Features Overview

### Schedule Tab
- Interactive monthly calendar view
- Event indicators with color coding
- Date selection with event details
- Navigation between months
- Sample events included for demonstration

### Sidebar Navigation
- Fixed position on the left edge
- Gradient background design
- Active tab highlighting
- User profile section
- Responsive design for mobile devices

## Technologies Used

- React 18
- CSS3 with modern features
- Create React App
- Responsive design principles

## Customization

The application is designed to be easily customizable:

- Colors and gradients can be modified in the CSS files
- Additional tabs can be added to the sidebar
- Schedule functionality can be extended with real data integration
- Styling can be adjusted to match your brand

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge 