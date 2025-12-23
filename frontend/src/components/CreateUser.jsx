import { useState } from "react";
import api from "../services/api";

function CreateUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await api.post("/api/auth/register", form);
      setMessage("✅ User created successfully");

      setForm({
        name: "",
        email: "",
        password: "",
      });
    } catch (err) {
      setMessage("❌ Failed to create user");
    }
  };

  return (
    <div className="form-card">
      <h2>Create User</h2>

      
      <form onSubmit={handleSubmit}>
        <div className="form-row">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Create User</button>
        </div>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default CreateUser;
