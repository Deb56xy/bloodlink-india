# BloodLink India — MVP starter

A responsive Next.js + Supabase starter for a voluntary blood-donor discovery and emergency coordination platform.

## Important status
This is a deployable **MVP foundation**, not a fully production-certified healthcare service. It includes a landing page, donor registration, donor search and emergency request submission. SMS/OTP gateway, WhatsApp Business, email notifications, hospital verification workflows, admin RBAC, maps, document upload, audit review, rate limiting, CAPTCHA, monitoring and legal/medical review still need configuration and implementation before public launch. Do not use sample data or claim blood stock availability.

## Requirements
- Node.js 20+
- A Supabase project
- GitHub account (for deployment)

## Run locally
1. Install Node.js 20 or newer.
2. Extract this ZIP and open the folder in a terminal.
3. Run `npm install`.
4. Copy `.env.example` to `.env.local`.
5. In Supabase, open SQL Editor and run `supabase/schema.sql`.
6. Copy Project URL and anon/public key from Supabase → Project Settings → API into `.env.local`.
7. In Supabase Authentication settings, enable email confirmation and configure allowed redirect URLs.
8. Run `npm run dev`, then visit http://localhost:3000.

## Deploy website (Vercel)
1. Create a GitHub repository and push this project.
2. Sign in to https://vercel.com and choose **Add New → Project**.
3. Import the GitHub repository. Framework should be detected as Next.js.
4. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` under Project → Settings → Environment Variables.
5. Deploy. Vercel will provide a temporary `*.vercel.app` URL.
6. Test signup, email confirmation, donor search and request creation before inviting users.

## Database / auth (Supabase)
Create a project at https://supabase.com. Run the SQL file in the SQL Editor. Set authentication redirect URLs to your Vercel URL and final domain. Never expose the Supabase service-role key in browser code.

## Custom domain
1. Search availability for `bloodlinkindia.in` or another name at an accredited registrar such as https://www.cloudflare.com/products/registrar/ (availability and supported TLDs vary) or https://www.namecheap.com/domains/.
2. Buy the domain in the registrar account. Domain purchase is separate from hosting.
3. In Vercel → Project → Settings → Domains, add the purchased domain.
4. Follow the exact DNS records Vercel displays; add them at the registrar/DNS provider. Do not guess A/CNAME values.
5. Wait for DNS verification and automatic SSL provisioning. Add both root and `www` variants if desired, and choose one as canonical.
6. Update Supabase Auth redirect URLs to the final HTTPS domain.

## Production launch checklist
- Complete privacy notice, terms, consent records, retention/deletion policy and grievance contact; obtain Indian legal review for applicable DPDP Act/rules and health-sector obligations.
- Obtain medical and blood-bank partner review. Confirm all participating institutions are appropriately licensed.
- Implement admin role tables and server-verified RBAC; do not rely on hidden frontend buttons.
- Add server-side rate limiting, abuse detection, CAPTCHA, secure upload scanning and private document storage.
- Add verified phone OTP through an approved provider; email/password signup alone is not phone verification.
- Build consent-based SMS/email/WhatsApp notifications with opt-out.
- Add hospital/blood-bank directory from verified official sources only.
- Add donor response workflow, expiry jobs, moderation, audit log review and backups.
- Review RLS policies with a security professional. Public directory intentionally excludes phone, email, user id and exact location. Avoid exposing private profile rows through other API routes.
- Load test, penetration test, test account deletion and backup restoration.
- Do not sell blood or charge patients for donor matching. Do not claim a donor is medically eligible or that blood is available.

## Current MVP routes
- `/` landing page
- `/register` donor signup + profile insert
- `/find` availability-filtered privacy-safe donor directory
- `/request` authenticated emergency request creation

## Suggested next development milestones
1. Login/logout, password reset and profile editing.
2. Request dashboard and donor-response workflow with carefully scoped RLS.
3. Hospital/blood-bank registration and manual verification.
4. Admin roles, moderation, audit tools and reporting.
5. Notifications, PWA service worker, map search and monitoring.
