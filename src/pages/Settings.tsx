
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { Heart, User, Shield, LogOut, Edit } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { toast } from "sonner";

const Settings = () => {
  const { user, setUser } = useApp();
  const navigate = useNavigate();
  
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [selectedFandoms, setSelectedFandoms] = useState<string[]>(user?.fandoms || []);
  const [isPrivate, setIsPrivate] = useState(user?.isPrivate || false);
  const [newPassword, setNewPassword] = useState("");

  const fandoms = [
    { id: "bts", label: "BTS", emoji: "💜" },
    { id: "marvel", label: "Marvel", emoji: "⚡" },
    { id: "disney", label: "Disney", emoji: "🏰" },
    { id: "anime", label: "Anime", emoji: "🌸" },
    { id: "kpop", label: "K-Pop", emoji: "🎵" },
    { id: "books", label: "Books", emoji: "📚" },
    { id: "gaming", label: "Gaming", emoji: "🎮" },
    { id: "other", label: "Other", emoji: "✨" }
  ];

  const handleFandomToggle = (fandomId: string) => {
    setSelectedFandoms(prev => 
      prev.includes(fandomId) 
        ? prev.filter(id => id !== fandomId)
        : [...prev, fandomId]
    );
  };

  const handleSaveChanges = () => {
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (selectedFandoms.length === 0) {
      toast.error("Please select at least one fandom");
      return;
    }

    if (user) {
      const updatedUser = {
        ...user,
        name: name.trim(),
        email,
        fandoms: selectedFandoms,
        isPrivate
      };
      setUser(updatedUser);
      toast.success("Your settings have been saved! ✨");
    }
  };

  const handleLogout = () => {
    setUser(null);
    toast.success("You've been logged out. See you soon! 👋");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/60 backdrop-blur-sm border-b border-purple-100 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <Heart className="text-purple-500" size={28} />
            <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Fandom Fusion
            </span>
          </Link>
          
          <Link to="/dashboard">
            <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center">
            <User className="mr-3 text-purple-500" size={32} />
            Account Settings
          </h1>
          <p className="text-gray-600">
            Manage your profile and preferences
          </p>
        </div>

        <div className="space-y-6">
          {/* Profile Information */}
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-800 flex items-center">
                <Edit className="mr-2" size={20} />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-purple-200 focus:border-purple-400 bg-white/80"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-purple-200 focus:border-purple-400 bg-white/80"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">Change Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="border-purple-200 focus:border-purple-400 bg-white/80"
                />
              </div>
            </CardContent>
          </Card>

          {/* Fandom Interests */}
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-800">
                Your Fandom Interests ✨
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {fandoms.map((fandom) => (
                  <div 
                    key={fandom.id}
                    className={`flex items-center space-x-2 p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                      selectedFandoms.includes(fandom.id)
                        ? "border-purple-400 bg-purple-50"
                        : "border-gray-200 hover:border-purple-200"
                    }`}
                  >
                    <Checkbox 
                      id={fandom.id}
                      checked={selectedFandoms.includes(fandom.id)}
                      onCheckedChange={() => handleFandomToggle(fandom.id)}
                    />
                    <span className="text-lg">{fandom.emoji}</span>
                    <Label htmlFor={fandom.id} className="text-sm font-medium cursor-pointer text-gray-700">
                      {fandom.label}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-800 flex items-center">
                <Shield className="mr-2" size={20} />
                Privacy Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 p-4 rounded-lg border border-gray-200">
                <Checkbox 
                  id="private"
                  checked={isPrivate}
                  onCheckedChange={(checked) => setIsPrivate(checked as boolean)}
                />
                <Label htmlFor="private" className="text-gray-700 cursor-pointer">
                  Make all my content private (journals and moodboards won't be visible to others)
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleSaveChanges}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-full"
            >
              Save Changes
            </Button>
            
            <Button 
              onClick={handleLogout}
              variant="outline" 
              className="border-red-200 text-red-600 hover:bg-red-50 px-8 py-3 rounded-full"
            >
              <LogOut className="mr-2" size={18} />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
