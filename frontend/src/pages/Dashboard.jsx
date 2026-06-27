
// // import { useEffect, useState } from "react";
// // import Booking from "./Booking";
// // import MyBookingId from "./MyBookingId";
// // import ScanBookings from "./ScanBooking";
// // import Help from "./Help";

// // import {
// //   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
// //   ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend
// // } from "recharts";

// // const TABS = [
// //   { id: "analytics", label: "📊 Analytics" },
// //   { id: "booking", label: "🅿️ Booking" },
// //   { id: "myBookingId", label: "🪪 My Booking ID" },
// //   { id: "scan", label: "📲 Scan QR" },
// //   { id: "help", label: "❓ Help" },
// // ];

// // const STAT_DEFS = (stats, available) => [
// //   { label: "TOTAL SLOTS", value: stats.totalSlots, accent: "#00e5ff" },
// //   { label: "OCCUPIED", value: stats.occupiedSlots, accent: "#ef4444" },
// //   { label: "AVAILABLE", value: available, accent: "#10b981" },
// //   { label: "BOOKINGS", value: stats.totalBookings, accent: "#f59e0b" },
// //   { label: "TOTAL VEHICLES", value: stats.totalCars + stats.totalBikes, accent: "#7c3aed" },
// // ];

// // export default function Dashboard() {
// //   const userEmail = localStorage.getItem("email");
// //   const [stats, setStats] = useState(null);
// //   const [activeTab, setActiveTab] = useState("analytics");
// //   const [availableSlots, setAvailableSlots] = useState([]);
// //   const [selectedSlot, setSelectedSlot] = useState("");

// //   const fetchStats = () =>
// //     fetch("http://localhost:5000/graphql", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       credentials: "include",
// //       body: JSON.stringify({
// //         query: `query {
// //           dashboardStats { totalSlots occupiedSlots totalBookings totalCars totalBikes }
// //           bookingAnalytics { date count }
// //         }`
// //       })
// //     })
// //       .then(r => r.json())
// //       .then(d => setStats({ ...d.data.dashboardStats, analytics: d.data.bookingAnalytics }));

// //   const fetchAvailableSlots = async () => {
// //     try {
// //       const res = await fetch("http://localhost:5000/graphql", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         credentials: "include",
// //         body: JSON.stringify({ query: `query { availableSlots { id slotNumber type } }` })
// //       });
// //       const d = await res.json();
// //       setAvailableSlots(d.data.availableSlots || []);
// //     } catch (e) { console.error(e); }
// //   };

// //   useEffect(() => { fetchStats(); fetchAvailableSlots(); }, []);

// //   if (!stats) return (
// //     <div style={s.loadingScreen}>
// //       <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
// //       <div style={s.spinner} />
// //       <span>Loading dashboard…</span>
// //     </div>
// //   );

// //   const availableCount = stats.totalSlots - stats.occupiedSlots;
// //   const barData = [{ name: "Cars", value: stats.totalCars }, { name: "Bikes", value: stats.totalBikes }];
// //   const pieData = [{ name: "Occupied", value: stats.occupiedSlots }, { name: "Available", value: availableCount }];
// //   const ttStyle = { background: "#0f172a", border: "1px solid #1e293b", borderRadius: 8, color: "#e2e8f0", fontSize: 12 };
// //   const axTick = { fill: "#475569", fontSize: 11 };

// //   return (
// //     <div style={s.root}>
// //       <style>{`
// //         @keyframes spin    { to { transform: rotate(360deg); } }
// //         @keyframes fadeUp  { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
// //         ::-webkit-scrollbar { display: none; }
// //         button:hover { opacity: 0.85; }
// //       `}</style>

// //       {/* ── Topbar ── */}
// //       <header style={s.topbar}>
// //         <div style={s.logo}>🅿 Park<span style={{ color: "#00e5ff" }}>Smart</span></div>
// //         {userEmail && <span style={s.emailChip}>{userEmail}</span>}
// //       </header>

// //       {/* ── Hero ── */}
// //       <div style={s.hero}>
// //         <span style={s.heroBadge}>ADMIN PANEL</span>
// //         <h1 style={s.heroTitle}>Parking <span style={{ color: "#00e5ff" }}>Dashboard</span></h1>
// //         <p style={s.heroSub}>Real-time slot management &amp; booking overview</p>
// //       </div>

// //       {/* ── Tabs ── */}
// //       <div style={s.tabBar}>
// //         {TABS.map(t => (
// //           <button
// //             key={t.id}
// //             style={{
// //               ...s.tabBtn,
// //               ...(activeTab === t.id ? s.tabActive : {}),
// //             }}
// //             onClick={() => setActiveTab(t.id)}
// //           >
// //             {t.label}
// //           </button>
// //         ))}
// //       </div>

// //       <div style={s.content}>

// //         {/* ── ANALYTICS ── */}
// //         {activeTab === "analytics" && (
// //           <div style={{ animation: "fadeUp 0.4s ease both" }}>

