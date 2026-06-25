-- Airdrop Hunt schema
-- Categories
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  type text NOT NULL CHECK (type IN ('article', 'airdrop', 'both')),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Articles
CREATE TABLE IF NOT EXISTS submitted_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_title text NOT NULL,
  excerpt text NOT NULL,
  author text NOT NULL,
  category text NOT NULL,
  article_content text NOT NULL,
  article_logo_url text NOT NULL,
  tags text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  featured boolean NOT NULL DEFAULT false,
  slug text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Airdrops
CREATE TABLE IF NOT EXISTS submitted_airdrops (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_name text NOT NULL,
  short_description text NOT NULL,
  full_description text NOT NULL,
  participation_steps text NOT NULL,
  category text NOT NULL,
  chain text NOT NULL,
  reward_info text NOT NULL,
  start_date date,
  end_date date,
  website_url text,
  twitter_url text,
  telegram_url text,
  discord_url text,
  logo_url text NOT NULL,
  submitter_name text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('live','upcoming','ended','pending')),
  featured boolean NOT NULL DEFAULT false,
  slug text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE submitted_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE submitted_airdrops ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Public read for approved/featured content; public insert for submissions
CREATE POLICY "read_approved_articles" ON submitted_articles FOR SELECT
  TO anon, authenticated USING (status = 'approved' OR status = 'pending');
CREATE POLICY "insert_articles" ON submitted_articles FOR INSERT
  TO anon, authenticated WITH CHECK (true);

CREATE POLICY "read_airdrops" ON submitted_airdrops FOR SELECT
  TO anon, authenticated USING (status IN ('live','upcoming','ended','pending'));
CREATE POLICY "insert_airdrops" ON submitted_airdrops FOR INSERT
  TO anon, authenticated WITH CHECK (true);

CREATE POLICY "read_categories" ON categories FOR SELECT
  TO anon, authenticated USING (true);
CREATE POLICY "insert_categories" ON categories FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_articles_status ON submitted_articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_featured ON submitted_articles(featured);
CREATE INDEX IF NOT EXISTS idx_airdrops_status ON submitted_airdrops(status);
CREATE INDEX IF NOT EXISTS idx_airdrops_featured ON submitted_airdrops(featured);

-- Storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('article-logos', 'article-logos', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('airdrop-logos', 'airdrop-logos', true) ON CONFLICT (id) DO NOTHING;

-- Storage policies: public read, public upload
CREATE POLICY "public_read_article_logos" ON storage.objects FOR SELECT
  TO anon, authenticated USING (bucket_id = 'article-logos');
CREATE POLICY "public_upload_article_logos" ON storage.objects FOR INSERT
  TO anon, authenticated WITH CHECK (bucket_id = 'article-logos');

CREATE POLICY "public_read_airdrop_logos" ON storage.objects FOR SELECT
  TO anon, authenticated USING (bucket_id = 'airdrop-logos');
CREATE POLICY "public_upload_airdrop_logos" ON storage.objects FOR INSERT
  TO anon, authenticated WITH CHECK (bucket_id = 'airdrop-logos');
