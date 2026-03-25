import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost/php-api/register.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

   if (data.success) {
  navigate("/", { replace: true }); // Redirect to home
}else {
      setMsg(data.error);
    }
  };

  return (
    <div className="container py-5 col-md-4">
      <h2 className="mb-4">Register</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          className="form-control mb-3"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button className="btn btn-dark w-100">Register</button>
      </form>
      <p className="text-muted mt-2">Already have an account ? <span ><a href="/login" className="text-primary-subtle text-decoration-none">LOGIN  </a></span></p>

      {msg && <p className="text-danger mt-3">{msg}</p>}
    </div>
  );
}
