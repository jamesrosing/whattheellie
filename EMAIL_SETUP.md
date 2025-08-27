# Email Notification Setup Guide

Choose one of these free options to enable email notifications:

## Option 1: Gmail (Easiest, Completely Free)

Perfect for personal blogs and testing.

### Setup Steps:

1. **Enable 2-Factor Authentication** on your Gmail account
   - Go to https://myaccount.google.com/security
   - Enable 2-Step Verification

2. **Generate App Password**
   - Visit https://myaccount.google.com/apppasswords
   - Select "Mail" and your device
   - Copy the 16-character password

3. **Add to `.env.local`**
   ```env
   GMAIL_USER=your.email@gmail.com
   GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
   GMAIL_FROM_NAME=what the ellie
   ```

4. **Test it**
   ```bash
   curl -X POST http://localhost:3000/api/test-email \
     -H "Content-Type: application/json" \
     -d '{"email": "test@example.com"}'
   ```

### Limits:
- 500 emails per day
- Perfect for small to medium blogs

---

## Option 2: Resend (Professional, 3000 free/month)

Better for production with analytics and better deliverability.

### Setup Steps:

1. **Sign up** at https://resend.com (free, no credit card)

2. **Get API Key**
   - Go to API Keys in dashboard
   - Create a new API key
   - Copy it

3. **Add to `.env.local`**
   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   RESEND_FROM_EMAIL=hello@yourdomain.com
   ```

4. **Verify Domain** (Optional but recommended)
   - Add DNS records from Resend dashboard
   - Improves deliverability

5. **Test it**
   ```bash
   curl -X POST http://localhost:3000/api/test-email \
     -H "Content-Type: application/json" \
     -d '{"email": "test@example.com"}'
   ```

### Limits:
- 100 emails per day
- 3,000 emails per month
- Custom domain support

---

## Testing Your Setup

### 1. Check Configuration
```bash
curl http://localhost:3000/api/test-email
```

### 2. Send Test Email
```bash
curl -X POST http://localhost:3000/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"email": "your@email.com", "testType": "welcome"}'
```

### 3. Test New Post Notification
```bash
curl -X POST http://localhost:3000/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"email": "your@email.com", "testType": "newpost"}'
```

---

## Admin Dashboard

Access subscriber management at `/admin/subscribers`

1. Set admin token in `.env.local`:
   ```env
   ADMIN_TOKEN=your-secure-admin-token
   ```

2. Visit http://localhost:3000/admin/subscribers

3. Enter your admin token

Features:
- View total subscribers
- See verified/unverified counts
- 7-day activity chart
- Recent subscriptions
- Send test emails

---

## Webhook Setup (Wisp CMS)

To automatically notify subscribers when you publish:

1. In Wisp CMS, add webhook:
   - URL: `https://yourdomain.com/api/webhook/new-post`
   - Events: Post Published

2. Add webhook secret to `.env.local`:
   ```env
   WISP_WEBHOOK_SECRET=your-webhook-secret
   ```

---

## Troubleshooting

### Gmail Issues:
- Make sure 2FA is enabled
- Use App Password, not your regular password
- Check "Less secure app access" is NOT the solution (use App Password)

### Resend Issues:
- Verify your domain for better deliverability
- Check API key starts with `re_`
- Free tier resets monthly

### General:
- Check `/api/test-email` endpoint for configuration status
- Look at server logs for detailed error messages
- Emails might go to spam initially (mark as "not spam" to train filters)

---

## Production Checklist

- [ ] Choose email provider (Gmail for personal, Resend for professional)
- [ ] Add environment variables to production (.env or Vercel dashboard)
- [ ] Test email sending in production
- [ ] Set up Wisp webhook
- [ ] Configure admin token
- [ ] Test subscriber signup flow
- [ ] Verify emails aren't going to spam

---

## Support

The system will work without email configuration - it just logs to console.
This is useful for development and testing.