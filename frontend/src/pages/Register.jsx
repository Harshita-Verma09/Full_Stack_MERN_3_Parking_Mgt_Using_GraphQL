// /home/harshita-verma/Documents/CODE_FOCUS/MERN_Parking_Sys/frontend/src/pages/Register.jsx

import "../styles/auth.css";

export default function Register({ setPage }) {

  const registerUser = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;

    console.log("🚀 Registering user:", username);

    try {
      const res = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          query: `
            mutation Register($username:String!, $email:String!) {
              register(username:$username, email:$email) {
                message
              }
            }
          `,
          variables: { username, email }
        })
      });

      const data = await res.json();

      if (data.errors) {
        alert(data.errors[0].message);
        return;
      }

      alert("Registration Successful! Now please login.");
      setPage("login");
      
    } catch (err) {
      console.error("🔥 Register Error:", err);
      alert("Registration failed. Server check karein.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-badge">JOIN US</div>
        <h2 className="auth-title">Create <span className="accent">Account</span></h2>
        <p className="auth-sub">Enter your details to get started with ParkSmart</p>

        <form onSubmit={registerUser} className="auth-form">
          <div className="input-group">
            <input type="text" name="username" placeholder=" " required />
            <label>Username</label>
            <div className="input-line"></div>
          </div>

          <div className="input-group">
            <input type="email" name="email" placeholder=" " required />
            <label>Email Address</label>
            <div className="input-line"></div>
          </div>

          <button type="submit" className="auth-btn">
            Register Now
          </button>
        </form>

        <div className="auth-footer">
          <p>Already registered? <span className="link" onClick={() => setPage("login")}>Login</span></p>
        </div>
      </div>
    </div>
  );
}