import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); 

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("http://localhost/php-api/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        alert(data.error); 
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">Get in Touch</h1>

      <form className="col-md-6" onSubmit={handleSubmit}>
        <input
          name="name"
          className="form-control mb-3"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          className="form-control mb-3"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          className="form-control mb-3"
          rows="5"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
          required
        />

        <button className="btn btn-accent" type="submit">
          Send Message
        </button>

        {status === "loading" && <p className="mt-3 text-muted">Sending...</p>}
        {status === "success" && (
          <p className="mt-3 text-success">Message sent successfully!</p>
        )}
        {status === "error" && (
          <p className="mt-3 text-danger">Failed to send message.</p>
        )}
      </form>
    </div>
  );
}
