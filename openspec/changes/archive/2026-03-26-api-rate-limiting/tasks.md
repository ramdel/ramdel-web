# Tasks: API Rate Limiting

## 1. Upstash Setup (~20 min)
- [x] 1.1 Create free account at https://upstash.com
- [x] 1.2 Create Redis database (name: ramdel-web, region: us-east-1)
- [x] 1.3 Copy `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`
- [x] 1.4 Add to `.env.local`
- [x] 1.5 Add to Vercel Project Settings → Environment Variables

## 2. Install Dependencies (~5 min)
- [x] 2.1 `npm install @upstash/ratelimit @upstash/redis`
- [x] 2.2 Verify added to `package.json`

## 3. Implementation (~30 min)
- [x] 3.1 Read current `src/app/api/contact/route.ts`
- [x] 3.2 Add rate limiting logic at top of POST handler (see design.md)
- [x] 3.3 Add origin check for CSRF mitigation
- [x] 3.4 Preserve existing form validation and email sending logic

## 4. Testing (~30 min)
- [x] 4.1 `npm run build` — must pass
- [x] 4.2 Test locally: submit form 6 times → 6th should return 429
- [x] 4.3 Verify response headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `Retry-After`
- [x] 4.4 Test normal submission still works (1-5 requests)
- [x] 4.5 `npm run lint` — must pass

## 5. PR + Archive
- [x] 5.1 Commit: `git commit -m "sec(api): add rate limiting and CSRF origin check to /api/contact/"`
- [x] 5.2 Open PR with template
- [x] 5.3 After merge: test in production — submit form 6 times, verify 429 on 6th
- [x] 5.4 Archive: `openspec archive api-rate-limiting`
- [x] 5.5 Update security spec status to ✅ Remediated
