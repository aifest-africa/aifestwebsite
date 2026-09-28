# Edition Template

This template provides a structure for creating new edition pages for AIFEST.

## File Structure

Each edition should have:
- `data.json` - Edition configuration and content
- `data.ts` - TypeScript interface for the data
- `page.tsx` - The page component

## Media Organization

All media files should be organized in `/public/media/{year}/`:

```
/public/media/{year}/
├── gallery/          # Event photos
├── team/            # Team member photos
├── partners/        # Partner logos (if edition-specific)
├── decks/           # Presentation decks (PDFs and preview images)
├── reports/         # Impact reports
└── assets/          # Other assets (hero images, registration images, etc.)
```

## Shared Media

Media that applies across all editions should go in `/public/media/shared/`:

```
/public/media/shared/
├── fonts/           # Custom fonts
├── icons/           # Logo and icon files
├── about/           # About page hero images
├── posters/         # Get involved posters
├── resources/       # Resource page images
├── partners/        # Shared partner logos
└── why-attend/      # Why attend section images
```

## Creating a New Edition

1. **Copy the template folder:**
   ```bash
   cp -r web/src/app/editionTemplate web/src/app/{year}
   ```

2. **Create media folder:**
   ```bash
   mkdir -p web/public/media/{year}/{gallery,team,partners,decks,reports,assets}
   ```

3. **Update data.json:**
   - Change `year` and `slug` fields
   - Update all image paths to `/media/{year}/...`
   - Add edition-specific content

4. **Add media files:**
   - Place all edition-specific media in `/public/media/{year}/`
   - Use consistent naming conventions
   - For decks, include both PDF and preview PNG images

## Path Conventions

All paths in `data.json` should follow these patterns:

- **Edition-specific media:** `/media/{year}/gallery/image.jpg`
- **Shared media:** `/media/shared/icons/logo.png`
- **Deck previews:** `/media/{year}/decks/preview.png`
- **Reports:** `/media/{year}/reports/report.pdf`

## Example data.json Structure

```json
{
  "year": 2027,
  "slug": "2027",
  "published": true,
  "featured": false,
  "heroTitle": "AIFEST 2027",
  "heroSubtitle": "Your edition subtitle",
  "heroImage": "/media/2027/assets/hero.png",
  "registrationImage": "/media/2027/assets/registration.png",
  "registrationUrl": "https://...",
  "sponsorshipDeckUrl": "/media/2027/decks/sponsorship.pdf",
  "infoSessionDeckUrl": "/media/2027/decks/info-session.pdf",
  "impactReportUrl": "/media/2027/reports/report.pdf",
  "partners": [
    {
      "name": "Partner Name",
      "logo": "/media/shared/partners/partner.png"
    }
  ],
  "gallery": [],
  "team": [],
  "timeline": [],
  "faqs": []
}
```

## Notes

- Keep the app folder clean - only `data.json`, `data.ts`, and `page.tsx`
- No subfolders in the app edition directories
- All media goes in `/public/media/`
- Reuse shared assets when possible
- Include preview images for PDFs to improve performance
