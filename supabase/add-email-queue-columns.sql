-- Migration: Add email delivery queue columns to the invitations table
-- Run this in Supabase → SQL Editor

ALTER TABLE invitations
  ADD COLUMN IF NOT EXISTS recipient_name     TEXT,
  ADD COLUMN IF NOT EXISTS inviter_name       TEXT,
  ADD COLUMN IF NOT EXISTS inviter_business   TEXT,
  ADD COLUMN IF NOT EXISTS email_status       TEXT NOT NULL DEFAULT 'pending'
    CHECK (email_status IN ('pending', 'sent', 'failed')),
  ADD COLUMN IF NOT EXISTS send_attempts      INT NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS next_attempt_at    TIMESTAMPTZ NOT NULL DEFAULT NOW();

-- Index used by the cron job's polling query (only scans 'pending' rows)
CREATE INDEX IF NOT EXISTS idx_invitations_email_queue
  ON invitations (email_status, next_attempt_at)
  WHERE email_status = 'pending';

-- Backfill: any existing rows that were sent synchronously are already delivered
UPDATE invitations
SET email_status = 'sent'
WHERE email_status = 'pending'
  AND created_at < NOW();
-- (adjust or remove the WHERE clause if you want to re-queue old records instead)
