import { EditionContent } from "../../components/edition/EditionContent";
import { VideoRecapSection } from "../../components/edition/video-recap-section";
import { edition2025 } from "./data";

export default function Aifest2025Page() {
    return (
        <main className="relative overflow-hidden bg-white dark:bg-[#000d1a] min-h-screen transition-colors duration-500 pb-0">
            {/* Sitewide Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[-5%] right-[-10%] w-[600px] h-[600px] bg-cyan-400/20 dark:bg-cyan-600/20 blur-[130px] rounded-full animate-pulse" />
                <div className="absolute top-[30%] left-[-15%] w-[800px] h-[800px] bg-blue-400/20 dark:bg-blue-600/20 blur-[130px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute bottom-[20%] right-[-5%] w-[500px] h-[500px] bg-purple-400/20 dark:bg-purple-600/20 blur-[130px] rounded-full animate-pulse" style={{ animationDelay: '4s' }} />
            </div>

            <EditionContent
                heroTitle={edition2025.heroTitle}
                heroSubtitle={edition2025.heroSubtitle}
                heroImage={edition2025.heroImage}
                heroImages={edition2025.heroImages}
                editionYear={edition2025.year}
                gallery={edition2025.gallery}
                registrationImage={edition2025.registrationImage}
                registrationUrl={edition2025.registrationUrl}
                sponsorshipDeckUrl={edition2025.sponsorshipDeckUrl}
                sponsorshipDeckPreview={edition2025.sponsorshipDeckPreview}
                sponsorshipDeckLabel="Hackathon Proposal"
                sponsorshipDeckDescription="The original Inter University Hackathon proposal."
                infoSessionDeckUrl={edition2025.infoSessionDeckUrl}
                infoSessionDeckPreview={edition2025.infoSessionDeckPreview}
                infoSessionDeckLabel="Event Slides"
                infoSessionDeckDescription="Inter U Hackathon 2025 presentation slides."
                impactReportUrl={edition2025.impactReportUrl}
                impactReportPreview={edition2025.impactReportPreview}
                timeline={edition2025.timeline}
                faqs={edition2025.faqs}
                partners={edition2025.partners}
                winners={edition2025.winners}
            />

            <VideoRecapSection />
        </main>
    );
}
