"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

const AddUserLayer = ({ creatorId }) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    accessLevel: 0,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validación del accessLevel
    if (formData.accessLevel === 0) {
      setError("Please select a valid access level");
      return;
    }

    try {
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        setError('Authentication required');
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}admin/auth/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          ...formData,
          accessLevel: Number(formData.accessLevel),
          creatorId
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error creating admin');
      }

      setSuccess('Admin created successfully!');
      // Reset form
      setFormData({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        accessLevel: 0,
      });
      
    } catch (err) {
      setError(err.message);
    }
  };

  const accessLevelOptions = [
    { value: 0, label: 'Select Access Level', disabled: true },
    { value: 1, label: 'VIEWER' },
    { value: 5, label: 'BASIC' },
    { value: 10, label: 'MANAGER' },
    { value: 15, label: 'SENIOR MANAGER' }
  ];

  return (
    <div className='card h-100 p-0 radius-12'>
      <div className='card-body p-24'>
        <div className='row justify-content-center'>
          <div className='col-xxl-6 col-xl-8 col-lg-10'>
            <div className='card border'>
              <div className='card-body'>
                <div className='mb-24 mt-16'>
                </div>
                <p className="text-lg">Añadir adminitrador</p>
                <form onSubmit={handleSubmit}>
                  <div className='mb-20'>
                    <label className='form-label fw-semibold text-primary-light text-sm mb-8'>
                      Usuario <span className='text-danger-600'>*</span>
                    </label>
                    <input
                      type='text'
                      className='form-control radius-8'
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className='mb-20'>
                    <label className='form-label fw-semibold text-primary-light text-sm mb-8'>
                      Primer nombre <span className='text-danger-600'>*</span>
                    </label>
                    <input
                      type='text'
                      className='form-control radius-8'
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className='mb-20'>
                    <label className='form-label fw-semibold text-primary-light text-sm mb-8'>
                      Apellido <span className='text-danger-600'>*</span>
                    </label>
                    <input
                      type='text'
                      className='form-control radius-8'
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className='mb-20'>
                    <label className='form-label fw-semibold text-primary-light text-sm mb-8'>
                      Email <span className='text-danger-600'>*</span>
                    </label>
                    <input
                      type='email'
                      className='form-control radius-8'
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className='mb-20'>
                    <label className='form-label fw-semibold text-primary-light text-sm mb-8'>
                      Contraseña <span className='text-danger-600'>*</span>
                    </label>
                    <input
                      type='password'
                      className='form-control radius-8'
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className='mb-20'>
                    <label className='form-label fw-semibold text-primary-light text-sm mb-8'>
                      Nivel de acceso <span className='text-danger-600'>*</span>
                    </label>
                    <select
                      className='form-control radius-8 form-select'
                      name="accessLevel"
                      value={formData.accessLevel}
                      onChange={handleInputChange}
                      required
                    >
                      {accessLevelOptions.map(option => (
                        <option 
                          key={option.value} 
                          value={option.value}
                          disabled={option.disabled || false}
                        >
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {error && (
                    <div className='alert alert-danger mb-20'>
                      {error}
                    </div>
                  )}

                  {success && (
                    <div className='alert alert-success mb-20'>
                      {success}
                    </div>
                  )}

                  <div className='d-flex align-items-center justify-content-center gap-3'>
                    <button
                      type='button'
                      className='border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-56 py-11 radius-8'
                      onClick={() => setFormData({
                        username: "",
                        firstName: "",
                        lastName: "",
                        email: "",
                        password: "",
                        accessLevel: 0,
                      })}
                    >
                      Cancelar
                    </button>
                    <button
                      type='submit'
                      className='btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8'
                    >
                      Crear admin
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserLayer;