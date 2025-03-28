"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isTokenExpired, refreshAccessToken } from "@/utils/authUtils";
import { Modal, Button, Form, Pagination } from "react-bootstrap";

const TransferListHistoryLayer = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let token = localStorage.getItem("accessToken");
        if (!token || isTokenExpired(token)) {
          token = await refreshAccessToken();
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}admin/auth/user/recent-transactions`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 401) {
          await refreshAccessToken();
          return fetchData(); // Reintenta una sola vez
        }

        const data = await response.json();

        // Si la respuesta es un array, lo usamos, de lo contrario, lo forzamos a array (o vacío)
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          setUsers([]);
        }
      } catch (err) {
        setError(err.message);
        router.push("/sign-in"); // Redirección si hay error
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (isLoading) {
    return (
      <div className="card h-100 p-0 radius-12">
        <div className="card-body p-24 text-center">
          <Icon icon="eos-icons:loading" className="text-3xl" />
          <p>Cargando Usuarios...</p>
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
          Por favor, inicia sesión de nuevo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="card h-100 p-0 radius-12">
  {/* Header */}
  <div className="card-header border-bottom bg-base py-16 px-24 d-flex flex-wrap gap-3 justify-content-between">
    <div className="d-flex flex-wrap gap-3 justify-content-center text-center">
      <span className="text-md fw-medium text-secondary-light mb-0">Filtros</span>
      <select
        className="form-select form-select-sm ps-6 py-6 radius-12 h-40-px"
        style={{ width: '120px' }} // Ajusta el ancho según tus necesidades
        defaultValue="Select Number"
      >
        <option value="Select Number" disabled>
          Seleccionar
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
          Selecionar Estado
        </option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
    </div>
    <div className="flex-grow-0">
            <Button
              variant="primary"
              className='text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2'
            >
              <Icon icon="ion:search-outline" className='icon text-xl line-height-1' />
              Buscar
            </Button>
          </div>
  </div>

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
                N.º
              </div>
            </th>
            <th scope="col" className="text-center">Nombre</th>
            <th scope="col" className="text-center">Correo</th>
            <th scope="col" className="text-center"># Transacciones</th>
            <th scope="col" className="text-center">Última transacción</th>
            <th scope="col" className="text-center">Acción</th>
          </tr>
        </thead>

        <tbody>
          {users && users.length > 0 ? (
            users.map((user, index) => {
              let latestTransactionDate = null;
              if (user.sentTransactions && user.sentTransactions.length > 0) {
                const sortedTransactions = [...user.sentTransactions].sort(
                  (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
                latestTransactionDate = sortedTransactions[0].createdAt;
              }
              return (
                <tr key={user.id}>
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
                  <td className="text-center">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="text-center">
                    <span className="text-md mb-0 fw-normal text-secondary-light">
                      {user.email}
                    </span>
                  </td>
                  <td className="text-center">
                    {user.sentTransactions ? user.sentTransactions.length : 0}
                  </td>
                  <td className="text-center">
                    {latestTransactionDate
                      ? new Date(latestTransactionDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="text-center">
                    <div className="d-flex align-items-center gap-10 justify-content-center">
                      <Link
                        href={`#`} // Aquí podrías ajustar la ruta, por ejemplo `/user/${user.id}`
                        className="btn btn-sm btn-primary"
                      >
                        Vista
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
              No se encontraron usuarios.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    {/* Aquí se puede incluir la paginación */}
  </div>
</div>

  );
};

export default TransferListHistoryLayer;
