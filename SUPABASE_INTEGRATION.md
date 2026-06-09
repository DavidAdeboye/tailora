# Supabase Backend Integration Guide

## Overview
This document outlines the required changes to integrate Supabase as the backend database for the Tailora application.

## Current State
- Next.js app with hardcoded mock data in components
- No backend connection or database
- Authentication UI exists but no real auth system
- Data stored in `useState` arrays within components

## Required Supabase Integration

### 1. Dependencies & Configuration

**Install Dependencies:**
```bash
npm install @supabase/supabase-js
```

**Environment Variables (`.env.local`):**
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Create Supabase Client (`lib/supabase.ts`):**
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### 2. Database Schema

Create the following tables in your Supabase project:

#### `profiles` (user accounts)
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT,
  full_name TEXT,
  business_name TEXT,
  address TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### `clients`
```sql
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  gender TEXT,
  outfit_type TEXT,
  status TEXT,
  due_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### `orders`
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  client_name TEXT NOT NULL,
  phone TEXT,
  gender TEXT,
  outfit TEXT,
  status TEXT,
  status_type TEXT,
  measurements JSONB,
  assigned_team JSONB,
  reference_images JSONB,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### `team_members`
```sql
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT CHECK (role IN ('Admin', 'Tailor', 'Assistant')),
  status TEXT CHECK (status IN ('Active', 'Pending')),
  joined_date TEXT,
  avatar_url TEXT
);
```

#### `workspace_settings`
```sql
CREATE TABLE workspace_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  standard_deadline_days INTEGER DEFAULT 14,
  express_deadline_days INTEGER DEFAULT 5,
  notification_preferences JSONB,
  two_factor_enabled BOOLEAN DEFAULT FALSE
);
```

### 3. Row Level Security (RLS)

Enable RLS on all tables and create policies:

```sql
-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspace_settings ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can only see their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Clients: Users can only see their own clients
CREATE POLICY "Users can view own clients" ON clients
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own clients" ON clients
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own clients" ON clients
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own clients" ON clients
  FOR DELETE USING (auth.uid() = user_id);

-- Orders: Users can only see their own orders
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own orders" ON orders
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own orders" ON orders
  FOR DELETE USING (auth.uid() = user_id);

-- Team Members: Users can only see their own team
CREATE POLICY "Users can view own team" ON team_members
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own team" ON team_members
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own team" ON team_members
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own team" ON team_members
  FOR DELETE USING (auth.uid() = user_id);

-- Workspace Settings: Users can only see their own settings
CREATE POLICY "Users can view own settings" ON workspace_settings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own settings" ON workspace_settings
  FOR UPDATE USING (auth.uid() = user_id);
```

### 4. Authentication Integration

**Update `app/login/page.tsx`:**
- Replace with Supabase Auth `signInWithPassword`
- Handle authentication errors
- Redirect to dashboard on success

**Update `app/signup/page.tsx`:**
- Replace with Supabase Auth `signUp`
- Create profile record after successful signup
- Handle email verification if enabled

**Create middleware (`middleware.ts`):**
```typescript
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  
  const { data: { session } } = await supabase.auth.getSession()
  
  // Protect dashboard routes
  if (req.nextUrl.pathname.startsWith('/app') && !session) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
  
  return res
}

export const config = {
  matcher: ['/app/:path*']
}
```

### 5. Data Layer Implementation

**Create `lib/clients.ts`:**
```typescript
import { supabase } from './supabase'

