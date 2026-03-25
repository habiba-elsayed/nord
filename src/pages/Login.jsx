import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // Update form values
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Submit login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost/php-api/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

     if (data.success) {
  navigate("/", { replace: true }); // Redirect to home
} else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };

  return (
    <div className="container py-5 col-md-4">
      <h2 className="mb-4">Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button className="btn btn-dark w-100" type="submit">
          Login
        </button>

        <p className="text-muted mt-2">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-primary-subtle text-decoration-none"
          >
            REGISTER
          </a>
        </p>
      </form>

      {error && <p className="text-danger mt-3">{error}</p>}
    </div>
  );
} 