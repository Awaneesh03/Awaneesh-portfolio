/**
 * Social Links Configuration
 * Update with your social media and contact links
 */

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string;
  username?: string;
  color?: string;
}

export const socialLinks: SocialLink[] = [
  {
    id: "github",
    name: "GitHub",
    url: "https://github.com/Awaneesh03",
    icon: "Github",
    username: "Awaneesh03",
    color: "#181717"
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/awaneesh-gupta/",
    icon: "Linkedin",
    username: "awaneesh-gupta",
    color: "#0A66C2"
  },
  {
    id: "email",
    name: "Email",
    url: "mailto:kg3327949@gmail.com",
    icon: "Mail",
    color: "#EA4335"
  }
];

// GitHub username for API calls
export const GITHUB_USERNAME = "Awaneesh03";

// Helper to get a specific social link
export const getSocialLink = (id: string): SocialLink | undefined => {
  return socialLinks.find(link => link.id === id);
};

// Helper to get URL by ID
export const getSocialUrl = (id: string): string => {
  const link = getSocialLink(id);
  return link?.url || '#';
};

// Contact information grouped
export const contactInfo = {
  email: "kg3327949@gmail.com",
  phone: "",
  location: "Pune, India",
  timezone: "IST (UTC+5:30)",
  availability: "Open to opportunities"
};
