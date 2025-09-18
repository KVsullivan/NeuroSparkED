# System Architecture (Path A)

## Tech Stack
- **Frontend**: React (Vite) + Tailwind, deployed on GoDaddy (`/dist` + `.htaccess` SPA rewrite).
- **Backend**: Firebase Functions Gen2 (Node 20, HTTP endpoints).
- **DB**: Firestore (collections: users, courses, enrollments, progress, submissions).
- **Auth**: Firebase Authentication (Email/Password, OAuth optional).
- **Storage**: Firebase Storage (assignments, media).
- **Jobs**: Cloud Scheduler + Pub/Sub (digests, retention).
- **Observability**: Cloud Logging, Error Reporting, Monitoring, GA4, Performance Monitoring.

## High-Level Diagram
[Browser (React SPA @ GoDaddy)]
   → HTTPS
   → [Firebase Functions api]
       ↘ Firestore
       ↘ Storage
       ↘ Auth
       ↘ Scheduler/Jobs

## Modules & Responsibilities
- Auth Service: sessions, claims, role checks.
- Course Service: draft/publish courses, modules, lessons.
- Enrollment Service: learners enroll in courses.
- Progress Service: update lesson completion.
- Submission Service: upload/grade assignments.
- Role Admin Script: set custom claims.

## Data Flow
- **Learner → Enroll**: POST `/enroll` → writes `enrollments` doc.
- **Mark Complete**: POST `/progress` → writes `progress` doc.
- **Instructor → Publish**: POST `/courses` → `status = published`.

## Ops
- Environments: `local (emulator)` → `preview` → `prod`.
- CI/CD: GitHub Actions; frontend via FTP to GoDaddy; backend via `firebase deploy`.
