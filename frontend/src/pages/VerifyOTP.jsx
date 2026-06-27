

import "../styles/auth.css";

export default function VerifyOTP({ email, setPage }) {

  const verifyOtp = async (e) => {
    e.preventDefault();
    const otp = e.target.otp.value;

    console.log("🚀 Verification Start for Email:", email);
    console.log("🔢 Entered OTP:", otp);

    try {
      const res = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            mutation VerifyOTP($email:String!, $otp:String!) {
              verifyOTP(email:$email, otp:$otp) {
                message
                token
              }
            }
          `,
          variables: { email, otp }
        })
      });

      console.log("📡 Network Request Sent...");
      
      const data = await res.json();
      console.log("📥 Server Response Data:", data);

      if (data.errors) {
        console.error("❌ GraphQL Error:", data.errors[0].message);
        alert(data.errors[0].message);
        return;
      }

      if (data.data && data.data.verifyOTP) {
        const token = data.data.verifyOTP.token;
        console.log("✅ Token Received:", token);
        
        sessionStorage.setItem("token", token);
        console.log("💾 Token stored in sessionStorage.");
        
        setPage("dashboard");
      } else {
        console.warn("⚠️ Response received but no data found.");
      }

    } catch (err) {
      console.error("🔥 Fetch Error (Network/CORS):", err);
      alert("Failed to connect to server. Check console for details.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-badge">SECURITY CHECK</div>
        <h2 className="auth-title">Verify <span className="accent">OTP</span></h2>
        <p className="auth-sub">
          We've sent a 6-digit code to <br />
          <span style={{ color: "#00e5ff", fontWeight: "600" }}>{email}</span>
        </p>

        <form onSubmit={verifyOtp} className="auth-form">
          <div className="input-group">
            <input
              type="text"
              name="otp"
              placeholder=" "
              required
              maxLength="6"
              autoComplete="off"
              style={{ textAlign: 'center', fontSize: '24px', letterSpacing: '8px', color: '#00e5ff', fontWeight: '800' }}
            />
            <label style={{ left: '50%', transform: 'translateX(-50%)' }}>Enter 6-Digit Code</label>
            <div className="input-line"></div>
          </div>

          <button type="submit" className="auth-btn">
            Verify & Continue
          </button>
        </form>

        <div className="auth-footer">
          <p>Didn't receive the code? <span className="link" onClick={() => setPage("login")}>Resend</span></p>
        </div>
      </div>
    </div>
  );
}