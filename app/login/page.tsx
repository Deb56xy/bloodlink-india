"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Login() {
  const router = useRouter();
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState<"info" | "error" | "success">("info");
  const [busy, setBusy] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    if (supabase) {
      supabase.auth.getUser().then(({ data }) => {
        if (data?.user?.email) {
          setCurrentUser(data.user.email);
        }
      });
    }
  }, []);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg("");
    setBusy(true);

    if (!supabase) {
      setMsg("Database is not connected yet. Add Supabase credentials in your environment variables to sign in.");
      setMsgType("info");
      setBusy(false);
      return;
    }

    const f = new FormData(e.currentTarget);
    const email = String(f.get("email")).trim();
    const password = String(f.get("password"));

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      setMsg(error.message);
      setMsgType("error");
      setBusy(false);
      return;
    }

    if (data.user) {
      setMsg("Signed in successfully! Redirecting...");
      setMsgType("success");
      setCurrentUser(data.user.email || "User");
      setTimeout(() => {
        router.push("/request");
      }, 1000);
    }

    setBusy(false);
  }

  async function handleLogout() {
    if (!supabase) return;
    setBusy(true);
    await supabase.auth.signOut();
    setCurrentUser(null);
    setMsg("You have been signed out.");
    setMsgType("info");
    setBusy(false);
  }

  return (
    <>
      <header className="wrap nav">
        <Link className="brand" href="/">
          🩸 BloodLink India
        </Link>
        <Link href="/" className="muted">
          ← Home
        </Link>
      </header>

      <main className="wrap">
        <div className="formbox" style={{ maxWidth: 480 }}>
          <div className="eyebrow">Account Access</div>
          <h2 style={{ fontFamily: "Manrope" }}>
            {currentUser ? "My Account" : "Sign in to BloodLink"}
          </h2>
          <p className="sub">
            {currentUser
              ? `You are currently signed in as ${currentUser}`
              : "Access your donor profile or submit verified emergency blood requests."}
          </p>

          {currentUser ? (
            <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 14 }}>
              <Link className="btn primary" href="/request" style={{ textAlign: "center" }}>
                ＋ Create Blood Request
              </Link>
              <Link className="btn secondary" href="/find" style={{ textAlign: "center" }}>
                ⌕ Search Donors
              </Link>
              <button className="btn dark" onClick={handleLogout} disabled={busy}>
                {busy ? "Signing out…" : "Sign out"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleLogin} style={{ marginTop: 20 }}>
              <div className="field">
                <label>Email address</label>
                <input name="email" type="email" required placeholder="your.email@example.com" />
              </div>
              <div className="field">
                <label>Password</label>
                <input name="password" type="password" required placeholder="••••••••" />
              </div>

              <button className="btn primary" disabled={busy} style={{ width: "100%", marginTop: 10 }}>
                {busy ? "Signing in…" : "Sign In"}
              </button>
            </form>
          )}

          {msg && (
            <div
              className="notice"
              style={{
                background: msgType === "error" ? "#fff0f1" : msgType === "success" ? "#eaf8f0" : "#fff8e8",
                borderColor: msgType === "error" ? "#f4dadd" : msgType === "success" ? "#bcead0" : "#f4dfac",
                color: msgType === "error" ? "#b31b27" : msgType === "success" ? "#187545" : "#70521b",
                marginTop: 18
              }}
            >
              {msg}
            </div>
          )}

          {!currentUser && (
            <div style={{ marginTop: 24, textAlign: "center", fontSize: 13 }} className="muted">
              Don&apos;t have an account yet?{" "}
              <Link href="/register" style={{ color: "var(--red)", fontWeight: 700 }}>
                Register as a donor
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
