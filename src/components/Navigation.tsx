import { useState } from "react";
import { Home, BookOpen, Building2, Target, Trophy, MessageSquare, Zap, User } from "lucide-react";

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  userRole?: "student" | "teacher" | "admin";
}

const Navigation = ({ currentPage, onPageChange, userRole = "student" }: NavigationProps) => {
  const navigationItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "levels", label: "Levels", icon: BookOpen },
    { id: "city", label: "City", icon: Building2 },
    { id: "quests", label: "Quests", icon: Target },
    { id: "achievements", label: "Badges", icon: Trophy },
    { id: "forum", label: "Forum", icon: MessageSquare },
    { id: "competitions", label: "Compete", icon: Zap },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="bg-card border-b-4 border-pixel-forest p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-pixel text-xl text-pixel-forest">
            🌱 THE GREEN PATH
          </h1>
          <div className="font-pixel text-xs text-muted-foreground">
            {userRole.toUpperCase()}
          </div>
        </div>
        
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
          {navigationItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onPageChange(id)}
              className={`nav-pixel flex flex-col items-center gap-1 p-2 ${
                currentPage === id ? "bg-primary text-primary-foreground" : ""
              }`}
            >
              <Icon size={16} className="img-pixel" />
              <span className="text-[10px] hidden sm:block">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;