import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputImage = join(__dirname, '../public/media/shared/icons/gdg.png');
const outputDir = join(__dirname, '../public');

// Sizes needed for various favicon requirements
const sizes = [
    { size: 16, name: 'favicon-16x16.png' },
    { size: 32, name: 'favicon-32x32.png' },
    { size: 48, name: 'favicon-48x48.png' },
    { size: 180, name: 'apple-touch-icon.png' },
    { size: 192, name: 'android-chrome-192x192.png' },
    { size: 512, name: 'android-chrome-512x512.png' },
];

async function generateFavicons() {
    console.log('Generating favicon files from:', inputImage);

    // Generate PNG files in various sizes
    for (const { size, name } of sizes) {
        const outputPath = join(outputDir, name);
        await sharp(inputImage)
            .resize(size, size, {
                fit: 'contain',
                background: { r: 0, g: 0, b: 0, alpha: 0 }
            })
            .png()
            .toFile(outputPath);
        console.log(`✓ Generated ${name} (${size}x${size})`);
    }

    // Generate favicon.ico (multi-size ICO file)
    // We'll create a 32x32 version for the .ico file
    const icoBuffer = await sharp(inputImage)
        .resize(32, 32, {
            fit: 'contain',
            background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png()
        .toBuffer();

    const icoPath = join(__dirname, '../src/app/favicon.ico');
    writeFileSync(icoPath, icoBuffer);
    console.log('✓ Generated favicon.ico (32x32)');

    console.log('\n✅ All favicon files generated successfully!');
}

generateFavicons().catch(console.error);
