"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isTokenExpired, refreshAccessToken } from "@/utils/authUtils";
import { Modal, Button, Form, Pagination } from "react-bootstrap";
import { UserVerificationStatus } from "../enums/user-verification-status.enum"
const UsersListLayer = () => {

  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectionReason, setShowRejectionReason] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [registrationStep, setRegistrationStep] = useState("");
  const [isActive, setIsActive] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5); // Personalizable
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);
  const [currentVerificationPage, setCurrentVerificationPage] = useState(1);
  const [verificationsPerPage] = useState(1);
  const [imageModal, setImageModal] = useState(false);


  const verifications = selectedUser?.userVerifications || [];
  const currentVerification = verifications.length > 0
    ? verifications[currentVerificationPage - 1]
    : null;

  const indexOfLastVerification = currentVerificationPage * verificationsPerPage;
  const indexOfFirstVerification = indexOfLastVerification - verificationsPerPage;
  const currentVerifications = verifications.slice(indexOfFirstVerification, indexOfLastVerification);
  const totalVerificationPages = Math.ceil(verifications.length / verificationsPerPage);

  const fetchData = async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams({
        ...(filters.searchQuery && { name: filters.searchQuery }),
        ...(filters.registrationStep && { registrationStep: filters.registrationStep }),
        ...(filters.isActive && { isActive: filters.isActive }),
        ...(filters.status && { status: filters.status })
      }).toString();



      let token = localStorage.getItem("accessToken");
      if (!token || isTokenExpired(token)) {
        token = await refreshAccessToken();
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}admin/auth/user/list?${queryParams}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 401) {
        await refreshAccessToken();
        return fetchData();
      }

      const data = await response.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {


    fetchData();
  }, []);

  const handleSearch = () => {
    fetchData({
      searchQuery,
      registrationStep,
      isActive,
      status: selectedStatus
    });
  };

  const handleShowModal = (user) => {

    setSelectedUser(user);
    setShowModal(true);
    setCurrentVerificationPage(1);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setRejectionReason("");
    setShowRejectionReason(false);
    setSelectedAction(null);
  };



  const handleAction = (actionType, verification) => {

    setSelectedAction(actionType);

    if (actionType === UserVerificationStatus.REJECTED) {
      setShowRejectionReason(true);
    } else {

      if (actionType === UserVerificationStatus.COMPLETE) {
        confirmAcceptation(verification)
      }

      handleCloseModal();


    }
  };


  const changeActiveInactive = async (user, status) => {

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}admin/auth/user/update/${user}`;
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      console.error('No access token found in localStorage');
      return;
    }

    const body = {
      isActive: status
    };

    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }


      const data = await response.json();

      //window.location.reload(); 
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const confirmAcceptation = async (currentVerification) => {


    const url = `${process.env.NEXT_PUBLIC_BASE_URL}admin/auth/user/verification/${currentVerification.id}`;
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      console.error('No access token found in localStorage');
      return;
    }

    const body = {
      status: UserVerificationStatus.COMPLETE,

    };

    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        setShowRejectionReason(false);
        handleCloseModal();
        throw new Error(`HTTP error! status: ${response.status}`);
      }


      const data = await response.json();
      setShowRejectionReason(false);
      handleCloseModal();

      window.location.reload();
      return data;
    } catch (error) {
      setShowRejectionReason(false);
      handleCloseModal();
      console.error('Error:', error);
    }
  };


  const confirmRejection = async (currentVerification) => {
    if (rejectionReason.trim() === "") {
      alert("Por favor ingresa una razón de rechazo");
      return;
    }

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}admin/auth/user/verification/${currentVerification.id}`;
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      console.error('No access token found in localStorage');
      return;
    }

    const body = {
      status: UserVerificationStatus.REJECTED,
      rejectionReason: rejectionReason
    };

    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        setShowRejectionReason(false);
        handleCloseModal();
        throw new Error(`HTTP error! status: ${response.status}`);
      }


      const data = await response.json();
      setShowRejectionReason(false);
      handleCloseModal();

      window.location.reload();
      return data;
    } catch (error) {
      setShowRejectionReason(false);
      handleCloseModal();
      console.error('Error:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="card h-100 p-0 radius-12">
        <div className="card-body p-24 text-center">
          <Icon icon="eos-icons:loading" className="text-3xl" />
          <p>Cargando Usuario...</p>
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

      <div className='card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between'>
        <div className='d-flex align-items-center gap-3 w-100'>
          <div className="flex-grow-1">
            <div className="position-relative">
              <Form.Control
                type='text'
                placeholder='Buscar por nombre'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='bg-base h-40-px w-100 ps-5' // Añadido padding-left (ps-5)
              />
              <Icon
                icon='lucide:search'
                className='position-absolute top-50 start-0 translate-middle-y ms-3'
                style={{ zIndex: 5, pointerEvents: 'none' }}
                width={20}
              />
            </div>
          </div>

          <div className="flex-grow-1">
            <Form.Select
              value={registrationStep}
              onChange={(e) => setRegistrationStep(e.target.value)}
              className='form-select-sm ps-12 py-6 radius-12 h-40-px w-100'
            >
              <option value=''>Todos los pasos</option>
              <option value='PHONE_SUBMISSION'>ENVÍO TELEFÓNICO</option>
              <option value='VERIFICATION'>VERIFICACIÓN</option>
              <option value='PROFILE_COMPLETION'>PERFIL COMPLETO</option>
              <option value='COMPLETE'>COMPLETO</option>
            </Form.Select>
          </div>

          <div className="flex-grow-1">
            <Form.Select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className='form-select-sm ps-12 py-6 radius-12 h-40-px w-100'
            >
              <option value=''>Todos los estados</option>
              <option value='PENDING'>PENDIENTE</option>
              <option value='COMPLETE'>COMPLETO</option>
              <option value='REJECTED'>RECHAZADO</option>
            </Form.Select>
          </div>

          <div className="flex-grow-1">
            <Form.Select
              value={isActive}
              onChange={(e) => setIsActive(e.target.value)}
              className='form-select-sm ps-12 py-6 radius-12 h-40-px w-100'
            >
              <option value=''>Todos los usuarios</option>
              <option value='true'>Activo</option>
              <option value='false'>Inactivo</option>
            </Form.Select>
          </div>

          <div className="flex-grow-0">
            <Button
              variant="primary"
              onClick={handleSearch}
              className='text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2'
            >
              <Icon icon="ion:search-outline" className='icon text-xl line-height-1' />
              Buscar
            </Button>
          </div>
        </div>
      </div>
      <div className="card-body p-24">
        <div className="table-responsive scroll-sm">
          <div className="flex items-center gap-3 mb-10">
            <label className="text-sm font-medium text-gray-600 mr-10">Mostrar lista de:</label>
            <select
              value={usersPerPage}
              onChange={(e) => setUsersPerPage(Number(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
             transition-all duration-200 bg-white hover:border-gray-400 
             cursor-pointer appearance-none w-[120px] text-gray-700"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
          <table className="table bordered-table sm-table mb-0">
            <thead>
              <tr>
                <th>N.º</th>
                <th className="text-center">Nombre</th>
                <th className="text-center">Correo</th>
                <th className="text-center">Paso de registro</th>
                <th className="text-center">Acción</th>
                <th className="text-center">Estado</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map((user, index) => (
                  <tr key={user.id}>
                    <td>{indexOfFirstUser + index + 1}</td>
                    <td className="text-center">
                      {user.firstName} {user.lastName}
                    </td>

                    <td className="text-center">{user.email}</td>

                    <td className="text-center">{user.registrationStep}</td>

                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleShowModal(user)}
                      >
                        Ver Más
                      </button>
                    </td>
                    <td className="text-center">
                      <div className="d-flex align-items-center">
                        <Form.Check
                          type="switch"
                          checked={user.isActive}
                          onChange={async (e) => {
                            const newStatus = !user.isActive;

                            const updatedUsers = users.map(u =>
                              u.id === user.id ? { ...u, isActive: newStatus } : u
                            );

                            console.log("Updated: ", updatedUsers);

                            setUsers(updatedUsers);

                            try {
                              await changeActiveInactive(user.id, newStatus);
                            } catch (error) {
                              const revertedUsers = users.map(u =>
                                u.id === user.id ? { ...u, isActive: user.isActive } : u
                              );
                              setUsers(revertedUsers);
                              console.error("Error updating user status:", error);
                            }
                          }}
                          className="me-2"
                        />
                        <span>{user.isActive ? 'Active' : 'Inactive'}</span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No se encontraron usuarios.
                  </td>
                </tr>
              )}
            </tbody>
          </table>


          <div className="my-4">
            <Pagination className="justify-content-center align-item-center">
              <Pagination.Prev
                className="flex"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
              </Pagination.Prev>

              {Array.from({ length: totalPages }, (_, i) => (
                <Pagination.Item
                  key={i + 1}
                  active={currentPage === i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Pagination.Item>
              ))}

              <Pagination.Next
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
              </Pagination.Next>
            </Pagination>
          </div>
        </div>


        <Modal show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Datos Personales</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {verifications.length > 0 ? (
              <>
                {/* Paginación de verificaciones */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Pagination className="mb-0">
                    <Pagination.Prev
                      onClick={() => setCurrentVerificationPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentVerificationPage === 1}
                    />
                    <Pagination.Item active className="mx-2">
                      {currentVerificationPage} de {totalVerificationPages}
                    </Pagination.Item>
                    <Pagination.Next
                      onClick={() => setCurrentVerificationPage(prev => Math.min(prev + 1, totalVerificationPages))}
                      disabled={currentVerificationPage === totalVerificationPages}
                    />
                  </Pagination>
                </div>

                {/* Contenido de la verificación actual */}
                {currentVerification && (
                  <div key={currentVerification.id} className="row g-4">
                    {/* Foto */}
                    <div className="col-md-4" onClick={() => setImageModal(true)} style={{ cursor: 'pointer' }}>
                      <h6>Retrato Facial</h6>
                      <img
                        src={currentVerification.selfieImageUrl}
                        className="img-fluid rounded"
                        alt="Selfie"
                        style={{
                          width: '200px', // Ancho del tamaño selfie
                          height: '200px', // Alto del tamaño selfie
                          objectFit: 'cover', // Para mantener el enfoque y recortar si es necesario
                          borderRadius: '50%' // Forma circular para parecer más a un selfie
                        }}
                      //onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      //onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      />
                    </div>

                    {/* Imagen Delantera */}
                    <div className="col-md-4">
                      <h6>Lado Frontal</h6>
                      <img
                        src={currentVerification.idFrontImageUrl}
                        className="img-fluid rounded"
                        alt="Front ID"
                      />
                    </div>

                    {/* Imagen Trasera */}
                    <div className="col-md-4">
                      <h6>Lado Posterior</h6>
                      <img
                        src={currentVerification.idBackImageUrl}
                        className="img-fluid rounded"
                        alt="Back ID"
                      />
                    </div>

                    {/* Detalles de la Verificación */}
                    <div className="col-12">
                      <div className="card mt-3 shadow-sm">
                        <div className="card-header bg-light">
                          <h6 className="mb-0 fw-bold text-uppercase text-center">Detalles de la Verificación</h6>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            {/* Columna izquierda - Datos del usuario */}
                            <div className="col-12 col-md-8 mb-3 mb-md-0">
                              <div className="d-flex flex-column gap-2">
                                <div className="d-flex align-items-center">
                                  <i className="fas fa-envelope me-2 text-primary"></i>
                                  <p className="mb-0">
                                    <span className="text-muted small">Email:</span><br />
                                    <strong>{selectedUser.email}</strong>
                                  </p>
                                </div>

                                <div className="d-flex align-items-center">
                                  <i className="fas fa-user me-2 text-success"></i>
                                  <p className="mb-0">
                                    <span className="text-muted small">Nombre:</span><br />
                                    <strong>{selectedUser.firstName} {selectedUser.lastName}</strong>
                                  </p>
                                </div>

                                <div className="d-flex align-items-start gap-2">
                                  <i className="fas fa-phone-alt mt-1 text-success"></i>
                                  <div className="flex-grow-1">
                                    <div className="text-muted small mb-1">Teléfono:</div>
                                    <strong>{selectedUser?.phoneNumber ? (
                                        <span>
                                          {selectedUser.phoneNumber.replace(
                                            /(\+\d{1,3})(\d{3})(\d{3})(\d{4})/,
                                            '$1 $2 $3 $4'
                                          )}
                                        </span>
                                      ) : (
                                        <span className="text-muted fst-italic">No ingresado</span>
                                      )}</strong>
                                  </div>
                                </div>

                                <div className="d-flex align-items-start">
                                  <i className="fas fa-map-marker-alt me-2 text-info mt-1"></i>
                                  <div className="flex-grow-1">
                                    {selectedUser?.addresses?.[0] ? (
                                      <>
                                        {/* Línea de dirección completa */}
                                        <p className="mb-1">
                                          <span className="text-muted small">Dirección:</span><br />
                                          <strong>
                                            {[
                                              selectedUser.addresses[0].streetAddress,
                                              selectedUser.addresses[0].city,
                                              selectedUser.addresses[0].region,
                                              selectedUser.addresses[0].country
                                            ]
                                              .filter(Boolean)
                                              .join(', ')}
                                          </strong>
                                        </p>

                                        {/* Línea separada para el código postal */}
                                        <p className="mb-0">
                                          <span className="text-muted small">Código Postal:</span><br />
                                          <strong>
                                            {selectedUser.addresses[0].postalCode || "No disponible"}
                                          </strong>
                                        </p>
                                      </>
                                    ) : (
                                      <p className="mb-0 text-muted">No hay dirección registrada</p>
                                    )}
                                  </div>
                                </div>

                              </div>
                            </div>

                            {/* Columna derecha - Estado y fecha */}
                            <div className="col-12 col-md-4">
                              <div className="d-flex flex-column gap-2">

                                <p className="mb-0">
                                  <span className="text-muted small">Estado:</span><br />
                                  <span className={`badge bg-${currentVerification.status === 'COMPLETE' ? 'success' :
                                    currentVerification.status === 'PENDING' ? 'warning' : 'danger'} text-uppercase`}>
                                    {currentVerification.status}
                                  </span>
                                </p>

                                <p className="mb-0">
                                  <span className="text-muted small">Fecha de envío:</span><br />
                                  <strong>
                                    {new Date(currentVerification.submittedAt).toLocaleDateString('es-ES', {
                                      day: '2-digit',
                                      month: 'long',
                                      year: 'numeric'
                                    })}
                                  </strong>
                                </p>
                                {currentVerification.verifiedAt && (
                                  <p className="mb-0">
                                    <span className="text-muted small">Fecha de verificación:</span><br />
                                    <strong>
                                      {new Date(currentVerification.verifiedAt).toLocaleDateString('es-ES', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric'
                                      })}
                                    </strong>
                                  </p>

                                )}
                                {currentVerification.rejectionReason && (
                                  <div className="mt-2">
                                    <p className="mb-0 text-danger">
                                      <span className="text-muted small">Razón de rechazo:</span><br />
                                      <em>{currentVerification.rejectionReason}</em>
                                    </p>
                                  </div>
                                )}



                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                )}

              </>
            ) : (
              <div className="text-center py-4">
                <Icon icon="mdi:alert-circle-outline" className="text-warning h1" />
                <p className="mt-2">No hay verificaciones disponibles para este usuario</p>
              </div>
            )}

            {selectedAction === UserVerificationStatus.REJECTED && (
              <div className="col-12 mt-4">
                <Form.Group>
                  <Form.Label>Razón de Rechazo</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Ingrese la razón del rechazo"
                  />
                </Form.Group>
              </div>
            )}
          </Modal.Body>

          <Modal.Footer>
            {!showRejectionReason ? (
              <>
                {currentVerification &&
                  currentVerification.status != UserVerificationStatus.COMPLETE &&
                  verifications.length > 0 && (
                    <Button
                      variant="success"
                      onClick={() => handleAction(UserVerificationStatus.COMPLETE, currentVerification)}
                    >
                      Aprobar
                    </Button>
                  )}

                {currentVerification &&
                  currentVerification.status != UserVerificationStatus.REJECTED &&
                  verifications.length > 0 && (
                    <Button
                      variant="danger"
                      onClick={() => handleAction(UserVerificationStatus.REJECTED, currentVerification)}
                    >
                      Rechazar
                    </Button>
                  )}


              </>
            ) : (
              <Button variant="danger" onClick={() => confirmRejection(currentVerification)}>
                Confirmar Rechazo
              </Button>
            )}
            <Button
              variant="secondary"
              onClick={() => {
                if (selectedAction === UserVerificationStatus.REJECTED && showRejectionReason) {
                  setShowRejectionReason(false);
                  setRejectionReason("");
                  setSelectedAction("");
                } else {
                  handleCloseModal();
                }
              }}
            >
              Volver
            </Button>
          </Modal.Footer>
        </Modal>


      </div>
    </div>
  );
};
export default UsersListLayer;
