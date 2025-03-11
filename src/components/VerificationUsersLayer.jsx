"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isTokenExpired, refreshAccessToken } from "@/utils/authUtils";
import { Modal, Button, Form } from "react-bootstrap";

const VerificationUsersLayer = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectionReason, setShowRejectionReason] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let token = localStorage.getItem("accessToken");
        if (!token || isTokenExpired(token)) {
          token = await refreshAccessToken();
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}admin/auth/user/verification/list`,
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

    fetchData();
  }, []);

  const handleShowModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setRejectionReason("");
    setShowRejectionReason(false);
    setSelectedAction(null);
  };
  


  const handleAction = (actionType) => {

    setSelectedAction(actionType);

    if (actionType === "REJECT") {
      setShowRejectionReason(true);
    } else {
      // Lógica para otras acciones
      console.log("Action:", actionType);
      console.log("Rejection Reason:", rejectionReason);
      handleCloseModal();
    }
  };

  const confirmRejection = () => {
    if (rejectionReason.trim() === "") {
      alert("Por favor ingresa una razón de rechazo");
      return;
    }
    console.log("Action: REJECT");
    console.log("Rejection Reason:", rejectionReason);
    setShowRejectionReason(false);
    handleCloseModal();
  };

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
      <div className='card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between'>
        <div className='d-flex align-items-center flex-wrap gap-3'>
          <span className='text-md fw-medium text-secondary-light mb-0'>
            Show
          </span>
          <select
            className='form-select form-select-sm w-auto ps-12 py-6 radius-12 h-40-px'
            defaultValue='Select Number'
          >
            <option value='Select Number' disabled>
              Select Number
            </option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
            <option value='6'>6</option>
            <option value='7'>7</option>
            <option value='8'>8</option>
            <option value='9'>9</option>
            <option value='10'>10</option>
          </select>
          <form className='navbar-search'>
            <input
              type='text'
              className='bg-base h-40-px w-auto'
              name='search'
              placeholder='Search'
            />
            <Icon icon='ion:search-outline' className='icon' />
          </form>
          <select
            className='form-select form-select-sm w-auto ps-12 py-6 radius-12 h-40-px'
            defaultValue='Select Status'
          >
            <option value='Select Status' disabled>
              Select Status
            </option>
            <option value='Active'>Active</option>
            <option value='Inactive'>Inactive</option>
          </select>
        </div>
        <Link
          href='/add-user'
          className='btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2'
        >
          <Icon
            icon='ic:baseline-plus'
            className='icon text-xl line-height-1'
          />
          Add New User
        </Link>
      </div>

      <div className="card-body p-24">
        <div className="table-responsive scroll-sm">
          <table className="table bordered-table sm-table mb-0">
            <thead>
              <tr>
                <th>S.L</th>
                <th className="text-center">Name</th>
                <th className="text-center">Email</th>
                <th className="text-center">Verification Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td className="text-center">
                      {user.firstName} {user.lastName}
                    </td>
                    <td className="text-center">{user.email}</td>
                    <td className="text-center">
                      {user.userVerifications?.[0]?.status || "NO DATA"}
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleShowModal(user)}
                      >
                        Ver Más
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal de Verificación */}
        <Modal show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Verificación de Usuario</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {selectedUser?.userVerifications?.[0] && (
              <div className="row g-4">
                <div className="col-md-4">
                  <h6>Front ID</h6>
                  <img
                    src={selectedUser.userVerifications[0].idFrontImageUrl}
                    className="img-fluid rounded"
                    alt="Front ID"
                  />
                </div>

                <div className="col-md-4">
                  <h6>Back ID</h6>
                  <img
                    src={selectedUser.userVerifications[0].idBackImageUrl}
                    className="img-fluid rounded"
                    alt="Back ID"
                  />
                </div>

                <div className="col-md-4">
                  <h6>Selfie</h6>
                  <img
                    src={selectedUser.userVerifications[0].selfieImageUrl}
                    className="img-fluid rounded"
                    alt="Selfie"
                  />
                </div>

              </div>
            )}

            {selectedAction === "REJECT" && (
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
                <Button variant="success" onClick={() => handleAction('APPROVE')}>
                  <Icon icon="mdi:check" className="me-2" />
                  Aprobar
                </Button>

                <Button variant="warning" onClick={() => handleAction('REQUEST_CHANGES')}>
                  <Icon icon="mdi:alert-circle-outline" className="me-2" />
                  Solicitar Cambios
                </Button>

                <Button variant="danger" onClick={() => handleAction('REJECT')}>
                  <Icon icon="mdi:close" className="me-2" />
                  Rechazar
                </Button>
              </>
            ) : (
              <Button variant="danger" onClick={confirmRejection}>
                <Icon icon="mdi:check-circle" className="me-2" />
                Confirmar Rechazo
              </Button>
            )}
            <Button
              variant="secondary"
              onClick={() => {
                if (selectedAction === "REJECT" && showRejectionReason ) {
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

export default VerificationUsersLayer;