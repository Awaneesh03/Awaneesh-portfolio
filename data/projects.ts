/**
 * Projects Configuration
 * Real projects from GitHub - Awaneesh03
 */

export interface FeaturedProject {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  image?: string;
  technologies: string[];
  github?: string;
  backendRepo?: string;
  demo?: string;
  featured: boolean;
  isStartup?: boolean;
  category: 'web' | 'mobile' | 'ai' | 'tool' | 'startup' | 'other';
  status: 'completed' | 'in-progress' | 'planned';
  highlights?: string[];
  problemSolved?: string;
  architecture?: string[];
}

// ============================================
// FEATURED STARTUP - MOTIF
// ============================================
export const startupProject: FeaturedProject = {
  id: "motif-startup",
  name: "Motif",
  description: "A full-stack web application built with TypeScript and Java. Modern architecture with separate frontend and backend services.",
  longDescription: "Motif is a comprehensive web platform featuring a TypeScript-powered frontend with React and a robust Java backend. The project demonstrates proficiency in full-stack development, API design, and deployment on Vercel.",
  image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
  technologies: ["TypeScript", "React", "Java", "Spring Boot", "REST API", "Vercel"],
  github: "https://github.com/Awaneesh03/motif-website",
  backendRepo: "https://github.com/Awaneesh03/motif-backend-",
  demo: "https://motif-website-master.vercel.app/",
  featured: true,
  isStartup: true,
  category: "startup",
  status: "completed",
  problemSolved: "Building a scalable web platform with modern TypeScript frontend and Java backend microservices architecture.",
  architecture: [
    "React + TypeScript frontend with component-based architecture",
    "Java Spring Boot backend with RESTful API design",
    "Deployed on Vercel for seamless CI/CD",
    "Clean separation of concerns between frontend and backend"
  ],
  highlights: [
    "Full-stack TypeScript + Java architecture",
    "Live production deployment on Vercel",
    "RESTful API integration",
    "Modern React component design"
  ]
};

// ============================================
// FEATURED PROJECTS - Real GitHub Repos
// ============================================
export const featuredProjects: FeaturedProject[] = [
  // STARTUP PROJECT - First in list
  startupProject,

  // MacOS Portfolio
  {
    id: "macos-portfolio",
    name: "macOS Portfolio",
    description: "Interactive developer portfolio simulating the macOS desktop experience with draggable windows, dock magnification, and Spotlight search.",
    longDescription: "A fully interactive portfolio that recreates the macOS experience in the browser. Features boot sequence, login screen, draggable windows with traffic lights, animated dock with magnification, Spotlight search, and multiple portfolio apps.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop",
    technologies: ["React", "TypeScript", "TailwindCSS", "Framer Motion", "Vite"],
    github: "https://github.com/Awaneesh03/MacOS-Recreation-main",
    featured: true,
    category: "web",
    status: "completed",
    highlights: [
      "Authentic macOS UI with glassmorphism",
      "Spring-physics dock magnification",
      "Full keyboard shortcut support",
      "Live GitHub API integration"
    ]
  },

  // Digital Life Dashboard
  {
    id: "digital-life-dashboard",
    name: "Digital Life Dashboard",
    description: "A personalized dashboard application for managing and visualizing daily digital life activities and metrics.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
    technologies: ["JavaScript", "HTML", "CSS", "Vercel"],
    github: "https://github.com/Awaneesh03/digital-life-dashboard",
    demo: "https://digital-life-dashboard-sepia.vercel.app",
    featured: true,
    category: "web",
    status: "completed",
    highlights: [
      "Interactive dashboard UI",
      "Real-time data visualization",
      "Deployed on Vercel"
    ]
  },

  // Weather App
  {
    id: "weather-app",
    name: "Weather App",
    description: "A weather application with beautiful UI showcasing current weather conditions and forecasts.",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&auto=format&fit=crop",
    technologies: ["JavaScript", "CSS", "HTML", "Weather API"],
    github: "https://github.com/Awaneesh03/weather-app",
    featured: false,
    category: "web",
    status: "completed",
    highlights: [
      "API integration",
      "Responsive design",
      "Clean UI"
    ]
  },

  // Harry Potter Website
  {
    id: "harry-potter-website",
    name: "Harry Potter Fan Site",
    description: "A fan-made Harry Potter website with elegant design inspired by the magical world of Hogwarts.",
    image: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=800&auto=format&fit=crop",
    technologies: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Awaneesh03/harry-potter-website",
    featured: false,
    category: "web",
    status: "completed",
    highlights: [
      "Themed design",
      "CSS animations",
      "Interactive elements"
    ]
  },

  // Treasure Hunt
  {
    id: "treasure-hunt",
    name: "Treasure Hunt Game",
    description: "An interactive treasure hunt game built with HTML and JavaScript.",
    image: "https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?w=800&auto=format&fit=crop",
    technologies: ["HTML", "JavaScript", "CSS"],
    github: "https://github.com/Awaneesh03/treasure-hunt",
    featured: false,
    category: "web",
    status: "completed",
    highlights: [
      "Game logic implementation",
      "Interactive UI"
    ]
  },

  // Drum Kit
  {
    id: "drum-kit",
    name: "Drum Kit",
    description: "Interactive drum kit application with keyboard support and audio playback.",
    image: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=800&auto=format&fit=crop",
    technologies: ["JavaScript", "HTML", "CSS", "Web Audio API"],
    github: "https://github.com/Awaneesh03/drum-kit",
    featured: false,
    category: "web",
    status: "completed",
    highlights: [
      "Keyboard event handling",
      "Audio integration"
    ]
  },

  // Pokemon Keyboard
  {
    id: "pokemon-keyboard",
    name: "Pokemon Keyboard",
    description: "A fun Pokemon-themed keyboard application with unique interactions.",
    image: "https://images.unsplash.com/photo-1542779283-429940ce8336?w=800&auto=format&fit=crop",
    technologies: ["JavaScript", "HTML", "CSS"],
    github: "https://github.com/Awaneesh03/Pokemon-keyboard",
    featured: false,
    category: "web",
    status: "completed",
    highlights: [
      "Pokemon theming",
      "Keyboard interactions"
    ]
  },

  // Hackathon Project
  {
    id: "hackathon",
    name: "Hackathon Project",
    description: "Project built during a hackathon event - rapid prototyping and development.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop",
    technologies: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Awaneesh03/hackathon",
    featured: false,
    category: "web",
    status: "completed",
    highlights: [
      "Rapid development",
      "Hackathon experience"
    ]
  }
];

// Helper functions
export const getStartupProject = (): FeaturedProject => {
  return startupProject;
};

export const getFeaturedProjects = (): FeaturedProject[] => {
  return featuredProjects.filter(p => p.featured);
};

export const getProjectsByCategory = (category: FeaturedProject['category']): FeaturedProject[] => {
  return featuredProjects.filter(p => p.category === category);
};

export const getProjectCount = (): number => {
  return featuredProjects.length;
};

export const getCompletedProjectCount = (): number => {
  return featuredProjects.filter(p => p.status === 'completed').length;
};
