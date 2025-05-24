
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Heart, Sparkles, BookOpen, Palette } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Heart,
      title: "Log Your Feelings",
      description: "Track your daily mood with our intuitive emoji-based system"
    },
    {
      icon: Sparkles,
      title: "Fandom Magic",
      description: "Get personalized BTS lyrics, Marvel quotes, and Disney moments"
    },
    {
      icon: Palette,
      title: "Create Moodboards",
      description: "Design beautiful visual diaries with your favorite fandom content"
    }
  ];

  const sampleMoodboards = [
    { mood: "💜", title: "BTS Comfort Day", author: "ARMY_Luna" },
    { mood: "⚡", title: "Marvel Energy", author: "MarvelFan23" },
    { mood: "🏰", title: "Disney Dreams", author: "DisneyMagic" },
    { mood: "🌸", title: "Anime Vibes", author: "OtakuLife" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Heart className="text-purple-500 mr-3" size={48} />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              Fandom Fusion
            </h1>
          </div>
          
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">
            Your Mood. Your Fandom. Your Fusion.
          </h2>
          
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            A magical digital diary where your daily emotions meet your favorite fandoms. 
            Get personalized BTS lyrics, Marvel quotes, Disney moments, and create beautiful moodboards.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link to="/auth">
                <Sparkles className="mr-2" size={20} />
                Get Started
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              className="border-purple-300 text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-full text-lg"
            >
              <Link to="/auth">
                Log In
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Feel it. Fuse it. Fandom it. ✨
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="text-white" size={32} />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-3">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community Preview */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Join Our Fandom Community 💜
          </h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sampleMoodboards.map((board, index) => (
              <Card key={index} className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg mb-4 flex items-center justify-center text-4xl">
                    {board.mood}
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-1">
                    {board.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    by {board.author}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">
            Ready to Start Your Fusion Journey?
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of fans who express their emotions through their favorite fandoms every day.
          </p>
          <Button 
            asChild 
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-12 py-4 rounded-full text-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Link to="/auth">
              <Heart className="mr-2" size={24} />
              Join Fandom Fusion
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/20 backdrop-blur-sm border-t border-purple-100 px-4 py-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <Heart className="text-purple-500 mr-2" size={24} />
            <span className="text-lg font-semibold text-gray-800">Fandom Fusion</span>
          </div>
          <p className="text-gray-600 text-sm">
            © 2024 Fandom Fusion. Made with 💜 for fans everywhere.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
