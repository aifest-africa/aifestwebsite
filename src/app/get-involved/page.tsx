import { PageHero } from "../../components/hero/page-hero";
import { PartnershipTiers } from "../../components/partners/partnership-tiers";
import { ContactDetails } from "../../components/home/contact-details";

export default function GetInvolvedPage() {
  return (
    <main className="relative overflow-hidden bg-white dark:bg-[#000d1a] min-h-screen transition-colors duration-500 pb-24">
      <PageHero
        title="Get Involved"
        subtitle="Partner with us as we prepare for AIFEST 2027"
        variant="split"
        links={[
          { label: "Partnership Tiers", href: "#partnership" },
          { label: "Contact", href: "#contact" },
        ]}
      />

      <PartnershipTiers />

      <div id="contact">
        <ContactDetails socials={[]} />
      </div>
    </main>
  );
}
