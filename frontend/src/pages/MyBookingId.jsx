// // // src/pages/MyBookingId.jsx

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

export default function MyBookingId() {
    const [bookings, setBookings] = useState([]);
    const [loadingState, setLoadingState] = useState("loading");
    const token = sessionStorage.getItem("token");

    const formatDate = (time) => {
        if (!time) return "—";
        const d = new Date(Number(time) || time);
        if (isNaN(d.getTime())) return "Invalid";
        return d.toLocaleString("en-IN", {
            day: "numeric", month: "short", year: "numeric",
            hour: "2-digit", minute: "2-digit"
        });
    };

    const isPast = (time) => {
        if (!time) return false;
        return new Date(Number(time) || time) < new Date();
    };

    const fetchMyBookings = async () => {
        setLoadingState("loading");
        try {
            const res = await fetch("http://localhost:5000/graphql", {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    query: `query {
            myBookings {
              id vehicleNumber vehicleType fromTime toTime qrToken
              slot { slotNumber }
            }
          }`
                })
            });
            const data = await res.json();
            if (data.errors) { setLoadingState("error"); return; }
            const bk = data.data.myBookings || [];
            setBookings(bk);
            setLoadingState(bk.length === 0 ? "empty" : "done");
        } catch { setLoadingState("error"); }
    };

    useEffect(() => { fetchMyBookings(); }, []);

    if (loadingState === "loading") return (
        <div style={s.center}>
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
            <div style={s.spinner} />
            <p style={s.stateText}>Loading your bookings…</p>
        </div>
    );

    if (loadingState === "error") return (
        <div style={s.center}>
            <span style={{ fontSize: 40 }}>⚠️</span>
            <p style={{ ...s.stateText, color: "#ef4444" }}>Could not load bookings.</p>
            <button style={s.retryBtn} onClick={fetchMyBookings}>Retry</button>
        </div>
    );

    if (loadingState === "empty") return (
        <div style={s.center}>
            <span style={{ fontSize: 48 }}>🅿️</span>
            <p style={{ ...s.stateText, fontSize: 16, fontWeight: 700, color: "#334155" }}>No Bookings Yet</p>
            <p style={{ ...s.stateText, fontSize: 13 }}>Your confirmed bookings will appear here.</p>
        </div>
    );

    return (
        <div style={s.root}>
            <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}`}</style>

            <div style={s.header}>
                <span style={s.badge}>MY BOOKINGS</span>
                <h2 style={s.title}>Booking <span style={s.accent}>History</span></h2>
                <p style={s.sub}>{bookings.length} booking{bookings.length !== 1 ? "s" : ""} found</p>
                <div style={s.divider} />
            </div>

            <div style={s.grid}>
                {bookings.map((b, idx) => {
                    const past = isPast(b.toTime);

                    // Multi-line text for phone scanners
                    const qrValue = `VEHICLE: ${b.vehicleNumber}
