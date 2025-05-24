import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Heart, Sparkles, Music, Quote, Castle, BookOpen, Calendar, Palette } from "lucide-react";

const Dashboard = () => {
  const [mood, setMood] = useState(3);
  const [journalEntry, setJournalEntry] = useState("");
  const [showRecommendations, setShowRecommendations] = useState(false);

  const moods = [
    { emoji: "😢", label: "Sad", value: 1 },
    { emoji: "😐", label: "Neutral", value: 2 },
    { emoji: "😊", label: "Happy", value: 3 },
    { emoji: "😍", label: "Euphoric", value: 4 },
  ];

  const generateFusion = () => {
    setShowRecommendations(true);
  };

  const recommendations = {
    bts: {
      song: "Spring Day",
      lyrics: "You know it all, you're my best friend, the morning will come again",
      message: "Perfect for reflection and hope 💜"
    },
    marvel: {
      quote: "I can do this all day.",
      character: "Steve Rogers",
      message: "Channel that determination energy ⚡"
    },
    disney: {
      movie: "Moana",
      quote: "The ocean chose you for a reason",
      message: "Trust in your journey 🌊"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/60 backdrop-blur-sm border-b border-purple-100 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="text-purple-500" size={28} />
            <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Fandom Fusion
            </span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/moodboard">
              <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                <Palette className="mr-2" size={16} />
                Moodboard
              </Button>
            </Link>
            <Link to="/journal">
              <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                <Calendar className="mr-2" size={16} />
                Journal
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-6">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            How are you feeling today? ✨
          </h1>
          <p className="text-gray-600">
            Share your mood and let us create the perfect fandom fusion for you
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Link to="/mood">
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-3">😊</div>
                <h3 className="font-semibold text-gray-800 mb-2">Log Mood</h3>
                <p className="text-sm text-gray-600">Track how you feel today</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/journal">
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-3">📚</div>
                <h3 className="font-semibold text-gray-800 mb-2">View Journal</h3>
                <p className="text-sm text-gray-600">Read past entries</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/moodboard">
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-3">🎨</div>
                <h3 className="font-semibold text-gray-800 mb-2">Create Moodboard</h3>
                <p className="text-sm text-gray-600">Design your feelings</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/community">
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-3">🌍</div>
                <h3 className="font-semibold text-gray-800 mb-2">Visit Community</h3>
                <p className="text-sm text-gray-600">Explore fan creations</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Mood Selection */}
        <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="text-center text-gray-800">Select Your Mood</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center space-x-6 mb-6">
              {moods.map((moodOption) => (
                <button
                  key={moodOption.value}
                  onClick={() => setMood(moodOption.value)}
                  className={`flex flex-col items-center p-4 rounded-xl transition-all duration-300 ${
                    mood === moodOption.value
                      ? "bg-purple-100 border-2 border-purple-400 transform scale-110"
                      : "bg-white/50 border-2 border-gray-200 hover:bg-purple-50"
                  }`}
                >
                  <span className="text-3xl mb-2">{moodOption.emoji}</span>
                  <span className="text-sm font-medium text-gray-700">{moodOption.label}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Journal Entry */}
        <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="text-gray-800">What's on your mind?</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Share your thoughts, feelings, or what happened today..."
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
              className="min-h-[120px] border-purple-200 focus:border-purple-400 bg-white/80"
            />
          </CardContent>
        </Card>

        {/* Generate Button */}
        <div className="text-center mb-8">
          <Button 
            onClick={generateFusion}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Sparkles className="mr-2" size={20} />
            Generate My Fandom Fusion
          </Button>
        </div>

        {/* Recommendations */}
        {showRecommendations && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Your Personalized Fandom Fusion 💜
            </h2>

            {/* BTS Recommendation */}
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-600">
                  <Music className="mr-2" size={24} />
                  BTS Song for You
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-800">{recommendations.bts.song}</h3>
                  <p className="text-gray-600 italic">"{recommendations.bts.lyrics}"</p>
                  <Badge className="bg-purple-100 text-purple-700">{recommendations.bts.message}</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Marvel Recommendation */}
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-600">
                  <Quote className="mr-2" size={24} />
                  Marvel Inspiration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-lg text-gray-800">"{recommendations.marvel.quote}"</p>
                  <p className="text-gray-600">- {recommendations.marvel.character}</p>
                  <Badge className="bg-blue-100 text-blue-700">{recommendations.marvel.message}</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Disney Recommendation */}
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-pink-600">
                  <Castle className="mr-2" size={24} />
                  Disney Magic
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-800">{recommendations.disney.movie}</h3>
                  <p className="text-gray-600 italic">"{recommendations.disney.quote}"</p>
                  <Badge className="bg-pink-100 text-pink-700">{recommendations.disney.message}</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="text-center">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-full">
                <BookOpen className="mr-2" size={18} />
                Save to Journal
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