// //             {/* Stat cards */}
// //             <div style={s.statsGrid}>
// //               {STAT_DEFS(stats, availableCount).map((c, i) => (
// //                 <div key={i} style={s.statCard}>
// //                   <div style={{ ...s.statAccent, background: c.accent }} />
// //                   <span style={s.statLabel}>{c.label}</span>
// //                   <span style={{ ...s.statValue, color: c.accent }}>{c.value}</span>
// //                 </div>
// //               ))}
// //             </div>

// //             {/* Charts */}
// //             <div style={s.chartsGrid}>
// //               <div style={s.chartBox}>
// //                 <p style={s.chartTitle}>Daily Booking Trend</p>
// //                 <ResponsiveContainer width="100%" height={240}>
// //                   <LineChart data={stats.analytics}>
// //                     <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
// //                     <XAxis dataKey="date" stroke="#1e293b" tick={axTick} />
// //                     <YAxis stroke="#1e293b" tick={axTick} />
// //                     <Tooltip contentStyle={ttStyle} />
// //                     <Line type="monotone" dataKey="count" stroke="#00e5ff" strokeWidth={3} dot={{ r: 4, fill: "#00e5ff" }} />
// //                   </LineChart>
// //                 </ResponsiveContainer>
// //               </div>

// //               <div style={s.chartBox}>
// //                 <p style={s.chartTitle}>Vehicle Distribution</p>
// //                 <ResponsiveContainer width="100%" height={240}>
// //                   <BarChart data={barData}>
// //                     <CartesianGrid stroke="#1e293b" />
// //                     <XAxis dataKey="name" stroke="#1e293b" tick={axTick} />
// //                     <YAxis stroke="#1e293b" tick={axTick} />
// //                     <Tooltip contentStyle={ttStyle} />
// //                     <Bar dataKey="value" radius={[8, 8, 0, 0]}>
// //                       <Cell fill="#06b6d4" />
// //                       <Cell fill="#8b5cf6" />
// //                     </Bar>
// //                   </BarChart>
// //                 </ResponsiveContainer>
// //               </div>

// //               <div style={s.chartBox}>
// //                 <p style={s.chartTitle}>Slot Usage Ratio</p>
// //                 <ResponsiveContainer width="100%" height={240}>
// //                   <PieChart>
// //                     <Pie data={pieData} dataKey="value" innerRadius={60} outerRadius={90}>
// //                       <Cell fill="#6366f1" />
// //                       <Cell fill="#00e5ff" />
// //                     </Pie>
// //                     <Tooltip contentStyle={ttStyle} />
// //                     <Legend wrapperStyle={{ color: "#64748b", fontSize: 12 }} />
// //                   </PieChart>
// //                 </ResponsiveContainer>
// //               </div>
// //             </div>

// //             {/* Available Slots */}
// //             <p style={s.sectionLabel}>AVAILABLE PARKING SPOTS</p>
// //             {availableSlots.length === 0
// //               ? <p style={{ color: "#334155", fontSize: 14 }}>No slots available right now.</p>
// //               : (
// //                 <div style={s.slotsGrid}>
// //                   {availableSlots.map(slot => (
// //                     <div key={slot.id} style={s.slotCard}>
// //                       <div style={s.slotRow}>
// //                         <span style={s.slotNum}>{slot.slotNumber}</span>
// //                         <span style={s.slotPill}>FREE</span>
// //                       </div>
// //                       <p style={s.slotType}>{slot.type}</p>
// //                       <button
// //                         style={s.bookBtn}
// //                         onClick={() => { setSelectedSlot(slot.id); setActiveTab("booking"); }}
// //                       >
// //                         Book Now →
// //                       </button>
// //                     </div>
// //                   ))}
// //                 </div>
// //               )
// //             }
// //           </div>
// //         )}

// //         {activeTab === "booking" && <Booking refreshDashboard={fetchStats} selectedSlot={selectedSlot} />}
// //         {activeTab === "myBookingId" && <MyBookingId />}

// //         {/*  BUG FIX: Removed `&& userEmail` guard — was blocking render when email not in localStorage */}
// //         {activeTab === "scan" && <ScanBookings />}

// //         {activeTab === "help" && <Help />}

// //       </div>
// //     </div>
// //   );
// // }

