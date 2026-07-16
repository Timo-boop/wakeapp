import type { Metadata } from "next";
import { LegalShell } from "@/components/legal-shell";

export const metadata: Metadata = {
  title: "Support",
  description: "Get help with WakeApp — account, subscription, and privacy.",
};

export default function SupportPage() {
  return (
    <LegalShell>
      <h1>WakeApp Support</h1>
      <p>Need a hand? We&apos;re here.</p>

      <p>
        For any question, bug report, feedback, or request — account,
        subscription, privacy, or deletion — email us at{" "}
        <a href="mailto:contact@the-wakeapp.com">contact@the-wakeapp.com</a>.
        We aim to reply within a few business days.
      </p>

      <h2>Quick answers</h2>
      <ul>
        <li>
          <strong>Manage or cancel your subscription:</strong> open the
          Settings app on your iPhone → tap your name → Subscriptions →
          WakeApp. Deleting the app does not cancel a subscription.
        </li>
        <li>
          <strong>Delete your account:</strong> in the app, Profile →
          Settings → Delete Account. Or see our{" "}
          <a href="/account-deletion/">Account Deletion page</a>.
        </li>
        <li>
          <strong>Privacy questions:</strong> see our{" "}
          <a href="/privacy/">Privacy Policy</a>, or email us.
        </li>
      </ul>

      <p>
        WakeApp is operated by Indy François (entreprise individuelle),
        France. Contact:{" "}
        <a href="mailto:contact@the-wakeapp.com">contact@the-wakeapp.com</a>.
      </p>
    </LegalShell>
  );
}
