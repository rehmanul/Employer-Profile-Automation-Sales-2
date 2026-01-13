# Make.com Integration Guide

## Overview

This document explains how to set up the Make.com automation scenario for the Profile & Job Creation system.

---

## Webhook Configuration

### Main Webhook (Lead Capture)

- **URL**: `https://hook.eu2.make.com/8xsf9sha1e3c3bdznz5sii2e9j10wpi5`
- **Method**: POST
- **Content-Type**: application/json

### Expected Payload

```json
{
  "leadId": "lead_abc123",
  "companyUrl": "https://example-company.de",
  "jobTitle": "Vertriebsmitarbeiter (m/w/d)",
  "contactEmail": "user@example.com",
  "contactPhone": "+49 123 456 789",
  "planType": "free" | "premium",
  "callbackUrl": "https://your-app.vercel.app/api/webhook/status"
}
```

---

## Scenario Flow

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Webhook   │───▶│   Apify     │───▶│ Brandfetch  │───▶│  Gemini AI  │
│ (Receive)   │    │  (Scrape)   │    │   (Brand)   │    │  (Generate) │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
                                                                │
                         ┌──────────────────────────────────────┘
                         ▼
                   ┌─────────────┐    ┌─────────────┐
                   │  Callback   │───▶│   Email     │
                   │ (Complete)  │    │  (Notify)   │
                   └─────────────┘    └─────────────┘
```

---

## Required Integrations

### 1. Apify (Website Crawler)

- Actor: `apify/website-content-crawler`
- Purpose: Scrape company website for text content
- API Key: Configure in Make.com Apify connection

### 2. Brandfetch

- Purpose: Extract logo and brand colors
- API Key: Get from brandfetch.com/developers
- Fallback: Use placeholder logo if not found

### 3. Google Gemini AI

- Model: `gemini-1.5-flash` (or `gemini-1.5-pro`)
- Purpose: Generate profile text and job description
- API Key: Configure in Make.com Google AI connection

### 4. Google Gmail (Optional)

- Purpose: Send confirmation emails
- Auth: OAuth2 with Gmail account

---

## Status Updates

The scenario sends status updates to the callback URL at each step:

| Status | Progress | Message |
|--------|----------|---------|
| `processing` | 10% | Verarbeitung gestartet |
| `scraping` | 30% | Website wird analysiert |
| `analyzing` | 50% | Markeninformationen werden verarbeitet |
| `generating` | 75% | KI erstellt Profil und Stellenanzeige |
| `complete` | 100% | Fertig! |

---

## Setup Instructions

### Step 1: Import Scenario

1. Go to Make.com → Scenarios → Create new
2. Click ⚙️ → Import Blueprint
3. Upload `lead-processing-scenario.json`

### Step 2: Configure Connections

1. **Apify**: Add your Apify API token
2. **Brandfetch**: Add your Brandfetch API key
3. **Google AI**: Connect with API key from Google AI Studio
4. **Gmail**: Authorize with your Google account

### Step 3: Activate Webhook

1. Open the Webhook module
2. Copy the webhook URL
3. Update `.env.local` in the app:

   ```
   NEXT_PUBLIC_MAKECOM_LEAD_WEBHOOK=your-webhook-url
   ```

### Step 4: Test

1. Start the scenario (toggle ON)
2. Submit a test lead through the app
3. Monitor execution in Make.com

---

## Error Handling

The scenario includes built-in error handling:

- **Max retries**: 3
- **Auto-commit**: Enabled
- **On error**: Send failure status to callback URL

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| "Website not accessible" | URL unreachable | Verify URL format |
| "Brand not found" | Brandfetch has no data | Use fallback logo |
| "AI generation failed" | Gemini quota exceeded | Check API limits |

---

## Customization

### Modify AI Prompt

Edit module #7 to change the prompt. The current prompt generates:

- Company profile (about text, values, benefits)
- Job advert (intro, responsibilities, requirements)

### Add Stock Images

Insert Unsplash/Pexels module between Brandfetch and Gemini to fetch relevant images based on company industry.

### Add Google Drive Storage

Insert Google Drive module after completion to save generated PDFs.

---

## API Costs Estimate

| Service | Cost per Request |
|---------|------------------|
| Apify | ~$0.01-0.05 per crawl |
| Brandfetch | Free tier: 25/month |
| Gemini | ~$0.001 per 1K tokens |
| Make.com | 1 operation per module |

**Total per lead**: ~$0.05-0.15 (varies by content length)
