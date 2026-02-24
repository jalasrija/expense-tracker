import { useState } from "react";
import { Link } from "react-router-dom";
import "./Forgot.css";

export default function Forgot() {

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleReset = () => {
    if (!email) {
      alert("Please enter your email address.");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser || storedUser.email !== email) {
      alert("No account found with this email.");
      return;
    }

    setSubmitted(true);
  };

  return (
    <div className="forgot-container">

      <div className="overlay"></div>

      <div className="forgot-card">
        <h1 className="forgot-title">Forgot Password</h1>
        <p className="forgot-tagline">
          Enter your registered email to reset your password.
        </p>

        {!submitted ? (
          <>
            <input
              type="email"
              placeholder="Enter your registered email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <button onClick={handleReset}>Send Reset Link</button>
          </>
        ) : (
          <div className="success-message">
            ✅ A password reset link has been sent to <strong>{email}</strong>. Please check your inbox.
          </div>
        )}

        <p className="back-text">
          Remembered your password? <Link to="/">Login</Link>
        </p>
      </div>

    </div>
  );
}