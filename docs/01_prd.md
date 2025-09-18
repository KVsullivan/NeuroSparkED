# Product: NeuroSparkED LMS — Path A (Walking Skeleton)

## Problem
Educators need a lightweight, scalable LMS to publish courses, enroll learners, and track progress without expensive infrastructure. Learners need a simple way to access content and mark lessons complete.

## Core Outcomes (max 3)
- Learners can view published courses, enroll, and complete a lesson (p95 latency < 200ms).
- Instructors can draft → publish courses, modules, and lessons.
- Admins can assign roles; Firestore/Storage Rules enforce permissions.

## User Roles
- **Admin**: manage roles, all-access.
- **Instructor**: create/edit courses, publish content, view learner progress.
- **Learner**: enroll, view content, submit assignments, update progress.

## Features (Top 5)
### F1: Courses
- As an **Instructor**, I can draft and publish courses so learners can access them.
- Acceptance:
  - [ ] Draft visible only to instructors.
  - [ ] Published visible in `GET /courses`.

### F2: Enrollment
- As a **Learner**, I can enroll in a course so I can access lessons.
- Acceptance:
  - [ ] Enrollment doc created in `enrollments`.
  - [ ] Visible in `GET /me/enrollments`.

### F3: Lesson Progress
- As a **Learner**, I can mark a lesson complete so progress is tracked.
- Acceptance:
  - [ ] Writes `progress` doc with `{ userId, courseId, lessonId, status }`.

### F4: Submissions (v0.2)
- As a **Learner**, I can upload assignments so instructors can grade them.
- Acceptance:
  - [ ] File stored in Storage path; submission doc created.

### F5: Role Management
- As an **Admin**, I can assign `instructor` or `learner` claims.
- Acceptance:
  - [ ] Script sets Firebase custom claims; Rules enforce.

## Constraints & Non-Functionals
- Performance: p95 < 200ms for `GET /courses`.
- Security: Auth via Firebase ID tokens; custom claims checked in Rules.
- Compliance: Principle of least privilege, FERPA-friendly (no PII leaks in public).
