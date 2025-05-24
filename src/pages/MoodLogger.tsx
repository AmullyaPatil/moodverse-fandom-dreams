
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Sparkles, ArrowLeft, BookOpen, Music, Quote, Castle } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const MoodLogger = () => {
  const [mood, setMood] = useState(3);
  const [journalEntry, setJournalEntry] = useState("");
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [recommendations, setRecommendations] = useState<any>(null);
  const navigate = useNavigate();
  const { addMoodEntry, user } = useApp();

  const moods = [
    { emoji: "😢", label: "Sad", value: 1 },
    { emoji: "😐", label: "Neutral", value: 2 },
    { emoji: "😊", label: "Happy", value: 3 },
    { emoji: "😍", label: "Euphoric", value: 4 },
  ];

  const generateRecommendations = (moodValue: number) => {
    const moodRecommendations = {
      1: { // Sad
        bts: {
          song: "Spring Day",
          lyrics: "You know it all, you're my best friend, the morning will come again",
          message: "Comfort for difficult times 💜"
        },
        marvel: {
          quote: "Sometimes you gotta run before you can walk.",
          character: "Tony Stark",
          message: "Small steps toward healing ⚡"
        },
        disney: {
          movie: "Inside Out",
          quote: "Crying helps me slow down and obsess over the weight of life's problems",
          message: "It's okay to feel sad sometimes 🌊"
        }
      },
      2: { // Neutral
        bts: {
          song: "Mikrokosmos",
          lyrics: "We shine in our own way, all of us are precious",
          message: "Finding your sparkle 💜"
        },
        marvel: {
          quote: "I can do this all day.",
          character: "Steve Rogers",
          message: "Steady determination ⚡"
        },
        disney: {
          movie: "Moana",
          quote: "The ocean chose you for a reason",
          message: "Trust in your journey 🌊"
        }
      },
      3: { // Happy
        bts: {
          song: "Dynamite",
          lyrics: "Cause I-I-I'm in the stars tonight, so watch me bring the fire",
          message: "Shining bright like a diamond 💜"
        },
        marvel: {
          quote: "I am Iron Man.",
          character: "Tony Stark",
          message: "Confidence and power ⚡"
        },
        disney: {
          movie: "The Lion King",
          quote: "Hakuna Matata! What a wonderful phrase",
          message: "No worries, be happy 🦁"
        }
      },
      4: { // Euphoric
        bts: {
          song: "Euphoria",
          lyrics: "You are the cause of my euphoria",
          message: "Pure bliss and joy 💜"
        },
        marvel: {
          quote: "I am inevitable.",
          character: "Thanos (but in a good way!)",
          message: "Unstoppable positive energy ⚡"
        },
        disney: {
          movie: "Frozen",
          quote: "Let it go, let it go! Can't hold it back anymore",
          message: "Freedom and pure joy ❄️"
        }
      }
    };

    return moodRecommendations[moodValue as keyof typeof moodRecommendations];
  };

  const generateFusion = () => {
    if (!journalEntry.trim()) {
      toast.error("Please write something about how you feel!");
      return;
    }

    const recs = generateRecommendations(mood);
    setRecommendations(recs);
    setShowRecommendations(true);
    toast.success("Your fandom fusion is ready! ✨");
  };

  const saveEntry = () => {
    if (!journalEntry.trim()) {
      toast.error("Please write something about how you feel!");
      return;
    }

    const selectedMood = moods.find(m => m.value === mood);
    const entry = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString().split('T')[0],
      mood,
      moodEmoji: selectedMood?.emoji || "😊",
      journalEntry,
      recommendations: recommendations || undefined
    };

    addMoodEntry(entry);
    toast.success("Your mood entry has been saved! 💜");
    navigate("/dashboard");
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
              <ArrowLeft className="mr-2" size={16} />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            How are you feeling today? ✨
          </h1>
          <p className="text-gray-600">
            Share your emotions and let the fandom magic begin
          </p>
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
                  className={`flex flex-col items-center p-6 rounded-xl transition-all duration-300 ${
                    mood === moodOption.value
                      ? "bg-purple-100 border-2 border-purple-400 transform scale-110 shadow-lg"
                      : "bg-white/50 border-2 border-gray-200 hover:bg-purple-50 hover:scale-105"
                  }`}
                >
                  <span className="text-4xl mb-2">{moodOption.emoji}</span>
                  <span className="text-sm font-medium text-gray-700">{moodOption.label}</span>
                </button>
              ))}
            </div>

            {/* Mood Slider */}
            <div className="px-4">
              <input
                type="range"
                min="1"
                max="4"
                value={mood}
                onChange={(e) => setMood(Number(e.target.value))}
                className="w-full h-2 bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>Sad</span>
                <span>Neutral</span>
                <span>Happy</span>
                <span>Euphoric</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Journal Entry */}
        <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="text-gray-800">Write how you feel today...</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Share your thoughts, feelings, or what happened today. The more you share, the better we can create your perfect fandom fusion! ✨"
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
              className="min-h-[150px] border-purple-200 focus:border-purple-400 bg-white/80 text-base"
            />
          </CardContent>
        </Card>

        {/* Action Buttons */}
        {!showRecommendations ? (
          <div className="space-y-4">
            <Button 
              onClick={generateFusion}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-4 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Sparkles className="mr-2" size={20} />
              Generate My Fandom Fusion
            </Button>
          </div>
        ) : (
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
              <Button 
                onClick={saveEntry}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-full text-lg"
              >
                <BookOpen className="mr-2" size={18} />
                Save My Fusion Entry
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodLogger;
