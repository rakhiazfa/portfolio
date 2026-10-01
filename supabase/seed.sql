-- Initial content from CV (PRD §7.3, §7.5, §17-A).
-- After running: insert into admins (email) values ('rakhiazfa0421@gmail.com');

insert into site_settings (id, full_name, headline, summary, about, location, email, phone, whatsapp, linkedin_url, github_url, availability, highlights) values (
  1, 'Rakhi Azfa Rifansya',
  '{"id": "Full-Stack Developer", "en": "Full-Stack Developer"}',
  '{"id": "Full-Stack Developer dengan 3+ tahun pengalaman membangun sistem bisnis nyata — asuransi, booking tiket, e-commerce, CMS enterprise, hingga HRIS perbankan.", "en": "Full-Stack Developer with 3+ years building real business systems — insurance, ticket booking, e-commerce, enterprise CMS and banking HRIS."}',
  '{"id": "Saya Full-Stack Developer berbasis di Bandung yang terbiasa membangun sistem dari requirement gathering hingga production: backend dengan Laravel, NestJS, dan Spring Boot; frontend dengan Vue, Nuxt, dan Next.js; serta PostgreSQL, Redis, dan antrian job untuk beban nyata.\n\nSaat ini saya sedang memperdalam **Golang** dan **arsitektur microservices**.\n\n### Cara Saya Bekerja\n- Kolaborasi lintas tim (PM, QA, desainer) sejak tahap requirement.\n- Menulis solusi yang bisa dipelihara: RBAC, validasi, dan testing sebelum rilis.\n- Fokus pada masalah bisnis, bukan sekadar fitur.", "en": "I am a Bandung-based Full-Stack Developer who ships systems from requirement gathering to production: backends with Laravel, NestJS and Spring Boot; frontends with Vue, Nuxt and Next.js; plus PostgreSQL, Redis and job queues for real load.\n\nI am currently going deeper into **Go** and **microservice architecture**."}',
  'Bandung, West Java, Indonesia', 'rakhiazfa0421@gmail.com', '+6287817991381', '6287817991381',
  'https://www.linkedin.com/in/rakhiazfa', 'https://github.com/rakhiazfa', 'open_to_work',
  '[{"label": {"id": "Tahun pengalaman", "en": "Years of experience"}, "value": "3+"}, {"label": {"id": "Proyek", "en": "Projects"}, "value": "13"}, {"label": {"id": "Perusahaan/klien", "en": "Companies/clients"}, "value": "4"}, {"label": {"id": "Bahasa pemrograman", "en": "Programming languages"}, "value": "5"}]'
);

insert into experiences (company, role, employment_type, start_date, end_date, location, description, display_order) values
  ('PT. Intersolusi Teknologi Asia', 'Fullstack Developer', 'full_time', '2024-07-01', null, 'Bandung',
   '{"id": "Mengembangkan dan memelihara sistem enterprise untuk klien asuransi, kesehatan, retail, dan perbankan.", "en": "Building and maintaining enterprise systems for insurance, healthcare, retail and banking clients."}', 1),
  ('CV. Torche Indonesia', 'Fullstack Developer', 'full_time', '2023-07-01', '2024-07-01', 'Bandung',
   '{"id": "Membangun sistem database pemasyarakatan dengan verifikasi biometrik.", "en": "Built a correctional database system with biometric verification."}', 2),
  ('Great Website Studio', 'Fullstack Developer', 'freelance', '2022-09-01', '2023-06-01', 'Remote',
   '{"id": "Membangun aplikasi e-commerce, booking tiket, dan CRM untuk klien UMKM dari nol.", "en": "Built e-commerce, ticket booking and CRM apps for SMB clients from scratch."}', 3),
  ('PT. Basicteknologi Intersolusi Tersinergi', 'Fullstack Developer', 'intern', '2022-07-01', '2023-11-01', 'Bandung',
   '{"id": "Mengembangkan aplikasi Laravel untuk manajemen inovasi, presensi, dan monitoring kapal.", "en": "Developed Laravel apps for innovation management, attendance and vessel monitoring."}', 4);

insert into skill_categories (id, name, display_order) values
  (1, '{"id": "Bahasa", "en": "Languages"}', 1),
  (2, '{"id": "Backend", "en": "Backend"}', 2),
  (3, '{"id": "Frontend", "en": "Frontend"}', 3),
  (4, '{"id": "Database & Storage", "en": "Databases & Storage"}', 4),
  (5, '{"id": "Tools & Konsep", "en": "Tools & Concepts"}', 5);
select setval('skill_categories_id_seq', 5);

