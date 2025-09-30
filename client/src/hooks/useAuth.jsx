import { useState, useEffect } from "react";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/v1/auth/verify", {
          method: "POST",
          credentials: "include"
        });

        if (!res.ok) {
          console.error("No se pudo verificar la sesión");
        }

        const data = await res.json();
        setIsLoggedIn(data.isLoggedIn);
      } catch (err) {
        setError(err.message);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { isLoggedIn, loading, error };
}
