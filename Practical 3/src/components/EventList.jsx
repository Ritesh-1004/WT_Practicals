export default function EventList({ events, seatsLeft, selectedId, onSelect }) {
  return (
    <section aria-label="Events" className="events">
      {events.map((event) => {
        const left = seatsLeft(event.id);
        const full = left <= 0;
        const filled = ((event.seats - left) / event.seats) * 100;
        const level = full ? "full" : left <= 2 ? "low" : "ok";
        const selected = selectedId === event.id;
        return (
          <article key={event.id} className={"event" + (selected ? " picked" : "")}>
            <div className="event-top">
              <div className="date">
                <b>{event.day}</b>
                <span>{event.month}</span>
              </div>
              <div>
                <h3>{event.title}</h3>
                <p className="muted">{event.weekday} · {event.place}</p>
              </div>
            </div>

            <div className="bar" aria-hidden="true">
              <div className={"bar-fill " + level} style={{ width: filled + "%" }} />
            </div>
            <p className={"seats " + level}>
              {full ? "Registration closed, event is full" : `${left} of ${event.seats} seats left`}
            </p>

            <button type="button" className={selected ? "btn selected" : "btn"} disabled={full} onClick={() => onSelect(event.id)}>
              {selected ? "Selected" : "Select this event"}
            </button>
          </article>
        );
      })}
    </section>
  );
}