insert into skills (category_id, name, slug, icon, is_learning, display_order) values
  (1, 'PHP', 'php', 'php', false, 1), (1, 'JavaScript', 'javascript', 'javascript', false, 2),
  (1, 'TypeScript', 'typescript', 'typescript', false, 3), (1, 'Java', 'java', 'openjdk', false, 4),
  (1, 'Go', 'go', 'go', true, 5),
  (2, 'Laravel', 'laravel', 'laravel', false, 1), (2, 'Lumen', 'lumen', 'lumen', false, 2),
  (2, 'NestJS', 'nestjs', 'nestjs', false, 3), (2, 'Spring Boot', 'spring-boot', 'springboot', false, 4),
  (2, 'Spring Batch', 'spring-batch', 'spring', false, 5), (2, 'Gin', 'gin', 'gin', true, 6),
  (2, 'Fiber', 'fiber', 'go', true, 7),
  (3, 'Next.js', 'nextjs', 'nextdotjs', false, 1), (3, 'Nuxt.js', 'nuxtjs', 'nuxtdotjs', false, 2),
  (3, 'Vue.js', 'vuejs', 'vuedotjs', false, 3), (3, 'Pinia', 'pinia', 'pinia', false, 4),
  (3, 'PrimeVue', 'primevue', 'primevue', false, 5), (3, 'Tailwind CSS', 'tailwind', 'tailwindcss', false, 6),
  (4, 'PostgreSQL', 'postgresql', 'postgresql', false, 1), (4, 'MySQL', 'mysql', 'mysql', false, 2),
  (4, 'Redis', 'redis', 'redis', false, 3), (4, 'MinIO', 'minio', 'minio', false, 4),
  (4, 'PgBouncer', 'pgbouncer', 'postgresql', false, 5),
  (5, 'BullMQ', 'bullmq', null, false, 1), (5, 'TypeORM', 'typeorm', 'typeorm', false, 2),
  (5, 'Firebase Cloud Messaging', 'fcm', 'firebase', false, 3), (5, 'Selenium', 'selenium', 'selenium', false, 4),
  (5, 'SourceAFIS', 'sourceafis', null, false, 5), (5, 'Docker', 'docker', 'docker', false, 6),
  (5, 'Microservices', 'microservices', null, true, 7), (5, 'Midtrans', 'midtrans', null, false, 8);

