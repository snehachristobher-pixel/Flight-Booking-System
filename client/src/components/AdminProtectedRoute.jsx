import { Navigate } from "react-router-dom";

function AdminProtectedRoute({ children }) {
  const role = localStorage.getItem("role");

  return role === "admin" ? children : <Navigate to="/" />;
}

export default AdminProtectedRoute;
