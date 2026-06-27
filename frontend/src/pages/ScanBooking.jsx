
// // // //src/pages/ScanBooking.jsx
// // // import { useQuery } from "@apollo/client/react";
// // // import { GET_BOOKINGS } from "../graphql/queries";
// // // import { QRCodeSVG } from "qrcode.react";

// // // export default function ScanBookings() {

// // //   const { loading, error, data } = useQuery(GET_BOOKINGS);

// // //   if (loading) return <p>Loading...</p>;
// // //   if (error) return <p>Error loading bookings</p>;

// // //   if (!data?.scanBookings?.length) {
// // //     return <p>No bookings found</p>;
// // //   }

// // //   return (
// // //     <div>
// // //       <h2>Booking Details</h2>

// // //       {data.scanBookings.map((booking) => {

// // //         // Timestamp → readable date
// // //         const fromTime = new Date(Number(booking.fromTime)).toLocaleString("en-IN", {
// // //           day: "numeric",
// // //           month: "short",
// // //           year: "numeric",
// // //           hour: "2-digit",
// // //           minute: "2-digit"
// // //         });

// // //         const toTime = new Date(Number(booking.toTime)).toLocaleString("en-IN", {
// // //           day: "numeric",
// // //           month: "short",
// // //           year: "numeric",
// // //           hour: "2-digit",
// // //           minute: "2-digit"
// // //         });

// // //         const qrData = `BOOKING DETAILS
// // // Slot: ${booking.slot.slotNumber}
// // // From: ${fromTime}
// // // To: ${toTime}`;

// // //         return (
// // //           <div
// // //             key={booking.id}
// // //             style={{
// // //               border: "1px solid #ddd",
// // //               padding: "20px",
// // //               marginBottom: "20px",
// // //               textAlign: "center"
// // //             }}
// // //           >
// // //             <p><strong>Slot:</strong> {booking.slot.slotNumber}</p>
// // //             <p><strong>From:</strong> {fromTime}</p>
// // //             <p><strong>To:</strong> {toTime}</p>

// // //             <QRCodeSVG
// // //               value={qrData}
// // //               size={200}
// // //               level="H"
// // //               includeMargin={true}
// // //             />

// // //             <p style={{ fontSize: "12px", color: "#666" }}>
// // //               Scan to see booking details
// // //             </p>
// // //           </div>
// // //         );
// // //       })}
// // //     </div>
// // //   );
// // // }




// // // jo scan booking hai mia yee chata hu ki jo QR code hia deakh rha hia koi bhu uss qr code ko phone ke camera se scan kare or jese hi scan kare toh ussme Text:xxxxxxx kuch kuch aa rha hai id se toh vo na aake booking slot number or time kab se kab tkk hai bss vhi deakhe




// // import { useQuery } from "@apollo/client/react";
// // import { GET_BOOKINGS } from "../graphql/queries";
// // import { QRCodeSVG } from "qrcode.react";

// // export default function ScanBookings() {
// //   const { loading, error, data } = useQuery(GET_BOOKINGS, {
// //     fetchPolicy: "network-only", // always fresh data
// //     context: {
// //       credentials: "include",   // ✅ FIX: send cookies with Apollo too
// //     },
// //   });

// //   /* ---------- STATES ---------- */
// //   if (loading) return (
// //     <div style={s.center}>
// //       <div style={s.spinner} />
// //       <p style={s.loadingText}>Fetching your bookings…</p>
// //     </div>
// //   );

// //   if (error) return (
// //     <div style={s.errorBox}>
// //       <span style={s.errorIcon}>⚠</span>
// //       <p style={s.errorTitle}>Could not load bookings</p>
// //       <p style={s.errorMsg}>{error.message}</p>
// //       <p style={s.errorHint}>
// //         Make sure you are logged in and the backend is running on{" "}
// //         <code style={s.code}>localhost:5000</code>.
// //       </p>
// //     </div>
// //   );

