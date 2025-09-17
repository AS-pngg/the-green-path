-- Create enum types
CREATE TYPE public.app_role AS ENUM ('student', 'teacher', 'admin');
CREATE TYPE public.difficulty_level AS ENUM ('easy', 'medium', 'hard', 'expert');
CREATE TYPE public.biome_type AS ENUM ('forest', 'desert', 'grassland', 'tundra', 'ocean', 'urban');
CREATE TYPE public.disaster_type AS ENUM ('flood', 'wildfire', 'hurricane', 'oil_spill');

-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role app_role NOT NULL DEFAULT 'student',
  age INTEGER,
  class_name TEXT,
  difficulty_level difficulty_level,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create levels table
CREATE TABLE public.levels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  topic TEXT NOT NULL,
  difficulty difficulty_level NOT NULL,
  description TEXT,
  content JSONB, -- Store quiz questions, game data, etc.
  points_reward INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create items table for virtual city items
CREATE TABLE public.items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- 'animal', 'plant', 'structure'
  cost INTEGER NOT NULL,
  model_url TEXT, -- URL to 3D model file
  description TEXT,
  biome_compatibility biome_type[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create virtual city table
CREATE TABLE public.virtual_city (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  item_id UUID REFERENCES public.items(id) NOT NULL,
  biome biome_type NOT NULL,
  position_x FLOAT DEFAULT 0,
  position_y FLOAT DEFAULT 0,
  is_damaged BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create progress table
CREATE TABLE public.progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  level_id UUID REFERENCES public.levels(id) NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  score INTEGER DEFAULT 0,
  carbon_footprint INTEGER DEFAULT 1000,
  incorrect_answers INTEGER DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, level_id)
);

-- Create achievements table
CREATE TABLE public.achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  icon_url TEXT,
  criteria JSONB, -- Store achievement requirements
  points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user achievements table
CREATE TABLE public.user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  achievement_id UUID REFERENCES public.achievements(id) NOT NULL,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- Create quests table
CREATE TABLE public.quests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  difficulty difficulty_level NOT NULL,
  points_reward INTEGER DEFAULT 0,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create forum posts table
CREATE TABLE public.forum_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create forum comments table
CREATE TABLE public.forum_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES public.forum_posts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create competitions table
CREATE TABLE public.competitions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES auth.users(id),
  is_active BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create disasters table
CREATE TABLE public.disasters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type disaster_type NOT NULL,
  description TEXT,
  triggered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  resolved BOOLEAN DEFAULT FALSE,
  resolved_at TIMESTAMP WITH TIME ZONE
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.virtual_city ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disasters ENABLE ROW LEVEL SECURITY;

-- Create security definer function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(user_uuid UUID)
RETURNS app_role AS $$
  SELECT role FROM public.profiles WHERE id = user_uuid;
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for levels (public read)
CREATE POLICY "Anyone can view levels" ON public.levels
  FOR SELECT USING (true);
CREATE POLICY "Only admins can manage levels" ON public.levels
  FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');

-- RLS Policies for items (public read)
CREATE POLICY "Anyone can view items" ON public.items
  FOR SELECT USING (true);
CREATE POLICY "Only admins can manage items" ON public.items
  FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');

-- RLS Policies for virtual_city
CREATE POLICY "Users can view their own city" ON public.virtual_city
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own city" ON public.virtual_city
  FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for progress
CREATE POLICY "Users can view their own progress" ON public.progress
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own progress" ON public.progress
  FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Teachers can view class progress" ON public.progress
  FOR SELECT USING (
    public.get_user_role(auth.uid()) = 'teacher' AND 
    user_id IN (
      SELECT id FROM public.profiles 
      WHERE class_name = (SELECT class_name FROM public.profiles WHERE id = auth.uid())
    )
  );

-- RLS Policies for achievements (public read)
CREATE POLICY "Anyone can view achievements" ON public.achievements
  FOR SELECT USING (true);
CREATE POLICY "Only admins can manage achievements" ON public.achievements
  FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');

-- RLS Policies for user_achievements
CREATE POLICY "Users can view their own achievements" ON public.user_achievements
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own achievements" ON public.user_achievements
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for forum_posts
CREATE POLICY "Anyone can view forum posts" ON public.forum_posts
  FOR SELECT USING (true);
CREATE POLICY "Users can create forum posts" ON public.forum_posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own posts" ON public.forum_posts
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own posts" ON public.forum_posts
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for forum_comments
CREATE POLICY "Anyone can view comments" ON public.forum_comments
  FOR SELECT USING (true);
CREATE POLICY "Users can create comments" ON public.forum_comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own comments" ON public.forum_comments
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for competitions
CREATE POLICY "Anyone can view competitions" ON public.competitions
  FOR SELECT USING (true);
CREATE POLICY "Admins and teachers can manage competitions" ON public.competitions
  FOR ALL USING (public.get_user_role(auth.uid()) IN ('admin', 'teacher'));

-- RLS Policies for disasters
CREATE POLICY "Users can view their own disasters" ON public.disasters
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own disasters" ON public.disasters
  FOR ALL USING (auth.uid() = user_id);

-- Create trigger function for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_forum_posts_updated_at
  BEFORE UPDATE ON public.forum_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'student');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable realtime for forum posts and competitions
ALTER PUBLICATION supabase_realtime ADD TABLE public.forum_posts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.forum_comments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.competitions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.disasters;

-- Insert sample data
INSERT INTO public.achievements (name, description, points) VALUES
('Eco Starter', 'Complete your first level', 50),
('Climate Learner', 'Complete the Climate Change level', 150),
('Disaster Defender', 'Recover from 3 disasters', 200),
('City Builder', 'Place 10 items in your virtual city', 100);

INSERT INTO public.items (name, type, cost, description, biome_compatibility) VALUES
('Oak Tree', 'plant', 100, 'A mighty oak tree that provides oxygen', ARRAY['forest', 'grassland']::biome_type[]),
('Tiger', 'animal', 200, 'Endangered big cat', ARRAY['forest']::biome_type[]),
('Solar Panel', 'structure', 150, 'Clean energy generator', ARRAY['urban', 'desert']::biome_type[]),
('Coral Reef', 'plant', 180, 'Marine ecosystem builder', ARRAY['ocean']::biome_type[]),
('Wind Turbine', 'structure', 200, 'Renewable wind energy', ARRAY['grassland', 'ocean']::biome_type[]);

INSERT INTO public.levels (title, topic, difficulty, description, points_reward) VALUES
('Climate Change Basics', 'Climate Change', 'easy', 'Learn the fundamentals of climate change', 100),
('Global Warming Effects', 'Climate Change', 'medium', 'Understand the impacts of global warming', 150),
('Carbon Cycle Advanced', 'Climate Change', 'hard', 'Deep dive into carbon cycling', 200),
('Climate Policy Analysis', 'Climate Change', 'expert', 'Analyze climate policies and solutions', 250);