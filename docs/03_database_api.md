# Database & API Design

## Entities
- users/{uid}: { displayName, photoURL, orgId?, role? (mirror of claim) }
- courses/{courseId}: { title, description, status, ownerId, orgId?, createdAt, updatedAt }
  - modules/{moduleId}: { title, order }
  - lessons/{lessonId}: { title, order, estimatedMinutes, contentRef }
- enrollments/{enrollmentId}: { userId, courseId, status, enrolledAt }
- progress/{progressId}: { userId, courseId, lessonId, status, score?, completedAt? }
- submissions/{submissionId}: { userId, courseId, lessonId, storagePath, grade?, feedback?, submittedAt }

## REST Endpoints (v0.1)
- `GET /health` → { ok: true, ts }
- `GET /courses` → published courses
- `GET /courses/:id`
- `POST /courses` (instructor/admin)
- `POST /enroll` (learner)
- `GET /me/enrollments` (learner)
- `POST /progress` { courseId, lessonId, status, score? }

## Error Model
```json
{ "error": { "code": "INVALID_INPUT", "message": "Missing field" } }
