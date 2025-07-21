# AI Task Manager Bot 🤖📲

Automatically sends personalized daily task summaries to your team via WhatsApp using OpenAI + Google Sheets + Twilio.

## ✨ Features
- Pulls task data from Google Sheets
- Generates natural-language summaries with GPT-4
- Sends WhatsApp messages with Twilio
- Fully automated (cron job or n8n-compatible)

## 🧰 Tech Stack
- Node.js
- Google Sheets API (via Service Account)
- OpenAI API (GPT-3.5/4)
- Twilio WhatsApp API
- dotenv for secrets

## 📸 Demo
| Google Sheet | WhatsApp Message |
|--------------|------------------|
| ![sheet](screenshots/sample-sheet.png) | ![msg](screenshots/whatsapp-msg.png) |

## 🚀 Setup

1. Clone this repo and run `npm install`
2. Create `.env` (see `.env.example`)
3. Share your Google Sheet with the service account email
4. Run the bot manually or via cron:

```bash
node task-bot.js
```

## 🤖 Sample Prompt Sent to OpenAI

```
Write a friendly message to Anna listing her tasks for today:
1. Finalize UI
2. Sync with team
3. Clean board
Make it short and motivating.
```

---
Built for AI Automation Engineer interviews ⚙️