// // /* ─── Styles ─── */
// // const s = {
// //   root: {
// //     background: "#080c14",
// //     minHeight: "100vh",
// //     color: "#e2e8f0",
// //     fontFamily: "'Segoe UI', system-ui, sans-serif",
// //     paddingBottom: 80,
// //   },
// //   loadingScreen: {
// //     display: "flex", alignItems: "center", justifyContent: "center",
// //     minHeight: "100vh", background: "#080c14",
// //     color: "#475569", fontSize: 14,
// //     fontFamily: "'Segoe UI', system-ui, sans-serif", gap: 12,
// //   },
// //   spinner: {
// //     width: 32, height: 32,
// //     border: "3px solid rgba(0,229,255,0.15)",
// //     borderTop: "3px solid #00e5ff",
// //     borderRadius: "50%",
// //     animation: "spin 0.8s linear infinite",
// //   },
// //   topbar: {
// //     background: "rgba(8,12,20,0.9)",
// //     backdropFilter: "blur(12px)",
// //     borderBottom: "1px solid rgba(255,255,255,0.06)",
// //     padding: "16px 28px",
// //     display: "flex", alignItems: "center", justifyContent: "space-between",
// //     position: "sticky", top: 0, zIndex: 100,
// //   },
// //   logo: { fontWeight: 800, fontSize: 18, color: "#f8fafc", letterSpacing: -0.3 },
// //   emailChip: {
// //     fontSize: 12, color: "#475569",
// //     background: "rgba(255,255,255,0.04)",
// //     border: "1px solid rgba(255,255,255,0.07)",
// //     padding: "5px 12px", borderRadius: 20,
// //   },
// //   hero: { textAlign: "center", padding: "48px 20px 32px" },
// //   heroBadge: {
// //     display: "inline-block",
// //     background: "rgba(0,229,255,0.1)", color: "#00e5ff",
// //     fontSize: 10, fontWeight: 700, letterSpacing: 3,
// //     padding: "4px 14px", borderRadius: 20,
// //     border: "1px solid rgba(0,229,255,0.25)", marginBottom: 14,
// //   },
// //   heroTitle: {
// //     fontSize: "clamp(26px,5vw,46px)", fontWeight: 800,
// //     letterSpacing: -1, margin: "0 0 8px", color: "#f8fafc",
// //   },
// //   heroSub: { color: "#475569", fontSize: 14, margin: 0 },
// //   tabBar: {
// //     display: "flex", gap: 4, padding: "0 20px",
// //     borderBottom: "1px solid rgba(255,255,255,0.06)",
// //     overflowX: "auto", scrollbarWidth: "none", marginBottom: 28,
// //   },
// //   tabBtn: {
// //     background: "transparent", color: "#376a79",
// //     border: "1px solid transparent",
// //     borderRadius: "10px 10px 0 0",
// //     padding: "10px 16px", fontSize: 13, fontWeight: 600,
// //     // marginLeft:"112px",
// //     cursor: "pointer", whiteSpace: "nowrap",
// //     transition: "all 0.2s", letterSpacing: 0.3, outline: "none",

// //   },

// //   tabActive: {
// //     background: "rgba(0,229,255,0.09)",
// //     color: "#00e5ff",
// //     border: "1px solid rgba(0,229,255,0.22)",
// //   },
// //   content: { maxWidth: 1080, margin: "0 auto", padding: "0 20px" },
// //   statsGrid: {
// //     display: "grid",
// //     gridTemplateColumns: "repeat(auto-fill, minmax(155px, 1fr))",
// //     gap: 12, marginBottom: 28,
// //   },
// //   statCard: {
// //     background: "rgba(255,255,255,0.03)",
// //     border: "1px solid rgba(255,255,255,0.07)",
// //     borderRadius: 14, padding: "16px 14px",
// //     position: "relative", overflow: "hidden",
// //   },
// //   statAccent: {
// //     position: "absolute", top: 0, left: 0, right: 0, height: 2,
// //   },
// //   statLabel: {
// //     display: "block", fontSize: 9, fontWeight: 700,
// //     letterSpacing: 2, color: "#475569", marginBottom: 8,
// //   },
// //   statValue: {
// //     display: "block", fontSize: 30, fontWeight: 900,
// //     lineHeight: 1, letterSpacing: -1,
// //   },
// //   chartsGrid: {
// //     display: "grid",
// //     gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
// //     gap: 14, marginBottom: 32,
// //   },
// //   chartBox: {
// //     background: "rgba(255,255,255,0.02)",
// //     border: "1px solid rgba(255,255,255,0.06)",
// //     borderRadius: 16, padding: "18px 14px",
// //   },
// //   chartTitle: {
// //     fontSize: 10, fontWeight: 700, letterSpacing: 2,
// //     color: "#475569", marginBottom: 14, textTransform: "uppercase",
// //   },
// //   sectionLabel: {
// //     fontSize: 10, letterSpacing: 3, color: "#475569",
// //     fontWeight: 700, marginBottom: 14,
// //   },
// //   slotsGrid: {
// //     display: "grid",
// //     gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
// //     gap: 12,
// //   },
// //   slotCard: {
// //     background: "rgba(255,255,255,0.03)",
// //     border: "1px solid rgba(255,255,255,0.07)",
// //     borderRadius: 14, padding: "14px 12px",
// //   },
// //   slotRow: {
// //     display: "flex", justifyContent: "space-between",
// //     alignItems: "center", marginBottom: 6,
// //   },
// //   slotNum: { fontWeight: 800, fontSize: 15, color: "#00e5ff" },
// //   slotPill: {
// //     fontSize: 9, fontWeight: 700, letterSpacing: 1.5, color: "#10b981",
// //     background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)",
// //     padding: "2px 8px", borderRadius: 20,
// //   },
// //   slotType: { fontSize: 11, color: "#475569", marginBottom: 12 },
// //   bookBtn: {
// //     width: "100%",
// //     background: "linear-gradient(135deg,rgba(0,229,255,0.1),rgba(124,58,237,0.1))",
// //     border: "1px solid rgba(0,229,255,0.22)",
// //     color: "#00e5ff", borderRadius: 8,
// //     padding: "8px 0", fontSize: 12, fontWeight: 700,
// //     cursor: "pointer", letterSpacing: 0.3,
// //   },
// // };











