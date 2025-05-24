
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import { Heart, Search, Image, Plus } from "lucide-react";

const Community = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTag, setFilterTag] = useState("all");

  const communityPosts = [
    {
      id: 1,
      user: "ARMYforever",
      avatar: "💜",
      title: "Purple vibes moodboard",
      description: "Created this when I was missing the boys 💜",
      mood: "😔➡️😊",
      tags: ["BTS", "purple", "nostalgic"],
      likes: 47,
      comments: 12,
      fandom: "BTS",
      imagePreview: "bg-gradient-to-br from-purple-300 to-pink-300"
    },
    {
      id: 2,
      user: "MarvelFan2024",
      avatar: "⚡",
      title: "Tony Stark motivation board",
      description: "For those days when you need some Iron Man energy!",
      mood: "😐➡️🔥",
      tags: ["Marvel", "motivation", "powerful"],
      likes: 33,
      comments: 8,
      fandom: "Marvel",
      imagePreview: "bg-gradient-to-br from-red-300 to-yellow-300"
    },
    {
      id: 3,
      user: "DisneyDreamer",
      avatar: "🏰",
      title: "Magical morning moodboard",
      description: "Started my day with Disney magic and felt so inspired!",
      mood: "😴➡️✨",
      tags: ["Disney", "morning", "magical"],
      likes: 62,
      comments: 15,
      fandom: "Disney",
      imagePreview: "bg-gradient-to-br from-blue-300 to-teal-300"
    },
    {
      id: 4,
      user: "AnimeAesthetic",
      avatar: "🌸",
      title: "Cherry blossom feelings",
      description: "Anime aesthetics to match my spring mood 🌸",
      mood: "😌➡️🌸",
      tags: ["Anime", "spring", "peaceful"],
      likes: 28,
      comments: 6,
      fandom: "Anime",
      imagePreview: "bg-gradient-to-br from-pink-300 to-purple-300"
    }
  ];

  const popularTags = ["BTS", "Marvel", "Disney", "Anime", "motivation", "purple", "magical", "peaceful"];

  const filteredPosts = communityPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filterTag === "all" || post.tags.includes(filterTag) || post.fandom === filterTag;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <Navigation />
        
        <div className="text-center mb-8">
          <h1 className="font-heading font-bold text-4xl mb-2 gradient-text">
            Community Wall
          </h1>
          <p className="text-gray-600">
            Discover and share amazing fandom moodboards with fellow fans ✨
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Search & Filters */}
          <div className="space-y-6">
            {/* Search */}
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Search className="text-fantasy-500" size={20} />
                  <span>Search</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search moodboards..."
                  className="border-fantasy-200 focus:border-fantasy-400"
                />
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle>Popular Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setFilterTag("all")}
                    className={`px-3 py-1 rounded-full text-sm transition-all duration-200 hover-lift ${
                      filterTag === "all"
                        ? "bg-fantasy-500 text-white"
                        : "bg-fantasy-100 text-fantasy-700 hover:bg-fantasy-200"
                    }`}
                  >
                    All
                  </button>
                  {popularTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => setFilterTag(tag)}
                      className={`px-3 py-1 rounded-full text-sm transition-all duration-200 hover-lift ${
                        filterTag === tag
                          ? "bg-dream-500 text-white"
                          : "bg-dream-100 text-dream-700 hover:bg-dream-200"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Create Post CTA */}
            <Card className="glass-card border-0 glow-on-hover">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-3">🎨</div>
                <h3 className="font-heading font-bold text-lg mb-2 gradient-text">
                  Share Your Art
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Create and share your own moodboard with the community!
                </p>
                <Button className="w-full bg-gradient-to-r from-fantasy-500 to-dream-500 hover:from-fantasy-600 hover:to-dream-600 text-white hover-lift">
                  <Plus size={16} className="mr-1" />
                  Create Post
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Community Posts */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-bold text-2xl gradient-text">
                Latest Creations
              </h2>
              <p className="text-gray-600">
                {filteredPosts.length} moodboards
              </p>
            </div>

            {filteredPosts.map((post) => (
              <Card key={post.id} className="glass-card border-0 hover-lift glow-on-hover">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-fantasy-400 to-dream-400 rounded-full flex items-center justify-center text-white font-bold">
                        {post.avatar}
                      </div>
                      <div>
                        <h3 className="font-semibold">{post.user}</h3>
                        <p className="text-sm text-gray-600">{post.fandom} fan</p>
                      </div>
                    </div>
                    <span className="text-xl">{post.mood}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <h4 className="font-heading font-bold text-lg mb-2">{post.title}</h4>
                  <p className="text-gray-700 mb-4">{post.description}</p>
                  
                  {/* Moodboard Preview */}
                  <div className={`${post.imagePreview} rounded-lg h-48 mb-4 flex items-center justify-center relative overflow-hidden`}>
                    <div className="text-white text-center">
                      <Image size={48} className="mx-auto mb-2 opacity-80" />
                      <p className="font-semibold">Beautiful Moodboard</p>
                    </div>
                    
                    {/* Sample stickers for demo */}
                    <div className="absolute top-4 left-4 text-2xl animate-float">
                      💜
                    </div>
                    <div className="absolute bottom-4 right-4 text-xl animate-float" style={{ animationDelay: "1s" }}>
                      ✨
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map(tag => (
                      <span key={tag} className="bg-white/50 text-gray-700 px-2 py-1 rounded-full text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 text-gray-600 hover:text-fantasy-600 transition-colors duration-200">
                        <Heart size={18} />
                        <span className="text-sm">{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-600 hover:text-dream-600 transition-colors duration-200">
                        <span className="text-sm">💬 {post.comments}</span>
                      </button>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="hover-lift">
                        Remix
                      </Button>
                      <Button variant="outline" size="sm" className="hover-lift">
                        Save
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredPosts.length === 0 && (
              <Card className="glass-card border-0">
                <CardContent className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="font-heading font-bold text-xl mb-2 text-gray-600">
                    No posts found
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Try adjusting your search or filters to discover more content!
                  </p>
                  <Button 
                    onClick={() => {
                      setSearchTerm("");
                      setFilterTag("all");
                    }}
                    className="bg-fantasy-500 hover:bg-fantasy-600 text-white hover-lift"
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
