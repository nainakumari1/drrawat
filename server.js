'use strict';

const express = require('express');
const compression = require('compression');
const path = require('path');
const fs = require('fs');
const site = require('./data/site');

const app = express();
const PORT = process.env.PORT || 3000;
const IMG_DIR = path.join(__dirname, 'public', 'images');
const IMG_EXT = ['.webp', '.jpg', '.jpeg', '.png', '.avif'];

app.set('trust proxy', 1);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.disable('x-powered-by');
app.use(express.urlencoded({ extended: false, limit: '10kb' }));
app.use(compression());

// Security + performance headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});

// Optional: redirect to HTTPS when FORCE_HTTPS=1
if (process.env.FORCE_HTTPS === '1') {
  app.use((req, res, next) => (req.secure ? next() : res.redirect(301, 'https://' + req.get('host') + req.originalUrl)));
}

app.use(
  express.static(path.join(__dirname, 'public'), {
    maxAge: '30d',
    setHeaders(res, file) {
      if (/\.(html?)$/.test(file)) res.setHeader('Cache-Control', 'no-cache');
    }
  })
);

// ---- Pages -------------------------------------------------------
const pages = [
  { path: '/', view: 'home', nav: 'home', priority: '1.0',
    title: 'Dentist in Pushp Vihar, Saket, South Delhi | Dr. Rawat’s Dental Care',
    description: 'Gentle, patient-focused dental care in Pushp Vihar, Saket, New Delhi: checkups, fillings, extractions, wisdom tooth consultation and teeth cleaning with Dr. Shivani Rawat. Call 096540 87169.' },
  { path: '/about', view: 'about', nav: 'about', priority: '0.8',
    title: 'About Us | Dental Clinic in Saket, South Delhi | Dr. Rawat’s Dental Care',
    description: 'About Dr. Rawat’s Dental Care, a dental clinic in Pushp Vihar, Saket, New Delhi, known for gentle treatment, clear communication and a clean, comfortable clinic.' },
  { path: '/services', view: 'services', nav: 'services', priority: '0.9',
    title: 'Dental Treatments in Saket | Fillings, Extraction, Cleaning | Dr. Rawat’s Dental Care',
    description: 'Dental checkups, tooth fillings, wisdom tooth consultation, tooth extraction and teeth cleaning at Dr. Rawat’s Dental Care, Pushp Vihar, Saket, South Delhi.' },
  { path: '/dentist', view: 'dentist', nav: 'dentist', priority: '0.7',
    title: 'Meet Dr. Shivani Rawat | Dentist in Saket, South Delhi',
    description: 'Meet Dr. Shivani Rawat of Dr. Rawat’s Dental Care, Pushp Vihar, Saket, described by patients as gentle, thorough and clear in her explanations.' },
  { path: '/reviews', view: 'reviews', nav: 'reviews', priority: '0.7',
    title: 'Patient Reviews | Dr. Rawat’s Dental Care, Pushp Vihar, Saket',
    description: 'What patients say about Dr. Rawat’s Dental Care in Pushp Vihar, Saket: gentle treatment, clear explanations, a clean clinic and friendly staff.' },
  { path: '/contact', view: 'contact', nav: 'contact', priority: '0.9',
    title: 'Contact & Book an Appointment | Dr. Rawat’s Dental Care, Pushp Vihar, Saket',
    description: 'Book an appointment or call 096540 87169. Dr. Rawat’s Dental Care, Shop Number 7, Sector 1, Pushp Vihar, Saket, New Delhi, Delhi – 110017. Open daily.' }
];

// ---- Template helpers -------------------------------------------
function findImage(slot) {
  for (const ext of IMG_EXT) {
    if (fs.existsSync(path.join(IMG_DIR, slot + ext))) return '/images/' + slot + ext;
  }
  return null;
}

