

import "../styles/auth.css";

export default function Login({ setPage, setEmail }) {

    const loginUser = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        try {
            // BACKEND REQUEST (Ye miss ho gaya tha aapke code mein)
            const res = await fetch("http://localhost:5000/graphql", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    query: `
                      mutation Login($email:String!) {
                        login(email:$email) {
                          message
                        }
                      }
                    `,
                    variables: { email }
                })
            });

            const data = await res.json();


            if (data.errors) {
                alert(data.errors[0].message);
                return;
            }

            // Success Logic
            setEmail(email);
            localStorage.setItem("email", email);
            setPage("otp");

        } catch (err) {
            ;
            alert("Backend se connect nahi ho pa raha. CORS ya Server check karein!");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-badge">SECURE LOGIN</div>
                <h2 className="auth-title">Park<span className="accent">Smart</span></h2>
                <p className="auth-sub">Access your smart parking dashboard</p>

                <form onSubmit={loginUser} className="auth-form">
                    <div className="input-group">
                        <input type="email" name="email" placeholder=" " required />
                        <label>Email Address</label>
                        <div className="input-line"></div>
                    </div>

                    <button type="submit" className="auth-btn">
                        Continue to OTP
                    </button>
                </form>

                <div className="auth-footer">
                    <p>New here? <span className="link" onClick={() => setPage("register")}>Create account</span></p>
                </div>
            </div>
        </div>
    );
}