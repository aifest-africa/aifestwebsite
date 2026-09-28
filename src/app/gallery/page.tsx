'use client';

import { useState, useMemo } from 'react';
import { PhotoGallery } from "../../components/hero/photo-gallery-hero";
import InteractiveBentoGallery from "../../components/gallery/interactive-bento-gallery";
import { ProjectAreasMarquee } from "../../components/home/project-areas-marquee";
import { allEditions } from "../../lib/editions/registry";
import { ChevronDown } from "lucide-react";

// Static list of all 2025 bento images (from /media/2025/gallery/)
const GALLERY_2025_IMAGES = [
  'PXL_20250426_065508010~2.jpg',
  'PXL_20250426_093206098.jpg',
  'PXL_20250426_072120824.jpg',
  'PXL_20250426_072140203.PORTRAIT.jpg',
  'PXL_20250426_073249295.MP.jpg',
  'PXL_20250426_073301387.jpg',
  'PXL_20250426_074054203.jpg',
  'PXL_20250426_074057121.jpg',
  'PXL_20250426_075417356~2.jpg',
  'PXL_20250426_075430108.jpg',
  'PXL_20250426_081614224~2.jpg',
  'PXL_20250426_081618563.jpg',
  'PXL_20250426_081646851.jpg',
  'PXL_20250426_084724996.jpg',
  'PXL_20250426_084736900.jpg',
  'PXL_20250426_085151340.PORTRAIT.jpg',
  'PXL_20250426_085455925.MP~3.jpg',
  'PXL_20250426_090127574~2.jpg',
  'PXL_20250426_090131980.jpg',
  'PXL_20250426_090133265~2.jpg',
  'PXL_20250426_090144224.jpg',
  'PXL_20250426_090147967.jpg',
  'PXL_20250426_090158137.MP~2.jpg',
  'PXL_20250426_090204991.jpg',
  'PXL_20250426_090210158.MP.jpg',
  'PXL_20250426_091253395.jpg',
  'PXL_20250426_091359079.jpg',
  'PXL_20250426_091405655.jpg',
  'PXL_20250426_092641516.MP.jpg',
  'PXL_20250426_092655857.PORTRAIT.jpg',
  'PXL_20250426_111117270.jpg',
  'PXL_20250426_112913187.MP~2.jpg',
  'PXL_20250426_113355255.jpg',
  'PXL_20250426_113415029.jpg',
  'PXL_20250426_113425623.jpg',
  'PXL_20250426_113645855.jpg',
  'PXL_20250426_115316908.jpg',
  'PXL_20250426_115323193.MP.jpg',
  'PXL_20250426_115339164.jpg',
  'PXL_20250426_115920145.MP.jpg',
  'PXL_20250426_115941265.jpg',
  'PXL_20250426_120124759.jpg',
  'PXL_20250426_120128622.jpg',
  'PXL_20250426_120158103.jpg',
  'PXL_20250426_120205069.MP.jpg',
  'PXL_20250426_121357575.jpg',
  'PXL_20250426_121405025.MP.jpg',
  'PXL_20250426_121417017.MP.jpg',
  'PXL_20250426_122208686.jpg',
  'PXL_20250426_122538180.jpg',
  'PXL_20250426_122544856.jpg',
  'PXL_20250426_122547013.PORTRAIT.jpg',
  'PXL_20250426_125359551.PORTRAIT.jpg',
  'PXL_20250426_125410321.PORTRAIT.jpg',
  'PXL_20250426_125524977.PORTRAIT.ORIGINAL.jpg',
  'PXL_20250426_125530679.PORTRAIT.jpg',
  'PXL_20250426_125649633.PORTRAIT.ORIGINAL.jpg',
  'PXL_20250426_125651228.PORTRAIT.ORIGINAL.jpg',
  'PXL_20250426_125652839.PORTRAIT.ORIGINAL.jpg',
  'PXL_20250426_130131586.PORTRAIT.jpg',
  'PXL_20250426_130539804.jpg',
  'PXL_20250426_130603727.jpg',
  'PXL_20250426_130605993.jpg',
  'PXL_20250426_130609120.jpg',
  'PXL_20250426_130612649.jpg',
  'PXL_20250426_130618954.jpg',
  'PXL_20250426_130643454.jpg',
  'PXL_20250426_130645395.MP.jpg',
  'PXL_20250426_130650951.MP.jpg',
  'PXL_20250426_130652933.jpg',
  'PXL_20250426_132227524.jpg',
  'PXL_20250426_135225648.MP.jpg',
  'PXL_20250426_135230088.jpg',
  'PXL_20250426_135240842.jpg',
  'PXL_20250426_135246312.jpg',
  'PXL_20250426_135254308.jpg',
  'PXL_20250426_135255840.MP.jpg',
  'PXL_20250426_135259341.jpg',
  'PXL_20250426_135301354.jpg',
  'PXL_20250426_135302707.jpg',
  'PXL_20250426_135309151.PORTRAIT.jpg',
  'PXL_20250426_135314993.PORTRAIT.jpg',
  'PXL_20250426_135327835.PORTRAIT.jpg',
  'PXL_20250426_135331391.PORTRAIT.jpg',
  'PXL_20250426_135333953.PORTRAIT.jpg',
  'PXL_20250426_135340916.jpg',
  'PXL_20250426_135343790.jpg',
  'PXL_20250426_135347011.jpg',
  'PXL_20250426_135350044.jpg',
  'PXL_20250426_135358182.jpg',
  'PXL_20250426_135402313.jpg',
  'PXL_20250426_135408123.jpg',
  'PXL_20250426_135419722.jpg',
  'PXL_20250426_140255509.jpg',
  'PXL_20250426_140301163.jpg',
  'PXL_20250426_140302510.jpg',
  'PXL_20250426_142153014.jpg',
  'PXL_20250426_142411186.jpg',
  'PXL_20250426_142427450.jpg',
  'PXL_20250426_142538919.jpg',
  'PXL_20250426_142603852.jpg',
  'PXL_20250426_143128247.jpg',
  'PXL_20250426_143155406.jpg',
  'PXL_20250426_145225253.jpg',
  'PXL_20250426_145227276.jpg',
  'PXL_20250426_145232338.jpg',
  'PXL_20250426_145245533.jpg',
  'PXL_20250426_145256729.jpg',
  'PXL_20250426_145302446.jpg',
  'PXL_20250426_145307652.jpg',
  'PXL_20250426_145309603.jpg',
  'PXL_20250426_145316946.jpg',
  'PXL_20250426_145318393.jpg',
  'PXL_20250426_145335403.jpg',
  'PXL_20250426_145337876.jpg',
  'PXL_20250426_145346953.jpg',
  'PXL_20250426_145349381.jpg',
  'PXL_20250426_145420618.jpg',
  'PXL_20250426_145422551.jpg',
  'PXL_20250426_145429849.jpg',
  'PXL_20250426_145432453.jpg',
  'PXL_20250426_145433652.jpg',
  'PXL_20250426_145536609.jpg',
  'PXL_20250426_145545818.jpg',
  'PXL_20250426_145547720.jpg',
  'PXL_20250426_145559106.jpg',
  'PXL_20250426_145601002.jpg',
  'PXL_20250426_145606788.jpg',
  'PXL_20250426_145608434.jpg',
  'PXL_20250426_145617669.jpg',
  'PXL_20250426_145628633.jpg',
  'PXL_20250426_145630635.jpg',
  'PXL_20250426_145634773.jpg',
  'PXL_20250426_145639402.jpg',
  'PXL_20250426_145641604.jpg',
  'PXL_20250426_145649701.jpg',
  'PXL_20250426_145719894.jpg',
  'PXL_20250426_145733992.jpg',
  'PXL_20250426_145742722.jpg',
  'PXL_20250426_145758692.jpg',
  'PXL_20250426_145759834.jpg',
  'PXL_20250426_145919110.jpg',
  'PXL_20250426_145920786.jpg',
  'PXL_20250426_145922179.jpg',
  'PXL_20250426_145923409.jpg',
  'PXL_20250426_145925446.jpg',
  'PXL_20250426_145935916.jpg',
  'PXL_20250426_145939013.jpg',
  'PXL_20250426_145941045.jpg',
  'PXL_20250426_145942978.jpg',
  'PXL_20250426_145945208.jpg',
  'PXL_20250426_145947079.jpg',
  'PXL_20250426_145951115.jpg',
  'PXL_20250426_155155229.PORTRAIT.ORIGINAL~2.jpg',
  'PXL_20250426_155213969.PORTRAIT.jpg',
  'PXL_20250426_155335279.PORTRAIT.ORIGINAL.jpg',
  'PXL_20250426_155352319.jpg',
  'PXL_20250426_155404257.jpg',
  'PXL_20250426_155405147.jpg',
  'PXL_20250426_155407787.jpg',
  'PXL_20250426_155505870.jpg',
  'PXL_20250426_155509240.jpg',
  'PXL_20250426_155514475.PORTRAIT.jpg',
  'PXL_20250426_161049493.jpg',
  'PXL_20250426_161055824.jpg',
  'PXL_20250426_161058819.jpg',
  'WhatsApp Image 2025-12-19 at 8.48.07 AM.jpeg',
  'brocodes.png',
  'c.png',
  'e.png',
  'exhobi.png',
  'fv.png',
  'g.png',
  'gibert.png',
  'gierls.png',
  'group.png',
  'host.png',
  'j.png',
  'judges.png',
  'l.png',
  'linv.png',
  'mic.png',
  'mpame.png',
  'p.png',
  'people.png',
  'pp.png',
  'r.png',
  'sumaya.png',
  't.png',
  'tea.png',
  'team.png',
  'tepp.png',
  'tk.png',
  'trevor.png',
  'win.png',
  'winners.png',
];

