import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

export const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    return true; 
  }
};

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  console.log("Refresh");
  
  if (!refreshToken) return null;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}admin/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${refreshToken}`
      },
      //body: JSON.stringify({ refreshToken }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      return data.accessToken;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al refrescar el token:", error);
    return null;
  }
};


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
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    localStorage.removeItem("admin_id");
    localStorage.removeItem("admin_username");
    localStorage.removeItem("admin_firstName");
    localStorage.removeItem("admin_lastName");
    localStorage.removeItem("admin_email");
    localStorage.removeItem("admin_role");
    localStorage.removeItem("admin_accessLevel");

    localStorage.removeItem("admin_isManager");
    localStorage.removeItem("admin_isSuperAdmin");

    router.push("/sign-in");
  }
};



