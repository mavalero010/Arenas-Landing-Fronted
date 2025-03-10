"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isTokenExpired, refreshAccessToken } from "@/utils/authUtils";

const UsersListLayer = () => {
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
          `${process.env.NEXT_PUBLIC_BASE_URL}admin/auth/users/recent-transactions`,
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
          <Link href="/sign-in" className="btn btn-primary">
            Please login again
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="card h-100 p-0 radius-12">
      {/* Header */}
      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
        <div className="d-flex align-items-center flex-wrap gap-3">
          <span className="text-md fw-medium text-secondary-light mb-0">Show</span>
          <select
            className="form-select form-select-sm w-auto ps-12 py-6 radius-12 h-40-px"
            defaultValue="Select Number"
          >
            <option value="Select Number" disabled>
              Select Number
            </option>
            {[...Array(10)].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <form className="navbar-search">
            <input type="text" className="bg-base h-40-px w-auto" name="search" placeholder="Search" />
            <Icon icon="ion:search-outline" className="icon" />
          </form>
          <select
            className="form-select form-select-sm w-auto ps-12 py-6 radius-12 h-40-px"
            defaultValue="Select Status"
          >
            <option value="Select Status" disabled>
              Select Status
            </option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <Link
          href="/add-user"
          className="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2"
        >
          <Icon icon="ic:baseline-plus" className="icon text-xl line-height-1" />
          Add New User
        </Link>
      </div>

      <div className="card-body p-24">
        <div className="table-responsive scroll-sm">
          <table className="table bordered-table sm-table mb-0">
            <thead>
              <tr>
                <th scope="col">
                  <div className="d-flex align-items-center gap-10">
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
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col"># Transactions</th>
                <th scope="col">Latest Transaction</th>
                <th scope="col" className="text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {users && users.length > 0 ? (
                users.map((user, index) => {
                  // Obtenemos la fecha de la transacción más reciente, si existe
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
                      <td>
                        {user.firstName} {user.lastName}
                      </td>
                      <td>
                        <span className="text-md mb-0 fw-normal text-secondary-light">
                          {user.email}
                        </span>
                      </td>
                      <td>{user.sentTransactions ? user.sentTransactions.length : 0}</td>
                      <td>
                        {latestTransactionDate
                          ? new Date(latestTransactionDate).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="text-center">
                        <div className="d-flex align-items-center gap-10 justify-content-center">
                          {/* Ejemplo de botón de acción */}
                          <Link
                            href={`/user/${user.id}`}
                            className="btn btn-sm btn-primary"
                          >
                            View
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No users found.
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

export default UsersListLayer;
