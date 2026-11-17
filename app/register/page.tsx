"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const groups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function Register() {
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState<"info" | "error" | "success">("info");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg("");
    setBusy(true);

    if (!supabase) {
      setMsg("Database is not connected yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your environment variables to enable live registration.");
      setMsgType("info");
      setBusy(false);
      return;
    }

    const f = new FormData(e.currentTarget);
    const email = String(f.get("email")).trim();
    const password = String(f.get("password"));

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: String(f.get("name")),
          phone: String(f.get("phone")),
          blood_group: String(f.get("group")),
          city: String(f.get("city")),
          state: String(f.get("state"))
        }
      }
    });

    if (error) {
      setMsg(error.message);
      setMsgType("error");
      setBusy(false);
      return;
    }

    if (data.user) {
      const { error: dbErr } = await supabase.from("donor_profiles").insert({
        user_id: data.user.id,
        full_name: f.get("name"),
        phone: f.get("phone"),
        age: Number(f.get("age")),
        blood_group: f.get("group"),
        state: f.get("state"),
        district: f.get("district"),
        city: f.get("city"),
        pincode: f.get("pin"),
        available: true,
        consent_notifications: f.get("consent") === "on"
      });

      if (dbErr) {
        setMsg(`Account created! (Profile record notice: ${dbErr.message})`);
        setMsgType("info");
      } else {
        setMsg("Registration successful! Check your email to verify your account and activate your donor profile.");
        setMsgType("success");
      }
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
          <Link href="/login" className="muted" style={{ fontSize: 14 }}>
            Sign in
          </Link>
          <Link href="/" className="muted">
            ← Home
          </Link>
        </div>
      </header>

      <main className="wrap">
        <div className="formbox">
          <div className="eyebrow">Join the community</div>
          <h2 style={{ fontFamily: "Manrope" }}>Register as a donor</h2>
          <p className="sub">
            Your contact details are not publicly displayed. You control your availability and notification consent.
          </p>

          <form onSubmit={submit}>
            <div className="formgrid">
              <Field label="Full name" name="name" required placeholder="e.g. Rahul Sharma" />
              <Field label="Mobile number (+91)" name="phone" required placeholder="e.g. 9876543210" />
              <Field label="Email" name="email" type="email" required placeholder="e.g. rahul@example.com" />
              <Field label="Password (minimum 8 characters)" name="password" type="password" required />
              <Field label="Age (18-65)" name="age" type="number" required />
              <div className="field">
                <label>Blood group</label>
                <select name="group" required defaultValue="">
                  <option value="" disabled>Select blood group</option>
                  {groups.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
              <Field label="State / UT" name="state" required placeholder="e.g. Maharashtra" />
              <Field label="District" name="district" required placeholder="e.g. Mumbai Suburban" />
              <Field label="City" name="city" required placeholder="e.g. Mumbai" />
              <Field label="PIN code" name="pin" required placeholder="e.g. 400001" />
            </div>

            <label style={{ display: "flex", gap: 9, fontSize: 13, margin: "14px 0 16px", cursor: "pointer" }}>
              <input type="checkbox" name="consent" defaultChecked />
              I agree to receive voluntary donor notifications and can opt out anytime.
            </label>

            <button className="btn primary" disabled={busy} style={{ width: "100%" }}>
              {busy ? "Submitting…" : "Create donor account"}
            </button>
          </form>

          {msg && (
            <div
              className="notice"
              style={{
                background: msgType === "error" ? "#fff0f1" : msgType === "success" ? "#eaf8f0" : "#fff8e8",
                borderColor: msgType === "error" ? "#f4dadd" : msgType === "success" ? "#bcead0" : "#f4dfac",
                color: msgType === "error" ? "#b31b27" : msgType === "success" ? "#187545" : "#70521b"
              }}
            >
              {msg}
            </div>
          )}

          <div style={{ marginTop: 20, textAlign: "center", fontSize: 13 }} className="muted">
            Already registered?{" "}
            <Link href="/login" style={{ color: "var(--red)", fontWeight: 700 }}>
              Sign in to your account
            </Link>
          </div>

          <p className="muted" style={{ fontSize: 12, marginTop: 16 }}>
            By registering, you agree to the privacy policy and terms. Donor eligibility is determined only by qualified medical staff at the time of donation.
          </p>
        </div>
      </main>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder = ""
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="field">
      <label>{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        min={type === "number" ? 18 : undefined}
        max={type === "number" ? 65 : undefined}
      />
    </div>
  );
}
