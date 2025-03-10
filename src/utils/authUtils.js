import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

// Función para verificar si el token ha expirado
export const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    return true; // Si hay error decodificando, lo consideramos expirado
  }
};

// Función para refrescar el accessToken
export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) return null;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}admin/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("accessToken", data.accessToken);
      return data.accessToken;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al refrescar el token:", error);
    return null;
  }
};


// Función para refrescar el accessToken
export const logout = async (router) => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    console.warn("No hay token disponible. Redirigiendo al inicio de sesión...");
    router.push("/sign-in");
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}admin/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      }
    });

    if (response.ok) {
      router.push("/sign-in");
    } else {
      console.error("Error en el logout:", await response.text());
    }
  } catch (error) {
    console.error("Error de red:", error);
  } finally {
    // Eliminar los tokens del localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // Redirigir al usuario a la página de inicio de sesión
    router.push("/sign-in");
  }
};

// Función para redirigir al login


