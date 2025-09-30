import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCars } from "../../context/CarContext"; 
import Loading from "../../components/Loading/Loading";
import "./Vehicles.css";

const Vehicles = () => {
  const navigate = useNavigate();
  const { vehicles, addVehicle, loading, error, setError } = useCars(); // ✅ obtener setError del contexto
  const [showModal, setShowModal] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Bloquear scroll cuando el modal está abierto
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showModal]);

  // Mostrar alert si hay error y limpiarlo
  useEffect(() => {
    if (error) {
      alert(error);
      setError(null); // ✅ limpiar error
    }
  }, [error, setError]);

  // Manejar envío del formulario
  const onSubmit = async (formData) => {
    await addVehicle(formData);
    reset();
    setShowModal(false);
  };

  // Abrir modal y limpiar formulario
  const handleOpenModal = () => {
    reset();
    setShowModal(true);
  };

  if (loading) return <Loading/>

  return (
    <div className="vehicles-container">
      <h2>Mis Vehículos</h2>

      {vehicles.length === 0 ? (
        <>
          <p className="no-vehicles">No tienes vehículos. Añade alguno:</p>
          <button className="add-vehicle-btn" onClick={handleOpenModal}>
            Añadir vehículo
          </button>
        </>
      ) : (
        <>
          <div className="vehicles-list">
            {vehicles.map((v, index) => (
              <div key={index} className="vehicle-card-horizontal">
                <img
                  src={v.images && v.images[1] ? v.images[1] : "https://via.placeholder.com/300x150?text=Sin+imagen"}
                  alt={`Vehículo ${v.vin}`}
                  className="vehicle-image-horizontal"
                />
                <div className="vehicle-info-horizontal">
                  <div className="carData">
                    <p className="carName">{v.specs.longType || "N/A"}</p>
                    <p className="carVin">{v.vin}</p>
                  </div>
                  <div className="carButtons">
                    <button onClick={() => navigate(`/schedule/${v._id}`)} className="tallerBtn">
                      Taller
                    </button>
                    <button onClick={() => navigate(`/vehicle/${v._id}`)} className="verMasBtn">
                      Ver más
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="add-vehicle-btn" onClick={handleOpenModal}>
            Añadir otro vehículo
          </button>
        </>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Añadir vehículo</h3>
            <form className="vehicle-form" onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                placeholder="VIN"
                {...register("vin", { required: "El VIN es obligatorio" })}
              />
              {errors.vin && <span className="error">{errors.vin.message}</span>}

              <input
                type="number"
                placeholder="Kilometraje (km)"
                {...register("km", { required: "El kilometraje es obligatorio", min: 0 })}
              />
              {errors.km && <span className="error">{errors.km.message}</span>}

              <div className="modal-buttons">
                <button type="submit">Guardar vehículo</button>
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vehicles;
