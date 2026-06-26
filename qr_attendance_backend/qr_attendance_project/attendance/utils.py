"""
utils.py – Constants and shared helpers for the QR Attendance System.

Centralising school coordinates and allowed IP ranges here means
you only need to update one file when the school relocates or the
network changes.
"""

# ── School GPS location ────────────────────────────────────────────────────────
# Centre of the school campus (latitude, longitude in decimal degrees).
# Update these values to match your actual school coordinates.
SCHOOL_LATITUDE  = 11.5564   # e.g. Phnom Penh – replace with real coords
SCHOOL_LONGITUDE = 104.9282

# Maximum allowed distance from the school centre, in metres.
# 150 m covers a typical campus; tighten to 50 m for a single building.
SCHOOL_RADIUS_METERS = 150

# ── School WiFi IP ranges ──────────────────────────────────────────────────────
# Add every subnet / CIDR block assigned to school WiFi access points.
# Both IPv4 and IPv6 prefixes are supported (uses Python's ipaddress module).
SCHOOL_WIFI_SUBNETS = [
    '192.168.1.0/24',   # Main campus WiFi
    '10.0.0.0/8',       # Internal LAN
    '172.16.0.0/12',    # Additional internal range
    # '203.0.113.0/24', # Public static IP block – add yours here
]

# ── Attendance token ───────────────────────────────────────────────────────────
# Length of the random token embedded in each QR code URL.
TOKEN_BYTE_LENGTH = 32   # → 64 hex characters

# ── Cookie / session keys ──────────────────────────────────────────────────────
STUDENT_COOKIE_NAME   = 'qr_student_id'   # browser cookie that remembers a student
STUDENT_SESSION_KEY   = 'student_profile' # session dict key for student data

# ── Rate limiting ──────────────────────────────────────────────────────────────
RATE_LIMIT_CACHE_PREFIX = 'rl:'
