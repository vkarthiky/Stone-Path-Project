import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Brain, BookOpen, Users, Heart, Briefcase, DollarSign, MessageCircle, Shield, MessageSquare, LogOut, ListTodo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

const pillars = [
  { id: "mental-health", name: "Mental Health", icon: Brain, color: "from-purple-500 to-purple-600" },
  { id: "academics", name: "Academics", icon: BookOpen, color: "from-blue-500 to-blue-600" },
  { id: "friendships", name: "Friendships", icon: Users, color: "from-green-500 to-green-600" },
  { id: "fitness", name: "Fitness", icon: Heart, color: "from-red-500 to-red-600" },
  { id: "career", name: "Career", icon: Briefcase, color: "from-orange-500 to-orange-600" },
  { id: "finance", name: "Finance", icon: DollarSign, color: "from-emerald-500 to-emerald-600" },
  { id: "relationships", name: "Relationships", icon: MessageCircle, color: "from-pink-500 to-pink-600" },
  { id: "bullying", name: "Bullying", icon: Shield, color: "from-cyan-500 to-cyan-600" },
];

const affirmations = [
  "You are capable of amazing things",
  "Every step forward is progress",
  "Your potential is limitless",
  "Believe in yourself today",
  "You are worthy of success",
  "Today is full of possibilities",
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [currentAffirmation, setCurrentAffirmation] = useState(0);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/auth");
      return;
    }
    setUser(JSON.parse(userData));

    // Rotate affirmations
    const interval = setInterval(() => {
      setCurrentAffirmation((prev) => (prev + 1) % affirmations.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/auth");
  };

  const handlePillarClick = (pillarId: string) => {
    navigate(`/${pillarId}`);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-glow/5 to-secondary/5">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Stone Path Project
            </h1>
            <p className="text-sm text-muted-foreground">Welcome back, {user.name}!</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate("/tasks")}>
              <ListTodo className="mr-2 h-4 w-4" />
              Tasks
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Daily Affirmation */}
        <Card className="mb-8 p-8 text-center bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border-2 shadow-lg">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Daily Affirmation
          </h2>
          <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {affirmations[currentAffirmation]}
          </p>
        </Card>

        {/* Pillars Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Your Support Pillars</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <Card
                  key={pillar.id}
                  className="p-6 cursor-pointer border-2 hover:border-primary/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col items-center gap-3"
                  onClick={() => handlePillarClick(pillar.id)}
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${pillar.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-semibold text-base text-center">{pillar.name}</span>
                </Card>
              );
            })}
          </div>
        </div>
      </main>

      {/* Floating AI Assistant */}
      <Button
        variant="gradient"
        size="icon"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-xl hover:scale-110 transition-transform"
        onClick={() => toast.info("AI Assistant coming soon!")}
      >
        <MessageSquare className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default Dashboard;
