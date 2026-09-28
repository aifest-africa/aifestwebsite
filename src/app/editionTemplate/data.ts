import { EditionContentProps } from "../../components/edition/EditionContent";

export const editionData: EditionContentProps = {
    heroTitle: "AIFEST EDITION TITLE",
    heroSubtitle: "Describe the core mission and focus of this edition here.",
    heroImage: "/media/2026/assets/aifest.png",
    gallery: [],
    registrationUrl: "#",
    sponsorshipDeckUrl: "/decks/sponsorship-placeholder.pdf",
    infoSessionDeckUrl: "/decks/info-placeholder.pdf",
    timeline: [
        {
            title: "Phase 1: Kickoff",
            date: "Month Day",
            color: "bg-blue-600",
            textColor: "text-white",
            badgeColor: "bg-white/20"
        }
    ],
    faqs: [
        {
            question: "How can I join?",
            answer: "Click the register button to get started."
        }
    ]
};
