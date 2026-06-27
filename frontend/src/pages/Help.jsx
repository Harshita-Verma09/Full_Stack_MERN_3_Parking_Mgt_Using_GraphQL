
// MERN_Parking_Sys/frontend/src/pages/Help.jsx

import { useState, useEffect } from "react";

const steps = [
  {
    icon: "🗂️",
    num: "01",
    title: "Open Booking Tab",
    desc: "Select the Booking tab from the dashboard to get started.",
    color: "#00e5ff",
  },
  {
    icon: "🅿️",
    num: "02",
    title: "Choose Slot",
    desc: "Select an available parking slot and pick your vehicle type.",
    color: "#7c3aed",
  },
  {
    icon: "✅",
    num: "03",
    title: "Confirm Booking",
    desc: "Confirm your booking to instantly reserve the parking slot.",
    color: "#10b981",
  },
  {
    icon: "🪪",
    num: "04",
    title: "View Booking ID",
    desc: "Go to the My Booking ID tab to see your unique QR code.",
    color: "#f59e0b",
  },
  {
    icon: "📲",
    num: "05",
    title: "Scan QR at Gate",
    desc: "Show your QR code at the parking gate for verification.",
    color: "#ec4899",
  },
  {
    icon: "🚗",
    num: "06",
    title: "Exit Parking",
    desc: "When leaving, scan your QR again to close the booking.",
    color: "#06b6d4",
  },
];

const notes = [
  "Always keep your QR code ready before entering the parking area.",
  "Your booking is valid only for the selected time slot.",
  "If the parking is full, please wait for a free slot to open.",
  "Make sure your internet connection is active while booking.",
];

const warnings = [
  { label: "OTP Limit", value: "3×", desc: "You can request OTP only 3 times for verification." },
  { label: "QR Scans", value: "3×", desc: "Your QR code can be scanned only 3 times per booking." },
  { label: "Block Risk", value: "⚠", desc: "Exceeding limits may temporarily block your booking." },
];

