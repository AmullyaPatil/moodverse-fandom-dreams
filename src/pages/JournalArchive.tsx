
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Heart, Calendar, ChevronLeft, ChevronRight, BookOpen, Filter } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

const JournalArchive = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEntry, setSelectedEntry] = useState<any>(null);
  const [moodFilter, setMoodFilter] = useState<number | null>(null);
  const { moodEntries } = useApp();

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDateKey = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const getEntryForDate = (date: string) => {
    return moodEntries.find(entry => entry.date === date);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const moodFilters = [
    { emoji: "😢", label: "Sad", value: 1 },
    { emoji: "😐", label: "Neutral", value: 2 },
    { emoji: "😊", label: "Happy", value: 3 },
    { emoji: "😍", label: "Euphoric", value: 4 },
  ];

  const filteredEntries = moodFilter 
    ? moodEntries.filter(entry => entry.mood === moodFilter)
    : moodEntries;

  const recentEntries = filteredEntries
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

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
            <Link to="/mood">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                Log New Mood
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center">
            <BookOpen className="mr-3 text-purple-500" size={32} />
            Your Fandom Journal
          </h1>
          <p className="text-gray-600">
            Revisit your emotional journey through your favorite fandoms
          </p>
        </div>

        {/* Mood Filter */}
        <div className="flex justify-center mb-6">
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <Filter size={20} className="text-purple-500" />
                <span className="text-sm font-medium text-gray-700">Filter by mood:</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setMoodFilter(null)}
                    className={`px-3 py-1 rounded-full text-sm transition-all ${
                      moodFilter === null 
                        ? "bg-purple-100 text-purple-700" 
                        : "bg-gray-100 text-gray-600 hover:bg-purple-50"
                    }`}
                  >
                    All
                  </button>
                  {moodFilters.map((filter) => (
                    <button
                      key={filter.value}
                      onClick={() => setMoodFilter(filter.value)}
                      className={`px-3 py-1 rounded-full text-sm transition-all flex items-center space-x-1 ${
                        moodFilter === filter.value 
                          ? "bg-purple-100 text-purple-700" 
                          : "bg-gray-100 text-gray-600 hover:bg-purple-50"
                      }`}
                    >
                      <span>{filter.emoji}</span>
                      <span>{filter.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-gray-800 flex items-center">
                    <Calendar className="mr-2" size={24} />
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateMonth('prev')}
                      className="border-purple-200 text-purple-600 hover:bg-purple-50"
                    >
                      <ChevronLeft size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateMonth('next')}
                      className="border-purple-200 text-purple-600 hover:bg-purple-50"
                    >
                      <ChevronRight size={16} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {dayNames.map(day => (
                    <div key={day} className="text-center text-sm font-medium text-gray-600 p-2">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-2">
                  {/* Empty cells for days before month starts */}
                  {Array.from({ length: getFirstDayOfMonth(currentDate) }).map((_, index) => (
                    <div key={`empty-${index}`} className="h-12"></div>
                  ))}
                  
                  {/* Days of the month */}
                  {Array.from({ length: getDaysInMonth(currentDate) }).map((_, index) => {
                    const day = index + 1;
                    const dateKey = formatDateKey(currentDate.getFullYear(), currentDate.getMonth(), day);
                    const entry = getEntryForDate(dateKey);
                    
                    return (
                      <button
                        key={day}
                        onClick={() => entry && setSelectedEntry(entry)}
                        className={`h-12 rounded-lg text-sm font-medium transition-all ${
                          entry
                            ? "bg-purple-100 border-2 border-purple-300 text-purple-700 hover:bg-purple-200 cursor-pointer"
                            : "bg-white/50 border border-gray-200 text-gray-600 hover:bg-purple-50"
                        }`}
                      >
                        <div className="flex flex-col items-center">
                          <span>{day}</span>
                          {entry && <span className="text-xs">{entry.moodEmoji}</span>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Entries / Selected Entry */}
          <div className="space-y-4">
            {selectedEntry ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800">Selected Entry</h2>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedEntry(null)}
                    className="border-purple-200 text-purple-600"
                  >
                    Close
                  </Button>
                </div>
                
                <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-3xl">{selectedEntry.moodEmoji}</span>
                      <span className="text-sm text-gray-500">{selectedEntry.date}</span>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">Journal Entry</h4>
                        <p className="text-sm text-gray-600">{selectedEntry.journalEntry}</p>
                      </div>
                      
                      {selectedEntry.recommendations && (
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Fandom Fusion</h4>
                          <div className="space-y-2">
                            <div className="bg-purple-50 p-2 rounded">
                              <p className="text-xs font-medium text-purple-700">BTS: {selectedEntry.recommendations.bts.song}</p>
                            </div>
                            <div className="bg-blue-50 p-2 rounded">
                              <p className="text-xs font-medium text-blue-700">Marvel: {selectedEntry.recommendations.marvel.character}</p>
                            </div>
                            <div className="bg-pink-50 p-2 rounded">
                              <p className="text-xs font-medium text-pink-700">Disney: {selectedEntry.recommendations.disney.movie}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Recent Entries ({filteredEntries.length})
                </h2>
                
                {recentEntries.length > 0 ? (
                  recentEntries.map((entry) => (
                    <Card 
                      key={entry.id} 
                      className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer"
                      onClick={() => setSelectedEntry(entry)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-2xl">{entry.moodEmoji}</span>
                          <span className="text-xs text-gray-500">{entry.date}</span>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{entry.journalEntry}</p>
                        
                        {entry.recommendations && (
                          <div className="flex flex-wrap gap-1">
                            <Badge className="bg-purple-100 text-purple-700 text-xs">BTS</Badge>
                            <Badge className="bg-blue-100 text-blue-700 text-xs">Marvel</Badge>
                            <Badge className="bg-pink-100 text-pink-700 text-xs">Disney</Badge>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-6 text-center">
                      <BookOpen className="mx-auto text-gray-400 mb-4" size={48} />
                      <p className="text-gray-600 mb-4">
                        {moodFilter 
                          ? `No entries found for the selected mood filter.`
                          : `You haven't logged any moods yet.`
                        }
                      </p>
                      <Link to="/mood">
                        <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                          Log Your First Mood
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalArchive;
