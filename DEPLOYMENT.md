# AWS Amplify Deployment Guide

This guide walks you through deploying the SquareCampus marketing website to AWS Amplify.

## Prerequisites

- AWS Account with Amplify access
- GitHub repository connected to AWS Amplify
- Resend API key (from https://resend.com)

## Deployment Steps

### 1. Initial Setup in AWS Amplify Console

1. **Navigate to AWS Amplify Console**
   - Go to https://console.aws.amazon.com/amplify
   - Click "New app" → "Host web app"

2. **Connect Your Repository**
   - Select "GitHub" as your Git provider
   - Authorize AWS Amplify to access your GitHub account
   - Select the repository: `square_campus_marketing`
   - Select branch: `main`

3. **Configure Build Settings**
   - AWS Amplify should auto-detect Next.js
   - The `amplify.yml` file in the root will be automatically used
   - Build image: Use the default (Amazon Linux 2023)

### 2. Set Environment Variables

In the Amplify Console, go to **App settings** → **Environment variables** and add:

| Variable Name    | Value                          | Notes                           |
|------------------|--------------------------------|---------------------------------|
| `RESEND_API_KEY` | `re_your_actual_api_key_here` | Get from https://resend.com     |

**Important**:
- Click "Save" after adding the variable
- The variable will be encrypted and available during build time

### 3. Configure Build & Deploy Settings

1. **Build Settings** (already configured in `amplify.yml`)
   - Package manager: Bun
   - Build command: `bun run build`
   - Output directory: `.next`

2. **Advanced Settings** (Optional but Recommended)
   - **Node.js version**: 20.x (latest LTS)
   - **Enable performance mode**: ON
   - **Enable SSR and API routes**: ON (required for server actions)

### 4. Deploy

1. Click **"Save and deploy"**
2. AWS Amplify will:
   - Clone your repository
   - Install Bun
   - Install dependencies
   - Build the application
   - Deploy to CloudFront CDN

**First deployment takes ~5-10 minutes**

### 5. Verify Deployment

Once deployed, you'll get a URL like: `https://main.d1234567890.amplifyapp.com`

1. **Test the website**
   - Navigate to the URL
   - Check all pages load correctly
   - Verify Cal.com embed works

2. **Test the contact form**
   - Go to `/#contact-us`
   - Fill out the form
   - Submit and verify:
     - Toast notification appears
     - Email arrives at contact@squarecampus.com
     - Rate limiting works (try submitting again immediately)

### 6. Custom Domain Setup (Optional)

1. In Amplify Console, go to **App settings** → **Domain management**
2. Click **"Add domain"**
3. Enter `squarecampus.com`
4. Follow the DNS configuration steps:
   - Add CNAME records to your DNS provider
   - Wait for SSL certificate provisioning (~15 minutes)

**DNS Records to add:**
```
Type: CNAME
Name: www
Value: [Amplify provides this]

Type: A/ALIAS
Name: @
Value: [Amplify provides this]
```

## Post-Deployment Configuration

### Update Resend Domain (Recommended)

Currently emails are sent from `onboarding@resend.dev`. To use your own domain:

1. **In Resend Dashboard**:
   - Go to "Domains"
   - Add `squarecampus.com`
   - Add the DNS records they provide

2. **Update the code** in `src/actions/contact.ts:323`:
   ```typescript
   from: "SquareCampus Contact <noreply@squarecampus.com>",
   ```

3. **Redeploy** (Amplify will auto-deploy on git push)

### Monitor Email Usage

- Go to Resend Dashboard → Analytics
- Monitor email send volume
- Free tier: 3,000 emails/month
- With spam protection, you should stay well under this

## Continuous Deployment

AWS Amplify is configured for automatic deployments:

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Your changes"
   git push origin main
   ```

2. **Amplify automatically**:
   - Detects the push
   - Runs the build
   - Deploys to production
   - Takes ~3-5 minutes

## Troubleshooting

### Build Fails with "bun: command not found"

**Solution**: Ensure `amplify.yml` includes the Bun installation commands:
```yaml
preBuild:
  commands:
    - curl -fsSL https://bun.sh/install | bash
    - export BUN_INSTALL="$HOME/.bun"
    - export PATH="$BUN_INSTALL/bin:$PATH"
```

### Contact Form Not Sending Emails

**Check**:
1. Environment variable is set: `RESEND_API_KEY`
2. API key is valid (test in Resend dashboard)
3. Check Amplify logs: **App settings** → **Monitoring** → **Logs**
4. Verify server actions are enabled in Amplify settings

### 500 Error on Form Submission

**Check Amplify Function Logs**:
1. Go to **Monitoring** → **Function logs**
2. Look for errors in the contact form server action
3. Common issues:
   - Missing/invalid RESEND_API_KEY
   - Rate limiting in development (clear browser cache)

### Custom Domain SSL Certificate Stuck

**Solution**:
- Wait 15-30 minutes for initial certificate provisioning
- Verify DNS records are correct
- Check domain verification in Amplify console

## Security Notes

All security features are production-ready:

✅ **Security headers** - Applied via `next.config.ts`
✅ **Rate limiting** - 3 emails/hour per user
✅ **Spam protection** - Honeypot + keyword filtering
✅ **Input sanitization** - All user inputs escaped
✅ **External link security** - All have `noopener noreferrer`

## Cost Estimate

- **AWS Amplify**: ~$0-5/month (free tier covers most traffic)
- **Resend**: Free up to 3,000 emails/month
- **Total estimated cost**: $0-5/month

## Support

For issues:
- AWS Amplify: Check CloudWatch logs in Amplify Console
- Contact Form: Check Resend logs at https://resend.com/logs
- General: Review `DEPLOYMENT.md` and `.env.example`

---

**Deployment Checklist**:
- [ ] Repository connected to AWS Amplify
- [ ] `RESEND_API_KEY` environment variable set
- [ ] First deployment successful
- [ ] Contact form tested and working
- [ ] Custom domain configured (optional)
- [ ] Resend domain verified (optional)
- [ ] SSL certificate active
- [ ] All pages loading correctly
- [ ] Cal.com embed working
