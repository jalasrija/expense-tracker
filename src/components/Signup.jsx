import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Signup.css";

export default function Signup(){

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleSignup = () => {

    setErrorMsg("");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setErrorMsg("Enter valid email (example: name@gmail.com)");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const alreadyExists = existingUsers.find((u) => u.email === email);

    if (alreadyExists) {
      setErrorMsg("Account already exists with this email. Please login.");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters");
      return;
    }

    if (password !== confirm) {
      setErrorMsg("Passwords do not match");
      return;
    }

    const newUser = { email, password };
    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    alert("Registered Successfully!");
    navigate("/");
  };

  return(
    <div className="signup-container">

      <div className="overlay"></div>

      <div className="signup-card">

        <h1 className="signup-title">Create Account</h1>
        <p className="signup-tagline">
          Start managing your expenses smarter today.
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Field */}
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Confirm Password Field */}
        <div className="password-wrapper">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm your password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          <span
            className="eye-icon"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button onClick={handleSignup}>Register</button>

        <p className="login-text">
          Already have an account? <Link to="/">Login</Link>
        </p>

      </div>

    </div>
  )
}