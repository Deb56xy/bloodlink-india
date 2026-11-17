-- Run in Supabase SQL Editor. Enable email confirmation in Auth settings.
create extension if not exists pgcrypto;
create table if not exists public.donor_profiles (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null unique references auth.users(id) on delete cascade,
 full_name text not null,
 phone text not null,
 age int not null check (age >= 18 and age <= 100),
 blood_group text not null check (blood_group in ('A+','A-','B+','B-','AB+','AB-','O+','O-')),
 state text not null, district text not null, city text not null, pincode text not null,
 available boolean not null default false,
 consent_notifications boolean not null default false,
 verified boolean not null default false,
 last_donation_date date,
 updated_at timestamptz not null default now(),
 created_at timestamptz not null default now()
);
create table if not exists public.blood_requests (
 id uuid primary key default gen_random_uuid(),
 request_code text unique not null default ('BL-' || upper(substr(replace(gen_random_uuid()::text,'-',''),1,10))),
 requester_id uuid not null references auth.users(id) on delete cascade,
 blood_group text not null check (blood_group in ('A+','A-','B+','B-','AB+','AB-','O+','O-')),
 units int not null check (units between 1 and 20),
 hospital_name text not null, hospital_city text not null, hospital_state text not null,
 required_at timestamptz not null,
 urgency text not null default 'Urgent' check (urgency in ('Urgent','Within 24 hours','Scheduled')),
 status text not null default 'open' check (status in ('open','in_progress','fulfilled','cancelled','expired')),
 created_at timestamptz not null default now()
);
create table if not exists public.donor_responses (
 id uuid primary key default gen_random_uuid(),
 request_id uuid not null references public.blood_requests(id) on delete cascade,
 donor_id uuid not null references auth.users(id) on delete cascade,
 response text not null check (response in ('interested','declined')),
 created_at timestamptz not null default now(),
 unique(request_id,donor_id)
);
create table if not exists public.user_consents (
 id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
 consent_type text not null, granted boolean not null, created_at timestamptz not null default now()
);
create table if not exists public.complaints (
 id uuid primary key default gen_random_uuid(), reporter_id uuid references auth.users(id) on delete set null,
 subject text not null, details text not null, status text not null default 'open', created_at timestamptz not null default now()
);
create table if not exists public.audit_logs (
 id bigint generated always as identity primary key, actor_id uuid references auth.users(id) on delete set null,
 action text not null, entity text not null, entity_id text, created_at timestamptz not null default now()
);
create index if not exists donor_search_idx on public.donor_profiles(blood_group,state,district,city) where available=true;
create index if not exists requests_status_idx on public.blood_requests(status,required_at);
alter table public.donor_profiles enable row level security;
alter table public.blood_requests enable row level security;
alter table public.donor_responses enable row level security;
alter table public.user_consents enable row level security;
alter table public.complaints enable row level security;
alter table public.audit_logs enable row level security;
create policy "donors manage own profile" on public.donor_profiles for all to authenticated using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "available donor directory read" on public.donor_profiles for select to anon,authenticated using (available=true);
create policy "requesters read own requests" on public.blood_requests for select to authenticated using (auth.uid()=requester_id);
create policy "requesters create own requests" on public.blood_requests for insert to authenticated with check (auth.uid()=requester_id);
create policy "requesters update own requests" on public.blood_requests for update to authenticated using (auth.uid()=requester_id) with check (auth.uid()=requester_id);
create policy "donors read responses addressed to self" on public.donor_responses for select to authenticated using (auth.uid()=donor_id);
create policy "donors create own response" on public.donor_responses for insert to authenticated with check (auth.uid()=donor_id);
create policy "users manage own consents" on public.user_consents for all to authenticated using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "users create complaints" on public.complaints for insert to authenticated with check (auth.uid()=reporter_id);
create policy "users read own complaints" on public.complaints for select to authenticated using (auth.uid()=reporter_id);
-- Privacy-safe view: never exposes donor phone, email, exact coordinates or user_id.
create or replace view public.donor_directory with (security_invoker=true) as
 select id, split_part(full_name,' ',1) as full_name, blood_group, city, district, state, available, verified
 from public.donor_profiles where available=true;
grant select on public.donor_directory to anon, authenticated;
