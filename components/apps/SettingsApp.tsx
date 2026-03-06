
import React, { useState } from 'react';
import { 
  Wifi, Bluetooth, Globe, Battery, Settings, Accessibility, 
  Monitor, Search, Bell, Volume2, Moon, Clock, Lock, 
  Fingerprint, Users, CreditCard, Keyboard, 
  MousePointer, Printer, Coffee, Info, RefreshCw, 
  HardDrive, Award, Radio, Key, Languages, List, 
  Share2, Disc, Timer, ShieldCheck, ArrowRightLeft,
  ChevronRight, Laptop, Smartphone, Layout, Image as ImageIcon,
  Hourglass, Shield, UserCircle, Wallet
} from 'lucide-react';
import { ASSETS, USER_NAME } from '../../constants';

// Sidebar Item Type
interface SidebarItem {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
  notification?: number;
}

interface SettingRowProps {
  label: string;
  icon: React.ElementType;
  iconBg: string;
}

export const SettingsApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock Sidebar Data matching macOS structure
  const sidebarItems: SidebarItem[] = [
    { id: 'wifi', label: 'Wi-Fi', icon: Wifi, color: 'bg-blue-500' },
    { id: 'bluetooth', label: 'Bluetooth', icon: Bluetooth, color: 'bg-blue-500' },
    { id: 'network', label: 'Network', icon: Globe, color: 'bg-blue-500' },
    { id: 'battery', label: 'Battery', icon: Battery, color: 'bg-green-500' },
    { id: 'general', label: 'General', icon: Settings, color: 'bg-gray-500' },
    { id: 'accessibility', label: 'Accessibility', icon: Accessibility, color: 'bg-blue-500' },
    { id: 'appearance', label: 'Appearance', icon: Moon, color: 'bg-gray-400' },
    { id: 'menubar', label: 'Menu Bar', icon: Layout, color: 'bg-gray-400' },
    { id: 'desktop', label: 'Desktop & Dock', icon: Layout, color: 'bg-gray-400' },
    { id: 'displays', label: 'Displays', icon: Monitor, color: 'bg-blue-500' },
    { id: 'spotlight', label: 'Spotlight', icon: Search, color: 'bg-gray-400' },
    { id: 'wallpaper', label: 'Wallpaper', icon: ImageIcon, color: 'bg-cyan-500' },
    { id: 'notifications', label: 'Notifications', icon: Bell, color: 'bg-red-500' },
    { id: 'sound', label: 'Sound', icon: Volume2, color: 'bg-red-500' },
    { id: 'focus', label: 'Focus', icon: Moon, color: 'bg-indigo-500' },
    { id: 'screentime', label: 'Screen Time', icon: Hourglass, color: 'bg-indigo-500' },
    { id: 'lockscreen', label: 'Lock Screen', icon: Lock, color: 'bg-gray-400' },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield, color: 'bg-blue-500' },
    { id: 'touchid', label: 'Touch ID & Password', icon: Fingerprint, color: 'bg-gray-400' },
    { id: 'users', label: 'Users & Groups', icon: Users, color: 'bg-gray-400' },
    { id: 'wallet', label: 'Wallet & Apple Pay', icon: Wallet, color: 'bg-black' },
    { id: 'keyboard', label: 'Keyboard', icon: Keyboard, color: 'bg-gray-400' },
    { id: 'trackpad', label: 'Trackpad', icon: MousePointer, color: 'bg-gray-400' },
    { id: 'printers', label: 'Printers & Scanners', icon: Printer, color: 'bg-gray-400' },
    { id: 'java', label: 'Java', icon: Coffee, color: 'bg-red-600' },
  ];

  const renderGeneralContent = () => (
    <div className="flex flex-col gap-5 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col items-center justify-center pt-2 pb-6">
          <div className="w-16 h-16 mb-3">
            <img src="https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/ee1d55d2024ec98f4e4859017e95cf36_uB4FckQwO2.png" alt="General" className="w-full h-full object-contain drop-shadow-xl" />
          </div>
          <h1 className="text-2xl font-semibold">General</h1>
          <p className="text-center text-gray-400 text-sm max-w-md mt-1">
            Manage your overall setup and preferences for Mac, such as software updates, device language, AirDrop and more.
          </p>
      </div>

      {/* Groups */}
      <div className="flex flex-col gap-4">
        {/* Group 1 */}
        <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
             <SettingRow label="About" icon={Laptop} iconBg="bg-gray-400" />
             <div className="ml-12 h-[1px] bg-white/5" />
             <SettingRow label="Software Update" icon={RefreshCw} iconBg="bg-gray-400" />
             <div className="ml-12 h-[1px] bg-white/5" />
             <SettingRow label="Storage" icon={HardDrive} iconBg="bg-gray-400" />
        </div>

        {/* Group 2 */}
        <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
            <SettingRow label="AppleCare & Warranty" icon={Award} iconBg="bg-red-500" />
        </div>

        {/* Group 3 */}
        <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
             <SettingRow label="AirDrop & Handoff" icon={Radio} iconBg="bg-blue-500" />
             <div className="ml-12 h-[1px] bg-white/5" />
             <SettingRow label="AutoFill & Passwords" icon={Key} iconBg="bg-gray-500" />
             <div className="ml-12 h-[1px] bg-white/5" />
             <SettingRow label="Date & Time" icon={Clock} iconBg="bg-red-500" />
             <div className="ml-12 h-[1px] bg-white/5" />
             <SettingRow label="Language & Region" icon={Languages} iconBg="bg-blue-500" />
             <div className="ml-12 h-[1px] bg-white/5" />
             <SettingRow label="Login Items & Extensions" icon={List} iconBg="bg-gray-500" />
             <div className="ml-12 h-[1px] bg-white/5" />
             <SettingRow label="Sharing" icon={Share2} iconBg="bg-blue-500" />
             <div className="ml-12 h-[1px] bg-white/5" />
             <SettingRow label="Startup Disk" icon={Disc} iconBg="bg-gray-500" />
             <div className="ml-12 h-[1px] bg-white/5" />
             <SettingRow label="Time Machine" icon={Timer} iconBg="bg-green-500" />
             <div className="ml-12 h-[1px] bg-white/5" />
             <SettingRow label="Device Management" icon={ShieldCheck} iconBg="bg-gray-500" />
             <div className="ml-12 h-[1px] bg-white/5" />
             <SettingRow label="Transfer or Reset" icon={ArrowRightLeft} iconBg="bg-blue-500" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-full bg-[#1e1e1e] text-[#E6E6E6] font-sans text-[13px]">
      {/* Sidebar */}
      <div className="w-[240px] flex-shrink-0 flex flex-col bg-black/20 border-r border-white/10 h-full">
         {/* Header Section */}
         <div className="p-4 pb-2 flex flex-col gap-4">
            {/* Search Input */}
            <div className="relative">
                <Search className="absolute left-2.5 top-1.5 text-gray-500 w-4 h-4" />
                <input 
                    type="text" 
                    placeholder="Search" 
                    className="w-full bg-[#1e1e1e] border border-transparent focus:border-white/20 rounded-[6px] py-1 pl-8 pr-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* User Profile Card */}
            <div className="flex items-center gap-3 px-1 group cursor-pointer">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10">
                    <img src={ASSETS.LOGIN_AVATAR} alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col overflow-hidden">
                    <span className="font-bold text-sm truncate text-white">{USER_NAME}</span>
                    <span className="text-xs text-gray-400 truncate">Apple Account</span>
                </div>
            </div>
         </div>

         {/* Scrollable Sidebar List */}
         <div className="flex-1 overflow-y-auto custom-scrollbar px-3 pb-4 space-y-[1px]">
             {/* Software Update Banner mockup */}
             <div className="flex items-center justify-between px-2 py-2 mb-2">
                 <span className="font-medium text-white">Software Update Available</span>
                 <div className="bg-red-500 text-white text-[10px] font-bold px-1.5 rounded-full min-w-[18px] h-[18px] flex items-center justify-center">1</div>
             </div>

             {sidebarItems.map((item) => (
                 <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`
                        w-full flex items-center gap-3 px-2.5 py-1.5 rounded-[6px] transition-colors text-left group
                        ${activeTab === item.id ? 'bg-[#007AFF] text-white' : 'text-gray-300 hover:bg-white/5'}
                    `}
                 >
                    <div className={`w-5 h-5 rounded-[5px] flex items-center justify-center ${item.color} shadow-sm`}>
                        <item.icon size={12} className="text-white" />
                    </div>
                    <span className="font-medium tracking-wide truncate">{item.label}</span>
                 </button>
             ))}
         </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 h-full overflow-y-auto custom-scrollbar bg-transparent">
         <div className="p-8 pb-12 min-h-full">
             {activeTab === 'general' ? renderGeneralContent() : (
                 <div className="flex items-center justify-center h-full text-gray-500">
                     <span className="text-lg">Settings for {sidebarItems.find(i => i.id === activeTab)?.label}</span>
                 </div>
             )}
         </div>
      </div>
    </div>
  );
};

const SettingRow: React.FC<SettingRowProps> = ({ label, icon: Icon, iconBg }) => (
    <div className="h-[44px] px-4 flex items-center justify-between hover:bg-white/5 cursor-default group transition-colors">
        <div className="flex items-center gap-3">
            <div className={`w-6 h-6 rounded-[5px] flex items-center justify-center ${iconBg} shadow-sm`}>
                <Icon size={14} className="text-white" />
            </div>
            <span className="text-[13px] font-medium text-white/90">{label}</span>
        </div>
        <ChevronRight size={14} className="text-gray-500 opacity-70 group-hover:opacity-100" />
    </div>
);