export async function getClients(userId: string) {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

export async function createClient(client: any) {
  const { data, error } = await supabase
    .from('clients')
    .insert(client)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export async function updateClient(id: string, updates: any) {
  const { data, error } = await supabase
    .from('clients')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export async function deleteClient(id: string) {
  const { error } = await supabase
    .from('clients')
    .delete()
    .eq('id', id)
  
  if (error) throw error
}
```

**Create `lib/orders.ts`:**
```typescript
import { supabase } from './supabase'

export async function getOrders(userId: string) {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

export async function createOrder(order: any) {
  const { data, error } = await supabase
    .from('orders')
    .insert(order)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export async function updateOrder(id: string, updates: any) {
  const { data, error } = await supabase
    .from('orders')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export async function deleteOrder(id: string) {
  const { error } = await supabase
    .from('orders')
    .delete()
    .eq('id', id)
  
  if (error) throw error
}
```

**Create `lib/team.ts`:**
```typescript
import { supabase } from './supabase'

export async function getTeamMembers(userId: string) {
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .eq('user_id', userId)
    .order('joined_date', { ascending: false })
  
  if (error) throw error
  return data
}

export async function createTeamMember(member: any) {
  const { data, error } = await supabase
    .from('team_members')
    .insert(member)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export async function updateTeamMember(id: string, updates: any) {
  const { data, error } = await supabase
    .from('team_members')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export async function deleteTeamMember(id: string) {
  const { error } = await supabase
    .from('team_members')
    .delete()
    .eq('id', id)
  
  if (error) throw error
}
```

**Create `lib/settings.ts`:**
```typescript
import { supabase } from './supabase'

export async function getSettings(userId: string) {
  const { data, error } = await supabase
    .from('workspace_settings')
    .select('*')
    .eq('user_id', userId)
    .single()
  
  if (error && error.code !== 'PGRST116') throw error
  return data
}

export async function upsertSettings(userId: string, settings: any) {
  const { data, error } = await supabase
    .from('workspace_settings')
    .upsert({ user_id: userId, ...settings })
    .select()
    .single()
  
  if (error) throw error
  return data
}
```

### 6. Component Modifications

**Files to modify:**

1. **`components/ClientManagementPage.tsx`**
   - Replace `initialClients` with `useEffect` call to `getClients`
   - Replace `setClients` with Supabase operations
   - Add loading and error states

2. **`components/TailoraDashboard.tsx`**
   - Replace `initialOrders` with `useEffect` call to `getOrders`
   - Replace `setOrders` with Supabase operations
   - Add loading and error states

3. **`components/TeamCollaborationPage.tsx`**
   - Replace `initialMembers` with `useEffect` call to `getTeamMembers`
   - Replace `setMembers` with Supabase operations
   - Add loading and error states

4. **`components/OrderCreationFlow.tsx`**
   - Save order data using `createOrder`
   - Include measurements JSON in order object
   - Handle reference image uploads

5. **`components/SettingsPage.tsx`**
   - Load settings using `getSettings`
   - Save changes using `upsertSettings`
   - Persist notification preferences

6. **`components/AddClientModal.tsx`**
   - Call `createClient` on form submission
   - Handle success/error states

### 7. File Storage Setup

**Create Storage Buckets in Supabase:**
1. `avatars` - for profile photos
2. `reference-images` - for order reference images

**Create `lib/storage.ts`:**
```typescript
import { supabase } from './supabase'

export async function uploadAvatar(userId: string, file: File) {
  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}-${Date.now()}.${fileExt}`
  
  const { data, error } = await supabase.storage
    .from('avatars')
    .upload(fileName, file)
  
  if (error) throw error
  
  const { data: { publicUrl } } = supabase.storage
    .from('avatars')
    .getPublicUrl(fileName)
  
  return publicUrl
}

export async function uploadReferenceImage(orderId: string, file: File) {
  const fileExt = file.name.split('.').pop()
  const fileName = `${orderId}-${Date.now()}.${fileExt}`
  
  const { data, error } = await supabase.storage
    .from('reference-images')
    .upload(fileName, file)
  
  if (error) throw error
  
  const { data: { publicUrl } } = supabase.storage
    .from('reference-images')
    .getPublicUrl(fileName)
  
  return publicUrl
}

export async function deleteFile(bucket: string, path: string) {
  const { error } = await supabase.storage
    .from(bucket)
    .remove([path])
  
  if (error) throw error
}
```

### 8. Custom Hooks (Optional but Recommended)

**Create `hooks/useClients.ts`:**
```typescript
import { useState, useEffect } from 'react'
import { getClients } from '@/lib/clients'
import { supabase } from '@/lib/supabase'

export function useClients(userId: string) {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadClients() {
      try {
        const data = await getClients(userId)
        setClients(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    loadClients()
    
    // Real-time subscription
    const subscription = supabase
      .channel('clients-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'clients' }, payload => {
        if (payload.eventType === 'INSERT') {
          setClients(prev => [payload.new, ...prev])
        } else if (payload.eventType === 'UPDATE') {
          setClients(prev => prev.map(c => c.id === payload.new.id ? payload.new : c))
        } else if (payload.eventType === 'DELETE') {
          setClients(prev => prev.filter(c => c.id !== payload.old.id))
        }
      })
      .subscribe()
    
    return () => subscription.unsubscribe()
  }, [userId])

  return { clients, loading, error, setClients }
}
```

### 9. Priority Implementation Order

1. **Phase 1: Setup**
   - Install dependencies
   - Configure environment variables
   - Create Supabase client
   - Set up database schema in Supabase dashboard

2. **Phase 2: Authentication**
   - Implement login/signup with Supabase Auth
   - Add middleware for route protection
   - Handle session management

3. **Phase 3: Core Data**
   - Implement client CRUD operations
   - Update ClientManagementPage component
   - Test client functionality

4. **Phase 4: Orders**
   - Implement order CRUD operations
   - Update OrderCreationFlow component
   - Update TailoraDashboard component
   - Handle measurements and reference images

5. **Phase 5: Team Management**
   - Implement team member operations
   - Update TeamCollaborationPage component
   - Test team functionality

6. **Phase 6: Settings**
   - Implement settings operations
   - Update SettingsPage component
   - Persist user preferences

7. **Phase 7: File Storage**
   - Set up storage buckets
   - Implement upload/delete functions
   - Integrate with profile and order components

8. **Phase 8: Real-time (Optional)**
   - Add real-time subscriptions
   - Update components to use real-time data
   - Test live updates

## Additional Notes

- **Testing:** Test each phase thoroughly before moving to the next
- **Error Handling:** Implement proper error handling throughout
- **Loading States:** Add loading indicators for better UX
- **Type Safety:** Define TypeScript interfaces for all data models
- **Backup:** Backup your current code before making changes
- **Migration:** Consider a data migration strategy if you have existing data

## Data Type References

**Client Status Types:** `"collected" | "overdue" | "due"`
**Order Status Types:** `"collected" | "overdue" | "due"`
**Team Roles:** `"Admin" | "Tailor" | "Assistant"`
**Team Status:** `"Active" | "Pending"`
**Gender Options:** `"Male" | "Female" | "Other" | "Prefer not to say"`
**Outfit Types:** `"Wedding Gown" | "Suit" | "Senator" | "Agbada" | "Ankara" | "Iro & Buba" | "Kaftan" | "Custom"`

## Support

For Supabase-specific documentation, visit: https://supabase.com/docs