// import { useEffect, useState } from "react";
// import Booking from "./Booking";
// import MyBookingId from "./MyBookingId";
// import ScanBookings from "./ScanBooking";
// import Help from "./Help";

// import {
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
//   ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend
// } from "recharts";

// const TABS = [
//   { id: "analytics", label: "📊 Analytics" },
//   { id: "booking", label: "🅿️ Booking" },
//   { id: "myBookingId", label: "🪪 My Booking ID" },
//   { id: "scan", label: "📲 Scan QR" },
//   { id: "help", label: "❓ Help" },
// ];

// const STAT_DEFS = (stats, available) => [
//   { label: "TOTAL SLOTS", value: stats.totalSlots, accent: "#00e5ff" },
//   { label: "OCCUPIED", value: stats.occupiedSlots, accent: "#ef4444" },
//   { label: "AVAILABLE", value: available, accent: "#10b981" },
//   { label: "BOOKINGS", value: stats.totalBookings, accent: "#f59e0b" },
//   { label: "TOTAL VEHICLES", value: stats.totalCars + stats.totalBikes, accent: "#7c3aed" },
// ];

// export default function Dashboard() {
//   const userEmail = localStorage.getItem("email");
//   const [stats, setStats] = useState(null);
//   const [activeTab, setActiveTab] = useState("analytics");
//   const [availableSlots, setAvailableSlots] = useState([]);
//   const [selectedSlot, setSelectedSlot] = useState("");

//   const fetchStats = () =>
//     fetch("http://localhost:5000/graphql", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       credentials: "include",
//       body: JSON.stringify({
//         query: `query {
//           dashboardStats { totalSlots occupiedSlots totalBookings totalCars totalBikes }
//           bookingAnalytics { date count }
//         }`
//       })
//     })
//       .then(r => r.json())
//       .then(d => setStats({ ...d.data.dashboardStats, analytics: d.data.bookingAnalytics }));

//   const fetchAvailableSlots = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/graphql", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ query: `query { availableSlots { id slotNumber type } }` })
//       });
//       const d = await res.json();
//       setAvailableSlots(d.data.availableSlots || []);
//     } catch (e) { console.error(e); }
//   };

//   useEffect(() => { fetchStats(); fetchAvailableSlots(); }, []);

//   if (!stats) return (
//     <div style={s.loadingScreen}>
//       <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
//       <div style={s.spinner} />
//       <span>Loading dashboard…</span>
//     </div>
//   );

//   const availableCount = stats.totalSlots - stats.occupiedSlots;
//   const barData = [{ name: "Cars", value: stats.totalCars }, { name: "Bikes", value: stats.totalBikes }];
//   const pieData = [{ name: "Occupied", value: stats.occupiedSlots }, { name: "Available", value: availableCount }];
//   const ttStyle = { background: "#0f172a", border: "1px solid #1e293b", borderRadius: 8, color: "#e2e8f0", fontSize: 12 };
//   const axTick = { fill: "#475569", fontSize: 11 };

//   return (
//     <div style={s.root}>
//       <style>{`
//         @keyframes spin    { to { transform: rotate(360deg); } }
//         @keyframes fadeUp  { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        
//         /* Custom Scrollbar for Tabs on Mobile */
//         .tab-bar-scroll::-webkit-scrollbar { display: none; }
//         .tab-bar-scroll { -ms-overflow-style: none; scrollbar-width: none; }

//         /* Mobile Responsive adjustments */
//         @media (max-width: 768px) {
//           .stats-grid-container { grid-template-columns: repeat(2, 1fr) !important; }
//           .charts-grid-container { grid-template-columns: 1fr !important; }
//           .hero-title-text { font-size: 28px !important; }
//           .tab-button-custom { padding: 8px 12px !important; font-size: 11px !important; }
//         }

//         button:hover { opacity: 0.85; }
//       `}</style>

//       {/* ── Topbar ── */}
//       <header style={s.topbar}>
//         <div style={s.logo}>🅿 Park<span style={{ color: "#00e5ff" }}>Smart</span></div>
//         {userEmail && <span style={s.emailChip}>{userEmail.split('@')[0]}</span>}
//       </header>

