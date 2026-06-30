import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [role, setRole] = useState("user");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      setIsError(false);
      setMessage("⏳ Logging in...");

      const data = await loginUser({
        email,
        password,
      });

      console.log("LOGIN RESPONSE:", data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.user.name);
      localStorage.setItem("userEmail", data.user.email);
      console.log("Selected Role:", role);
      console.log("Entered Email:", email);
      console.log("Entered Password:", password);
      if (
        role === "admin" &&
        email === "admin@skyjourney.com" &&
        password === "Admin123"
      ) {
        localStorage.setItem("role", "admin");
      } else {
        localStorage.setItem("role", "user");
      }

      setMessage(`✅ Welcome ${data.user.name}`);

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.log(error);

      setIsError(true);
      setMessage("❌ Invalid Email or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="bg-slate-900 p-8 rounded-xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-500 mb-6">
          Login ✈️
        </h1>

        {message && (
          <div
            className={`p-3 rounded-lg mb-4 text-white ${
              isError ? "bg-red-600" : "bg-green-600"
            }`}
          >
            {message}
          </div>
        )}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Login As</label>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-blue-500"
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-blue-500"
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold transition disabled:bg-slate-600"
          >
            {loading ? "Please Wait..." : "Login"}
          </button>
        </div>

        <p className="text-center text-slate-400 mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:text-blue-400">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
