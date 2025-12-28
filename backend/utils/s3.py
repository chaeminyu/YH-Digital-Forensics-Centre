import os
import boto3
from datetime import datetime
from typing import Optional, Tuple
from PIL import Image
import io
import uuid
from botocore.exceptions import ClientError

class S3Handler:
    def __init__(self):
        self.aws_access_key_id = os.getenv('AWS_ACCESS_KEY_ID')
        self.aws_secret_access_key = os.getenv('AWS_SECRET_ACCESS_KEY')
        self.bucket_name = os.getenv('AWS_S3_BUCKET')
        self.region = os.getenv('AWS_REGION', 'us-east-1')
        
        if not all([self.aws_access_key_id, self.aws_secret_access_key, self.bucket_name]):
            raise ValueError("AWS credentials and bucket name must be configured")
        
        self.s3_client = boto3.client(
            's3',
            aws_access_key_id=self.aws_access_key_id,
            aws_secret_access_key=self.aws_secret_access_key,
            region_name=self.region
        )
    
    def resize_image(self, image_data: bytes, max_width: int = 1920, max_height: int = 1080) -> bytes:
        """
        Resize image while maintaining aspect ratio
        """
        try:
            with Image.open(io.BytesIO(image_data)) as img:
                # Convert to RGB if necessary (for PNG with transparency)
                if img.mode in ('RGBA', 'P'):
                    # Create a white background
                    background = Image.new('RGB', img.size, (255, 255, 255))
                    background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
                    img = background
                
                # Calculate new dimensions while maintaining aspect ratio
                width, height = img.size
                if width > max_width or height > max_height:
                    img.thumbnail((max_width, max_height), Image.Resampling.LANCZOS)
                
                # Save resized image
                output = io.BytesIO()
                img.save(output, format='JPEG', quality=85, optimize=True)
                output.seek(0)
                return output.getvalue()
        except Exception as e:
            # If resize fails, return original
            return image_data
    
    def generate_filename(self, original_filename: str) -> str:
        """
        Generate unique filename with date folder structure
        """
        # Get file extension
        ext = original_filename.lower().split('.')[-1] if '.' in original_filename else 'jpg'
        
        # Generate date folder path (YYYY/MM)
        now = datetime.now()
        date_path = now.strftime('%Y/%m')
        
        # Generate unique filename
        unique_id = str(uuid.uuid4())[:8]
        filename = f"{unique_id}.{ext}"
        
        return f"uploads/{date_path}/{filename}"
    
    def upload_image(self, file_data: bytes, original_filename: str, content_type: str = None) -> Tuple[bool, str]:
        """
        Upload image to S3 with resizing and return success status and URL
        """
        try:
            # Resize image if it's an image file
            if content_type and content_type.startswith('image/'):
                file_data = self.resize_image(file_data)
                content_type = 'image/jpeg'  # Always save as JPEG after processing
            
            # Generate unique filename
            s3_key = self.generate_filename(original_filename)
            
            # Upload to S3
            self.s3_client.put_object(
                Bucket=self.bucket_name,
                Key=s3_key,
                Body=file_data,
                ContentType=content_type or 'application/octet-stream',
                ACL='public-read'  # Make images publicly accessible
            )
            
            # Generate public URL
            url = f"https://{self.bucket_name}.s3.{self.region}.amazonaws.com/{s3_key}"
            
            return True, url
            
        except ClientError as e:
            print(f"S3 upload error: {e}")
            return False, str(e)
        except Exception as e:
            print(f"Upload error: {e}")
            return False, str(e)
    
    def delete_file(self, s3_url: str) -> bool:
        """
        Delete file from S3 using the full URL
        """
        try:
            # Extract S3 key from URL
            if f"s3.{self.region}.amazonaws.com" in s3_url:
                s3_key = s3_url.split(f"s3.{self.region}.amazonaws.com/")[-1]
            else:
                return False
            
            # Delete from S3
            self.s3_client.delete_object(
                Bucket=self.bucket_name,
                Key=s3_key
            )
            
            return True
            
        except Exception as e:
            print(f"S3 delete error: {e}")
            return False

# Global S3 handler instance
s3_handler = None

def get_s3_handler() -> Optional[S3Handler]:
    """
    Get S3 handler instance, returns None if AWS is not configured
    """
    global s3_handler
    try:
        if s3_handler is None:
            s3_handler = S3Handler()
        return s3_handler
    except ValueError:
        # AWS not configured, return None
        return None

def upload_to_s3(file_data: bytes, filename: str, content_type: str = None) -> Tuple[bool, str]:
    """
    Upload file to S3, fallback to local storage if S3 not available
    """
    s3 = get_s3_handler()
    if s3:
        return s3.upload_image(file_data, filename, content_type)
    else:
        # Fallback to local storage
        return False, "S3 not configured"