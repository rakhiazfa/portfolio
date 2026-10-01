# rakhiazfa.dev — Portfolio

Next.js 16 (App Router) + Supabase. Implementasi P0 dari `PRODUCT_REQUIREMENT_DESIGN.md`.

## Setup

```bash
npm install
cp .env.example .env.local   # isi kredensial Supabase
```

### Supabase Cloud
1. Buat project, lalu jalankan `supabase/migrations/0001_init.sql`, `supabase/seed.sql`, lalu `supabase/seed_en.sql` di SQL Editor
   (atau dari root project: `npx supabase link && npx supabase db push --include-seed`).
2. Daftarkan admin:
   - Authentication → Users → **Add user** (email + password).
   - `insert into admins (email) values ('rakhiazfa0421@gmail.com');`
   - Authentication → Providers → Email → matikan **Allow new users to sign up**.
3. Unggah CV di `/admin/resumes` dan foto profil di `/admin/settings`.

### Lokal
```bash
npx supabase start        # butuh Docker; migrasi + seed otomatis
npx supabase status       # salin API URL, publishable key, secret key ke .env.local
npm run dev
```

## Struktur
| Path | Isi |
|---|---|
| `src/app/(public)` | Home, About (+skills), Experience, Projects + filter, case study, Contact |
| `src/app/admin` | Login, dashboard CRUD, server actions (`actions.ts`) |
| `src/app/cv` | Redirect ke CV aktif |
| `src/lib/data.ts` | Query publik (anon key, RLS → hanya `published`) |
| `src/proxy.ts` | Refresh session + guard `/admin` |
| `supabase/` | Skema, RLS, storage, seed dari CV |

Halaman publik dirender statis (UI berbahasa Inggris, konten diambil dari field `en` lalu fallback ke `id`). Simpan di admin langsung memperbarui halaman; edit langsung di database tampil maksimal 1 jam kemudian.

## Cek
```bash
npm test && npx tsc --noEmit && npm run lint
```

## Belum dikerjakan (P1/P2)
i18n `/id` `/en` (data sudah bilingual), toggle dark mode (ikut OS), OG image dinamis, notifikasi email,
drag-and-drop urutan (pakai angka `display_order`), lightbox galeri, event analytics, Lab & Blog.