-- Projects. Featured case studies get full markdown content.
insert into projects (experience_id, slug, title, client, category, contribution_type, summary, content, role_description, is_confidential, is_featured, status, period_start, period_end, display_order)
select e.id, p.slug, p.title, p.client, p.category, p.ct::contribution_type, p.summary::jsonb, p.content::jsonb, p.role, p.nda, p.featured, 'published', p.ps::date, p.pe::date, p.ord
from (values
  ('Great Website Studio', 'roti-macan', 'Roti Macan — E-commerce Bakery', 'Roti Macan', 'E-commerce', 'from_scratch',
   '{"id": "E-commerce bakery dengan kuota pickup per sesi, kanban fulfilment multi-staf, dan pembayaran Midtrans.", "en": "Bakery e-commerce with per-session pickup quotas, multi-staff fulfilment kanban and Midtrans payments."}',
   '{"id": "## Konteks & Masalah\nToko roti dengan antrean pickup yang padat butuh sistem pesan online yang **tidak menjual melebihi kapasitas produksi per sesi** dan memudahkan staf memproses pesanan.\n\n## Kontribusi Saya\nMembangun end-to-end dari nol: desain database, backend NestJS, storefront & dashboard Next.js, integrasi pembayaran.\n\n## Solusi & Fitur Kunci\n- **Kuota pickup per sesi** — slot waktu dengan kapasitas, divalidasi di transaksi database.\n- **Kanban fulfilment** — pesanan bergerak antar kolom (dibayar → diproses → siap → diambil) oleh beberapa staf sekaligus.\n- **Barcode scanner** untuk verifikasi pickup.\n- **BullMQ** untuk job asinkron: kedaluwarsa pembayaran, notifikasi.\n- **Midtrans** untuk pembayaran dengan webhook idempoten.\n\n## Arsitektur\n```mermaid\nflowchart LR\n  C[Customer - Next.js] --> API[NestJS API]\n  S[Staff Dashboard] --> API\n  API --> DB[(PostgreSQL)]\n  API --> R[(Redis)]\n  R --> Q[BullMQ Workers]\n  API <--> M[Midtrans]\n```\n\n## Tantangan & Keputusan\n- Kuota dihitung dengan row lock pada slot sesi, bukan di cache, agar tidak pernah oversell.\n- Webhook pembayaran diproses idempoten via queue untuk menangani retry dari payment gateway.\n\n## Hasil\nPesanan dan pickup terkelola tanpa antrean manual; staf bekerja paralel di satu papan kanban."}',
   'Full-stack developer (solo)', false, true, '2022-09-01', '2023-06-01', 1),
  ('Great Website Studio', 'anekatransport', 'Anekatransport — Bus Ticket Booking', 'Anekatransport', 'Booking', 'from_scratch',
   '{"id": "Booking tiket bus online dengan inventori kursi real-time dan pencegahan overbooking.", "en": "Online bus ticket booking with real-time seat inventory and overbooking prevention."}',
   '{"id": "## Konteks & Masalah\nPenjualan tiket bus multi-kanal rawan **dua orang memesan kursi yang sama** saat trafik tinggi.\n\n## Kontribusi Saya\nMerancang dan membangun backend Laravel, frontend Nuxt.js, serta strategi konkurensi dan caching.\n\n## Solusi & Fitur Kunci\n- **Inventori kursi real-time** per jadwal dan rute.\n- **Anti-overbooking** dengan hold kursi berbatas waktu + locking di PostgreSQL.\n- **Redis caching** untuk pencarian jadwal yang sering diakses.\n- **PgBouncer** untuk connection pooling saat lonjakan trafik.\n\n## Arsitektur\n```mermaid\nflowchart LR\n  U[Nuxt.js] --> L[Laravel API]\n  L --> R[(Redis cache)]\n  L --> B[PgBouncer] --> P[(PostgreSQL)]\n```\n\n## Tantangan & Keputusan\n- `SELECT ... FOR UPDATE` pada baris kursi menjamin satu pemenang per kursi; hold kedaluwarsa dibersihkan job terjadwal.\n- Cache hanya untuk data baca (jadwal), bukan ketersediaan kursi, agar tidak pernah stale.\n\n## Hasil\nTidak ada double-booking pada kursi yang sama; pencarian jadwal tetap cepat saat ramai."}',
   'Full-stack developer', false, true, '2022-09-01', '2023-06-01', 2),
  ('PT. Intersolusi Teknologi Asia', 'tugu-insurance', 'Tugu Clone — Insurance Management', 'Perusahaan asuransi (NDA)', 'Insurance', 'development',
   '{"id": "Sistem manajemen asuransi dengan RBAC lintas FE/BE, alur klaim, dan notifikasi real-time.", "en": "Insurance management system with cross FE/BE RBAC, claim workflows and real-time notifications."}',
   '{"id": "## Konteks & Masalah\nPerusahaan asuransi butuh sistem internal untuk mengelola polis dan alur klaim dengan hak akses yang ketat per peran.\n\n## Kontribusi Saya\nMengembangkan fitur full-stack (Laravel + Vue.js): modul RBAC, alur klaim, dan notifikasi.\n\n## Solusi & Fitur Kunci\n- **RBAC lintas FE/BE** — permission yang sama menjaga API dan menyembunyikan UI.\n- **Alur klaim** multi-tahap dengan status dan approval.\n- **FCM** untuk notifikasi real-time ke pengguna terkait.\n\n## Arsitektur\n```mermaid\nflowchart LR\n  V[Vue.js SPA] --> L[Laravel API]\n  L --> P[(PostgreSQL)]\n  L --> F[Firebase Cloud Messaging]\n```\n\n## Tantangan & Keputusan\nSatu sumber definisi permission di backend, dikirim ke frontend saat login, agar tidak ada drift antara yang terlihat dan yang diizinkan.\n\n> Proyek klien di bawah NDA — detail dan tampilan asli tidak ditampilkan."}',
   'Full-stack developer (tim)', true, true, '2024-07-01', null, 3),
  ('PT. Intersolusi Teknologi Asia', 'bca-hris', 'BCA Human Resources Information System', 'Perbankan (NDA)', 'HRIS', 'development',
   '{"id": "HRIS perbankan dengan Spring Batch untuk pemrosesan data massal dan laporan eligibilitas grade.", "en": "Banking HRIS with Spring Batch bulk data processing and grade eligibility reports."}',
   '{"id": "## Konteks & Masalah\nHRIS perbankan memproses data karyawan dalam jumlah besar yang harus diunggah, divalidasi, dan dilaporkan secara akurat.\n\n## Kontribusi Saya\nMengembangkan modul backend Java/Spring.\n\n## Solusi & Fitur Kunci\n- **Spring Batch** untuk import/export data massal dengan chunk processing.\n- **Master Data Upload/Download** dengan validasi per baris.\n- **Laporan eligibilitas grade** karyawan.\n\n## Arsitektur\n```mermaid\nflowchart LR\n  UI[Frontend] --> S[Spring Boot API]\n  S --> J[Spring Batch Jobs]\n  S --> P[(PostgreSQL)]\n  J --> P\n```\n\n## Tantangan & Keputusan\nChunk-oriented processing menjaga memori stabil dan memungkinkan restart job dari titik gagal.\n\n> Proyek klien di bawah NDA — detail dan tampilan asli tidak ditampilkan."}',
   'Backend developer (tim)', true, true, '2024-07-01', null, 4),
  ('PT. Intersolusi Teknologi Asia', 'prodia-cms', 'Prodia Whitelabel — CMS', 'Layanan kesehatan (NDA)', 'CMS', 'development',
   '{"id": "CMS whitelabel untuk layanan kesehatan dengan Vue.js, Pinia, dan PrimeVue.", "en": "Whitelabel healthcare CMS built with Vue.js, Pinia and PrimeVue."}', '{}', 'Frontend developer', true, false, '2024-07-01', null, 5),
  ('PT. Intersolusi Teknologi Asia', 'rembo-printing', 'Rembo Printing — Printing Management', 'Rembo Printing', 'Operations', 'maintenance',
   '{"id": "Pemeliharaan dan pengembangan sistem manajemen percetakan berbasis NestJS dan Vue.js.", "en": "Maintenance and enhancement of a NestJS + Vue.js printing management system."}', '{}', 'Full-stack developer', true, false, '2024-07-01', null, 6),
  ('PT. Intersolusi Teknologi Asia', 'eiger-affiliate', 'EIGER Adventure Store Affiliate Program', 'Retail (NDA)', 'CMS / Affiliate', 'development',
   '{"id": "Program afiliasi retail dengan otomasi berbasis Selenium.", "en": "Retail affiliate program with Selenium-based automation."}', '{}', 'Developer', true, false, '2024-07-01', null, 7),
  ('CV. Torche Indonesia', 'sistem-database-pemasyarakatan', 'Sistem Database Pemasyarakatan', 'Instansi pemerintah (NDA)', 'Government / Biometric', 'development',
   '{"id": "Sistem database pemasyarakatan dengan verifikasi sidik jari SourceAFIS dan penyimpanan MinIO.", "en": "Correctional database system with SourceAFIS fingerprint matching and MinIO storage."}', '{}', 'Full-stack developer', true, false, '2023-07-01', '2024-07-01', 8),
  ('Great Website Studio', 'golden-monkey', 'Golden Monkey — Customer Classification', 'Golden Monkey Group', 'Analytics / CRM', 'from_scratch',
   '{"id": "Klasifikasi pelanggan untuk kebutuhan CRM dan analitik.", "en": "Customer classification for CRM and analytics."}', '{}', 'Full-stack developer', false, false, '2022-09-01', '2023-06-01', 9),
  ('PT. Basicteknologi Intersolusi Tersinergi', 'myinnovilage', 'MyInnovilage — Innovation Management', 'MyInnovilage', 'Education', 'development',
   '{"id": "Platform manajemen inovasi untuk program pendidikan.", "en": "Innovation management platform for education programs."}', '{}', 'Developer', false, false, '2022-07-01', null, 10),
  ('PT. Basicteknologi Intersolusi Tersinergi', 'adhi-persada-epresence', 'Adhi Persada Beton E-Presence', 'Konstruksi (NDA)', 'HR / Attendance', 'maintenance',
   '{"id": "Pemeliharaan sistem presensi elektronik karyawan.", "en": "Maintenance of an employee e-presence system."}', '{}', 'Developer', true, false, '2022-07-01', null, 11),
  ('PT. Basicteknologi Intersolusi Tersinergi', 'pertamina-baubau', 'Pertamina Baubau — Vessel Monitoring', 'Energi (NDA)', 'Monitoring', 'from_scratch',
   '{"id": "Sistem monitoring kapal untuk operasional terminal.", "en": "Vessel monitoring system for terminal operations."}', '{}', 'Developer', true, false, '2022-07-01', null, 12)
) as p(company, slug, title, client, category, ct, summary, content, role, nda, featured, ps, pe, ord)
join experiences e on e.company = p.company;

insert into project_skills (project_id, skill_id)
select p.id, s.id from (values
  ('roti-macan', array['nestjs','nextjs','typescript','postgresql','redis','bullmq','midtrans']),
  ('anekatransport', array['laravel','php','nuxtjs','postgresql','redis','pgbouncer']),
  ('tugu-insurance', array['laravel','php','vuejs','postgresql','fcm']),
  ('bca-hris', array['java','spring-boot','spring-batch','postgresql']),
  ('prodia-cms', array['vuejs','pinia','primevue','tailwind','typescript']),
  ('rembo-printing', array['nestjs','typeorm','vuejs','postgresql','typescript']),
  ('eiger-affiliate', array['postgresql','selenium']),
  ('sistem-database-pemasyarakatan', array['laravel','lumen','php','vuejs','minio','sourceafis']),
  ('golden-monkey', array['laravel','php','mysql']),
  ('myinnovilage', array['laravel','php','mysql']),
  ('adhi-persada-epresence', array['laravel','php']),
  ('pertamina-baubau', array['laravel','php','mysql'])
) as m(slug, skills)
join projects p on p.slug = m.slug
join skills s on s.slug = any(m.skills);
