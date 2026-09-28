import Link from "next/link";
import { ImpactHero } from "../../components/hero/impact-hero";
import { EditionCardExpanded } from "../../components/edition/edition-card-expanded";
import { ProjectAreasMarquee } from "../../components/home/project-areas-marquee";
import { getSiteSettings, allEditions } from "../../lib/content";

export const metadata = {
  title: "Past Editions — AIFEST",
  description: "Explore the history and achievements of AIFEST across the years",
};

export default function PastEditionsPage() {
  const settings = getSiteSettings();
  const pastEditions = allEditions.filter(e => !e.featured && e.published);

  // Calculate aggregates for Hero
  const totalPrizeMoney = pastEditions.reduce((acc, e) => acc + (e.statistics?.prizePool ?? 0), 0);
  const totalParticipants = pastEditions.reduce((acc, e) => acc + (e.statistics?.participants ?? 0), 0);
  const totalProjects = pastEditions.reduce((acc, e) => acc + (e.statistics?.projects ?? 0), 0);

  return (
    <main className="relative overflow-hidden bg-white dark:bg-[#000d1a] min-h-screen transition-colors duration-500 pb-24">
      {/* Sitewide Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-blue-400/20 blur-[130px] rounded-full animate-pulse" />
        <div className="absolute top-[40%] right-[-10%] w-[700px] h-[700px] bg-purple-400/20 blur-[130px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-[10%] left-[20%] w-[500px] h-[500px] bg-cyan-400/20 blur-[130px] rounded-full animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* New Impact Hero */}
      <ImpactHero
        totalPrizeMoney={totalPrizeMoney}
        totalParticipants={totalParticipants}
        totalProjects={totalProjects}
      />

      {/* Editions Timeline */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#00D9FF]/5 to-transparent dark:via-[#00D9FF]/10 -z-10" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-[0.02] dark:opacity-[0.05] -z-10" />

        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 relative">
            <h2 className="text-3xl md:text-5xl font-bold text-[#001F3F] dark:text-white mb-4" style={{ fontFamily: "Blanka, sans-serif" }}>
              Past Summaries
            </h2>
            <div className="h-1 w-24 bg-[#00D9FF] mx-auto rounded-full" />
          </div>

          <div className="space-y-12">
            {pastEditions.map((edition) => (
              <EditionCardExpanded key={edition.slug} edition={edition} />
            ))}
          </div>


          {/* Call to Action */}
          {settings.registration_enabled && (
            <div className="mt-32 text-center relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 blur-[100px] -z-10" />
              <h3 className="text-3xl md:text-4xl font-bold text-[#001F3F] dark:text-white mb-8" style={{ fontFamily: "Blanka, sans-serif" }}>
                Ready to make an impact?
              </h3>
              <Link
                href="https://gdg.community.dev/events/details/google-gdg-on-campus-makerere-university-kampala-uganda-presents-aifest-2026-inter_university-hackathon/"
                className="inline-block px-10 py-5 rounded-full bg-[#001F3F] dark:bg-white text-white dark:text-[#001F3F] font-bold hover:bg-[#001F3F]/90 dark:hover:bg-white/90 transition-all shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1 text-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                {settings.registration_label || "Join the Next Edition"}
              </Link>
            </div>
          )}
        </div>
      </div>
      <ProjectAreasMarquee />
    </main>
  );
}
