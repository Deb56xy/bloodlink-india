"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Donor = {
  id: string;
  full_name: string;
  blood_group: string;
  city: string;
  district: string;
  state: string;
  available: boolean;
  verified: boolean;
};

const SAMPLE_DONORS: Donor[] = [
  { id: "s1", full_name: "Rahul S.", blood_group: "O+", city: "Mumbai", district: "Mumbai Suburban", state: "Maharashtra", available: true, verified: true },
  { id: "s2", full_name: "Priyanka M.", blood_group: "A+", city: "Delhi", district: "Central Delhi", state: "Delhi", available: true, verified: true },
  { id: "s3", full_name: "Arjun K.", blood_group: "B+", city: "Bengaluru", district: "Bengaluru Urban", state: "Karnataka", available: true, verified: false },
  { id: "s4", full_name: "Ananya D.", blood_group: "AB+", city: "Kolkata", district: "Kolkata", state: "West Bengal", available: true, verified: true },
  { id: "s5", full_name: "Vikram N.", blood_group: "O-", city: "Chennai", district: "Chennai", state: "Tamil Nadu", available: true, verified: true },
  { id: "s6", full_name: "Sneha P.", blood_group: "A-", city: "Pune", district: "Pune", state: "Maharashtra", available: true, verified: false },
  { id: "s7", full_name: "Rohan V.", blood_group: "B-", city: "Hyderabad", district: "Hyderabad", state: "Telangana", available: true, verified: true },
  { id: "s8", full_name: "Kavita R.", blood_group: "AB-", city: "Ahmedabad", district: "Ahmedabad", state: "Gujarat", available: true, verified: true },
];

function normalizeBloodGroup(bg: string): string {
  return bg.replace(/\u2212/g, "-").trim();
}

function FindContent() {
  const params = useSearchParams();
  const rawGroup = params.get("group") || "";
  const initialGroup = normalizeBloodGroup(rawGroup);

  const [group, setGroup] = useState(initialGroup);
  const [city, setCity] = useState("");
  const [items, setItems] = useState<Donor[]>([]);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);

  const executeSearch = useCallback(async (searchGroup: string, searchCity: string) => {
    setBusy(true);

    if (!supabase) {
      setIsDemoMode(true);
      const cleanGroup = normalizeBloodGroup(searchGroup);
      const filtered = SAMPLE_DONORS.filter((d) => {
        const matchesGroup = cleanGroup ? d.blood_group === cleanGroup : true;
        const matchesCity = searchCity ? d.city.toLowerCase().includes(searchCity.toLowerCase().trim()) : true;
        return matchesGroup && matchesCity && d.available;
      });
      setItems(filtered);
      setMsg(`${filtered.length} verified donor profile(s) found (Demo Mode — connect Supabase for live DB).`);
      setBusy(false);
      return;
    }

    try {
      let q = supabase.from("donor_directory").select("*").eq("available", true).limit(50);
      const cleanGroup = normalizeBloodGroup(searchGroup);
      if (cleanGroup) q = q.eq("blood_group", cleanGroup);
      if (searchCity.trim()) q = q.ilike("city", `%${searchCity.trim()}%`);

      const { data, error } = await q;
      if (error) {
        setMsg(`Search error: ${error.message}`);
        setItems([]);
      } else {
        const list = (data || []) as Donor[];
        setItems(list);
        setMsg(`${list.length} available donor profile(s) found.`);
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "An error occurred";
      setMsg(`Network error: ${errorMsg}`);
    } finally {
      setBusy(false);
    }
  }, []);

  useEffect(() => {
    const g = normalizeBloodGroup(params.get("group") || "");
    if (g) {
      setGroup(g);
      executeSearch(g, city);
    } else {
      executeSearch("", "");
    }
  }, [params, executeSearch, city]);

  const handleSearchClick = () => {
    executeSearch(group, city);
  };

  return (
    <>
      <header className="wrap nav">
        <Link className="brand" href="/">
          🩸 BloodLink India
        </Link>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <Link href="/register" className="muted" style={{ fontSize: 14 }}>
            Register as donor
          </Link>
          <Link href="/request" className="muted" style={{ fontSize: 14 }}>
            Emergency request
          </Link>
          <Link href="/" className="muted">
            ← Home
          </Link>
        </div>
      </header>

      <main className="wrap">
        <div className="formbox">
          <div className="eyebrow">Donor discovery</div>
          <h2 style={{ fontFamily: "Manrope" }}>Find voluntary donors</h2>
          <p className="sub">
            Search only shows donors who have opted in and marked themselves available.
          </p>

          {isDemoMode && (
            <div className="notice" style={{ background: "#f0f4ff", borderColor: "#c8d7ff", color: "#243c78" }}>
              <b>💡 Demo Mode Active:</b> Displaying verified sample donor directory. Connect your Supabase project in environment variables (<code>NEXT_PUBLIC_SUPABASE_URL</code> & <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>) to enable live database queries.
            </div>
          )}

          <div className="formgrid">
            <div className="field">
              <label>Blood group</label>
              <select value={group} onChange={(e) => setGroup(e.target.value)}>
                <option value="">Any group</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>City</label>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearchClick()}
                placeholder="e.g. Kolkata, Mumbai, Delhi"
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button className="btn primary" onClick={handleSearchClick} disabled={busy}>
              {busy ? "Searching…" : "Search donors"}
            </button>
            {(group || city) && (
              <button
                className="btn secondary"
                onClick={() => {
                  setGroup("");
                  setCity("");
                  executeSearch("", "");
                }}
              >
                Clear filters
              </button>
            )}
          </div>

          {msg && <p className="muted" style={{ marginTop: 14 }}>{msg}</p>}

          <div className="results">
            {items.map((d) => {
              const displayName = d.full_name ? d.full_name.split(" ")[0] : "Donor";
              return (
                <div className="result" key={d.id}>
                  <div>
                    <b>{displayName}</b>
                    <div className="muted" style={{ fontSize: 13 }}>
                      {d.city}, {d.district}, {d.state}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <b style={{ color: "var(--red)", fontSize: 20 }}>{d.blood_group}</b>
                    <div>{d.verified && <span className="tag">Verified</span>}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="notice">
            A search result is not a medical match or confirmation of availability. Contact a licensed blood bank/hospital for urgent requirements and all compatibility decisions.
          </div>
        </div>
      </main>
    </>
  );
}

export default function Find() {
  return (
    <Suspense
      fallback={
        <div className="wrap" style={{ padding: "60px 20px", textAlign: "center" }}>
          <p className="muted">Loading donor search...</p>
        </div>
      }
    >
      <FindContent />
    </Suspense>
  );
}
