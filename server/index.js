require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const nodemailer = require('nodemailer');

const app = express();

// Configure CORS to allow only trusted origins (supports env override)
const allowedOrigins = (process.env.ALLOWED_ORIGINS && process.env.ALLOWED_ORIGINS.split(',')) || [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://loadify.online',
  'https://www.loadify.online',
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl, postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    return callback(new Error('CORS policy: This origin is not allowed'));
  },
}));
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Basic health
app.get('/api/health', (req, res) => res.json({ ok: true }));

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message, captchaToken } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // If reCAPTCHA secret is configured, verify with Google reCAPTCHA v3
  const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET;
  if (RECAPTCHA_SECRET) {
    try {
      const params = new URLSearchParams();
      params.append('secret', RECAPTCHA_SECRET);
      params.append('response', captchaToken || '');

      const verifyRes = await axios.post('https://www.google.com/recaptcha/api/siteverify', params.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      const data = verifyRes.data;
      const threshold = parseFloat(process.env.RECAPTCHA_THRESHOLD || '0.5');
      const success = data && data.success;
      const score = data && typeof data.score === 'number' ? data.score : 0;

      if (!success || score < threshold) {
        console.warn('reCAPTCHA failed', { success, score, threshold, data });
        return res.status(400).json({ error: 'reCAPTCHA verification failed' });
      }
    } catch (err) {
      console.error('reCAPTCHA verify error', err?.response?.data || err.message || err);
      return res.status(500).json({ error: 'Failed to verify reCAPTCHA' });
    }
  }

  const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;
  if (!SLACK_WEBHOOK_URL) {
    console.error('SLACK_WEBHOOK_URL is not configured');
    return res.status(500).json({ error: 'Contact form is not configured' });
  }

  try {
    const slackBody = {
      blocks: [
        {
          type: 'header',
          text: { type: 'plain_text', text: 'New Loadify Contact Form Submission' },
        },
        {
          type: 'section',
          fields: [
            { type: 'mrkdwn', text: `*Name:*\n${name}` },
            { type: 'mrkdwn', text: `*Email:*\n${email}` },
            { type: 'mrkdwn', text: `*Phone:*\n${phone || '-'}` },
          ],
        },
        {
          type: 'section',
          text: { type: 'mrkdwn', text: `*Message:*\n${message}` },
        },
      ],
    };

    await axios.post(SLACK_WEBHOOK_URL, slackBody, {
      headers: { 'Content-Type': 'application/json' },
    });

    return res.json({ ok: true });
  } catch (err) {
    console.error('Slack webhook error', err?.response?.data || err.message);
    return res.status(500).json({ error: 'Failed to send message' });
  }
});

app.listen(PORT, () => {
  console.log(`Contact server listening on ${PORT}`);
});
