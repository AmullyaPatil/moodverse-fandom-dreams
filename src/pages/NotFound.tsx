
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center px-4">
      <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-xl max-w-md mx-auto">
        <CardContent className="text-center p-8">
          <div className="text-6xl mb-4">🌟</div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-xl font-bold mb-4 text-gray-700">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            Oops! This page seems to have wandered off to another fandom dimension. 
            Let's get you back to your fusion journey!
          </p>
          
          <div className="space-y-3">
            <Button 
              asChild 
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link to="/">
                <Heart size={18} className="mr-2" />
                Back to Fandom Fusion
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              className="w-full border-purple-200 text-purple-600 hover:bg-purple-50"
            >
              <Link to="/dashboard">
                <Home size={18} className="mr-2" />
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
