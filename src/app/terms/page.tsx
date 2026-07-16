import type { Metadata } from "next";
import { LegalShell } from "@/components/legal-shell";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "WakeApp's Terms of Use.",
};

export default function TermsPage() {
  return (
    <LegalShell>
      <h1>Terms of Use</h1>
      <p className="prose-legal-meta">Last updated: June 2026</p>

      <p>
        These Terms of Use govern your access to and use of WakeApp, operated
        by <strong>Indy François</strong> (individual developer), 222 chemin
        de la Brague, 06410 Biot, France (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). For any
        question, contact{" "}
        <a href="mailto:contact@the-wakeapp.com">contact@the-wakeapp.com</a>.
      </p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By downloading, installing, or using WakeApp, you agree to be bound
        by these Terms of Use and by our Privacy Policy. If you do not
        agree, please do not use the app.
      </p>

      <h2>2. Eligibility</h2>
      <p>
        WakeApp is intended for users aged 13 and older. By using the app,
        you confirm that you are at least 13 years old.
      </p>

      <h2>3. Use of the App</h2>
      <p>
        WakeApp is intended for personal productivity, focus, and digital
        wellbeing use. You agree to use the app only for lawful purposes and
        in a manner consistent with these Terms. You may not use the app to
        harm others, violate applicable laws, or misuse the app&apos;s features.
      </p>

      <h2>4. Accounts</h2>
      <p>
        You are responsible for maintaining the confidentiality of your
        account credentials. You agree to notify us immediately of any
        unauthorized use of your account. We reserve the right to suspend or
        terminate accounts that violate these Terms.
      </p>

      <h2>5. Premium Subscriptions</h2>
      <p>
        Some features of WakeApp require an optional auto-renewable Premium
        subscription:
      </p>
      <ul>
        <li>
          The subscription price is the amount displayed in the app at the
          time of purchase (a monthly plan, with an annual plan where
          available).
        </li>
        <li>
          Payment is charged to your Apple ID account upon confirmation of
          purchase.
        </li>
        <li>
          The subscription automatically renews at the same price unless it
          is cancelled at least 24 hours before the end of the current
          period.
        </li>
        <li>
          You can manage or cancel your subscription at any time in your
          Apple account settings.
        </li>
        <li>
          Deleting the app or your WakeApp account does not automatically
          cancel your subscription; you must cancel it through your Apple
          account.
        </li>
      </ul>

      <h2>6. Screen Time and Focus Features</h2>
      <p>
        On iPhone, WakeApp may use Apple&apos;s Screen Time, Family Controls, and
        related system frameworks to provide focus and digital wellbeing
        features. These features are entirely user-initiated and are not
        used for surveillance or monitoring beyond what you explicitly
        configure.
      </p>

      <h2>7. Intellectual Property</h2>
      <p>
        All content, design, and functionality within WakeApp are the
        property of WakeApp and its operator, or of their respective owners.
        You may not copy, reproduce, modify, or distribute any part of the
        app without prior written permission.
      </p>

      <h2>8. Disclaimer of Warranties</h2>
      <p>
        WakeApp is provided &quot;as is&quot; and &quot;as available&quot; without warranties of
        any kind. We do not warrant that the app will be uninterrupted,
        error-free, or free of harmful components. Use of the app is at your
        own risk.
      </p>

      <h2>9. Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by applicable law, WakeApp and its
        operator shall not be liable for any indirect, incidental, special,
        consequential, or punitive damages arising from your use of, or
        inability to use, the app. Nothing in these Terms limits any rights
        you may have as a consumer under mandatory applicable law.
      </p>

      <h2>10. Governing Law</h2>
      <p>
        These Terms are governed by the laws of France, without regard to
        its conflict-of-laws principles. Mandatory consumer-protection
        rights in your country of residence continue to apply.
      </p>

      <h2>11. Changes to These Terms</h2>
      <p>
        We may update these Terms from time to time. Continued use of the
        app after changes constitutes your acceptance of the updated Terms.
        We will update the &quot;Last updated&quot; date when changes are made.
      </p>

      <h2>12. Contact</h2>
      <p>
        For questions about these Terms, contact:{" "}
        <a href="mailto:contact@the-wakeapp.com">contact@the-wakeapp.com</a>
      </p>
      <p>Indy François — 222 chemin de la Brague, 06410 Biot, France.</p>
    </LegalShell>
  );
}