// //   if (!data?.scanBookings?.length) return (
// //     <div style={s.center}>
// //       <span style={{ fontSize: 52 }}>🅿️</span>
// //       <p style={s.emptyTitle}>No Bookings Found</p>
// //       <p style={s.emptyMsg}>You have no active or past bookings yet.</p>
// //     </div>
// //   );

// //   /* ---------- MAIN ---------- */
// //   return (
// //     <div style={s.root}>
// //       {/* Header */}
// //       <div style={s.header}>
// //         <span style={s.badge}>QR TICKETS</span>
// //         <h2 style={s.heading}>
// //           Your <span style={s.accent}>Bookings</span>
// //         </h2>
// //         <p style={s.sub}>Scan the QR code at the gate for entry &amp; exit.</p>
// //         <div style={s.divider} />
// //       </div>

// //       {/* Cards */}
// //       <div style={s.grid}>
// //         {data.scanBookings.map((booking, idx) => {
// //           const fromTime = new Date(Number(booking.fromTime)).toLocaleString("en-IN", {
// //             day: "numeric", month: "short", year: "numeric",
// //             hour: "2-digit", minute: "2-digit",
// //           });
// //           const toTime = new Date(Number(booking.toTime)).toLocaleString("en-IN", {
// //             day: "numeric", month: "short", year: "numeric",
// //             hour: "2-digit", minute: "2-digit",
// //           });

// //           const qrData = `BOOKING DETAILS\nSlot: ${booking.slot.slotNumber}\nFrom: ${fromTime}\nTo: ${toTime}`;

// //           return (
// //             <div
// //               key={booking.id}
// //               style={{
// //                 ...s.card,
// //                 animationDelay: `${idx * 0.08}s`,
// //               }}
// //             >
// //               {/* Slot badge */}
// //               <div style={s.cardTop}>
// //                 <div style={s.slotBadge}>
// //                   <span style={s.slotIcon}>🅿</span>
// //                   <span style={s.slotNum}>{booking.slot.slotNumber}</span>
// //                 </div>
// //                 <span style={s.statusPill}>Active</span>
// //               </div>

// //               {/* Time info */}
// //               <div style={s.timeGrid}>
// //                 <div style={s.timeBlock}>
// //                   <span style={s.timeLabel}>FROM</span>
// //                   <span style={s.timeValue}>{fromTime}</span>
// //                 </div>
// //                 <div style={s.timeArrow}>→</div>
// //                 <div style={s.timeBlock}>
// //                   <span style={s.timeLabel}>TO</span>
// //                   <span style={s.timeValue}>{toTime}</span>
// //                 </div>
// //               </div>

// //               {/* Dashed separator */}
// //               <div style={s.dash} />

// //               {/* QR */}
// //               <div style={s.qrWrap}>
// //                 <div style={s.qrFrame}>
// //                   <QRCodeSVG
// //                     value={qrData}
// //                     size={180}
// //                     level="H"
// //                     bgColor="transparent"
// //                     fgColor="#00e5ff"
// //                     includeMargin={false}
// //                   />
// //                 </div>
// //                 <p style={s.qrHint}>Show this QR at the parking gate</p>
// //               </div>

// //               {/* Booking ID */}
// //               <div style={s.bookingIdRow}>
// //                 <span style={s.bookingIdLabel}>Booking ID</span>
// //                 <code style={s.bookingIdVal}>{booking.id}</code>
// //               </div>
// //             </div>
// //           );
// //         })}
// //       </div>

// //       <style>{`
// //         @keyframes fadeUp {
// //           from { opacity: 0; transform: translateY(24px); }
// //           to   { opacity: 1; transform: translateY(0); }
// //         }
// //         @keyframes spin {
// //           to { transform: rotate(360deg); }
// //         }
// //       `}</style>
// //     </div>
// //   );
// // }

