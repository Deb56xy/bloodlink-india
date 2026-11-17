import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | BloodLink India",
  description: "Terms and conditions of use for BloodLink India voluntary blood donation network."
};

export default function TermsPage() {
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
        <h1>Terms of Service</h1>
        <p className="sub" style={{ marginBottom: 32 }}>
          Effective: November 2026. Please read these terms carefully before accessing BloodLink India.
        </p>

        <div className="card" style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "24px" }}>
          <section>
            <h3 style={{ fontSize: 20, marginBottom: 8, color: "var(--text)" }}>1. Nature of the Platform</h3>
            <p className="sub" style={{ lineHeight: 1.7 }}>
              BloodLink India is an open communications facilitator connecting voluntary blood donors with individuals and families in need. BloodLink India is <strong>NOT a blood bank</strong>, medical laboratory, or blood storage facility. We do not collect, process, test, store, or sell blood units.
            </p>
          </section>

          <section>
            <h3 style={{ fontSize: 20, marginBottom: 8, color: "var(--text)" }}>2. Medical Disclaimer</h3>
            <p className="sub" style={{ lineHeight: 1.7 }}>
              Blood donation and transfusion MUST always take place at certified, government-licensed blood banks, authorized medical clinics, or hospitals in compliance with the Drugs and Cosmetics Act and National Blood Transfusion Council (NBTC) guidelines. Prior to any donation, medical professionals must conduct compulsory health screenings, hemoglobin tests, and infectious disease screenings. BloodLink India does not verify individual donor medical eligibility.
            </p>
          </section>

          <section>
            <h3 style={{ fontSize: 20, marginBottom: 8, color: "var(--text)" }}>3. Voluntary & Non-Commercial Code</h3>
            <p className="sub" style={{ lineHeight: 1.7 }}>
              Under Indian law, voluntary blood donation is strictly unpaid. It is strictly prohibited to offer, demand, or accept money, favors, or financial remuneration of any kind in exchange for blood donation. Any account found attempting to solicit money will be permanently barred and reported to law enforcement authorities.
            </p>
          </section>

          <section>
            <h3 style={{ fontSize: 20, marginBottom: 8, color: "var(--text)" }}>4. User Responsibility</h3>
            <p className="sub" style={{ lineHeight: 1.7 }}>
              Users agree to provide truthful and accurate information when registering or submitting emergency requests. Misuse of the platform, including prank requests, fraudulent hospital claims, or harassment of voluntary donors, is strictly prohibited.
            </p>
          </section>

          <section>
            <h3 style={{ fontSize: 20, marginBottom: 8, color: "var(--text)" }}>5. Limitation of Liability</h3>
            <p className="sub" style={{ lineHeight: 1.7 }}>
              While we strive to ensure maximum availability and platform uptime, BloodLink India does not guarantee donor response times or successful blood unit procurement during emergencies. For life-threatening emergencies, always dial 112 / 108 or contact nearest licensed hospital blood banks directly.
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
