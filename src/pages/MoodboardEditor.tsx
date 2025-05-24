
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import { Image, Plus, Heart, Calendar, Search } from "lucide-react";

const MoodboardEditor = () => {
  const [boardTitle, setBoardTitle] = useState("My Mood Today");
  const [selectedTags, setSelectedTags] = useState<string[]>(["happy"]);

  const stickerCategories = [
    {
      name: "Emotions",
      items: ["💜", "✨", "🌟", "💫", "🦋", "🌸", "🌙", "☀️"]
    },
    {
      name: "BTS",
      items: ["💜", "🎵", "🎤", "👑", "🌹", "🔥", "⭐", "💎"]
    },
    {
      name: "Marvel",
      items: ["⚡", "🛡️", "⭐", "🔥", "💎", "🌟", "⚔️", "🦸"]
    },
    {
      name: "Disney",
      items: ["🏰", "✨", "🌹", "👑", "🦋", "🌟", "💫", "🌙"]
    }
  ];

  const quotes = [
    { text: "You are enough", source: "Self-love", mood: "encouragement" },
    { text: "Life is beautiful", source: "Disney", mood: "happy" },
    { text: "Dream big", source: "Inspiration", mood: "motivated" },
    { text: "You got this!", source: "Motivation", mood: "confident" }
  ];

  const moodTags = ["happy", "sad", "excited", "calm", "inspired", "nostalgic", "powerful", "dreamy"];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <Navigation />
        
        <div className="text-center mb-8">
          <h1 className="font-heading font-bold text-4xl mb-2 gradient-text">
            Moodboard Creator
          </h1>
          <p className="text-gray-600">
            Express your feelings through a beautiful visual collage ✨
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tools Panel */}
          <div className="space-y-6">
            {/* Board Settings */}
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Image className="text-fantasy-500" size={20} />
                  <span>Board Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Board Title
                  </label>
                  <Input
                    value={boardTitle}
                    onChange={(e) => setBoardTitle(e.target.value)}
                    className="border-fantasy-200 focus:border-fantasy-400"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Mood Tags
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {moodTags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1 rounded-full text-sm transition-all duration-200 hover-lift ${
                          selectedTags.includes(tag)
                            ? "bg-fantasy-500 text-white"
                            : "bg-fantasy-100 text-fantasy-700 hover:bg-fantasy-200"
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stickers */}
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle>Stickers & Emojis</CardTitle>
              </CardHeader>
              <CardContent>
                {stickerCategories.map(category => (
                  <div key={category.name} className="mb-4">
                    <h4 className="font-semibold text-sm text-gray-700 mb-2">
                      {category.name}
                    </h4>
                    <div className="grid grid-cols-4 gap-2">
                      {category.items.map((item, idx) => (
                        <button
                          key={idx}
                          className="text-2xl p-2 rounded-lg hover:bg-fantasy-100 transition-colors duration-200 hover-lift"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quotes */}
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle>Inspirational Quotes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {quotes.map((quote, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-gradient-to-r from-fantasy-50 to-dream-50 rounded-lg cursor-pointer hover:from-fantasy-100 hover:to-dream-100 transition-all duration-200 hover-lift"
                    >
                      <p className="text-sm font-medium text-gray-800">
                        "{quote.text}"
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        - {quote.source}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Canvas Area */}
          <div className="lg:col-span-2">
            <Card className="glass-card border-0 hover-lift">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{boardTitle}</CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="hover-lift">
                      <Plus size={16} className="mr-1" />
                      Upload Image
                    </Button>
                    <Button variant="outline" size="sm" className="hover-lift">
                      <Search size={16} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Canvas */}
                <div className="bg-gradient-to-br from-white to-fantasy-50 rounded-lg border-2 border-dashed border-fantasy-200 h-96 flex items-center justify-center relative overflow-hidden">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎨</div>
                    <h3 className="font-heading font-bold text-xl mb-2 text-gray-600">
                      Start Creating!
                    </h3>
                    <p className="text-gray-500">
                      Drag elements from the sidebar to create your moodboard
                    </p>
                  </div>

                  {/* Sample elements for demo */}
                  <div className="absolute top-8 left-8 text-4xl animate-float">
                    💜
                  </div>
                  <div className="absolute bottom-12 right-12 text-3xl animate-float" style={{ animationDelay: "1s" }}>
                    ✨
                  </div>
                  <div className="absolute top-16 right-16 p-2 bg-white/80 rounded-lg text-sm font-medium text-fantasy-700 animate-float" style={{ animationDelay: "2s" }}>
                    "You are enough"
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center mt-6">
                  <div className="flex space-x-2">
                    <span className="text-sm text-gray-600">Tags:</span>
                    {selectedTags.map(tag => (
                      <span key={tag} className="bg-fantasy-100 text-fantasy-700 px-2 py-1 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" className="hover-lift">
                      <Calendar size={16} className="mr-1" />
                      Save Draft
                    </Button>
                    <Button className="bg-fantasy-500 hover:bg-fantasy-600 text-white hover-lift glow-on-hover">
                      <Heart size={16} className="mr-1" />
                      Save & Share
                    </Button>
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
