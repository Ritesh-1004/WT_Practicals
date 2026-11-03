import { useState } from "react";

const initials = (name) =>
  name.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");

export default function RegistrationList({ events, registrations, onCancel }) {
  const [search, setSearch] = useState("");

  const titleOf = (id) => events.find((e) => e.id === id)?.title;
  const q = search.trim().toLowerCase();
  const shown = registrations.filter(
    (r) => r.name.toLowerCase().includes(q) || titleOf(r.eventId).toLowerCase().includes(q)
  );

  return (
    <section className="card">
      <div className="card-head">
        <h2>Registered students</h2>
        <span className="count">{registrations.length}</span>
      </div>
      <p className="sub">Search the list or cancel a registration to free the seat.</p>

      <input
        type="search"
        placeholder="Search by name or event"
        aria-label="Search registrations"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {shown.length === 0 ? (
        <p className="empty">
          {registrations.length === 0 ? "No registrations yet. Select an event and register to see it here." : "No match found."}
        </p>
      ) : (
        <ul className="reg-list">
          {shown.map((r) => (
            <li key={r.id}>
              <span className="avatar">{initials(r.name)}</span>
              <div className="who">
                <strong>{r.name}</strong>
                <span className="muted">{titleOf(r.eventId)} · {r.year}</span>
                <span className="muted">{r.email}</span>
              </div>
              <button type="button" className="link" onClick={() => onCancel(r.id)}>Cancel</button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
