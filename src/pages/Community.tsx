
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Users, Eye, ThumbsUp, Share, Copy } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { toast } from "sonner";

const Community = () => {
  const { publicMoodboards, likeMoodboard, addMoodboard, user } = useApp();
  const [sortBy, setSortBy] = useState<'likes' | 'recent' | 'trending'>('likes');
  const navigate = useNavigate();

  const handleLike = (moodboardId: string) => {
    likeMoodboard(moodboardId);
    toast.success("Liked! 💜");
  };

  const handleRemix = (moodboard: any) => {
    if (!user) return;
    
    const remixedBoard = {
      ...moodboard,
      id: Math.random().toString(36).substr(2, 9),
      title: `${moodboard.title} (Remix)`,
      createdBy: user.name,
      isPublic: false,
      likes: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    addMoodboard(remixedBoard);
    toast.success("Moodboard remixed! Check your collection ✨");
    navigate("/moodboard");
  };

  const handleShare = (moodboard: any) => {
    navigator.clipboard.writeText(`Check out this amazing moodboard: "${moodboard.title}" by ${moodboard.createdBy} on Fandom Fusion!`);
    toast.success("Link copied to clipboard! 📋");
  };

  const sortedMoodboards = [...publicMoodboards].sort((a, b) => {
    switch (sortBy) {
      case 'likes':
        return b.likes - a.likes;
      case 'recent':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'trending':
        return b.likes - a.likes; // Simple trending algorithm
      default:
        return 0;
    }
  });

  const getFandomTags = (title: string) => {
    const tags = [];
    if (title.toLowerCase().includes('bts') || title.toLowerCase().includes('purple')) tags.push('BTS');
    if (title.toLowerCase().includes('marvel') || title.toLowerCase().includes('hero')) tags.push('Marvel');
    if (title.toLowerCase().includes('disney') || title.toLowerCase().includes('princess')) tags.push('Disney');
    if (title.toLowerCase().includes('anime') || title.toLowerCase().includes('sakura')) tags.push('Anime');
    if (title.toLowerCase().includes('kpop') || title.toLowerCase().includes('cosmic')) tags.push('K-Pop');
    if (title.toLowerCase().includes('book') || title.toLowerCase().includes('reading')) tags.push('Books');
    return tags.length > 0 ? tags : ['General'];
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
              <div className="text-2xl font-bold text-purple-600 mb-1">{publicMoodboards.length}</div>
              <div className="text-sm text-gray-600">Total Moodboards</div>
            </CardContent>
          </Card>
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-pink-600 mb-1">
                {new Set(publicMoodboards.map(m => m.createdBy)).size}
              </div>
              <div className="text-sm text-gray-600">Active Creators</div>
            </CardContent>
          </Card>
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {publicMoodboards.reduce((sum, m) => sum + m.likes, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Likes</div>
            </CardContent>
          </Card>
        </div>

        {/* Sort Options */}
        <div className="flex justify-center mb-8 space-x-4">
          {(['likes', 'recent', 'trending'] as const).map((option) => (
            <Button
              key={option}
              variant={sortBy === option ? "default" : "outline"}
              onClick={() => setSortBy(option)}
              className={sortBy === option 
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" 
                : "border-purple-200 text-purple-600 hover:bg-purple-50"
              }
            >
              {option === 'likes' && 'Most Loved'}
              {option === 'recent' && 'Recent'}
              {option === 'trending' && 'Trending'}
            </Button>
          ))}
        </div>

        {/* Moodboards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedMoodboards.map((board) => (
            <Card key={board.id} className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">{board.mood}</span>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Eye size={14} />
                    <span>{Math.floor(Math.random() * 500) + 100}</span>
                  </div>
                </div>
                <CardTitle className="text-lg text-gray-800">{board.title}</CardTitle>
                <p className="text-sm text-gray-600">by {board.createdBy}</p>
              </CardHeader>
              
              <CardContent className="pt-0">
                {/* Preview Area */}
                <div className="aspect-square bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-center p-4">
                    <span className="text-4xl mb-2 block">{board.mood}</span>
                    <p className="text-xs text-gray-600">Beautiful {board.mood} themed moodboard with fandom content</p>
                  </div>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {getFandomTags(board.title).map((tag) => (
                    <Badge key={tag} className="bg-purple-100 text-purple-700 text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={() => handleLike(board.id)}
                      className="flex items-center space-x-1 text-sm text-gray-600 hover:text-pink-500 transition-colors"
                    >
                      <ThumbsUp size={14} />
                      <span>{board.likes}</span>
                    </button>
                    <button 
                      onClick={() => handleShare(board)}
                      className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-500 transition-colors"
                    >
                      <Share size={14} />
                      <span>Share</span>
                    </button>
                  </div>
                  
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleRemix(board)}
                    className="border-purple-200 text-purple-600 hover:bg-purple-50"
                  >
                    <Copy size={14} className="mr-1" />
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
            onClick={() => toast.info("More moodboards coming soon! ✨")}
          >
            Load More Moodboards
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Community;
