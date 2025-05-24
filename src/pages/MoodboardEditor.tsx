
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Heart, Save, Sparkles, Upload, Palette, Type, Image } from "lucide-react";

const MoodboardEditor = () => {
  const [boardTitle, setBoardTitle] = useState("");
  const [selectedMood, setSelectedMood] = useState("💜");

  const moods = ["💜", "⚡", "🏰", "🌸", "✨", "🌙", "🌈", "💫"];
  
  const stickers = [
    "💜", "⚡", "🏰", "🌸", "✨", "🌙", "🌈", "💫",
    "🎵", "📚", "🎮", "💖", "🌟", "🦋", "🌺", "🍃"
  ];

  const quotes = [
    "I purple you 💜",
    "With great power...",
    "Dreams do come true",
    "Believe in yourself",
    "You are enough",
    "Chase your dreams"
  ];

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
          
          <div className="flex items-center space-x-4">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
              <Save className="mr-2" size={16} />
              Save Moodboard
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Tools Panel */}
          <div className="lg:col-span-1 space-y-4">
            {/* Board Settings */}
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-800 flex items-center">
                  <Palette className="mr-2" size={20} />
                  Board Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Board Title
                  </label>
                  <Input
                    placeholder="My Amazing Moodboard"
                    value={boardTitle}
                    onChange={(e) => setBoardTitle(e.target.value)}
                    className="border-purple-200 focus:border-purple-400 bg-white/80"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Mood Theme
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {moods.map((mood) => (
                      <button
                        key={mood}
                        onClick={() => setSelectedMood(mood)}
                        className={`text-2xl p-2 rounded-lg transition-all ${
                          selectedMood === mood
                            ? "bg-purple-100 border-2 border-purple-400"
                            : "bg-white/50 border-2 border-gray-200 hover:bg-purple-50"
                        }`}
                      >
                        {mood}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stickers */}
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-800 flex items-center">
                  <Sparkles className="mr-2" size={20} />
                  Stickers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-2">
                  {stickers.map((sticker, index) => (
                    <button
                      key={index}
                      className="text-2xl p-2 rounded-lg bg-white/50 border-2 border-gray-200 hover:bg-purple-50 hover:border-purple-300 transition-all"
                    >
                      {sticker}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quotes */}
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-800 flex items-center">
                  <Type className="mr-2" size={20} />
                  Quotes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {quotes.map((quote, index) => (
                    <button
                      key={index}
                      className="w-full text-left text-sm p-2 rounded-lg bg-white/50 border border-gray-200 hover:bg-purple-50 hover:border-purple-300 transition-all"
                    >
                      {quote}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upload */}
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-800 flex items-center">
                  <Image className="mr-2" size={20} />
                  Upload Image
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full border-purple-200 text-purple-600 hover:bg-purple-50" variant="outline">
                  <Upload className="mr-2" size={16} />
                  Choose File
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Canvas */}
          <div className="lg:col-span-3">
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg h-[600px]">
              <CardHeader>
                <CardTitle className="text-gray-800">
                  {boardTitle || "Untitled Moodboard"} {selectedMood}
                </CardTitle>
              </CardHeader>
              <CardContent className="h-full">
                <div className="w-full h-full bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 rounded-lg border-2 border-dashed border-purple-300 flex items-center justify-center">
                  <div className="text-center">
                    <Palette className="mx-auto text-purple-400 mb-4" size={48} />
                    <p className="text-gray-600 text-lg mb-2">
                      Start creating your moodboard!
                    </p>
                    <p className="text-gray-500 text-sm">
                      Drag elements from the sidebar to create your masterpiece
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodboardEditor;
