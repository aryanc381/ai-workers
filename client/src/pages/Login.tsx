import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    const res = await fetch("http://localhost:3000/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (data.status !== 200) return setError(data.msg);

    navigate("/");
  }

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h1 style={styles.heading}>Sign in</h1>

        {error && <p style={styles.error}>{error}</p>}

        <label style={styles.label}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />

        <label style={styles.label}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button}>
          Sign in
        </button>

        <p style={styles.linkText}>
          Don't have an account? <Link to="/signup" style={styles.link}>Sign up</Link>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    padding: 20,
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 8,
    width: "100%",
    maxWidth: 400,
    background: "#fff",
    padding: 32,
    borderRadius: 12,
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  heading: {
    fontSize: 24,
    fontWeight: 600,
    marginBottom: 16,
    textAlign: "center" as const,
  },
  label: {
    fontSize: 14,
    fontWeight: 500,
  },
  input: {
    padding: "10px 12px",
    fontSize: 15,
    border: "1px solid #d1d5db",
    borderRadius: 8,
    outline: "none",
  },
  button: {
    padding: 10,
    fontSize: 15,
    fontWeight: 600,
    color: "#fff",
    background: "#111827",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    marginTop: 8,
  },
  linkText: {
    fontSize: 14,
    textAlign: "center" as const,
    marginTop: 8,
  },
  link: {
    color: "#6366f1",
    fontWeight: 500,
  },
  error: {
    color: "#dc2626",
    fontSize: 14,
    textAlign: "center" as const,
  },
};
