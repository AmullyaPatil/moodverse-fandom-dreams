
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import Navigation from "@/components/Navigation";
import { Calendar as CalendarIcon, Heart, Image, Book } from "lucide-react";

const JournalArchive = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [filterMood, setFilterMood] = useState<string>("all");
  const [filterFandom, setFilterFandom] = useState<string>("all");

  // Mock data for journal entries
  const journalEntries = [
    {
      date: "2024-01-15",
      mood: "😊",
      title: "Great day with BTS music!",
      content: "Listened to Spring Day on repeat and felt so inspired...",
      fandom: "BTS",
      moodboard: true,
      recommendations: 3
    },
    {
      date: "2024-01-14",
      mood: "😔",
      title: "Feeling a bit down",
      content: "Work was tough today, but Tony Stark quotes helped...",
      fandom: "Marvel",
      moodboard: false,
      recommendations: 2
    },
    {
      date: "2024-01-13",
      mood: "🌟",
      title: "Disney movie marathon!",
      content: "Watched Moana and felt so empowered and ready to take on anything...",
      fandom: "Disney",
      moodboard: true,
      recommendations: 4
    },
    {
      date: "2024-01-12",
      mood: "😐",
      title: "Neutral day",
      content: "Nothing special happened, just a regular Tuesday...",
      fandom: "Anime",
      moodboard: false,
      recommendations: 2
    }
  ];

  const moodFilters = [
    { value: "all", label: "All Moods", emoji: "🌈" },
    { value: "happy", label: "Happy", emoji: "😊" },
    { value: "sad", label: "Sad", emoji: "😔" },
    { value: "excited", label: "Excited", emoji: "🌟" },
    { value: "neutral", label: "Neutral", emoji: "😐" }
  ];

  const fandomFilters = [
    { value: "all", label: "All Fandoms" },
    { value: "BTS", label: "BTS" },
    { value: "Marvel", label: "Marvel" },
    { value: "Disney", label: "Disney" },
    { value: "Anime", label: "Anime" }
  ];

  // Mock calendar data with moods
  const calendarData = {
    "2024-01-15": "😊",
    "2024-01-14": "😔",
    "2024-01-13": "🌟",
    "2024-01-12": "😐",
    "2024-01-11": "😊",
    "2024-01-10": "😔",
    "2024-01-09": "🌟",
  };

  const filteredEntries = journalEntries.filter(entry => {
    const moodMatch = filterMood === "all" || 
      (filterMood === "happy" && ["😊", "🌟"].includes(entry.mood)) ||
      (filterMood === "sad" && entry.mood === "😔") ||
      (filterMood === "neutral" && entry.mood === "😐");
    
    const fandomMatch = filterFandom === "all" || entry.fandom === filterFandom;
    
    return moodMatch && fandomMatch;
  });

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <Navigation />
        
        <div className="text-center mb-8">
          <h1 className="font-heading font-bold text-4xl mb-2 gradient-text">
            Journal Archive
          </h1>
          <p className="text-gray-600">
            Explore your emotional journey through time ✨
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar & Filters */}
          <div className="space-y-6">
            {/* Calendar */}
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CalendarIcon className="text-fantasy-500" size={20} />
                  <span>Mood Calendar</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border-0"
                  modifiers={{
                    hasEntry: (date) => {
                      const dateStr = date.toISOString().split('T')[0];
                      return Object.keys(calendarData).includes(dateStr);
                    }
                  }}
                  modifiersStyles={{
                    hasEntry: {
                      backgroundColor: 'hsl(var(--fantasy-100))',
                      color: 'hsl(var(--fantasy-700))',
                      fontWeight: 'bold'
                    }
                  }}
                />
              </CardContent>
            </Card>

            {/* Filters */}
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Filter by Mood
                  </label>
                  <div className="space-y-2">
                    {moodFilters.map(mood => (
                      <button
                        key={mood.value}
                        onClick={() => setFilterMood(mood.value)}
                        className={`w-full text-left p-2 rounded-lg transition-all duration-200 hover-lift ${
                          filterMood === mood.value
                            ? "bg-fantasy-500 text-white"
                            : "bg-fantasy-50 hover:bg-fantasy-100"
                        }`}
                      >
                        <span className="mr-2">{mood.emoji}</span>
                        {mood.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Filter by Fandom
                  </label>
                  <div className="space-y-2">
                    {fandomFilters.map(fandom => (
                      <button
                        key={fandom.value}
                        onClick={() => setFilterFandom(fandom.value)}
                        className={`w-full text-left p-2 rounded-lg transition-all duration-200 hover-lift ${
                          filterFandom === fandom.value
                            ? "bg-dream-500 text-white"
                            : "bg-dream-50 hover:bg-dream-100"
                        }`}
                      >
                        {fandom.label}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Journal Entries */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-bold text-2xl gradient-text">
                Your Journey
              </h2>
              <p className="text-gray-600">
                {filteredEntries.length} entries found
              </p>
            </div>

            {filteredEntries.map((entry, index) => (
              <Card key={index} className="glass-card border-0 hover-lift glow-on-hover">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{entry.mood}</span>
                      <div>
                        <CardTitle className="text-lg">{entry.title}</CardTitle>
                        <p className="text-sm text-gray-600">{entry.date}</p>
                      </div>
                    </div>
                    <span className="bg-gradient-to-r from-fantasy-100 to-dream-100 text-fantasy-700 px-3 py-1 rounded-full text-sm font-medium">
                      {entry.fandom}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{entry.content}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center space-x-1">
                        <Heart size={16} />
                        <span>{entry.recommendations} recommendations</span>
                      </span>
                      {entry.moodboard && (
                        <span className="flex items-center space-x-1">
                          <Image size={16} />
                          <span>Moodboard created</span>
                        </span>
                      )}
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="hover-lift">
                        <Book size={16} className="mr-1" />
                        View Full Entry
                      </Button>
                      {entry.moodboard && (
                        <Button variant="outline" size="sm" className="hover-lift">
                          <Image size={16} className="mr-1" />
                          View Moodboard
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredEntries.length === 0 && (
              <Card className="glass-card border-0">
                <CardContent className="text-center py-12">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="font-heading font-bold text-xl mb-2 text-gray-600">
                    No entries found
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Try adjusting your filters or start journaling today!
                  </p>
                  <Button className="bg-fantasy-500 hover:bg-fantasy-600 text-white hover-lift">
                    Create New Entry
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

export default JournalArchive;
