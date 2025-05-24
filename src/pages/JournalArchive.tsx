
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Heart, Calendar, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";

const JournalArchive = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Sample journal entries
  const journalEntries = {
    "2024-01-15": {
      mood: "😊",
      title: "Great day with friends",
      content: "Had an amazing time watching Marvel movies with friends. Feeling grateful for good company.",
      fandoms: ["Marvel", "BTS"],
      moodboard: "Marvel Energy Board"
    },
    "2024-01-10": {
      mood: "💜",
      title: "BTS concert memories",
      content: "Listening to Spring Day and remembering the concert. Such beautiful memories.",
      fandoms: ["BTS"],
      moodboard: "Purple Dreams"
    },
    "2024-01-05": {
      mood: "🏰",
      title: "Disney movie marathon",
      content: "Rewatched all the classic Disney movies. Sometimes you need that childhood magic.",
      fandoms: ["Disney"],
      moodboard: "Disney Magic"
    }
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDateKey = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
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
              <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
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
            <BookOpen className="mr-3 text-purple-500" size={32} />
            Your Fandom Journal
          </h1>
          <p className="text-gray-600">
            Revisit your emotional journey through your favorite fandoms
          </p>
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
                    const entry = journalEntries[dateKey];
                    
                    return (
                      <button
                        key={day}
                        className={`h-12 rounded-lg text-sm font-medium transition-all ${
                          entry
                            ? "bg-purple-100 border-2 border-purple-300 text-purple-700 hover:bg-purple-200"
                            : "bg-white/50 border border-gray-200 text-gray-600 hover:bg-purple-50"
                        }`}
                      >
                        <div className="flex flex-col items-center">
                          <span>{day}</span>
                          {entry && <span className="text-xs">{entry.mood}</span>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Entries */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Entries</h2>
            
            {Object.entries(journalEntries).reverse().map(([date, entry]) => (
              <Card key={date} className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{entry.mood}</span>
                    <span className="text-xs text-gray-500">{date}</span>
                  </div>
                  
                  <h3 className="font-semibold text-gray-800 mb-2">{entry.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{entry.content}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-2">
                    {entry.fandoms.map(fandom => (
                      <Badge key={fandom} className="bg-purple-100 text-purple-700 text-xs">
                        {fandom}
                      </Badge>
                    ))}
                  </div>
                  
                  {entry.moodboard && (
                    <p className="text-xs text-gray-500">
                      Moodboard: {entry.moodboard}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalArchive;