const ICONS = {
  extract: '<path d="M12 3v6M9 6l3-3 3 3"/><path d="M8 12c-1.500 0-2.500 1.500-2 3.500.5 2 1 5 2.500 5s1.500-3 3.500-3 2 3 3.500 3 2-3 2.500-5c.5-2-.5-3.500-2-3.500H8Z"/>',
  dentures: '<path d="M3 10c3-3 15-3 18 0v2c0 2-2 3-3 3-1.500 0-2-1-3-1h-6c-1 0-1.500 1-3 1-1 0-3-1-3-3v-2Z"/><path d="M8 10v3M12 10v3M16 10v3"/>',
  surgery: '<path d="M4 20L16 8"/><path d="M14 4l6 6-3 1-4-4 1-3Z"/>',
  users: '<circle cx="9" cy="8" r="3.500"/><path d="M2.500 20c0-3.500 3-6 6.500-6s6.500 2.500 6.500 6"/><circle cx="17.500" cy="9" r="2.500"/><path d="M17 14c2.500 0 4.500 1.800 4.500 4.500"/>',
  tooth: '<path d="M12 2C9 2 7 3.5 5.5 4 4 5 3.5 7 4 9c.6 2.6 1.4 3.6 1.8 6 .3 2 .8 7 2.7 7 1.6 0 1.5-4.5 3.5-4.5S13.5 22 15.5 22c1.900 0 2.400-5 2.700-7 .4-2.400 1.200-3.400 1.800-6 .5-2-.1-4-1.500-5-1.500-.5-3.500-2-6.500-2Z"/>',
  braces: '<rect x="3" y="9" width="5" height="6" rx="1.500"/><rect x="9.500" y="9" width="5" height="6" rx="1.500"/><rect x="16" y="9" width="5" height="6" rx="1.500"/><path d="M2 12h20"/>',
  aligner: '<path d="M3 15c0-5 4-9 9-9s9 4 9 9"/><path d="M6 15c0-3.500 2.700-6 6-6s6 2.500 6 6"/><path d="M3 15h18"/>',
  implant: '<path d="M8 3h8l-1 5H9L8 3Z"/><path d="M9 10h6M9.500 13h5M10 16h4M11 19h2"/>',
  sparkle: '<path d="M12 3l1.800 5.200L19 10l-5.200 1.800L12 17l-1.800-5.200L5 10l5.200-1.800L12 3Z"/><path d="M19 16l.8 2.200L22 19l-2.200.8L19 22l-.8-2.200L16 19l2.200-.8L19 16Z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.900 4.900l2.100 2.100M17 17l2.100 2.100M4.900 19.100L7 17M17 7l2.100-2.100"/>',
  shield: '<path d="M12 2l8 3v6c0 5-3.400 9-8 11-4.600-2-8-6-8-11V5l8-3Z"/><path d="M8.500 12l2.500 2.500 4.500-5"/>',
  wave: '<path d="M2 8c2.500-3 5-3 7.500 0s5 3 7.500 0 3-2 5-2"/><path d="M2 15c2.500-3 5-3 7.500 0s5 3 7.500 0 3-2 5-2"/>',
  crown: '<path d="M3 8l4.500 4L12 5l4.500 7L21 8l-2 11H5L3 8Z"/>',
  heart: '<path d="M12 21s-8-5.300-8-11a4.500 4.500 0 0 1 8-2.800A4.500 4.500 0 0 1 20 10c0 5.700-8 11-8 11Z"/>',
  phone: '<path d="M5 3h4l2 5-2.500 1.500a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z"/>',
  pin: '<path d="M12 22s7-6.200 7-12a7 7 0 1 0-14 0c0 5.800 7 12 7 12Z"/><circle cx="12" cy="10" r="2.500"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  star: '<path d="M12 2l3 6.500 7 .9-5.200 4.800 1.400 7L12 17.800 5.800 21.200l1.400-7L2 9.400l7-.9L12 2Z"/>',
  check: '<path d="M5 12.500l4.500 4.500L19 7.500"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  whatsapp:
    '<path d="M20.500 3.500A11 11 0 0 0 3.300 16.800L2 22l5.400-1.400A11 11 0 1 0 20.500 3.500Z"/><path d="M8.500 8.500c0 3.500 3.500 7 7 7l1.500-1.500-2.500-1.500-1 1c-1.200-.5-2.500-1.800-3-3l1-1L10 7 8.500 8.500Z"/>'
};

