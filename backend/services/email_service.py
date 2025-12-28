import os
from fastapi import HTTPException
from fastapi_mail import FastMail, MessageSchema, MessageType, ConnectionConfig
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from schemas.inquiry import Inquiry
import logging
from pathlib import Path

logger = logging.getLogger(__name__)

class EmailConfig:
    """Email configuration from environment variables"""
    def __init__(self):
        self.MAIL_USERNAME = os.getenv("SMTP_USER", "")
        self.MAIL_PASSWORD = os.getenv("SMTP_PASSWORD", "")
        self.MAIL_FROM = os.getenv("MAIL_FROM", "noreply@yhforensic.com")
        self.MAIL_PORT = int(os.getenv("SMTP_PORT", "587"))
        self.MAIL_SERVER = os.getenv("SMTP_HOST", "smtp.gmail.com")
        self.MAIL_FROM_NAME = os.getenv("MAIL_FROM_NAME", "YH Digital Forensic Center")
        self.MAIL_TLS = os.getenv("SMTP_TLS", "True").lower() == "true"
        self.MAIL_SSL = os.getenv("SMTP_SSL", "False").lower() == "true"
        self.USE_CREDENTIALS = True
        self.VALIDATE_CERTS = True
        
    def get_connection_config(self) -> ConnectionConfig:
        """Get FastMail connection configuration"""        
        return ConnectionConfig(
            MAIL_USERNAME=self.MAIL_USERNAME,
            MAIL_PASSWORD=self.MAIL_PASSWORD,
            MAIL_FROM=self.MAIL_FROM,
            MAIL_PORT=self.MAIL_PORT,
            MAIL_SERVER=self.MAIL_SERVER,
            MAIL_FROM_NAME=self.MAIL_FROM_NAME,
            MAIL_STARTTLS=self.MAIL_TLS,
            MAIL_SSL_TLS=self.MAIL_SSL,
            USE_CREDENTIALS=self.USE_CREDENTIALS,
            VALIDATE_CERTS=self.VALIDATE_CERTS
        )

