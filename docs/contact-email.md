# Contact email setup

The contact form posts to `/api/contact`, a Vercel Node function. It submits two separate plain-text emails through Resend: the enquiry to tech.uxora@gmail.com and a confirmation containing the same details to the visitor. Replies go to the visitor and UXORA respectively. API errors retain the form for retry; stable idempotency keys prevent duplicate batches on retries.

## Activate on Vercel

1. Create a Resend account and verify your sending domain (uxora.co) by adding its required DNS records. Gmail remains the recipient, not the sender domain.
2. Create a sending API key. In Vercel Project Settings → Environment Variables, add `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` (for example `UXORA <contact@uxora.co>` on the verified domain). Do not put secrets in frontend code or chat.
3. Redeploy. Use Vercel Firewall rate limiting for POST `/api/contact` to limit automated submissions; the hidden honeypot alone is not a comprehensive spam control.
4. Submit a test with an email address you control. Confirm both inboxes, reply addresses and spam folders, and check delivery in Resend. API acceptance does not guarantee inbox delivery.

Use `vercel dev` for local full-stack testing; Vite alone does not run the `/api/contact` function. Keep local secrets in `.env.local` (ignored by git). No actual email delivery was tested without configured credentials.

Reference: https://resend.com/docs/api-reference/emails/send-batch-emails