// // /* ============ STYLES ============ */
// // const s = {
// //   root: {
// //     background: "#080c14",
// //     minHeight: "60vh",
// //     padding: "36px 16px 60px",
// //     fontFamily: "'Segoe UI', system-ui, sans-serif",
// //     color: "#e2e8f0",
// //   },
// //   header: {
// //     textAlign: "center",
// //     marginBottom: 40,
// //   },
// //   badge: {
// //     display: "inline-block",
// //     background: "rgba(0,229,255,0.10)",
// //     color: "#00e5ff",
// //     fontSize: 10,
// //     fontWeight: 700,
// //     letterSpacing: 3,
// //     padding: "4px 14px",
// //     borderRadius: 20,
// //     border: "1px solid rgba(0,229,255,0.25)",
// //     marginBottom: 14,
// //   },
// //   heading: {
// //     fontSize: "clamp(26px,5vw,42px)",
// //     fontWeight: 800,
// //     letterSpacing: -0.5,
// //     margin: "0 0 8px",
// //     color: "#f8fafc",
// //   },
// //   accent: { color: "#00e5ff" },
// //   sub: {
// //     color: "#64748b",
// //     fontSize: 14,
// //     margin: "0 0 20px",
// //   },
// //   divider: {
// //     width: 44,
// //     height: 3,
// //     background: "linear-gradient(90deg,#00e5ff,#7c3aed)",
// //     borderRadius: 2,
// //     margin: "0 auto",
// //   },
// //   grid: {
// //     display: "grid",
// //     gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
// //     gap: 20,
// //     maxWidth: 900,
// //     margin: "0 auto",
// //   },
// //   card: {
// //     background: "rgba(255,255,255,0.03)",
// //     border: "1px solid rgba(255,255,255,0.08)",
// //     borderRadius: 20,
// //     padding: "24px 22px",
// //     animation: "fadeUp 0.45s ease both",
// //     backdropFilter: "blur(6px)",
// //   },
// //   cardTop: {
// //     display: "flex",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     marginBottom: 18,
// //   },
// //   slotBadge: {
// //     display: "flex",
// //     alignItems: "center",
// //     gap: 8,
// //     background: "rgba(0,229,255,0.08)",
// //     border: "1px solid rgba(0,229,255,0.2)",
// //     borderRadius: 10,
// //     padding: "6px 12px",
// //   },
// //   slotIcon: { fontSize: 16 },
// //   slotNum: {
// //     fontWeight: 800,
// //     fontSize: 16,
// //     color: "#00e5ff",
// //     letterSpacing: 0.5,
// //   },
// //   statusPill: {
// //     fontSize: 11,
// //     fontWeight: 700,
// //     letterSpacing: 1.5,
// //     color: "#10b981",
// //     background: "rgba(16,185,129,0.1)",
// //     border: "1px solid rgba(16,185,129,0.25)",
// //     padding: "4px 10px",
// //     borderRadius: 20,
// //   },
// //   timeGrid: {
// //     display: "flex",
// //     alignItems: "center",
// //     gap: 10,
// //     marginBottom: 20,
// //   },
// //   timeBlock: {
// //     flex: 1,
// //     background: "rgba(255,255,255,0.04)",
// //     borderRadius: 10,
// //     padding: "10px 12px",
// //   },
// //   timeLabel: {
// //     display: "block",
// //     fontSize: 9,
// //     fontWeight: 700,
// //     letterSpacing: 2,
// //     color: "#475569",
// //     marginBottom: 4,
// //   },
// //   timeValue: {
// //     display: "block",
// //     fontSize: 12.5,
// //     color: "#cbd5e1",
// //     fontWeight: 600,
// //     lineHeight: 1.4,
// //   },
// //   timeArrow: {
// //     color: "#334155",
// //     fontSize: 18,
// //     flexShrink: 0,
// //   },
// //   dash: {
// //     borderTop: "1px dashed rgba(255,255,255,0.08)",
// //     marginBottom: 20,
// //   },
// //   qrWrap: {
// //     display: "flex",
// //     flexDirection: "column",
// //     alignItems: "center",
// //     gap: 10,
// //     marginBottom: 18,
// //   },
// //   qrFrame: {
// //     background: "rgba(0,0,0,0.4)",
// //     border: "1px solid rgba(0,229,255,0.15)",
// //     borderRadius: 14,
// //     padding: 16,
// //     boxShadow: "0 0 40px rgba(0,229,255,0.07)",
// //   },
// //   qrHint: {
// //     fontSize: 11.5,
// //     color: "#475569",
// //     margin: 0,
// //     letterSpacing: 0.3,
// //   },
// //   bookingIdRow: {
// //     display: "flex",
// //     alignItems: "center",
// //     justifyContent: "space-between",
// //     background: "rgba(255,255,255,0.03)",
// //     border: "1px solid rgba(255,255,255,0.06)",
// //     borderRadius: 8,
// //     padding: "8px 12px",
// //   },
// //   bookingIdLabel: {
// //     fontSize: 10,
// //     fontWeight: 700,
// //     letterSpacing: 1.5,
// //     color: "#475569",
// //   },
// //   bookingIdVal: {
// //     fontSize: 11,
// //     color: "#7c3aed",
// //     fontFamily: "monospace",
// //     wordBreak: "break-all",
// //     maxWidth: "70%",
// //     textAlign: "right",
// //   },
// //   center: {
// //     display: "flex",
// //     flexDirection: "column",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     minHeight: "40vh",
// //     gap: 12,
// //     color: "#64748b",
// //     fontFamily: "'Segoe UI', system-ui, sans-serif",
// //   },
// //   spinner: {
// //     width: 40,
// //     height: 40,
// //     border: "3px solid rgba(0,229,255,0.15)",
// //     borderTop: "3px solid #00e5ff",
// //     borderRadius: "50%",
// //     animation: "spin 0.8s linear infinite",
// //   },
// //   loadingText: { fontSize: 14, color: "#475569", margin: 0 },
// //   errorBox: {
// //     maxWidth: 420,
// //     margin: "60px auto",
// //     background: "rgba(239,68,68,0.06)",
// //     border: "1px solid rgba(239,68,68,0.2)",
// //     borderRadius: 16,
// //     padding: "32px 28px",
// //     textAlign: "center",
// //     fontFamily: "'Segoe UI', system-ui, sans-serif",
// //   },
// //   errorIcon: { fontSize: 36 },
// //   errorTitle: { fontSize: 18, fontWeight: 700, color: "#ef4444", margin: "10px 0 6px" },
// //   errorMsg: { fontSize: 13, color: "#94a3b8", margin: "0 0 12px" },
// //   errorHint: { fontSize: 12, color: "#64748b", lineHeight: 1.6, margin: 0 },
// //   code: {
// //     background: "rgba(255,255,255,0.08)",
// //     padding: "1px 6px",
// //     borderRadius: 4,
// //     fontFamily: "monospace",
// //     color: "#00e5ff",
// //   },
// //   emptyTitle: { fontSize: 18, fontWeight: 700, color: "#334155", margin: "8px 0 4px" },
// //   emptyMsg: { fontSize: 13, color: "#475569", margin: 0 },
// // };













