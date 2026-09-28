"use client";

import { useState, useMemo } from "react";
import { Container, Section, Badge } from "@/lib/ui";
import { VerticalCutReveal } from "../../components/ui/vertical-cut-reveal";
import { TeamFilterSidebar } from "../../components/teams/team-filter-sidebar";
import { TeamGrid } from "../../components/teams/team-grid";
import { SpeakerModal } from "../../components/teams/speaker-modal";
import { TeamMemberCard } from "../../components/teams/team-member-card";
import { allEditions, getTeamMembers } from "../../lib/content";
import type { TeamMember } from "../../lib/editions/types";

export default function TeamPage() {
    // Only show published editions
    const availableEditions = useMemo(() => {
        return allEditions
            .filter(e => e.published)
            .map(e => ({ year: e.year, title: e.title }));
    }, []);

    const defaultYear = availableEditions.length > 0 ? availableEditions[0].year : null;

    const [selectedEdition, setSelectedEdition] = useState<number | null>(defaultYear);
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [selectedSpeaker, setSelectedSpeaker] = useState<TeamMember | null>(null);

    // Get members from registry synchronously
    const allMembers = useMemo(() => getTeamMembers(), []);

    const teamMembers = useMemo(() => {
        return allMembers.filter(m => {
            // Global board members (editionYear === "Global") should always be visible
            if (m.editionYear === "Global") {
                // Only filter by category for global members
                if (selectedCategory !== "all" && m.category !== selectedCategory) return false;
                return true;
            }

            // For edition-specific members, filter by edition and category
            if (selectedEdition && m.editionYear !== selectedEdition) return false;
            if (selectedCategory !== "all" && m.category !== selectedCategory) return false;
            return true;
        });
    }, [allMembers, selectedEdition, selectedCategory]);

    // Separate "board" (only board members) vs regular members for grid display
    const boardMembers = useMemo(() => teamMembers.filter(m => m.category === 'board'), [teamMembers]);
    const filteredGridMembers = useMemo(() => teamMembers.filter(m => m.category !== 'board'), [teamMembers]);

    // Show empty state if no members
    const hasMembers = teamMembers.length > 0;

    return (
        <main className="overflow-hidden bg-transparent transition-colors duration-500 pb-12 relative pt-24 md:pt-32">
            {/* Unified Gradient Background */}
            <div className="absolute inset-0 bg-linear-to-br from-white via-blue-50/50 to-white dark:from-[#000d1a] dark:via-[#001224] dark:to-[#000d1a] -z-10" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] dark:opacity-[0.05] -z-10" />

            {/* Decorative Blobs removed to eliminate glow */}

            <Section className="relative py-6! md:py-10! overflow-hidden bg-transparent">
                <Container>
                    {/* Header */}
                    <div className="max-w-4xl mx-auto text-center space-y-3 md:space-y-4 mb-12">
                        <div className="flex justify-center">
                            <Badge className="border-0 text-[#001F3F] bg-[#00D9FF] px-4 py-1.5 font-bold tracking-[0.2em] uppercase mb-2 shadow-sm">
                                Community
                            </Badge>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-[#001F3F] dark:text-white leading-tight mb-6" style={{ fontFamily: "Blanka, sans-serif" }}>
                            <VerticalCutReveal splitBy="words">Meet the Team</VerticalCutReveal>
                        </h1>
                        <p className="text-lg md:text-xl text-[#001F3F]/70 dark:text-white/70 leading-relaxed max-w-3xl mx-auto font-medium">
                            The visionary minds and dedicated organisers behind AIFEST, working together to shape the future of AI in Uganda and across Africa.
                        </p>
                    </div>

                    {/* Leadership Board Section */}
                    {boardMembers.length > 0 && (selectedCategory === 'all' || selectedCategory === 'board') && (
                        <div className="mb-20">
                            <div className="text-center mb-10">
                                <h2 className="text-3xl font-bold text-[#001F3F] dark:text-white mb-4" style={{ fontFamily: "Blanka, sans-serif" }}>
                                    Leadership Board
                                </h2>
                                <div className="w-24 h-1 bg-[#00D9FF] mx-auto rounded-full" />
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
                                {boardMembers.map((member, idx) => (
                                    <TeamGridItem
                                        key={member.id}
                                        member={member}
                                        index={idx}
                                        onMemberClick={setSelectedSpeaker}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Two-Column Layout for Editions/Categories */}
                    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-12">
                        {/* Left: Filter Sidebar */}
                        <TeamFilterSidebar
                            editions={availableEditions}
                            selectedEdition={selectedEdition}
                            selectedCategory={selectedCategory}
                            onEditionChange={setSelectedEdition}
                            onCategoryChange={setSelectedCategory}
                        />

                        {/* Right: Team Grid */}
                        <div>
                            {filteredGridMembers.length > 0 ? (
                                <TeamGrid
                                    members={filteredGridMembers}
                                    onMemberClick={setSelectedSpeaker}
                                />
                            ) : (
                                <div className="text-center py-20 px-4 bg-white/50 dark:bg-[#001224]/50 rounded-3xl border border-[#00D9FF]/20">
                                    <h3 className="text-sm md:text-base font-bold text-[#00D9FF] uppercase tracking-[0.3em] mb-4">
                                        THE MINDS BEHIND THE MAGIC
                                    </h3>
                                    <h2
                                        className="text-4xl md:text-5xl lg:text-6xl font-bold bg-linear-to-r from-[#001F3F] via-[#00D9FF] to-[#001F3F] bg-clip-text text-transparent dark:from-white dark:via-[#00D9FF] dark:to-white leading-tight pb-2"
                                        style={{ fontFamily: "var(--font-blanka)" }}
                                    >
                                        MEET THE INNOVATORS
                                    </h2>
                                    <p className="mt-6 text-lg text-[#001F3F]/70 dark:text-white/70 font-medium max-w-2xl mx-auto leading-relaxed">
                                        Team member profiles {selectedEdition ? `for the ${selectedEdition} edition ` : ""}will be announced soon. Stay tuned!
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Speaker Modal */}
            <SpeakerModal
                speaker={selectedSpeaker}
                onClose={() => setSelectedSpeaker(null)}
            />
        </main>
    );
}

// Internal component for Board member display to reuse card logic
function TeamGridItem({ member, index, onMemberClick }: { member: TeamMember, index: number, onMemberClick: (m: TeamMember) => void }) {
    return <TeamMemberCard member={member} index={index} onClick={() => onMemberClick(member)} />;
}
