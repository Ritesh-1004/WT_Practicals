import { useEffect, useState } from "react";
import { EVENTS } from "./data/events.js";
import EventList from "./components/EventList.jsx";
import RegistrationForm from "./components/RegistrationForm.jsx";
import RegistrationList from "./components/RegistrationList.jsx";

const STORAGE_KEY = "campus-events-registrations";

function loadSaved() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export default function App() {
  // Main state: the list of registrations and the event picked on a card
  const [registrations, setRegistrations] = useState(loadSaved);
  const [selectedEventId, setSelectedEventId] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(registrations));
    } catch {
      /* storage not available, the app still works */
    }
  }, [registrations]);

  const seatsLeft = (eventId) => {
    const event = EVENTS.find((e) => e.id === eventId);
    const taken = registrations.filter((r) => r.eventId === eventId).length;
    return event.seats - taken;
  };

  // Called by the form. Returns { ok, message } so the form can show it.
  const register = (data) => {
    const event = EVENTS.find((e) => e.id === data.eventId);
    if (seatsLeft(data.eventId) <= 0) {
      return { ok: false, message: `Sorry, "${event.title}" is full.` };
    }
    const email = data.email.trim().toLowerCase();
    if (registrations.some((r) => r.eventId === data.eventId && r.email === email)) {
      return { ok: false, message: "This email is already registered for this event." };
    }
    const entry = {
      id: Date.now(),
      name: data.name.trim(),
      email,
      mobile: data.mobile.trim(),
      year: data.year,
      eventId: data.eventId,
    };
    setRegistrations([...registrations, entry]);
    return { ok: true, message: `Done! ${entry.name}, you are registered for "${event.title}".` };
  };

  const cancel = (id) => setRegistrations(registrations.filter((r) => r.id !== id));

  const totalLeft = EVENTS.reduce((sum, e) => sum + seatsLeft(e.id), 0);

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <span className="logo">CE</span>
          <span className="brand">Campus Events</span>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-inner">
          <h1>Reserve your seat at this semester's events</h1>
          <p>Choose an event, fill in your details and get an instant confirmation.</p>
          <div className="stats">
            <div><b>{EVENTS.length}</b><span>Events</span></div>
            <div><b>{totalLeft}</b><span>Seats left</span></div>
            <div><b>{registrations.length}</b><span>Registered</span></div>
          </div>
        </div>
      </header>

      <main className="page">
        <h2 className="section-title">Upcoming events</h2>
        <EventList events={EVENTS} seatsLeft={seatsLeft} selectedId={selectedEventId} onSelect={setSelectedEventId} />

        <div className="columns">
          <RegistrationForm events={EVENTS} seatsLeft={seatsLeft} selectedEventId={selectedEventId} onRegister={register} />
          <RegistrationList events={EVENTS} registrations={registrations} onCancel={cancel} />
        </div>
      </main>

      <footer className="footer">Campus Events · Student registration portal</footer>
    </>
  );
}