// import { useQuery } from "@apollo/client/react";
// import { GET_BOOKINGS } from "../graphql/queries";
// import { QRCodeSVG } from "qrcode.react";

// export default function ScanBookings() {
//   // context: credentials hataya gaya hai taaki standard token flow chale
//   const { loading, error, data, refetch } = useQuery(GET_BOOKINGS, {
//     fetchPolicy: "cache-and-network", 
//   });

//   /* ---------- HELPER: Format Date ---------- */
//   const formatTime = (timeStr) => {
//     const d = new Date(Number(timeStr));
//     if (isNaN(d.getTime())) return "Invalid Time";
//     return d.toLocaleString("en-IN", {
//       day: "numeric", month: "short",
//       hour: "2-digit", minute: "2-digit",
//     });
//   };

//   /* ---------- STATES ---------- */
//   if (loading) return (
//     <div style={s.center}>
//       <div style={s.spinner} />
//       <p style={s.loadingText}>Fetching your bookings…</p>
//     </div>
//   );

//   if (error) return (
//     <div style={s.errorBox}>
//       <span style={s.errorIcon}>⚠</span>
//       <p style={s.errorTitle}>Could not load bookings</p>
//       <p style={s.errorMsg}>{error.message}</p>
//       <button style={s.retryBtn} onClick={() => refetch()}>Retry</button>
//     </div>
//   );

