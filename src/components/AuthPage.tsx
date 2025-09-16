import { useState } from "react";
import { User, Mail, Lock, Users, GraduationCap, Shield } from "lucide-react";

interface AuthPageProps {
  onLogin: (userData: any) => void;
}

const AuthPage = ({ onLogin }: AuthPageProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student" as "student" | "teacher" | "admin",
    age: "",
    className: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, this would connect to Supabase Auth
    const mockUserData = {
      id: "1",
      email: formData.email,
      role: formData.role,
      age: formData.age ? parseInt(formData.age) : undefined,
      className: formData.className,
      name: formData.email.split("@")[0],
      carbonFootprint: 750,
      currentLevel: 2,
      achievements: 3,
      points: 1250,
    };
    onLogin(mockUserData);
  };

  const getDifficultyFromAge = (age: number) => {
    if (age <= 11) return "Easy (Ages 8-11)";
    if (age <= 14) return "Medium (Ages 12-14)";
    if (age <= 18) return "Hard (Ages 15-18)";
    return "Expert (Ages 19-22)";
  };

  const roleIcons = {
    student: Users,
    teacher: GraduationCap,
    admin: Shield,
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="font-pixel text-2xl text-pixel-forest mb-2">
            🌱 THE GREEN PATH
          </h1>
          <p className="font-pixel text-xs text-muted-foreground">
            Gamified Environmental Education
          </p>
        </div>

        {/* Auth Card */}
        <div className="card-pixel">
          <div className="flex items-center justify-center mb-6">
            <div className="grid grid-cols-2 gap-2 w-full">
              <button
                onClick={() => setIsLogin(true)}
                className={`nav-pixel text-center py-2 ${
                  isLogin ? "bg-primary text-primary-foreground" : ""
                }`}
              >
                LOGIN
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`nav-pixel text-center py-2 ${
                  !isLogin ? "bg-primary text-primary-foreground" : ""
                }`}
              >
                SIGN UP
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="font-pixel text-xs text-foreground block mb-2">
                EMAIL
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-3 text-muted-foreground" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-input border-2 border-border font-pixel text-xs text-foreground placeholder:text-muted-foreground"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="font-pixel text-xs text-foreground block mb-2">
                PASSWORD
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-3 text-muted-foreground" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-input border-2 border-border font-pixel text-xs text-foreground placeholder:text-muted-foreground"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Role Selection */}
            {!isLogin && (
              <div>
                <label className="font-pixel text-xs text-foreground block mb-2">
                  ROLE
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["student", "teacher", "admin"] as const).map((role) => {
                    const Icon = roleIcons[role];
                    return (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setFormData({...formData, role})}
                        className={`nav-pixel flex flex-col items-center gap-1 p-3 ${
                          formData.role === role ? "bg-primary text-primary-foreground" : ""
                        }`}
                      >
                        <Icon size={16} />
                        <span className="text-[10px] capitalize">{role}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Age (Students only) */}
            {!isLogin && formData.role === "student" && (
              <div>
                <label className="font-pixel text-xs text-foreground block mb-2">
                  AGE (Determines Difficulty)
                </label>
                <input
                  type="number"
                  min="8"
                  max="22"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                  className="w-full px-4 py-3 bg-input border-2 border-border font-pixel text-xs text-foreground"
                  placeholder="Enter your age"
                  required
                />
                {formData.age && (
                  <p className="font-pixel text-[10px] text-pixel-success mt-2">
                    Difficulty: {getDifficultyFromAge(parseInt(formData.age))}
                  </p>
                )}
              </div>
            )}

            {/* Class Name (Teachers only) */}
            {!isLogin && formData.role === "teacher" && (
              <div>
                <label className="font-pixel text-xs text-foreground block mb-2">
                  CLASS NAME
                </label>
                <input
                  type="text"
                  value={formData.className}
                  onChange={(e) => setFormData({...formData, className: e.target.value})}
                  className="w-full px-4 py-3 bg-input border-2 border-border font-pixel text-xs text-foreground"
                  placeholder="e.g., 7th Grade Biology"
                  required
                />
                <p className="font-pixel text-[10px] text-muted-foreground mt-2">
                  Note: Teacher accounts require admin approval
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button type="submit" className="btn-pixel w-full">
              {isLogin ? "LOGIN" : "CREATE ACCOUNT"}
            </button>

            {/* Google Login */}
            <button type="button" className="btn-pixel-secondary w-full flex items-center justify-center gap-2">
              <span>🔍</span>
              CONTINUE WITH GOOGLE
            </button>
          </form>

          {/* Supabase Integration Notice */}
          <div className="mt-6 bg-muted p-3 border border-border">
            <p className="font-pixel text-[10px] text-muted-foreground leading-relaxed">
              ⚠️ DEMO MODE: To enable real authentication, database, and all backend features, 
              connect this project to Supabase using the green button in the top right!
            </p>
          </div>
        </div>

        {/* COPPA Compliance */}
        <div className="mt-4 text-center">
          <p className="font-pixel text-[8px] text-muted-foreground">
            Users under 13 require parental consent (COPPA compliance)
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;