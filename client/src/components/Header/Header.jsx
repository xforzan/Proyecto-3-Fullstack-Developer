import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <header>
      <Link to="/">
        <div className="logo">
          <img src="/logo.svg" alt="logo" />
        </div>
      </Link>

      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/vehicles">Vehicles</Link></li>
          <li><Link to="/appointments">Appointments</Link></li>
        </ul>
      </nav>

      <img
        className="avatar"
        src={user?.avatar || "https://res.cloudinary.com/dileah1ig/image/upload/v1757442337/avatar_jt1vlf.png"}
        alt="account"
        onClick={() => navigate("/account")}
      />
    </header>
  );
};

export default Header;
