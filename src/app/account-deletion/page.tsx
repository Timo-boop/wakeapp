import type { Metadata } from "next";
import { LegalShell } from "@/components/legal-shell";

export const metadata: Metadata = {
  title: "Account Deletion",
  description:
    "How to request deletion of your WakeApp account and associated data.",
};

export default function AccountDeletionPage() {
  return (
    <LegalShell>
      <h1>WakeApp Account Deletion</h1>
      <p className="prose-legal-meta">Last updated: June 27, 2026</p>

      <p>
        This page explains how to request deletion of your WakeApp account
        and associated data.
      </p>

      <h2>1. Delete your account inside the app</h2>
      <p>
        If you still have access to WakeApp, the fastest method is to delete
        your account directly inside the app. Go to: Profile → Settings →
        Delete Account. This in-app path is the primary account deletion
        flow.
      </p>

      <h2>2. Request deletion without using the app</h2>
      <p>
        If you no longer have access to the app, you can request account
        deletion by contacting:{" "}
        <a href="mailto:contact@the-wakeapp.com">contact@the-wakeapp.com</a>
      </p>
      <p>
        Recommended subject line: <strong>WakeApp account deletion
        request</strong>. To help identify your account, include: the email
        address used for WakeApp; your display name, if relevant; any other
        information necessary to verify the request safely.
      </p>

      <h2>3. What happens when your account is deleted</h2>
      <ul>
        <li>your WakeApp account is deleted from our systems</li>
        <li>
          associated app data — including tasks, habits, notes, focus
          sessions, stats, streaks, and friend connections — is permanently
          deleted from our systems within 7 days, unless we are legally
          required to retain certain information
        </li>
        <li>
          once your account is deleted, your data is no longer shared with
          friends through the leaderboard
        </li>
        <li>
          some data may be retained for security, fraud prevention,
          accounting, or legal compliance where applicable
        </li>
      </ul>
      <p>
        This reflects your right to erasure (&quot;right to be forgotten&quot;) under
        Article 17 of the EU General Data Protection Regulation (GDPR),
        where applicable.
      </p>

      <h2>4. Store subscriptions are not canceled automatically</h2>
      <p>
        If you purchased a subscription through Apple or Google Play,
        deleting your WakeApp account does not automatically cancel store
        billing. You must also manage or cancel your subscription through
        the relevant store (Apple App Store subscription settings / Google
        Play subscription settings). For help, contact{" "}
        <a href="mailto:contact@the-wakeapp.com">contact@the-wakeapp.com</a>.
      </p>

      <h2>5. Response timing</h2>
      <p>
        We process deletion requests promptly. Account deletions initiated
        in the app are completed, and associated data permanently removed
        from our systems, within 7 days. Email requests are subject to
        verification and any applicable legal or operational requirements.
      </p>

      <h2>6. Contact</h2>
      <p>For account deletion and privacy requests, contact:</p>
      <p>
        Indy François (sole proprietor / entreprise individuelle, France) —{" "}
        <a href="mailto:contact@the-wakeapp.com">contact@the-wakeapp.com</a>{" "}
        — <a href="https://the-wakeapp.com">https://the-wakeapp.com</a>
      </p>
    </LegalShell>
  );
}