class EmailService:
    """Service for sending emails"""
    
    def __init__(self):
        self.config = EmailConfig()
        self.conn_config = self.config.get_connection_config()
        self.fast_mail = FastMail(self.conn_config)
        self.admin_email = os.getenv("ADMIN_EMAIL", "yh@yhforensic.com")
    
    def create_inquiry_notification_html(self, inquiry: Inquiry, kst_time=None) -> str:
        """Create HTML email template for new inquiry notification"""
        if kst_time is None:
            from datetime import timezone, timedelta
            kst = timezone(timedelta(hours=9))
            kst_time = inquiry.created_at.replace(tzinfo=timezone.utc).astimezone(kst)
        
        return f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Inquiry from {inquiry.name}</title>
            <style>
                body {{
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                    line-height: 1.6;
                    color: #374151;
                    margin: 0;
                    padding: 20px;
                    background-color: #f9fafb;
                }}
                .container {{
                    max-width: 650px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                }}
                .header {{
                    background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
                    color: white;
                    padding: 32px 24px;
                    text-align: center;
                }}
                .header h1 {{
                    margin: 0 0 8px 0;
                    font-size: 24px;
                    font-weight: 700;
                }}
                .header p {{
                    margin: 0;
                    font-size: 16px;
                    opacity: 0.9;
                }}
                .urgency-badge {{
                    display: inline-block;
                    padding: 6px 12px;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin-top: 12px;
                }}
                .urgency-urgent {{
                    background-color: #fef2f2;
                    color: #dc2626;
                    border: 1px solid #fecaca;
                }}
                .urgency-high {{
                    background-color: #fef3c7;
                    color: #d97706;
                    border: 1px solid #fed7aa;
                }}
                .urgency-normal {{
                    background-color: #ecfdf5;
                    color: #059669;
                    border: 1px solid #a7f3d0;
                }}
                .urgency-low {{
                    background-color: #eff6ff;
                    color: #2563eb;
                    border: 1px solid #bfdbfe;
                }}
                .content {{
                    padding: 32px 24px;
                }}
                .section {{
                    margin-bottom: 32px;
                }}
                .section-title {{
                    font-size: 18px;
                    font-weight: 600;
                    color: #1f2937;
                    margin-bottom: 16px;
                    border-bottom: 2px solid #e5e7eb;
                    padding-bottom: 8px;
                }}
                .info-grid {{
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 16px;
                    margin-bottom: 24px;
                }}
                .info-item {{
                    background-color: #f8fafc;
                    padding: 16px;
                    border-radius: 8px;
                    border-left: 4px solid #3b82f6;
                }}
                .info-label {{
                    font-size: 12px;
                    font-weight: 600;
                    color: #6b7280;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin-bottom: 4px;
                }}
                .info-value {{
                    font-size: 14px;
                    font-weight: 500;
                    color: #1f2937;
                    word-break: break-all;
                }}
                .subject-box {{
                    background-color: #f0f9ff;
                    border: 1px solid #bae6fd;
                    border-radius: 8px;
                    padding: 16px;
                    margin-bottom: 24px;
                }}
                .subject-text {{
                    font-size: 16px;
                    font-weight: 600;
                    color: #0c4a6e;
                    margin: 0;
                }}
                .message-box {{
                    background-color: #ffffff;
                    border: 2px solid #e5e7eb;
                    border-radius: 8px;
                    padding: 20px;
                    margin-top: 16px;
                }}
                .message-text {{
                    font-size: 14px;
                    line-height: 1.7;
                    color: #374151;
                    margin: 0;
                    white-space: pre-wrap;
                }}
                .footer {{
                    background-color: #1f2937;
                    color: #d1d5db;
                    padding: 24px;
                    text-align: center;
                    font-size: 12px;
                }}
                .footer p {{
                    margin: 4px 0;
                }}
                .reply-button {{
                    display: inline-block;
                    background-color: #3b82f6;
                    color: white;
                    padding: 12px 24px;
                    text-decoration: none;
                    border-radius: 6px;
                    font-weight: 600;
                    margin-top: 16px;
                }}
                .timestamp {{
                    text-align: right;
                    color: #6b7280;
                    font-size: 12px;
                    margin-top: 16px;
                    font-style: italic;
                }}
                @media (max-width: 600px) {{
                    .info-grid {{
                        grid-template-columns: 1fr;
                    }}
                    .container {{
                        margin: 10px;
                        border-radius: 8px;
                    }}
                    .content, .header, .footer {{
                        padding: 20px 16px;
                    }}
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🚨 New Inquiry Received</h1>
                    <p>YH Digital Forensic Center</p>
                    <div class="urgency-badge urgency-{inquiry.urgency_level}">
                        {inquiry.urgency_level.replace('_', ' ').title()} Priority
                    </div>
                </div>
                
                <div class="content">
                    <div class="section">
                        <h2 class="section-title">📋 Client Information</h2>
                        <div class="info-grid">
                            <div class="info-item">
                                <div class="info-label">Full Name</div>
                                <div class="info-value">{inquiry.name}</div>
                            </div>
                            <div class="info-item">
                                <div class="info-label">Email Address</div>
                                <div class="info-value">{inquiry.email}</div>
                            </div>
                            {f'''<div class="info-item">
                                <div class="info-label">Company</div>
                                <div class="info-value">{inquiry.company}</div>
                            </div>''' if inquiry.company else ''}
                            {f'''<div class="info-item">
                                <div class="info-label">Phone Number</div>
                                <div class="info-value">{inquiry.country_code} {inquiry.phone}</div>
                            </div>''' if inquiry.phone else ''}
                        </div>
                    </div>

                    <div class="section">
                        <h2 class="section-title">📨 Inquiry Details</h2>
                        <div class="subject-box">
                            <p class="subject-text">{inquiry.subject}</p>
                        </div>
                        
                        <div class="message-box">
                            <p class="message-text">{inquiry.message}</p>
                        </div>
                        
                        <div class="timestamp">
                            Received on {kst_time.strftime('%B %d, %Y at %H:%M:%S')} KST
                        </div>
                    </div>
                </div>
                
                <div class="footer">
                    <p><strong>YH Digital Forensic Center</strong> - Automatic Notification</p>
                    <p>This email was automatically generated from your website contact form.</p>
                    <a href="mailto:{inquiry.email}" class="reply-button">Reply to Client</a>
                    <p style="margin-top: 16px; opacity: 0.8;">
                        For urgent matters, contact the client directly at {inquiry.email}
                    </p>
                </div>
            </div>
        </body>
        </html>
        """
    
    async def send_inquiry_notification(self, inquiry: Inquiry) -> bool:
        """Send email notification for new inquiry"""
        try:
            logger.info(f"Starting to send email notification for inquiry ID {inquiry.id}")
            
            # Check if email configuration is valid
            if not self.config.MAIL_USERNAME or not self.config.MAIL_PASSWORD:
                logger.error("Email credentials are not configured properly")
                return False
                
            logger.info(f"Email config: {self.config.MAIL_SERVER}:{self.config.MAIL_PORT}, SSL: {self.config.MAIL_SSL}, TLS: {self.config.MAIL_TLS}")
            
            # Create email content
            subject = f"🚨 New Inquiry: {inquiry.subject}"
            if inquiry.urgency_level in ['urgent', 'high']:
                subject = f"🔥 URGENT - {subject}"
            
            # Calculate Korean Standard Time for both HTML and text templates
            from datetime import timezone, timedelta
            kst = timezone(timedelta(hours=9))
            kst_time = inquiry.created_at.replace(tzinfo=timezone.utc).astimezone(kst)
            
            html_body = self.create_inquiry_notification_html(inquiry, kst_time)
            
            # Build text body with explicit line breaks
            lines = [
                "========================================",
                "🚨 NEW INQUIRY - YH Digital Forensic Center",
                "========================================",
                "",
                "📋 CLIENT INFORMATION:",
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
                f"Name:        {inquiry.name}",
                f"Email:       {inquiry.email}",
            ]
            
            if inquiry.company:
                lines.append(f"Company:     {inquiry.company}")
            if inquiry.phone:
                lines.append(f"Phone:       {inquiry.country_code} {inquiry.phone}")
                
            lines.extend([
                "",
                "📨 INQUIRY DETAILS:",
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
                f"Urgency:     {inquiry.urgency_level.upper()} PRIORITY",
                f"Subject:     {inquiry.subject}",
                "",
                "Message:",
                f"{inquiry.message}",
                "",
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
                f"⏰ Received: {kst_time.strftime('%Y-%m-%d %H:%M:%S')} KST",
                "",
                f"📧 Reply directly to: {inquiry.email}",
                "",
                "---",
                "This email was automatically generated from your",
                "YH Digital Forensic Center website contact form."
            ])
            
            text_body = "\r\n".join(lines)
            
            # Prepare message with both text and HTML
            message = MessageSchema(
                subject=subject,
                recipients=[self.admin_email],
                body=text_body,
                html=html_body,
                subtype=MessageType.html
            )
            
            logger.info(f"Prepared message to send to {self.admin_email}")
            
            # Add a timeout wrapper around the email sending
            import asyncio
            try:
                await asyncio.wait_for(self.fast_mail.send_message(message), timeout=30.0)
                logger.info(f"Inquiry notification email sent successfully to {self.admin_email} for inquiry from {inquiry.email}")
                return True
            except asyncio.TimeoutError:
                logger.error(f"Email sending timed out after 30 seconds for inquiry ID {inquiry.id}")
                return False
            
        except Exception as e:
            logger.error(f"Failed to send inquiry notification email: {str(e)}", exc_info=True)
            # Don't raise exception to prevent API failure if email fails
            return False

# Global email service instance
email_service = EmailService()