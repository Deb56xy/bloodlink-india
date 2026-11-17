import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | BloodLink India",
  description: "Privacy policy, data safety, and user consent guidelines for BloodLink India voluntary blood donation network."
};

export default function PrivacyPage() {
  return (
    <>
      <header className="nav">
        <div className="wrap flex">
          <Link href="/" className="brand">
            <span className="drop">♥</span>BloodLink India
          </Link>
          <nav className="links">
            <Link href="/find">Find Donors</Link>
            <Link href="/register">Register</Link>
            <Link href="/request">Request</Link>
            <Link href="/login" className="btn small primary">Sign In</Link>
          </nav>
        </div>
      </header>

      <main className="section wrap" style={{ maxWidth: 840, margin: "40px auto" }}>
        <div className="eyebrow">Legal & Compliance</div>
        <h1>Privacy Policy & Data Safety</h1>
        <p className="sub" style={{ marginBottom: 32 }}>
          Last updated: November 2026. Effective for all users of the BloodLink India Android app and web platform.
        </p>

        <div className="card" style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "24px" }}>
          <section>
            <h3 style={{ fontSize: 20, marginBottom: 8, color: "var(--text)" }}>1. Overview and Non-Commercial Mission</h3>
            <p className="sub" style={{ lineHeight: 1.7 }}>
              BloodLink India is a public health initiative designed to facilitate emergency connections between voluntary blood donors and patients or certified medical facilities in need across India. We are strictly non-commercial: we never sell, monetize, rent, or trade user data or donor directories to any advertising networks, third-party brokers, or commercial entities.
            </p>
          </section>

          <section>
            <h3 style={{ fontSize: 20, marginBottom: 8, color: "var(--text)" }}>2. Information We Collect</h3>
            <p className="sub" style={{ lineHeight: 1.7 }}>
              When you voluntarily register as a donor or submit an emergency blood request, we collect only the minimum required information:
            </p>
            <ul style={{ paddingLeft: 20, marginTop: 8, lineHeight: 1.8, color: "var(--muted)" }}>
              <li><strong>Personal Identity:</strong> Full name and registered email address.</li>
              <li><strong>Medical & Donor Attributes:</strong> Blood group (e.g., A+, O-, AB+) and age (minimum 18 years per Indian national voluntary donation standards).</li>
              <li><strong>Contact & Location:</strong> Contact telephone number, State, District, and City to enable localized emergency matching.</li>
              <li><strong>Emergency Request Details:</strong> Patient name, hospital name, required units, urgency level, and contact coordinator telephone number.</li>
            </ul>
          </section>

          <section>
            <h3 style={{ fontSize: 20, marginBottom: 8, color: "var(--text)" }}>3. Purpose of Processing</h3>
            <p className="sub" style={{ lineHeight: 1.7 }}>
              All collected information is processed solely to:
            </p>
            <ul style={{ paddingLeft: 20, marginTop: 8, lineHeight: 1.8, color: "var(--muted)" }}>
              <li>Enable individuals facing urgent medical situations or surgeries to discover voluntary donors within their district.</li>
              <li>Send critical emergency donation requests when matching blood types are desperately needed nearby.</li>
              <li>Prevent spam and duplicate donor records to maintain network integrity and reliability.</li>
            </ul>
          </section>

          <section>
            <h3 style={{ fontSize: 20, marginBottom: 8, color: "var(--text)" }}>4. Android Device Permissions</h3>
            <p className="sub" style={{ lineHeight: 1.7 }}>
              The BloodLink India Android application requests only permissions essential to its core function:
            </p>
            <ul style={{ paddingLeft: 20, marginTop: 8, lineHeight: 1.8, color: "var(--muted)" }}>
              <li><code>INTERNET</code> &amp; <code>ACCESS_NETWORK_STATE</code>: To fetch real-time donor listings and submit requests securely via HTTPS.</li>
              <li><code>CALL_PHONE</code> (Optional): To enable one-tap direct calling to donors or hospital coordinators during emergencies upon explicit user tap.</li>
              <li><code>POST_NOTIFICATIONS</code>: To deliver urgent blood requirement broadcasts in your registered district.</li>
            </ul>
          </section>

          <section>
            <h3 style={{ fontSize: 20, marginBottom: 8, color: "var(--text)" }}>5. Data Security and Encryption</h3>
            <p className="sub" style={{ lineHeight: 1.7 }}>
              All network communications between the Android client, web browsers, and our database servers are protected with industry-standard TLS 1.3 encryption. Passwords are cryptographic hashes (salted bcrypt/Argon2) and are never stored in plaintext.
            </p>
          </section>

          <section>
            <h3 style={{ fontSize: 20, marginBottom: 8, color: "var(--text)" }}>6. User Rights & Data Deletion</h3>
            <p className="sub" style={{ lineHeight: 1.7 }}>
              You maintain complete ownership of your personal data:
            </p>
            <ul style={{ paddingLeft: 20, marginTop: 8, lineHeight: 1.8, color: "var(--muted)" }}>
              <li><strong>Pause Availability:</strong> You can mark your status as inactive or on break at any time so your contact number is hidden from search results.</li>
              <li><strong>Account Deletion:</strong> You may request complete erasure of your donor profile and account records at any time by contacting our support desk.</li>
            </ul>
          </section>

          <section>
            <h3 style={{ fontSize: 20, marginBottom: 8, color: "var(--text)" }}>7. Developer & Support Contact</h3>
            <p className="sub" style={{ lineHeight: 1.7 }}>
              For privacy inquiries, data modification, or account deletion requests, please contact:
              <br />
              <strong>BloodLink India Developer &amp; Privacy Officer</strong>
              <br />
              Email: <code>privacy@bloodlink-india.vercel.app</code>
              <br />
              Official Portal: <a href="https://bloodlink-india.vercel.app" style={{ color: "var(--brand)" }}>https://bloodlink-india.vercel.app</a>
            </p>
          </section>
        </div>
      </main>

      <footer className="footer">
        <div className="wrap">
          <div className="brand" style={{ color: "white" }}>
            <span className="drop">♥</span>BloodLink India
          </div>
          <p>© {new Date().getFullYear()} BloodLink India · <Link href="/privacy" style={{ color: "#d8deea" }}>Privacy</Link> · <Link href="/terms" style={{ color: "#d8deea" }}>Terms</Link></p>
        </div>
      </footer>
    </>
  );
}
