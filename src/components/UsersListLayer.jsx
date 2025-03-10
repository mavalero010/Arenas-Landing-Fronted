"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import {jwtDecode} from 'jwt-decode';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'; // Añadir esto

const isTokenExpired = (token) => {
  if (!token) return true; // Si no hay token, se considera expirado
  const decoded = jwtDecode(token);
  return decoded.exp * 1000 < Date.now(); // Comparar con la fecha actual
};
const refreshAccessToken = async () => {
  //const refreshToken = localStorage.getItem('refreshToken');
  let accessToken = localStorage.getItem('accessToken');

  // Verifica si el token ha expirado
  if (isTokenExpired(accessToken)) {
    accessToken = await refreshAccessToken(); // Intenta refrescar el token
    if (!accessToken) {
      // Si no se pudo refrescar, redirige al usuario a la página de inicio de sesión
      window.location.href = '/login'; // O usa el enrutador de Next.js
      return;
    }
  }
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}admin/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }), // Enviar el refreshToken en el cuerpo
  });

  if (response.ok) {
    const data = await response.json();
    // Almacena el nuevo accessToken
    localStorage.setItem('accessToken', data.accessToken);
    return data.accessToken; // Devuelve el nuevo accessToken
  } else {
    // Maneja errores, como un refreshToken inválido
    console.error('Failed to refresh token');
    return null; // Indica que no se pudo refrescar el token
  }
};

const UsersListLayer = () => {
  const router = useRouter(); // Usar el router
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let token = localStorage.getItem('accessToken');
        
        // Primera verificación de token
        if (!token || isTokenExpired(token)) {
          token = await refreshAccessToken();
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}admin/transaction/users`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        if (response.status === 401) {
          await refreshAccessToken();
          return fetchData(); // Reintentar una sola vez
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
        router.push('/login'); // Redirección con Next.js Router
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  if (isLoading) {
    return (
      <div className="card h-100 p-0 radius-12">
        <div className="card-body p-24 text-center">
          <Icon icon="eos-icons:loading" className="text-3xl" />
          <p>Loading users...</p>
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
          <Link href="/login" className="btn btn-primary">
            Please login again
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="card h-100 p-0 radius-12">
      {/* Header se mantiene igual */}
      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
        {/* ... mismo contenido del header ... */}
      </div>

      <div className="card-body p-24">
        <div className="table-responsive scroll-sm">
          <table className="table bordered-table sm-table mb-0">
            <thead>
              <tr>
                {/* ... mismos encabezados ... */}
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>
                    <div className="d-flex align-items-center gap-10">
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
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={user.profileImage || "assets/images/default-user.png"}
                        alt={user.firstName}
                        className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden"
                      />
                      <div className="flex-grow-1">
                        <span className="text-md mb-0 fw-normal text-secondary-light">
                          {user.firstName} {user.lastName}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="text-md mb-0 fw-normal text-secondary-light">
                      {user.email}
                    </span>
                  </td>
                  <td>{user.department}</td>
                  <td>{user.designation}</td>
                  <td className="text-center">
                    <span
                      className={`border px-24 py-4 radius-4 fw-medium text-sm ${
                        user.isActive
                          ? "bg-success-focus text-success-600 border-success-main"
                          : "bg-danger-focus text-danger-600 border-danger-main"
                      }`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="text-center">
                    <div className="d-flex align-items-center gap-10 justify-content-center">
                      {/* Botones de acción */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Paginación se mantiene igual */}
      </div>
    </div>
  );
};

export default UsersListLayer;