//   if (!data?.scanBookings?.length) return (
//     <div style={s.center}>
//       <span style={{ fontSize: 52 }}>🅿️</span>
//       <p style={s.emptyTitle}>No Bookings Found</p>
//       <p style={s.emptyMsg}>You have no active bookings yet.</p>
//     </div>
//   );

//   /* ---------- MAIN ---------- */
//   return (
//     <div style={s.root}>
//       <div style={s.header}>
//         <span style={s.badge}>LIVE TICKETS</span>
//         <h2 style={s.heading}>Booking <span style={s.accent}>Details</span></h2>
//         <div style={s.divider} />
//       </div>

//       <div style={s.grid}>
//         {data.scanBookings.map((booking, idx) => {
//           const from = formatTime(booking.fromTime);
//           const to = formatTime(booking.toTime);

//           // EXACT REQUIREMENT: QR scanning will show only this text
//           const qrData = `PARKING SLOT: ${booking.slot.slotNumber}\nFROM: ${from}\nTO: ${to}`;

//           return (
//             <div key={booking.id} style={{ ...s.card, animationDelay: `${idx * 0.08}s` }}>

//               <div style={s.cardTop}>
//                 <div style={s.slotBadge}>
//                   <span style={s.slotIcon}>🅿</span>
//                   <span style={s.slotNum}>{booking.slot.slotNumber}</span>
//                 </div>
//                 <span style={s.statusPill}>Confirmed</span>
//               </div>

//               <div style={s.timeGrid}>
//                 <div style={s.timeBlock}>
//                   <span style={s.timeLabel}>ARRIVAL</span>
//                   <span style={s.timeValue}>{from}</span>
//                 </div>
//                 <div style={s.timeArrow}>→</div>
//                 <div style={s.timeBlock}>
//                   <span style={s.timeLabel}>EXIT</span>
//                   <span style={s.timeValue}>{to}</span>
//                 </div>
//               </div>

//               <div style={s.dash} />

//               <div style={s.qrWrap}>
//                 <div style={s.qrFrame}>
//                   <QRCodeSVG
//                     value={qrData}
//                     size={180}
//                     level="H"
//                     bgColor="transparent"
//                     fgColor="#00e5ff"
//                   />
//                 </div>
//                 <p style={s.qrHint}>Scan for Slot & Time Info</p>
//               </div>

//               <div style={s.bookingIdRow}>
//                 <span style={s.bookingIdLabel}>REF ID</span>
//                 <code style={s.bookingIdVal}>{booking.id.slice(-8).toUpperCase()}</code>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       <style>{`
//         @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
//         @keyframes spin { to { transform: rotate(360deg); } }
//       `}</style>
//     </div>
//   );
// }