//       {/* ── Hero ── */}
//       <div style={s.hero}>
//         <span style={s.heroBadge}>ADMIN PANEL</span>
//         <h1 className="hero-title-text" style={s.heroTitle}>Parking <span style={{ color: "#00e5ff" }}>Dashboard</span></h1>
//         <p style={s.heroSub}>Real-time slot management &amp; overview</p>
//       </div>

//       {/* ── Tabs (CENTERED & RESPONSIVE) ── */}
//       <div className="tab-bar-scroll" style={s.tabBarWrapper}>
//         <div style={s.tabBarInner}>
//           {TABS.map(t => (
//             <button
//               key={t.id}
//               className="tab-button-custom"
//               style={{
//                 ...s.tabBtn,
//                 ...(activeTab === t.id ? s.tabActive : {}),
//               }}
//               onClick={() => setActiveTab(t.id)}
//             >
//               {t.label}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div style={s.content}>
//         {/* ── ANALYTICS ── */}
//         {activeTab === "analytics" && (
//           <div style={{ animation: "fadeUp 0.4s ease both" }}>
            
//             {/* Stat cards */}
//             <div className="stats-grid-container" style={s.statsGrid}>
//               {STAT_DEFS(stats, availableCount).map((c, i) => (
//                 <div key={i} style={s.statCard}>
//                   <div style={{ ...s.statAccent, background: c.accent }} />
//                   <span style={s.statLabel}>{c.label}</span>
//                   <span style={{ ...s.statValue, color: c.accent }}>{c.value}</span>
//                 </div>
//               ))}
//             </div>

//             {/* Charts */}
//             <div className="charts-grid-container" style={s.chartsGrid}>
//               <div style={s.chartBox}>
//                 <p style={s.chartTitle}>Daily Booking Trend</p>
//                 <ResponsiveContainer width="100%" height={240}>
//                   <LineChart data={stats.analytics}>
//                     <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
//                     <XAxis dataKey="date" stroke="#1e293b" tick={axTick} />
//                     <YAxis stroke="#1e293b" tick={axTick} />
//                     <Tooltip contentStyle={ttStyle} />
//                     <Line type="monotone" dataKey="count" stroke="#00e5ff" strokeWidth={3} dot={{ r: 4, fill: "#00e5ff" }} />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>

//               <div style={s.chartBox}>
//                 <p style={s.chartTitle}>Vehicle Distribution</p>
//                 <ResponsiveContainer width="100%" height={240}>
//                   <BarChart data={barData}>
//                     <CartesianGrid stroke="#1e293b" />
//                     <XAxis dataKey="name" stroke="#1e293b" tick={axTick} />
//                     <YAxis stroke="#1e293b" tick={axTick} />
//                     <Tooltip contentStyle={ttStyle} />
//                     <Bar dataKey="value" radius={[8, 8, 0, 0]}>
//                       <Cell fill="#06b6d4" />
//                       <Cell fill="#8b5cf6" />
//                     </Bar>
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>

//             {/* Available Slots */}
//             <p style={s.sectionLabel}>AVAILABLE PARKING SPOTS</p>
//             {availableSlots.length === 0
//               ? <p style={{ color: "#334155", fontSize: 14 }}>No slots available right now.</p>
//               : (
//                 <div style={s.slotsGrid}>
//                   {availableSlots.map(slot => (
//                     <div key={slot.id} style={s.slotCard}>
//                       <div style={s.slotRow}>
//                         <span style={s.slotNum}>{slot.slotNumber}</span>
//                         <span style={s.slotPill}>FREE</span>
//                       </div>
//                       <p style={s.slotType}>{slot.type}</p>
//                       <button
//                         style={s.bookBtn}
//                         onClick={() => { setSelectedSlot(slot.id); setActiveTab("booking"); }}
//                       >
//                         Book Now →
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )
//             }
//           </div>
//         )}

//         {activeTab === "booking" && <Booking refreshDashboard={fetchStats} selectedSlot={selectedSlot} />}
//         {activeTab === "myBookingId" && <MyBookingId />}
//         {activeTab === "scan" && <ScanBookings />}
//         {activeTab === "help" && <Help />}
//       </div>
//     </div>
//   );
// }