export default function Help() {
  const [visible, setVisible] = useState([]);
  const [activeStep, setActiveStep] = useState(null);

  useEffect(() => {
    steps.forEach((_, i) => {
      setTimeout(() => {
        setVisible((prev) => [...prev, i]);
      }, 120 * i);
    });
  }, []);

  return (
    <div style={styles.root}>
      {/* Ambient BG blobs */}
      <div style={{ ...styles.blob, top: "-80px", left: "-80px", background: "rgba(0,229,255,0.07)" }} />
      <div style={{ ...styles.blob, bottom: "-60px", right: "-60px", background: "rgba(124,58,237,0.09)", width: 400, height: 400 }} />

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.badge}>USER GUIDE</div>
        <h1 style={styles.title}>
          <span style={styles.titleAccent}>Parking</span> System
        </h1>
        <p style={styles.subtitle}>Everything you need to park smarter, faster, and stress-free.</p>
        <div style={styles.divider} />
      </header>

      {/* Steps */}
      <section>
        <p style={styles.sectionLabel}>HOW IT WORKS</p>
        <div style={styles.stepsGrid}>
          {steps.map((s, i) => (
            <div
              key={i}
              style={{
                ...styles.stepCard,
                opacity: visible.includes(i) ? 1 : 0,
                transform: visible.includes(i) ? "translateY(0)" : "translateY(28px)",
                transition: `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`,
                borderColor: activeStep === i ? s.color : "rgba(255,255,255,0.07)",
                boxShadow: activeStep === i ? `0 0 24px ${s.color}33` : "none",
              }}
              onMouseEnter={() => setActiveStep(i)}
              onMouseLeave={() => setActiveStep(null)}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <span style={{ fontSize: 28 }}>{s.icon}</span>
                <span style={{ ...styles.stepNum, color: s.color }}>{s.num}</span>
              </div>
              <h3 style={{ ...styles.stepTitle, color: activeStep === i ? s.color : "#f1f5f9" }}>{s.title}</h3>
              <p style={styles.stepDesc}>{s.desc}</p>
              <div style={{ ...styles.stepBar, background: s.color, opacity: activeStep === i ? 1 : 0.25 }} />
            </div>
          ))}
        </div>
      </section>

      {/* Notes */}
      <section style={styles.notesBox}>
        <div style={styles.notesHeader}>
          <span style={styles.notesIcon}>📋</span>
          <span style={styles.notesTitleText}>Important Notes</span>
        </div>
        <ul style={styles.notesList}>
          {notes.map((note, i) => (
            <li key={i} style={styles.noteItem}>
              <span style={styles.noteDot}>▸</span>
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Warnings */}
      <section>
        <p style={styles.sectionLabel}>RESTRICTIONS</p>
        <div style={styles.warningGrid}>
          {warnings.map((w, i) => (
            <div key={i} style={styles.warningCard}>
              <div style={styles.warningValue}>{w.value}</div>
              <div style={styles.warningLabel}>{w.label}</div>
              <p style={styles.warningDesc}>{w.desc}</p>
            </div>
          ))}
        </div>
        <p style={styles.warningFooter}>
          ⚠ Exceeding limits may result in a temporary block on your account.
        </p>
      </section>

      {/* Contact */}
      <section style={styles.contactBox}>
        <div style={styles.contactLeft}>
          <p
            style={{
              ...styles.sectionLabel,
              marginBottom: 4,
              color: "#94a3b8",
              fontSize: 11,
              letterSpacing: 2
            }}
          >
            SUPPORT
          </p>

          <h2 style={styles.contactTitle}>Need Help?</h2>
          <p style={styles.contactSub}>Our team is here to assist you.</p>
        </div>

        <div style={styles.contactRight}>
          <div style={styles.contactRow}>
            <span style={styles.contactIcon}>✉</span>
            <span style={styles.contactValue}>parkingManagementOfficial.com</span>
          </div>
          <div style={styles.contactRow}>
            <span style={styles.contactIcon}>🕐</span>
            <span style={styles.contactValue}>9 AM – 6 PM, Mon–Sat</span>
          </div>
        </div>
      </section>

      <p style={styles.footer}>© 2025 Parking System · All rights reserved</p>
    </div>
  );
}

const styles = {
  root: {
    background: "#080c14",
    minHeight: "100vh",
    color: "#e2e8f0",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    padding: "40px 20px 60px",
    maxWidth: 860,
    margin: "0 auto",
    position: "relative",
    overflow: "hidden",
  },
  blob: {
    position: "absolute",
    width: 340,
    height: 340,
    borderRadius: "50%",
    filter: "blur(80px)",
    pointerEvents: "none",
    zIndex: 0,
  },
  header: {
    textAlign: "center",
    marginBottom: 52,
    position: "relative",
    zIndex: 1,
  },
  badge: {
    display: "inline-block",
    background: "rgba(0,229,255,0.1)",
    color: "#00e5ff",
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 3,
    padding: "5px 14px",
    borderRadius: 20,
    border: "1px solid rgba(0,229,255,0.25)",
    marginBottom: 16,
  },
  title: {
    fontSize: "clamp(32px, 6vw, 52px)",
    fontWeight: 800,
    letterSpacing: -1,
    margin: "0 0 10px",
    lineHeight: 1.1,
    color: "#f8fafc",
  },
  titleAccent: {
    color: "#00e5ff",
  },
  subtitle: {
    color: "#64748b",
    fontSize: 15,
    margin: "0 auto 24px",
    maxWidth: 400,
    lineHeight: 1.6,
  },
  divider: {
    width: 48,
    height: 3,
    background: "linear-gradient(90deg, #00e5ff, #7c3aed)",
    borderRadius: 2,
    margin: "0 auto",
  },
  sectionLabel: {
    fontSize: 11,
    letterSpacing: 3,
    color: "#475569",
    fontWeight: 700,
    marginBottom: 20,
    marginTop: 0,
  },
  stepsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: 14,
    marginBottom: 40,
    position: "relative",
    zIndex: 1,
  },
  stepCard: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 16,
    padding: "22px 20px 18px",
    cursor: "default",
    position: "relative",
    overflow: "hidden",
    backdropFilter: "blur(4px)",
  },
  stepNum: {
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: 1,
    fontVariantNumeric: "tabular-nums",
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: 700,
    marginBottom: 8,
    transition: "color 0.25s",
  },
  stepDesc: {
    fontSize: 13,
    color: "#64748b",
    lineHeight: 1.6,
    margin: 0,
  },
  stepBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: 2,
    width: "100%",
    transition: "opacity 0.3s",
    borderRadius: "0 0 16px 16px",
  },
  notesBox: {
    background: "rgba(16,185,129,0.06)",
    border: "1px solid rgba(16,185,129,0.18)",
    borderRadius: 16,
    padding: "24px 28px",
    marginBottom: 40,
    position: "relative",
    zIndex: 1,
  },
  notesHeader: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
  },
  notesIcon: { fontSize: 20 },
  notesTitleText: {
    fontSize: 15,
    fontWeight: 700,
    color: "#10b981",
    letterSpacing: 0.3,
  },
  notesList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  noteItem: {
    display: "flex",
    gap: 10,
    fontSize: 13.5,
    color: "#94a3b8",
    lineHeight: 1.55,
  },
  noteDot: {
    color: "#10b981",
    marginTop: 1,
    flexShrink: 0,
  },
  warningGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: 14,
    marginBottom: 14,
    position: "relative",
    zIndex: 1,
  },
  warningCard: {
    background: "rgba(239,68,68,0.06)",
    border: "1px solid rgba(239,68,68,0.2)",
    borderRadius: 14,
    padding: "20px 18px",
    textAlign: "center",
  },
  warningValue: {
    fontSize: 32,
    fontWeight: 900,
    color: "#ef4444",
    lineHeight: 1,
    marginBottom: 4,
  },
  warningLabel: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 2,
    color: "#ef4444",
    marginBottom: 10,
    textTransform: "uppercase",
  },
  warningDesc: {
    fontSize: 12.5,
    color: "#64748b",
    lineHeight: 1.55,
    margin: 0,
  },
  warningFooter: {
    fontSize: 12,
    color: "#ef444488",
    background: "rgba(239,68,68,0.05)",
    border: "1px solid rgba(239,68,68,0.12)",
    borderRadius: 10,
    padding: "10px 16px",
    marginBottom: 40,
    position: "relative",
    zIndex: 1,
  },
  contactBox: {
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 16,
    padding: "28px 28px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    marginBottom: 40,
    position: "relative",
    zIndex: 1,
  },
  contactLeft: {},
  contactTitle: {
    fontSize: 22,
    fontWeight: 800,
    margin: "4px 0 4px",
    color: "#f1f5f9",
  },
  contactSub: {
    color: "#475569",
    fontSize: 13,
    margin: 0,
  },
  contactRight: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  contactRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  contactIcon: {
    fontSize: 16,
    width: 30,
    height: 30,
    background: "rgba(255,255,255,0.05)",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    lineHeight: "30px",
  },
  contactValue: {
    fontSize: 13.5,
    color: "#94a3b8",
    fontWeight: 500,
  },
  footer: {
    textAlign: "center",
    color: "#1e293b",
    fontSize: 12,
    position: "relative",
    zIndex: 1,
  },
};