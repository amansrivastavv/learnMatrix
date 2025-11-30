-- Profiles table (Changed id to text for Clerk)
create table if not exists profiles (
  id text primary key,
  email text,
  full_name text,
  role text not null default 'user',
  bio text,
  location text,
  social_links jsonb,
  created_at timestamptz default now()
);

-- Practice questions
create table if not exists practice_questions (
  id uuid primary key default gen_random_uuid(),
  title text,
  description text,
  difficulty text,
  tags text[],
  created_by text, -- Changed to text
  created_at timestamptz default now()
);

-- Journals
create table if not exists journals (
  id uuid primary key default gen_random_uuid(),
  user_id text references profiles(id) on delete cascade, -- Changed to text
  content text,
  mood text,
  created_at timestamptz default now()
);

-- Kanban tasks
create table if not exists kanban_tasks (
  id uuid primary key default gen_random_uuid(),
  user_id text references profiles(id) on delete cascade, -- Changed to text
  title text,
  description text,
  status text,
  metadata jsonb,
  created_at timestamptz default now()
);

-- Activity logs
create table if not exists activity_logs (
  id uuid primary key default gen_random_uuid(),
  user_id text, -- Changed to text
  action text,
  meta jsonb,
  created_at timestamptz default now()
);
