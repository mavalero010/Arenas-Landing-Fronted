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

/***/ "(app-pages-browser)/./src/utils/authUtils.js":
/*!********************************!*\
  !*** ./src/utils/authUtils.js ***!
  \********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   isTokenExpired: () => (/* binding */ isTokenExpired),\n/* harmony export */   logout: () => (/* binding */ logout),\n/* harmony export */   refreshAccessToken: () => (/* binding */ refreshAccessToken)\n/* harmony export */ });\n/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jwt-decode */ \"(app-pages-browser)/./node_modules/jwt-decode/build/esm/index.js\");\n\n// Función para verificar si el token ha expirado\nconst isTokenExpired = (token)=>{\n    if (!token) return true;\n    try {\n        const decoded = (0,jwt_decode__WEBPACK_IMPORTED_MODULE_0__.jwtDecode)(token);\n        return decoded.exp * 1000 < Date.now();\n    } catch (error) {\n        return true; // Si hay error decodificando, lo consideramos expirado\n    }\n};\n// Función para refrescar el accessToken\nconst refreshAccessToken = async ()=>{\n    const refreshToken = localStorage.getItem(\"refreshToken\");\n    if (!refreshToken) return null;\n    try {\n        const response = await fetch(\"\".concat(\"http://localhost:4000/api/\", \"admin/auth/refresh\"), {\n            method: \"POST\",\n            headers: {\n                \"Content-Type\": \"application/json\"\n            },\n            body: JSON.stringify({\n                refreshToken\n            })\n        });\n        if (response.ok) {\n            const data = await response.json();\n            localStorage.setItem(\"accessToken\", data.accessToken);\n            return data.accessToken;\n        } else {\n            return null;\n        }\n    } catch (error) {\n        console.error(\"Error al refrescar el token:\", error);\n        return null;\n    }\n};\n// Función para refrescar el accessToken\nconst logout = async ()=>{\n    const accessToken = localStorage.getItem(\"accessToken\");\n    if (!accessToken) {\n        console.warn(\"No hay token disponible. Redirigiendo al inicio de sesión...\");\n        router.push(\"/sign-in\");\n    }\n    try {\n        const response = await fetch(\"\".concat(\"http://localhost:4000/api/\", \"admin/auth/logout\"), {\n            method: \"POST\",\n            headers: {\n                \"Content-Type\": \"application/json\",\n                \"Authorization\": \"Bearer \".concat(accessToken)\n            }\n        });\n        if (response.ok) {\n            router.push(\"/sign-in\");\n        } else {\n            console.error(\"Error en el logout:\", await response.text());\n        }\n    } catch (error) {\n        console.error(\"Error de red:\", error);\n    } finally{\n        // Eliminar los tokens del localStorage\n        localStorage.removeItem(\"accessToken\");\n        localStorage.removeItem(\"refreshToken\");\n        // Redirigir al usuario a la página de inicio de sesión\n        redirectToLogin();\n    }\n}; // Función para redirigir al login\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy91dGlscy9hdXRoVXRpbHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUF1QztBQUV2QyxpREFBaUQ7QUFDMUMsTUFBTUMsaUJBQWlCLENBQUNDO0lBQzdCLElBQUksQ0FBQ0EsT0FBTyxPQUFPO0lBQ25CLElBQUk7UUFDRixNQUFNQyxVQUFVSCxxREFBU0EsQ0FBQ0U7UUFDMUIsT0FBT0MsUUFBUUMsR0FBRyxHQUFHLE9BQU9DLEtBQUtDLEdBQUc7SUFDdEMsRUFBRSxPQUFPQyxPQUFPO1FBQ2QsT0FBTyxNQUFNLHVEQUF1RDtJQUN0RTtBQUNGLEVBQUU7QUFFRix3Q0FBd0M7QUFDakMsTUFBTUMscUJBQXFCO0lBQ2hDLE1BQU1DLGVBQWVDLGFBQWFDLE9BQU8sQ0FBQztJQUUxQyxJQUFJLENBQUNGLGNBQWMsT0FBTztJQUUxQixJQUFJO1FBQ0YsTUFBTUcsV0FBVyxNQUFNQyxNQUFNLEdBQW9DLE9BQWpDQyw0QkFBZ0MsRUFBQyx1QkFBcUI7WUFDcEZHLFFBQVE7WUFDUkMsU0FBUztnQkFDUCxnQkFBZ0I7WUFDbEI7WUFDQUMsTUFBTUMsS0FBS0MsU0FBUyxDQUFDO2dCQUFFWjtZQUFhO1FBQ3RDO1FBRUEsSUFBSUcsU0FBU1UsRUFBRSxFQUFFO1lBQ2YsTUFBTUMsT0FBTyxNQUFNWCxTQUFTWSxJQUFJO1lBQ2hDZCxhQUFhZSxPQUFPLENBQUMsZUFBZUYsS0FBS0csV0FBVztZQUNwRCxPQUFPSCxLQUFLRyxXQUFXO1FBQ3pCLE9BQU87WUFDTCxPQUFPO1FBQ1Q7SUFDRixFQUFFLE9BQU9uQixPQUFPO1FBQ2RvQixRQUFRcEIsS0FBSyxDQUFDLGdDQUFnQ0E7UUFDOUMsT0FBTztJQUNUO0FBQ0YsRUFBRTtBQUdGLHdDQUF3QztBQUNqQyxNQUFNcUIsU0FBUztJQUNwQixNQUFNRixjQUFjaEIsYUFBYUMsT0FBTyxDQUFDO0lBRXpDLElBQUksQ0FBQ2UsYUFBYTtRQUNoQkMsUUFBUUUsSUFBSSxDQUFDO1FBQ2JDLE9BQU9DLElBQUksQ0FBQztJQUNkO0lBRUEsSUFBSTtRQUNGLE1BQU1uQixXQUFXLE1BQU1DLE1BQU0sR0FBb0MsT0FBakNDLDRCQUFnQyxFQUFDLHNCQUFvQjtZQUNuRkcsUUFBUTtZQUNSQyxTQUFTO2dCQUNQLGdCQUFnQjtnQkFDaEIsaUJBQWlCLFVBQXNCLE9BQVpRO1lBQzdCO1FBQ0Y7UUFFQSxJQUFJZCxTQUFTVSxFQUFFLEVBQUU7WUFDZlEsT0FBT0MsSUFBSSxDQUFDO1FBQ2QsT0FBTztZQUNMSixRQUFRcEIsS0FBSyxDQUFDLHVCQUF1QixNQUFNSyxTQUFTb0IsSUFBSTtRQUMxRDtJQUNGLEVBQUUsT0FBT3pCLE9BQU87UUFDZG9CLFFBQVFwQixLQUFLLENBQUMsaUJBQWlCQTtJQUNqQyxTQUFVO1FBQ1IsdUNBQXVDO1FBQ3ZDRyxhQUFhdUIsVUFBVSxDQUFDO1FBQ3hCdkIsYUFBYXVCLFVBQVUsQ0FBQztRQUV4Qix1REFBdUQ7UUFDdkRDO0lBQ0Y7QUFDRixFQUFFLENBRUYsa0NBQWtDIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXDU3MzIxXFxEb3dubG9hZHNcXEFyY2hpdmVcXHNyY1xcdXRpbHNcXGF1dGhVdGlscy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBqd3REZWNvZGUgfSBmcm9tIFwiand0LWRlY29kZVwiO1xyXG5cclxuLy8gRnVuY2nDs24gcGFyYSB2ZXJpZmljYXIgc2kgZWwgdG9rZW4gaGEgZXhwaXJhZG9cclxuZXhwb3J0IGNvbnN0IGlzVG9rZW5FeHBpcmVkID0gKHRva2VuKSA9PiB7XHJcbiAgaWYgKCF0b2tlbikgcmV0dXJuIHRydWU7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IGRlY29kZWQgPSBqd3REZWNvZGUodG9rZW4pO1xyXG4gICAgcmV0dXJuIGRlY29kZWQuZXhwICogMTAwMCA8IERhdGUubm93KCk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIHJldHVybiB0cnVlOyAvLyBTaSBoYXkgZXJyb3IgZGVjb2RpZmljYW5kbywgbG8gY29uc2lkZXJhbW9zIGV4cGlyYWRvXHJcbiAgfVxyXG59O1xyXG5cclxuLy8gRnVuY2nDs24gcGFyYSByZWZyZXNjYXIgZWwgYWNjZXNzVG9rZW5cclxuZXhwb3J0IGNvbnN0IHJlZnJlc2hBY2Nlc3NUb2tlbiA9IGFzeW5jICgpID0+IHtcclxuICBjb25zdCByZWZyZXNoVG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInJlZnJlc2hUb2tlblwiKTtcclxuXHJcbiAgaWYgKCFyZWZyZXNoVG9rZW4pIHJldHVybiBudWxsO1xyXG5cclxuICB0cnkge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHtwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19CQVNFX1VSTH1hZG1pbi9hdXRoL3JlZnJlc2hgLCB7XHJcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgfSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyByZWZyZXNoVG9rZW4gfSksXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAocmVzcG9uc2Uub2spIHtcclxuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJhY2Nlc3NUb2tlblwiLCBkYXRhLmFjY2Vzc1Rva2VuKTtcclxuICAgICAgcmV0dXJuIGRhdGEuYWNjZXNzVG9rZW47XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGFsIHJlZnJlc2NhciBlbCB0b2tlbjpcIiwgZXJyb3IpO1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG59O1xyXG5cclxuXHJcbi8vIEZ1bmNpw7NuIHBhcmEgcmVmcmVzY2FyIGVsIGFjY2Vzc1Rva2VuXHJcbmV4cG9ydCBjb25zdCBsb2dvdXQgPSBhc3luYyAoKSA9PiB7XHJcbiAgY29uc3QgYWNjZXNzVG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImFjY2Vzc1Rva2VuXCIpO1xyXG5cclxuICBpZiAoIWFjY2Vzc1Rva2VuKSB7XHJcbiAgICBjb25zb2xlLndhcm4oXCJObyBoYXkgdG9rZW4gZGlzcG9uaWJsZS4gUmVkaXJpZ2llbmRvIGFsIGluaWNpbyBkZSBzZXNpw7NuLi4uXCIpO1xyXG4gICAgcm91dGVyLnB1c2goXCIvc2lnbi1pblwiKTtcclxuICB9XHJcblxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke3Byb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0JBU0VfVVJMfWFkbWluL2F1dGgvbG9nb3V0YCwge1xyXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgXCJBdXRob3JpemF0aW9uXCI6IGBCZWFyZXIgJHthY2Nlc3NUb2tlbn1gXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChyZXNwb25zZS5vaykge1xyXG4gICAgICByb3V0ZXIucHVzaChcIi9zaWduLWluXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGVuIGVsIGxvZ291dDpcIiwgYXdhaXQgcmVzcG9uc2UudGV4dCgpKTtcclxuICAgIH1cclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGRlIHJlZDpcIiwgZXJyb3IpO1xyXG4gIH0gZmluYWxseSB7XHJcbiAgICAvLyBFbGltaW5hciBsb3MgdG9rZW5zIGRlbCBsb2NhbFN0b3JhZ2VcclxuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwiYWNjZXNzVG9rZW5cIik7XHJcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcInJlZnJlc2hUb2tlblwiKTtcclxuXHJcbiAgICAvLyBSZWRpcmlnaXIgYWwgdXN1YXJpbyBhIGxhIHDDoWdpbmEgZGUgaW5pY2lvIGRlIHNlc2nDs25cclxuICAgIHJlZGlyZWN0VG9Mb2dpbigpO1xyXG4gIH1cclxufTtcclxuXHJcbi8vIEZ1bmNpw7NuIHBhcmEgcmVkaXJpZ2lyIGFsIGxvZ2luXHJcblxyXG5cclxuIl0sIm5hbWVzIjpbImp3dERlY29kZSIsImlzVG9rZW5FeHBpcmVkIiwidG9rZW4iLCJkZWNvZGVkIiwiZXhwIiwiRGF0ZSIsIm5vdyIsImVycm9yIiwicmVmcmVzaEFjY2Vzc1Rva2VuIiwicmVmcmVzaFRva2VuIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInJlc3BvbnNlIiwiZmV0Y2giLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfQkFTRV9VUkwiLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJvayIsImRhdGEiLCJqc29uIiwic2V0SXRlbSIsImFjY2Vzc1Rva2VuIiwiY29uc29sZSIsImxvZ291dCIsIndhcm4iLCJyb3V0ZXIiLCJwdXNoIiwidGV4dCIsInJlbW92ZUl0ZW0iLCJyZWRpcmVjdFRvTG9naW4iXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/utils/authUtils.js\n"));

/***/ })

});