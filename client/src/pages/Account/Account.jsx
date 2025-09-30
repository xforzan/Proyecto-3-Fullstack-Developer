import "./Account.css";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { uploadAvatar } from "../../utils/AvatarUploader";

const Account = () => {
  const { user, error, logout, setAvatar, loading, deleteAccount } = useContext(AuthContext);

  const [sessionClosed, setSessionClosed] = useState(false);
  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const [deletedAccount, setDeletedAccount] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (sessionClosed || deletedAccount) {
      setTimeout(() => navigate("/"), 2000);
    }
  }, [sessionClosed, deletedAccount]);

  useEffect(() => {
    const component = document.getElementById("avatarLoader");
    if (component) {
      component.style.display = loadingAvatar ? "block" : "none";
    }
  }, [loadingAvatar]);

  if (error) return <p>Error: {error}</p>;
  if (sessionClosed) return <p>Se ha cerrado tu sesión correctamente</p>;
  if (deletedAccount) return <p>Se ha eliminado la cuenta correctamente</p>;
  if (loading) return <p>Cargando...</p>;
  if (!user) return <p>No has iniciado sesión</p>;

  const handleLogout = () => {
    logout();
    setSessionClosed(true);
  };

  const handleAvatar = async (e) => {
    setLoadingAvatar(true);
    const file = e.target.files[0];
    const avatarUrl = await uploadAvatar(file);
    if (avatarUrl) setAvatar(avatarUrl);
    setLoadingAvatar(false);
  };

  const handleDelete = async () => {
    const result = await deleteAccount();
    if (result.success) {
      setDeletedAccount(true);
      logout();
    } else {
      alert(result.message || "Error al eliminar la cuenta");
    }
  };

  return (
    <div className="userData">
      <div className="avatarLoading">
        <img src={user.avatar} alt="avatar" className="avatarImage" />
        {loadingAvatar && (
          <dotlottie-wc
            id="avatarLoader"
            src="https://lottie.host/a5ec6860-9da0-4fc1-b775-c7392ac9349a/swDwYFSklU.lottie"
            speed="1"
            autoplay
            loop
          ></dotlottie-wc>
        )}
      </div>

      <h2>{user.name}</h2>
      <p>{user.email}</p>

      <label htmlFor="avatar">Cambiar avatar</label>
      <input type="file" id="avatar" name="avatar" onChange={handleAvatar} />

      <button onClick={handleLogout}>Cerrar sesión</button>
      <button onClick={handleDelete}>Eliminar cuenta</button>
    </div>
  );
};

export default Account;
