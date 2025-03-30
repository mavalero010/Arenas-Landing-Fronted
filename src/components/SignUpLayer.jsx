"use client"; 
import { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const SignUpLayer = () => {
  // Estados para capturar los campos del formulario
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Estado para mensajes de respuesta y errores
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      // 1. Consultar el conteo de admins existentes
      const countRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}admin/auth/count`
      );
      
      if (!countRes.ok) {
        throw new Error("Error al obtener el conteo de administradores");
      }
      
      const countData = await countRes.json();
      // Suponemos que la respuesta devuelve { count: number }
      const count = countData.count !== undefined ? countData.count : Number(countData);
      
      // 2. Si no hay admins, crear el primer super admin
      if (count < 1) {
        const createRes = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}admin/auth/create-first-super-admin`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username,
              firstName,
              lastName,
              email,
              password,
            }),
          }
        );
        
        const createData = await createRes.json();
        if (createRes.ok) {
          setMessage("Super admin creado exitosamente.");
        } else {
          // Si la API retorna error, lo mostramos
          setError(createData.message || "Error al crear el super admin.");
        }
      } else {
        // Si ya existe al menos un admin, retornamos el mensaje de error
        setError(
          "Super admin can only be created when no admins exist"
        );
      }
    } catch (err) {
      setError(err.message || "Error inesperado al procesar el registro");
    }
  };

  return (
    <section className="auth bg-base d-flex flex-wrap">
      <div className="auth-left d-lg-block d-none">
        <div className="d-flex align-items-center flex-column h-100 justify-content-center">
          <img src="/assets/images/auth/auth-img.png" alt="Auth image" />
        </div>
      </div>
      <div className="auth-right py-32 px-24 d-flex flex-column justify-content-center">
        <div className="max-w-464-px mx-auto w-100">
          <div>
            <Link href="/" className="mb-40 max-w-290-px">
              <img src="/assets/images/logo.png" alt="Logo" />
            </Link>
            <h4 className="mb-12">Registra tu cuenta</h4>
            <p className="mb-32 text-secondary-light text-lg">
              Bienvenido! Por favor ingresa todos los campos.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="alert alert-danger mb-16">
                {error}
              </div>
            )}
            {message && (
              <div className="alert alert-success mb-16">
                {message}
              </div>
            )}
            {/* Campo para username */}
            <div className="icon-field mb-16">
              <span className="icon top-50 translate-middle-y">
                <Icon icon="f7:person" />
              </span>
              <input
                type="text"
                className="form-control h-56-px bg-neutral-50 radius-12"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            {/* Campo para first name */}
            <div className="icon-field mb-16">
              <span className="icon top-50 translate-middle-y">
                <Icon icon="mdi:account" />
              </span>
              <input
                type="text"
                className="form-control h-56-px bg-neutral-50 radius-12"
                placeholder="Nombre"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            {/* Campo para last name */}
            <div className="icon-field mb-16">
              <span className="icon top-50 translate-middle-y">
                <Icon icon="mdi:account-outline" />
              </span>
              <input
                type="text"
                className="form-control h-56-px bg-neutral-50 radius-12"
                placeholder="Apellido"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            {/* Campo para email */}
            <div className="icon-field mb-16">
              <span className="icon top-50 translate-middle-y">
                <Icon icon="mage:email" />
              </span>
              <input
                type="email"
                className="form-control h-56-px bg-neutral-50 radius-12"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {/* Campo para password */}
            <div className="mb-20">
              <div className="position-relative">
                <div className="icon-field">
                  <span className="icon top-50 translate-middle-y">
                    <Icon icon="solar:lock-password-outline" />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control h-56-px bg-neutral-50 radius-12"
                    id="your-password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <span
                  className="toggle-password ri-eye-line cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light"
                  data-toggle="#your-password"
                  onClick={togglePasswordVisibility}
                />
              </div>
              <span className="mt-12 text-sm text-secondary-light">
                Tu contraseña debe tener al menos 8 caracteres.
              </span>
            </div>
            {/* Terms and conditions */}
            <div className="">
              <div className="d-flex justify-content-between gap-2">
                <div className="form-check style-check d-flex align-items-start">
                  <input
                    className="form-check-input border border-neutral-300 mt-4"
                    type="checkbox"
                    id="condition"
                    required
                  />
                  <label className="form-check-label text-sm" htmlFor="condition">
                    Para crear una cuenta acepta nuestros{" "}
                    <Link href="#" className="text-primary-600 fw-semibold">
                      Terminos &amp; Condiciones
                    </Link>{" "}
                    Y{" "}
                    <Link href="#" className="text-primary-600 fw-semibold">
                      Politicas de privacidad
                    </Link>
                  </label>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32"
            >
              Regístrate
            </button>
            <div className="mt-32 center-border-horizontal text-center">
              <span className="bg-base z-1 px-4">O regístrate con</span>
            </div>
            <div className="mt-32 d-flex align-items-center gap-3">
              <button
                type="button"
                className="fw-semibold text-primary-light py-16 px-24 w-50 border radius-12 text-md d-flex align-items-center justify-content-center gap-12 line-height-1 bg-hover-primary-50"
              >
                <Icon
                  icon="ic:baseline-facebook"
                  className="text-primary-600 text-xl line-height-1"
                />
                Facebook
              </button>
              <button
                type="button"
                className="fw-semibold text-primary-light py-16 px-24 w-50 border radius-12 text-md d-flex align-items-center justify-content-center gap-12 line-height-1 bg-hover-primary-50"
              >
                <Icon
                  icon="logos:google-icon"
                  className="text-primary-600 text-xl line-height-1"
                />
                Google
              </button>
            </div>
            <div className="mt-32 text-center text-sm">
              <p className="mb-0">
                Ya tienes una cuenta?{" "}
                <Link href="/sign-in" className="text-primary-600 fw-semibold">
                  Inicia sesión
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUpLayer;
