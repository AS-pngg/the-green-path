import { MapPin, Target, Trophy, Users, AlertTriangle, Zap, BookOpen } from "lucide-react";
import CarbonFootprintMeter from "./CarbonFootprintMeter";

interface StudentDashboardProps {
  studentData: {
    name: string;
    currentLevel: number;
    carbonFootprint: number;
    achievements: number;
    totalQuests: number;
    completedQuests: number;
    disasterAlerts: number;
  };
  onNavigate: (page: string) => void;
}

const StudentDashboard = ({ studentData, onNavigate }: StudentDashboardProps) => {
  const mockDisasters = [
    { id: 1, type: "flood", message: "Flooding in Ocean Biome!", severity: "high" },
  ];

  const mockAchievements = [
    { id: 1, name: "Eco Starter", icon: "🌱", unlocked: true },
    { id: 2, name: "Climate Hero", icon: "🌍", unlocked: true },
    { id: 3, name: "Disaster Defender", icon: "🛡️", unlocked: false },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="card-pixel mb-6">
          <h2 className="font-pixel text-lg text-foreground mb-2">
            Welcome back, {studentData.name}! 🌟
          </h2>
          <p className="font-pixel text-xs text-muted-foreground">
            Level {studentData.currentLevel} • Ready to save the planet?
          </p>
        </div>

        {/* Disaster Alerts */}
        {mockDisasters.length > 0 && (
          <div className="disaster-alert mb-6">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={16} className="text-pixel-danger" />
              <span className="font-pixel text-xs text-pixel-danger">
                DISASTER ALERT!
              </span>
            </div>
            {mockDisasters.map((disaster) => (
              <p key={disaster.id} className="text-[10px] leading-relaxed">
                {disaster.message} Click City to help!
              </p>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Stats Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Carbon Footprint */}
            <CarbonFootprintMeter 
              currentFootprint={studentData.carbonFootprint}
              maxFootprint={1000}
            />

            {/* Quick Actions */}
            <div className="card-pixel">
              <h3 className="font-pixel text-sm text-foreground mb-4">
                QUICK ACTIONS
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => onNavigate("levels")}
                  className="btn-pixel flex flex-col items-center gap-2 p-4"
                >
                  <BookOpen size={20} />
                  <span>Learn</span>
                </button>
                <button 
                  onClick={() => onNavigate("city")}
                  className="btn-pixel-secondary flex flex-col items-center gap-2 p-4"
                >
                  <MapPin size={20} />
                  <span>Build City</span>
                </button>
                <button 
                  onClick={() => onNavigate("quests")}
                  className="btn-pixel flex flex-col items-center gap-2 p-4"
                >
                  <Target size={20} />
                  <span>Quests</span>
                </button>
                <button 
                  onClick={() => onNavigate("competitions")}
                  className="btn-pixel-success flex flex-col items-center gap-2 p-4"
                >
                  <Zap size={20} />
                  <span>Compete</span>
                </button>
              </div>
            </div>

            {/* Quest Progress */}
            <div className="card-pixel">
              <h3 className="font-pixel text-sm text-foreground mb-4">
                ACTIVE QUESTS
              </h3>
              <div className="space-y-3">
                <div className="bg-muted p-3 border border-border">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-pixel text-xs">Plant 5 Trees</span>
                    <span className="font-digital text-xs">3/5</span>
                  </div>
                  <div className="progress-pixel h-4">
                    <div className="progress-pixel-fill w-3/5" />
                  </div>
                </div>
                <div className="bg-muted p-3 border border-border">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-pixel text-xs">Complete Climate Quiz</span>
                    <span className="font-digital text-xs">Ready</span>
                  </div>
                  <button 
                    onClick={() => onNavigate("levels")}
                    className="btn-pixel text-[10px] w-full"
                  >
                    START QUIZ
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            {/* Virtual City Preview */}
            <div className="card-pixel">
              <h3 className="font-pixel text-sm text-foreground mb-4">
                MY ECO CITY
              </h3>
              <div className="canvas-pixel h-48 flex items-center justify-center mb-4">
                <div className="text-center">
                  <MapPin size={32} className="mx-auto mb-2 text-pixel-forest" />
                  <p className="font-pixel text-xs text-muted-foreground">
                    3D City Preview
                  </p>
                  <p className="font-pixel text-[10px] text-muted-foreground mt-2">
                    🌳 5 Trees • 🐅 2 Animals • ⚡ 1 Solar Panel
                  </p>
                </div>
              </div>
              <button 
                onClick={() => onNavigate("city")}
                className="btn-pixel w-full"
              >
                VISIT CITY
              </button>
            </div>

            {/* Recent Achievements */}
            <div className="card-pixel">
              <h3 className="font-pixel text-sm text-foreground mb-4">
                BADGES
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {mockAchievements.map((achievement) => (
                  <div 
                    key={achievement.id}
                    className={`achievement-badge text-center p-2 ${
                      !achievement.unlocked ? "opacity-30" : ""
                    }`}
                  >
                    <div className="text-lg mb-1">{achievement.icon}</div>
                    <div className="text-[8px] leading-tight">
                      {achievement.name}
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => onNavigate("achievements")}
                className="btn-pixel w-full mt-4"
              >
                VIEW ALL
              </button>
            </div>

            {/* Leaderboard */}
            <div className="card-pixel">
              <h3 className="font-pixel text-sm text-foreground mb-4">
                CLASS RANKING
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center bg-muted p-2">
                  <span className="font-pixel text-xs">🥇 Alex</span>
                  <span className="font-digital text-xs">2850 pts</span>
                </div>
                <div className="flex justify-between items-center bg-primary text-primary-foreground p-2">
                  <span className="font-pixel text-xs">🥈 You</span>
                  <span className="font-digital text-xs">2340 pts</span>
                </div>
                <div className="flex justify-between items-center bg-muted p-2">
                  <span className="font-pixel text-xs">🥉 Sam</span>
                  <span className="font-digital text-xs">2100 pts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;