import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Loading from './Loading/Loading'

export default function PublicRoute({ children }) {
  const { isLoggedIn, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && isLoggedIn === true) {
      navigate("/");
    }
  }, [isLoggedIn, loading, navigate]);

  if (loading || isLoggedIn === null) return <Loading/>;

  return children;
}