SLOT: ${b.slot?.slotNumber ?? "—"}
FROM: ${formatDate(b.fromTime)}
TO: ${formatDate(b.toTime)}
ID: ${b.qrToken || b.id}`;

                    return (
                        <div key={b.id} style={{ ...s.card, animationDelay: `${idx * 0.07}s`, opacity: past ? 0.6 : 1 }}>

                            <div style={s.cardTop}>
                                <div style={s.slotBadge}>
                                    <span>🅿</span>
                                    <span style={s.slotNum}>{b.slot?.slotNumber ?? "—"}</span>
                                </div>
                                <span style={{ ...s.pill, ...(past ? s.pillPast : s.pillActive) }}>
                                    {past ? "Expired" : "Active"}
                                </span>
                            </div>

                            <div style={s.infoRow}>
                                <div style={s.infoBlock}>
                                    <span style={s.infoLabel}>VEHICLE</span>
                                    <span style={s.infoVal}>{b.vehicleNumber}</span>
                                </div>
                                <div style={s.infoBlock}>
                                    <span style={s.infoLabel}>TYPE</span>
                                    <span style={s.infoVal}>{b.vehicleType === "car" ? "🚗 Car" : "🏍️ Bike"}</span>
                                </div>
                            </div>

                            <div style={s.timeGrid}>
                                <div style={s.timeBlock}>
                                    <span style={s.timeLabel}>FROM</span>
                                    <span style={s.timeVal}>{formatDate(b.fromTime)}</span>
                                </div>
                                <span style={s.arrow}>→</span>
                                <div style={s.timeBlock}>
                                    <span style={s.timeLabel}>TO</span>
                                    <span style={s.timeVal}>{formatDate(b.toTime)}</span>
                                </div>
                            </div>

                            <div style={s.dash} />

                            {!past ? (
                                <div style={s.qrWrap}>
                                    <div style={s.qrFrame}>
                                        <QRCodeSVG
                                            value={qrValue}
                                            size={160}
                                            level="H"
                                            bgColor="transparent"
                                            fgColor="#00e5ff" // Back to your original neon cyan
                                            includeMargin={false}
                                        />
                                    </div>
                                    <p style={s.qrHint}>Scan at gate for details</p>

                                    <div style={s.tokenRow}>
                                        <span style={s.tokenLabel}>Booking ID</span>
                                        <code style={s.tokenVal}>{b.qrToken || b.id}</code>
                                    </div>
                                </div>
                            ) : (
                                <div style={s.expiredBox}>
                                    <span style={{ fontSize: 22 }}>🔒</span>
                                    <p style={{ color: "#334155", fontSize: 12, margin: 0 }}>QR code expired</p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

const s = {
    root: { background: "#080c14", minHeight: "100vh", padding: "36px 16px 60px", fontFamily: "'Segoe UI', system-ui, sans-serif", color: "#e2e8f0" },
    center: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "50vh", gap: 12 },
    spinner: { width: 36, height: 36, border: "3px solid rgba(0,229,255,0.15)", borderTop: "3px solid #00e5ff", borderRadius: "50%", animation: "spin 0.8s linear infinite" },
    stateText: { fontSize: 14, color: "#475569", margin: 0 },
    retryBtn: { marginTop: 8, padding: "8px 20px", background: "rgba(0,229,255,0.1)", border: "1px solid rgba(0,229,255,0.25)", color: "#00e5ff", borderRadius: 8, cursor: "pointer" },
    header: { textAlign: "center", marginBottom: 36 },
    badge: { display: "inline-block", background: "rgba(0,229,255,0.1)", color: "#00e5ff", fontSize: 10, fontWeight: 700, letterSpacing: 3, padding: "4px 14px", borderRadius: 20, border: "1px solid rgba(0,229,255,0.25)", marginBottom: 14 },
    title: { fontSize: "clamp(24px,5vw,40px)", fontWeight: 800, margin: "0 0 6px", color: "#f8fafc" },
    accent: { color: "#00e5ff" },
    sub: { color: "#475569", fontSize: 13, margin: "0 0 18px" },
    divider: { width: 44, height: 3, background: "linear-gradient(90deg,#00e5ff,#7c3aed)", borderRadius: 2, margin: "0 auto" },
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: 18, maxWidth: 920, margin: "0 auto" },
    card: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "22px 20px", animation: "fadeUp 0.45s ease both" },
    cardTop: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
    slotBadge: { display: "flex", alignItems: "center", gap: 7, background: "rgba(0,229,255,0.08)", border: "1px solid rgba(0,229,255,0.2)", borderRadius: 10, padding: "5px 12px" },
    slotNum: { fontWeight: 800, fontSize: 15, color: "#00e5ff" },
    pill: { fontSize: 10, fontWeight: 700, letterSpacing: 1.5, padding: "3px 10px", borderRadius: 20 },
    pillActive: { color: "#10b981", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)" },
    pillPast: { color: "#64748b", background: "rgba(100,116,139,0.1)", border: "1px solid rgba(100,116,139,0.2)" },
    infoRow: { display: "flex", gap: 12, marginBottom: 14 },
    infoBlock: { flex: 1, background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: "10px 12px" },
    infoLabel: { display: "block", fontSize: 9, fontWeight: 700, letterSpacing: 2, color: "#475569", marginBottom: 4 },
    infoVal: { display: "block", fontSize: 13, color: "#cbd5e1", fontWeight: 600 },
    timeGrid: { display: "flex", alignItems: "center", gap: 8, marginBottom: 18 },
    timeBlock: { flex: 1, background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: "10px 12px" },
    timeLabel: { display: "block", fontSize: 9, fontWeight: 700, letterSpacing: 2, color: "#475569", marginBottom: 4 },
    timeVal: { display: "block", fontSize: 12, color: "#94a3b8", fontWeight: 600, lineHeight: 1.4 },
    arrow: { color: "#1e293b", fontSize: 16, flexShrink: 0 },
    dash: { borderTop: "1px dashed rgba(255,255,255,0.07)", marginBottom: 18 },
    qrWrap: { display: "flex", flexDirection: "column", alignItems: "center", gap: 10 },
    qrFrame: {
        background: "rgba(0,0,0,0.5)", // Dark background as per your original style
        border: "1px solid rgba(0,229,255,0.15)",
        borderRadius: 14, padding: 14,
        boxShadow: "0 0 40px rgba(0,229,255,0.06)"
    },
    qrHint: { fontSize: 11, color: "#475569", margin: 0 },
    tokenRow: { display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, padding: "8px 12px" },
    tokenLabel: { fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: "#334155" },
    tokenVal: { fontSize: 10, color: "#7c3aed", fontFamily: "monospace", wordBreak: "break-all", maxWidth: "68%", textAlign: "right" },
    expiredBox: { display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "20px 0", background: "rgba(255,255,255,0.02)", borderRadius: 12 },
};