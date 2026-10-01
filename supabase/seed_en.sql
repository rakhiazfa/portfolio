-- English content for the About page and featured case studies.
-- Separate file so it can be applied to a database that already ran seed.sql.

update site_settings set about = about || jsonb_build_object('en', $md$I'm a Bandung-based Full-Stack Developer who ships systems from requirement gathering to production: backends with Laravel, NestJS and Spring Boot; frontends with Vue, Nuxt and Next.js; plus PostgreSQL, Redis and job queues for real-world load.

I'm currently going deeper into **Go** and **microservice architecture**.

### How I Work
- Collaborate across teams (PMs, QA, designers) from the requirements stage onward.
- Build maintainable solutions: RBAC, validation and testing before release.
- Focus on the business problem, not just the feature list.$md$)
where id = 1;

update projects set content = content || jsonb_build_object('en', $md$## Context & Problem
A bakery with busy pickup queues needed online ordering that **never sells beyond production capacity per session** and makes order handling easy for staff.

## My Contribution
Built it end to end from scratch: database design, NestJS backend, Next.js storefront and dashboard, payment integration.

## Solution & Key Features
- **Per-session pickup quotas** — time slots with capacity, enforced inside a database transaction.
- **Fulfilment kanban** — orders move across columns (paid → in progress → ready → picked up), worked on by several staff at once.
- **Barcode scanner** to verify pickups.
- **BullMQ** for async jobs: payment expiry and notifications.
- **Midtrans** payments with idempotent webhooks.

## Architecture
```mermaid
flowchart LR
  C[Customer - Next.js] --> API[NestJS API]
  S[Staff Dashboard] --> API
  API --> DB[(PostgreSQL)]
  API --> R[(Redis)]
  R --> Q[BullMQ Workers]
  API <--> M[Midtrans]
```

## Challenges & Decisions
- Quotas are checked with a row lock on the session slot, not in a cache, so the shop can never oversell.
- Payment webhooks are processed idempotently through a queue to survive gateway retries.

## Outcome
Orders and pickups run without manual queueing; staff work in parallel on a single kanban board.$md$)
where slug = 'roti-macan';

update projects set content = content || jsonb_build_object('en', $md$## Context & Problem
Multi-channel bus ticket sales risk **two people booking the same seat** under heavy traffic.

## My Contribution
Designed and built the Laravel backend, the Nuxt.js frontend, and the concurrency and caching strategy.

## Solution & Key Features
- **Real-time seat inventory** per schedule and route.
- **Overbooking prevention** with time-boxed seat holds plus PostgreSQL row locking.
- **Redis caching** for frequently searched schedules.
- **PgBouncer** connection pooling for traffic spikes.

## Architecture
```mermaid
flowchart LR
  U[Nuxt.js] --> L[Laravel API]
  L --> R[(Redis cache)]
  L --> B[PgBouncer] --> P[(PostgreSQL)]
```

## Challenges & Decisions
- `SELECT ... FOR UPDATE` on the seat row guarantees a single winner per seat; expired holds are cleaned up by a scheduled job.
- Only read-heavy data (schedules) is cached — never seat availability — so it can't go stale.

## Outcome
No double bookings on the same seat, and schedule search stays fast at peak times.$md$)
where slug = 'anekatransport';

update projects set content = content || jsonb_build_object('en', $md$## Context & Problem
An insurance company needed an internal system for policies and claim workflows with strict per-role access control.

## My Contribution
Built full-stack features (Laravel + Vue.js): the RBAC module, claim workflows and notifications.

## Solution & Key Features
- **RBAC across frontend and backend** — the same permissions guard the API and hide the UI.
- **Multi-step claim workflow** with statuses and approvals.
- **FCM** for real-time notifications to the relevant users.

## Architecture
```mermaid
flowchart LR
  V[Vue.js SPA] --> L[Laravel API]
  L --> P[(PostgreSQL)]
  L --> F[Firebase Cloud Messaging]
```

## Challenges & Decisions
Permissions are defined once on the backend and sent to the frontend at login, so what users see never drifts from what they're allowed to do.

> Client project under NDA — real details and screens are not shown.$md$)
where slug = 'tugu-insurance';

update projects set content = content || jsonb_build_object('en', $md$## Context & Problem
A banking HRIS processes large volumes of employee data that must be uploaded, validated and reported accurately.

## My Contribution
Built backend modules in Java/Spring.

## Solution & Key Features
- **Spring Batch** for bulk import/export with chunk processing.
- **Master Data Upload/Download** with per-row validation.
- **Grade eligibility reports** for employees.

## Architecture
```mermaid
flowchart LR
  UI[Frontend] --> S[Spring Boot API]
  S --> J[Spring Batch Jobs]
  S --> P[(PostgreSQL)]
  J --> P
```

## Challenges & Decisions
Chunk-oriented processing keeps memory flat and lets a failed job restart from where it stopped.

> Client project under NDA — real details and screens are not shown.$md$)
where slug = 'bca-hris';
