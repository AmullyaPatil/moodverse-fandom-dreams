
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="glass-card border-0 max-w-md mx-auto">
        <CardContent className="text-center p-8">
          <div className="text-6xl mb-4">🌟</div>
          <h1 className="font-heading font-bold text-4xl mb-2 gradient-text">404</h1>
          <h2 className="font-heading font-bold text-xl mb-4 text-gray-700">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            Oops! This page seems to have wandered off to another fandom dimension. 
            Let's get you back to your fusion journey!
          </p>
          
          <div className="space-y-3">
            <Button 
              asChild 
              className="w-full bg-gradient-to-r from-fantasy-500 to-dream-500 hover:from-fantasy-600 hover:to-dream-600 text-white hover-lift glow-on-hover"
            >
              <Link to="/">
                <Heart size={18} className="mr-2" />
                Back to Fandom Fusion
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              className="w-full hover-lift"
            >
              <Link to="/dashboard">
                Go to Dashboard
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
