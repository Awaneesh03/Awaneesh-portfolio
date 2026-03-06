/**
 * Profile Configuration
 * Update this file with your personal information
 */

export interface Education {
  degree: string;
  institution: string;
  year: string;
  location: string;
  gpa?: string;
  description?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  url?: string;
}

export interface ProfileData {
  name: string;
  title: string;
  location: string;
  tagline: string;
  bio: string;
  email: string;
  avatar: string;
  resume: string;
  education: Education[];
  certifications: Certification[];
}

export const profileData: ProfileData = {
  name: "Awaneesh",
  title: "Full Stack Developer",
  location: "Pune, India",
  tagline: "Building beautiful, performant web experiences",
  bio: "I build full-stack applications and interactive web experiences using modern technologies like React, TypeScript, and Python. Passionate about creating intuitive user interfaces and solving complex problems with elegant solutions.",
  email: "kg3327949@gmail.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Awaneesh&backgroundColor=b6e3f4",
  resume: "/resume.pdf",
  education: [
    {
      degree: "B.Tech Computer Science (AI)",
      institution: "Vedam School of Technology",
      year: "2025 – 2029",
      location: "Pune, India",
      description: "Specializing in Artificial Intelligence and Machine Learning"
    }
  ],
  certifications: [
    // Add any certifications you have:
    // - Coursera certificates
    // - freeCodeCamp certifications
    // - HackerRank badges
    // - LinkedIn Learning courses
    // - Udemy certificates
    //
    // Example:
    // { name: "Responsive Web Design", issuer: "freeCodeCamp", year: "2025" },
    // { name: "JavaScript Algorithms", issuer: "freeCodeCamp", year: "2025" },
  ]
};