// const s = {
//   root: { background: "#080c14", minHeight: "100vh", padding: "40px 16px", fontFamily: "sans-serif", color: "#e2e8f0" },
//   header: { textAlign: "center", marginBottom: 40 },
//   badge: { display: "inline-block", background: "rgba(0,229,255,0.1)", color: "#00e5ff", fontSize: 10, fontWeight: 700, letterSpacing: 2, padding: "4px 12px", borderRadius: 20, marginBottom: 10 },
//   heading: { fontSize: "32px", fontWeight: 800, margin: 0, color: "#f8fafc" },
//   accent: { color: "#00e5ff" },
//   divider: { width: 40, height: 3, background: "#00e5ff", borderRadius: 2, margin: "15px auto" },
//   grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20, maxWidth: 1000, margin: "0 auto" },
//   card: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: "24px", animation: "fadeUp 0.5s ease both" },
//   cardTop: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
//   slotBadge: { display: "flex", alignItems: "center", gap: 8, background: "rgba(0,229,255,0.06)", border: "1px solid rgba(0,229,255,0.15)", borderRadius: 12, padding: "6px 14px" },
//   slotNum: { fontWeight: 800, fontSize: 16, color: "#00e5ff" },
//   statusPill: { fontSize: 10, fontWeight: 700, color: "#10b981", background: "rgba(16,185,129,0.1)", padding: "4px 10px", borderRadius: 20 },
//   timeGrid: { display: "flex", alignItems: "center", gap: 10, marginBottom: 20 },
//   timeBlock: { flex: 1, background: "rgba(255,255,255,0.02)", borderRadius: 12, padding: "10px" },
//   timeLabel: { display: "block", fontSize: 9, color: "#64748b", marginBottom: 4, fontWeight: 700 },
//   timeValue: { display: "block", fontSize: 12, color: "#cbd5e1", fontWeight: 600 },
//   timeArrow: { color: "#1e293b", fontSize: 16 },
//   dash: { borderTop: "1px dashed rgba(255,255,255,0.1)", marginBottom: 20 },
//   qrWrap: { display: "flex", flexDirection: "column", alignItems: "center", gap: 15 },
//   qrFrame: { background: "rgba(0,0,0,0.4)", border: "1px solid rgba(0,229,255,0.1)", borderRadius: 20, padding: "15px" },
//   qrHint: { fontSize: 11, color: "#475569" },
//   bookingIdRow: { display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 15, background: "rgba(255,255,255,0.02)", padding: "8px 12px", borderRadius: 10 },
//   bookingIdLabel: { fontSize: 9, fontWeight: 700, color: "#334155" },
//   bookingIdVal: { fontSize: 11, color: "#7c3aed", fontFamily: "monospace" },
//   center: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "50vh", color: "#64748b" },
//   spinner: { width: 32, height: 32, border: "3px solid rgba(0,229,255,0.1)", borderTop: "3px solid #00e5ff", borderRadius: "50%", animation: "spin 0.8s linear infinite" },
//   errorBox: { textAlign: "center", padding: "40px", background: "rgba(239,68,68,0.05)", borderRadius: 20, margin: "40px auto", maxWidth: "400px" },
//   errorTitle: { color: "#ef4444", fontWeight: 700, margin: "10px 0" },
//   retryBtn: { marginTop: 15, padding: "8px 20px", background: "#00e5ff", border: "none", borderRadius: 8, color: "#000", fontWeight: 700, cursor: "pointer" }
// };






import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

export default function ScanBooking() {
  const [bookings, setBookings] = useState([]);
  const [loadingState, setLoadingState] = useState("loading");
  const token = sessionStorage.getItem("token");

  const formatDate = (time) => {
    if (!time) return "—";
    const d = new Date(Number(time) || time);
    return d.toLocaleString("en-IN", {
      day: "numeric", month: "short", hour: "2-digit", minute: "2-digit"
    });
  };

  const isPast = (time) => {
    if (!time) return false;
    return new Date(Number(time) || time) < new Date();
  };

  useEffect(() => {
    const fetchBookings = async () => {
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
        if (data.data) {
          setBookings(data.data.myBookings || []);
          setLoadingState("done");
        } else { setLoadingState("error"); }
      } catch { setLoadingState("error"); }
    };
    fetchBookings();
  }, [token]);

  // Filter bookings into two categories
  const todayBookings = bookings.filter(b => !isPast(b.toTime));
  const previousBookings = bookings.filter(b => isPast(b.toTime));

  if (loadingState === "loading") return (
    <div style={s.center}>
      <div style={s.spinner} />
      <p style={{ color: "#64748b", marginTop: 10 }}>Loading tickets...</p>
    </div>
  );

  /* --- Sub-Component for individual cards --- */
  const RenderCard = ({ b, past }) => {
    const qrValue = `SLOT: ${b.slot?.slotNumber}\nFROM: ${formatDate(b.fromTime)}\nTO: ${formatDate(b.toTime)}`;

    return (
      <div style={{ ...s.card, opacity: past ? 0.6 : 1 }}>
        <div style={s.cardTop}>
          <div style={s.slotBadge}>
            <span>🅿</span>
            <span style={s.slotNum}>{b.slot?.slotNumber ?? "—"}</span>
          </div>
          <span style={{ ...s.pill, ...(past ? s.pillPast : s.pillActive) }}>
            {past ? "Expired" : "Active"}
          </span>
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
              <QRCodeSVG value={qrValue} size={150} bgColor="transparent" fgColor="#00e5ff" level="H" />
            </div>
            <p style={s.qrHint}>Scan at gate</p>
          </div>
        ) : (
          <div style={s.expiredBox}>
            <span style={{ fontSize: 20 }}>🔒</span>
            <p style={{ color: "#475569", fontSize: 12, margin: 0 }}>QR Expired</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={s.root}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>

      {/* TODAY'S SECTION */}
      <div style={s.sectionHeader}>
        <h3 style={s.sectionTitle}>📅 Today's Bookings</h3>
        <div style={s.line} />
      </div>
      <div style={s.grid}>
        {todayBookings.length > 0 ? (
          todayBookings.map((b) => <RenderCard key={b.id} b={b} past={false} />)
        ) : (
          <p style={s.none}>No active bookings for today.</p>
        )}
      </div>

      {/* PREVIOUS SECTION */}
      <div style={{ ...s.sectionHeader, marginTop: 50 }}>
        <h3 style={s.sectionTitle}>🕒 Previous Bookings</h3>
        <div style={s.line} />
      </div>
      <div style={s.grid}>
        {previousBookings.length > 0 ? (
          previousBookings.map((b) => <RenderCard key={b.id} b={b} past={true} />)
        ) : (
          <p style={s.none}>No past history found.</p>
        )}
      </div>
    </div>
  );
}

