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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   isTokenExpired: () => (/* binding */ isTokenExpired),\n/* harmony export */   logout: () => (/* binding */ logout),\n/* harmony export */   refreshAccessToken: () => (/* binding */ refreshAccessToken)\n/* harmony export */ });\n/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jwt-decode */ \"(app-pages-browser)/./node_modules/jwt-decode/build/esm/index.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/dist/api/navigation.js\");\nvar _s = $RefreshSig$();\n\n\n// Función para verificar si el token ha expirado\nconst isTokenExpired = (token)=>{\n    if (!token) return true;\n    try {\n        const decoded = (0,jwt_decode__WEBPACK_IMPORTED_MODULE_0__.jwtDecode)(token);\n        return decoded.exp * 1000 < Date.now();\n    } catch (error) {\n        return true; // Si hay error decodificando, lo consideramos expirado\n    }\n};\n// Función para refrescar el accessToken\nconst refreshAccessToken = async ()=>{\n    const refreshToken = localStorage.getItem(\"refreshToken\");\n    if (!refreshToken) return null;\n    try {\n        const response = await fetch(\"\".concat(\"http://localhost:4000/api/\", \"admin/auth/refresh\"), {\n            method: \"POST\",\n            headers: {\n                \"Content-Type\": \"application/json\"\n            },\n            body: JSON.stringify({\n                refreshToken\n            })\n        });\n        if (response.ok) {\n            const data = await response.json();\n            localStorage.setItem(\"accessToken\", data.accessToken);\n            return data.accessToken;\n        } else {\n            return null;\n        }\n    } catch (error) {\n        console.error(\"Error al refrescar el token:\", error);\n        return null;\n    }\n};\n// Función para refrescar el accessToken\nconst logout = async ()=>{\n    _s();\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_1__.useRouter)();\n    const accessToken = localStorage.getItem(\"accessToken\");\n    if (!accessToken) {\n        console.warn(\"No hay token disponible. Redirigiendo al inicio de sesión...\");\n        router.push(\"/sign-in\");\n    }\n    try {\n        const response = await fetch(\"\".concat(\"http://localhost:4000/api/\", \"admin/auth/logout\"), {\n            method: \"POST\",\n            headers: {\n                \"Content-Type\": \"application/json\",\n                \"Authorization\": \"Bearer \".concat(accessToken)\n            }\n        });\n        if (response.ok) {\n            router.push(\"/sign-in\");\n        } else {\n            console.error(\"Error en el logout:\", await response.text());\n        }\n    } catch (error) {\n        console.error(\"Error de red:\", error);\n    } finally{\n        // Eliminar los tokens del localStorage\n        localStorage.removeItem(\"accessToken\");\n        localStorage.removeItem(\"refreshToken\");\n        // Redirigir al usuario a la página de inicio de sesión\n        router.push(\"/sign-in\");\n    }\n}; // Función para redirigir al login\n_s(logout, \"fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_1__.useRouter\n    ];\n});\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy91dGlscy9hdXRoVXRpbHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQXVDO0FBQ0s7QUFFNUMsaURBQWlEO0FBQzFDLE1BQU1FLGlCQUFpQixDQUFDQztJQUM3QixJQUFJLENBQUNBLE9BQU8sT0FBTztJQUNuQixJQUFJO1FBQ0YsTUFBTUMsVUFBVUoscURBQVNBLENBQUNHO1FBQzFCLE9BQU9DLFFBQVFDLEdBQUcsR0FBRyxPQUFPQyxLQUFLQyxHQUFHO0lBQ3RDLEVBQUUsT0FBT0MsT0FBTztRQUNkLE9BQU8sTUFBTSx1REFBdUQ7SUFDdEU7QUFDRixFQUFFO0FBRUYsd0NBQXdDO0FBQ2pDLE1BQU1DLHFCQUFxQjtJQUNoQyxNQUFNQyxlQUFlQyxhQUFhQyxPQUFPLENBQUM7SUFFMUMsSUFBSSxDQUFDRixjQUFjLE9BQU87SUFFMUIsSUFBSTtRQUNGLE1BQU1HLFdBQVcsTUFBTUMsTUFBTSxHQUFvQyxPQUFqQ0MsNEJBQWdDLEVBQUMsdUJBQXFCO1lBQ3BGRyxRQUFRO1lBQ1JDLFNBQVM7Z0JBQ1AsZ0JBQWdCO1lBQ2xCO1lBQ0FDLE1BQU1DLEtBQUtDLFNBQVMsQ0FBQztnQkFBRVo7WUFBYTtRQUN0QztRQUVBLElBQUlHLFNBQVNVLEVBQUUsRUFBRTtZQUNmLE1BQU1DLE9BQU8sTUFBTVgsU0FBU1ksSUFBSTtZQUNoQ2QsYUFBYWUsT0FBTyxDQUFDLGVBQWVGLEtBQUtHLFdBQVc7WUFDcEQsT0FBT0gsS0FBS0csV0FBVztRQUN6QixPQUFPO1lBQ0wsT0FBTztRQUNUO0lBQ0YsRUFBRSxPQUFPbkIsT0FBTztRQUNkb0IsUUFBUXBCLEtBQUssQ0FBQyxnQ0FBZ0NBO1FBQzlDLE9BQU87SUFDVDtBQUNGLEVBQUU7QUFHRix3Q0FBd0M7QUFDakMsTUFBTXFCLFNBQVM7O0lBQ3BCLE1BQU1DLFNBQVM3QiwwREFBU0E7SUFDeEIsTUFBTTBCLGNBQWNoQixhQUFhQyxPQUFPLENBQUM7SUFFekMsSUFBSSxDQUFDZSxhQUFhO1FBQ2hCQyxRQUFRRyxJQUFJLENBQUM7UUFDYkQsT0FBT0UsSUFBSSxDQUFDO0lBQ2Q7SUFFQSxJQUFJO1FBQ0YsTUFBTW5CLFdBQVcsTUFBTUMsTUFBTSxHQUFvQyxPQUFqQ0MsNEJBQWdDLEVBQUMsc0JBQW9CO1lBQ25GRyxRQUFRO1lBQ1JDLFNBQVM7Z0JBQ1AsZ0JBQWdCO2dCQUNoQixpQkFBaUIsVUFBc0IsT0FBWlE7WUFDN0I7UUFDRjtRQUVBLElBQUlkLFNBQVNVLEVBQUUsRUFBRTtZQUNmTyxPQUFPRSxJQUFJLENBQUM7UUFDZCxPQUFPO1lBQ0xKLFFBQVFwQixLQUFLLENBQUMsdUJBQXVCLE1BQU1LLFNBQVNvQixJQUFJO1FBQzFEO0lBQ0YsRUFBRSxPQUFPekIsT0FBTztRQUNkb0IsUUFBUXBCLEtBQUssQ0FBQyxpQkFBaUJBO0lBQ2pDLFNBQVU7UUFDUix1Q0FBdUM7UUFDdkNHLGFBQWF1QixVQUFVLENBQUM7UUFDeEJ2QixhQUFhdUIsVUFBVSxDQUFDO1FBRXhCLHVEQUF1RDtRQUN2REosT0FBT0UsSUFBSSxDQUFDO0lBQ2Q7QUFDRixFQUFFLENBRUYsa0NBQWtDO0dBbkNyQkg7O1FBQ0k1QixzREFBU0EiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcNTczMjFcXERvd25sb2Fkc1xcQXJjaGl2ZVxcc3JjXFx1dGlsc1xcYXV0aFV0aWxzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGp3dERlY29kZSB9IGZyb20gXCJqd3QtZGVjb2RlXCI7XHJcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gXCJuZXh0L25hdmlnYXRpb25cIjtcclxuXHJcbi8vIEZ1bmNpw7NuIHBhcmEgdmVyaWZpY2FyIHNpIGVsIHRva2VuIGhhIGV4cGlyYWRvXHJcbmV4cG9ydCBjb25zdCBpc1Rva2VuRXhwaXJlZCA9ICh0b2tlbikgPT4ge1xyXG4gIGlmICghdG9rZW4pIHJldHVybiB0cnVlO1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBkZWNvZGVkID0gand0RGVjb2RlKHRva2VuKTtcclxuICAgIHJldHVybiBkZWNvZGVkLmV4cCAqIDEwMDAgPCBEYXRlLm5vdygpO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICByZXR1cm4gdHJ1ZTsgLy8gU2kgaGF5IGVycm9yIGRlY29kaWZpY2FuZG8sIGxvIGNvbnNpZGVyYW1vcyBleHBpcmFkb1xyXG4gIH1cclxufTtcclxuXHJcbi8vIEZ1bmNpw7NuIHBhcmEgcmVmcmVzY2FyIGVsIGFjY2Vzc1Rva2VuXHJcbmV4cG9ydCBjb25zdCByZWZyZXNoQWNjZXNzVG9rZW4gPSBhc3luYyAoKSA9PiB7XHJcbiAgY29uc3QgcmVmcmVzaFRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJyZWZyZXNoVG9rZW5cIik7XHJcblxyXG4gIGlmICghcmVmcmVzaFRva2VuKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7cHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQkFTRV9VUkx9YWRtaW4vYXV0aC9yZWZyZXNoYCwge1xyXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgIH0sXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgcmVmcmVzaFRva2VuIH0pLFxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHJlc3BvbnNlLm9rKSB7XHJcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiYWNjZXNzVG9rZW5cIiwgZGF0YS5hY2Nlc3NUb2tlbik7XHJcbiAgICAgIHJldHVybiBkYXRhLmFjY2Vzc1Rva2VuO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBhbCByZWZyZXNjYXIgZWwgdG9rZW46XCIsIGVycm9yKTtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxufTtcclxuXHJcblxyXG4vLyBGdW5jacOzbiBwYXJhIHJlZnJlc2NhciBlbCBhY2Nlc3NUb2tlblxyXG5leHBvcnQgY29uc3QgbG9nb3V0ID0gYXN5bmMgKCkgPT4ge1xyXG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xyXG4gIGNvbnN0IGFjY2Vzc1Rva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJhY2Nlc3NUb2tlblwiKTtcclxuXHJcbiAgaWYgKCFhY2Nlc3NUb2tlbikge1xyXG4gICAgY29uc29sZS53YXJuKFwiTm8gaGF5IHRva2VuIGRpc3BvbmlibGUuIFJlZGlyaWdpZW5kbyBhbCBpbmljaW8gZGUgc2VzacOzbi4uLlwiKTtcclxuICAgIHJvdXRlci5wdXNoKFwiL3NpZ24taW5cIik7XHJcbiAgfVxyXG5cclxuICB0cnkge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHtwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19CQVNFX1VSTH1hZG1pbi9hdXRoL2xvZ291dGAsIHtcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgIFwiQXV0aG9yaXphdGlvblwiOiBgQmVhcmVyICR7YWNjZXNzVG9rZW59YFxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAocmVzcG9uc2Uub2spIHtcclxuICAgICAgcm91dGVyLnB1c2goXCIvc2lnbi1pblwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBlbiBlbCBsb2dvdXQ6XCIsIGF3YWl0IHJlc3BvbnNlLnRleHQoKSk7XHJcbiAgICB9XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBkZSByZWQ6XCIsIGVycm9yKTtcclxuICB9IGZpbmFsbHkge1xyXG4gICAgLy8gRWxpbWluYXIgbG9zIHRva2VucyBkZWwgbG9jYWxTdG9yYWdlXHJcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcImFjY2Vzc1Rva2VuXCIpO1xyXG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJyZWZyZXNoVG9rZW5cIik7XHJcblxyXG4gICAgLy8gUmVkaXJpZ2lyIGFsIHVzdWFyaW8gYSBsYSBww6FnaW5hIGRlIGluaWNpbyBkZSBzZXNpw7NuXHJcbiAgICByb3V0ZXIucHVzaChcIi9zaWduLWluXCIpO1xyXG4gIH1cclxufTtcclxuXHJcbi8vIEZ1bmNpw7NuIHBhcmEgcmVkaXJpZ2lyIGFsIGxvZ2luXHJcblxyXG5cclxuIl0sIm5hbWVzIjpbImp3dERlY29kZSIsInVzZVJvdXRlciIsImlzVG9rZW5FeHBpcmVkIiwidG9rZW4iLCJkZWNvZGVkIiwiZXhwIiwiRGF0ZSIsIm5vdyIsImVycm9yIiwicmVmcmVzaEFjY2Vzc1Rva2VuIiwicmVmcmVzaFRva2VuIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInJlc3BvbnNlIiwiZmV0Y2giLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfQkFTRV9VUkwiLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJvayIsImRhdGEiLCJqc29uIiwic2V0SXRlbSIsImFjY2Vzc1Rva2VuIiwiY29uc29sZSIsImxvZ291dCIsInJvdXRlciIsIndhcm4iLCJwdXNoIiwidGV4dCIsInJlbW92ZUl0ZW0iXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/utils/authUtils.js\n"));

/***/ })

});