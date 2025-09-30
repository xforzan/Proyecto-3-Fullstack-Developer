import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const Auth = () => {
  const navigate = useNavigate();
  const { login, registerUser } = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState(null);

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setServerError(null);

    if (isLogin) {
      // Login
      const result = await login({ email: data.email, password: data.password });
      if (!result.success) return setServerError(result.message);
    } else {
      // Registro
      if (data.password !== data.confirmPassword) {
        return setServerError("Las contraseñas no coinciden");
      }

      const { name, email, password } = data;
      const result = await registerUser({ name, email, password });
      if (!result.success) return setServerError(result.message);
    }

    navigate("/account");
  };

  return (
    <main>
      <div className="logo">
        <img src="/logo.svg" alt="Logo Mercedes-Benz" />
        <h2>Mercedes-Benz</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>{isLogin ? "Iniciar sesión" : "Crear cuenta"}</h2>

        {!isLogin && (
          <>
            <input
              type="text"
              placeholder="Nombre"
              {...register("name", { required: "El nombre es obligatorio" })}
            />
            {errors.name && <span className="error">{errors.name.message}</span>}
          </>
        )}

        <input
          type="email"
          placeholder="Correo electrónico"
          {...register("email", { required: "El correo es obligatorio" })}
        />
        {errors.email && <span className="error">{errors.email.message}</span>}

        <div className="input-with-icon">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            {...register("password", { required: "La contraseña es obligatoria" })}
          />
          <span
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "👁️" : "🙈"}
          </span>
        </div>
        {errors.password && <span className="error">{errors.password.message}</span>}

        {!isLogin && (
          <>
            <input
              type="password"
              placeholder="Confirmar contraseña"
              {...register("confirmPassword", {
                required: "Confirma tu contraseña",
              })}
            />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}
          </>
        )}

        {serverError && <p className="error">{serverError}</p>}

        <button type="submit" className="submit-btn">
          {isLogin ? "Iniciar sesión" : "Registrarse"}
        </button>

        <p className="toggle-auth">
          {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
          <button className="changeForm" type="button" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Crear cuenta" : "Iniciar sesión"}
          </button>
        </p>
      </form>
    </main>
  );
};

export default Auth;
