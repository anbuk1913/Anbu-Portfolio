import nodemailer from 'nodemailer';
import type { ContactPayload } from './types';

const createTransporter = () =>
  nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

export const sendContactEmail = async (payload: ContactPayload): Promise<void> => {
  const transporter = createTransporter();

  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: monospace; background: #080808; color: #f2f0eb; margin: 0; padding: 0; }
        .container { max-width: 560px; margin: 40px auto; border: 1px solid #1a1a1a; padding: 40px; }
        .header { border-bottom: 1px solid #1a1a1a; padding-bottom: 24px; margin-bottom: 24px; }
        .tag { font-size: 10px; letter-spacing: 4px; text-transform: uppercase; color: #777; }
        .title { font-size: 28px; font-weight: bold; margin-top: 8px; }
        .field { margin-bottom: 20px; }
        .label { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: #555; margin-bottom: 6px; }
        .value { font-size: 14px; color: #d8d5ce; line-height: 1.7; }
        .footer { border-top: 1px solid #1a1a1a; padding-top: 20px; margin-top: 32px; font-size: 10px; color: #3a3a3a; letter-spacing: 2px; text-transform: uppercase; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <p class="tag">Portfolio — New Message</p>
          <p class="title">Contact Form</p>
        </div>
        <div class="field">
          <p class="label">Name</p>
          <p class="value">${payload.name}</p>
        </div>
        <div class="field">
          <p class="label">Email</p>
          <p class="value"><a href="mailto:${payload.email}" style="color:#f2f0eb">${payload.email}</a></p>
        </div>
        <div class="field">
          <p class="label">Message</p>
          <p class="value">${payload.message.replace(/\n/g, '<br/>')}</p>
        </div>
        <div class="footer">
          Received at ${new Date().toUTCString()}
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_RECEIVER,
    replyTo: payload.email,
    subject: `New message from ${payload.name} — Portfolio`,
    html: htmlBody,
    text: `Name: ${payload.name}\nEmail: ${payload.email}\nMessage:\n${payload.message}`,
  });
};
