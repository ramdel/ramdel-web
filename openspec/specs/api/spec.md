# API Specification

## Purpose
Defines the contracts and behavior of all API endpoints in ramdel.dev.

---

## Requirements

### Requirement: POST /api/contact/
The system SHALL expose a contact form endpoint that accepts and processes messages.

#### Scenario: Valid submission
- GIVEN a POST request with valid JSON body: `{name, email, subject, message}`
- WHEN all fields pass validation
- THEN the system SHALL return HTTP 200 with `{success: true}`
- AND the message SHALL be delivered (via AWS SES or fallback)

#### Scenario: Invalid body
- GIVEN a POST request with missing or invalid fields
- WHEN validation fails
- THEN the system SHALL return HTTP 400 with error details

#### Scenario: Unsupported method
- GIVEN a GET or DELETE request to `/api/contact/`
- WHEN the request is received
- THEN the system SHALL return HTTP 405 Method Not Allowed

**Request schema:**
```typescript
{
  name: string,      // required, min 2 chars
  email: string,     // required, valid email format
  subject: string,   // required, min 5 chars
  message: string    // required, min 10 chars
}
```

**Status:** ✅ Implemented

---

### Requirement: Rate Limiting on /api/contact/
See `specs/security/spec.md` — Requirement: API Rate Limiting.

**Status:** ⬜ PENDING — Change: `openspec/changes/api-rate-limiting/`
