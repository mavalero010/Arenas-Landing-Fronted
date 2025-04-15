"use client";
import React from "react";
const handleVerInmuebles = () => {
    alert("¡Cargando inmuebles destacados!");
  };
const Banner = () => {
    return (
        <div>
            {/* Sección de Breadcrumb (si lo necesitas) */}
      <section className="bg-light py-2">
 
      </section>

      {/* Banner principal */}
      <section className="position-relative text-white">
        {/* Sustituye por la imagen que desees, ajusta el height según tu diseño */}
        <img
          src="https://arenasinmobiliaria.co/wp-content/uploads/2024/07/88468_0_103449365_11zon.webp"
          alt="Banner Inmobiliaria"
          className="img-fluid w-100"
          style={{ objectFit: "cover", height: "500px" }}
        />
        {/* Texto superpuesto en el banner */}
        <div
          className="position-absolute top-50 start-50 translate-middle text-center"
          style={{ maxWidth: "600px" }}
        >
          <h1 className="display-4 fw-bold mb-3">
            Bienvenido a Arenas Inmobiliaria
          </h1>
          <p className="lead mb-4">
            Tu plataforma confiable para encontrar la propiedad perfecta.
          </p>
          <button className="btn btn-light px-4" onClick={handleVerInmuebles}>
            Ver Inmuebles
          </button>
        </div>
      </section>

      {/* Sección de Servicios */}
      <section className="py-5" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="container">
          <h2 className="text-center mb-4">Nuestros Servicios</h2>
          <div className="row g-4">
            {/* Tarjeta de servicio 1 */}
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow">
                <img
                  src="https://arenasinmobiliaria.co/wp-content/uploads/2024/07/88468_0_103449365_11zon.webp"
                  alt="Servicio 1"
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">Venta de Propiedades</h5>
                  <p className="card-text">
                    Te ayudamos a vender tu inmueble de forma rápida y segura.
                  </p>
                  <button className="btn btn-primary">Más información</button>
                </div>
              </div>
            </div>
            {/* Tarjeta de servicio 2 */}
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow">
                <img
                  src="https://arenasinmobiliaria.co/wp-content/uploads/2024/07/88468_0_103449365_11zon.webp"
                  alt="Servicio 2"
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">Arriendo</h5>
                  <p className="card-text">
                    Encuentra el arriendo perfecto según tus necesidades.
                  </p>
                  <button className="btn btn-primary">Más información</button>
                </div>
              </div>
            </div>
            {/* Tarjeta de servicio 3 */}
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow">
                <img
                  src="https://arenasinmobiliaria.co/wp-content/uploads/2024/07/88468_0_103449365_11zon.webp"
                  alt="Servicio 3"
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">Administración de Propiedades</h5>
                  <p className="card-text">
                    Gestionamos tu propiedad para maximizar tu retorno.
                  </p>
                  <button className="btn btn-primary">Más información</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Inmuebles Destacados o Listado */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">Inmuebles Destacados</h2>
          <p className="text-center mb-5">
            Explora nuestras mejores opciones disponibles en el mercado.
          </p>

          {/* Ejemplo: Grilla de inmuebles */}
          <div className="row g-4">
            {/* A modo de ejemplo se muestran 6 inmuebles. Ajusta según tus datos */}
            {[...Array(6)].map((_, index) => (
              <div className="col-md-4" key={index}>
                <div className="card h-100 border-0 shadow-sm">
                  <img
                    src={`/images/inmueble${index + 1}.jpg`}
                    alt={`Inmueble ${index + 1}`}
                    className="card-img-top"
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">Inmueble #{index + 1}</h5>
                    <p className="card-text flex-grow-1">
                      Descripción breve de la propiedad #{index + 1}. Ubicada en
                      una zona privilegiada con acceso a múltiples servicios.
                    </p>
                    <button className="btn btn-primary mt-auto align-self-start">
                      Ver Detalles
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Botón para cargar más o paginación */}
          <div className="text-center mt-5">
            <button className="btn btn-outline-primary">Cargar más</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-5">
        <div className="container text-center">
          <img
            src="/images/logo-arenas.png"
            alt="Logo Arenas"
            style={{ maxWidth: "120px", marginBottom: "1rem" }}
          />
          <p className="mb-1">&copy; {new Date().getFullYear()} Arenas Inmobiliaria</p>
          <p className="mb-3">Todos los derechos reservados</p>
          <div>
            {/* Redes sociales (ejemplos) */}
            <a
              href="https://facebook.com"
              className="text-white me-3"
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>
            <a
              href="https://instagram.com"
              className="text-white me-3"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
            <a
              href="https://twitter.com"
              className="text-white"
              target="_blank"
              rel="noreferrer"
            >
              Twitter
            </a>
          </div>
        </div>
      </footer>
        </div>
    );
};

export default Banner;