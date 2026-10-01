-- Schema per PRD §10. Bilingual text = jsonb {"id": "...", "en": "..."}.

create type availability as enum ('open_to_work', 'open_freelance', 'not_available');
create type employment_type as enum ('full_time', 'freelance', 'intern', 'contract');
create type contribution_type as enum ('from_scratch', 'development', 'maintenance');
create type publish_status as enum ('draft', 'published');
create type message_subject as enum ('job', 'freelance', 'other');
create type message_status as enum ('new', 'read', 'archived');

-- Admin allowlist (FR-ADM-01). Insert your email after migrating.
create table admins (email text primary key);
alter table admins enable row level security; -- no policies: invisible to clients

create function is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from admins where email = auth.jwt() ->> 'email')
$$;

create table site_settings (
  id int primary key default 1 check (id = 1),
  full_name text not null,
  headline jsonb not null default '{}',
  summary jsonb not null default '{}',
  about jsonb not null default '{}',
  location text,
  email text, phone text, whatsapp text,
  linkedin_url text, github_url text,
  availability availability not null default 'open_to_work',
  avatar_path text,
  highlights jsonb not null default '[]',
  updated_at timestamptz not null default now()
);

create table experiences (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  role text not null,
  employment_type employment_type not null,
  start_date date not null,
  end_date date,
  location text,
  description jsonb not null default '{}',
  display_order int not null default 0
);

create table projects (
  id uuid primary key default gen_random_uuid(),
  experience_id uuid references experiences on delete set null,
  slug text not null unique,
  title text not null,
  client text,
  category text not null,
  contribution_type contribution_type not null,
  summary jsonb not null default '{}',
  content jsonb not null default '{}',
  role_description text,
  is_confidential boolean not null default false,
  is_featured boolean not null default false,
  is_lab boolean not null default false,
  live_url text, repo_url text, cover_path text,
  status publish_status not null default 'draft',
  period_start date, period_end date,
  display_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table skill_categories (
  id serial primary key,
  name jsonb not null,
  display_order int not null default 0
);

create table skills (
  id serial primary key,
  category_id int not null references skill_categories on delete cascade,
  name text not null,
  slug text not null unique,
  icon text,
  is_learning boolean not null default false,
  display_order int not null default 0
);

create table project_skills (
  project_id uuid references projects on delete cascade,
  skill_id int references skills on delete cascade,
  primary key (project_id, skill_id)
);

create table project_media (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects on delete cascade,
  path text not null,
  alt jsonb not null default '{}',
  caption text,
  display_order int not null default 0
);

create table resumes (
  id uuid primary key default gen_random_uuid(),
  locale text not null check (locale in ('id', 'en')),
  file_path text not null,
  is_active boolean not null default false,
  uploaded_at timestamptz not null default now()
);
create unique index one_active_resume_per_locale on resumes (locale) where is_active;

create table contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 100),
  email text not null,
  subject message_subject not null,
  message text not null check (char_length(message) between 10 and 2000),
  status message_status not null default 'new',
  ip_hash text,
  user_agent text,
  created_at timestamptz not null default now()
);
create index on contact_messages (ip_hash, created_at);

-- RLS (PRD §10.3)
alter table site_settings enable row level security;
alter table experiences enable row level security;
alter table projects enable row level security;
alter table skill_categories enable row level security;
alter table skills enable row level security;
alter table project_skills enable row level security;
alter table project_media enable row level security;
alter table resumes enable row level security;
alter table contact_messages enable row level security;

create policy "public read" on site_settings for select using (true);
create policy "public read" on experiences for select using (true);
create policy "public read" on skill_categories for select using (true);
create policy "public read" on skills for select using (true);
create policy "public read" on project_skills for select using (true);
create policy "public read" on projects for select using (status = 'published' or is_admin());
create policy "public read" on project_media for select
  using (exists (select 1 from projects p where p.id = project_id and (p.status = 'published' or is_admin())));
create policy "public read" on resumes for select using (is_active or is_admin());

create policy "admin all" on site_settings for all using (is_admin()) with check (is_admin());
create policy "admin all" on experiences for all using (is_admin()) with check (is_admin());
create policy "admin all" on projects for all using (is_admin()) with check (is_admin());
create policy "admin all" on skill_categories for all using (is_admin()) with check (is_admin());
create policy "admin all" on skills for all using (is_admin()) with check (is_admin());
create policy "admin all" on project_skills for all using (is_admin()) with check (is_admin());
create policy "admin all" on project_media for all using (is_admin()) with check (is_admin());
create policy "admin all" on resumes for all using (is_admin()) with check (is_admin());
-- contact_messages: no anon access; inserts go through the service role.
create policy "admin read" on contact_messages for select using (is_admin());
create policy "admin update" on contact_messages for update using (is_admin()) with check (is_admin());
create policy "admin delete" on contact_messages for delete using (is_admin());

-- Storage (PRD §10.4)
insert into storage.buckets (id, name, public) values
  ('avatars', 'avatars', true), ('project-media', 'project-media', true), ('resumes', 'resumes', true);
create policy "admin write" on storage.objects for all
  using (bucket_id in ('avatars', 'project-media', 'resumes') and is_admin())
  with check (bucket_id in ('avatars', 'project-media', 'resumes') and is_admin());
