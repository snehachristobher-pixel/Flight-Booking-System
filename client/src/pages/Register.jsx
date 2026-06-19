import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!passwordRegex.test(form.password)) {
      setError(
        "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter and 1 number.",
      );
      return;
    }

    try {
      await registerUser(form);

      setSuccess("✅ Registration Successful! Please login to continue.");

      setForm({
        name: "",
        email: "",
        password: "",
      });

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white px-4">
      <div className="bg-slate-900 p-8 rounded-xl w-full max-w-md shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-500">
          Create Account ✈️
        </h1>

        {error && (
          <div className="bg-red-600 p-3 rounded-lg mb-4 text-white">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-600 p-3 rounded-lg mb-4 text-white">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-blue-500"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-blue-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-blue-500"
            required
          />

          <p className="text-sm text-slate-400 mt-2 mb-4">
            Password must contain:
            <br />
            • Minimum 8 characters
            <br />
            • 1 Uppercase letter
            <br />
            • 1 Lowercase letter
            <br />• 1 Number
          </p>

          <button
            type="submit"
            className="w-full bg-blue-600 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-slate-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:text-blue-300">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
