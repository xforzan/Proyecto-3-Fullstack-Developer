// Schedule.jsx
import './Schedule.css';
import { useCars } from '../../context/CarContext';
import { useAppointments } from '../../context/AppointmentContext';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';

const Schedule = () => {
  const { _id } = useParams();
  const { vehicles } = useCars();
  const { createAppointment } = useAppointments();

  const [car, setCar] = useState(null);
  const [carNotFound, setCarNotFound] = useState(null);
  const [loading, setLoading] = useState(true);

  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const vehicle = vehicles.find((v) => v._id == _id);
    if (vehicle) {
      setCar(vehicle);
      setLoading(false);
    } else {
      setCarNotFound(true);
    }
  }, [_id, vehicles]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!fecha || !hora) {
      setError("Por favor selecciona fecha y hora");
      return;
    }

    const result = await createAppointment({
      vehicleId: car._id,
      fecha,
      hora,
    });

    if (result.success) {
      setSuccess("Cita creada con éxito ✅");
      setTimeout(() => navigate("/appointments"), 2000);
    } else {
      setError(result.message);
    }
  };

  if (carNotFound) return <p>Coche no encontrado</p>;
  if (loading) return <Loading />;

  return (
    <div className="schedule-container">
      <h2>Agendar cita para {car.specs?.longType || car.vin}</h2>

      <form onSubmit={handleSubmit} className="schedule-form">
        <div className="form-group">
          <label>Fecha:</label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Hora:</label>
          <input
            type="time"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
          />
        </div>

        <button type="submit">Reservar cita</button>
      </form>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
};

export default Schedule;
