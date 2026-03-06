/**
 * Experience & Education Configuration
 * Real experience for a B.Tech freshman (2025)
 */

export type TimelineType = 'work' | 'education' | 'achievement' | 'project';

export interface TimelineEntry {
  id: string;
  type: TimelineType;
  title: string;
  organization: string;
  location?: string;
  startDate: string;
  endDate: string | 'Present';
  description: string;
  highlights?: string[];
  technologies?: string[];
  link?: string;
}

export const experience: TimelineEntry[] = [
  {
    id: "exp-1",
    type: "work",
    title: "Founder & Full Stack Developer",
    organization: "Motif (Startup)",
    location: "Remote",
    startDate: "2024",
    endDate: "Present",
    description: "Building a full-stack web platform with TypeScript frontend and Java Spring Boot backend. Handling both development and deployment on Vercel.",
    highlights: [
      "Architected full-stack system with React + TypeScript frontend",
      "Built RESTful Java Spring Boot backend",
      "Deployed live production app to Vercel",
      "Managing entire development lifecycle"
    ],
    technologies: ["TypeScript", "React", "Java", "Spring Boot", "Vercel", "REST API"],
    link: "https://motif-website-master.vercel.app/"
  },
  {
    id: "exp-2",
    type: "work",
    title: "Personal Projects Developer",
    organization: "Self-Employed",
    location: "Remote",
    startDate: "2024",
    endDate: "Present",
    description: "Building portfolio projects to demonstrate skills in web development, including this macOS-style portfolio.",
    highlights: [
      "Built interactive macOS portfolio with React & TypeScript",
      "Created Digital Life Dashboard with live deployment",
      "Participated in hackathons"
    ],
    technologies: ["React", "TypeScript", "JavaScript", "TailwindCSS", "Framer Motion"]
  }
];

export const education: TimelineEntry[] = [
  {
    id: "edu-1",
    type: "education",
    title: "B.Tech Computer Science (AI)",
    organization: "Vedam School of Technology",
    location: "India",
    startDate: "2025",
    endDate: "2029",
    description: "First-year student specializing in Artificial Intelligence and Machine Learning. Learning data structures, algorithms, and building real-world projects.",
    highlights: [
      "Specializing in AI/ML",
      "Building full-stack projects",
      "Learning DSA and system design",
      "Active in coding communities"
    ]
  }
];

export const achievements: TimelineEntry[] = [
  {
    id: "ach-1",
    type: "achievement",
    title: "Hackathon Participant",
    organization: "Various Events",
    startDate: "2024",
    endDate: "2024",
    description: "Participated in hackathons to build projects under time pressure and collaborate with other developers."
  },
  {
    id: "ach-2",
    type: "project",
    title: "Launched Motif Startup",
    organization: "Self-Founded",
    startDate: "2024",
    endDate: "Present",
    description: "Founded and launched a full-stack web startup with live deployment, demonstrating entrepreneurial and technical abilities.",
    link: "https://motif-website-master.vercel.app/"
  },
  {
    id: "ach-3",
    type: "project",
    title: "Open Source Portfolio",
    organization: "GitHub",
    startDate: "2024",
    endDate: "Present",
    description: "Built and open-sourced this macOS-style portfolio, showcasing advanced React, TypeScript, and animation skills.",
    link: "https://github.com/Awaneesh03/MacOS-Recreation-main"
  }
];

// Combined timeline for easy access
export const timeline = [...experience, ...education, ...achievements];

// Combined timeline sorted by date (most recent first)
export const getFullTimeline = (): TimelineEntry[] => {
  return [...experience, ...education, ...achievements].sort((a, b) => {
    const dateA = a.endDate === 'Present' ? new Date().getFullYear() : parseInt(a.endDate);
    const dateB = b.endDate === 'Present' ? new Date().getFullYear() : parseInt(b.endDate);
    return dateB - dateA;
  });
};

// Get years of experience (for display purposes)
export const getYearsOfExperience = (): number => {
  return 1; // Honest - just started in 2024
};
