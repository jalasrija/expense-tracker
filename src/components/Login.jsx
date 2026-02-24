import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css";

export default function Login(){

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {

    setErrorMsg("");

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    if (existingUsers.length === 0) {
      setErrorMsg("No account found. Please sign up first.");
      return;
    }

    const matchedUser = existingUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!matchedUser) {
      setErrorMsg("Invalid Email or Password. Please check and try again.");
      return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
    navigate("/dashboard");
  };

  return(
    <div className="login-container">

      <div className="overlay"></div>

      <div className="login-card">
        <h1 className="login-title">Expense Tracker</h1>
        <p className="login-tagline">
          Track every rupee. Build smarter financial habits.
        </p>

        {errorMsg && (
          <p style={{
            color: "red",
            backgroundColor: "rgba(255,0,0,0.1)",
            border: "1px solid red",
            borderRadius: "8px",
            padding: "10px",
            marginBottom: "10px",
            fontSize: "13px",
            fontWeight: "600"
          }}>
            {errorMsg}
          </p>
        )}

        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Field with Eye Icon */}
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button onClick={handleLogin}>Login</button>

        <p className="signup-text">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>

        <p className="signup-text">
          Forgot Password? <Link to="/forgot-password">Click here!</Link>
        </p>
      </div>

    </div>
  )
}