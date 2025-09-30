import './Appointments.css';
import { useAppointments } from "../../context/AppointmentContext";
import { useCars } from '../../context/CarContext';
import Loading from "../../components/Loading/Loading";
import { useEffect } from 'react';

const Appointments = () => {
  const { appointments, loading, cancelAppointment, fetchAppointments } = useAppointments();
  const { vehicles } = useCars();

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) return <Loading />;

  if (!appointments || appointments.length === 0) {
    return <p className="no-appointments">No tienes citas programadas.</p>;
  }

  return (
    <div className="appointments-container">
      <h2>Mis Citas</h2>

      <div className="appointments-list">
        {appointments.map((appt, index) => {
          const privateProps = appt.extendedProperties?.private || {};
          const car = vehicles.find(v => v.vin === privateProps.vin);
          const carImg = car?.images?.[1] || "https://via.placeholder.com/300x150?text=Sin+imagen";

          // ✅ Manejar start/dateTime undefined
          const date = appt.start?.dateTime ? new Date(appt.start.dateTime) : null;

          return (
            <div key={appt.id || index} className="appointment-card-horizontal">
              <img
                src={carImg}
                alt={privateProps.marcaModelo || "Vehículo"}
                className="appointment-car-image-horizontal"
              />
              <div className="appointment-info-horizontal">
                <div className="appointment-data">
                  <h2 className="appointment-vehicle">{car?.specs?.longType || "Desconocido"}</h2>
                  <p className="appointment-vin">{privateProps.vin || "Desconocido"}</p>
                  <span className={`appointment-status ${privateProps.status?.toLowerCase() || "pendiente"}`}>
                    {privateProps.status || "Pendiente"}
                  </span>

                  {date ? (
                    <>
                      <p className="appointment-time">
                        {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                      <p className="appointment-date">
                        {date.toLocaleDateString(undefined, {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </>
                  ) : (
                    <p className="appointment-time">Fecha no disponible</p>
                  )}
                </div>

                <div className="appointment-buttons">
                  <button
                    onClick={() => cancelAppointment(appt.id)}
                    className="verMasBtn2"
                  >
                    Cancelar cita
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Appointments;
