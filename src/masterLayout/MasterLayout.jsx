"use client";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { usePathname, useRouter } from "next/navigation";
import ThemeToggleButton from "../helper/ThemeToggleButton";
import Link from "next/link";
import { isTokenExpired, refreshAccessToken, logout } from "@/utils/authUtils";
import Loader from "../components/Loader";

const MasterLayout = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  let pathname = usePathname();
  let [sidebarActive, seSidebarActive] = useState(false);
  let [mobileMenu, setMobileMenu] = useState(false);
  const location = usePathname(); // Hook to get the current route

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!isAuthenticated) return; // Skip setup if not authenticated

    const handleDropdownClick = (event) => {
      event.preventDefault();
      const clickedLink = event.currentTarget;
      const clickedDropdown = clickedLink.closest(".dropdown");

      if (!clickedDropdown) return;

      const isActive = clickedDropdown.classList.contains("open");

      // Close all dropdowns
      const allDropdowns = document.querySelectorAll(".sidebar-menu .dropdown");
      allDropdowns.forEach((dropdown) => {
        dropdown.classList.remove("open");
        const submenu = dropdown.querySelector(".sidebar-submenu");
        if (submenu) {
          submenu.style.maxHeight = "0px"; // Collapse submenu
        }
      });

      // Toggle the clicked dropdown
      if (!isActive) {
        clickedDropdown.classList.add("open");
        const submenu = clickedDropdown.querySelector(".sidebar-submenu");
        if (submenu) {
          submenu.style.maxHeight = `${submenu.scrollHeight}px`; // Expand submenu
        }
      }
    };

    // Attach click event listeners to all dropdown triggers
    const dropdownTriggers = document.querySelectorAll(
      ".sidebar-menu .dropdown > a, .sidebar-menu .dropdown > Link"
    );

    dropdownTriggers.forEach((trigger) => {
      trigger.addEventListener("click", handleDropdownClick);
    });

    const openActiveDropdown = () => {
      const allDropdowns = document.querySelectorAll(".sidebar-menu .dropdown");
      allDropdowns.forEach((dropdown) => {
        const submenuLinks = dropdown.querySelectorAll(".sidebar-submenu li a");
        submenuLinks.forEach((link) => {
          if (
            link.getAttribute("href") === location ||
            link.getAttribute("to") === location
          ) {
            dropdown.classList.add("open");
            const submenu = dropdown.querySelector(".sidebar-submenu");
            if (submenu) {
              submenu.style.maxHeight = `${submenu.scrollHeight}px`; // Expand submenu
            }
          }
        });
      });
    };

    // Open the submenu that contains the active route
    openActiveDropdown();

    // Cleanup event listeners on unmount
    return () => {
      dropdownTriggers.forEach((trigger) => {
        trigger.removeEventListener("click", handleDropdownClick);
      });
    };
  }, [location.pathname, isAuthenticated]); // Add isAuthenticated as a dependency


  // After the authentication check
  useEffect(() => {
    if (!isAuthenticated || typeof window === "undefined") return;

    // Initialize Bootstrap dropdowns if Bootstrap is used
    if (typeof window !== "undefined" && window.bootstrap) {
      const dropdownElementList = document.querySelectorAll('[data-bs-toggle="dropdown"]');
      dropdownElementList.forEach(dropdownToggle => {
        new window.bootstrap.Dropdown(dropdownToggle);
      });
    }

    // Add any other initialization code for interactive elements here

    // Make sure all dropdown menus are working
    const dropdownButtons = document.querySelectorAll('.dropdown > button, .dropdown > a');
    dropdownButtons.forEach(button => {
      button.addEventListener('click', function (e) {
        // For elements that are not handled by Bootstrap
        if (!button.getAttribute('data-bs-toggle')) {
          e.preventDefault();
          const dropdown = button.closest('.dropdown');
          if (dropdown) {
            dropdown.classList.toggle('show');
            const menu = dropdown.querySelector('.dropdown-menu');
            if (menu) {
              menu.classList.toggle('show');
            }
          }
        }
      });
    });

    return () => {
      // Clean up event listeners when component unmounts
      dropdownButtons.forEach(button => {
        button.removeEventListener('click', () => { });
      });
    };
  }, [isAuthenticated]);

  // Show loading state or redirect


  // Only render the dashboard when authenticated
  

  let sidebarControl = () => {
    seSidebarActive(!sidebarActive);
  };

  let mobileMenuControl = () => {
    setMobileMenu(!mobileMenu);
  };

  return (
    <section className={mobileMenu ? "overlay active" : "overlay "}>
      {/* sidebar */}
      <aside
        className={
          sidebarActive
            ? "sidebar active "
            : mobileMenu
              ? "sidebar sidebar-open"
              : "sidebar"
        }
      >
        <button
          onClick={mobileMenuControl}
          type='button'
          className='sidebar-close-btn'
        >
          <Icon icon='radix-icons:cross-2' />
        </button>
        <div>
          <Link href='/' className='sidebar-logo'>
            <img
              src='https://arenasinmobiliaria.co/wp-content/uploads/2023/01/LOGO_WHITE.webp'
              alt='site logo'
              className='light-logo'
            />
            <img
              src='https://arenasinmobiliaria.co/wp-content/uploads/2023/01/LOGO_WHITE.webp'
              alt='site logo'
              className='dark-logo'
            />
            <img
              src='https://arenasinmobiliaria.co/wp-content/uploads/2023/01/LOGO_WHITE.webp'
              alt='site logo'
              className='logo-icon'
            />
          </Link>
        </div>

        <div className='sidebar-menu-area'>
          <ul className='sidebar-menu' id='sidebar-menu'>
          <li>
              <Link
                href='/Banner'
                className={pathname === "/Banner" ? "active-page" : ""}
              >
                <Icon icon='material-symbols:swap-horiz' className='menu-icon' />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                href='/Services'
                className={pathname === "/Services" ? "active-page" : ""}
              >
                <Icon icon='solar:home-smile-angle-outline' className='menu-icon' />
                <span>Inmuebles</span>
              </Link>
            </li>

            <li>
              <Link
                href='/Testimonials'
                className={pathname === "/Testimonials" ? "active-page" : ""}
              >
                <Icon icon='flowbite:users-group-outline' className='menu-icon' />
                <span>Testimonios</span>
              </Link>
            </li>

          </ul>
        </div>
      </aside>

      <main
        className={sidebarActive ? "dashboard-main active" : "dashboard-main"}
      >
        <div className='navbar-header'>
          <div className='row align-items-center justify-content-between'>
            <div className='col-auto'>
              <div className='d-flex flex-wrap align-items-center gap-4'>
                <button
                  type='button'
                  className='sidebar-toggle'
                  onClick={sidebarControl}
                >
                  {sidebarActive ? (
                    <Icon
                      icon='iconoir:arrow-right'
                      className='icon text-2xl non-active'
                    />
                  ) : (
                    <Icon
                      icon='heroicons:bars-3-solid'
                      className='icon text-2xl non-active '
                    />
                  )}
                </button>
                <button
                  onClick={mobileMenuControl}
                  type='button'
                  className='sidebar-mobile-toggle'
                >
                  <Icon icon='heroicons:bars-3-solid' className='icon' />
                </button>
  
              </div>
            </div>
            <div className='col-auto'>
              <div className='d-flex flex-wrap align-items-center gap-3'>
         
                <div >
                  <button
                    className='d-flex justify-content-center align-items-center rounded-circle'
                    type='button'
                  >
                    <img
                      src='/assets/images/user.png'
                      alt='image_user'
                      className='w-40-px h-40-px object-fit-cover rounded-circle'
                    />
                  </button>
         
                </div>
                {/* Profile dropdown end */}
              </div>
            </div>
          </div>
        </div>

        {/* dashboard-main-body */}
        <div className='dashboard-main-body'>{children}</div>

        {/* Footer section */}
        <footer className='d-footer'>
          <div className='row align-items-center justify-content-between'>
            <div className='col-auto'>
              <p className='mb-0'>© 2025 Arenas Inmobiliaria. All Rights Reserved.</p>
            </div>
            <div className='col-auto'>
              <p className='mb-0'>
                Made by <span className='text-primary-600'>Michael Valero</span>
              </p>
            </div>
          </div>
        </footer>
      </main>
    </section>
  );
};

export default MasterLayout;
