# Hideout - Cultural Heritage Preservation Platform

> Discover, preserve, and share stories about meaningful locations around the world

**Live Platform:** [hide-out.tech](https://hide-out.tech)

---

## Video Resources

**Introduction Video**[![Hideout Introduction](https://img.youtube.com/vi/y4lqkyZa20Y/maxresdefault.jpg)](https://www.youtube.com/watch?v=y4lqkyZa20YP)
**Platform Demo**[![Platform Demo](https://img.youtube.com/vi/ICjZSLjLYMc/maxresdefault.jpg)](https://www.youtube.com/watch?v=ICjZSLjLYMc)

---

## What is Hideout?

Hideout is a full-stack web application designed to preserve cultural heritage through digital storytelling. The platform allows users to explore locations on an interactive map, discover the stories behind them, and contribute their own narratives about places that matter to them.

Think of it as a community-driven archive where every location has a story worth preserving - from historical landmarks to hidden local gems that hold cultural significance.

---

## Architecture Overview

The project consists of two separate repositories working together:

### Backend Repository
[**gaashvik/Hideout-Backend**](https://github.com/gaashvik/Hideout-Backend)
- RESTful API built with Node.js and Express
- MongoDB for primary data storage
- Neo4j graph database integration
- C++ recommendation engine
- Python scripts for data processing
- Firebase integration for authentication
- Cloudinary for media management

### Frontend Repository
[**gaashvik/Hideout-Frontend**](https://github.com/gaashvik/Hideout-Frontend)
- React application built with Vite
- Redux Toolkit for state management
- Tailwind CSS for styling
- Google Maps API integration
- Firebase authentication
- Framer Motion for animations

---

## Key Features

- **Interactive Map Interface** - Browse locations and stories on a dynamic map powered by Google Maps
- **Story Discovery** - Explore cultural narratives tied to specific geographic locations
- **User Authentication** - Secure login and registration via Firebase
- **Personalized Recommendations** - AI-powered location suggestions based on user preferences
- **Social Features** - Like, save, and share stories that resonate with you
- **Trip Planning** - Plan your cultural exploration journeys
- **Media Rich Content** - Upload and view images associated with locations
- **Responsive Design** - Seamless experience across desktop and mobile devices

---

## Tech Stack

### Backend Technologies

| Category | Technologies |
|----------|-------------|
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **Databases** | MongoDB, Neo4j |
| **Authentication** | Firebase Auth, JWT |
| **File Storage** | Cloudinary |
| **AI/ML** | C++ recommendation engine, Python scripts |
| **Web Scraping** | Puppeteer |
| **Security** | bcryptjs, cookie-parser |

**Key Backend Dependencies:**
```json
{
  "express": "^4.19.2",
  "mongoose": "^7.5.0",
  "neo4j-driver": "^5.28.1",
  "firebase": "^11.2.0",
  "jsonwebtoken": "^9.0.2",
  "cloudinary": "^2.1.0",
  "puppeteer": "^24.1.0",
  "multer": "^1.4.5-lts.1"
}
```

### Frontend Technologies

| Category | Technologies |
|----------|-------------|
| **Framework** | React 18 |
| **Build Tool** | Vite |
| **State Management** | Redux Toolkit, Redux Persist |
| **Styling** | Tailwind CSS |
| **Routing** | React Router DOM |
| **Maps** | Google Maps API |
| **Animations** | Framer Motion |
| **AI Integration** | Google Generative AI |
| **UI Components** | Headless UI, Lucide React Icons |

**Key Frontend Dependencies:**
```json
{
  "react": "^18.2.0",
  "@reduxjs/toolkit": "^1.9.5",
  "react-router-dom": "^6.15.0",
  "firebase": "^10.3.1",
  "@google/generative-ai": "^0.21.0",
  "framer-motion": "^12.0.6",
  "tailwindcss": "^3.4.17"
}
```

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud instance)
- Git

### Backend Setup

1. **Clone the backend repository**
   ```bash
   git clone https://github.com/gaashvik/Hideout-Backend.git
   cd Hideout-Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory with the following:
   ```env
   MONGO_URI=your_mongodb_connection_string
   NEO4J_URI=your_neo4j_connection_string
   NEO4J_USER=neo4j
   NEO4J_PASSWORD=your_neo4j_password
   JWT_SECRET=your_jwt_secret_key
   FIREBASE_API_KEY=your_firebase_api_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Update C++ executable path**

   Navigate to `./api/routes/places.rout.js` and find the `/user-rec/:id/:name` route. Update the `cppExecutable` path to match your local directory structure.

5. **Start the development server**
   ```bash
   npm run dev
   ```

   The API will be running on `http://localhost:3000` (or your configured port)

### Frontend Setup

1. **Clone the frontend repository**
   ```bash
   git clone https://github.com/gaashvik/Hideout-Frontend.git
   cd Hideout-Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:3000
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   VITE_GOOGLE_AI_API_KEY=your_google_ai_api_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will open at `http://localhost:5173`

5. **Build for production**
   ```bash
   npm run build
   ```

---

## Project Structure

### Backend Structure
```
Hideout-Backend/
├── api/
│   ├── controllers/      # Business logic handlers
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoint definitions
│   │   ├── auth.route.js
│   │   ├── places.rout.js
│   │   ├── user.route.js
│   │   ├── likes.route.js
│   │   ├── triplan.route.js
│   │   └── ...
│   ├── middlewares/     # Custom middleware functions
│   ├── utils/           # Helper functions
│   └── index.js         # Express app configuration
├── recommendation_library/  # C++ recommendation engine
├── database_structure/      # Database schemas and migrations
├── migration/              # Data migration scripts
├── security/              # Security configurations
├── images/               # Static images
├── Dockerfile           # Docker configuration
└── package.json
```

### Frontend Structure
```
Hideout-Frontend/
├── src/
│   ├── components/      # Reusable React components
│   ├── pages/          # Page components
│   ├── redux/          # Redux store and slices
│   ├── utils/          # Utility functions
│   ├── assets/         # Static assets
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Entry point
├── public/             # Public assets
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## API Routes Overview

The backend exposes the following main route groups:

- **`/api/auth`** - User authentication (signup, login, logout)
- **`/api/user`** - User profile management
- **`/api/places`** - Location and story CRUD operations
- **`/api/likes`** - Like/unlike functionality
- **`/api/triplan`** - Trip planning features
- **`/api/hotels`** - Hotel recommendations
- **`/api/flights`** - Flight information
- **`/api/listing`** - Content listings
- **`/api/webplayer`** - Media player endpoints
- **`/api/pool`** - Connection pooling management

---

## Development Workflow

### Running Both Repositories Simultaneously

For full functionality, both backend and frontend need to run together:

1. **Terminal 1 - Backend:**
   ```bash
   cd Hideout-Backend
   npm run dev
   ```

2. **Terminal 2 - Frontend:**
   ```bash
   cd Hideout-Frontend
   npm run dev
   ```

### Code Style and Linting

The frontend includes ESLint configuration for code quality:
```bash
npm run lint
```

---

## Docker Deployment

The backend includes a Dockerfile for containerized deployment:

```bash
# Build the image
docker build -t hideout-backend .

# Run the container
docker run -p 3000:3000 --env-file .env hideout-backend
```

---

## Contributing

We welcome contributions from developers, designers, and cultural enthusiasts! Here's how you can get involved:

### How to Contribute

1. **Fork the repository** you want to contribute to (backend or frontend)

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes** and commit them with clear messages
   ```bash
   git commit -m 'Add: implemented amazing feature'
   ```

4. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

5. **Open a Pull Request** with a detailed description of your changes

### Contribution Guidelines

- Follow the existing code style and conventions
- Write meaningful commit messages
- Test your changes thoroughly before submitting
- Update documentation for any new features
- Be respectful and constructive in discussions

### Areas We Need Help With

- Bug fixes and issue resolution
- New feature development
- Documentation improvements
- UI/UX enhancements
- Internationalization and localization
- Accessibility improvements
- Test coverage expansion

---

## License

This project is licensed under the **MIT License**, which means:

- You can use this code commercially
- You can modify and distribute it
- You can use it privately
- You must include the license and copyright notice

See the [LICENSE](LICENSE) file for full details.

---

## Security

If you discover a security vulnerability, please email the maintainers directly instead of opening a public issue. We take security seriously and will address valid concerns promptly.

---

## Acknowledgments

- Built with passion for preserving cultural heritage
- Thanks to all contributors who help make this platform better
- Special appreciation to the communities sharing their stories

---

## Support & Contact

- **Website:** [hide-out.tech](https://hide-out.tech)
- **Issues:** Report bugs via [GitHub Issues](https://github.com/gaashvik/Hideout-Backend/issues)
- **Backend Repo:** [github.com/gaashvik/Hideout-Backend](https://github.com/gaashvik/Hideout-Backend)
- **Frontend Repo:** [github.com/gaashvik/Hideout-Frontend](https://github.com/gaashvik/Hideout-Frontend)

---

## Roadmap

Future enhancements we're considering:

- [ ] Mobile application (React Native)
- [ ] Advanced recommendation algorithm improvements
- [ ] Multi-language support
- [ ] Audio story narrations
- [ ] Augmented Reality features for location visits
- [ ] Community moderation tools
- [ ] Analytics dashboard for content creators
- [ ] Integration with tourism boards and cultural organizations

---

**Made with care for preserving stories that matter**

Remember to replace placeholder links for introduction and demo videos before publishing!
