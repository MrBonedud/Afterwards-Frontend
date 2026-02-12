<a id="readme-top"></a>

<!-- SHIELDS -->

[![React][React.js]][React-url]
[![Vite][Vite]][Vite-url]
[![TypeScript][TypeScript]][TypeScript-url]
[![React Router][React-Router]][React-Router-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">

<h3 align="center">Afterwards Frontend</h3>

  <p align="center">
    A modern, intuitive React web application for managing ephemeral photo albums
    <br />
    <a href="#about-the-project"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="#getting-started">Get Started</a>
    &middot;
    <a href="#features">Features</a>
    &middot;
    <a href="#contributing">Report Issues</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#features">Features</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#project-structure">Project Structure</a></li>
    <li><a href="#key-components">Key Components</a></li>
    <li><a href="#authentication--authorization">Authentication & Authorization</a></li>
    <li><a href="#development">Development</a></li>
    <li><a href="#deployment">Deployment</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Afterwards Frontend is a modern single-page application built with React and Vite that provides an intuitive interface for creating, sharing, and managing ephemeral photo albums. Users can create temporary albums, invite guests, upload photos collaboratively, and download their memories before they expire.

The frontend communicates seamlessly with the Afterwards Backend API to deliver a smooth, responsive user experience with real-time updates and secure authentication.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Features

- **User Authentication**: Sign up and login with secure JWT-based authentication
- **Album Management**: Create, view, edit, and delete photo albums with custom expiration dates
- **Photo Uploads**: Upload photos directly to albums with drag-and-drop support
- **Guest Sharing**: Share albums with guests via unique invite links without requiring registration
- **Participant Management**: View list of album participants and manage access
- **Photo Gallery**: Beautiful, responsive photo gallery with preview capabilities
- **Download Albums**: Download all photos from an album as a convenient ZIP file
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Real-Time Updates**: Live feedback for uploads and album operations
- **User Dashboard**: Personalized dashboard showcasing all user albums
- **Protected Routes**: Secure page access with public and private route components
- **Form Validation**: Comprehensive client-side validation with user-friendly error messages
- **Toast Notifications**: Non-intrusive feedback notifications for user actions

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![React][React.js]][React-url]
- [![Vite][Vite]][Vite-url]
- [![TypeScript][TypeScript]][TypeScript-url]
- [![React Router][React-Router]][React-Router-url]
- [![Axios][Axios]][Axios-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn installed
- The Afterwards Backend API running (see Backend README)
- Git for version control

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/username/afterwards.git
   cd afterwards/Frontend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Configure the API endpoint in [src/config/api.ts](src/config/api.ts):

   ```ts
   const API_BASE_URL = process.env.VITE_API_URL || "http://localhost:5000";
   ```

4. Start the development server:
   ```sh
   npm run dev
   ```

The application will be available at `http://localhost:5173`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- PROJECT STRUCTURE -->

## Project Structure

```
Frontend/
├── src/
│   ├── App.tsx                    # Root application component
│   ├── App.css                    # Global application styles
│   ├── main.tsx                   # Entry point
│   ├── index.css                  # Global styles
│   ├── config/
│   │   └── api.ts                 # API client configuration
│   ├── hooks/
│   │   └── useAuth.ts             # Authentication hook
│   ├── components/
│   │   ├── Navbar.tsx             # Navigation bar component
│   │   ├── Navbar.module.css      # Navbar styles
│   │   ├── Footer.tsx             # Footer component
│   │   ├── Footer.module.css      # Footer styles
│   │   ├── ProtectedRoute.tsx     # Protected route wrapper
│   │   ├── PublicOnlyRoute.tsx    # Public-only route wrapper
│   │   └── AlbumView/             # Album viewing components
│   │       ├── ActionButtons.tsx  # Action buttons component
│   │       ├── AlbumEditPanel.tsx # Album edit interface
│   │       ├── AlbumHeader.tsx    # Album header display
│   │       ├── JoinModal.tsx      # Guest join modal
│   │       ├── ParticipantsList.tsx # Participants overview
│   │       ├── PhotoGallery.tsx   # Photo grid display
│   │       ├── Toast.tsx          # Toast notifications
│   │       └── UploadSection.tsx  # Photo upload interface
│   ├── pages/
│   │   ├── LandingPage.tsx        # Welcome/hero page
│   │   ├── LoginPage.tsx          # User login page
│   │   ├── SignupPage.tsx         # User registration page
│   │   ├── DashBoard.tsx          # User album dashboard
│   │   ├── CreateAlbumPage.tsx    # Album creation form
│   │   ├── AlbumViewPage.tsx      # Album detail view
│   │   ├── ContactPage.tsx        # Contact/support page
│   │   ├── PrivacyPage.tsx        # Privacy policy page
│   │   ├── TermsPage.tsx          # Terms of service page
│   │   └── [*.module.css]         # Page-specific styles
│   ├── assets/                    # Static assets
│   └── public/                    # Public assets
├── vite.config.ts                 # Vite configuration
├── tsconfig.json                  # TypeScript configuration
├── eslint.config.js               # ESLint configuration
├── index.html                     # HTML entry point
├── package.json
└── README.md
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- KEY COMPONENTS -->

## Key Components

### **Navbar**

Navigation bar providing access to main sections, user profile, and authentication controls. Responsive design that adapts to mobile screens.

### **ProtectedRoute & PublicOnlyRoute**

Route wrapper components that enforce authentication requirements:

- `ProtectedRoute`: Restricts access to authenticated users only
- `PublicOnlyRoute`: Restricts access to unauthenticated users (prevents logged-in users from accessing login/signup)

### **AlbumView Components**

Modular components for the album detail page:

- **PhotoGallery**: Responsive grid display of album photos
- **UploadSection**: Drag-and-drop photo upload interface
- **ActionButtons**: Album actions (download, edit, delete)
- **AlbumHeader**: Album title and metadata display
- **ParticipantsList**: List of album participants
- **JoinModal**: Modal for guests to join album
- **AlbumEditPanel**: Edit album settings and expiration
- **Toast**: Notification system for user feedback

### **useAuth Hook**

Custom React hook managing authentication state:

- User login/logout
- Token management
- Auth context provision
- Session persistence

### **API Configuration**

Centralized Axios instance with:

- Base URL configuration
- Automatic token attachment to requests
- Global error handling
- Request/response interceptors

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- AUTHENTICATION & AUTHORIZATION -->

## Authentication & Authorization

### Flow

1. **Sign Up/Login**: User submits credentials to backend
2. **Token Received**: Backend returns JWT token in HTTP-only cookie
3. **Stored in Memory**: Token available in React context/state
4. **Automatic Attachment**: Axios interceptors automatically include token in requests
5. **Protected Routes**: Route guards check authentication status
6. **Token Refresh**: Automatic token refresh before expiration

### Route Protection

```tsx
// Protected route - requires authentication
<Route element={<ProtectedRoute><DashBoard /></ProtectedRoute>} />

// Public-only route - prevents logged-in users
<Route element={<PublicOnlyRoute><LoginPage /></PublicOnlyRoute>} />

// Public route - accessible to everyone
<Route element={<LandingPage />} />
```

### Guest Access

Guests can access album-specific routes using a special guest token parameter, allowing photo viewing and uploads without user registration.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- DEVELOPMENT -->

## Development

### Available Commands

```sh
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Type-check with TypeScript
npm run build

# Preview production build locally
npm run preview

# Lint code with ESLint
npm run lint
```

### Styling

- **CSS Modules**: Component-specific styles using `ComponentName.module.css`
- **Global Styles**: `index.css` for application-wide styling
- **Modern Normalize**: Normalizes browser defaults across all browsers
- **Responsive Design**: Mobile-first approach with responsive breakpoints

### Development Best Practices

- Use TypeScript for all new components
- Create CSS modules for component styles
- Keep components small and focused (single responsibility)
- Use the `useAuth` hook for authentication state
- Implement proper error handling in async operations
- Add toast notifications for user feedback
- Test responsive design on multiple screen sizes

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- DEPLOYMENT -->

## Deployment

### Build Optimization

The build process includes:

- TypeScript compilation and type checking
- Vite bundle optimization
- Minification and code splitting
- CSS optimization

### Deploy to Render

1. Connect your GitHub repository to Render
2. Create a new Static Site
3. Set the build command: `npm run build`
4. Set the publish directory: `dist`
5. Add environment variable: `VITE_API_URL=https://your-backend-api.com`
6. Deploy

### Deploy to Vercel

1. Import your GitHub repository
2. Framework preset: `Vite`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variable: `VITE_API_URL=https://your-backend-api.com`
6. Deploy

### Environment Variables

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=Afterwards
```

These are accessible in the code as `import.meta.env.VITE_*`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/AmazingFeature`
3. Install dependencies: `npm install`
4. Make your changes and test thoroughly
5. Ensure code passes linting: `npm run lint`
6. Commit your changes: `git commit -m 'Add some AmazingFeature'`
7. Push to the branch: `git push origin feature/AmazingFeature`
8. Open a Pull Request

### Guidelines

- Write components with TypeScript types
- Create CSS modules for component-specific styles
- Keep components reusable and modular
- Test on multiple screen sizes
- Follow existing code patterns and conventions
- Add meaningful commit messages
- Update documentation if needed

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

This project is licensed under the ISC License. See the `LICENSE` file for details.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

For issues, questions, or suggestions:

- Open an issue on GitHub
- Create a discussion for feature requests

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [Unsplash](https://unsplash.com/) for providing beautiful photography
  - Hero Photo by [Karen Kasparov](https://unsplash.com/@kaskar2008?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/a-crowd-of-people-are-taking-pictures-with-their-cell-phones-a_0jMEZs7RU?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
  - Login Photo by [Nathan Anderson](https://unsplash.com/@nathananderson?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/a-man-taking-a-picture-of-a-hockey-game-ZjXspfi-ek8?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
- [Twemoji](https://twemoji.twitter.com/) for Emoji graphics under [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/)
- React community for excellent documentation
- Vite team for blazing fast build tooling
- All contributors and users

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vite]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E
[Vite-url]: https://vitejs.dev/
[TypeScript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[React-Router]: https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white
[React-Router-url]: https://reactrouter.com/
[Axios]: https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white
[Axios-url]: https://axios-http.com/
