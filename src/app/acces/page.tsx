import type { Metadata } from "next";
import { PartnerAccess } from "@/components/sections/partner-access";

export const metadata: Metadata = {
  title: "Accès offert",
  description: "Active l'accès WakeApp offert par ton établissement.",
  // Reached through a school's link or QR code, never through search.
  robots: { index: false, follow: false },
};

export default function AccessPage() {
  return <PartnerAccess />;
}