function get2025BentoImages() {
  return GALLERY_2025_IMAGES.map((filename, index) => ({
    id: String(index),
    src: `/media/2025/gallery/${filename}`,
    caption: undefined,
    alt: `AIFEST 2025 - ${filename}`,
    sort_order: index,
  }));
}

export default function GalleryPage() {
  // Only show editions that actually have gallery images
  const editionsWithImages = useMemo(() => {
    return [...allEditions]
      .sort((a, b) => b.year - a.year)
      .filter(e => {
        if (e.year === 2025) return true; // 2025 always has images (filesystem)
        // For other years, check if gallery data exists
        return (e.gallery ?? []).length > 0;
      });
  }, []);

  const defaultYear = editionsWithImages[0]?.year ?? 2025;
  const [selectedYear, setSelectedYear] = useState<number>(defaultYear);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Top hero tiles: curated mix across editions (last two from 2026)
  const heroImages = useMemo(
    () => [
      {
        id: 'hero-0',
        src: '/media/2025/gallery/PXL_20250426_065508010~2.jpg',
        alt: 'AIFEST 2025 gallery',
        sort_order: 0,
      },
      {
        id: 'hero-1',
        src: '/media/2025/gallery/PXL_20250426_093206098.jpg',
        alt: 'AIFEST 2025 gallery',
        sort_order: 1,
      },
      {
        id: 'hero-2',
        src: '/media/2026/gallery/_DSC5912.JPG',
        alt: 'AIFEST 2026 gallery',
        sort_order: 2,
      },
      {
        id: 'hero-3',
        src: '/media/2026/gallery/_DSC5726.JPG',
        alt: 'AIFEST 2026 gallery',
        sort_order: 3,
      },
      {
        id: 'hero-4',
        src: '/media/2026/gallery/IMG_E0557.JPG',
        alt: 'AIFEST 2026 gallery',
        sort_order: 4,
      },
    ],
    []
  );

  // Bento grid images — changes with the selected year dropdown
  const bentoImages = useMemo(() => {
    if (selectedYear === 2025) return get2025BentoImages();
    // For future editions, read from their gallery data
    const edition = allEditions.find(e => e.year === selectedYear);
    if (!edition?.gallery) return [];
    return edition.gallery
      .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
      .map((img, index) => ({
        id: String(img.id ?? index),
        src: img.image_path || '',
        caption: img.caption ?? undefined,
        alt: img.alt ?? `AIFEST ${selectedYear} gallery`,
        sort_order: img.sort_order ?? index,
      }));
  }, [selectedYear]);

  return (
    <main className="relative overflow-hidden bg-transparent min-h-screen transition-colors duration-500 pb-24">
      {/* Unified Gradient Background and Grid */}
      <div className="absolute inset-0 bg-linear-to-br from-white via-blue-50/50 to-white dark:from-[#000d1a] dark:via-[#001224] dark:to-[#000d1a] -z-10" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] dark:opacity-[0.05] -z-10" />

      {/* ─── STATIC HERO SECTION (never changes with dropdown) ─── */}
      <div className="pt-24 sm:pt-28 lg:pt-32 pb-0 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {heroImages.length >= 3 ? (
            <PhotoGallery images={heroImages} />
          ) : (
            <div className="text-center py-20">
              <h1
                className="text-4xl md:text-6xl font-bold bg-linear-to-r from-[#001F3F] via-[#00D9FF] to-[#001F3F] bg-clip-text text-transparent dark:from-white dark:via-[#00D9FF] dark:to-white"
                style={{ fontFamily: "var(--font-blanka)" }}
              >
                Gallery
              </h1>
              <p className="mt-4 text-lg text-[#001F3F]/70 dark:text-white/70 font-semibold">
                Moments, motion, and the energy of AIFEST
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ─── EDITION FILTER DROPDOWN (only editions with images) ─── */}
      {editionsWithImages.length > 1 && (
        <div className="pt-8 pb-4 px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="max-w-7xl mx-auto flex justify-center">
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-6 py-3 rounded-full font-bold bg-[#00D9FF] text-[#001F3F] shadow-lg transition-all hover:bg-[#00D9FF]/90 min-w-[200px] justify-between"
              >
                <span>{selectedYear} Gallery</span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsDropdownOpen(false)}
                  />
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#001F3F] border border-black/8 dark:border-white/12 rounded-2xl shadow-xl overflow-hidden z-20">
                    {editionsWithImages.map((edition) => (
                      <button
                        key={edition.year}
                        onClick={() => {
                          setSelectedYear(edition.year);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-6 py-3 font-semibold transition-colors ${selectedYear === edition.year
                            ? 'bg-black/5 dark:bg-white/10 text-[#00D9FF]'
                            : 'text-foreground/80 hover:bg-black/5 dark:hover:bg-white/5'
                          }`}
                      >
                        {edition.year}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─── BENTO GALLERY GRID (changes with dropdown) ─── */}
      <div className="pb-20 pt-2 relative z-10">
        {bentoImages.length > 0 ? (
          <InteractiveBentoGallery mediaItems={bentoImages} />
        ) : null}
      </div>

      <ProjectAreasMarquee />
    </main>
  );
}
