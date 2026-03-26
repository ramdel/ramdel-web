# App Specification

## Purpose
Defines the behavior, routing, and i18n requirements of ramdel.dev — Mario de Jesus's professional DevSecOps portfolio.

---

## Requirements

### Requirement: Multilingual Support
The system SHALL support 3 locales: English (`en`), Spanish (`es`), and French (`fr`).

#### Scenario: Default locale
- GIVEN a user visits `ramdel.dev/`
- WHEN the middleware processes the request
- THEN the user SHALL be redirected to `ramdel.dev/en/`

#### Scenario: Locale switching
- GIVEN a user is on any page
- WHEN they switch locale
- THEN the same page SHALL be shown in the selected language

**Status:** ✅ Implemented (next-intl, middleware.ts)

---

### Requirement: Page Routes
The system SHALL expose the following pages in all 3 locales:

| Route | Description |
|---|---|
| `/[locale]/` | Homepage / landing |
| `/[locale]/about/` | About Mario |
| `/[locale]/projects/` | Projects & work |
| `/[locale]/contact/` | Contact form |

**Status:** ✅ Implemented

---

### Requirement: Contact Form
The system SHALL provide a contact form that submits to `POST /api/contact/`.

#### Scenario: Successful submission
- GIVEN a user fills out the form with valid data (name, email, subject, message)
- WHEN they submit
- THEN the message SHALL be sent and a success response returned

#### Scenario: Validation
- GIVEN a user submits with invalid or missing fields
- WHEN the form is validated (React Hook Form + Zod)
- THEN field-level errors SHALL be displayed without submitting

**Status:** ✅ Implemented

---

### Requirement: Static Generation
The system SHALL use Next.js static generation for all pages to maximize performance on Vercel CDN.

**Status:** ✅ Implemented (trailingSlash: true, images unoptimized for static export)

---

### Requirement: i18n Completeness
All 3 locale message files SHALL contain identical keys.

#### Scenario: Missing translation
- GIVEN a new UI string is added
- WHEN `messages/en.json` is updated
- THEN `messages/es.json` and `messages/fr.json` SHALL also be updated in the same PR

**Status:** ✅ Maintained (manual verification required on each PR)
