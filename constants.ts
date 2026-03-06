
export const ASSETS = {
  APPLE_LOGO: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsdHBmGXto7DZMWqJ_WGa6NAuulK9JXjrnGw&s',
  BOOT_PROGRESS_BG: '/mnt/data/81dcc082-0d24-42f8-aee1-fa3d54986921.png',
  LOGIN_AVATAR: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Awaneesh&backgroundColor=b6e3f4',
  WALLPAPER: 'https://images.unsplash.com/photo-1726084606622-49162464736f?q=80&w=2560&auto=format&fit=crop',
  PROFILE_IMAGE: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Awaneesh&backgroundColor=b6e3f4',
  RESUME_URL: '/resume.pdf',
};

export const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY || '';
export const DEFAULT_CITY = 'Pune';
export const GITHUB_USERNAME = 'Awaneesh03';

export const USER_NAME = "Awaneesh";

// Portfolio Data - DEPRECATED: Use data/ folder instead
// This is kept for backwards compatibility
export const PORTFOLIO = {
  name: "Awaneesh",
  title: "Full Stack Developer",
  email: "kg3327949@gmail.com",
  github: "https://github.com/Awaneesh03",
  linkedin: "https://www.linkedin.com/in/awaneesh-gupta/",
  resume: "/resume.pdf",
  location: "Pune, India",
  bio: "B.Tech Computer Science student specializing in AI. Building full-stack applications with React, TypeScript, and Java. Passionate about creating elegant solutions and learning new technologies.",
  
  education: [
    {
      degree: "B.Tech in Computer Science (AI)",
      school: "Vedam School of Technology",
      year: "2025 - 2029",
      description: "Specializing in Artificial Intelligence and Machine Learning"
    }
  ],
  
  experience: [
    {
      title: "Full Stack Developer",
      company: "Personal Projects & Startup",
      period: "2024 - Present",
      description: "Building Motif - a full-stack web platform with TypeScript frontend and Java backend"
    }
  ],
  
  skills: {
    frontend: ["React", "TypeScript", "TailwindCSS", "Framer Motion", "HTML/CSS"],
    backend: ["Java", "Spring Boot", "Node.js", "Python", "REST APIs"],
    tools: ["Git", "VS Code", "Vercel", "GitHub", "Linux"],
    learning: ["Data Structures", "Algorithms", "AI/ML", "System Design"]
  },
  
  // Real projects only - see data/projects.ts for full list
  projects: [
    {
      id: "1",
      name: "Motif",
      description: "Full-stack web application with TypeScript frontend and Java backend. Live on Vercel.",
      techStack: ["TypeScript", "React", "Java", "Spring Boot", "Vercel"],
      github: "https://github.com/Awaneesh03/motif-website",
      demo: "https://motif-website-master.vercel.app/",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
      stars: 1,
      featured: true
    },
    {
      id: "2", 
      name: "macOS Portfolio",
      description: "Interactive developer portfolio simulating the macOS desktop experience.",
      techStack: ["React", "TypeScript", "TailwindCSS", "Framer Motion"],
      github: "https://github.com/Awaneesh03/MacOS-Recreation-main",
      demo: "",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400",
      stars: 0,
      featured: true
    },
    {
      id: "3",
      name: "Digital Life Dashboard",
      description: "Personalized dashboard for managing digital life activities.",
      techStack: ["JavaScript", "HTML", "CSS", "Vercel"],
      github: "https://github.com/Awaneesh03/digital-life-dashboard",
      demo: "https://digital-life-dashboard-sepia.vercel.app",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
      stars: 0,
      featured: true
    }
  ],
  
  timeline: [
    { year: "2025", title: "Started B.Tech", description: "Computer Science (AI) at Vedam School of Technology", type: "education" },
    { year: "2024", title: "Full Stack Developer", description: "Building Motif startup and personal projects", type: "work" },
    { year: "2024", title: "Hackathon Participant", description: "Participated in coding hackathons", type: "achievement" }
  ]
};
