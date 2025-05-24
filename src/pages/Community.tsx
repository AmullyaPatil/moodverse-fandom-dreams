
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Heart, Users, Eye, ThumbsUp, Share } from "lucide-react";

const Community = () => {
  const communityBoards = [
    {
      id: 1,
      title: "BTS Purple Aesthetic",
      author: "ARMY_Luna",
      mood: "💜",
      likes: 234,
      views: 1250,
      tags: ["BTS", "Purple", "Aesthetic"],
      preview: "Beautiful purple-themed moodboard with BTS quotes and imagery"
    },
    {
      id: 2,
      title: "Marvel Hero Energy",
      author: "MarvelFan23",
      mood: "⚡",
      likes: 189,
      views: 890,
      tags: ["Marvel", "Heroes", "Motivation"],
      preview: "Empowering Marvel superhero collage for strength and courage"
    },
    {
      id: 3,
      title: "Disney Princess Dreams",
      author: "DisneyMagic",
      mood: "🏰",
      likes: 312,
      views: 1650,
      tags: ["Disney", "Princess", "Dreams"],
      preview: "Magical Disney princess-themed board full of wonder and dreams"
    },
    {
      id: 4,
      title: "Anime Cherry Blossoms",
      author: "OtakuLife",
      mood: "🌸",
      likes: 156,
      views: 720,
      tags: ["Anime", "Sakura", "Spring"],
      preview: "Serene anime-inspired board with cherry blossoms and peaceful vibes"
    },
    {
      id: 5,
      title: "Cosmic K-Pop Vibes",
      author: "StardustFan",
      mood: "✨",
      likes: 278,
      views: 1100,
      tags: ["K-Pop", "Space", "Cosmic"],
      preview: "Galaxy-themed K-Pop moodboard with stellar aesthetics"
    },
    {
      id: 6,
      title: "Cozy Reading Nook",
      author: "BookwormBee",
      mood: "📚",
      likes: 145,
      views: 580,
      tags: ["Books", "Cozy", "Reading"],
      preview: "Warm and cozy book-themed board perfect for reading mood"
    }
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
            <Link to="/moodboard">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                Create Moodboard
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center">
            <Users className="mr-3 text-purple-500" size={32} />
            Community Wall
          </h1>
          <p className="text-gray-600">
            Discover and share beautiful moodboards created by fellow fans
          </p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-600 mb-1">1,234</div>
              <div className="text-sm text-gray-600">Total Moodboards</div>
            </CardContent>
          </Card>
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-pink-600 mb-1">567</div>
              <div className="text-sm text-gray-600">Active Creators</div>
            </CardContent>
          </Card>
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600 mb-1">8,901</div>
              <div className="text-sm text-gray-600">Total Likes</div>
            </CardContent>
          </Card>
        </div>

        {/* Moodboards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {communityBoards.map((board) => (
            <Card key={board.id} className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">{board.mood}</span>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Eye size={14} />
                    <span>{board.views}</span>
                  </div>
                </div>
                <CardTitle className="text-lg text-gray-800">{board.title}</CardTitle>
                <p className="text-sm text-gray-600">by {board.author}</p>
              </CardHeader>
              
              <CardContent className="pt-0">
                {/* Preview Area */}
                <div className="aspect-square bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-center p-4">
                    <span className="text-4xl mb-2 block">{board.mood}</span>
                    <p className="text-xs text-gray-600">{board.preview}</p>
                  </div>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {board.tags.map((tag) => (
                    <Badge key={tag} className="bg-purple-100 text-purple-700 text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-pink-500 transition-colors">
                      <ThumbsUp size={14} />
                      <span>{board.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-500 transition-colors">
                      <Share size={14} />
                      <span>Share</span>
                    </button>
                  </div>
                  
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-purple-200 text-purple-600 hover:bg-purple-50"
                  >
                    Remix
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button 
            variant="outline" 
            className="border-purple-200 text-purple-600 hover:bg-purple-50 px-8"
          >
            Load More Moodboards
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Community;
