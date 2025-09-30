import "./Vehicle.css";
import { useCars } from "../../context/CarContext";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

const Vehicle = () => {
  const { _id } = useParams();
  const { vehicles } = useCars();

  const [car, setCar] = useState(null);
  const [carNotFound, setCarNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!vehicles) return;

    const vehicle = vehicles.find((v) => v._id === _id);

    if (vehicle) {
      setCar(vehicle);
      setLoading(false);
    } else {
      setCarNotFound(true);
      setLoading(false);
    }
  }, [vehicles, _id]);

  if (loading) return <Loading />;
  if (carNotFound) return <p>Coche no encontrado</p>;

  const specs = car.specs;

  return (
    <>
      <h2>{specs?.longType || "N/A"}</h2>
      <div className="carContainer">
        <img className="carImg" src={car.images?.[2]} alt="Car-Image" />
        <div className="carEspecifications">

          {/* Detalles del vehículo */}
          <div className="apartado">
            <h3>Detalles del vehículo</h3>
            <div className="englobador">
              <div className="data">
                <p className="label">Marca:</p>
                <p>{specs?.marca || "N/A"}</p>
              </div>
              <div className="data">
                <p className="label">Modelo:</p>
                <p>{specs?.modelo || "N/A"}</p>
              </div>
              <div className="data">
                <p className="label">Versión:</p>
                <p>{specs?.version || "N/A"}</p>
              </div>
              <div className="data">
                <p className="label">Carrocería:</p>
                <p>{specs?.carroceria || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Motor y transmisión */}
          <div className="apartado">
            <h3>Motor y Transmisión</h3>
            <div className="englobador">
              <div className="data">
                <p className="label">Motor:</p>
                <p>{specs?.motor || "N/A"}</p>
              </div>
              <div className="data">
                <p className="label">Combustible:</p>
                <p>{specs?.combustible || "N/A"}</p>
              </div>
              <div className="data">
                <p className="label">Cambio:</p>
                <p>{specs?.cambio || "N/A"}</p>
              </div>
              <div className="data">
                <p className="label">Cilindros:</p>
                <p>{specs?.cilindros || "N/A"}</p>
              </div>
              <div className="data">
                <p className="label">Tracción:</p>
                <p>{specs?.traccion || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Rendimiento */}
          <div className="apartado">
            <h3>Rendimiento</h3>
            <div className="englobador">
              <div className="data">
                <p className="label">Potencia:</p>
                <p>{specs?.potenciaKW} kW / {specs?.potenciaCV} CV</p>
              </div>
              <div className="data">
                <p className="label">Par máximo:</p>
                <p>{specs?.parNm} Nm</p>
              </div>
              <div className="data">
                <p className="label">Aceleración:</p>
                <p>{specs?.aceleracion} s</p>
              </div>
              <div className="data">
                <p className="label">Velocidad máxima:</p>
                <p>{specs?.velocidadMax} Km/h</p>
              </div>
            </div>
          </div>

          {/* Neumáticos */}
          <div className="apartado">
            <h3>Neumáticos</h3>
            <div className="englobador">
              <div className="data">
                <p className="label">Delantero:</p>
                <p>{specs?.neumaticoDelantero}</p>
              </div>
              <div className="data">
                <p className="label">Trasero:</p>
                <p>{specs?.neumaticoTrasero}</p>
              </div>
            </div>
          </div>

          {/* Emisiones */}
          <div className="apartado" id="apartadoEmisiones">
            <h4>Emisiones de CO₂ g/km</h4>
            <div className="list-group-container">
              <ol className="list-group">
                <li>Hasta 120</li>
                <li>120 - 140</li>
                <li>140 - 155</li>
                <li>155 - 165</li>
                <li>165 - 190</li>
                <li>190 - 225</li>
                <li>225 +</li>
              </ol>

              <div className={`indicator indicator-${specs?.claseEmisiones}`}>
                <span>Las emisiones de CO₂ del vehículo</span>
                <span className="emissions">
                  <strong className="emission-value">{specs?.emisionesCO2} g/km</strong>
                  <span className="emission-class">
                    Clase
                    <strong
                      className="emission-class-value"
                      style={{ backgroundColor: specs?.colorEmisiones }}
                    >
                      {specs?.claseEmisiones}
                    </strong>
                  </span>
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Vehicle;
