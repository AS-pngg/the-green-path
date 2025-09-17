import { useState } from "react";
import Navigation from "../components/Navigation";
import AuthPage from "../components/AuthPage";
import StudentDashboard from "../components/StudentDashboard";
import LevelsPage from "../components/LevelsPage";
import VirtualCityPage from "../components/VirtualCityPage";

interface User {
  id: string;
  email: string;
  role: "student" | "teacher" | "admin";
  name: string;
  carbonFootprint: number;
  currentLevel: number;
  achievements: number;
  points: number;
  age?: number;
  className?: string;
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState("home");

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentPage("home");
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage("home");
  };

  const handleStartLevel = (levelId: number) => {
    console.log(`Starting level ${levelId}`);
    // In real app, this would navigate to level details or quiz
  };

  // Not logged in - show auth page
  if (!user) {
    return <AuthPage onLogin={handleLogin} />;
  }

  // Render current page
  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        if (user.role === "student") {
          return (
            <StudentDashboard
              studentData={{
                name: user.name,
                currentLevel: user.currentLevel,
                carbonFootprint: user.carbonFootprint,
                achievements: user.achievements,
                totalQuests: 5,
                completedQuests: 2,
                disasterAlerts: 1,
              }}
              onNavigate={setCurrentPage}
            />
          );
        }
        // Teacher/Admin dashboards would go here
        return (
          <div className="min-h-screen bg-background p-6">
            <div className="max-w-4xl mx-auto">
              <div className="card-pixel text-center">
                <h1 className="font-pixel text-xl text-foreground mb-4">
                  👋 Welcome, {user.name}!
                </h1>
                <p className="font-pixel text-sm text-muted-foreground mb-6">
                  {user.role.toUpperCase()} DASHBOARD
                </p>
                <p className="font-pixel text-xs text-muted-foreground">
                  Teacher and Admin dashboards coming soon!<br/>
                  Switch to student role to explore the full demo.
                </p>
              </div>
            </div>
          </div>
        );

      case "levels":
        return (
          <LevelsPage
            userLevel={user.currentLevel}
            onStartLevel={handleStartLevel}
          />
        );

      case "city":
        return (
          <VirtualCityPage userPoints={user.points} />
        );

      case "quests":
      case "achievements":
      case "forum":
      case "competitions":
      case "profile":
        return (
          <div className="min-h-screen bg-background p-6">
            <div className="max-w-4xl mx-auto">
              <div className="card-pixel text-center">
                <h1 className="font-pixel text-xl text-foreground mb-4">
                  🚧 {currentPage.toUpperCase()} PAGE
                </h1>
                <p className="font-pixel text-sm text-muted-foreground mb-6">
                  Coming Soon in Full Version!
                </p>
                <div className="space-y-4 text-left max-w-md mx-auto">
                  {currentPage === "quests" && (
                    <>
                      <p className="font-pixel text-xs text-muted-foreground">
                        • Real-world environmental challenges
                      </p>
                      <p className="font-pixel text-xs text-muted-foreground">
                        • Teacher-assigned tasks
                      </p>
                      <p className="font-pixel text-xs text-muted-foreground">
                        • Photo submission for verification
                      </p>
                    </>
                  )}
                  {currentPage === "achievements" && (
                    <>
                      <p className="font-pixel text-xs text-muted-foreground">
                        • Unlock 50+ pixel badges
                      </p>
                      <p className="font-pixel text-xs text-muted-foreground">
                        • Share achievements on social media
                      </p>
                      <p className="font-pixel text-xs text-muted-foreground">
                        • Special rewards for rare badges
                      </p>
                    </>
                  )}
                  {currentPage === "forum" && (
                    <>
                      <p className="font-pixel text-xs text-muted-foreground">
                        • Share virtual city screenshots
                      </p>
                      <p className="font-pixel text-xs text-muted-foreground">
                        • Discuss environmental topics
                      </p>
                      <p className="font-pixel text-xs text-muted-foreground">
                        • Moderated by teachers
                      </p>
                    </>
                  )}
                  {currentPage === "competitions" && (
                    <>
                      <p className="font-pixel text-xs text-muted-foreground">
                        • Class vs. class challenges
                      </p>
                      <p className="font-pixel text-xs text-muted-foreground">
                        • Real-time leaderboards
                      </p>
                      <p className="font-pixel text-xs text-muted-foreground">
                        • Seasonal tournaments
                      </p>
                    </>
                  )}
                  {currentPage === "profile" && (
                    <>
                      <p className="font-pixel text-xs text-muted-foreground">
                        • Customize pixel avatar
                      </p>
                      <p className="font-pixel text-xs text-muted-foreground">
                        • View learning statistics
                      </p>
                      <p className="font-pixel text-xs text-muted-foreground">
                        • Privacy settings
                      </p>
                    </>
                  )}
                </div>
                <button 
                  onClick={() => setCurrentPage("home")}
                  className="btn-pixel mt-6"
                >
                  BACK TO DASHBOARD
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        userRole={user.role}
      />
      {renderCurrentPage()}
    </div>
  );
};

export default Index;
