
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [selectedFandoms, setSelectedFandoms] = useState<string[]>([]);
  const navigate = useNavigate();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth success and redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-4">
            <Heart className="text-fantasy-500" size={32} />
            <span className="font-heading font-bold text-2xl gradient-text">Fandom Fusion</span>
          </Link>
          <h1 className="font-heading font-bold text-3xl mb-2">
            {isLogin ? "Welcome Back!" : "Join the Fusion"}
          </h1>
          <p className="text-gray-600">
            {isLogin 
              ? "Continue your fandom journey" 
              : "Start expressing your emotions through fandoms"
            }
          </p>
        </div>

        <Card className="glass-card border-0 glow-on-hover">
          <CardHeader>
            <CardTitle className="text-center">
              {isLogin ? "Sign In" : "Create Account"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    placeholder="Enter your name" 
                    className="border-fantasy-200 focus:border-fantasy-400"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email" 
                  className="border-fantasy-200 focus:border-fantasy-400"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Enter your password" 
                  className="border-fantasy-200 focus:border-fantasy-400"
                />
              </div>

              {!isLogin && (
                <div className="space-y-3">
                  <Label className="text-base font-semibold">
                    Choose Your Fandoms ✨
                  </Label>
                  <p className="text-sm text-gray-600">
                    Select all that apply - we'll personalize your experience!
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {fandoms.map((fandom) => (
                      <div 
                        key={fandom.id}
                        className={`flex items-center space-x-2 p-3 rounded-lg border-2 transition-all duration-200 hover-lift ${
                          selectedFandoms.includes(fandom.id)
                            ? "border-fantasy-400 bg-fantasy-50"
                            : "border-gray-200 hover:border-fantasy-200"
                        }`}
                      >
                        <Checkbox 
                          id={fandom.id}
                          checked={selectedFandoms.includes(fandom.id)}
                          onCheckedChange={() => handleFandomToggle(fandom.id)}
                        />
                        <span className="text-lg">{fandom.emoji}</span>
                        <Label htmlFor={fandom.id} className="text-sm font-medium cursor-pointer">
                          {fandom.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-fantasy-500 to-dream-500 hover:from-fantasy-600 hover:to-dream-600 text-white py-3 hover-lift glow-on-hover"
              >
                {isLogin ? "Sign In" : "Create My Fusion Account"} ✨
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {isLogin ? "New to Fandom Fusion? " : "Already have an account? "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-fantasy-600 hover:text-fantasy-700 font-semibold underline"
                >
                  {isLogin ? "Create an account" : "Sign in"}
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
