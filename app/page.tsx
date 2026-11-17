import Link from "next/link";

const groups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function Home() {
  return (
    <>
      <header className="wrap nav">
        <Link className="brand" href="/">
          <span className="drop">♥</span>
          <span>
            BloodLink <b style={{ color: "var(--red)" }}>India</b>
          </span>
        </Link>
        <nav className="navlinks">
          <a href="#how">How it works</a>
          <a href="#groups">Blood groups</a>
          <Link href="/find">Find donors</Link>
          <Link href="/register">Become a donor</Link>
          <Link href="/login" style={{ color: "var(--navy)" }}>Sign in</Link>
        </nav>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <Link className="btn secondary mobile" href="/find" style={{ padding: "8px 12px", fontSize: 13 }}>
            Find
          </Link>
          <Link className="btn primary" href="/request">
            Emergency request
          </Link>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="wrap heroGrid">
            <div>
              <div className="eyebrow">Every drop connects a life</div>
              <h1>
                Donate blood.<br />
                <span>Save lives.</span>
              </h1>
              <p className="lead">
                A trusted connection platform bringing voluntary blood donors, patients, hospitals and licensed blood banks closer — across India.
              </p>
              <div className="actions">
                <Link className="btn primary" href="/request">
                  ＋ Request blood
                </Link>
                <Link className="btn secondary" href="/register">
                  ♥ Register as donor
                </Link>
                <Link className="btn dark" href="/find">
                  ⌕ Find donors
                </Link>
              </div>
              <div className="statrow">
                <div className="stat">
                  <strong>8</strong>
                  <small>Blood groups</small>
                </div>
                <div className="stat">
                  <strong>36</strong>
                  <small>States & UTs</small>
                </div>
                <div className="stat">
                  <strong>24/7</strong>
                  <small>Emergency access</small>
                </div>
              </div>
            </div>
            <div className="heroArt">
              <div className="bigdrop">🩸</div>
              <h2 style={{ fontFamily: "Manrope" }}>Be someone&apos;s reason to smile.</h2>
              <p className="muted">
                One donation can make a meaningful difference. Register as a voluntary donor today.
              </p>
              <Link className="btn dark" href="/register">
                Join the donor community
              </Link>
            </div>
          </div>
        </section>

        <section className="section wrap" id="how">
          <div className="eyebrow">Simple. Safe. Connected.</div>
          <h2>Help reaches faster when we connect.</h2>
          <p className="sub">
            BloodLink helps people discover potential voluntary donors and contact participating institutions.
          </p>
          <div className="cards">
            <div className="card">
              <div className="ico">⌕</div>
              <h3>Find a donor</h3>
              <p className="sub">
                Search by blood group and area. Contact is shared only through privacy-protected workflows.
              </p>
              <Link className="btn secondary" href="/find">
                Search donors
              </Link>
            </div>
            <div className="card">
              <div className="ico">♥</div>
              <h3>Become a donor</h3>
              <p className="sub">
                Register your details, choose your availability and opt in to emergency notifications.
              </p>
              <Link className="btn secondary" href="/register">
                Register now
              </Link>
            </div>
            <div className="card">
              <div className="ico">＋</div>
              <h3>Raise an emergency</h3>
              <p className="sub">
                Create a request with hospital details so the right people can coordinate quickly.
              </p>
              <Link className="btn secondary" href="/request">
                Create request
              </Link>
            </div>
          </div>
        </section>

        <section className="section soft" id="groups">
          <div className="wrap">
            <div className="eyebrow">Blood groups</div>
            <h2>Every blood group matters.</h2>
            <p className="sub">Choose a group to begin a donor search.</p>
            <div className="bloods">
              {groups.map((g) => (
                <Link
                  className="blood"
                  key={g}
                  href={`/find?group=${encodeURIComponent(g)}`}
                >
                  {g}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section wrap">
          <div className="notice">
            <b>Medical and emergency notice:</b> BloodLink is a donor discovery and coordination platform, not a blood bank. A donor match does not confirm eligibility, compatibility or blood availability. For urgent needs, contact a licensed blood bank or hospital immediately. Qualified professionals must perform screening and compatibility testing.
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap">
          <div className="brand" style={{ color: "white" }}>
            <span className="drop">♥</span>BloodLink India
          </div>
          <p>
            Every Drop Connects a Life. A voluntary donor discovery and emergency coordination initiative.
          </p>
          <div style={{ display: "flex", gap: 20, margin: "14px 0", flexWrap: "wrap", fontSize: 14 }}>
            <Link href="/" style={{ color: "#d8deea" }}>Home</Link>
            <Link href="/find" style={{ color: "#d8deea" }}>Find Donors</Link>
            <Link href="/register" style={{ color: "#d8deea" }}>Donor Registration</Link>
            <Link href="/request" style={{ color: "#d8deea" }}>Request Blood</Link>
            <Link href="/login" style={{ color: "#d8deea" }}>Sign In</Link>
          </div>
          <p>© {new Date().getFullYear()} BloodLink India · <Link href="/privacy" style={{ color: "#d8deea" }}>Privacy</Link> · <Link href="/terms" style={{ color: "#d8deea" }}>Terms</Link> · <a href="mailto:support@bloodlink-india.vercel.app" style={{ color: "#d8deea" }}>Contact</a></p>
        </div>
      </footer>
    </>
  );
}