const s = {
  root: { background: "#080c14", minHeight: "100vh", padding: "40px 20px", fontFamily: "'Segoe UI', sans-serif" },
  center: { display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "50vh" },
  spinner: { width: 30, height: 30, border: "3px solid rgba(0,229,255,0.1)", borderTop: "3px solid #00e5ff", borderRadius: "50%", animation: "spin 0.8s linear infinite" },
  sectionHeader: { marginBottom: 25 },
  sectionTitle: { fontSize: 20, fontWeight: 700, color: "#f8fafc", marginBottom: 8 },
  line: { width: 40, height: 3, background: "#00e5ff", borderRadius: 2 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 },
  card: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "20px", transition: "0.3s" },
  cardTop: { display: "flex", justifyContent: "space-between", marginBottom: 15 },
  slotBadge: { display: "flex", alignItems: "center", gap: 8, background: "rgba(0,229,255,0.06)", padding: "5px 12px", borderRadius: 10, border: "1px solid rgba(0,229,255,0.15)" },
  slotNum: { color: "#00e5ff", fontWeight: 800, fontSize: 15 },
  pill: { fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 20 },
  pillActive: { background: "rgba(16,185,129,0.1)", color: "#10b981", border: "1px solid rgba(16,185,129,0.3)" },
  pillPast: { background: "rgba(100,116,139,0.1)", color: "#64748b", border: "1px solid rgba(100,116,139,0.2)" },
  timeGrid: { display: "flex", alignItems: "center", gap: 10, marginBottom: 15 },
  timeBlock: { flex: 1, background: "rgba(255,255,255,0.02)", padding: "8px", borderRadius: 10 },
  timeLabel: { display: "block", fontSize: 8, color: "#475569", fontWeight: 700, letterSpacing: 1, marginBottom: 4 },
  timeVal: { fontSize: 11, color: "#cbd5e1", fontWeight: 600 },
  arrow: { color: "#1e293b" },
  dash: { borderTop: "1px dashed rgba(255,255,255,0.08)", marginBottom: 15 },
  qrWrap: { display: "flex", flexDirection: "column", alignItems: "center" },
  qrFrame: { background: "rgba(0,0,0,0.3)", padding: "12px", borderRadius: 15, border: "1px solid rgba(0,229,255,0.1)" },
  qrHint: { fontSize: 10, color: "#475569", marginTop: 10 },
  expiredBox: { textAlign: "center", padding: "15px", background: "rgba(255,255,255,0.02)", borderRadius: 12 },
  none: { color: "#475569", fontSize: 14, fontStyle: "italic" }
};