// const s = {
//   root: {
//     background: "#080c14",
//     minHeight: "100vh",
//     color: "#e2e8f0",
//     fontFamily: "'Segoe UI', system-ui, sans-serif",
//     paddingBottom: 80,
//   },
//   loadingScreen: {
//     display: "flex", alignItems: "center", justifyContent: "center",
//     minHeight: "100vh", background: "#080c14",
//     color: "#475569", fontSize: 14, gap: 12,
//   },
//   spinner: {
//     width: 32, height: 32,
//     border: "3px solid rgba(0,229,255,0.15)",
//     borderTop: "3px solid #00e5ff",
//     borderRadius: "50%",
//     animation: "spin 0.8s linear infinite",
//   },
//   topbar: {
//     background: "rgba(8,12,20,0.9)",
//     backdropFilter: "blur(12px)",
//     borderBottom: "1px solid rgba(255,255,255,0.06)",
//     padding: "12px 20px",
//     display: "flex", alignItems: "center", justifyContent: "space-between",
//     position: "sticky", top: 0, zIndex: 100,
//   },
//   logo: { fontWeight: 800, fontSize: 18, color: "#f8fafc" },
//   emailChip: {
//     fontSize: 11, color: "#00e5ff",
//     background: "rgba(0,229,255,0.05)",
//     border: "1px solid rgba(0,229,255,0.1)",
//     padding: "4px 10px", borderRadius: 20,
//   },
//   hero: { textAlign: "center", padding: "40px 20px 24px" },
//   heroBadge: {
//     display: "inline-block",
//     background: "rgba(0,229,255,0.1)", color: "#00e5ff",
//     fontSize: 10, fontWeight: 700, letterSpacing: 2,
//     padding: "4px 12px", borderRadius: 20, marginBottom: 12,
//   },
//   heroTitle: { fontSize: "40px", fontWeight: 800, margin: "0 0 8px", color: "#f8fafc" },
//   heroSub: { color: "#475569", fontSize: 13 },
  
//   // CENTERED TABS STYLING
//   tabBarWrapper: {
//     width: "100%",
//     display: "flex",
//     justifyContent: "center", // Horizontal center for desktop
//     overflowX: "auto", // Allow swipe on mobile
//     borderBottom: "1px solid rgba(255,255,255,0.06)",
//     marginBottom: 28,
//     padding: "0 10px",
//   },
//   tabBarInner: {
//     display: "flex",
//     gap: 8,
//     maxWidth: "100%",
//     justifyContent: "center",
//   },
//   tabBtn: {
//     background: "transparent",
//     color: "#64748b",
//     border: "none",
//     borderBottom: "2px solid transparent",
//     padding: "12px 20px",
//     fontSize: "14px",
//     fontWeight: 600,
//     cursor: "pointer",
//     whiteSpace: "nowrap",
//     transition: "all 0.3s",
//     outline: "none",
//   },
//   tabActive: {
//     color: "#00e5ff",
//     borderBottom: "2px solid #00e5ff",
//     background: "rgba(0,229,255,0.05)",
//   },

//   content: { maxWidth: 1080, margin: "0 auto", padding: "0 16px" },
//   statsGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(5, 1fr)", // Default for desktop
//     gap: 12, marginBottom: 28,
//   },
//   statCard: {
//     background: "rgba(255,255,255,0.03)",
//     border: "1px solid rgba(255,255,255,0.07)",
//     borderRadius: 14, padding: "16px 12px",
//     position: "relative",
//   },
//   statAccent: { position: "absolute", top: 0, left: 0, right: 0, height: 2 },
//   statLabel: { display: "block", fontSize: 9, fontWeight: 700, letterSpacing: 1, color: "#475569", marginBottom: 6 },
//   statValue: { display: "block", fontSize: 24, fontWeight: 900 },
  
//   chartsGrid: {
//     display: "grid",
//     gridTemplateColumns: "1fr 1fr",
//     gap: 14, marginBottom: 32,
//   },
//   chartBox: {
//     background: "rgba(255,255,255,0.02)",
//     border: "1px solid rgba(255,255,255,0.06)",
//     borderRadius: 16, padding: "16px",
//   },
//   chartTitle: { fontSize: 10, fontWeight: 700, color: "#475569", marginBottom: 12, textTransform: "uppercase" },
//   sectionLabel: { fontSize: 10, letterSpacing: 2, color: "#475569", fontWeight: 700, marginBottom: 14 },
//   slotsGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
//     gap: 12,
//   },
//   slotCard: {
//     background: "rgba(255,255,255,0.03)",
//     border: "1px solid rgba(255,255,255,0.07)",
//     borderRadius: 14, padding: "12px",
//   },
//   slotRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 },
//   slotNum: { fontWeight: 800, fontSize: 14, color: "#00e5ff" },
//   slotPill: { fontSize: 8, fontWeight: 700, color: "#10b981", background: "rgba(16,185,129,0.1)", padding: "2px 6px", borderRadius: 20 },
//   slotType: { fontSize: 10, color: "#475569", marginBottom: 10 },
//   bookBtn: {
//     width: "100%",
//     background: "rgba(0,229,255,0.1)",
//     border: "1px solid rgba(0,229,255,0.2)",
//     color: "#00e5ff", borderRadius: 6,
//     padding: "6px 0", fontSize: 11, fontWeight: 700,
//     cursor: "pointer",
//   },
// };





import { useEffect, useState } from "react";
import Booking from "./Booking";
import MyBookingId from "./MyBookingId";
import ScanBookings from "./ScanBooking";
import Help from "./Help";

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend
} from "recharts";

