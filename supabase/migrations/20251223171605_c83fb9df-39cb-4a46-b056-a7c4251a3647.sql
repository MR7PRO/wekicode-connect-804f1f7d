-- Drop the problematic trigger that blocks all points updates
DROP TRIGGER IF EXISTS block_direct_gamification_updates ON profiles;

-- Drop the function
DROP FUNCTION IF EXISTS prevent_direct_gamification_updates();

-- Set all null points to 0
UPDATE profiles SET points = COALESCE(points, 0) WHERE points IS NULL;
UPDATE profiles SET level = COALESCE(level, 1) WHERE level IS NULL;

-- Make points column NOT NULL with default 0 to prevent future issues
ALTER TABLE profiles ALTER COLUMN points SET DEFAULT 0;
ALTER TABLE profiles ALTER COLUMN level SET DEFAULT 1;