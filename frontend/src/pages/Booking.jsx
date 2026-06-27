
import { useEffect, useState } from "react";

export default function Booking({ refreshDashboard, selectedSlot }) {
    const [slots, setSlots] = useState([]);
    const [selectedSlotId, setSelectedSlotId] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const token = sessionStorage.getItem("token");

    const fetchSlots = async () => {
        try {
            const res = await fetch("http://localhost:5000/graphql", {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ query: `query { availableSlots { id slotNumber type } }` })
            });
            const data = await res.json();
            setSlots(data.data.availableSlots || []);
        } catch (e) { console.error(e); }
    };

    useEffect(() => { fetchSlots(); }, []);
    useEffect(() => { if (selectedSlot) setSelectedSlotId(selectedSlot); }, [selectedSlot]);

    const handleBooking = async (e) => {
        e.preventDefault();
        const form = e.target;
        const fromTime = new Date(form.fromTime.value);
        const toTime = new Date(form.toTime.value);

        if (fromTime >= toTime) { alert(" 'From' time must be before 'To' time."); return; }

        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/graphql", {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    query: `
            mutation CreateBooking($slotId:ID!,$vehicleType:String!,$vehicleNumber:String!,$fromTime:String!,$toTime:String!) {
              createBooking(slotId:$slotId,vehicleType:$vehicleType,vehicleNumber:$vehicleNumber,fromTime:$fromTime,toTime:$toTime) { message }
            }`,
                    variables: {
                        slotId: selectedSlotId,
                        vehicleType: form.vehicleType.value,
                        vehicleNumber: form.vehicleNumber.value,
                        fromTime: fromTime.toISOString(),
                        toTime: toTime.toISOString()
                    }
                })
            });
            const data = await res.json();
            if (data.errors) { alert(data.errors[0].message); return; }

            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
            refreshDashboard();
            fetchSlots();
            form.reset();
            setSelectedSlotId("");
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    return (
        <div style={s.root}>
            <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pop    { 0%{transform:scale(0.9)} 60%{transform:scale(1.05)} 100%{transform:scale(1)} }
        .bk-input { width:100%; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.09);
          border-radius:10px; padding:12px 14px; color:#e2e8f0; font-size:14px; outline:none;
          transition:border-color .2s,box-shadow .2s; box-sizing:border-box; font-family:inherit; }
        .bk-input:focus { border-color:rgba(0,229,255,0.45); box-shadow:0 0 0 3px rgba(0,229,255,0.08); }
        .bk-input option { background:#0f172a; color:#e2e8f0; }
        .bk-btn { width:100%; padding:14px; border:none; border-radius:12px; font-size:15px; font-weight:700;
          cursor:pointer; letter-spacing:.4px; transition:opacity .2s,transform .15s; }
        .bk-btn:hover:not(:disabled) { opacity:.88; transform:translateY(-1px); }
        .bk-btn:disabled { opacity:.5; cursor:not-allowed; }
      `}</style>

            {/* Header */}
            <div style={s.header}>
                <span style={s.badge}>NEW BOOKING</span>
                <h1 style={s.title}>Reserve a <span style={s.accent}>Slot</span></h1>
                <p style={s.sub}>Fill in the details below to book your parking spot.</p>
                <div style={s.divider} />
            </div>

            {/* Success toast */}
            {success && (
                <div style={s.toast}> Booking Confirmed! Your slot is reserved.</div>
            )}

            {/* Form card */}
            <div style={s.card}>
                <form onSubmit={handleBooking} style={s.form}>

                    {/* Slot */}
                    <div style={s.fieldGroup}>
                        <label style={s.label}>Parking Slot</label>
                        <select
                            className="bk-input"
                            value={selectedSlotId}
                            onChange={(e) => setSelectedSlotId(e.target.value)}
                            required
                        >
                            <option value="">— Select a slot —</option>
                            {slots.map(slot => (
                                <option key={slot.id} value={slot.id}>
                                    {slot.slotNumber}  ·  {slot.type}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Vehicle type */}
                    <div style={s.fieldGroup}>
                        <label style={s.label}>Vehicle Type</label>
                        <select name="vehicleType" className="bk-input">
                            <option value="car">🚗  Car</option>
                            <option value="bike">🏍️  Bike</option>
                        </select>
                    </div>

                    {/* Vehicle number */}
                    <div style={s.fieldGroup}>
                        <label style={s.label}>Vehicle Number</label>
                        <input
                            name="vehicleNumber"
                            placeholder="e.g. UP 11 AB 1234"
                            required
                            className="bk-input"
                        />
                    </div>

                    {/* Time row */}
                    <div style={s.timeRow}>
                        <div style={{ ...s.fieldGroup, flex: 1 }}>
                            <label style={s.label}>From</label>
                            <input type="datetime-local" name="fromTime" required className="bk-input" />
                        </div>
                        <div style={{ ...s.fieldGroup, flex: 1 }}>
                            <label style={s.label}>To</label>
                            <input type="datetime-local" name="toTime" required className="bk-input" />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="bk-btn"
                        disabled={loading}
                        style={{
                            background: loading
                                ? "rgba(255,255,255,0.06)"
                                : "linear-gradient(135deg,#00e5ff,#7c3aed)",
                            color: loading ? "#475569" : "#fff",
                        }}
                    >
                        {loading ? "Booking…" : "Confirm Booking →"}
                    </button>
                </form>
            </div>

            {/* Available slots preview */}
            {slots.length > 0 && (
                <div style={s.slotPreview}>
                    <p style={s.slotPreviewLabel}>AVAILABLE SLOTS</p>
                    <div style={s.slotChips}>
                        {slots.map(slot => (
                            <button
                                key={slot.id}
                                type="button"
                                onClick={() => setSelectedSlotId(slot.id)}
                                style={{
                                    ...s.chip,
                                    borderColor: selectedSlotId === slot.id ? "#00e5ff" : "rgba(255,255,255,0.08)",
                                    color: selectedSlotId === slot.id ? "#00e5ff" : "#64748b",
                                    background: selectedSlotId === slot.id ? "rgba(0,229,255,0.08)" : "rgba(255,255,255,0.02)",
                                }}
                            >
                                {slot.slotNumber} <span style={{ opacity: 0.5, fontSize: 10 }}>{slot.type}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

const s = {
    root: {
        background: "#080c14",
        minHeight: "60vh",
        padding: "36px 20px 60px",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        color: "#e2e8f0",
        animation: "fadeUp 0.4s ease both",
    },
    header: { textAlign: "center", marginBottom: 36 },
    badge: {
        display: "inline-block",
        background: "rgba(0,229,255,0.1)", color: "#00e5ff",
        fontSize: 10, fontWeight: 700, letterSpacing: 3,
        padding: "4px 14px", borderRadius: 20,
        border: "1px solid rgba(0,229,255,0.25)", marginBottom: 14,
    },
    title: { fontSize: "clamp(24px,5vw,40px)", fontWeight: 800, margin: "0 0 8px", color: "#f8fafc", letterSpacing: -0.5 },
    accent: { color: "#00e5ff" },
    sub: { color: "#475569", fontSize: 14, margin: "0 0 20px" },
    divider: { width: 44, height: 3, background: "linear-gradient(90deg,#00e5ff,#7c3aed)", borderRadius: 2, margin: "0 auto" },
    toast: {
        maxWidth: 480, margin: "0 auto 24px",
        background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)",
        borderRadius: 12, padding: "14px 20px", textAlign: "center",
        color: "#10b981", fontSize: 14, fontWeight: 600,
        animation: "pop 0.35s ease both",
    },
    card: {
        maxWidth: 520, margin: "0 auto 32px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 20, padding: "28px 24px",
    },
    form: { display: "flex", flexDirection: "column", gap: 18 },
    fieldGroup: { display: "flex", flexDirection: "column", gap: 6 },
    label: { fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: "#475569", textTransform: "uppercase" },
    timeRow: { display: "flex", gap: 14, flexWrap: "wrap" },
    slotPreview: { maxWidth: 520, margin: "0 auto" },
    slotPreviewLabel: { fontSize: 10, letterSpacing: 3, color: "#334155", fontWeight: 700, marginBottom: 10 },
    slotChips: { display: "flex", flexWrap: "wrap", gap: 8 },
    chip: {
        border: "1px solid", borderRadius: 8, padding: "6px 12px",
        fontSize: 13, fontWeight: 600, cursor: "pointer",
        transition: "all .2s", outline: "none", letterSpacing: 0.3,
    },
};