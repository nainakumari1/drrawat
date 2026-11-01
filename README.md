# Dr. Rawat’s Dental Care – Node.js website

Express + EJS site, 6 pages: Home, About Us, Services (with dropdown), Our Dentist, Reviews, Contact (with appointment form).
Brand: indigo + coral, Sora + DM Sans. Animated hero, scrolling treatments strip, tilt cards, scroll progress bar (all respect "reduce motion").

## Run / deploy (Render)

Build Command `npm install`, Start Command `npm start`. Upload the whole project (`data`, `views`, `public` next to `server.js`). Node 22 is pinned. Optional: `SITE_URL=https://yourdomain.com`.

## Appointment enquiries reach the clinic through a webhook

Set the environment variable **`ENQUIRY_WEBHOOK_URL`** to a service that forwards JSON to the clinic's email or phone (Zapier, Make, Formspree, a Google Apps Script URL…).
Each enquiry is sent as JSON: clinic, name, phone, email, treatment, date, time, message, receivedAt.
Without it, enquiries are only printed in the server log and saved to `data/enquiries.jsonl`, which can be wiped on redeploy, so set the webhook before launch.

## Everything editable is in `data/site.js`

Treatments (`services`), timings (`hours`), reviews (`reviews`), phone, address, gallery slots.

## Still needed from the clinic

| Item | Notes |
|------|-------|
| Dr. Shivani Rawat's full name, qualifications, specialisation, experience, registration, photo | Dashed "to be added" tags show until filled. `showPlaceholders: false` hides empty ones. |
| Confirm timings | Shown as per listing (daily, 10 AM – 2 PM and 5 PM – 8 PM, including Sunday) with a "please confirm" note. |
| Confirm the treatment menu | Only the 5 treatments from patient feedback are shown. |
| Verify rating | 5.0 / 87 is hidden (`ratings.show: false`) until the source is verified. No Justdial rating is shown. |
| Real clinic photos | `public/images/`: `hero`, `clinic-1`, `doctor-shivani-rawat`, `gallery-reception`, `gallery-waiting`, `gallery-treatment-room`, `gallery-equipment`, `gallery-team` (.jpg/.png/.webp/.avif). |
| WhatsApp | None shown until the clinic confirms the number uses it. |
| Email / social links | Hidden until supplied. |
