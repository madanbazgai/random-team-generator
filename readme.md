# Random Team Generator

A full-stack application for generating balanced teams from a pool of players based on skill levels.

## Tech Stack

### Frontend
- React 19 with TypeScript
- TanStack Router for routing
- TanStack Query for data fetching and mutation
- Zustand for state management
- Tailwind CSS for styling
- Sonner for toast notifications
- Lucide React for icons
- Vite as the build tool

### Backend
- Node.js with TypeScript
- Express.js for the REST API
- MongoDB with Mongoose for data storage
- Zod for input validation
- nanoid for generating unique share IDs

### Development & Deployment
- Docker and Docker Compose for containerization

## Features

- Add, view, and delete players with customizable skill levels
- Add, view, and delete teams
- Generate balanced teams based on player skill levels
- Share generated team configurations via unique URLs

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)

### Running with Docker

The easiest way to run the entire application stack is using Docker Compose:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd random-team-generator
   ```

2. Start the application:
   ```bash
   docker-compose up
   ```

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - MongoDB: mongodb://localhost:27017


## API Endpoints

### Players
- `GET /api/players` - Get all players
- `POST /api/players` - Add a new player
- `DELETE /api/players/:id` - Delete a player

### Teams
- `GET /api/teams` - Get all teams
- `POST /api/teams` - Add a new team
- `DELETE /api/teams/:id` - Delete a team

### Team Generation
- `POST /api/generate` - Generate balanced teams
- `GET /api/team/:shareId` - Get a specific team generation by share ID
