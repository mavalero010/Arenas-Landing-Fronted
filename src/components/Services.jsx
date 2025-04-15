"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const Services = () => {
  const [properties, setProperties] = useState([]);
  const [city, setCity] = useState(null);
  const [neighborhood, setNeighborhood] = useState(null);
  const [type, setType] = useState(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [featured, setFeatured] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [expandedImage, setExpandedImage] = useState(null);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(Math.floor(value));
  };

  const cities = [
    "Seleccione ciudad", "New York", "Los Angeles", "Chicago", "Miami", "San Francisco",
    "Austin", "Seattle", "Boston", "Denver", "Phoenix",
    "Orlando", "Atlanta", "Dallas", "San Diego", "Portland",
    "Las Vegas", "Philadelphia", "Houston", "Charlotte", "Nashville",
    "Indianapolis", "Minneapolis", "Salt Lake City", "Kansas City",
    "Cincinnati", "Milwaukee", "Tampa", "Raleigh", "Virginia Beach",
    "Jacksonville", "Omaha", "Albuquerque", "Fresno", "Tucson",
    "Bakersfield", "Anchorage", "Chattanooga", "Boise", "Des Moines",
    "Little Rock"
  ];

  const neighborhoods = [
    "Seleccione vecindario", "Manhattan", "Hollywood", "Downtown", "South Beach", "Mission District",
    "Capitol Hill", "Back Bay", "LoDo", "Lake Nona", "Midtown",
    "Uptown", "Gaslamp Quarter", "Pearl District", "The Strip",
    "Center City", "South End", "Music Row", "North Loop",
    "Crossroads", "Over-the-Rhine", "Ybor City", "Oceanfront",
    "Old Market", "Nob Hill", "North Shore"
  ];

  const fetchProperties = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}property/search?city=${city || ''}&neighborhood=${neighborhood || ''}&type=${type || ''}&minPrice=${minPrice || ''}&maxPrice=${maxPrice || ''}&featured=${featured}&isNew=${isNew}`);
      const data = await response.json();
      setProperties(data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [city, neighborhood, type, minPrice, maxPrice, featured, isNew]);

  const handleImageClick = (imageUrl) => {
    setExpandedImage(imageUrl);
  };

  const handleCloseImage = () => {
    setExpandedImage(null);
  };

  return (
    <div>
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">Inmuebles Destacados</h2>
          <h4 className="text-center mb-4">Filtrar Propiedades</h4>
          {/* Inputs para los filtros */}
          <div className="row mb-4 justify-content-center">
            <div className="col-md-3 mb-3">
              <select className="form-select" value={city || ''} onChange={(e) => setCity(e.target.value === "Seleccione ciudad" ? null : e.target.value)}>
                <option value="Seleccione ciudad">Seleccione ciudad</option>
                {cities.slice(1).map((cityOption) => (
                  <option key={cityOption} value={cityOption}>{cityOption}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3 mb-3">
              <select className="form-select" value={neighborhood || ''} onChange={(e) => setNeighborhood(e.target.value === "Seleccione vecindario" ? null : e.target.value)}>
                <option value="Seleccione vecindario">Seleccione vecindario</option>
                {neighborhoods.slice(1).map((neighborhoodOption) => (
                  <option key={neighborhoodOption} value={neighborhoodOption}>{neighborhoodOption}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3 mb-3">
              <select className="form-select" value={type || ''} onChange={(e) => setType(e.target.value === "Seleccione tipo" ? null : e.target.value)}>
                <option value="Seleccione tipo">Seleccione tipo</option>
                <option value="Apartamento">Apartamento</option>
                <option value="Casa">Casa</option>
                <option value="Condominio">Condominio</option>
                <option value="Loft">Loft</option>
              </select>
            </div>
            <div className="col-md-3 mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Precio Mínimo"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>
            <div className="col-md-3 mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Precio Máximo"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
            <div className="col-md-3 mb-3">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                />
                <label className="form-check-label">Destacados</label>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={isNew}
                  onChange={(e) => setIsNew(e.target.checked)}
                />
                <label className="form-check-label">Nuevos</label>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <button className="btn btn-primary w-100" onClick={fetchProperties}>Buscar</button>
            </div>
          </div>

          <div className="row g-4">
            {properties.length > 0 ? (
              properties.map((property) => (
                <div className="col-md-4" key={property.id}>
                  <div className="card h-100 border-0 shadow">
                    <img
                      src={property.image_url}
                      alt={property.description}
                      className="card-img-top"
                      onClick={() => handleImageClick(property.image_url)}
                      style={{ cursor: 'pointer' }}
                    />
                    <div className="card-body text-center">
                      <h5 className="card-title">{property.type}</h5>
                      <p className="card-text">
                        {property.description}
                      </p>
                      <p className="card-text">
                        Precio: {formatCurrency(property.price)} USD
                      </p>
                      <button className="btn btn-primary" onClick={() => handleImageClick(property.image_url)}>Ver Detalles</button>

                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">No se encontraron propiedades.</p>
            )}
          </div>

          {expandedImage && (
            <div className="modal" style={{ display: 'block', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.8)', zIndex: 1050 }}>
              <span onClick={handleCloseImage} style={{ position: 'absolute', top: '20px', right: '30px', color: 'white', fontSize: '30px', cursor: 'pointer' }}>&times;</span>
              <img src={expandedImage} alt="Expanded" style={{ display: 'block', margin: 'auto', maxHeight: '80%', maxWidth: '80%', marginTop: '5%' }} />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Services;