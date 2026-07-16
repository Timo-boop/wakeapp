import type { Metadata } from "next";
import { LegalShell } from "@/components/legal-shell";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "WakeApp's Privacy Policy — what data we collect, why, and your rights.",
};

export default function PrivacyPage() {
  return (
    <LegalShell>
      <h1>Privacy Policy</h1>
      <p className="prose-legal-meta">Last updated: June 2026</p>

      <h2>Summary</h2>
      <p>
        WakeApp uses personal data only as needed to operate the app, manage
        accounts, sync your settings and productivity data, provide focus and
        restriction features, and manage subscriptions. WakeApp does not sell
        personal data and does not use app data for targeted advertising.
      </p>
      <p>
        WakeApp is operated by <strong>Indy François</strong> (individual
        developer), 222 chemin de la Brague, 06410 Biot, France. For any
        privacy question or request, contact{" "}
        <a href="mailto:contact@the-wakeapp.com">contact@the-wakeapp.com</a>.
      </p>

      <h2>1. What WakeApp Does</h2>
      <p>
        WakeApp helps users manage tasks, habits, notes, calendars, and focus
        sessions; configure focus routines, schedules, and restrictions; on
        iPhone, use Apple&apos;s Screen Time / Family Controls frameworks to
        select apps and websites for restriction; and manage Premium access
        and subscriptions where applicable.
      </p>

      <h2>2. Information We Process</h2>
      <ul>
        <li>
          <strong>Account Information:</strong> email address, display name,
          internal account identifier, authentication status.
        </li>
        <li>
          <strong>Authentication Information:</strong> login credentials,
          Sign in with Apple data if you choose it, tokens and session
          information.
        </li>
        <li>
          <strong>App Settings and Preferences:</strong> language, theme,
          notification preferences, onboarding selections, focus and
          productivity settings.
        </li>
        <li>
          <strong>Productivity and App Content:</strong> tasks, habits and
          completions, notes, calendar records, focus sessions, goals and
          personal productivity records.
        </li>
        <li>
          <strong>Blocking and Digital Wellbeing Configuration:</strong>{" "}
          selected apps or categories to restrict, selected websites or
          domains, schedules, planned pauses, time windows, and daily limits.
        </li>
        <li>
          <strong>Subscription and Billing Information:</strong> Premium
          entitlement status, subscription state, product identifiers,
          purchase and restoration status.
        </li>
        <li>
          <strong>Friend Connections (if used):</strong> connections you
          create with other users, and the display name, rank, streaks and
          scores shared through the leaderboard.
        </li>
        <li>
          <strong>Profile Media (optional):</strong> a profile picture or
          images you add to notes, if you choose to add them.
        </li>
        <li>
          <strong>Technical and Security Information:</strong> service logs,
          error and diagnostics information, metadata for synchronization,
          fraud prevention, and service reliability.
        </li>
      </ul>

      <h2>3. How We Use Information</h2>
      <p>
        We use information only for legitimate product and operational
        purposes, including to: create and manage your account; authenticate
        you and maintain secure sessions; provide app functionality you
        request; sync your settings and records; provide focus, planning, and
        restriction features; calculate or display progress, history, and
        insights; activate, restore, and verify Premium access; maintain
        platform security; diagnose failures and prevent abuse; comply with
        legal obligations; and respond to support requests.
      </p>
      <p>We do not use your data for targeted advertising in WakeApp.</p>

      <h2>4. Apple Screen Time / Family Controls on iPhone</h2>
      <p>
        On iPhone, WakeApp may use Apple&apos;s official Family Controls,
        ManagedSettings, and DeviceActivity frameworks to support app and
        website restriction features. These features are initiated by the
        user, limited to the app&apos;s focus and digital wellbeing use cases, and
        implemented using Apple&apos;s intended system frameworks. Screen Time
        data stays on your device through Apple&apos;s frameworks; it is not
        collected by us, transmitted to our servers, or used for hidden
        monitoring or to obtain device control beyond what is necessary for
        the feature set.
      </p>

      <h2>5. Legal Bases for Processing</h2>
      <p>
        Where applicable law requires a legal basis, we rely on: performance
        of a contract (providing the app and requested features); legitimate
        interests (service security, fraud prevention, debugging, and product
        reliability); your consent (where a feature depends on your optional
        choice); and compliance with legal obligations.
      </p>

      <h2>6. Third Parties and Service Providers</h2>
      <ul>
        <li>
          <strong>Supabase</strong> — account infrastructure, authentication,
          database services, and cloud synchronization. Data is hosted in the
          European Union (Frankfurt).
        </li>
        <li>
          <strong>RevenueCat</strong> — subscription infrastructure and
          entitlement management.
        </li>
        <li>
          <strong>Apple</strong> — App Store purchases, platform billing,
          Sign in with Apple, system APIs, Screen Time / Family Controls,
          notifications, widgets, and related system-level capabilities.
        </li>
        <li>
          <strong>Resend</strong> — transactional email delivery (for
          example, account confirmation and security emails).
        </li>
      </ul>

      <h2>7. Friends and Leaderboard</h2>
      <p>
        If you choose to connect with other users or appear on a leaderboard,
        your display name, rank, streaks and scores may be visible to the
        people you are connected with. Connections are created by invitation
        inside the app — WakeApp does <strong>not</strong> access your
        device&apos;s address book or contacts. You can remove a connection at any
        time in the app.
      </p>

      <h2>8. How Information May Be Shared</h2>
      <p>
        We may share information with service providers that help us operate
        the app; with platform providers such as Apple when necessary for
        purchases and platform functionality; with authentication providers
        if you choose a third-party sign-in method; if required by law or
        legal process; to protect the rights, security, safety, or integrity
        of WakeApp; or as part of a merger, acquisition, or similar business
        transaction.
      </p>
      <p>We do not sell personal information to data brokers.</p>

      <h2>9. Data Retention</h2>
      <p>
        We retain information for as long as reasonably necessary to provide
        the service, maintain your account, preserve security and service
        integrity, resolve disputes, and comply with legal, tax, accounting,
        or regulatory obligations. Retention periods may vary depending on
        the type of data and the reason it is processed.
      </p>

      <h2>10. Account Deletion</h2>
      <p>
        You can initiate account deletion from within the app (Profile →
        Settings → Delete Account) or by emailing{" "}
        <a href="mailto:contact@the-wakeapp.com">contact@the-wakeapp.com</a>.
        When your account is deleted, your account record is removed from
        our systems and associated app data is permanently erased, normally
        within 7 days, unless we are legally required to retain certain
        information.
      </p>
      <p>
        If you have an auto-renewable subscription purchased through Apple,
        deleting your WakeApp account does not automatically cancel Apple
        billing. You must manage or cancel your subscription through your
        Apple account.
      </p>

      <h2>11. Security</h2>
      <p>
        We use reasonable technical and organizational safeguards designed to
        protect information against unauthorized access, disclosure,
        alteration, misuse, and destruction. These safeguards include
        authentication controls, access restrictions, database-level
        protections, logging and monitoring, secure service configuration
        practices, and least-privilege access where appropriate.
      </p>
      <p>
        No method of transmission or storage is completely secure, and we
        cannot guarantee absolute security.
      </p>

      <h2>12. International Transfers</h2>
      <p>
        Your information may be processed in countries other than the one in
        which you live, including countries where our service providers
        operate. Where required by law, we rely on appropriate safeguards for
        international transfers.
      </p>

      <h2>13. Children</h2>
      <p>
        WakeApp is intended for users aged 13 and older. We do not knowingly
        collect personal data from children under 13. If you believe a child
        under 13 has provided personal data, contact{" "}
        <a href="mailto:contact@the-wakeapp.com">contact@the-wakeapp.com</a>{" "}
        and we will review and delete it.
      </p>

      <h2>14. Your Rights and Choices</h2>
      <p>
        Depending on your location and applicable law, you may have rights
        to: access your personal data; correct inaccurate data; request
        deletion; request restriction of certain processing; object to
        certain processing; and request data portability where applicable.
      </p>
      <p>
        You can manage many privacy choices directly through WakeApp
        settings, in-app deletion controls, device permission settings, and
        Apple subscription management tools.
      </p>
      <p>
        If you are in the EU/EEA, you also have the right to lodge a
        complaint with your local data protection authority — in France, the
        Commission Nationale de l&apos;Informatique et des Libertés (CNIL).
      </p>

      <h2>15. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. When we make
        material changes, we will update the &quot;Last updated&quot; date and may
        provide additional notice where appropriate.
      </p>

      <h2>16. Contact Us</h2>
      <p>
        For privacy questions, requests, or concerns, contact:{" "}
        <a href="mailto:contact@the-wakeapp.com">contact@the-wakeapp.com</a>
      </p>
      <p>Indy François — 222 chemin de la Brague, 06410 Biot, France.</p>
    </LegalShell>
  );
}
