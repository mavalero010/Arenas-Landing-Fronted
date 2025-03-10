import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import styles from "../styles/loader.module.scss";

/**
 * Componente de Loader reutilizable con diferentes variantes y tamaños
 * 
 * @param {Object} props - Propiedades del componente
 * @param {string} props.variant - Variante del loader: 'spinner', 'dots', 'pulse', 'icon' (default: 'spinner')
 * @param {string} props.size - Tamaño del loader: 'sm', 'md', 'lg' (default: 'md')
 * @param {string} props.color - Color primario del loader (default: 'primary')
 * @param {string} props.text - Texto opcional para mostrar debajo del loader
 * @param {boolean} props.fullScreen - Si debe mostrarse a pantalla completa
 * @param {string} props.className - Clases adicionales para el contenedor
 * @param {string} props.bgStyle - Estilo de fondo: 'none', 'with-bg' (default: 'none')
 */
const Loader = ({
  variant = "spinner",
  size = "md",
  color = "primary",
  text,
  fullScreen = false,
  className = "",
  bgStyle = "none",
}) => {
  // Mapeo de tamaños
  const sizeMap = {
    sm: {
      spinner: "spinner-border-sm",
      container: "w-40-px h-40-px",
      icon: "text-2xl",
      dots: "w-8-px h-8-px",
    },
    md: {
      spinner: "",
      container: "w-64-px h-64-px",
      icon: "text-4xl",
      dots: "w-12-px h-12-px",
    },
    lg: {
      spinner: "",
      container: "w-80-px h-80-px",
      icon: "text-5xl",
      dots: "w-16-px h-16-px",
    },
  };

  // Icono para la variante 'icon'
  const loaderIcon = {
    primary: "line-md:loading-twotone-loop",
    secondary: "line-md:loading-alt-loop",
    success: "line-md:loading-twotone-loop",
    warning: "line-md:loading-twotone-loop",
    danger: "line-md:loading-twotone-loop",
    info: "line-md:loading-loop",
  };

  // Contenedor principal
  const containerClass = `${styles.loaderContainer} ${
    fullScreen ? styles.loaderFullscreen : ""
  } ${bgStyle === "with-bg" ? styles.loaderWithBg : ""} ${className}`;

  // Renderizar el loader según la variante
  const renderLoader = () => {
    switch (variant) {
      case "spinner":
        return (
          <div
            className={`spinner-border text-${color} ${sizeMap[size].spinner}`}
            role="status"
            style={
              size === "lg"
                ? { width: "4rem", height: "4rem", borderWidth: "0.35em" }
                : {}
            }
          >
            <span className="visually-hidden">Cargando...</span>
          </div>
        );

      case "dots":
        return (
          <div className={styles.dotsLoader}>
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`bg-${color} rounded-circle ${sizeMap[size].dots} mx-2 ${styles.dotsLoaderDot}`}
                style={{
                  animationDelay: `${i * 0.15}s`,
                }}
              ></div>
            ))}
          </div>
        );

      case "pulse":
        return (
          <div
            className={`spinner-grow text-${color} ${sizeMap[size].spinner}`}
            role="status"
            style={
              size === "lg"
                ? { width: "4rem", height: "4rem" }
                : {}
            }
          >
            <span className="visually-hidden">Cargando...</span>
          </div>
        );

      case "icon":
        return (
          <Icon
            icon={loaderIcon[color] || loaderIcon.primary}
            className={`text-${color} ${sizeMap[size].icon} ${styles.loaderIcon}`}
          />
        );

      default:
        return (
          <div
            className={`spinner-border text-${color} ${sizeMap[size].spinner}`}
            role="status"
          >
            <span className="visually-hidden">Cargando...</span>
          </div>
        );
    }
  };

  return (
    <div className={containerClass}>
      {renderLoader()}
      {text && (
        <p className={`mt-3 text-${color} fw-medium mb-0`}>{text}</p>
      )}
    </div>
  );
};

export default Loader; 