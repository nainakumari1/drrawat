// ---------------------------------------------------------------
//  Single source of truth for all Dr. Rawat's Dental Care details.
//  Everything comes from the clinic's content brief. Nothing is
//  invented. Missing items are empty placeholders.
// ---------------------------------------------------------------
module.exports = {
  version: '1',
  name: 'Dr. Rawat’s Dental Care',
  fullName: 'Dr. Rawat’s Dental Care',
  tagline: 'Gentle dental care for a healthier, more confident smile',

  // Not confirmed as WhatsApp, so there are NO WhatsApp buttons.
  phone: { display: '096540 87169', tel: '+919654087169' },

  address: 'Shop Number 7, Sector 1, Pushp Vihar, Saket, New Delhi, Delhi – 110017',
  mapsLink: 'https://maps.app.goo.gl/8idYotZi3Z12eKYt9',
  justdialLink: 'https://www.justdial.com/Delhi/DR-Rawats-Dental-Care-Near-Mother-Dairy-Sector-1-Pushp-Vihar-Saket/011PXX11-XX11-240303123058-U9B4_BZDET',

  email: '', instagram: '', facebook: '',

  // Timings from the listing. The brief says to confirm them with the clinic before publishing.
  hours: [
    { day: 'Monday – Sunday', time: '10 AM – 2 PM and 5 PM – 8 PM' }
  ],
  hoursNote: 'Timings are as per the clinic listing. Please call to confirm before visiting.',

  // The 5.0 / 87 figure comes from a listing whose source is not confirmed, and the Justdial
  // rating could not be verified. Both stay hidden until verified. Set show: true to display.
  ratings: { show: false, score: '5.0', count: '87', source: 'Google', asOf: 'Listing snapshot' },

  // true = dashed "to be added" placeholders for missing doctor details and clinic photos.
  // false = hide anything that is still empty.
  showPlaceholders: true,

  doctor: {
    name: 'Dr. Shivani Rawat',
    fullName: '', qualifications: '', specialisation: '', experience: '', registration: '',
    // Add a photo as public/images/doctor-shivani-rawat.jpg
    intro: 'Patients describe Dr. Shivani Rawat as knowledgeable, thorough and professional. They say she explains dental conditions and procedures clearly, and that she is calm, polite and empathetic, including with patients who feel nervous about treatment.',
    themes: [
      'Professional and thorough examination',
      'Clear explanations of conditions and procedures',
      'A gentle, careful approach',
      'Calm, polite and empathetic behaviour',
      'Reassuring to patients who feel nervous'
    ]
  },

  // Treatments mentioned in patient feedback. NOT a verified menu: confirm with the clinic.
  // Add more confirmed treatments by copying one block.
  services: [
    { id: 'checkups', label: 'Dental Checkups', icon: 'check', title: 'Dental Checkups',
      short: 'A careful examination, with your findings explained clearly.',
      body: 'A dental checkup is a thorough look at your teeth and gums. Patients say the examination is professional and that everything is explained clearly, so you understand what is happening and what, if anything, needs treatment.' },
    { id: 'fillings', label: 'Tooth Fillings', icon: 'tooth', title: 'Tooth Fillings',
      short: 'Repair for teeth affected by cavities.',
      body: 'Fillings repair teeth damaged by decay and help restore their shape. Patients who had a filling here describe the procedure as smooth and comfortable.' },
    { id: 'wisdom', label: 'Wisdom Tooth Consultation', icon: 'shield', title: 'Wisdom Tooth Consultation',
      short: 'An evaluation of wisdom teeth that hurt or feel out of place.',
      body: 'If a wisdom tooth is painful or you are unsure about it, a consultation lets the dentist evaluate it and explain your options.' },
    { id: 'extraction', label: 'Tooth Extraction', icon: 'extract', title: 'Tooth Extraction',
      short: 'Removal of a tooth that cannot be saved, done with care.',
      body: 'Extraction is advised when a tooth cannot be restored. Patients describe a careful, gentle approach, including those who arrived feeling nervous.' },
    { id: 'cleaning', label: 'Teeth Cleaning', icon: 'sparkle', title: 'Teeth Cleaning',
      short: 'Professional cleaning to keep teeth and gums healthy.',
      body: 'Professional teeth cleaning removes build-up that brushing alone can miss. Ask your dentist how often you should have it.' }
  ],

  why: [
    { icon: 'heart', title: 'Gentle approach', text: 'Patients describe a careful, calm and empathetic dentist.' },
    { icon: 'users', title: 'Clear communication', text: 'Conditions and procedures are explained clearly.' },
    { icon: 'shield', title: 'Clean clinic', text: 'Reviewers find the clinic clean and well maintained.' },
    { icon: 'sun', title: 'Friendly team', text: 'Patients mention friendly staff and short waiting times.' }
  ],

  // Short highlights from the brief. Their original source is not confirmed, so no names or
  // ratings are attached. Replace with verified reviews and their source when available.
  reviews: [
    { text: 'She examined my teeth very professionally and explained everything clearly.', theme: 'Clear explanations' },
    { text: 'The clinic environment was clean and well-maintained.', theme: 'Clean clinic' },
    { text: 'I got my tooth filling done, and the procedure was smooth and painless.', theme: 'Comfortable treatment' },
    { text: 'She is kind, polite, and highly knowledgeable.', theme: 'Gentle approach' }
  ],

  // Photo slots. Add public/images/gallery-<slug>.jpg (.png/.webp/.avif). Use real clinic photos only.
  gallery: [
    { slug: 'reception', label: 'Clinic reception' },
    { slug: 'waiting', label: 'Waiting area' },
    { slug: 'treatment-room', label: 'Dental treatment room' },
    { slug: 'equipment', label: 'Dental equipment' },
    { slug: 'team', label: 'Doctor and staff' }
  ]
};
