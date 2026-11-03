# Campus Events – Registration (ReactJS)

A small React app where students register for college events.
It shows client-side validation, clear error messages, success messages and interactive features.

## Run on your computer
1. Install Node.js (version 18 or newer) from https://nodejs.org
2. Open a terminal in this folder and run:
   npm install
   npm run dev
3. Open the link shown in the terminal (usually http://localhost:5173)

## Build for deployment
   npm run build
The ready site is created in the `dist` folder.

## Deploy (choose one)
**Netlify (easiest):** run `npm run build`, open https://app.netlify.com/drop and drag the `dist` folder onto the page. You get a live link.

**Vercel:** push this folder to GitHub, then on https://vercel.com choose "Add New > Project", import the repo and click Deploy. No settings need to be changed.

## Files
- src/App.jsx – main component, keeps the registrations and seat logic
- src/components/EventList.jsx – event cards with seats left
- src/components/RegistrationForm.jsx – form, validation, messages
- src/components/RegistrationList.jsx – list, search and cancel
- src/validate.js – all validation rules
- src/data/events.js – the events
