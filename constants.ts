export const ASSETS = {
  APPLE_LOGO: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsdHBmGXto7DZMWqJ_WGa6NAuulK9JXjrnGw&s',
  BOOT_PROGRESS_BG: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2560&auto=format&fit=crop',
  LOGIN_AVATAR: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Awaneesh&backgroundColor=b6e3f4',
  WALLPAPER: 'https://images.unsplash.com/photo-1726084606622-49162464736f?q=80&w=2560&auto=format&fit=crop',
  PROFILE_IMAGE: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Awaneesh&backgroundColor=b6e3f4',
  RESUME_URL: '/resume.pdf',
};

export const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY || '';
export const DEFAULT_CITY = 'Pune';
export const GITHUB_USERNAME = 'Awaneesh03';

export const USER_NAME = "Awaneesh";

// Browser Keys (NEW - for keyboard shortcuts consistency)
export const BROWSER_SHORTCUT_KEYS = {
  FOCUS_URL: 'l',
  RELOAD: 'r',
  NEW_TAB: 't',
  CLOSE_TAB: 'w',
  BACK: '[',
  FORWARD: ']',
  HOME: 'h',
} as const;

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
};