function icon(name, cls = '') {
  return `<svg class="ic ${cls}" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[name] || ICONS.tooth}</svg>`;
}

// Renders the real photo if the owner has dropped one into /public/images,
// otherwise a branded illustration so the layout never looks empty.
function visual(slot, alt, cls = '', opts = {}) {
  const src = findImage(slot);
  if (src) {
    const lazy = opts.eager ? 'fetchpriority="high"' : 'loading="lazy"';
    return `<img class="photo ${cls}" src="${src}" alt="${alt}" decoding="async" ${lazy}>`;
  }
  return `<div class="photo ph ${cls}" role="img" aria-label="${alt}">${icon(opts.icon || 'tooth', 'ph-ic')}</div>`;
}

function baseUrl(req) {
  return (process.env.SITE_URL || `${req.protocol}://${req.get('host')}`).replace(/\/$/, '');
}

app.use((req, res, next) => {
  res.locals.site = site;
  res.locals.icon = icon;
  res.locals.visual = visual;
  res.locals.hasImage = (slot) => !!findImage(slot);
  res.locals.base = baseUrl(req);
  res.locals.year = new Date().getFullYear();
  next();
});

pages.forEach((p) => {
  app.get(p.path, (req, res) => {
    res.render(p.view, { page: p, sent: req.query.sent === '1', error: req.query.error === '1' });
  });
});

// ---- Appointment enquiry -----------------------------------------
// Sent to the clinic through ENQUIRY_WEBHOOK_URL (if set), printed in the log and saved to
// data/enquiries.jsonl (files may be wiped on redeploy on some hosts, so set the webhook).
const hits = new Map();
app.post('/enquiry', (req, res) => {
  const ip = req.ip, now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 3600e3);
  if (recent.length >= 8) return res.redirect(303, '/contact?error=1#book');
  hits.set(ip, recent.concat(now));
  const clean = (v, n) => String(v || '').replace(/[\r\n]+/g, ' ').trim().slice(0, n);
  const e = { name: clean(req.body.name, 80), phone: clean(req.body.phone, 20), email: clean(req.body.email, 120), treatment: clean(req.body.treatment, 80), date: clean(req.body.date, 12), time: clean(req.body.time, 8), message: clean(req.body.message, 500) };
  if (req.body.website) return res.redirect(303, '/contact?sent=1#book'); // honeypot
  if (!e.name || e.phone.replace(/\D/g, '').length < 10) return res.redirect(303, '/contact?error=1#book');
  e.receivedAt = new Date().toISOString();
  console.log('New appointment enquiry:', JSON.stringify(e));
  if (process.env.ENQUIRY_WEBHOOK_URL) {
    fetch(process.env.ENQUIRY_WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.assign({ clinic: 'Dr. Rawat’s Dental Care' }, e)) })
      .then((r) => { if (!r.ok) console.error('Enquiry webhook returned', r.status); })
      .catch((err) => console.error('Enquiry webhook failed', err.message));
  }
  try { fs.appendFileSync(path.join(__dirname, 'data', 'enquiries.jsonl'), JSON.stringify(e) + '\n'); } catch (err) { console.error('Could not save enquiry', err.message); }
  res.redirect(303, '/contact?sent=1#book');
});

app.get('/index.html', (req, res) => res.redirect(301, '/'));

app.get('/robots.txt', (req, res) => {
  res.type('text/plain').send(`User-agent: *\nAllow: /\n\nSitemap: ${baseUrl(req)}/sitemap.xml\n`);
});

app.get('/sitemap.xml', (req, res) => {
  const b = baseUrl(req);
  const today = new Date().toISOString().slice(0, 10);
  const urls = pages
    .map((p) => `  <url><loc>${b}${p.path}</loc><lastmod>${today}</lastmod><priority>${p.priority}</priority></url>`)
    .join('\n');
  res.type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
});

app.use((req, res) => {
  res.status(404).render('404', {
    page: { path: req.path, nav: '', title: 'Page not found | Dr. Rawat’s Dental Care', description: 'This page could not be found.' }
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something went wrong. Please call 096540 87169.');
});

app.listen(PORT, () => console.log(`Dr. Rawat’s Dental Care website running on port ${PORT}`));
