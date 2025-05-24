
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Calendar, Image, Search } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", label: "Mood Log", icon: Heart },
    { path: "/moodboard", label: "Moodboard", icon: Image },
    { path: "/journal", label: "Archive", icon: Calendar },
    { path: "/community", label: "Community", icon: Search },
  ];

  return (
    <nav className="glass-card p-4 mb-8">
      <div className="flex items-center justify-between">
        <Link to="/" className="font-heading font-bold text-2xl gradient-text">
          Fandom Fusion
        </Link>
        
        <div className="hidden md:flex space-x-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Button
                key={item.path}
                variant={isActive ? "default" : "ghost"}
                asChild
                className={`transition-all duration-300 hover-lift ${
                  isActive ? "bg-fantasy-500 text-white" : "hover:bg-white/20"
                }`}
              >
                <Link to={item.path} className="flex items-center space-x-2">
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              </Button>
            );
          })}
        </div>

        <div className="md:hidden flex space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Button
                key={item.path}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                asChild
                className={`transition-all duration-300 ${
                  isActive ? "bg-fantasy-500 text-white" : "hover:bg-white/20"
                }`}
              >
                <Link to={item.path}>
                  <Icon size={16} />
                </Link>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
