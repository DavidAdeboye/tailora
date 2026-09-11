"use client";

import { useState, useEffect } from "react";

export interface NoteItem {
  id: string;
  title: string;
  content: string;
  category: "Client" | "Order" | "Fitting" | "General";
  createdAt: string;
}

export default function NotesWidget() {
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<NoteItem["category"]>("General");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("tailora_notes_data");
      if (saved) setNotes(JSON.parse(saved));
    } catch {}
  }, []);

  const saveNotes = (updated: NoteItem[]) => {
    setNotes(updated);
    try {
      localStorage.setItem("tailora_notes_data", JSON.stringify(updated));
    } catch {}
  };

  const handleAddOrUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() && !content.trim()) return;

    if (editingId) {
      const updated = notes.map(n => n.id === editingId ? { ...n, title, content, category } : n);
      saveNotes(updated);
      setEditingId(null);
    } else {
      const newNote: NoteItem = {
        id: Date.now().toString(),
        title: title.trim() || "Untitled Note",
        content: content.trim(),
        category,
        createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" }),
      };
      saveNotes([newNote, ...notes]);
    }
    setTitle("");
    setContent("");
    setCategory("General");
  };

  const handleDelete = (id: string) => {
    saveNotes(notes.filter(n => n.id !== id));
  };

  const handleEdit = (note: NoteItem) => {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);
    setCategory(note.category);
  };

  const filtered = notes.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.content.toLowerCase().includes(search.toLowerCase()) ||
    n.category.toLowerCase().includes(search.toLowerCase())
  );

  const categoryColors: Record<NoteItem["category"], { bg: string; color: string }> = {
    Client: { bg: "#E3EFFC", color: "#04326B" },
    Order: { bg: "#FEF6E7", color: "#865503" },
    Fitting: { bg: "#E7F6EC", color: "#036B26" },
    General: { bg: "#F1F5F9", color: "#475569" },
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 900 }}>
      {/* Form section */}
      <form onSubmit={handleAddOrUpdate} style={{ background: "#fff", border: "1px solid #E2E4E9", borderRadius: 14, padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#121212", fontFamily: "Sora, sans-serif" }}>
          {editingId ? "Edit Note" : "Create Quick Note"}
        </h3>
        <div style={{ display: "flex", gap: 12 }}>
          <input
            type="text"
            placeholder="Note title..."
            value={title}
            onChange={e => setTitle(e.target.value)}
            style={{ flex: 2, height: 40, padding: "0 12px", border: "1px solid #E2E4E9", borderRadius: 8, fontSize: 14, outline: "none", fontFamily: "Satoshi, sans-serif" }}
          />
          <select
            value={category}
            onChange={e => setCategory(e.target.value as NoteItem["category"])}
            style={{ flex: 1, height: 40, padding: "0 12px", border: "1px solid #E2E4E9", borderRadius: 8, fontSize: 14, outline: "none", background: "#fff", cursor: "pointer", fontFamily: "Satoshi, sans-serif" }}
          >
            <option value="General">General Note</option>
            <option value="Client">Client Details</option>
            <option value="Order">Order Instructions</option>
            <option value="Fitting">Fitting / Adjustments</option>
          </select>
        </div>
        <textarea
          placeholder="Type your detailed notes here (e.g. client preferences, special fabric instructions, measurement adjustments...)"
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={3}
          style={{ width: "100%", padding: 12, border: "1px solid #E2E4E9", borderRadius: 8, fontSize: 14, outline: "none", resize: "vertical", fontFamily: "Satoshi, sans-serif", boxSizing: "border-box" }}
        />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          {editingId && (
            <button
              type="button"
              onClick={() => { setEditingId(null); setTitle(""); setContent(""); }}
              style={{ padding: "8px 16px", borderRadius: 999, border: "1px solid #D0D5DD", background: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            style={{ padding: "8px 20px", borderRadius: 999, border: "none", background: "#121212", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
          >
            {editingId ? "Save Note" : "Add Note"}
          </button>
        </div>
      </form>

      {/* List section */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#121212", fontFamily: "Sora, sans-serif" }}>
            Saved Notes ({filtered.length})
          </h3>
          <input
            type="search"
            placeholder="Search notes..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ height: 36, padding: "0 12px", border: "1px solid #E2E4E9", borderRadius: 8, fontSize: 13, width: 220, outline: "none" }}
          />
        </div>

        {filtered.length === 0 ? (
          <div style={{ background: "#F8FAFC", border: "1px dashed #CBD5E1", borderRadius: 12, padding: 32, textAlign: "center", color: "#64748B", fontSize: 14 }}>
            No notes found. Create your first note above!
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
            {filtered.map(n => {
              const catBadge = categoryColors[n.category];
              return (
                <div key={n.id} style={{ background: "#fff", border: "1px solid #E2E4E9", borderRadius: 12, padding: 16, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 12, boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                      <span style={{ background: catBadge.bg, color: catBadge.color, padding: "2px 8px", borderRadius: 999, fontSize: 11, fontWeight: 700 }}>
                        {n.category}
                      </span>
                      <span style={{ fontSize: 11, color: "#94A3B8" }}>{n.createdAt}</span>
                    </div>
                    <h4 style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 700, color: "#0F172A", fontFamily: "Sora, sans-serif" }}>
                      {n.title}
                    </h4>
                    <p style={{ margin: 0, fontSize: 13, color: "#475569", whiteSpace: "pre-wrap", lineHeight: 1.5 }}>
                      {n.content}
                    </p>
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, borderTop: "1px solid #F1F5F9", paddingTop: 10 }}>
                    <button
                      type="button"
                      onClick={() => handleEdit(n)}
                      style={{ background: "none", border: "none", color: "#0284C7", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(n.id)}
                      style={{ background: "none", border: "none", color: "#DC2626", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
