"use client";
import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";
import { uploadAvatar, getPublicUrl } from "../lib/supabaseStorage";
import AppPageHeader from "./AppPageHeader";
import ChangePasswordModal from "./Changepasswordmodal";


/* ── Types ── */
type Tab = "Profile" | "Workspace" | "Notifications" | "Security";

/* ── Icons ── */
const BellIcon = () => (
  <svg width="22" height="22" viewBox="0 0 26 26" fill="none">
    <path opacity="0.4" d="M22.1 17.69C21.8 18.5 21.16 19.12 20.32 19.4C19.15 19.79 17.95 20.08 16.74 20.29L16.38 20.34C16.18 20.38 15.99 20.4 15.8 20.42C15.56 20.45 15.31 20.47 15.06 20.5C14.38 20.55 13.7 20.58 13.02 20.58C12.33 20.58 11.64 20.55 10.95 20.49C10.66 20.46 10.38 20.43 10.1 20.39C9.93 20.37 9.77 20.34 9.62 20.32C9.5 20.3 9.38 20.29 9.26 20.27C8.06 20.07 6.87 19.78 5.71 19.39C4.84 19.1 4.18 18.48 3.89 17.69C3.6 16.91 3.71 16 4.17 15.22L5.4 13.18C5.65 12.74 5.89 11.88 5.89 11.36V9.35C5.89 5.42 9.08 2.22 13.02 2.22C16.94 2.22 20.14 5.42 20.14 9.35V11.36C20.14 11.88 20.38 12.74 20.65 13.18L21.87 15.22C22.32 15.98 22.4 16.87 22.1 17.69Z" fill="#121212"/>
    <path d="M13 11.66C12.55 11.66 12.18 11.29 12.18 10.83V7.48C12.18 7.02 12.55 6.65 13 6.65C13.46 6.65 13.82 7.02 13.82 7.48V10.83C13.82 11.29 13.44 11.66 13 11.66Z" fill="#121212"/>
    <path d="M16.07 21.68C15.61 22.93 14.41 23.83 13 23.83C12.14 23.83 11.3 23.49 10.7 22.87C10.36 22.54 10.1 22.11 9.94 21.67C10.09 21.69 10.23 21.7 10.38 21.72C10.63 21.75 10.89 21.79 11.15 21.81C11.77 21.86 12.4 21.89 13.02 21.89C13.64 21.89 14.26 21.86 14.86 21.81C15.09 21.79 15.32 21.77 15.54 21.74C15.71 21.72 15.88 21.7 16.07 21.68Z" fill="#121212"/>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path opacity="0.4" d="M15.48 13.23L11.69 8.18H6.08C5.12 8.18 4.64 9.34 5.32 10.02L10.5 15.2C11.33 16.03 12.68 16.03 13.51 15.2L15.48 13.23Z" fill="#121212"/>
    <path d="M17.92 8.18H11.69L15.48 13.23L18.69 10.02C19.36 9.34 18.88 8.18 17.92 8.18Z" fill="#121212"/>
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path opacity="0.4" d="M9.34 18.82L13.63 14.53C14.4 13.76 14.4 12.5 13.63 11.73L9.34 7.44" stroke="#121212" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ImageAddIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M7.5 18.33H12.5C16.67 18.33 18.33 16.67 18.33 12.5V7.5C18.33 3.33 16.67 1.67 12.5 1.67H7.5C3.33 1.67 1.67 3.33 1.67 7.5V12.5C1.67 16.67 3.33 18.33 7.5 18.33Z" stroke="#121212" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7.5 8.33C8.42 8.33 9.17 7.58 9.17 6.67C9.17 5.75 8.42 5 7.5 5C6.58 5 5.83 5.75 5.83 6.67C5.83 7.58 6.58 8.33 7.5 8.33Z" stroke="#121212" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2.22 15.79L6.33 13.03C6.99 12.59 7.93 12.64 8.52 13.15L8.81 13.41C9.46 13.97 10.51 13.97 11.16 13.41L14.66 10.42C15.31 9.86 16.36 9.86 17.01 10.42L18.33 11.58" stroke="#121212" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ── Toggle Switch ── */
function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      style={{
        width: 44,
        height: 24,
        borderRadius: 12,
        background: checked ? "#121212" : "#E3E6EB",
        border: "none",
        cursor: "pointer",
        padding: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: checked ? "flex-end" : "flex-start",
        flexShrink: 0,
        transition: "background 0.2s",
      }}
    >
      <div style={{
        width: 20,
        height: 20,
        borderRadius: "50%",
        background: "#fff",
        boxShadow: "0 1px 3px rgba(16,24,40,0.1), 0 1px 2px rgba(16,24,40,0.06)",
        transition: "transform 0.2s",
      }} />
    </button>
  );
}

/* ── Input Field ── */
function InputField({ label, placeholder, value, onChange, type = "text" }: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <label style={{ fontSize: 14, fontWeight: 500, color: "#283145", fontFamily: "Satoshi, sans-serif" }}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          height: 40,
          padding: "10px 12px",
          border: `1px solid ${focused ? "#121212" : "#E2E4E9"}`,
          borderRadius: 10,
          background: "#fff",
          fontSize: 14,
          color: "#525866",
          fontFamily: "Inter, sans-serif",
          outline: "none",
          boxSizing: "border-box",
          boxShadow: "0 1px 2px rgba(228,229,231,0.24)",
          transition: "border-color 0.15s",
        }}
      />
    </div>
  );
}

