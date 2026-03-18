/**
 * Skills Configuration
 * Honest skill levels for a B.Tech freshman (2025)
 */

export interface Skill {
  name: string;
  level: number; // 0-100 (honest assessment)
  icon: string;
  color: string;
}

export interface SkillCategory {
  name: string;
  icon: string;
  color: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Frontend",
    icon: "🖥️",
    color: "#3B82F6", // blue
    skills: [
      { name: "HTML/CSS", level: 85, icon: "🌐", color: "#E34F26" },
      { name: "JavaScript", level: 75, icon: "⚡", color: "#F7DF1E" },
      { name: "React", level: 70, icon: "⚛️", color: "#61DAFB" },
      { name: "TypeScript", level: 65, icon: "🔷", color: "#3178C6" },
      { name: "TailwindCSS", level: 75, icon: "🎨", color: "#06B6D4" },
      { name: "Framer Motion", level: 60, icon: "✨", color: "#FF0055" },
    ]
  },
  {
    name: "Backend",
    icon: "⚙️",
    color: "#10B981", // green
    skills: [
      { name: "Java", level: 70, icon: "☕", color: "#ED8B00" },
      { name: "Node.js", level: 60, icon: "🟢", color: "#339933" },
      { name: "Python", level: 55, icon: "🐍", color: "#3776AB" },
      { name: "REST APIs", level: 65, icon: "🔗", color: "#FF6C37" },
      { name: "Spring Boot", level: 50, icon: "🍃", color: "#6DB33F" },
    ]
  },
  {
    name: "Tools & DevOps",
    icon: "🔧",
    color: "#F59E0B", // amber
    skills: [
      { name: "Git", level: 75, icon: "📦", color: "#F05032" },
      { name: "VS Code", level: 90, icon: "💻", color: "#007ACC" },
      { name: "Vercel", level: 70, icon: "▲", color: "#888888" },
      { name: "GitHub", level: 80, icon: "🐙", color: "#6E7681" },
      { name: "Linux", level: 50, icon: "🐧", color: "#FCC624" },
    ]
  },
  {
    name: "Currently Learning",
    icon: "📚",
    color: "#8B5CF6", // purple
    skills: [
      { name: "Data Structures", level: 60, icon: "🏗️", color: "#FF6B6B" },
      { name: "Algorithms", level: 55, icon: "🧮", color: "#4ECDC4" },
      { name: "AI/ML Basics", level: 40, icon: "🤖", color: "#9B59B6" },
      { name: "System Design", level: 35, icon: "📐", color: "#3498DB" },
      { name: "Spring Boot", level: 50, icon: "🍃", color: "#6DB33F" },
    ]
  }
];

// Helper function to get all skills as a flat array
export const getAllSkills = (): Skill[] => {
  return skillCategories.flatMap(category => category.skills);
};

// Helper function to get total skill count
export const getSkillCount = (): number => {
  return getAllSkills().length;
};

// Helper function to get top skills
export const getTopSkills = (count: number = 5): Skill[] => {
  return getAllSkills()
    .sort((a, b) => b.level - a.level)
    .slice(0, count);
};
