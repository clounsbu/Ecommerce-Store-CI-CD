import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  // Get user information from AuthContext
  const { user } = useAuth();
  return (
    <div className="nav-container">
      <Link to="/" className="link">
        Home
      </Link>

      {/* If there is a user show profile and logout in navbar */}
      {user ? (
        <>
          <Link to="/profile" className="link">
            Profile
          </Link>
          <Link to="/logout" className="link">
            Logout
          </Link>
        </>
      ) : (
        // If there is no user show register and login in navbar
        <>
          <Link to="/register" className="link">
            Register
          </Link>
          <Link to="/login" className="link">
            Login
          </Link>
        </>
      )}
    </div>
  );
};

export default Navbar;