/* ── Divider Row ── */
function SectionDivider() {
  return <div style={{ width: "100%", height: 1, background: "#E5E7EB", flexShrink: 0 }} />;
}

/* ── PROFILE TAB ── */
function ProfileTab() {
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [savingProfile, setSavingProfile] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];

  // Track initial (saved) values for dirty detection
  const [initialValues, setInitialValues] = useState({ fullName: "", businessName: "", email: "", address: "" });
  const isDirty = fullName !== initialValues.fullName || businessName !== initialValues.businessName || email !== initialValues.email || address !== initialValues.address;
  useEffect(() => {
    let mounted = true;
    async function loadProfile() {
      try {
        const { data: userData, error: userErr } = await supabase.auth.getUser();
        if (userErr) {
          console.error('Error getting auth user', userErr);
          return;
        }
        const user = (userData as any)?.user;
        const userId = user?.id;
        if (!userId) return;

        const { data, error } = await supabase
          .from('profiles')
          .select('full_name, business_name, address, avatar_path')
          .eq('user_id', userId)
          .maybeSingle();

        if (error) {
          console.error('Error loading profile:', error.message);
          return;
        }

        if (!data) return;
        if (mounted) {
          setFullName(data.full_name ?? '');
          setBusinessName(data.business_name ?? '');
          setAddress(data.address ?? '');
          setEmail(user.email ?? '');
          // Save initial values for dirty tracking
          setInitialValues({
            fullName: data.full_name ?? '',
            businessName: data.business_name ?? '',
            email: user.email ?? '',
            address: data.address ?? ''
          });
          try {
            if (data.full_name) localStorage.setItem('tailora_fullname', data.full_name);
            if (data.business_name) localStorage.setItem('tailora_businessname', data.business_name);
          } catch (e) {}
          if (data.avatar_path) {
            const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(data.avatar_path);
            setAvatarUrl(urlData.publicUrl);
          }
        }
      } catch (err) {
        console.error('Unexpected error loading profile', err);
      }
    }
    loadProfile();
    return () => { mounted = false; };
  }, []);

  async function handleFile(file: File | null) {
    if (!file) return;
    const MAX_BYTES = 5 * 1024 * 1024; // 5 MB
    if (!file.type || !ALLOWED_TYPES.includes(file.type)) {
      alert('Only PNG, JPEG, WebP or AVIF images are allowed');
      return;
    }
    if (file.size > MAX_BYTES) {
      alert('File too large — maximum allowed size is 5 MB');
      return;
    }
    setUploading(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      const user = (userData as any)?.user;
      const userId = user?.id;
      if (!userId) throw new Error('Not authenticated');

      const destPath = `${userId}/${Date.now()}-${file.name}`;
      await uploadAvatar(file, destPath, 'avatars');

      // update profiles table
      const { error: upsertError } = await supabase
        .from('profiles')
        .upsert({ user_id: userId, avatar_path: destPath }, { onConflict: 'user_id' });
      if (upsertError) throw upsertError;

      const url = await getPublicUrl('avatars', destPath);
      setAvatarUrl(url);
      try {
        localStorage.setItem('tailora_avatar', url);
      } catch (e) {
        // ignore storage errors
      }
    } catch (err) {
      console.error('Upload error', err);
    } finally {
      setUploading(false);
    }
  }

  async function saveProfile() {
    setSavingProfile(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      const user = (userData as any)?.user;
      const userId = user?.id;
      if (!userId) throw new Error('Not authenticated');

      // upsert profile fields (only known columns)
      const { error: upsertError } = await supabase
        .from('profiles')
        .upsert({
          user_id: userId,
          full_name: fullName,
          business_name: businessName,
          address: address
        }, { onConflict: 'user_id' });
      if (upsertError) throw upsertError;

      // Update local storage and dispatch custom event so Sidebar and Header update in real-time
      try {
        localStorage.setItem('tailora_fullname', fullName);
        localStorage.setItem('tailora_businessname', businessName);
        window.dispatchEvent(new Event('tailora_profile_updated'));
      } catch (e) {}

      // update auth email if changed — validate before sending to Supabase
      if (email && email !== user.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          throw new Error('Invalid email format');
        }

        const { error: updateErr } = await supabase.auth.updateUser({ email });
        if (updateErr) {
          console.error('Email update error', updateErr);
          // surface Supabase error message to user for troubleshooting
          const msg = (updateErr as any)?.message ?? JSON.stringify(updateErr);
          try { alert(`Failed to update email: ${msg}`); } catch {}
          // rethrow so saveProfile shows a failure state
          throw updateErr;
        }
      }

      try { alert('Profile saved'); } catch (e) { /* ignore */ }
      // Update initial values so button goes back to disabled
      setInitialValues({ fullName, businessName, email, address });
    } catch (err) {
      console.error('Save profile error', err);
      try { alert('Failed to save profile'); } catch (e) {}
    } finally {
      setSavingProfile(false);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {/* Profile photo section */}
      {/* CHANGED: added tailora-settings-row-photo class for mobile avatar layout */}
      <div className="tailora-settings-row tailora-settings-row-photo" style={{ display: "flex", alignItems: "flex-start", gap: 69, padding: "22px 24px" }}>
        {/* Left: label + button */}
        <div className="tailora-settings-row-left" style={{ display: "flex", flexDirection: "column", gap: 20, width: 305 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: "#28292D", fontFamily: "Satoshi, sans-serif" }}>Profile photo</span>
            <span style={{ fontSize: 14, fontWeight: 400, color: "#667185", fontFamily: "Satoshi, sans-serif", lineHeight: "22px" }}>This image will be displayed on your profile</span>
          </div>
          <div>
            <input
              ref={fileInputRef}
              id="avatar-file"
              type="file"
              accept="image/png,image/jpeg,image/webp,image/avif"
              style={{ display: 'none' }}
              onChange={e => handleFile(e.target.files ? e.target.files[0] : null)}
            />
            <button
              type="button"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                width: 144,
                height: 36,
                background: "#fff",
                border: "1px solid #121212",
                borderRadius: 8,
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 500,
                color: "#121212",
                fontFamily: "Satoshi, sans-serif",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "#F5F5F5")}
              onMouseLeave={e => (e.currentTarget.style.background = "#fff")}
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
            >
              <ImageAddIcon />
              {uploading ? 'Uploading...' : 'Change Photo'}
            </button>
          </div>
        </div>

        {/* Right: avatar */}
        <div style={{
          width: 100,
          height: 100,
          borderRadius: "50%",
          border: "2.5px solid #F2F2F6",
          boxShadow: "0 0 1px rgba(0,0,0,0.25)",
          overflow: "hidden",
          background: avatarUrl ? "#E5E7EB" : "#128C7E",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          {avatarUrl ? (
            <img src={avatarUrl} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <span style={{ color: "#fff", fontSize: 40, fontWeight: 700, fontFamily: "'Satoshi', sans-serif" }}>
              {(email.charAt(0) || "?").toUpperCase()}
            </span>
          )}
        </div>
      </div>

      <SectionDivider />

      {/* Personal information section */}
      <div className="tailora-settings-row" style={{ display: "flex", alignItems: "flex-start", gap: 56, padding: "22px 24px" }}>
        {/* Left: label + save */}
        <div className="tailora-settings-row-left" style={{ display: "flex", flexDirection: "column", gap: 20, width: 305, flexShrink: 0 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: "#28292D", fontFamily: "Satoshi, sans-serif" }}>Personal Information</span>
            <span style={{ fontSize: 14, fontWeight: 400, color: "#667185", fontFamily: "Satoshi, sans-serif" }}>Update your personal details here.</span>
          </div>
          <button
            style={{
              width: 124,
              height: 38,
              background: isDirty ? "#121212" : "#D0D5DD",
              border: "none",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 700,
              color: "#fff",
              fontFamily: "Satoshi, sans-serif",
              cursor: isDirty ? "pointer" : "default",
              opacity: isDirty ? 1 : 0.6,
              transition: "background 0.2s, opacity 0.2s",
            }}
            onClick={saveProfile}
            disabled={!isDirty || savingProfile}
          >
            {savingProfile ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {/* Right: form fields */}
        {/* CHANGED: added width:100% and minWidth:0 so it never overflows on mobile */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16, width: "100%", minWidth: 0 }}>
          <InputField label="Full Name" placeholder="Your First and Last name" value={fullName} onChange={setFullName} />
          <InputField label="Business Name" placeholder="Your Business Name" value={businessName} onChange={setBusinessName} />
          <InputField label="Email Address" placeholder="Your Email Address" value={email} onChange={setEmail} type="email" />
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label style={{ fontSize: 14, fontWeight: 500, color: "#283145", fontFamily: "Satoshi, sans-serif" }}>Address</label>
            <textarea
              value={address}
              onChange={e => setAddress(e.target.value)}
              rows={3}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #E2E4E9",
                borderRadius: 10,
                background: "#fff",
                fontSize: 14,
                color: "#525866",
                fontFamily: "Inter, sans-serif",
                outline: "none",
                boxSizing: "border-box",
                resize: "none",
                boxShadow: "0 1px 2px rgba(228,229,231,0.24)",
              }}
              onFocus={e => (e.currentTarget.style.borderColor = "#121212")}
              onBlur={e => (e.currentTarget.style.borderColor = "#E2E4E9")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── WORKSPACE TAB ── */
function WorkspaceTab() {
  const [standardDays, setStandardDays] = useState("14");
  const [expressDays, setExpressDays] = useState("5");
  const [savingWorkspace, setSavingWorkspace] = useState(false);

  // Track initial (saved) values for dirty detection
  const [initialWs, setInitialWs] = useState({ standardDays: "14", expressDays: "5" });
  const isWsDirty = standardDays !== initialWs.standardDays || expressDays !== initialWs.expressDays;
  useEffect(() => {
    let mounted = true;
    async function loadWorkspace() {
      try {
        const { data: userData } = await supabase.auth.getUser();
        const user = (userData as any)?.user;
        const userId = user?.id;
        if (!userId) return;
        const { data, error } = await supabase.from('workspace_settings').select('standard_deadline_days, express_deadline_days').eq('user_id', userId).maybeSingle();
        if (error) return;
        if (!data) return;
        if (mounted) {
          const std = String(data.standard_deadline_days ?? standardDays);
          const exp = String(data.express_deadline_days ?? expressDays);
          setStandardDays(std);
          setExpressDays(exp);
          setInitialWs({ standardDays: std, expressDays: exp });
        }
      } catch (err) {
        console.error('Error loading workspace defaults', err);
      }
    }
    loadWorkspace();
    return () => { mounted = false; };
  }, []);

  async function saveWorkspace() {
    setSavingWorkspace(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      const user = (userData as any)?.user;
      const userId = user?.id;
      if (!userId) throw new Error('Not authenticated');

      const payload: any = { user_id: userId };
      if (standardDays) payload.standard_deadline_days = Number(standardDays);
      if (expressDays) payload.express_deadline_days = Number(expressDays);

      const { error } = await supabase.from('workspace_settings').upsert(payload, { onConflict: 'user_id' });
      if (error) throw error;
      // Update initial values so button goes back to disabled
      setInitialWs({ standardDays, expressDays });
      try { alert('Workspace defaults saved'); } catch (e) {}
    } catch (err) {
      console.error('Save workspace error', err);
      try { alert('Failed to save workspace defaults'); } catch (e) {}
    } finally {
      setSavingWorkspace(false);
    }
  }

  return (
    <div className="tailora-settings-row" style={{ display: "flex", alignItems: "flex-start", gap: 56, padding: "22px 24px" }}>
      {/* Left */}
      <div className="tailora-settings-row-left" style={{ display: "flex", flexDirection: "column", gap: 20, width: 305, flexShrink: 0 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: "#28292D", fontFamily: "Satoshi, sans-serif" }}>Deadline defaults</span>
          <span style={{ fontSize: 14, color: "#667185", fontFamily: "Satoshi, sans-serif" }}>Standard delivery turnaround.</span>
        </div>
        <button
          style={{
            width: 124,
            height: 38,
            background: isWsDirty ? "#121212" : "#D0D5DD",
            border: "none",
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 700,
            color: "#fff",
            fontFamily: "Satoshi, sans-serif",
            cursor: isWsDirty ? "pointer" : "default",
            opacity: isWsDirty ? 1 : 0.6,
            transition: "background 0.2s, opacity 0.2s",
          }}
          onClick={saveWorkspace}
          disabled={!isWsDirty || savingWorkspace}
        >
          {savingWorkspace ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Right */}
      {/* CHANGED: added width:100% and minWidth:0 */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16, width: "100%", minWidth: 0 }}>
        <InputField label="Standard order (days)" placeholder="14" value={standardDays} onChange={setStandardDays} type="number" />
        <InputField label="Express order (days)" placeholder="5" value={expressDays} onChange={setExpressDays} type="number" />
      </div>
    </div>
  );
}

