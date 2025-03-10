"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./src/masterLayout/MasterLayout.jsx":
/*!*******************************************!*\
  !*** ./src/masterLayout/MasterLayout.jsx ***!
  \*******************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _iconify_react_dist_iconify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @iconify/react/dist/iconify.js */ \"(app-pages-browser)/./node_modules/@iconify/react/dist/iconify.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/dist/api/navigation.js\");\n/* harmony import */ var _helper_ThemeToggleButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helper/ThemeToggleButton */ \"(app-pages-browser)/./src/helper/ThemeToggleButton.jsx\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/link */ \"(app-pages-browser)/./node_modules/next/dist/client/app-dir/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _utils_authUtils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/utils/authUtils */ \"(app-pages-browser)/./src/utils/authUtils.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ var _s = $RefreshSig$();\n\n\n\n\n\n\nconst MasterLayout = (param)=>{\n    let { children } = param;\n    _s();\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    const [isAuthenticated, setIsAuthenticated] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n    let pathname = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.usePathname)();\n    let [sidebarActive, seSidebarActive] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n    let [mobileMenu, setMobileMenu] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n    const location = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.usePathname)(); // Hook to get the current route\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)({\n        \"MasterLayout.useEffect\": ()=>{\n            if (false) {}\n            const handleDropdownClick = {\n                \"MasterLayout.useEffect.handleDropdownClick\": (event)=>{\n                    event.preventDefault();\n                    const clickedLink = event.currentTarget;\n                    const clickedDropdown = clickedLink.closest(\".dropdown\");\n                    if (!clickedDropdown) return;\n                    const isActive = clickedDropdown.classList.contains(\"open\");\n                    // Close all dropdowns\n                    const allDropdowns = document.querySelectorAll(\".sidebar-menu .dropdown\");\n                    allDropdowns.forEach({\n                        \"MasterLayout.useEffect.handleDropdownClick\": (dropdown)=>{\n                            dropdown.classList.remove(\"open\");\n                            const submenu = dropdown.querySelector(\".sidebar-submenu\");\n                            if (submenu) {\n                                submenu.style.maxHeight = \"0px\"; // Collapse submenu\n                            }\n                        }\n                    }[\"MasterLayout.useEffect.handleDropdownClick\"]);\n                    // Toggle the clicked dropdown\n                    if (!isActive) {\n                        clickedDropdown.classList.add(\"open\");\n                        const submenu = clickedDropdown.querySelector(\".sidebar-submenu\");\n                        if (submenu) {\n                            submenu.style.maxHeight = \"\".concat(submenu.scrollHeight, \"px\"); // Expand submenu\n                        }\n                    }\n                }\n            }[\"MasterLayout.useEffect.handleDropdownClick\"];\n            // Attach click event listeners to all dropdown triggers\n            const dropdownTriggers = document.querySelectorAll(\".sidebar-menu .dropdown > a, .sidebar-menu .dropdown > Link\");\n            dropdownTriggers.forEach({\n                \"MasterLayout.useEffect\": (trigger)=>{\n                    trigger.addEventListener(\"click\", handleDropdownClick);\n                }\n            }[\"MasterLayout.useEffect\"]);\n            const openActiveDropdown = {\n                \"MasterLayout.useEffect.openActiveDropdown\": ()=>{\n                    const allDropdowns = document.querySelectorAll(\".sidebar-menu .dropdown\");\n                    allDropdowns.forEach({\n                        \"MasterLayout.useEffect.openActiveDropdown\": (dropdown)=>{\n                            const submenuLinks = dropdown.querySelectorAll(\".sidebar-submenu li a\");\n                            submenuLinks.forEach({\n                                \"MasterLayout.useEffect.openActiveDropdown\": (link)=>{\n                                    if (link.getAttribute(\"href\") === location || link.getAttribute(\"to\") === location) {\n                                        dropdown.classList.add(\"open\");\n                                        const submenu = dropdown.querySelector(\".sidebar-submenu\");\n                                        if (submenu) {\n                                            submenu.style.maxHeight = \"\".concat(submenu.scrollHeight, \"px\"); // Expand submenu\n                                        }\n                                    }\n                                }\n                            }[\"MasterLayout.useEffect.openActiveDropdown\"]);\n                        }\n                    }[\"MasterLayout.useEffect.openActiveDropdown\"]);\n                }\n            }[\"MasterLayout.useEffect.openActiveDropdown\"];\n            // Open the submenu that contains the active route\n            openActiveDropdown();\n            // Cleanup event listeners on unmount\n            return ({\n                \"MasterLayout.useEffect\": ()=>{\n                    dropdownTriggers.forEach({\n                        \"MasterLayout.useEffect\": (trigger)=>{\n                            trigger.removeEventListener(\"click\", handleDropdownClick);\n                        }\n                    }[\"MasterLayout.useEffect\"]);\n                }\n            })[\"MasterLayout.useEffect\"];\n        }\n    }[\"MasterLayout.useEffect\"], [\n        location.pathname\n    ]);\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)({\n        \"MasterLayout.useEffect\": ()=>{\n            const checkAuth = {\n                \"MasterLayout.useEffect.checkAuth\": async ()=>{\n                    let accessToken = localStorage.getItem(\"accessToken\");\n                    if (!accessToken || (0,_utils_authUtils__WEBPACK_IMPORTED_MODULE_5__.isTokenExpired)(accessToken)) {\n                        accessToken = await (0,_utils_authUtils__WEBPACK_IMPORTED_MODULE_5__.refreshAccessToken)();\n                    }\n                    if (!accessToken) {\n                        router.push(\"/sign-in\"); // Redirige al usuario si no hay sesión válida\n                    } else {\n                        setIsAuthenticated(true);\n                    }\n                }\n            }[\"MasterLayout.useEffect.checkAuth\"];\n            checkAuth();\n        }\n    }[\"MasterLayout.useEffect\"], [\n        router\n    ]);\n    if (!isAuthenticated) {\n        console.log(\"Authenteicated In: \", !isAuthenticated);\n        return null; // Evita renderizar contenido antes de validar la sesión\n    }\n    let sidebarControl = ()=>{\n        seSidebarActive(!sidebarActive);\n    };\n    let mobileMenuControl = ()=>{\n        setMobileMenu(!mobileMenu);\n    };\n    return {};\n};\n_s(MasterLayout, \"7Ovj7bsfeiKD/1oWlTViJWe5WmA=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter,\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.usePathname,\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.usePathname\n    ];\n});\n_c = MasterLayout;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MasterLayout);\nvar _c;\n$RefreshReg$(_c, \"MasterLayout\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9tYXN0ZXJMYXlvdXQvTWFzdGVyTGF5b3V0LmpzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQ21EO0FBQ0c7QUFDRztBQUNHO0FBQy9CO0FBQ2tEO0FBRS9FLE1BQU1XLGVBQWU7UUFBQyxFQUFFQyxRQUFRLEVBQUU7O0lBQ2hDLE1BQU1DLFNBQVNSLDBEQUFTQTtJQUN4QixNQUFNLENBQUNTLGlCQUFpQkMsbUJBQW1CLEdBQUdiLCtDQUFRQSxDQUFDO0lBQ3ZELElBQUljLFdBQVdaLDREQUFXQTtJQUMxQixJQUFJLENBQUNhLGVBQWVDLGdCQUFnQixHQUFHaEIsK0NBQVFBLENBQUM7SUFDaEQsSUFBSSxDQUFDaUIsWUFBWUMsY0FBYyxHQUFHbEIsK0NBQVFBLENBQUM7SUFDM0MsTUFBTW1CLFdBQVdqQiw0REFBV0EsSUFBSSxnQ0FBZ0M7SUFFaEVILGdEQUFTQTtrQ0FBQztZQUNSLElBQUksS0FBNkIsRUFBRSxFQUFPO1lBRTFDLE1BQU1xQjs4REFBc0IsQ0FBQ0M7b0JBQzNCQSxNQUFNQyxjQUFjO29CQUNwQixNQUFNQyxjQUFjRixNQUFNRyxhQUFhO29CQUN2QyxNQUFNQyxrQkFBa0JGLFlBQVlHLE9BQU8sQ0FBQztvQkFFNUMsSUFBSSxDQUFDRCxpQkFBaUI7b0JBRXRCLE1BQU1FLFdBQVdGLGdCQUFnQkcsU0FBUyxDQUFDQyxRQUFRLENBQUM7b0JBRXBELHNCQUFzQjtvQkFDdEIsTUFBTUMsZUFBZUMsU0FBU0MsZ0JBQWdCLENBQUM7b0JBQy9DRixhQUFhRyxPQUFPO3NFQUFDLENBQUNDOzRCQUNwQkEsU0FBU04sU0FBUyxDQUFDTyxNQUFNLENBQUM7NEJBQzFCLE1BQU1DLFVBQVVGLFNBQVNHLGFBQWEsQ0FBQzs0QkFDdkMsSUFBSUQsU0FBUztnQ0FDWEEsUUFBUUUsS0FBSyxDQUFDQyxTQUFTLEdBQUcsT0FBTyxtQkFBbUI7NEJBQ3REO3dCQUNGOztvQkFFQSw4QkFBOEI7b0JBQzlCLElBQUksQ0FBQ1osVUFBVTt3QkFDYkYsZ0JBQWdCRyxTQUFTLENBQUNZLEdBQUcsQ0FBQzt3QkFDOUIsTUFBTUosVUFBVVgsZ0JBQWdCWSxhQUFhLENBQUM7d0JBQzlDLElBQUlELFNBQVM7NEJBQ1hBLFFBQVFFLEtBQUssQ0FBQ0MsU0FBUyxHQUFHLEdBQXdCLE9BQXJCSCxRQUFRSyxZQUFZLEVBQUMsT0FBSyxpQkFBaUI7d0JBQzFFO29CQUNGO2dCQUNGOztZQUVBLHdEQUF3RDtZQUN4RCxNQUFNQyxtQkFBbUJYLFNBQVNDLGdCQUFnQixDQUNoRDtZQUdGVSxpQkFBaUJULE9BQU87MENBQUMsQ0FBQ1U7b0JBQ3hCQSxRQUFRQyxnQkFBZ0IsQ0FBQyxTQUFTeEI7Z0JBQ3BDOztZQUVBLE1BQU15Qjs2REFBcUI7b0JBQ3pCLE1BQU1mLGVBQWVDLFNBQVNDLGdCQUFnQixDQUFDO29CQUMvQ0YsYUFBYUcsT0FBTztxRUFBQyxDQUFDQzs0QkFDcEIsTUFBTVksZUFBZVosU0FBU0YsZ0JBQWdCLENBQUM7NEJBQy9DYyxhQUFhYixPQUFPOzZFQUFDLENBQUNjO29DQUNwQixJQUNFQSxLQUFLQyxZQUFZLENBQUMsWUFBWTdCLFlBQzlCNEIsS0FBS0MsWUFBWSxDQUFDLFVBQVU3QixVQUM1Qjt3Q0FDQWUsU0FBU04sU0FBUyxDQUFDWSxHQUFHLENBQUM7d0NBQ3ZCLE1BQU1KLFVBQVVGLFNBQVNHLGFBQWEsQ0FBQzt3Q0FDdkMsSUFBSUQsU0FBUzs0Q0FDWEEsUUFBUUUsS0FBSyxDQUFDQyxTQUFTLEdBQUcsR0FBd0IsT0FBckJILFFBQVFLLFlBQVksRUFBQyxPQUFLLGlCQUFpQjt3Q0FDMUU7b0NBQ0Y7Z0NBQ0Y7O3dCQUNGOztnQkFDRjs7WUFFQSxrREFBa0Q7WUFDbERJO1lBRUEscUNBQXFDO1lBQ3JDOzBDQUFPO29CQUNMSCxpQkFBaUJULE9BQU87a0RBQUMsQ0FBQ1U7NEJBQ3hCQSxRQUFRTSxtQkFBbUIsQ0FBQyxTQUFTN0I7d0JBQ3ZDOztnQkFDRjs7UUFDRjtpQ0FBRztRQUFDRCxTQUFTTCxRQUFRO0tBQUM7SUFFdEJmLGdEQUFTQTtrQ0FBQztZQUNSLE1BQU1tRDtvREFBWTtvQkFDaEIsSUFBSUMsY0FBY0MsYUFBYUMsT0FBTyxDQUFDO29CQUV2QyxJQUFJLENBQUNGLGVBQWU3QyxnRUFBY0EsQ0FBQzZDLGNBQWM7d0JBQy9DQSxjQUFjLE1BQU01QyxvRUFBa0JBO29CQUN4QztvQkFFQSxJQUFJLENBQUM0QyxhQUFhO3dCQUNoQnhDLE9BQU8yQyxJQUFJLENBQUMsYUFBYSw4Q0FBOEM7b0JBQ3pFLE9BQU87d0JBRUx6QyxtQkFBbUI7b0JBQ3JCO2dCQUNGOztZQUVBcUM7UUFDRjtpQ0FBRztRQUFDdkM7S0FBTztJQUVYLElBQUksQ0FBQ0MsaUJBQWlCO1FBQ3BCMkMsUUFBUUMsR0FBRyxDQUFDLHVCQUFzQixDQUFDNUM7UUFDbkMsT0FBTyxNQUFNLHdEQUF3RDtJQUN2RTtJQUNBLElBQUk2QyxpQkFBaUI7UUFDbkJ6QyxnQkFBZ0IsQ0FBQ0Q7SUFDbkI7SUFFQSxJQUFJMkMsb0JBQW9CO1FBQ3RCeEMsY0FBYyxDQUFDRDtJQUNqQjtJQUVBLE9BQU8sQ0FBQztBQUNWO0dBL0dNUjs7UUFDV04sc0RBQVNBO1FBRVRELHdEQUFXQTtRQUdUQSx3REFBV0E7OztLQU54Qk87QUFpSE4saUVBQWVBLFlBQVlBLEVBQUMiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcNTczMjFcXERvd25sb2Fkc1xcQXJjaGl2ZVxcc3JjXFxtYXN0ZXJMYXlvdXRcXE1hc3RlckxheW91dC5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgY2xpZW50XCI7XHJcbmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IEljb24gfSBmcm9tIFwiQGljb25pZnkvcmVhY3QvZGlzdC9pY29uaWZ5LmpzXCI7XHJcbmltcG9ydCB7IHVzZVBhdGhuYW1lLCB1c2VSb3V0ZXIgfSBmcm9tIFwibmV4dC9uYXZpZ2F0aW9uXCI7XHJcbmltcG9ydCBUaGVtZVRvZ2dsZUJ1dHRvbiBmcm9tIFwiLi4vaGVscGVyL1RoZW1lVG9nZ2xlQnV0dG9uXCI7XHJcbmltcG9ydCBMaW5rIGZyb20gXCJuZXh0L2xpbmtcIjtcclxuaW1wb3J0IHsgaXNUb2tlbkV4cGlyZWQsIHJlZnJlc2hBY2Nlc3NUb2tlbiwgbG9nb3V0IH0gZnJvbSBcIkAvdXRpbHMvYXV0aFV0aWxzXCI7XHJcblxyXG5jb25zdCBNYXN0ZXJMYXlvdXQgPSAoeyBjaGlsZHJlbiB9KSA9PiB7XHJcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XHJcbiAgY29uc3QgW2lzQXV0aGVudGljYXRlZCwgc2V0SXNBdXRoZW50aWNhdGVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBsZXQgcGF0aG5hbWUgPSB1c2VQYXRobmFtZSgpO1xyXG4gIGxldCBbc2lkZWJhckFjdGl2ZSwgc2VTaWRlYmFyQWN0aXZlXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBsZXQgW21vYmlsZU1lbnUsIHNldE1vYmlsZU1lbnVdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IGxvY2F0aW9uID0gdXNlUGF0aG5hbWUoKTsgLy8gSG9vayB0byBnZXQgdGhlIGN1cnJlbnQgcm91dGVcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgaGFuZGxlRHJvcGRvd25DbGljayA9IChldmVudCkgPT4ge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBjb25zdCBjbGlja2VkTGluayA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XHJcbiAgICAgIGNvbnN0IGNsaWNrZWREcm9wZG93biA9IGNsaWNrZWRMaW5rLmNsb3Nlc3QoXCIuZHJvcGRvd25cIik7XHJcblxyXG4gICAgICBpZiAoIWNsaWNrZWREcm9wZG93bikgcmV0dXJuO1xyXG5cclxuICAgICAgY29uc3QgaXNBY3RpdmUgPSBjbGlja2VkRHJvcGRvd24uY2xhc3NMaXN0LmNvbnRhaW5zKFwib3BlblwiKTtcclxuXHJcbiAgICAgIC8vIENsb3NlIGFsbCBkcm9wZG93bnNcclxuICAgICAgY29uc3QgYWxsRHJvcGRvd25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zaWRlYmFyLW1lbnUgLmRyb3Bkb3duXCIpO1xyXG4gICAgICBhbGxEcm9wZG93bnMuZm9yRWFjaCgoZHJvcGRvd24pID0+IHtcclxuICAgICAgICBkcm9wZG93bi5jbGFzc0xpc3QucmVtb3ZlKFwib3BlblwiKTtcclxuICAgICAgICBjb25zdCBzdWJtZW51ID0gZHJvcGRvd24ucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLXN1Ym1lbnVcIik7XHJcbiAgICAgICAgaWYgKHN1Ym1lbnUpIHtcclxuICAgICAgICAgIHN1Ym1lbnUuc3R5bGUubWF4SGVpZ2h0ID0gXCIwcHhcIjsgLy8gQ29sbGFwc2Ugc3VibWVudVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBUb2dnbGUgdGhlIGNsaWNrZWQgZHJvcGRvd25cclxuICAgICAgaWYgKCFpc0FjdGl2ZSkge1xyXG4gICAgICAgIGNsaWNrZWREcm9wZG93bi5jbGFzc0xpc3QuYWRkKFwib3BlblwiKTtcclxuICAgICAgICBjb25zdCBzdWJtZW51ID0gY2xpY2tlZERyb3Bkb3duLnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhci1zdWJtZW51XCIpO1xyXG4gICAgICAgIGlmIChzdWJtZW51KSB7XHJcbiAgICAgICAgICBzdWJtZW51LnN0eWxlLm1heEhlaWdodCA9IGAke3N1Ym1lbnUuc2Nyb2xsSGVpZ2h0fXB4YDsgLy8gRXhwYW5kIHN1Ym1lbnVcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy8gQXR0YWNoIGNsaWNrIGV2ZW50IGxpc3RlbmVycyB0byBhbGwgZHJvcGRvd24gdHJpZ2dlcnNcclxuICAgIGNvbnN0IGRyb3Bkb3duVHJpZ2dlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxyXG4gICAgICBcIi5zaWRlYmFyLW1lbnUgLmRyb3Bkb3duID4gYSwgLnNpZGViYXItbWVudSAuZHJvcGRvd24gPiBMaW5rXCJcclxuICAgICk7XHJcblxyXG4gICAgZHJvcGRvd25UcmlnZ2Vycy5mb3JFYWNoKCh0cmlnZ2VyKSA9PiB7XHJcbiAgICAgIHRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZURyb3Bkb3duQ2xpY2spO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3Qgb3BlbkFjdGl2ZURyb3Bkb3duID0gKCkgPT4ge1xyXG4gICAgICBjb25zdCBhbGxEcm9wZG93bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNpZGViYXItbWVudSAuZHJvcGRvd25cIik7XHJcbiAgICAgIGFsbERyb3Bkb3ducy5mb3JFYWNoKChkcm9wZG93bikgPT4ge1xyXG4gICAgICAgIGNvbnN0IHN1Ym1lbnVMaW5rcyA9IGRyb3Bkb3duLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2lkZWJhci1zdWJtZW51IGxpIGFcIik7XHJcbiAgICAgICAgc3VibWVudUxpbmtzLmZvckVhY2goKGxpbmspID0+IHtcclxuICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgbGluay5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpID09PSBsb2NhdGlvbiB8fFxyXG4gICAgICAgICAgICBsaW5rLmdldEF0dHJpYnV0ZShcInRvXCIpID09PSBsb2NhdGlvblxyXG4gICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIGRyb3Bkb3duLmNsYXNzTGlzdC5hZGQoXCJvcGVuXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBzdWJtZW51ID0gZHJvcGRvd24ucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLXN1Ym1lbnVcIik7XHJcbiAgICAgICAgICAgIGlmIChzdWJtZW51KSB7XHJcbiAgICAgICAgICAgICAgc3VibWVudS5zdHlsZS5tYXhIZWlnaHQgPSBgJHtzdWJtZW51LnNjcm9sbEhlaWdodH1weGA7IC8vIEV4cGFuZCBzdWJtZW51XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIE9wZW4gdGhlIHN1Ym1lbnUgdGhhdCBjb250YWlucyB0aGUgYWN0aXZlIHJvdXRlXHJcbiAgICBvcGVuQWN0aXZlRHJvcGRvd24oKTtcclxuXHJcbiAgICAvLyBDbGVhbnVwIGV2ZW50IGxpc3RlbmVycyBvbiB1bm1vdW50XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBkcm9wZG93blRyaWdnZXJzLmZvckVhY2goKHRyaWdnZXIpID0+IHtcclxuICAgICAgICB0cmlnZ2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVEcm9wZG93bkNsaWNrKTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG4gIH0sIFtsb2NhdGlvbi5wYXRobmFtZV0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgY2hlY2tBdXRoID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICBsZXQgYWNjZXNzVG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImFjY2Vzc1Rva2VuXCIpO1xyXG5cclxuICAgICAgaWYgKCFhY2Nlc3NUb2tlbiB8fCBpc1Rva2VuRXhwaXJlZChhY2Nlc3NUb2tlbikpIHtcclxuICAgICAgICBhY2Nlc3NUb2tlbiA9IGF3YWl0IHJlZnJlc2hBY2Nlc3NUb2tlbigpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIWFjY2Vzc1Rva2VuKSB7XHJcbiAgICAgICAgcm91dGVyLnB1c2goXCIvc2lnbi1pblwiKTsgLy8gUmVkaXJpZ2UgYWwgdXN1YXJpbyBzaSBubyBoYXkgc2VzacOzbiB2w6FsaWRhXHJcbiAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgIHNldElzQXV0aGVudGljYXRlZCh0cnVlKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjaGVja0F1dGgoKTtcclxuICB9LCBbcm91dGVyXSk7XHJcbiAgXHJcbiAgaWYgKCFpc0F1dGhlbnRpY2F0ZWQpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiQXV0aGVudGVpY2F0ZWQgSW46IFwiLCFpc0F1dGhlbnRpY2F0ZWQpO1xyXG4gICAgcmV0dXJuIG51bGw7IC8vIEV2aXRhIHJlbmRlcml6YXIgY29udGVuaWRvIGFudGVzIGRlIHZhbGlkYXIgbGEgc2VzacOzblxyXG4gIH1cclxuICBsZXQgc2lkZWJhckNvbnRyb2wgPSAoKSA9PiB7XHJcbiAgICBzZVNpZGViYXJBY3RpdmUoIXNpZGViYXJBY3RpdmUpO1xyXG4gIH07XHJcblxyXG4gIGxldCBtb2JpbGVNZW51Q29udHJvbCA9ICgpID0+IHtcclxuICAgIHNldE1vYmlsZU1lbnUoIW1vYmlsZU1lbnUpO1xyXG4gIH07XHJcblxyXG4gIHJldHVybiB7fVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWFzdGVyTGF5b3V0O1xyXG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsIkljb24iLCJ1c2VQYXRobmFtZSIsInVzZVJvdXRlciIsIlRoZW1lVG9nZ2xlQnV0dG9uIiwiTGluayIsImlzVG9rZW5FeHBpcmVkIiwicmVmcmVzaEFjY2Vzc1Rva2VuIiwibG9nb3V0IiwiTWFzdGVyTGF5b3V0IiwiY2hpbGRyZW4iLCJyb3V0ZXIiLCJpc0F1dGhlbnRpY2F0ZWQiLCJzZXRJc0F1dGhlbnRpY2F0ZWQiLCJwYXRobmFtZSIsInNpZGViYXJBY3RpdmUiLCJzZVNpZGViYXJBY3RpdmUiLCJtb2JpbGVNZW51Iiwic2V0TW9iaWxlTWVudSIsImxvY2F0aW9uIiwiaGFuZGxlRHJvcGRvd25DbGljayIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJjbGlja2VkTGluayIsImN1cnJlbnRUYXJnZXQiLCJjbGlja2VkRHJvcGRvd24iLCJjbG9zZXN0IiwiaXNBY3RpdmUiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsImFsbERyb3Bkb3ducyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJkcm9wZG93biIsInJlbW92ZSIsInN1Ym1lbnUiLCJxdWVyeVNlbGVjdG9yIiwic3R5bGUiLCJtYXhIZWlnaHQiLCJhZGQiLCJzY3JvbGxIZWlnaHQiLCJkcm9wZG93blRyaWdnZXJzIiwidHJpZ2dlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJvcGVuQWN0aXZlRHJvcGRvd24iLCJzdWJtZW51TGlua3MiLCJsaW5rIiwiZ2V0QXR0cmlidXRlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImNoZWNrQXV0aCIsImFjY2Vzc1Rva2VuIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInB1c2giLCJjb25zb2xlIiwibG9nIiwic2lkZWJhckNvbnRyb2wiLCJtb2JpbGVNZW51Q29udHJvbCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/masterLayout/MasterLayout.jsx\n"));

/***/ })

});