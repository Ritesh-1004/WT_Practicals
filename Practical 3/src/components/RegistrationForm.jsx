import { useEffect, useState } from "react";
import { validateField, validateAll } from "../validate.js";

const EMPTY = { name: "", email: "", mobile: "", year: "", eventId: "", agree: false };

export default function RegistrationForm({ events, seatsLeft, selectedEventId, onRegister }) {
  const [values, setValues] = useState(EMPTY);   // what the user typed
  const [errors, setErrors] = useState({});      // error message for each field
  const [result, setResult] = useState(null);    // success / failure message after submit

  // When a card is selected, fill the event field
  useEffect(() => {
    if (selectedEventId) {
      setValues((v) => ({ ...v, eventId: selectedEventId }));
      setErrors((e) => ({ ...e, eventId: "" }));
    }
  }, [selectedEventId]);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setValues({ ...values, [name]: newValue });
    // Only re-check a field that already shows an error, so typing is not annoying
    if (errors[name]) setErrors({ ...errors, [name]: validateField(name, newValue) });
    setResult(null);
  };

  // Check a field when the user leaves it
  const handleBlur = (e) => {
    const { name, type, value, checked } = e.target;
    setErrors({ ...errors, [name]: validateField(name, type === "checkbox" ? checked : value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validateAll(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setResult({ ok: false, message: "Please fix the errors shown below." });
      return;
    }
    const outcome = onRegister(values);
    setResult(outcome);
    if (outcome.ok) {
      setValues(EMPTY);
      setErrors({});
    }
  };

  const field = (name) => ({
    name,
    value: values[name],
    onChange: handleChange,
    onBlur: handleBlur,
    className: errors[name] ? "bad" : "",
    "aria-invalid": Boolean(errors[name]),
  });

  return (
    <section className="card">
      <div className="card-head"><h2>Registration form</h2></div>
      <p className="sub">All fields are required.</p>

      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="name">Full name</label>
        <input id="name" type="text" placeholder="e.g. Ritesh Gavhane" {...field("name")} />
        <p className="error">{errors.name}</p>

        <label htmlFor="email">Email</label>
        <input id="email" type="email" placeholder="name@example.com" {...field("email")} />
        <p className="error">{errors.email}</p>

        <div className="row">
          <div>
            <label htmlFor="mobile">Mobile number</label>
            <input id="mobile" type="tel" inputMode="numeric" maxLength={12} placeholder="10 digits" {...field("mobile")} />
            <p className="error">{errors.mobile}</p>
          </div>
          <div>
            <label htmlFor="year">Year of study</label>
            <select id="year" {...field("year")}>
              <option value="">Choose…</option>
              <option>1st year</option>
              <option>2nd year</option>
              <option>3rd year</option>
              <option>4th year</option>
            </select>
            <p className="error">{errors.year}</p>
          </div>
        </div>

        <label htmlFor="eventId">Event</label>
        <select id="eventId" {...field("eventId")}>
          <option value="">Choose…</option>
          {events.map((ev) => (
            <option key={ev.id} value={ev.id} disabled={seatsLeft(ev.id) <= 0}>
              {ev.title}{seatsLeft(ev.id) <= 0 ? " (full)" : ""}
            </option>
          ))}
        </select>
        <p className="error">{errors.eventId}</p>

        <label className="check">
          <input type="checkbox" name="agree" checked={values.agree} onChange={handleChange} onBlur={handleBlur} />
          <span>I will attend and carry my college ID card.</span>
        </label>
        <p className="error">{errors.agree}</p>

        <button type="submit" className="btn primary">Register now</button>
      </form>

      {result && (
        <p className={result.ok ? "msg success" : "msg failure"} role="status">{result.message}</p>
      )}
    </section>
  );
}