/* ── NOTIFICATIONS TAB ── */
function NotificationsTab() {
  const [deliveryReminders, setDeliveryReminders] = useState(true);
  const [deadlineAlerts, setDeadlineAlerts] = useState(false);
  const [teamActivity, setTeamActivity] = useState(false);
  const [saving, setSaving] = useState(false);

  // Track initial values for dirty detection
  const [initialPrefs, setInitialPrefs] = useState({
    deliveryReminders: true,
    deadlineAlerts: false,
    teamActivity: false
  });

  const isDirty = deliveryReminders !== initialPrefs.deliveryReminders ||
                  deadlineAlerts !== initialPrefs.deadlineAlerts ||
                  teamActivity !== initialPrefs.teamActivity;

  useEffect(() => {
    let mounted = true;
    async function loadNotifications() {
      try {
        const { data: userData } = await supabase.auth.getUser();
        const userId = userData?.user?.id;
        if (!userId) return;

        const { data, error } = await supabase
          .from('workspace_settings')
          .select('notification_preferences')
          .eq('user_id', userId)
          .maybeSingle();

        if (error) return;
        if (data && data.notification_preferences && mounted) {
          const prefs = data.notification_preferences as any;
          const dr = prefs.deliveryReminders !== false;
          const da = !!prefs.deadlineAlerts;
          const ta = !!prefs.teamActivity;
          setDeliveryReminders(dr);
          setDeadlineAlerts(da);
          setTeamActivity(ta);
          setInitialPrefs({ deliveryReminders: dr, deadlineAlerts: da, teamActivity: ta });
        }
      } catch (err) {
        console.error('Error loading notifications', err);
      }
    }
    loadNotifications();
    return () => { mounted = false; };
  }, []);

  async function saveNotifications() {
    setSaving(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData?.user?.id;
      if (!userId) throw new Error('Not authenticated');

      const prefs = { deliveryReminders, deadlineAlerts, teamActivity };
      const { error } = await supabase
        .from('workspace_settings')
        .upsert({
          user_id: userId,
          notification_preferences: prefs
        }, { onConflict: 'user_id' });

      if (error) throw error;
      setInitialPrefs(prefs);
      try { alert('Notification preferences saved'); } catch {}
    } catch (err) {
      console.error('Error saving notifications', err);
      try { alert('Failed to save notification preferences'); } catch {}
    } finally {
      setSaving(false);
    }
  }

  const items = [
    { label: "Delivery reminders", sub: "Show/hide", checked: deliveryReminders, onChange: setDeliveryReminders },
    { label: "Deadline alerts for orders", sub: "Show/hide", checked: deadlineAlerts, onChange: setDeadlineAlerts },
    { label: "Team activity notifications", sub: "Show/hide", checked: teamActivity, onChange: setTeamActivity },
  ];

  return (
    <div className="tailora-settings-row" style={{ display: "flex", alignItems: "flex-start", gap: 56, padding: "22px 24px" }}>
      {/* Left */}
      <div className="tailora-settings-row-left" style={{ display: "flex", flexDirection: "column", gap: 20, width: 305, flexShrink: 0 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: "#28292D", fontFamily: "Satoshi, sans-serif" }}>Notifications</span>
          <span style={{ fontSize: 14, color: "#667185", fontFamily: "Satoshi, sans-serif", lineHeight: "22px" }}>Manage how and when you receive updates.</span>
        </div>
        <button
          style={{
            width: 124,
            height: 38,
            background: isDirty ? "#121212" : "#D0D5DD",
            border: "none",
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 700,
            color: "#fff",
            fontFamily: "Satoshi, sans-serif",
            cursor: isDirty ? "pointer" : "default",
            opacity: isDirty ? 1 : 0.6,
            transition: "background 0.2s, opacity 0.2s",
          }}
          onClick={saveNotifications}
          disabled={!isDirty || saving}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Right: toggle rows */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 0, width: "100%", minWidth: 0 }}>
        {items.map((item, i) => (
          <div key={i}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0" }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 500, color: "#28292D", fontFamily: "Satoshi, sans-serif" }}>{item.label}</div>
                <div style={{ fontSize: 12, color: "#6C717D", fontFamily: "Satoshi, sans-serif" }}>{item.sub}</div>
              </div>
              <Toggle checked={item.checked} onChange={item.onChange} />
            </div>
            {i < items.length - 1 && <SectionDivider />}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── SECURITY TAB ── */
function SecurityTab() {
  const [twoFA, setTwoFA] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function loadSecurity() {
      try {
        const { data: userData } = await supabase.auth.getUser();
        const userId = userData?.user?.id;
        if (!userId) return;

        const { data, error } = await supabase
          .from('workspace_settings')
          .select('two_factor_enabled')
          .eq('user_id', userId)
          .maybeSingle();

        if (error) return;
        if (data && mounted) {
          setTwoFA(!!data.two_factor_enabled);
        }
      } catch (err) {
        console.error('Error loading security settings', err);
      }
    }
    loadSecurity();
    return () => { mounted = false; };
  }, []);

  async function handleToggle2FA(checked: boolean) {
    setTwoFA(checked);
    try {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData?.user?.id;
      if (!userId) return;

      const { error } = await supabase
        .from('workspace_settings')
        .upsert({
          user_id: userId,
          two_factor_enabled: checked
        }, { onConflict: 'user_id' });

      if (error) throw error;
    } catch (err) {
      console.error('Error saving 2FA setting', err);
      setTwoFA(!checked);
      try { alert('Failed to update 2FA setting'); } catch {}
    }
  }

  return (
    <>
      {showChangePassword && (
        <ChangePasswordModal onClose={() => setShowChangePassword(false)} />
      )}

      <div className="tailora-settings-row" style={{ display: "flex", alignItems: "flex-start", gap: 56, padding: "22px 24px" }}>
        {/* Left */}
        <div className="tailora-settings-row-left" style={{ display: "flex", flexDirection: "column", gap: 6, width: 305, flexShrink: 0 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: "#101928", fontFamily: "Satoshi, sans-serif" }}>Security</span>
          <span style={{ fontSize: 14, color: "#667185", fontFamily: "Satoshi, sans-serif" }}>Protect your account and data.</span>
        </div>

        {/* Right */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 0, width: "100%", minWidth: 0 }}>
          {/* Change password row */}
          <div
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", cursor: "pointer" }}
            onClick={() => setShowChangePassword(true)}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            <div>
              <div style={{ fontSize: 15, fontWeight: 500, color: "#28292D", fontFamily: "Satoshi, sans-serif" }}>Change password</div>
              <div style={{ fontSize: 12, color: "#6C717D", fontFamily: "Satoshi, sans-serif", letterSpacing: 2 }}>••••••••••••</div>
            </div>
            <ChevronRightIcon />
          </div>

          <SectionDivider />

          {/* 2FA row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0" }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 500, color: "#28292D", fontFamily: "Satoshi, sans-serif" }}>Two-Factor Authentication (2FA)</div>
              <div style={{ fontSize: 12, color: "#6C717D", fontFamily: "Satoshi, sans-serif" }}>Show/hide</div>
            </div>
            <Toggle checked={twoFA} onChange={handleToggle2FA} />
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Badge icon next to "Settings" heading ── */
function SettingsBadge() {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 26, height: 26, borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
      <svg width="32" height="23" viewBox="0 0 32 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.02123 19.5861C5.55358 19.5063 5.11068 19.3284 4.71976 19.0111C3.53728 18.0511 3.26194 16.2147 3.85245 13.2335C4.6411 9.25281 3.91801 7.68119 3.44356 7.54271C3.11819 7.44461 2.36889 7.95628 1.86821 9.11761C1.66183 9.59642 1.09463 9.82456 0.597837 9.62365C0.102506 9.42368 -0.13109 8.87446 0.0748127 8.39613C0.930473 6.41143 2.55391 5.32472 4.00299 5.74485C4.94461 6.01805 6.99974 7.33007 5.76044 13.5865C5.17284 16.5541 5.71042 17.3639 5.96974 17.5737C6.59231 18.0779 8.27012 17.4629 9.27438 17.0949C9.69881 16.939 10.0655 16.8053 10.3879 16.7236C10.9056 16.5926 11.4373 16.8921 11.5733 17.3939C11.7088 17.8953 11.3985 18.4088 10.8794 18.5398C10.6569 18.5956 10.3204 18.7196 9.96299 18.8505C8.86112 19.2552 7.34211 19.8114 6.02123 19.5861Z" fill="#740D23"/>
<path d="M10.581 17.5258C10.9389 17.4085 11.2749 17.2986 11.5124 17.2409C11.3196 16.8339 10.8486 16.6062 10.3862 16.7236C10.0638 16.8053 9.69716 16.939 9.27273 17.0949C8.26895 17.4624 6.59114 18.0779 5.96809 17.5737C5.70926 17.3639 5.17119 16.5541 5.75879 13.5865C6.99809 7.33007 4.94247 6.01805 4.00134 5.74485C2.55274 5.32472 0.928821 6.41143 0.0731603 8.39613C0.059563 8.42805 0.05277 8.46138 0.042572 8.4933C0.11153 8.54024 0.184853 8.58248 0.267894 8.6144C0.80596 8.82236 1.41397 8.60173 1.63007 8.1248C2.15308 6.96581 2.98979 6.02087 3.86876 6.18563C4.39323 6.28374 5.57815 8.45949 4.78465 12.4392C4.19025 15.4209 4.31359 17.5798 5.80249 18.2426C7.37541 18.943 9.3985 17.9164 10.581 17.5258Z" fill="#E60F3F"/>
<path d="M25.5038 21.7437C31.357 18.8601 33.6836 11.9362 30.7004 6.27968C27.7173 0.620852 20.5544 -1.62718 14.7022 1.25645C8.84903 4.13914 6.52244 11.063 9.5056 16.7214C12.4888 22.3784 19.6516 24.6273 25.5038 21.7437Z" fill="#740D23"/>
<path d="M10.3693 16.2935C7.63376 11.1059 9.77485 4.73406 15.1414 2.09077C20.5075 -0.553457 27.0983 1.51666 29.8338 6.7042C32.5683 11.8908 30.4277 18.2617 25.0612 20.906C19.6951 23.5492 13.1038 21.4801 10.3693 16.2935Z" fill="#E60F3F"/>
<path d="M10.0784 15.6894C10.1702 15.8932 10.2663 16.0964 10.3717 16.2973C10.8539 17.2113 11.4581 18.0276 12.1525 18.7388C9.55443 12.3814 12.3429 5.01488 18.7681 1.84913C19.4931 1.49237 20.2356 1.20649 20.9878 0.982582C20.0627 0.908414 19.1231 0.946903 18.1907 1.10744C17.9464 1.21118 17.7026 1.32009 17.4613 1.43932C11.9111 4.17321 9.07367 10.0438 10.0784 15.6894Z" fill="#740D23"/>
<path d="M12.1507 18.7415C12.6994 19.3053 13.305 19.8034 13.9552 20.2296C10.553 13.6493 13.2802 5.60817 20.0731 2.2617C20.9414 1.83453 21.8349 1.50453 22.7406 1.267C22.1656 1.12853 21.579 1.03229 20.9865 0.985352C20.2343 1.20926 19.4918 1.49514 18.7668 1.8519C12.341 5.01765 9.5531 12.3842 12.1507 18.7415Z" fill="#E60F3F"/>
<path d="M13.9549 20.2282C14.4458 20.5502 14.962 20.8305 15.4967 21.0699C15.4341 20.9591 15.369 20.8488 15.3088 20.7352C11.8303 14.1366 14.5531 6.03302 21.3785 2.67106C22.2526 2.24013 23.1525 1.91014 24.0635 1.67074C23.6318 1.50832 23.1894 1.37359 22.7397 1.26562C21.834 1.50315 20.9405 1.83315 20.0722 2.26032C13.2799 5.60679 10.5526 13.6479 13.9549 20.2282Z" fill="#740D23"/>
<path d="M15.3103 20.7363C15.3706 20.8499 15.4356 20.9602 15.4983 21.071C15.9407 21.2701 16.3952 21.4405 16.86 21.5799C16.7774 21.4367 16.6944 21.294 16.6171 21.1461C13.1382 14.5485 15.861 6.44491 22.6869 3.082C23.4882 2.68769 24.3118 2.37881 25.1456 2.14598C24.794 1.96995 24.4342 1.81129 24.0656 1.67188C23.1546 1.91128 22.2542 2.24127 21.3806 2.6722C14.5547 6.03416 11.8319 14.1377 15.3103 20.7363Z" fill="#E60F3F"/>
<path d="M16.6166 21.1466C16.6938 21.294 16.7769 21.4372 16.8594 21.5804C17.2674 21.7034 17.6826 21.8024 18.1036 21.8794C18.0434 21.7719 17.9807 21.6668 17.9234 21.5574C14.4445 14.9588 17.1673 6.85522 23.9932 3.49325C24.6721 3.15856 25.367 2.88536 26.0707 2.66802C25.7706 2.47837 25.4612 2.30515 25.1451 2.14648C24.3113 2.37932 23.4881 2.6882 22.6864 3.08251C15.861 6.44542 13.1377 14.549 16.6166 21.1466Z" fill="#740D23"/>
<path d="M17.9227 21.5573C17.98 21.6662 18.0427 21.7719 18.1029 21.8794C18.4861 21.9479 18.8736 22.0005 19.264 22.0296C19.2528 22.0084 19.2402 21.9882 19.2291 21.9671C15.7506 15.3685 18.4734 7.26497 25.2988 3.903C25.8218 3.64529 26.355 3.42701 26.8931 3.23924C26.6275 3.03551 26.3531 2.84494 26.0705 2.66797C25.3668 2.88531 24.6719 3.15851 23.993 3.4932C17.1666 6.85517 14.4438 14.9587 17.9227 21.5573Z" fill="#E60F3F"/>
<path d="M19.2284 21.9652C19.2396 21.9863 19.2522 22.0065 19.2634 22.0276C19.6329 22.0563 20.0044 22.0661 20.3774 22.0581C17.1485 15.5191 19.8879 7.6198 26.6045 4.31087C26.9434 4.14423 27.2878 3.99542 27.6335 3.85788C27.3956 3.63961 27.1479 3.43258 26.8925 3.2373C26.3544 3.42507 25.8212 3.64335 25.2982 3.90106C18.4733 7.26303 15.7499 15.3666 19.2284 21.9652Z" fill="#740D23"/>
<path d="M20.3768 22.0567C20.7356 22.0483 21.0945 22.0229 21.4539 21.9797C18.5911 15.5398 21.3601 7.94648 27.9107 4.72017C28.0427 4.65398 28.1768 4.59531 28.3103 4.53476C28.0947 4.29723 27.8679 4.07191 27.6334 3.85645C27.2876 3.99398 26.9433 4.14232 26.6043 4.30943C19.8873 7.61883 17.1474 15.5182 20.3768 22.0567Z" fill="#E60F3F"/>
<path d="M21.4566 21.9811C21.8111 21.9379 22.1651 21.8783 22.5172 21.8022C20.1095 15.5923 22.7853 8.48722 28.9298 5.28251C28.7346 5.02292 28.5292 4.77366 28.3126 4.53613C28.179 4.59669 28.045 4.65536 27.9129 4.72155C21.3629 7.94832 18.5944 15.5416 21.4566 21.9811Z" fill="#740D23"/>
<path d="M26.6528 19.944C26.8363 19.8112 27.0184 19.6727 27.1957 19.5267C28.0033 18.8601 28.6832 18.102 29.2372 17.2833C23.4472 21.2081 15.3859 20.3055 10.7031 15.0043C10.1748 14.4068 9.71438 13.7749 9.31326 13.1191C9.45409 14.0068 9.71245 14.8804 10.0907 15.7192C10.2525 15.9249 10.4195 16.129 10.5953 16.3281C14.6405 20.9077 21.2075 22.2047 26.6528 19.944Z" fill="#740D23"/>
<path d="M29.2383 17.2872C29.6763 16.6399 30.0371 15.955 30.3144 15.2434C24.488 19.977 15.7624 19.2884 10.812 13.684C10.1792 12.9681 9.63873 12.2044 9.18856 11.4092C9.18274 11.9814 9.22353 12.555 9.31434 13.1226C9.71546 13.7779 10.1758 14.4097 10.7042 15.0077C15.3865 20.3093 23.4483 21.2125 29.2383 17.2872Z" fill="#E60F3F"/>
<path d="M30.3163 15.2394C30.5256 14.7037 30.6868 14.1531 30.8034 13.5945C30.7058 13.679 30.6106 13.7659 30.5101 13.8485C24.6841 18.6572 15.8963 17.9878 10.9217 12.3557C10.285 11.6352 9.74209 10.8667 9.28997 10.0654C9.22733 10.509 9.1948 10.9564 9.19092 11.4047C9.64109 12.1994 10.1816 12.9631 10.8143 13.6795C15.7642 19.2843 24.4894 19.973 30.3163 15.2394Z" fill="#740D23"/>
<path d="M30.5082 13.8521C30.6088 13.7695 30.7039 13.6826 30.8015 13.5981C30.8977 13.1362 30.9633 12.6692 30.9953 12.1993C30.87 12.3101 30.7457 12.4222 30.616 12.5293C24.7901 17.338 16.0023 16.6686 11.0276 11.0365C10.4434 10.3747 9.94131 9.67334 9.51251 8.94434C9.41684 9.31471 9.34156 9.69071 9.28766 10.0695C9.74026 10.8708 10.2827 11.6393 10.9193 12.3598C15.8945 17.9914 24.6823 18.6608 30.5082 13.8521Z" fill="#E60F3F"/>
<path d="M30.616 12.5285C30.7461 12.421 30.87 12.3092 30.9953 12.1985C31.0234 11.7868 31.0268 11.3732 31.0055 10.9597C30.9122 11.0413 30.8204 11.1249 30.7243 11.2042C24.8978 16.0129 16.1101 15.3426 11.1359 9.71149C10.6406 9.15147 10.204 8.56188 9.82131 7.95117C9.70088 8.27742 9.59792 8.60836 9.51245 8.94305C9.94125 9.67206 10.4434 10.3734 11.0276 11.0352C16.0023 16.6683 24.79 17.3372 30.616 12.5285Z" fill="#740D23"/>
<path d="M30.7256 11.2059C30.8217 11.1261 30.9135 11.0426 31.0067 10.9614C30.9873 10.5844 30.949 10.2084 30.8878 9.83569C30.8693 9.85024 30.8523 9.86761 30.8334 9.88263C25.0069 14.6913 16.2197 14.022 11.245 8.39082C10.8642 7.95896 10.5199 7.50878 10.2048 7.04688C10.0625 7.34402 9.93478 7.64632 9.8226 7.95379C10.2053 8.56451 10.6423 9.15409 11.1372 9.71411C16.1119 15.3448 24.8991 16.0146 30.7256 11.2059Z" fill="#E60F3F"/>
<path d="M30.833 9.88249C30.8519 9.86794 30.8689 9.85056 30.8874 9.83554C30.8296 9.4816 30.7538 9.12955 30.6572 8.7803C24.8327 13.3416 16.2474 12.6079 11.3524 7.06693C11.1052 6.78716 10.876 6.49846 10.6565 6.20508C10.4918 6.48016 10.3418 6.76087 10.2039 7.04674C10.5186 7.50865 10.8629 7.95881 11.2441 8.39067C16.2192 14.0218 25.0065 14.6912 30.833 9.88249Z" fill="#740D23"/>
<path d="M30.6565 8.77764C30.5647 8.44295 30.4555 8.11107 30.3282 7.78388C24.5178 11.9767 16.2341 11.1449 11.46 5.74004C11.3638 5.63113 11.2725 5.51895 11.1807 5.40723C10.9923 5.66588 10.819 5.93156 10.6563 6.20195C10.8753 6.49533 11.105 6.78402 11.3522 7.0638C16.2467 12.6053 24.8315 13.339 30.6565 8.77764Z" fill="#E60F3F"/>
<path d="M30.3278 7.78434C30.2025 7.46091 30.0597 7.14265 29.9004 6.82908C24.2153 10.5403 16.4435 9.68219 11.7869 4.65332C11.5712 4.89836 11.3687 5.14951 11.1798 5.40769C11.2716 5.51941 11.3629 5.63159 11.4591 5.7405C16.2332 11.1454 24.5174 11.9772 30.3278 7.78434Z" fill="#740D23"/>
</svg>
    </span>
  );
}

/* ── MAIN SETTINGS PAGE ── */
export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Profile");

  type UserRole = 'Owner' | 'Admin' | 'Tailor' | 'Assistant';
  const [userRole, setUserRole] = useState<UserRole>(() => {
    try {
      const cachedRole = localStorage.getItem('tailora_role');
      if (cachedRole && ['Owner', 'Admin', 'Tailor', 'Assistant'].includes(cachedRole)) {
        return cachedRole as UserRole;
      }
    } catch {}
    return 'Owner';
  });

  useEffect(() => {
    let mounted = true;
    async function loadRole() {
      const { data: rpcResult, error: rpcErr } = await supabase.rpc('get_my_team_role');
      if (!rpcErr && rpcResult && rpcResult.length > 0 && mounted) {
        setUserRole(rpcResult[0].role as UserRole);
      }
    }
    loadRole();
    return () => { mounted = false; };
  }, []);

  if (userRole !== 'Owner') {
    return (
      <div className="tailora-page-view" style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <h2 style={{ fontFamily: "Sora, sans-serif" }}>Access Denied</h2>
        <p style={{ color: "#667185" }}>You do not have permission to access Settings.</p>
      </div>
    );
  }

  const tabs: Tab[] = ["Profile", "Workspace", "Notifications", "Security"];

  return (
    <div className="tailora-page-view" style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
        <AppPageHeader title="Settings" />

        <div className="tailora-page-scroll" style={{ flex: 1, overflowY: "auto", overflowX: "hidden", background: "#FDFDFD", position: "relative", WebkitOverflowScrolling: "touch" }}>
          <div className="tailora-page-gradient" style={{ background: "linear-gradient(180deg, #FDF6EC 0%, rgba(253,246,236,0) 100%)", height: 144, position: "absolute", left: 0, right: 0, top: 0, pointerEvents: "none" }} />

          <div className="tailora-page-content" style={{ padding: "40px 36px", position: "relative" }}>
            <div className="tailora-page-header-row" style={{ marginBottom: 28 }}>
              <div className="tailora-page-header-text">
                <h1 className="tailora-page-title" style={{ margin: "0 0 4px", fontFamily: "var(--font-sora)", fontWeight: 600, fontSize: 24, color: "#121212", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  Settings <SettingsBadge/>
                </h1>
                <p className="tailora-page-subtitle" style={{ margin: 0, fontSize: 14, fontWeight: 300, color: "#696969", fontFamily: "var(--font-satoshi)" }}>
                  Manage your personal account, workspace preferences, and security in one place.
                </p>
              </div>
            </div>

           {/* Tab bar — segmented button group matching Figma */}
<div
  className="tailora-settings-tabs"
  style={{
    display: "inline-flex",
    flexWrap: "wrap",
    marginBottom: 20,
    border: "1px solid #E4E7EC",
    borderRadius: 8,
    overflow: "hidden",
    background: "#fff",
  }}
>
  {tabs.map((tab, i) => {
    const isActive = activeTab === tab;
    const isFirst  = i === 0;
    const isLast   = i === tabs.length - 1;

    return (
      <button
        type="button"
        key={tab}
        onClick={() => setActiveTab(tab)}
        style={{
          padding: "10px 16px",
          height: 42,
          background: isActive ? "#F8F8F8" : "#FFFFFF",
          border: "none",
          borderRight: isLast ? "none" : "1px solid #E4E7EC",
          borderRadius: isFirst ? "7px 0 0 7px" : isLast ? "0 7px 7px 0" : 0,
          cursor: "pointer",
          fontSize: 14,
          fontWeight: isActive ? 700 : 500,
          color: isActive ? "#28292D" : "#717680",
          fontFamily: "Satoshi, sans-serif",
          lineHeight: "22px",
          whiteSpace: "nowrap",
          transition: "background 0.15s, color 0.15s",
        }}
        onMouseEnter={e => {
          if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = "#FAFAFA";
        }}
        onMouseLeave={e => {
          if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = "#FFFFFF";
        }}
      >
        {tab}
      </button>
    );
  })}
</div>

            {/* Tab content card */}
            <div className="tailora-settings-card" style={{
              background: "#fff",
              borderRadius: 10,
              border: "1px solid #E5E7EB",
              overflow: "hidden",
              maxWidth: 1052,
            }}>
              {activeTab === "Profile" && <ProfileTab />}
              {activeTab === "Workspace" && <WorkspaceTab />}
              {activeTab === "Notifications" && <NotificationsTab />}
              {activeTab === "Security" && <SecurityTab />}
            </div>
          </div>
        </div>
    </div>
  );
}