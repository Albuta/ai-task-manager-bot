import dotenv from 'dotenv';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import twilio from 'twilio';

dotenv.config();

const {
  SHEET_ID,
  GOOGLE_CLIENT_EMAIL,
  GOOGLE_PRIVATE_KEY,
  TWILIO_SID,
  TWILIO_TOKEN,
  TWILIO_FROM,
  PHONE_ANNA,
  PHONE_GIORGI
} = process.env;

async function getTasksAndSend() {
  const doc = new GoogleSpreadsheet(SHEET_ID);
  await doc.useServiceAccountAuth({
    client_email: GOOGLE_CLIENT_EMAIL,
    private_key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
  });

  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows();

  const users = {};

  rows.forEach(row => {
    const name = row.Name;
    const task = row.Task;
    if (!users[name]) users[name] = [];
    users[name].push(task);
  });

  for (const [name, tasks] of Object.entries(users)) {
    const msg = createFakeMessage(name, tasks);
    await sendWhatsApp(name, msg);
  }
}

function createFakeMessage(name, tasks) {
  return `Hi ${name}, here’s what’s on your plate today: ${tasks.join(', ')}. Thanks for having me today Kristina!`;
}

async function sendWhatsApp(name, message) {
  const client = twilio(TWILIO_SID, TWILIO_TOKEN);
  const phoneMap = {
    'Giorgi': PHONE_GIORGI
  };

  const to = phoneMap[name];
  if (!to) {
    console.warn(`No phone number configured for ${name}`);
    return;
  }

  await client.messages.create({
  body: message,
  from: `whatsapp:${TWILIO_FROM}`,
  to: `whatsapp:${phoneMap[name]}`
});

  console.log(`✅ WhatsApp message sent to ${name}: ${message}`);
}

getTasksAndSend();
