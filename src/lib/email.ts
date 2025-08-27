import nodemailer from 'nodemailer';
import { Resend } from 'resend';

export type EmailProvider = 'gmail' | 'resend' | 'none';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

class EmailService {
  private provider: EmailProvider;
  private transporter?: nodemailer.Transporter;
  private resend?: Resend;

  constructor() {
    // Determine which provider to use based on environment variables
    if (process.env.RESEND_API_KEY) {
      this.provider = 'resend';
      this.resend = new Resend(process.env.RESEND_API_KEY);
    } else if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      this.provider = 'gmail';
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });
    } else {
      this.provider = 'none';
      console.warn('No email provider configured. Emails will be logged only.');
    }
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    const { to, subject, html, text } = options;

    try {
      switch (this.provider) {
        case 'resend':
          if (!this.resend) throw new Error('Resend not configured');
          
          const resendResult = await this.resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
            to: [to],
            subject,
            html,
            text: text || this.htmlToText(html),
          });

          console.log('Email sent via Resend:', resendResult);
          return true;

        case 'gmail':
          if (!this.transporter) throw new Error('Gmail not configured');

          const gmailResult = await this.transporter.sendMail({
            from: `"${process.env.GMAIL_FROM_NAME || 'what the ellie'}" <${process.env.GMAIL_USER}>`,
            to,
            subject,
            html,
            text: text || this.htmlToText(html),
          });

          console.log('Email sent via Gmail:', gmailResult.messageId);
          return true;

        case 'none':
          // Just log the email for development
          console.log('📧 Email (not sent - no provider configured):');
          console.log('To:', to);
          console.log('Subject:', subject);
          console.log('---');
          return true;

        default:
          throw new Error('Unknown email provider');
      }
    } catch (error) {
      console.error('Failed to send email:', error);
      return false;
    }
  }

  private htmlToText(html: string): string {
    // Simple HTML to text conversion
    return html
      .replace(/<style[^>]*>.*?<\/style>/gs, '')
      .replace(/<script[^>]*>.*?<\/script>/gs, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  getProviderInfo(): string {
    switch (this.provider) {
      case 'resend':
        return 'Resend (Professional email service)';
      case 'gmail':
        return 'Gmail (Personal email)';
      case 'none':
        return 'No email provider configured';
      default:
        return 'Unknown provider';
    }
  }
}

// Export singleton instance
export const emailService = new EmailService();