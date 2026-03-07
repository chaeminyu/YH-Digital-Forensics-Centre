import bleach
import html
import re
from typing import Optional

def sanitize_html_content(content: str) -> str:
    """
    Sanitize HTML content to prevent XSS attacks.
    Allows safe HTML tags for formatting while removing potentially dangerous content.
    """
    if not content:
        return content
    
    # Allowed HTML tags for rich content (posts)
    allowed_tags = [
        'p', 'br', 'strong', 'b', 'em', 'i', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'a', 'img'
    ]
    
    allowed_attributes = {
        'a': ['href', 'title'],
        'img': ['src', 'alt', 'width', 'height'],
    }
    
    # Clean the HTML
    cleaned_content = bleach.clean(
        content,
        tags=allowed_tags,
        attributes=allowed_attributes,
        strip=True
    )
    
    return cleaned_content

def sanitize_plain_text(text: str) -> str:
    """
    Sanitize plain text input (for fields like names, subjects, etc.)
    Removes HTML tags and encodes special characters.
    """
    if not text:
        return text
    
    # Remove any HTML tags
    text = bleach.clean(text, tags=[], strip=True)
    
    # Escape HTML entities
    text = html.escape(text)
    
    # Remove potential script injections
    text = re.sub(r'<script.*?</script>', '', text, flags=re.IGNORECASE | re.DOTALL)
    text = re.sub(r'javascript:', '', text, flags=re.IGNORECASE)
    text = re.sub(r'on\w+\s*=', '', text, flags=re.IGNORECASE)
    
    return text.strip()

def sanitize_url(url: Optional[str]) -> Optional[str]:
    """
    Sanitize URL input to prevent malicious URLs.
    """
    if not url:
        return url
    
    url = url.strip()
    
    # Allow only http/https URLs
    if not re.match(r'^https?://', url, re.IGNORECASE):
        return None
    
    # Remove potential script injections
    if re.search(r'javascript:|data:|vbscript:', url, re.IGNORECASE):
        return None
    
    return url

def sanitize_message(message: str) -> str:
    """
    Sanitize message content (allows some basic formatting but removes dangerous content)
    """
    if not message:
        return message
    
    # Allow basic formatting tags for messages
    allowed_tags = ['p', 'br', 'strong', 'b', 'em', 'i']
    
    cleaned_message = bleach.clean(
        message,
        tags=allowed_tags,
        strip=True
    )
    
    return cleaned_message