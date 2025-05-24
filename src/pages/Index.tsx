
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Heart, Image, Calendar, Search } from "lucide-react";

const Index = () => {
  const testimonials = [
    {
      name: "Sarah K.",
      fandom: "BTS Army",
      text: "This app helps me connect my daily feelings with my favorite BTS lyrics. It's like therapy but with SUGA's wisdom! 💜",
      mood: "😊"
    },
    {
      name: "Alex M.",
      fandom: "Marvel Fan",
      text: "When I'm stressed, getting a perfect Tony Stark quote recommendation just hits different. My moodboards are fire! 🔥",
      mood: "😎"
    },
    {
      name: "Luna D.",
      fandom: "Disney Lover",
      text: "Creating magical moodboards with Disney quotes and anime art is my new favorite self-care routine ✨",
      mood: "🌟"
    }
  ];

  const features = [
    {
      icon: Heart,
      title: "Mood Logging",
      description: "Track your daily emotions with our intuitive mood slider"
    },
    {
      icon: Image,
      title: "Fandom Recs",
      description: "Get personalized content from BTS, Marvel, Disney & more"
    },
    {
      icon: Calendar,
      title: "Visual Journal",
      description: "Create beautiful moodboards and digital diary entries"
    },
    {
      icon: Search,
      title: "Community",
      description: "Share and discover amazing fan content"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="font-heading font-bold text-5xl md:text-7xl mb-6 gradient-text">
              Fandom Fusion
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-4 font-medium">
              Your mood. Your fandom. Your fusion.
            </p>
            <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
              A magical digital diary where your emotions meet your favorite fandoms. 
              Log your mood and discover personalized content from BTS, Marvel, Disney, Anime, and more.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                asChild 
                className="bg-fantasy-500 hover:bg-fantasy-600 text-white px-8 py-4 text-lg hover-lift glow-on-hover"
              >
                <Link to="/auth">Get Started ✨</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                asChild 
                className="border-2 border-fantasy-300 hover:bg-fantasy-50 px-8 py-4 text-lg hover-lift"
              >
                <Link to="/auth">Log In</Link>
              </Button>
            </div>

            {/* Floating Elements */}
            <div className="hidden md:block absolute top-20 left-10 animate-float">
              <div className="text-4xl">💜</div>
            </div>
            <div className="hidden md:block absolute top-32 right-16 animate-float" style={{ animationDelay: "1s" }}>
              <div className="text-4xl">⚡</div>
            </div>
            <div className="hidden md:block absolute bottom-20 left-20 animate-float" style={{ animationDelay: "2s" }}>
              <div className="text-4xl">✨</div>
            </div>
            <div className="hidden md:block absolute bottom-32 right-10 animate-float" style={{ animationDelay: "0.5s" }}>
              <div className="text-4xl">🏰</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-12 gradient-text">
            Express Yourself Through Fandoms
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="glass-card hover-lift glow-on-hover border-0">
                  <CardContent className="p-6 text-center">
                    <div className="bg-gradient-to-r from-fantasy-400 to-dream-400 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="text-white" size={24} />
                    </div>
                    <h3 className="font-heading font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-fantasy-50 to-dream-50">
        <div className="container mx-auto">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-12 gradient-text">
            Stories from Our Community
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass-card hover-lift glow-on-hover border-0">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <span className="text-2xl mr-3">{testimonial.mood}</span>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-fantasy-600">{testimonial.fandom}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Card className="glass-card max-w-2xl mx-auto border-0">
            <CardContent className="p-8">
              <h2 className="font-heading font-bold text-3xl mb-4 gradient-text">
                Ready to Start Your Fandom Journey?
              </h2>
              <p className="text-gray-600 mb-6">
                Join thousands of fans who are already expressing their emotions through their favorite fandoms.
              </p>
              <Button 
                size="lg" 
                asChild 
                className="bg-gradient-to-r from-fantasy-500 to-dream-500 hover:from-fantasy-600 hover:to-dream-600 text-white px-8 py-4 text-lg hover-lift glow-on-hover"
              >
                <Link to="/auth">Start Your Fusion Today 🚀</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
