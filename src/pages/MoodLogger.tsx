
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Sparkles, ArrowLeft } from "lucide-react";

const MoodLogger = () => {
  const [mood, setMood] = useState(3);
  const [journalEntry, setJournalEntry] = useState("");
  const navigate = useNavigate();

  const moods = [
    { emoji: "😢", label: "Sad", value: 1 },
    { emoji: "😐", label: "Neutral", value: 2 },
    { emoji: "😊", label: "Happy", value: 3 },
    { emoji: "😍", label: "Euphoric", value: 4 },
  ];

  const generateFusion = () => {
    // Navigate to dashboard with state to show recommendations
    navigate("/dashboard", { state: { showRecommendations: true, mood, entry: journalEntry } });
  };

  const saveEntry = () => {
    // Save entry logic
    console.log("Saving entry:", { mood, journalEntry });
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
        <div className="space-y-4">
          <Button 
            onClick={generateFusion}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-4 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Sparkles className="mr-2" size={20} />
            Generate My Fandom Fusion
          </Button>

          <Button 
            onClick={saveEntry}
            variant="outline"
            className="w-full border-purple-200 text-purple-600 hover:bg-purple-50 py-3 rounded-full text-lg"
          >
            Save My Entry
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MoodLogger;
