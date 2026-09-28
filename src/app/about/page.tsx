import { Container, Section, Badge } from "@/lib/ui";
import { AboutHero } from "./about-hero";
import { VerticalCutReveal } from "../../components/ui/vertical-cut-reveal";
import { AnimatedPillars, AnimatedSDGs } from "./animated-sections";
import {
  HeartPulse,
  GraduationCap,
  Leaf,
  Sprout,
  Target,
  Users,
  Lightbulb,
  Globe
} from "lucide-react";
import { WhyAttendCarousel } from "./why-attend-carousel";
import { ProjectAreasMarquee } from "../../components/home/project-areas-marquee";
import {
  getWhyAttendItems,
} from "../../lib/content";


export default function AboutPage() {
  const whyAttendItems = getWhyAttendItems();

  const heroImageUrls = [
    "/media/shared/about/hero-1.jpg",
    "/media/shared/about/hero-2.jpg",
    "/media/shared/about/hero-3.png",
    "/media/shared/about/hero-4.jpg",
    "/media/shared/about/hero-5.png"
  ];

  const objectives = [
    {
      title: "Cross-Campus Collaboration",
      description: "Uniting Uganda's brightest minds across 29+ universities to foster a multidisciplinary approach to AI.",
      icon: <Users className="w-6 h-6 text-white" />,
      bgClass: "bg-[#4285F4]/95", // Bright Blue (Transparent)
    },
    {
      title: "Mentorship & Skills",
      description: "Bridging the gap between theoretical computer science and practical industry application with world-class mentors.",
      icon: <Lightbulb className="w-6 h-6 text-white" />,
      bgClass: "bg-[#FBBC04]/95", // Bright Yellow (Transparent)
    },
    {
      title: "AI for Uganda’s SDGs",
      description: "Harnessing the power of AI to accelerate progress in healthcare, climate action, and education.",
      icon: <Target className="w-6 h-6 text-white" />,
      bgClass: "bg-[#EA4335]/95", // Bright Red (Transparent)
    },
    {
      title: "Championing Diversity",
      description: "Ensuring that the future of AI is built by everyone, for everyone, with a strong focus on gender inclusion.",
      icon: <Globe className="w-6 h-6 text-white" />,
      bgClass: "bg-[#34A853]/95", // Bright Green (Transparent)
    },
  ];

  const sdgs = [
    {
      title: "Healthcare",
      description: "Empowering medical professionals with AI diagnostics to reach remote communities.",
      icon: <HeartPulse className="w-8 h-8 md:w-10 md:h-10 text-[#EA4335]" />,
      bgClass: "bg-slate-50 dark:bg-white/5",
    },
    {
      title: "Education",
      description: "Personalised learning experiences that adapt to every student's pace and language.",
      icon: <GraduationCap className="w-8 h-8 md:w-10 md:h-10 text-[#4285F4]" />,
      bgClass: "bg-slate-50 dark:bg-white/5",
    },
    {
      title: "Climate Action",
      description: "Using data-driven insights to mitigate climate change and protect our biodiversity.",
      icon: <Leaf className="w-8 h-8 md:w-10 md:h-10 text-[#34A853]" />,
      bgClass: "bg-slate-50 dark:bg-white/5",
    },
    {
      title: "Agriculture",
      description: "Optimizing yields and predicting soil health to ensure national food security.",
      icon: <Sprout className="w-8 h-8 md:w-10 md:h-10 text-[#FBBC04]" />,
      bgClass: "bg-slate-50 dark:bg-white/5",
    },
  ];

  return (
    <main className="overflow-hidden bg-transparent transition-colors duration-500 pb-12 relative">
      {/* Unified Gradient Background */}
      <div className="absolute inset-0 bg-linear-to-br from-white via-blue-50/50 to-white dark:from-[#000d1a] dark:via-[#001224] dark:to-[#000d1a] -z-10" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] dark:opacity-[0.05] -z-10" />

      <div className="relative">
        <AboutHero
          title="About AIFEST"
          description="Empowering the next generation of AI innovators in Africa."
          imageUrls={heroImageUrls}
        />
      </div>

      <Section className="relative !py-6 md:!py-10 overflow-hidden bg-transparent">
        <Container>
          <div className="max-w-4xl mx-auto text-center space-y-3 md:space-y-4">
            <div className="flex justify-center">
              <Badge className="border-0 text-[#001F3F] bg-[#00D9FF] px-4 py-1.5 font-bold tracking-[0.2em] uppercase mb-2 shadow-sm">The Reality Check</Badge>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-[#001F3F] dark:text-white leading-tight" style={{ fontFamily: "Blanka, sans-serif" }}>
              <VerticalCutReveal splitBy="words">Africa contributes &lt; 5% of global AI research.</VerticalCutReveal>
            </h2>
            <p className="text-lg md:text-xl text-[#EA4335] font-bold italic">
              This disparity isn&apos;t just a statistic; it&apos;s a barrier to the continent&apos;s development.
            </p>
            <p className="text-base md:text-lg text-[#001F3F]/70 dark:text-white/70 leading-relaxed max-w-3xl mx-auto font-medium">
              AIFEST was founded to bridge this gap, democratizing access to cutting-edge AI knowledge and fostering an ecosystem where African developers don&apos;t just consume technology, they create it.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="relative !py-6 md:!py-10 overflow-hidden bg-transparent">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-6 md:mb-8">
            <h2 className="text-3xl md:text-5xl font-bold text-[#001F3F] dark:text-white mb-4" style={{ fontFamily: "Blanka, sans-serif" }}>
              Why Attend?
            </h2>
            <div className="h-1 w-16 bg-[#00D9FF] mx-auto rounded-full" />
          </div>
          <WhyAttendCarousel items={whyAttendItems} />
        </Container>
      </Section>

      <Section className="relative py-6! md:py-10! overflow-hidden bg-transparent">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-6 md:mb-8">
            <Badge className="mb-4 border-0 text-[#001F3F] bg-[#00D9FF] font-bold uppercase tracking-[0.2em] px-6 py-2 shadow-sm">Strategic Vision</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-[#001F3F] dark:text-white mb-4" style={{ fontFamily: "Blanka, sans-serif" }}>
              The Four Pillars
            </h2>
          </div>

          <AnimatedPillars objectives={objectives} />

        </Container>
      </Section>

      <Section className="relative py-6! md:py-10! mb-8 overflow-hidden bg-transparent">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-6 md:mb-8">
            <Badge className="mb-4 border-0 text-[#001F3F] bg-[#00D9FF] font-bold uppercase tracking-[0.2em] px-6 py-2 shadow-sm">Global Impact</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-[#001F3F] dark:text-white mb-6" style={{ fontFamily: "Blanka, sans-serif" }}>
              Accelerating the SDGs
            </h2>
            <p className="text-[#001F3F]/80 dark:text-white/80 text-lg md:text-xl font-medium leading-relaxed">
              We focus on high-impact areas where AI can accelerate Uganda&apos;s progress toward the <span className="text-[#FBBC04]">Sustainable Development Goals.</span>
            </p>
          </div>

          <AnimatedSDGs sdgs={sdgs} />

        </Container>
      </Section>
      <ProjectAreasMarquee />
    </main>
  );
}
