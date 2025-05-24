
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import Navigation from "@/components/Navigation";
import { Heart, Plus, BookOpen } from "lucide-react";

const Dashboard = () => {
  const [mood, setMood] = useState([3]);
  const [journalEntry, setJournalEntry] = useState("");
  const [showRecommendations, setShowRecommendations] = useState(false);

  const moodEmojis = ["😢", "😔", "😐", "🙂", "😊"];
  const moodLabels = ["Very Sad", "Sad", "Neutral", "Happy", "Very Happy"];

  const recommendations = [
    {
      type: "BTS",
      title: "Spring Day - BTS",
      description: "A beautiful song about missing someone and hope for reunion",
      content: "\"How much longing should fall like snow for the spring days to come?\"",
      color: "from-purple-400 to-pink-400"
    },
    {
      type: "Marvel",
      title: "Tony Stark Quote",
      description: "Inspirational wisdom from Iron Man",
      content: "\"Sometimes you gotta run before you can walk.\"",
      color: "from-red-400 to-yellow-400"
    },
    {
      type: "Disney",
      title: "Moana - Know Who You Are",
      description: "A reminder of inner strength and identity",
      content: "\"See the light as it shines on the sea? It's blinding, but no one knows how deep it goes.\"",
      color: "from-blue-400 to-teal-400"
    }
  ];

  const handleGenerateFusion = () => {
    setShowRecommendations(true);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Navigation />
        
        <div className="text-center mb-8">
          <h1 className="font-heading font-bold text-4xl mb-2 gradient-text">
            Today's Mood Log
          </h1>
          <p className="text-gray-600">
            How are you feeling? Let's find the perfect fandom content for your mood ✨
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Mood Input Section */}
          <Card className="glass-card border-0 hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="text-fantasy-500" size={24} />
                <span>Mood Check-In</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Mood Slider */}
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-6xl mb-2">{moodEmojis[mood[0]]}</div>
                  <p className="font-semibold text-lg text-fantasy-600">
                    {moodLabels[mood[0]]}
                  </p>
                </div>
                
                <Slider
                  value={mood}
                  onValueChange={setMood}
                  max={4}
                  min={0}
                  step={1}
                  className="w-full"
                />
                
                <div className="flex justify-between text-sm text-gray-500">
                  {moodEmojis.map((emoji, index) => (
                    <span key={index} className="text-lg">{emoji}</span>
                  ))}
                </div>
              </div>

              {/* Journal Entry */}
              <div className="space-y-2">
                <label className="font-semibold text-gray-700">
                  What's on your mind today?
                </label>
                <Textarea
                  value={journalEntry}
                  onChange={(e) => setJournalEntry(e.target.value)}
                  placeholder="Share your thoughts, feelings, or what happened today..."
                  className="min-h-[120px] border-fantasy-200 focus:border-fantasy-400 resize-none"
                />
              </div>

              {/* Generate Button */}
              <Button
                onClick={handleGenerateFusion}
                className="w-full bg-gradient-to-r from-fantasy-500 to-dream-500 hover:from-fantasy-600 hover:to-dream-600 text-white py-3 hover-lift glow-on-hover"
                size="lg"
              >
                Generate My Fandom Fusion ✨
              </Button>
            </CardContent>
          </Card>

          {/* Recommendations Section */}
          <div className="space-y-6">
            {showRecommendations ? (
              <>
                <div className="text-center">
                  <h2 className="font-heading font-bold text-2xl mb-2 gradient-text">
                    Your Personalized Fusion
                  </h2>
                  <p className="text-gray-600">
                    Content curated just for your current mood
                  </p>
                </div>

                {recommendations.map((rec, index) => (
                  <Card key={index} className="glass-card border-0 hover-lift glow-on-hover">
                    <CardContent className="p-6">
                      <div className={`bg-gradient-to-r ${rec.color} text-white p-4 rounded-lg mb-4`}>
                        <h3 className="font-bold text-lg">{rec.type}</h3>
                        <h4 className="font-semibold">{rec.title}</h4>
                        <p className="text-sm opacity-90">{rec.description}</p>
                      </div>
                      
                      <blockquote className="italic text-gray-700 border-l-4 border-fantasy-300 pl-4 mb-4">
                        {rec.content}
                      </blockquote>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1 hover-lift">
                          <Plus size={16} className="mr-1" />
                          Add to Moodboard
                        </Button>
                        <Button variant="outline" size="sm" className="hover-lift">
                          <Heart size={16} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Button
                  className="w-full bg-fantasy-500 hover:bg-fantasy-600 text-white py-3 hover-lift"
                  size="lg"
                >
                  <BookOpen size={20} className="mr-2" />
                  Save Today's Entry
                </Button>
              </>
            ) : (
              <Card className="glass-card border-0 h-full flex items-center justify-center">
                <CardContent className="text-center p-8">
                  <div className="text-6xl mb-4">🌟</div>
                  <h3 className="font-heading font-bold text-xl mb-2 text-gray-600">
                    Ready for Your Fusion?
                  </h3>
                  <p className="text-gray-500">
                    Complete your mood check-in to get personalized fandom recommendations!
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
