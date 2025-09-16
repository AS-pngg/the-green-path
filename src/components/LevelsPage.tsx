import { Play, Trophy, AlertCircle, CheckCircle } from "lucide-react";

interface Level {
  id: number;
  title: string;
  difficulty: "easy" | "medium" | "hard" | "expert";
  description: string;
  questionsCount: number;
  pointsReward: number;
  completed: boolean;
  locked: boolean;
}

interface LevelsPageProps {
  userLevel: number;
  onStartLevel: (levelId: number) => void;
}

const LevelsPage = ({ userLevel, onStartLevel }: LevelsPageProps) => {
  const mockLevels: Level[] = [
    {
      id: 1,
      title: "Climate Change Basics",
      difficulty: "easy",
      description: "Learn about greenhouse gases and global warming",
      questionsCount: 8,
      pointsReward: 100,
      completed: true,
      locked: false,
    },
    {
      id: 2,
      title: "Renewable Energy",
      difficulty: "medium",
      description: "Discover solar, wind, and clean energy sources",
      questionsCount: 12,
      pointsReward: 150,
      completed: false,
      locked: false,
    },
    {
      id: 3,
      title: "Ocean Conservation",
      difficulty: "medium",
      description: "Protect marine life and reduce ocean pollution",
      questionsCount: 15,
      pointsReward: 200,
      completed: false,
      locked: true,
    },
    {
      id: 4,
      title: "Biodiversity Crisis",
      difficulty: "hard",
      description: "Understanding species extinction and habitat loss",
      questionsCount: 18,
      pointsReward: 250,
      completed: false,
      locked: true,
    },
    {
      id: 5,
      title: "Carbon Economics",
      difficulty: "expert",
      description: "Advanced carbon offset and trading mechanisms",
      questionsCount: 25,
      pointsReward: 400,
      completed: false,
      locked: true,
    },
  ];

  const getDifficultyClass = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "difficulty-easy";
      case "medium": return "difficulty-medium";
      case "hard": return "difficulty-hard";
      case "expert": return "difficulty-expert";
      default: return "difficulty-easy";
    }
  };

  const getDifficultyAgeRange = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "Ages 8-11";
      case "medium": return "Ages 12-14";
      case "hard": return "Ages 15-18";
      case "expert": return "Ages 19-22";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="card-pixel mb-6">
          <h1 className="font-pixel text-xl text-foreground mb-2">
            🎓 ENVIRONMENTAL LEARNING
          </h1>
          <p className="font-pixel text-xs text-muted-foreground">
            Complete levels to unlock new areas and reduce your carbon footprint!
          </p>
        </div>

        {/* Progress Overview */}
        <div className="card-pixel mb-6">
          <h2 className="font-pixel text-sm text-foreground mb-4">
            YOUR PROGRESS
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="font-digital text-2xl text-pixel-success">3</div>
              <div className="font-pixel text-xs text-muted-foreground">Completed</div>
            </div>
            <div className="text-center">
              <div className="font-digital text-2xl text-pixel-warning">2</div>
              <div className="font-pixel text-xs text-muted-foreground">In Progress</div>
            </div>
            <div className="text-center">
              <div className="font-digital text-2xl text-pixel-forest">750</div>
              <div className="font-pixel text-xs text-muted-foreground">Total Points</div>
            </div>
            <div className="text-center">
              <div className="font-digital text-2xl text-pixel-ocean">Level {userLevel}</div>
              <div className="font-pixel text-xs text-muted-foreground">Current</div>
            </div>
          </div>
        </div>

        {/* Levels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockLevels.map((level) => (
            <div 
              key={level.id}
              className={`card-pixel ${getDifficultyClass(level.difficulty)} relative ${
                level.locked ? "opacity-60" : ""
              }`}
            >
              {/* Difficulty Badge */}
              <div className="absolute -top-2 -right-2">
                <div className={`font-pixel text-[8px] px-2 py-1 ${getDifficultyClass(level.difficulty)}`}>
                  {level.difficulty.toUpperCase()}
                </div>
              </div>

              {/* Status Icon */}
              <div className="absolute -top-2 -left-2">
                {level.completed ? (
                  <CheckCircle className="text-pixel-success" size={20} />
                ) : level.locked ? (
                  <AlertCircle className="text-muted-foreground" size={20} />
                ) : (
                  <Play className="text-pixel-warning" size={20} />
                )}
              </div>

              <div className="pt-4">
                <h3 className="font-pixel text-sm text-foreground mb-2">
                  {level.title}
                </h3>
                
                <div className="font-pixel text-[10px] text-muted-foreground mb-3">
                  {getDifficultyAgeRange(level.difficulty)}
                </div>

                <p className="font-pixel text-xs text-muted-foreground mb-4 leading-relaxed">
                  {level.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between font-pixel text-xs">
                    <span>Questions:</span>
                    <span>{level.questionsCount}</span>
                  </div>
                  <div className="flex justify-between font-pixel text-xs">
                    <span>Reward:</span>
                    <span className="text-pixel-warning">{level.pointsReward} pts</span>
                  </div>
                </div>

                <button
                  onClick={() => !level.locked && onStartLevel(level.id)}
                  disabled={level.locked}
                  className={`w-full ${
                    level.completed 
                      ? "btn-pixel-success" 
                      : level.locked 
                        ? "btn-pixel opacity-50 cursor-not-allowed"
                        : "btn-pixel"
                  }`}
                >
                  {level.completed ? "COMPLETED" : level.locked ? "LOCKED" : "START LEVEL"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sample Level Preview */}
        <div className="card-pixel mt-8">
          <h2 className="font-pixel text-sm text-foreground mb-4">
            📚 SAMPLE: CLIMATE CHANGE (MEDIUM)
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Info Section */}
            <div className="bg-muted p-4 border border-border">
              <h3 className="font-pixel text-xs text-foreground mb-3">INFO SECTION</h3>
              <div className="canvas-pixel h-32 flex items-center justify-center mb-3">
                <span className="font-pixel text-[10px] text-center text-muted-foreground">
                  🌍 Climate Image<br/>Placeholder
                </span>
              </div>
              <p className="font-pixel text-[10px] text-muted-foreground leading-relaxed">
                Climate change refers to global warming caused by greenhouse gases...
                [Insert 200 words on climate change causes]
              </p>
            </div>

            {/* Quiz Section */}
            <div className="bg-muted p-4 border border-border">
              <h3 className="font-pixel text-xs text-foreground mb-3">SAMPLE QUIZ</h3>
              <div className="space-y-3">
                <p className="font-pixel text-[10px] text-foreground">
                  Q1: What gas contributes most to global warming?
                </p>
                <div className="space-y-2">
                  <button className="btn-pixel w-full text-[10px] text-left">
                    A) Carbon dioxide
                  </button>
                  <button className="btn-pixel w-full text-[10px] text-left">
                    B) Oxygen
                  </button>
                  <button className="btn-pixel w-full text-[10px] text-left">
                    C) Nitrogen
                  </button>
                </div>
              </div>
            </div>

            {/* Game Section */}
            <div className="bg-muted p-4 border border-border">
              <h3 className="font-pixel text-xs text-foreground mb-3">MINI GAME</h3>
              <div className="canvas-pixel h-32 flex items-center justify-center mb-3">
                <span className="font-pixel text-[10px] text-center text-muted-foreground">
                  🔌 Drag & Drop<br/>Solar Panel Game
                </span>
              </div>
              <p className="font-pixel text-[10px] text-muted-foreground">
                Drag renewable energy sources to the correct zones!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelsPage;