import math
from PIL import Image, ImageDraw, ImageFont

def draw_blood_drop(draw, center_x, center_y, size, fill_color, inner_color=None):
    # A smooth blood droplet: teardrop shape (pointed at top, round bulb at bottom)
    # Radius of lower circle
    r = size * 0.38
    cy = center_y + size * 0.12
    cx = center_x
    top_y = center_y - size * 0.44
    
    # Polygon / curves for teardrop
    points = []
    # top point
    points.append((cx, top_y))
    
    # Right tangent down to circle
    # circle tangent angle roughly 35 degrees from horizontal
    num_pts = 32
    for i in range(num_pts + 1):
        angle = math.radians(20 + (180 - 40) * (i / num_pts))
        px = cx + r * math.cos(angle)
        py = cy + r * math.sin(angle)
        points.append((px, py))
    
    draw.polygon(points, fill=fill_color)
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=fill_color)
    
    # Inner white medical cross or heart
    if inner_color:
        cw = size * 0.08
        ch = size * 0.24
        # vertical bar
        draw.rounded_rectangle([cx - cw/2, cy - ch/2, cx + cw/2, cy + ch/2], radius=cw/3, fill=inner_color)
        # horizontal bar
        draw.rounded_rectangle([cx - ch/2, cy - cw/2, cx + ch/2, cy + cw/2], radius=cw/3, fill=inner_color)

def create_app_icon(size, is_round=False):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Background
    bg_color = (217, 35, 50, 255) # #d92332
    if is_round:
        draw.ellipse([0, 0, size - 1, size - 1], fill=bg_color)
    else:
        corner = int(size * 0.22)
        draw.rounded_rectangle([0, 0, size - 1, size - 1], radius=corner, fill=bg_color)
    
    # Droplet
    draw_blood_drop(draw, size / 2, size / 2, size * 0.82, (255, 255, 255, 255), inner_color=bg_color)
    return img

def create_feature_graphic():
    width, height = 1024, 500
    img = Image.new("RGBA", (width, height), (26, 31, 44, 255))
    draw = ImageDraw.Draw(img)
    
    # Rich gradient background
    for y in range(height):
        factor = y / height
        r = int(170 * (1 - factor * 0.4) + 217 * (factor * 0.4))
        g = int(18 * (1 - factor * 0.3) + 35 * (factor * 0.3))
        b = int(30 * (1 - factor * 0.3) + 50 * (factor * 0.3))
        draw.line([(0, y), (width, y)], fill=(r, g, b, 255))
    
    # Left blood drop emblem
    draw_blood_drop(draw, 220, 250, 280, (255, 255, 255, 245), inner_color=(217, 35, 50, 255))
    
    # Textual information on the right
    # Title
    draw.rectangle([400, 110, 408, 230], fill=(255, 255, 255, 240))
    # We draw stylish simulated high-res text shapes/cards
    # Subtitle pill
    draw.rounded_rectangle([425, 115, 680, 145], radius=15, fill=(255, 255, 255, 40))
    
    # Badges
    badges = [
        (425, 330, 600, 370, "100% VOLUNTARY"),
        (620, 330, 800, 370, "ALL INDIA COVERAGE"),
        (820, 330, 970, 370, "EMERGENCY CONNECT")
    ]
    for x1, y1, x2, y2, _ in badges:
        draw.rounded_rectangle([x1, y1, x2, y2], radius=10, fill=(255, 255, 255, 35), outline=(255, 255, 255, 120), width=1)
    
    return img

def create_screenshot(title_text, subtitle_text, color_theme):
    w, h = 1080, 1920
    img = Image.new("RGBA", (w, h), (247, 249, 252, 255))
    draw = ImageDraw.Draw(img)
    
    # Header banner
    draw.rectangle([0, 0, w, 440], fill=color_theme)
    # Header card with blood drop
    draw_blood_drop(draw, w / 2, 190, 180, (255, 255, 255, 255), inner_color=color_theme)
    
    # Main phone mock card
    draw.rounded_rectangle([80, 480, w - 80, h - 80], radius=32, fill=(255, 255, 255, 255), outline=(220, 226, 235, 255), width=2)
    
    # Status bar inside mock
    draw.rounded_rectangle([130, 530, w - 130, 610], radius=16, fill=(245, 247, 250, 255))
    
    # Content blocks inside mock
    draw.rounded_rectangle([130, 650, w - 130, 850], radius=20, fill=(254, 242, 242, 255), outline=(254, 202, 202, 255), width=2)
    draw.rounded_rectangle([130, 890, w - 130, 1090], radius=20, fill=(255, 255, 255, 255), outline=(229, 231, 235, 255), width=2)
    draw.rounded_rectangle([130, 1130, w - 130, 1330], radius=20, fill=(255, 255, 255, 255), outline=(229, 231, 235, 255), width=2)
    draw.rounded_rectangle([130, 1370, w - 130, 1570], radius=20, fill=(255, 255, 255, 255), outline=(229, 231, 235, 255), width=2)
    draw.rounded_rectangle([130, 1630, w - 130, 1750], radius=24, fill=(217, 35, 50, 255))
    
    return img

print("Generating app icons...")
# 512x512
icon512 = create_app_icon(512)
icon512.save("public/icons/icon-512x512.png")
icon512.save("android/store-assets/playstore-icon-512x512.png")

# 192x192
icon192 = create_app_icon(192)
icon192.save("public/icons/icon-192x192.png")

# Maskable 512
maskable512 = create_app_icon(512, is_round=True)
maskable512.save("public/icons/icon-maskable-512x512.png")

# Android launcher mipmap icons
sizes = {
    "mdpi": 48,
    "hdpi": 72,
    "xhdpi": 96,
    "xxhdpi": 144,
    "xxxhdpi": 192
}

for name, sz in sizes.items():
    icon_square = create_app_icon(sz, is_round=False)
    icon_round = create_app_icon(sz, is_round=True)
    icon_square.save(f"android/app/src/main/res/mipmap-{name}/ic_launcher.png")
    icon_round.save(f"android/app/src/main/res/mipmap-{name}/ic_launcher_round.png")

print("Generating Play Store feature graphic...")
feature = create_feature_graphic()
feature.save("android/store-assets/playstore-feature-graphic-1024x500.png")

print("Generating Play Store preview screenshots...")
s1 = create_screenshot("Find Blood Donors Across India", "Real-time search by district & blood group", (217, 35, 50, 255))
s1.save("android/store-assets/screenshot-1-find-donors.png")

s2 = create_screenshot("Emergency Blood Request", "Alert voluntary donors near licensed hospitals", (185, 28, 38, 255))
s2.save("android/store-assets/screenshot-2-emergency-request.png")

s3 = create_screenshot("Voluntary Donor Registration", "Privacy-first donor network", (217, 35, 50, 255))
s3.save("android/store-assets/screenshot-3-register-donor.png")

print("All asset files generated successfully!")
