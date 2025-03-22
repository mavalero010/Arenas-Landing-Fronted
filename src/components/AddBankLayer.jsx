"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isTokenExpired, refreshAccessToken } from "@/utils/authUtils";

const AddBankLayer = () => {
  const router = useRouter();
  const [banks, setBanks] = useState([]);
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddBankModal, setShowAddBankModal] = useState(false);
  const [formData, setFormData] = useState({
    countryId: "",
    bankName: "",
    bankCode: "",
    isActive: true
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  // Obtener países soportados
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        let token = localStorage.getItem("accessToken");
        if (!token || isTokenExpired(token)) {
          token = await refreshAccessToken();
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}admin/auth/supported-countries`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) throw new Error("Error al obtener países");
        
        const data = await response.json();
        setCountries(data);
        
      } catch (error) {
        console.error("Error fetching countries:", error);
        setError("Error al cargar lista de países");
      }
    };

    fetchCountries();
  }, []);

  // Obtener bancos
  useEffect(() => {
    const fetchData = async () => {
      try {
        let token = localStorage.getItem("accessToken");
        if (!token || isTokenExpired(token)) {
          token = await refreshAccessToken();
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}admin/auth/country-banks`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 401) {
          await refreshAccessToken();
          return fetchData();
        }

        const data = await response.json();
        setBanks(Array.isArray(data) ? data : []);

      } catch (err) {
        setError(err.message);
        router.push("/sign-in");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router]);

  // Manejar creación de banco
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);

    try {
      let token = localStorage.getItem("accessToken");
      if (!token || isTokenExpired(token)) {
        token = await refreshAccessToken();
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}admin/auth/country-banks/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(formData)
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al crear banco");
      }

      setFormData({ countryId: "", bankName: "", bankCode: "", isActive: true });
      setShowAddBankModal(false);
      alert("Banco creado exitosamente!");
      router.refresh(); // Recargar los datos actualizados

    } catch (err) {
      setFormError(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  // Componente Modal
  const AddBankModal = () => (
    <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content radius-12">
          <div className="modal-header border-bottom">
            <h5 className="modal-title">Agregar Nuevo Banco</h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setShowAddBankModal(false)}
            ></button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {formError && (
                <div className="alert alert-danger text-sm">{formError}</div>
              )}
              
              <div className="mb-3">
                <label className="form-label">País</label>
                <select
                  className="form-select"
                  value={formData.countryId}
                  onChange={(e) => setFormData({...formData, countryId: e.target.value})}
                  required
                  disabled={countries.length === 0}
                >
                  <option value="">Seleccionar País</option>
                  {countries.map(country => (
                    <option key={country.id} value={country.id}>
                      {country.countryName}
                    </option>
                  ))}
                  {countries.length === 0 && (
                    <option disabled>Cargando países...</option>
                  )}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Nombre del Banco</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.bankName}
                  onChange={(e) => setFormData({...formData, bankName: e.target.value})}
                  required
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label">Código del Banco</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.bankCode}
                  onChange={(e) => setFormData({...formData, bankCode: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                  id="isActiveCheck"
                />
                <label className="form-check-label" htmlFor="isActiveCheck">
                  Activo
                </label>
              </div>
            </div>
            
            <div className="modal-footer border-top">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowAddBankModal(false)}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={formLoading}
              >
                {formLoading ? "Creando..." : "Crear Banco"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  // Renderizado condicional
  if (isLoading) {
    return (
      <div className="card h-100 p-0 radius-12">
        <div className="card-body p-24 text-center">
          <Icon icon="eos-icons:loading" className="text-3xl" />
          <p>Cargando bancos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card h-100 p-0 radius-12">
        <div className="card-body p-24 text-center text-danger">
          <Icon icon="ion:warning-outline" className="text-3xl" />
          <p>Error: {error}</p>
          <Link href="/sign-in" className="btn btn-primary">
            Por favor inicia sesión nuevamente
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="card h-100 p-0 radius-12">
      {showAddBankModal && <AddBankModal />}

      {/* Header */}
      <div className="card-header border-bottom bg-base py-16 px-24 d-flex flex-wrap gap-3 justify-content-between">
        <div className="d-flex flex-wrap gap-3 justify-content-center text-center">
          <span className="text-md fw-medium text-secondary-light mb-0">Mostrar</span>
          <select
            className="form-select form-select-sm w-auto ps-12 py-6 radius-12 h-40-px"
            defaultValue="Select Number"
          >
            <option value="Select Number" disabled>
              Seleccionar número
            </option>
            {[...Array(10)].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <form className="navbar-search">
            <input
              type="text"
              className="bg-base h-40-px w-auto"
              name="search"
              placeholder="Buscar"
            />
            <Icon icon="ion:search-outline" className="icon" />
          </form>
          <select
            className="form-select form-select-sm w-auto ps-12 py-6 radius-12 h-40-px"
            defaultValue="Select Status"
          >
            <option value="Select Status" disabled>
              Seleccionar estado
            </option>
            <option value="Active">Activo</option>
            <option value="Inactive">Inactivo</option>
          </select>
        </div>
        
        <button
          onClick={() => setShowAddBankModal(true)}
          className="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2"
        >
          <Icon icon="ic:baseline-plus" className="icon text-xl line-height-1" />
          Agregar Banco
        </button>
      </div>

      {/* Tabla de Bancos */}
      <div className="card-body p-24 text-center">
        <div className="table-responsive scroll-sm">
          <table className="table bordered-table sm-table mb-0">
            <thead>
              <tr>
                <th scope="col">
                  <div className="d-flex align-items-center gap-10 justify-content-center">
                    <div className="form-check style-check d-flex align-items-center">
                      <input
                        className="form-check-input radius-4 border input-form-dark"
                        type="checkbox"
                        name="checkbox"
                        id="selectAll"
                      />
                    </div>
                    S.L
                  </div>
                </th>
                <th scope="col" className="text-center">Nombre del Banco</th>
                <th scope="col" className="text-center">Código</th>
                <th scope="col" className="text-center">País</th>
                <th scope="col" className="text-center">Estado</th>
                <th scope="col" className="text-center">Fecha de Creación</th>
                <th scope="col" className="text-center">Acción</th>
              </tr>
            </thead>

            <tbody>
              {banks && banks.length > 0 ? (
                banks.map((bank, index) => (
                  <tr key={bank.id}>
                    <td>
                      <div className="d-flex align-items-center gap-10 justify-content-center">
                        <div className="form-check style-check d-flex align-items-center">
                          <input
                            className="form-check-input radius-4 border border-neutral-400"
                            type="checkbox"
                            name="checkbox"
                          />
                        </div>
                        {index + 1}
                      </div>
                    </td>
                    <td className="text-center">{bank.bankName}</td>
                    <td className="text-center">{bank.bankCode}</td>
                    <td className="text-center">{bank.country?.countryName || "N/A"}</td>
                    <td className="text-center">
                      <span className={`badge ${bank.isActive ? 'bg-success' : 'bg-danger'}`}>
                        {bank.isActive ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="text-center">
                      {new Date(bank.createdAt).toLocaleDateString()}
                    </td>
                    <td className="text-center">
                      <div className="d-flex align-items-center gap-10 justify-content-center">
                        <button className="btn btn-sm btn-primary">
                          Editar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No se encontraron bancos registrados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddBankLayer;