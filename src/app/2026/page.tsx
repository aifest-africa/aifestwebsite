import { EditionContent } from "../../components/edition/EditionContent";
import { ProjectAreasMarquee } from "../../components/project-areas-marquee";
import { edition2026 } from "./data";

export default function Aifest2026Page() {
  return (
    <main className="relative overflow-hidden bg-white dark:bg-[#000d1a] min-h-screen transition-colors duration-500 pb-0">
      {/* Sitewide Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-5%] right-[-10%] w-[600px] h-[600px] bg-cyan-400/20 dark:bg-cyan-600/20 blur-[130px] rounded-full animate-pulse" />
        <div className="absolute top-[30%] left-[-15%] w-[800px] h-[800px] bg-blue-400/20 dark:bg-blue-600/20 blur-[130px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-[20%] right-[-5%] w-[500px] h-[500px] bg-purple-400/20 dark:bg-purple-600/20 blur-[130px] rounded-full animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <EditionContent
        heroTitle={edition2026.heroTitle}
        heroSubtitle={edition2026.heroSubtitle}
        heroImage={edition2026.heroImage}
        heroImages={edition2026.heroImages}
        editionYear={edition2026.year}
        gallery={edition2026.gallery}
        registrationImage={edition2026.registrationImage}
        registrationUrl={edition2026.registrationUrl}
        prototypeSubmissionUrl={edition2026.prototypeSubmissionUrl}
        photoGalleryUrl={edition2026.photoGalleryUrl}
        rawPhotosUrl={edition2026.rawPhotosUrl}
        sponsorshipDeckUrl={edition2026.sponsorshipDeckUrl}
        sponsorshipDeckPreview={edition2026.sponsorshipDeckPreview}
        infoSessionDeckUrl={edition2026.infoSessionDeckUrl}
        infoSessionDeckPreview={edition2026.infoSessionDeckPreview}
        impactReportUrl={edition2026.impactReportUrl}
        impactReportPreview={edition2026.impactReportPreview}
        timeline={edition2026.timeline}
        faqs={edition2026.faqs}
        venue={edition2026.venue}
        partners={edition2026.partners}
        winners={edition2026.winners}
        participatingUniversities={edition2026.participatingUniversities}
      />
      <ProjectAreasMarquee />
    </main>
  );
}
