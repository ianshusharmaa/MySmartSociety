# Assets Directory

This directory contains shared assets used across the MySmartSociety project.

## Directory Structure

```
assets/
├── images/       # General images (backgrounds, banners, etc.)
├── icons/        # Icon files (SVG, PNG icons)
└── logos/        # Brand logos and branding assets
```

## Usage Guidelines

### Shared Assets (Root Level)
- Place images used across multiple parts of the application here
- Include documentation images, shared backgrounds, and common graphics

### Frontend-Specific Assets
- **frontend-admin/src/assets/** - Assets specific to admin interface
- **frontend-user/src/assets/** - Assets specific to user/resident interface

## Image Naming Convention

Use descriptive, lowercase names with hyphens:
- ✅ `logo-primary.png`
- ✅ `background-dashboard.jpg`
- ✅ `icon-notification.svg`
- ❌ `image1.png`
- ❌ `IMG_123.jpg`

## Supported Formats

- **Images**: PNG, JPG, JPEG, WebP
- **Icons**: SVG (preferred), PNG
- **Logos**: SVG (preferred), PNG

## Optimization

- Compress images before adding them to the project
- Use appropriate formats (SVG for icons, WebP for photos when possible)
- Keep file sizes reasonable for web performance
