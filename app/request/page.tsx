"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const groups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function Request() {
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState<"info" | "error" | "success">("info");
  const [busy, setBusy] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [showInlineLogin, setShowInlineLogin] = useState(false);

  useEffect(() => {
    if (supabase) {
      supabase.auth.getUser().then(({ data }) => {
        if (data?.user?.email) {
          setUserEmail(data.user.email);
        }
      });
    }
  }, []);

  async function handleInlineLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!supabase) {
      setMsg("Database not configured. Add Supabase credentials first.");
      setMsgType("error");
      return;
    }
    setBusy(true);
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email")).trim();
    const password = String(f.get("password"));

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setMsg(`Sign-in failed: ${error.message}`);
      setMsgType("error");
    } else if (data.user) {
      setUserEmail(data.user.email || "User");
      setShowInlineLogin(false);
      setMsg("Signed in successfully! You can now submit your blood request.");
      setMsgType("success");
    }
    setBusy(false);
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg("");

    if (!supabase) {
      setMsg("Database is not configured yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to enable live requests.");
      setMsgType("info");
      return;
    }

    setBusy(true);
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      setMsg("Authentication is required to prevent fraudulent requests. Please sign in or register below.");
      setMsgType("error");
      setShowInlineLogin(true);
      setBusy(false);
      return;
    }

    const f = new FormData(e.currentTarget);
    const whenVal = f.get("when");
    const parsedDate = whenVal ? new Date(String(whenVal)) : null;

    if (!parsedDate || isNaN(parsedDate.getTime())) {
      setMsg("Please specify a valid required date and time.");
      setMsgType("error");
      setBusy(false);
      return;
    }

    const { data, error } = await supabase
      .from("blood_requests")
      .insert({
        requester_id: user.id,
        blood_group: f.get("group"),
        units: Number(f.get("units")),
        hospital_name: f.get("hospital"),
        hospital_city: f.get("city"),
        hospital_state: f.get("state"),
        required_at: parsedDate.toISOString(),
        urgency: f.get("urgency"),
        status: "open"
      })
      .select("request_code")
      .single();

    if (error) {
      setMsg(error.message);
      setMsgType("error");
    } else {
      setMsg(
        `Emergency request submitted! Reference Code: ${data?.request_code || "BL-REQ"}. Please coordinate directly with the treating hospital and licensed blood banks as well.`
      );
      setMsgType("success");
    }

    setBusy(false);
  }

  return (
    <>
      <header className="wrap nav">
        <Link className="brand" href="/">
          🩸 BloodLink India
        </Link>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          {userEmail ? (
            <span style={{ fontSize: 13, color: "var(--muted)" }}>Signed in: {userEmail}</span>
          ) : (
            <Link href="/login" className="muted" style={{ fontSize: 14 }}>
              Sign in
            </Link>
          )}
          <Link href="/" className="muted">
            ← Home
          </Link>
        </div>
      </header>

      <main className="wrap">
        <div className="formbox">
          <div className="eyebrow">Emergency coordination</div>
          <h2 style={{ fontFamily: "Manrope" }}>Request blood</h2>
          <div className="notice">
            If this is an immediate medical emergency, contact the treating hospital and nearest licensed blood bank immediately. BloodLink coordinates voluntary discovery and does not supply or transport blood.
          </div>

          {!userEmail && (
            <div style={{ padding: "14px 18px", background: "#f8f9fc", border: "1px solid #dce2ee", borderRadius: 12, marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
                <span style={{ fontSize: 13 }}>
                  Requester authentication helps prevent spam & emergency line abuse.
                </span>
                <button
                  type="button"
                  className="btn secondary"
                  style={{ padding: "8px 14px", fontSize: 13 }}
                  onClick={() => setShowInlineLogin(!showInlineLogin)}
                >
                  {showInlineLogin ? "Hide sign-in" : "Sign in now"}
                </button>
              </div>

              {showInlineLogin && (
                <form onSubmit={handleInlineLogin} style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid #e2e8f0" }}>
                  <div className="formgrid">
                    <div className="field">
                      <label>Email</label>
                      <input name="email" type="email" required placeholder="name@example.com" />
                    </div>
                    <div className="field">
                      <label>Password</label>
                      <input name="password" type="password" required placeholder="••••••••" />
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 8 }}>
                    <button className="btn primary" disabled={busy} style={{ padding: "8px 16px", fontSize: 13 }}>
                      {busy ? "Signing in…" : "Sign In & Continue"}
                    </button>
                    <Link href="/register" style={{ fontSize: 13, color: "var(--red)" }}>
                      Need to create an account?
                    </Link>
                  </div>
                </form>
              )}
            </div>
          )}

          <form onSubmit={submit}>
            <div className="formgrid">
              <div className="field">
                <label>Required blood group</label>
                <select name="group" required defaultValue="">
                  <option value="" disabled>Select group</option>
                  {groups.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label>Units required</label>
                <input name="units" type="number" min="1" max="20" defaultValue="1" required />
              </div>
              <Field label="Hospital name" name="hospital" placeholder="e.g. AIIMS / Fortis Hospital" />
              <Field label="Hospital city" name="city" placeholder="e.g. New Delhi" />
              <Field label="State / UT" name="state" placeholder="e.g. Delhi" />
              <div className="field">
                <label>Required date and time</label>
                <input type="datetime-local" name="when" required />
              </div>
              <div className="field full">
                <label>Urgency level</label>
                <select name="urgency" defaultValue="Urgent">
                  <option value="Urgent">Urgent (Immediate)</option>
                  <option value="Within 24 hours">Within 24 hours</option>
                  <option value="Scheduled">Scheduled (Planned procedure)</option>
                </select>
              </div>
            </div>

            <button className="btn primary" disabled={busy} style={{ width: "100%", marginTop: 10 }}>
              {busy ? "Submitting…" : "Submit emergency request"}
            </button>
          </form>

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
        </div>
      </main>
    </>
  );
}

function Field({
  label,
  name,
  placeholder = ""
}: {
  label: string;
  name: string;
  placeholder?: string;
}) {
  return (
    <div className="field">
      <label>{label}</label>
      <input name={name} required placeholder={placeholder} />
    </div>
  );
}