const TABS = [
  { id: "analytics", label: "📊 Analytics" },
  { id: "booking", label: "🅿️ Booking" },
  { id: "myBookingId", label: "🪪 My Booking ID" },
  { id: "scan", label: "📲 Scan QR" },
  { id: "help", label: "❓ Help" },
];

const STAT_DEFS = (stats, available) => [
  { label: "TOTAL SLOTS", value: stats.totalSlots, accent: "#00e5ff" },
  { label: "OCCUPIED", value: stats.occupiedSlots, accent: "#ef4444" },
  { label: "AVAILABLE", value: available, accent: "#10b981" },
  { label: "BOOKINGS", value: stats.totalBookings, accent: "#f59e0b" },
  { label: "TOTAL VEHICLES", value: stats.totalCars + stats.totalBikes, accent: "#7c3aed" },
];

export default function Dashboard() {
  const userEmail = localStorage.getItem("email");
  const [stats, setStats] = useState(null);
  const [activeTab, setActiveTab] = useState("analytics");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");

  const fetchStats = () =>
    fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        query: `query {
          dashboardStats { totalSlots occupiedSlots totalBookings totalCars totalBikes }
          bookingAnalytics { date count }
        }`
      })
    })
      .then(r => r.json())
      .then(d => setStats({ ...d.data.dashboardStats, analytics: d.data.bookingAnalytics }));

  const fetchAvailableSlots = async () => {
    try {
      const res = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ query: `query { availableSlots { id slotNumber type } }` })
      });
      const d = await res.json();
      setAvailableSlots(d.data.availableSlots || []);
    } catch (e) { console.error(e); }
  };

  useEffect(() => { fetchStats(); fetchAvailableSlots(); }, []);

  if (!stats) return (
    <div style={s.loadingScreen}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={s.spinner} />
      <span>Loading dashboard…</span>
    </div>
  );

  const availableCount = stats.totalSlots - stats.occupiedSlots;
  const barData = [{ name: "Cars", value: stats.totalCars }, { name: "Bikes", value: stats.totalBikes }];
  const pieData = [{ name: "Occupied", value: stats.occupiedSlots }, { name: "Available", value: availableCount }];
  const ttStyle = { background: "#0f172a", border: "1px solid #1e293b", borderRadius: 8, color: "#e2e8f0", fontSize: 12 };
  const axTick = { fill: "#475569", fontSize: 11 };

  return (
    <div style={s.root}>
      {/* ── Global CSS for Animations, Responsive & Scrollbar Hiding ── */}
      <style>{`
        @keyframes spin    { to { transform: rotate(360deg); } }
        @keyframes fadeUp  { from { opacity:0; transform:translateY(15px); } to { opacity:1; transform:translateY(0); } }
        
        /* HIDE SCROLLBAR BUT ALLOW SWIPE */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        /* RESPONSIVE QUERIES */
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .charts-grid { grid-template-columns: 1fr !important; }
          .hero-title { font-size: 32px !important; }
          .tab-btn { padding: 10px 14px !important; font-size: 12px !important; }
          .top-header { padding: 12px 16px !important; }
        }
        
        button:hover { opacity: 0.8; }
      `}</style>

      {/* ── Topbar ── */}
      <header className="top-header" style={s.topbar}>
        <div style={s.logo}>🅿 Park<span style={{ color: "#00e5ff" }}>Smart</span></div>
        {userEmail && <span style={s.emailChip}>{userEmail.split('@')[0]}</span>}
      </header>

      {/* ── Hero ── */}
      <div style={s.hero}>
        <span style={s.heroBadge}>CONTROL CENTER</span>
        <h1 className="hero-title" style={s.heroTitle}>Parking <span style={{ color: "#00e5ff" }}>Dashboard</span></h1>
        <p style={s.heroSub}>Real-time monitoring and slot management</p>
      </div>

      {/* ── Tabs (CENTERED & NO SCROLLBAR) ── */}
      <div className="no-scrollbar" style={s.tabBarWrapper}>
        <div style={s.tabBarInner}>
          {TABS.map(t => (
            <button
              key={t.id}
              className="tab-btn"
              style={{ ...s.tabBtn, ...(activeTab === t.id ? s.tabActive : {}) }}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={s.content}>
        {activeTab === "analytics" && (
          <div style={{ animation: "fadeUp 0.4s ease both" }}>
            
            <div className="stats-grid" style={s.statsGrid}>
              {STAT_DEFS(stats, availableCount).map((c, i) => (
                <div key={i} style={s.statCard}>
                  <div style={{ ...s.statAccent, background: c.accent }} />
                  <span style={s.statLabel}>{c.label}</span>
                  <span style={{ ...s.statValue, color: c.accent }}>{c.value}</span>
                </div>
              ))}
            </div>

            <div className="charts-grid" style={s.chartsGrid}>
              <div style={s.chartBox}>
                <p style={s.chartTitle}>Daily Trend</p>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={stats.analytics}>
                    <CartesianGrid stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="date" stroke="#475569" tick={axTick} axisLine={false} />
                    <YAxis stroke="#475569" tick={axTick} axisLine={false} />
                    <Tooltip contentStyle={ttStyle} />
                    <Line type="monotone" dataKey="count" stroke="#00e5ff" strokeWidth={3} dot={{ r: 4, fill: "#00e5ff" }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div style={s.chartBox}>
                <p style={s.chartTitle}>Vehicles</p>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={barData}>
                    <XAxis dataKey="name" stroke="#475569" tick={axTick} />
                    <Tooltip contentStyle={ttStyle} />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                      <Cell fill="#06b6d4" />
                      <Cell fill="#8b5cf6" />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <p style={s.sectionLabel}>AVAILABLE SPOTS</p>
            <div style={s.slotsGrid}>
              {availableSlots.map(slot => (
                <div key={slot.id} style={s.slotCard}>
                  <div style={s.slotRow}>
                    <span style={s.slotNum}>{slot.slotNumber}</span>
                    <span style={s.slotPill}>FREE</span>
                  </div>
                  <button style={s.bookBtn} onClick={() => { setSelectedSlot(slot.id); setActiveTab("booking"); }}>
                    Book →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "booking" && <Booking refreshDashboard={fetchStats} selectedSlot={selectedSlot} />}
        {activeTab === "myBookingId" && <MyBookingId />}
        {activeTab === "scan" && <ScanBookings />}
        {activeTab === "help" && <Help />}
      </div>
    </div>
  );
}

const s = {
  root: { background: "#080c14", minHeight: "100vh", color: "#e2e8f0", paddingBottom: 60 },
  loadingScreen: { display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", gap: 12 },
  spinner: { width: 30, height: 30, border: "3px solid rgba(0,229,255,0.1)", borderTop: "3px solid #00e5ff", borderRadius: "50%", animation: "spin 0.8s linear" },
  topbar: { background: "rgba(8,12,20,0.8)", backdropFilter: "blur(10px)", borderBottom: "1px solid #1e293b", padding: "14px 40px", display: "flex", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 },
  logo: { fontWeight: 800, fontSize: 18 },
  emailChip: { fontSize: 11, color: "#00e5ff", background: "rgba(0,229,255,0.05)", padding: "4px 12px", borderRadius: 20 },
  hero: { textAlign: "center", padding: "40px 20px" },
  heroBadge: { fontSize: 9, fontWeight: 700, letterSpacing: 2, color: "#00e5ff", background: "rgba(0,229,255,0.1)", padding: "4px 12px", borderRadius: 20 },
  heroTitle: { fontSize: 46, fontWeight: 800, margin: "10px 0" },
  heroSub: { color: "#475569", fontSize: 13 },
  
  // FIXED TABS STYLE
  tabBarWrapper: { width: "100%", display: "flex", justifyContent: "center", overflowX: "auto", borderBottom: "1px solid #1e293b", marginBottom: 30, WebkitOverflowScrolling: "touch" },
  tabBarInner: { display: "flex", gap: 5, padding: "0 15px" },
  tabBtn: { background: "transparent", color: "#64748b", border: "none", borderBottom: "2px solid transparent", padding: "12px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", transition: "0.2s" },
  tabActive: { color: "#00e5ff", borderBottom: "2px solid #00e5ff", background: "rgba(0,229,255,0.03)" },

  content: { maxWidth: 1100, margin: "0 auto", padding: "0 20px" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 30 },
  statCard: { background: "rgba(255,255,255,0.02)", border: "1px solid #1e293b", borderRadius: 16, padding: "16px", position: "relative" },
  statAccent: { position: "absolute", top: 0, left: 0, right: 0, height: 2 },
  statLabel: { display: "block", fontSize: 9, color: "#475569", fontWeight: 700, marginBottom: 8 },
  statValue: { display: "block", fontSize: 26, fontWeight: 900 },
  chartsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15, marginBottom: 30 },
  chartBox: { background: "rgba(255,255,255,0.01)", border: "1px solid #1e293b", borderRadius: 20, padding: "20px" },
  chartTitle: { fontSize: 10, fontWeight: 700, color: "#475569", marginBottom: 15 },
  sectionLabel: { fontSize: 10, color: "#475569", fontWeight: 700, marginBottom: 15 },
  slotsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 10 },
  slotCard: { background: "rgba(255,255,255,0.02)", border: "1px solid #1e293b", borderRadius: 12, padding: "12px" },
  slotRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  slotNum: { fontWeight: 800, color: "#00e5ff" },
  slotPill: { fontSize: 8, color: "#10b981", background: "rgba(16,185,129,0.1)", padding: "2px 6px", borderRadius: 4 },
  bookBtn: { width: "100%", background: "#00e5ff1a", border: "1px solid #00e5ff44", color: "#00e5ff", borderRadius: 6, padding: "6px", fontSize: 11, fontWeight: 700, cursor: "pointer" }
};