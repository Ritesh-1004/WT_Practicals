// All validation rules live here, so the components stay simple.
// Each function returns an error message, or "" when the value is valid.

export function validateField(name, value) {
  const v = typeof value === "string" ? value.trim() : value;

  switch (name) {
    case "name":
      if (!v) return "Please enter your full name.";
      if (v.length < 3) return "Name must be at least 3 characters.";
      if (v.length > 40) return "Name can be at most 40 characters.";
      if (!/^[A-Za-z][A-Za-z .'-]*$/.test(v)) return "Name can contain only letters and spaces.";
      return "";

    case "email":
      if (!v) return "Please enter your email.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return "Enter a valid email, like name@example.com.";
      return "";

    case "mobile":
      if (!v) return "Please enter your mobile number.";
      if (!/^\d+$/.test(v)) return "Mobile number must contain digits only.";
      if (v.length !== 10) return "Mobile number must be exactly 10 digits.";
      if (!/^[6-9]/.test(v)) return "Mobile number must start with 6, 7, 8 or 9.";
      return "";

    case "year":
      return v ? "" : "Please select your year of study.";

    case "eventId":
      return v ? "" : "Please choose an event.";

    case "agree":
      return value ? "" : "You must accept the rules to register.";

    default:
      return "";
  }
}

export function validateAll(values) {
  const errors = {};
  Object.keys(values).forEach((field) => {
    const msg = validateField(field, values[field]);
    if (msg) errors[field] = msg;
  });
  return errors;
}
