import { useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "../components/Navigation";
import AuthPage from "../components/AuthPage";
import StudentDashboard from "../components/StudentDashboard";
import LevelsPage from "../components/LevelsPage";
import VirtualCityPage from "../components/VirtualCityPage";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  id: string;
  email: string;
  role: "student" | "teacher" | "admin";
  age?: number;
  class_name?: string;
  difficulty_level?: "easy" | "medium" | "hard" | "expert";
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState("home");
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch user profile
          setTimeout(async () => {
            await fetchUserProfile(session.user.id);
          }, 0);
        } else {
          setUserProfile(null);
        }
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // Profile doesn't exist, create one
          await createUserProfile(userId);
        } else {
          console.error('Error fetching profile:', error);
        }
        return;
      }

      setUserProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const createUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          email: user?.email || '',
          role: 'student',
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating profile:', error);
        return;
      }

      setUserProfile(data);
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  };

  const handleLogin = (userData: any) => {
    // This is called from AuthPage but auth state is handled by useEffect
    setCurrentPage("home");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setCurrentPage("home");
  };

  const handleStartLevel = (levelId: number) => {
    console.log(`Starting level ${levelId}`);
    // In real app, this would navigate to level details or quiz
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="card-pixel text-center">
          <h1 className="font-pixel text-xl text-foreground mb-4">
            🌱 THE GREEN PATH
          </h1>
          <p className="font-pixel text-sm text-muted-foreground">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  // Not logged in - show auth page
  if (!user || !userProfile) {
    return <AuthPage onLogin={handleLogin} />;
  }

  // Render current page
  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        if (userProfile.role === "student") {
          return (
            <StudentDashboard
              studentData={{
                name: user.email?.split("@")[0] || "Student",
                currentLevel: 2,
                carbonFootprint: 750,
                achievements: 3,
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
                  👋 Welcome, {user.email?.split("@")[0]}!
                </h1>
                <p className="font-pixel text-sm text-muted-foreground mb-6">
                  {userProfile.role.toUpperCase()} DASHBOARD
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
            userLevel={2}
            onStartLevel={handleStartLevel}
          />
        );

      case "city":
        return (
          <VirtualCityPage userPoints={1250} />
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
        userRole={userProfile.role}
        onLogout={handleLogout}
      />
      {renderCurrentPage()}
    </div>
  );
};

export default Index;
