import httpx
from typing import Dict, Optional

async def get_country_from_ip(ip: str) -> Dict[str, Optional[str]]:
    """
    Get country information from IP address using ip-api.com
    Returns dict with country_code and country_name
    """
    try:
        # Skip local/private IPs
        if ip in ['127.0.0.1', 'localhost'] or ip.startswith('192.168.') or ip.startswith('10.'):
            return {"country_code": None, "country_name": None}
        
        async with httpx.AsyncClient(timeout=5.0) as client:
            response = await client.get(
                f"http://ip-api.com/json/{ip}?fields=status,country,countryCode"
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get("status") == "success":
                    return {
                        "country_code": data.get("countryCode"),
                        "country_name": data.get("country")
                    }
    except Exception as e:
        print(f"Geolocation error for IP {ip}: {e}")
    
    return {"country_code": None, "country_name": None}

def mask_ip_address(ip: str) -> str:
    """
    Mask IP address for privacy: 123.45.xxx.xxx
    """
    try:
        parts = ip.split('.')
        if len(parts) == 4:
            return f"{parts[0]}.{parts[1]}.xxx.xxx"
        return "xxx.xxx.xxx.xxx"
    except:
        return "xxx.xxx.xxx.xxx"