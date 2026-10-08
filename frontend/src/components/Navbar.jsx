// import React, { useContext, useState, useCallback, useMemo } from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import { useSelector } from "react-redux";
// import "../styles/navbar.css";

// // Admin & User link arrays
// const adminLinks = [
//   { to: "/admin", label: "Dashboard" },
//   { to: "/admin/products", label: "Products" },
//   { to: "/admin/add-product", label: "Add Product" },
//   { to: "/admin/orders", label: "Orders" },
//   { to: "/admin/users", label: "Users" },
// ];

// const userLinks = [
//   { to: "/shop", label: "Shop" },
//   { to: "/cart", label: "Cart" },
//   { to: "/profile", label: "Profile" },
// ];

// const Navbar = () => {
//   const { user, logout } = useContext(AuthContext);
//   const cartItems = useSelector((state) => state.cart.cartItems);
//   const navigate = useNavigate();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);

//   const cartCount = useMemo(() => cartItems.length, [cartItems]);

//   const handleLogout = useCallback(() => {
//     if (window.confirm("Are you sure you want to logout?")) {
//       logout();
//       navigate("/login");
//       setIsMenuOpen(false);
//       setIsProfileOpen(false);
//     }
//   }, [logout, navigate]);

//   const toggleMenu = useCallback(() => {
//     setIsMenuOpen((prev) => !prev);
//     if (isProfileOpen) setIsProfileOpen(false);
//   }, [isProfileOpen]);

//   const toggleProfile = useCallback(() => {
//     setIsProfileOpen((prev) => !prev);
//   }, []);

//   const closeMenu = useCallback(() => {
//     setIsMenuOpen(false);
//     setIsProfileOpen(false);
//   }, []);

//   const renderLinks = (links) => {
//     return links.map(({ to, label }) => {
//       if (to === "/cart") {
//         return (
//           <li key={to}>
//             <NavLink to={to} onClick={closeMenu} end>
//               Cart{" "}
//               <span className="cart-count" aria-label="Cart items">
//                 ({cartCount})
//               </span>
//             </NavLink>
//           </li>
//         );
//       }
//       return (
//         <li key={to}>
//           <NavLink to={to} onClick={closeMenu} end>
//             {label}
//           </NavLink>
//         </li>
//       );
//     });
//   };

//   return (
//     <nav className="navbar" role="navigation" aria-label="Main navigation">
//       <div className="navbar-container">
//         <div className="navbar-brand">
//           <Link to="/" onClick={closeMenu}>
//             <img
//               src="/handyartstorelogo1.png"
//               alt="HandyArtStore logo"
//               className="brand-logo"
//             />
//             <span className="brand-name">HandyArtStore</span>
//           </Link>
//         </div>

//         <button
//           className={`hamburger ${isMenuOpen ? "active" : ""}`}
//           onClick={toggleMenu}
//           aria-label="Toggle navigation menu"
//           aria-expanded={isMenuOpen}
//           aria-controls="navbar-links"
//         >
//           <span className="hamburger-line"></span>
//           <span className="hamburger-line"></span>
//           <span className="hamburger-line"></span>
//         </button>

//         <ul
//           id="navbar-links"
//           className={`navbar-links ${isMenuOpen ? "open" : ""}`}
//         >
//           {user ? (
//             <>
//               {user.role === "admin"
//                 ? renderLinks(adminLinks)
//                 : renderLinks(userLinks)}

//               <li className="profile-dropdown-wrapper">
//                 <button
//                   className="profile-trigger"
//                   onClick={toggleProfile}
//                   aria-haspopup="true"
//                   aria-expanded={isProfileOpen}
//                 >
//                   <span className="profile-name">
//                     Hi, {user.name?.split(" ")[0] || "User"}
//                   </span>
//                   <span className="profile-arrow">▾</span>
//                 </button>
//                 <ul
//                   className={`profile-dropdown ${isProfileOpen ? "open" : ""}`}
//                   role="menu"
//                 >
//                   {user.role !== "admin" && (
//                     <li role="menuitem">
//                       <NavLink to="/profile" onClick={closeMenu}>
//                         My Profile
//                       </NavLink>
//                     </li>
//                   )}
//                   <li role="menuitem">
//                     <button onClick={handleLogout} className="btn-logout">
//                       Logout
//                     </button>
//                   </li>
//                 </ul>
//               </li>
//             </>
//           ) : (
//             <>
//               <li>
//                 <NavLink to="/shop" onClick={closeMenu} end>
//                   Shop
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink to="/login" onClick={closeMenu} className="btn-login">
//                   Login
//                 </NavLink>
//               </li>
//             </>
//           )}
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// import React, {
//   useContext,
//   useState,
//   useCallback,
//   useMemo,
//   useEffect,
//   useRef,
// } from "react";
// import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import { useSelector } from "react-redux";
// import "../styles/navbar.css";

// // ============================================================
// // CUSTOMER NAVIGATION
// // ============================================================

// const customerLinks = [
//   { to: "/", label: "Home", end: true },
//   { to: "/shop", label: "Shop", end: false },
//   { to: "/contact", label: "Contact", end: true },
// ];

// // ============================================================
// // ADMIN NAVIGATION
// // ============================================================

// const adminLinks = [
//   { to: "/admin", label: "Dashboard", end: true },
//   { to: "/admin/products", label: "Products", end: false },
//   { to: "/admin/orders", label: "Orders", end: false },
//   { to: "/admin/users", label: "Users", end: false },
// ];

// // ============================================================
// // NAVBAR
// // ============================================================

// const Navbar = () => {
//   const { user, logout } = useContext(AuthContext);

//   const cartItems = useSelector((state) => state.cart.cartItems);

//   const navigate = useNavigate();
//   const location = useLocation();

//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);

//   const profileRef = useRef(null);

//   // ==========================================================
//   // CART COUNT
//   // ==========================================================
//   // Counts total quantity rather than number of products.
//   //
//   // Example:
//   // Bag x1
//   // Flower x3
//   //
//   // cart count = 4
//   // ==========================================================

//   const cartCount = useMemo(() => {
//     return cartItems.reduce((total, item) => total + Number(item.qty || 0), 0);
//   }, [cartItems]);

//   // ==========================================================
//   // CLOSE MENUS
//   // ==========================================================

//   const closeMenus = useCallback(() => {
//     setIsMenuOpen(false);
//     setIsProfileOpen(false);
//   }, []);

//   // ==========================================================
//   // LOGOUT
//   // ==========================================================

//   const handleLogout = useCallback(() => {
//     const confirmed = window.confirm("Are you sure you want to logout?");

//     if (!confirmed) return;

//     logout();

//     closeMenus();

//     navigate("/login");
//   }, [logout, navigate, closeMenus]);

//   // ==========================================================
//   // MOBILE MENU
//   // ==========================================================

//   const toggleMenu = useCallback(() => {
//     setIsMenuOpen((prev) => !prev);
//     setIsProfileOpen(false);
//   }, []);

//   // ==========================================================
//   // PROFILE MENU
//   // ==========================================================

//   const toggleProfile = useCallback(() => {
//     setIsProfileOpen((prev) => !prev);
//     setIsMenuOpen(false);
//   }, []);

//   // ==========================================================
//   // CLOSE MENU WHEN ROUTE CHANGES
//   // ==========================================================

//   useEffect(() => {
//     setIsMenuOpen(false);
//     setIsProfileOpen(false);
//   }, [location.pathname]);

//   // ==========================================================
//   // ESCAPE KEY
//   // ==========================================================

//   useEffect(() => {
//     const handleEscape = (event) => {
//       if (event.key === "Escape") {
//         setIsMenuOpen(false);
//         setIsProfileOpen(false);
//       }
//     };

//     document.addEventListener("keydown", handleEscape);

//     return () => {
//       document.removeEventListener("keydown", handleEscape);
//     };
//   }, []);

//   // ==========================================================
//   // CLOSE PROFILE WHEN CLICKING OUTSIDE
//   // ==========================================================

//   useEffect(() => {
//     const handleOutsideClick = (event) => {
//       if (profileRef.current && !profileRef.current.contains(event.target)) {
//         setIsProfileOpen(false);
//       }
//     };

//     if (isProfileOpen) {
//       document.addEventListener("mousedown", handleOutsideClick);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleOutsideClick);
//     };
//   }, [isProfileOpen]);

//   // ==========================================================
//   // PREVENT BODY SCROLL WHEN MOBILE MENU IS OPEN
//   // ==========================================================

//   useEffect(() => {
//     if (isMenuOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "";
//     }

//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [isMenuOpen]);

//   // ==========================================================
//   // NAV LINK RENDERER
//   // ==========================================================

//   const renderNavLinks = (links) => {
//     return links.map(({ to, label, end }) => (
//       <li key={to}>
//         <NavLink
//           to={to}
//           end={end}
//           onClick={closeMenus}
//           className={({ isActive }) =>
//             `navbar-link ${isActive ? "active" : ""}`
//           }
//         >
//           {label}
//         </NavLink>
//       </li>
//     ));
//   };

//   // ==========================================================
//   // ADMIN NAVBAR
//   // ==========================================================

//   if (user?.role === "admin") {
//     return (
//       <nav
//         className="navbar navbar-admin"
//         role="navigation"
//         aria-label="Admin navigation"
//       >
//         <div className="navbar-container">
//           {/* Brand */}
//           <div className="navbar-brand">
//             <Link to="/" onClick={closeMenus}>
//               <img
//                 src="/handyartstorelogo1.png"
//                 alt="HandyArtStore logo"
//                 className="brand-logo"
//               />

//               <span className="brand-name">HandyArtStore</span>
//             </Link>
//           </div>

//           {/* Desktop / Mobile Toggle */}
//           <button
//             type="button"
//             className={`hamburger ${isMenuOpen ? "active" : ""}`}
//             onClick={toggleMenu}
//             aria-label={
//               isMenuOpen ? "Close navigation menu" : "Open navigation menu"
//             }
//             aria-expanded={isMenuOpen}
//             aria-controls="navbar-links"
//           >
//             <span className="hamburger-line"></span>
//             <span className="hamburger-line"></span>
//             <span className="hamburger-line"></span>
//           </button>

//           {/* Navigation */}
//           <ul
//             id="navbar-links"
//             className={`navbar-links ${isMenuOpen ? "open" : ""}`}
//           >
//             {renderNavLinks(adminLinks)}

//             {/* Visit Store */}
//             <li>
//               <Link
//                 to="/shop"
//                 className="navbar-link navbar-store-link"
//                 onClick={closeMenus}
//               >
//                 Visit Store
//               </Link>
//             </li>

//             {/* Admin Profile */}
//             <li className="profile-dropdown-wrapper" ref={profileRef}>
//               <button
//                 type="button"
//                 className="profile-trigger"
//                 onClick={toggleProfile}
//                 aria-haspopup="true"
//                 aria-expanded={isProfileOpen}
//               >
//                 <span className="profile-avatar">
//                   {user?.name?.charAt(0)?.toUpperCase() || "A"}
//                 </span>

//                 <span className="profile-name">
//                   {user?.name?.split(" ")[0] || "Admin"}
//                 </span>

//                 <span className="profile-arrow">▾</span>
//               </button>

//               <ul
//                 className={`profile-dropdown ${isProfileOpen ? "open" : ""}`}
//                 role="menu"
//               >
//                 <li role="menuitem">
//                   <Link to="/" onClick={closeMenus}>
//                     Visit Store
//                   </Link>
//                 </li>

//                 <li role="menuitem">
//                   <button
//                     type="button"
//                     onClick={handleLogout}
//                     className="btn-logout"
//                   >
//                     Logout
//                   </button>
//                 </li>
//               </ul>
//             </li>
//           </ul>
//         </div>

//         {/* Mobile Overlay */}
//         {isMenuOpen && (
//           <button
//             type="button"
//             className="navbar-overlay"
//             aria-label="Close navigation menu"
//             onClick={closeMenus}
//           />
//         )}
//       </nav>
//     );
//   }

//   // ==========================================================
//   // CUSTOMER / GUEST NAVBAR
//   // ==========================================================

//   return (
//     <nav
//       className="navbar navbar-customer"
//       role="navigation"
//       aria-label="Main navigation"
//     >
//       <div className="navbar-container">
//         {/* ==================================================
//             BRAND
//         ================================================== */}

//         <div className="navbar-brand">
//           <Link to="/" onClick={closeMenus}>
//             <img
//               src="/handyartstorelogo1.png"
//               alt="HandyArtStore logo"
//               className="brand-logo"
//             />

//             <span className="brand-name">HandyArtStore</span>
//           </Link>
//         </div>

//         {/* ==================================================
//             DESKTOP NAVIGATION
//         ================================================== */}

//         <ul
//           id="navbar-links"
//           className={`navbar-links ${isMenuOpen ? "open" : ""}`}
//         >
//           {renderNavLinks(customerLinks)}

//           {/* Cart */}
//           <li>
//             <NavLink
//               to="/cart"
//               onClick={closeMenus}
//               className={({ isActive }) =>
//                 `navbar-icon-link ${isActive ? "active" : ""}`
//               }
//               aria-label={`Shopping cart with ${cartCount} items`}
//             >
//               <span className="navbar-icon">🛒</span>

//               <span className="cart-label">Cart</span>

//               {cartCount > 0 && (
//                 <span
//                   className="cart-count"
//                   aria-label={`${cartCount} items in cart`}
//                 >
//                   {cartCount}
//                 </span>
//               )}
//             </NavLink>
//           </li>

//           {/* =================================================
//               USER PROFILE
//           ================================================= */}

//           {user ? (
//             <li className="profile-dropdown-wrapper" ref={profileRef}>
//               <button
//                 type="button"
//                 className="profile-trigger"
//                 onClick={toggleProfile}
//                 aria-haspopup="true"
//                 aria-expanded={isProfileOpen}
//               >
//                 <span className="profile-avatar">
//                   {user?.name?.charAt(0)?.toUpperCase() || "U"}
//                 </span>

//                 <span className="profile-name">
//                   Hi, {user?.name?.split(" ")[0] || "User"}
//                 </span>

//                 <span className="profile-arrow">▾</span>
//               </button>

//               <ul
//                 className={`profile-dropdown ${isProfileOpen ? "open" : ""}`}
//                 role="menu"
//               >
//                 <li role="menuitem">
//                   <Link to="/profile" onClick={closeMenus}>
//                     My Profile
//                   </Link>
//                 </li>

//                 <li role="menuitem">
//                   <Link to="/orders" onClick={closeMenus}>
//                     My Orders
//                   </Link>
//                 </li>

//                 <li role="menuitem" className="dropdown-divider"></li>

//                 <li role="menuitem">
//                   <button
//                     type="button"
//                     onClick={handleLogout}
//                     className="btn-logout"
//                   >
//                     Logout
//                   </button>
//                 </li>
//               </ul>
//             </li>
//           ) : (
//             <>
//               {/* Login */}
//               <li>
//                 <NavLink
//                   to="/login"
//                   onClick={closeMenus}
//                   className="navbar-login"
//                 >
//                   Login
//                 </NavLink>
//               </li>

//               {/* Register */}
//               <li>
//                 <NavLink
//                   to="/register"
//                   onClick={closeMenus}
//                   className="navbar-register"
//                 >
//                   Create Account
//                 </NavLink>
//               </li>
//             </>
//           )}
//         </ul>

//         {/* ==================================================
//             MOBILE MENU BUTTON
//         ================================================== */}

//         <button
//           type="button"
//           className={`hamburger ${isMenuOpen ? "active" : ""}`}
//           onClick={toggleMenu}
//           aria-label={
//             isMenuOpen ? "Close navigation menu" : "Open navigation menu"
//           }
//           aria-expanded={isMenuOpen}
//           aria-controls="navbar-links"
//         >
//           <span className="hamburger-line"></span>
//           <span className="hamburger-line"></span>
//           <span className="hamburger-line"></span>
//         </button>
//       </div>

//       {/* ====================================================
//           MOBILE OVERLAY
//       ==================================================== */}

//       {isMenuOpen && (
//         <button
//           type="button"
//           className="navbar-overlay"
//           aria-label="Close navigation menu"
//           onClick={closeMenus}
//         />
//       )}
//     </nav>
//   );
// };

// export default Navbar;

// import React, {
//   useCallback,
//   useContext,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from "react";

// import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

// import { useSelector } from "react-redux";

// import { AuthContext } from "../context/AuthContext";

// import "../styles/navbar.css";

// /*
// |--------------------------------------------------------------------------
// | CUSTOMER NAVIGATION
// |--------------------------------------------------------------------------
// */

// const customerLinks = [
//   {
//     to: "/",
//     label: "Home",
//     end: true,
//   },
//   {
//     to: "/shop",
//     label: "Shop",
//     end: false,
//   },
//   {
//     to: "/about",
//     label: "About",
//     end: true,
//   },
//   {
//     to: "/contact",
//     label: "Contact",
//     end: true,
//   },
// ];

// /*
// |--------------------------------------------------------------------------
// | ADMIN NAVIGATION
// |--------------------------------------------------------------------------
// */

// const adminLinks = [
//   {
//     to: "/admin",
//     label: "Dashboard",
//     end: true,
//   },
//   {
//     to: "/admin/products",
//     label: "Products",
//     end: false,
//   },
//   {
//     to: "/admin/orders",
//     label: "Orders",
//     end: false,
//   },
//   {
//     to: "/admin/users",
//     label: "Users",
//     end: false,
//   },
// ];

// /*
// |--------------------------------------------------------------------------
// | NAVBAR
// |--------------------------------------------------------------------------
// */

// const Navbar = () => {
//   const { user, loading, logout } = useContext(AuthContext);

//   const cartItems = useSelector((state) => state.cart?.cartItems || []);

//   const navigate = useNavigate();
//   const location = useLocation();

//   /*
//   |--------------------------------------------------------------------------
//   | UI STATE
//   |--------------------------------------------------------------------------
//   */

//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);

//   const profileRef = useRef(null);

//   /*
//   |--------------------------------------------------------------------------
//   | USER ROLE
//   |--------------------------------------------------------------------------
//   */

//   const isAdmin = user?.role === "admin";
//   const isCustomer = Boolean(user && !isAdmin);
//   const isGuest = !user;

//   /*
//   |--------------------------------------------------------------------------
//   | CART COUNT
//   |--------------------------------------------------------------------------
//   |
//   | Cart is a CUSTOMER feature.
//   |
//   | Admin:
//   |    ❌ No cart
//   |
//   | Customer:
//   |    ✅ Cart
//   |
//   | Guest:
//   |    ✅ Cart
//   |
//   */

//   const cartCount = useMemo(() => {
//     if (isAdmin) {
//       return 0;
//     }

//     return cartItems.reduce((total, item) => {
//       return total + Number(item?.qty || 0);
//     }, 0);
//   }, [cartItems, isAdmin]);

//   /*
//   |--------------------------------------------------------------------------
//   | DISPLAY NAME
//   |--------------------------------------------------------------------------
//   */

//   const firstName = useMemo(() => {
//     if (!user?.name) {
//       return isAdmin ? "Admin" : "Account";
//     }

//     return user.name.trim().split(" ")[0] || "Account";
//   }, [user, isAdmin]);

//   /*
//   |--------------------------------------------------------------------------
//   | AVATAR LETTER
//   |--------------------------------------------------------------------------
//   */

//   const avatarLetter = useMemo(() => {
//     if (!user?.name) {
//       return isAdmin ? "A" : "U";
//     }

//     return user.name.trim().charAt(0).toUpperCase();
//   }, [user, isAdmin]);

//   /*
//   |--------------------------------------------------------------------------
//   | CLOSE ALL MENUS
//   |--------------------------------------------------------------------------
//   */

//   const closeMenus = useCallback(() => {
//     setIsMenuOpen(false);
//     setIsProfileOpen(false);
//   }, []);

//   /*
//   |--------------------------------------------------------------------------
//   | TOGGLE MOBILE MENU
//   |--------------------------------------------------------------------------
//   */

//   const toggleMenu = useCallback(() => {
//     setIsMenuOpen((previous) => !previous);

//     // Profile dropdown should never stay open
//     // when mobile menu is opened.
//     setIsProfileOpen(false);
//   }, []);

//   /*
//   |--------------------------------------------------------------------------
//   | TOGGLE PROFILE
//   |--------------------------------------------------------------------------
//   */

//   const toggleProfile = useCallback(() => {
//     setIsProfileOpen((previous) => !previous);

//     // Close mobile menu when profile opens.
//     setIsMenuOpen(false);
//   }, []);

//   /*
//   |--------------------------------------------------------------------------
//   | LOGOUT
//   |--------------------------------------------------------------------------
//   */

//   const handleLogout = useCallback(() => {
//     const confirmed = window.confirm("Are you sure you want to logout?");

//     if (!confirmed) {
//       return;
//     }

//     /*
//     |----------------------------------------------------------------------
//     | AuthContext logout
//     |----------------------------------------------------------------------
//     |
//     | Your updated AuthContext is responsible for:
//     |
//     | 1. Removing userInfo
//     | 2. Setting user to null
//     | 3. Clearing Redux cart
//     |
//     */

//     logout();

//     closeMenus();

//     navigate("/login", {
//       replace: true,
//     });
//   }, [logout, closeMenus, navigate]);

//   /*
//   |--------------------------------------------------------------------------
//   | CLOSE MENUS WHEN ROUTE CHANGES
//   |--------------------------------------------------------------------------
//   */

//   useEffect(() => {
//     setIsMenuOpen(false);
//     setIsProfileOpen(false);
//   }, [location.pathname]);

//   /*
//   |--------------------------------------------------------------------------
//   | ESCAPE KEY
//   |--------------------------------------------------------------------------
//   */

//   useEffect(() => {
//     const handleEscape = (event) => {
//       if (event.key !== "Escape") {
//         return;
//       }

//       setIsMenuOpen(false);
//       setIsProfileOpen(false);
//     };

//     document.addEventListener("keydown", handleEscape);

//     return () => {
//       document.removeEventListener("keydown", handleEscape);
//     };
//   }, []);

//   /*
//   |--------------------------------------------------------------------------
//   | CLICK OUTSIDE PROFILE
//   |--------------------------------------------------------------------------
//   */

//   useEffect(() => {
//     if (!isProfileOpen) {
//       return;
//     }

//     const handleOutsideClick = (event) => {
//       if (profileRef.current && !profileRef.current.contains(event.target)) {
//         setIsProfileOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleOutsideClick);

//     return () => {
//       document.removeEventListener("mousedown", handleOutsideClick);
//     };
//   }, [isProfileOpen]);

//   /*
//   |--------------------------------------------------------------------------
//   | PREVENT BODY SCROLL
//   |--------------------------------------------------------------------------
//   |
//   | When mobile navigation is open, the page behind it
//   | should not scroll.
//   |
//   */

//   useEffect(() => {
//     if (isMenuOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "";
//     }

//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [isMenuOpen]);

//   /*
//   |--------------------------------------------------------------------------
//   | RENDER NAV LINKS
//   |--------------------------------------------------------------------------
//   */

//   const renderNavLinks = useCallback(
//     (links) => {
//       return links.map(({ to, label, end }) => (
//         <li key={to} className="navbar-item">
//           <NavLink
//             to={to}
//             end={end}
//             onClick={closeMenus}
//             className={({ isActive }) =>
//               `navbar-link ${isActive ? "active" : ""}`
//             }
//           >
//             {label}
//           </NavLink>
//         </li>
//       ));
//     },
//     [closeMenus],
//   );

//   /*
//   |--------------------------------------------------------------------------
//   | LOADING STATE
//   |--------------------------------------------------------------------------
//   |
//   | Prevents guest navbar from briefly appearing while
//   | AuthContext checks localStorage.
//   |
//   */

//   if (loading) {
//     return (
//       <header className="navbar navbar-loading">
//         <div className="navbar-container">
//           <div className="navbar-brand">
//             <Link to="/" aria-label="HandyArtStore home">
//               <img
//                 src="/handylogo.png"
//                 alt="HandyArtStore"
//                 className="brand-logo"
//               />

//               <span className="brand-name">HandyArtStore</span>
//             </Link>
//           </div>
//         </div>
//       </header>
//     );
//   }

//   /*
//   |--------------------------------------------------------------------------
//   | ADMIN NAVBAR
//   |--------------------------------------------------------------------------
//   */

//   if (isAdmin) {
//     return (
//       <header className="navbar navbar-admin">
//         <div className="navbar-container">
//           {/* BRAND */}

//           <div className="navbar-brand">
//             <Link
//               to="/admin"
//               onClick={closeMenus}
//               aria-label="HandyArtStore admin dashboard"
//             >
//               <img
//                 src="/handylog.png"
//                 alt="HandyArtStore"
//                 className="brand-logo"
//               />

//               <span className="brand-name">HandyArtStore</span>

//               <span className="brand-badge">ADMIN</span>
//             </Link>
//           </div>

//           {/* DESKTOP / MOBILE NAVIGATION */}

//           <nav
//             className={`navbar-navigation ${isMenuOpen ? "open" : ""}`}
//             id="admin-navigation"
//             aria-label="Admin navigation"
//           >
//             <ul className="navbar-links">
//               {renderNavLinks(adminLinks)}

//               {/* VISIT STORE */}

//               <li className="navbar-item">
//                 <NavLink
//                   to="/shop"
//                   onClick={closeMenus}
//                   className="navbar-link navbar-store-link"
//                 >
//                   <span className="nav-link-icon">↗</span>
//                   Visit Store
//                 </NavLink>
//               </li>

//               {/* ADMIN PROFILE */}

//               <li className="profile-dropdown-wrapper" ref={profileRef}>
//                 <button
//                   type="button"
//                   className="profile-trigger"
//                   onClick={toggleProfile}
//                   aria-haspopup="menu"
//                   aria-expanded={isProfileOpen}
//                 >
//                   <span className="profile-avatar">{avatarLetter}</span>

//                   <span className="profile-name">{firstName}</span>

//                   <span
//                     className={`profile-chevron ${isProfileOpen ? "open" : ""}`}
//                     aria-hidden="true"
//                   >
//                     ▾
//                   </span>
//                 </button>

//                 {isProfileOpen && (
//                   <ul className="profile-dropdown" role="menu">
//                     <li className="profile-dropdown-header" role="none">
//                       <span className="profile-dropdown-avatar">
//                         {avatarLetter}
//                       </span>

//                       <div>
//                         <strong>{user?.name || "Admin"}</strong>

//                         <small>Administrator</small>
//                       </div>
//                     </li>

//                     <li className="dropdown-divider" role="separator" />

//                     <li role="menuitem">
//                       <Link to="/admin" onClick={closeMenus}>
//                         <span>▣</span>
//                         Dashboard
//                       </Link>
//                     </li>

//                     <li role="menuitem">
//                       <Link to="/shop" onClick={closeMenus}>
//                         <span>↗</span>
//                         Visit Store
//                       </Link>
//                     </li>

//                     <li className="dropdown-divider" role="separator" />

//                     <li role="menuitem">
//                       <button
//                         type="button"
//                         className="btn-logout"
//                         onClick={handleLogout}
//                       >
//                         <span>↪</span>
//                         Logout
//                       </button>
//                     </li>
//                   </ul>
//                 )}
//               </li>
//             </ul>
//           </nav>

//           {/* MOBILE BUTTON */}

//           <button
//             type="button"
//             className={`hamburger ${isMenuOpen ? "active" : ""}`}
//             onClick={toggleMenu}
//             aria-label={
//               isMenuOpen ? "Close admin navigation" : "Open admin navigation"
//             }
//             aria-expanded={isMenuOpen}
//             aria-controls="admin-navigation"
//           >
//             <span />
//             <span />
//             <span />
//           </button>
//         </div>

//         {/* MOBILE OVERLAY */}

//         {isMenuOpen && (
//           <button
//             type="button"
//             className="navbar-overlay"
//             aria-label="Close navigation"
//             onClick={closeMenus}
//           />
//         )}
//       </header>
//     );
//   }

//   /*
//   |--------------------------------------------------------------------------
//   | CUSTOMER / GUEST NAVBAR
//   |--------------------------------------------------------------------------
//   */

//   return (
//     <header className="navbar navbar-customer">
//       <div className="navbar-container">
//         {/* BRAND */}

//         <div className="navbar-brand">
//           <Link to="/" onClick={closeMenus} aria-label="HandyArtStore home">
//             <img
//               src="/handyartstorelogo1.png"
//               alt="HandyArtStore"
//               className="brand-logo"
//             />

//             <span className="brand-name">HandyArtStore</span>
//           </Link>
//         </div>

//         {/* CUSTOMER NAVIGATION */}

//         <nav
//           className={`navbar-navigation ${isMenuOpen ? "open" : ""}`}
//           id="customer-navigation"
//           aria-label="Main navigation"
//         >
//           <ul className="navbar-links">
//             {renderNavLinks(customerLinks)}

//             {/* CART */}

//             <li className="navbar-item">
//               <NavLink
//                 to="/cart"
//                 onClick={closeMenus}
//                 className={({ isActive }) =>
//                   `cart-link ${isActive ? "active" : ""}`
//                 }
//                 aria-label={`Shopping cart with ${cartCount} items`}
//               >
//                 <span className="cart-icon" aria-hidden="true">
//                   🛒
//                 </span>

//                 <span>Cart</span>

//                 {cartCount > 0 && (
//                   <span
//                     className="cart-count"
//                     aria-label={`${cartCount} items`}
//                   >
//                     {cartCount > 99 ? "99+" : cartCount}
//                   </span>
//                 )}
//               </NavLink>
//             </li>

//             {/* LOGGED-IN CUSTOMER */}

//             {isCustomer && (
//               <li className="profile-dropdown-wrapper" ref={profileRef}>
//                 <button
//                   type="button"
//                   className="profile-trigger"
//                   onClick={toggleProfile}
//                   aria-haspopup="menu"
//                   aria-expanded={isProfileOpen}
//                 >
//                   <span className="profile-avatar">{avatarLetter}</span>

//                   <span className="profile-name">Hi, {firstName}</span>

//                   <span
//                     className={`profile-chevron ${isProfileOpen ? "open" : ""}`}
//                     aria-hidden="true"
//                   >
//                     ▾
//                   </span>
//                 </button>

//                 {isProfileOpen && (
//                   <ul className="profile-dropdown" role="menu">
//                     <li className="profile-dropdown-header" role="none">
//                       <span className="profile-dropdown-avatar">
//                         {avatarLetter}
//                       </span>

//                       <div>
//                         <strong>{user?.name || "Customer"}</strong>

//                         <small>{user?.email || "My account"}</small>
//                       </div>
//                     </li>

//                     <li className="dropdown-divider" role="separator" />

//                     <li role="menuitem">
//                       <Link to="/profile" onClick={closeMenus}>
//                         <span>◉</span>
//                         My Profile
//                       </Link>
//                     </li>

//                     <li role="menuitem">
//                       <Link to="/orders" onClick={closeMenus}>
//                         <span>▣</span>
//                         My Orders
//                       </Link>
//                     </li>

//                     <li className="dropdown-divider" role="separator" />

//                     <li role="menuitem">
//                       <button
//                         type="button"
//                         className="btn-logout"
//                         onClick={handleLogout}
//                       >
//                         <span>↪</span>
//                         Logout
//                       </button>
//                     </li>
//                   </ul>
//                 )}
//               </li>
//             )}

//             {/* GUEST */}

//             {isGuest && (
//               <>
//                 <li className="navbar-item">
//                   <NavLink
//                     to="/login"
//                     onClick={closeMenus}
//                     className={({ isActive }) =>
//                       `navbar-login ${isActive ? "active" : ""}`
//                     }
//                   >
//                     Login
//                   </NavLink>
//                 </li>

//                 <li className="navbar-item">
//                   <NavLink
//                     to="/register"
//                     onClick={closeMenus}
//                     className="navbar-register"
//                   >
//                     Create Account
//                   </NavLink>
//                 </li>
//               </>
//             )}
//           </ul>
//         </nav>

//         {/* MOBILE MENU BUTTON */}

//         <button
//           type="button"
//           className={`hamburger ${isMenuOpen ? "active" : ""}`}
//           onClick={toggleMenu}
//           aria-label={
//             isMenuOpen ? "Close navigation menu" : "Open navigation menu"
//           }
//           aria-expanded={isMenuOpen}
//           aria-controls="customer-navigation"
//         >
//           <span />
//           <span />
//           <span />
//         </button>
//       </div>

//       {/* MOBILE OVERLAY */}

//       {isMenuOpen && (
//         <button
//           type="button"
//           className="navbar-overlay"
//           aria-label="Close navigation"
//           onClick={closeMenus}
//         />
//       )}
//     </header>
//   );
// };

// export default Navbar;

import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

import { AuthContext } from "../context/AuthContext";

import "../styles/navbar.css";

/* ==========================================================================
   NAVIGATION LINKS
   ========================================================================== */

const customerLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/shop", label: "Shop", end: false },
  { to: "/about", label: "About", end: true },
  { to: "/contact", label: "Contact", end: true },
];

const adminLinks = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/products", label: "Products", end: false },
  { to: "/admin/orders", label: "Orders", end: false },
  { to: "/admin/users", label: "Users", end: false },
];

/* ==========================================================================
   PROFILE DROPDOWN (shared by admin + customer)
   ========================================================================== */

const ProfileMenu = ({
  innerRef,
  avatarLetter,
  displayName,
  subtitle,
  isOpen,
  onToggle,
  onClose,
  onLogout,
  items,
}) => (
  <li className="profile-dropdown-wrapper" ref={innerRef}>
    <button
      type="button"
      className="profile-trigger"
      onClick={onToggle}
      aria-haspopup="true"
      aria-expanded={isOpen}
    >
      <span className="profile-avatar">{avatarLetter}</span>

      <span className="profile-name">{displayName}</span>

      <span
        className={`profile-chevron ${isOpen ? "open" : ""}`}
        aria-hidden="true"
      >
        ▾
      </span>
    </button>

    {isOpen && (
      <ul className="profile-dropdown">
        <li className="profile-dropdown-header">
          <span className="profile-dropdown-avatar">{avatarLetter}</span>

          <div className="profile-dropdown-meta">
            <strong>{displayName}</strong>
            <small>{subtitle}</small>
          </div>
        </li>

        <li className="dropdown-divider" aria-hidden="true" />

        {items.map(({ to, label, icon }) => (
          <li key={to}>
            <Link to={to} className="profile-dropdown-link" onClick={onClose}>
              <span className="profile-dropdown-icon" aria-hidden="true">
                {icon}
              </span>

              {label}
            </Link>
          </li>
        ))}

        <li className="dropdown-divider" aria-hidden="true" />

        <li>
          <button type="button" className="btn-logout" onClick={onLogout}>
            <span className="profile-dropdown-icon" aria-hidden="true">
              ↪
            </span>
            Logout
          </button>
        </li>
      </ul>
    )}
  </li>
);

/* ==========================================================================
   NAVBAR
   ========================================================================== */

const Navbar = () => {
  const { user, loading, logout } = useContext(AuthContext);

  const cartItems = useSelector((state) => state.cart?.cartItems || []);

  const navigate = useNavigate();
  const location = useLocation();

  /* ---------------------------------------------------------------- state */

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const profileRef = useRef(null);

  /* ----------------------------------------------------------------- role */

  const isAdmin = user?.role === "admin";
  const isCustomer = Boolean(user) && !isAdmin;
  const isGuest = !user;

  /* ------------------------------------------------------------ cart count */

  const cartCount = useMemo(() => {
    if (isAdmin) {
      return 0;
    }

    return cartItems.reduce((total, item) => total + Number(item?.qty || 0), 0);
  }, [cartItems, isAdmin]);

  /* ----------------------------------------------------------- display name */

  const firstName = useMemo(() => {
    if (!user?.name) {
      return isAdmin ? "Admin" : "Account";
    }

    return user.name.trim().split(" ")[0] || "Account";
  }, [user, isAdmin]);

  /* ---------------------------------------------------------- avatar letter */

  const avatarLetter = useMemo(() => {
    if (!user?.name) {
      return isAdmin ? "A" : "U";
    }

    return user.name.trim().charAt(0).toUpperCase();
  }, [user, isAdmin]);

  /* -------------------------------------------------------- close all menus */

  const closeMenus = useCallback(() => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  }, []);

  /* ------------------------------------------------------- toggle mobile nav */

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((previous) => !previous);
    setIsProfileOpen(false);
  }, []);

  /* ----------------------------------------------------------- toggle profile
     NOTE: this must NOT close the mobile drawer, otherwise on mobile the
     dropdown is destroyed the moment it is opened.
  ------------------------------------------------------------------------- */

  const toggleProfile = useCallback(() => {
    setIsProfileOpen((previous) => !previous);
  }, []);

  /* ----------------------------------------------------------------- logout */

  const handleLogout = useCallback(() => {
    const confirmed = window.confirm("Are you sure you want to logout?");

    if (!confirmed) {
      return;
    }

    logout();
    closeMenus();

    navigate("/login", { replace: true });
  }, [logout, closeMenus, navigate]);

  /* ------------------------------------------- close menus on route change */

  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);

  /* ----------------------------------------------------------- escape key */

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key !== "Escape") {
        return;
      }

      setIsMenuOpen(false);
      setIsProfileOpen(false);
    };

    document.addEventListener("keydown", handleEscape);

    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  /* --------------------------------------------------- click outside profile */

  useEffect(() => {
    if (!isProfileOpen) {
      return;
    }

    const handlePointerDown = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isProfileOpen]);

  /* ---------------------------------------- close drawer on resize → desktop */

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ------------------------------------------------- prevent body scrolling */

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  /* --------------------------------------------------------- render helpers */

  const renderNavLinks = useCallback(
    (links) =>
      links.map(({ to, label, end }) => (
        <li key={to} className="navbar-item">
          <NavLink
            to={to}
            end={end}
            onClick={closeMenus}
            className={({ isActive }) =>
              `navbar-link ${isActive ? "active" : ""}`
            }
          >
            {label}
          </NavLink>
        </li>
      )),
    [closeMenus],
  );

  /* ---------------------------------------------------------- loading state */

  if (loading) {
    return (
      <header className="navbar navbar-loading">
        <div className="navbar-container">
          {/* <div className="navbar-brand">
            <Link to="/" aria-label="HandyArtStore home">
              <img
                src="/handylogo.png"
                alt="HandyArtStore"
                className="brand-logo"
              />

              <span className="brand-name">HandyArtStore</span>
            </Link>
          </div> */}
          <div className="navbar-brand">
            <Link to="/" aria-label="HandyArtStore home">
              <span className="brand-logo-wrapper">
                <img
                  src="/handyartstorelogo1.png"
                  alt=""
                  className="brand-logo"
                  aria-hidden="true"
                />
              </span>

              <span className="brand-name">HandyArtStore</span>
            </Link>
          </div>
        </div>
      </header>
    );
  }

  /* ======================================================================
     ADMIN NAVBAR
     ====================================================================== */

  if (isAdmin) {
    return (
      <header className="navbar navbar-admin">
        <div className="navbar-container">
          {/* <div className="navbar-brand">
            <Link
              to="/admin"
              onClick={closeMenus}
              aria-label="HandyArtStore admin dashboard"
            >
              <img
                src="/handylogo.png"
                alt="HandyArtStore"
                className="brand-logo"
              />

              <span className="brand-name">HandyArtStore</span>

              <span className="brand-badge">ADMIN</span>
            </Link>
          </div> */}
          <div className="navbar-brand">
            <Link
              to="/admin"
              onClick={closeMenus}
              aria-label="HandyArtStore admin dashboard"
            >
              <span className="brand-logo-wrapper">
                <img
                  src="/handyartstorelogo1.png"
                  alt=""
                  className="brand-logo"
                  aria-hidden="true"
                />
              </span>

              <span className="brand-name">HandyArtStore</span>

              <span className="brand-badge">ADMIN</span>
            </Link>
          </div>
          <nav
            className={`navbar-navigation ${isMenuOpen ? "open" : ""}`}
            id="admin-navigation"
            aria-label="Admin navigation"
          >
            <ul className="navbar-links">
              {renderNavLinks(adminLinks)}

              <li className="navbar-item">
                <NavLink
                  to="/shop"
                  onClick={closeMenus}
                  className="navbar-link navbar-store-link"
                >
                  <span className="nav-link-icon" aria-hidden="true">
                    ↗
                  </span>
                  Visit Store
                </NavLink>
              </li>

              <ProfileMenu
                innerRef={profileRef}
                avatarLetter={avatarLetter}
                displayName={firstName}
                subtitle={user?.email || "Administrator"}
                isOpen={isProfileOpen}
                onToggle={toggleProfile}
                onClose={closeMenus}
                onLogout={handleLogout}
                items={[
                  { to: "/admin", label: "Dashboard", icon: "▣" },
                  { to: "/shop", label: "Visit Store", icon: "↗" },
                ]}
              />
            </ul>
          </nav>

          <button
            type="button"
            className={`hamburger ${isMenuOpen ? "active" : ""}`}
            onClick={toggleMenu}
            aria-label={
              isMenuOpen ? "Close admin navigation" : "Open admin navigation"
            }
            aria-expanded={isMenuOpen}
            aria-controls="admin-navigation"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {isMenuOpen && (
          <button
            type="button"
            className="navbar-overlay"
            aria-label="Close navigation"
            onClick={closeMenus}
          />
        )}
      </header>
    );
  }

  /* ======================================================================
     CUSTOMER / GUEST NAVBAR
     ====================================================================== */

  return (
    <header className="navbar navbar-customer">
      <div className="navbar-container">
        {/* <div className="navbar-brand">
          <Link to="/" onClick={closeMenus} aria-label="HandyArtStore home">
            <img
              src="/handyartstorelogo1.png"
              alt="HandyArtStore"
              className="brand-logo"
            />

            <span className="brand-name">HandyArtStore</span>
          </Link>
        </div> */}
        <div className="navbar-brand">
          <Link to="/" onClick={closeMenus} aria-label="HandyArtStore home">
            <span className="brand-logo-wrapper">
              <img
                src="/handyartstorelogo1.png"
                // src="/handylogo.png"
                alt=""
                className="brand-logo"
                aria-hidden="true"
              />
            </span>

            <span className="brand-name">HandyArtStore</span>
          </Link>
        </div>
        <nav
          className={`navbar-navigation ${isMenuOpen ? "open" : ""}`}
          id="customer-navigation"
          aria-label="Main navigation"
        >
          <ul className="navbar-links">
            {renderNavLinks(customerLinks)}

            {/* CART */}

            <li className="navbar-item">
              <NavLink
                to="/cart"
                onClick={closeMenus}
                className={({ isActive }) =>
                  `cart-link ${isActive ? "active" : ""}`
                }
                aria-label={`Shopping cart with ${cartCount} items`}
              >
                <span className="cart-icon" aria-hidden="true">
                  🛒
                </span>

                <span>Cart</span>

                {cartCount > 0 && (
                  <span className="cart-count" aria-hidden="true">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </NavLink>
            </li>

            {/* LOGGED-IN CUSTOMER */}

            {isCustomer && (
              <ProfileMenu
                innerRef={profileRef}
                avatarLetter={avatarLetter}
                displayName={`Hi, ${firstName}`}
                subtitle={user?.email || "My account"}
                isOpen={isProfileOpen}
                onToggle={toggleProfile}
                onClose={closeMenus}
                onLogout={handleLogout}
                items={[
                  { to: "/profile", label: "My Profile", icon: "◉" },
                  { to: "/orders", label: "My Orders", icon: "▣" },
                ]}
              />
            )}

            {/* GUEST */}

            {isGuest && (
              <>
                <li className="navbar-item">
                  <NavLink
                    to="/login"
                    onClick={closeMenus}
                    className={({ isActive }) =>
                      `navbar-login ${isActive ? "active" : ""}`
                    }
                  >
                    Login
                  </NavLink>
                </li>

                <li className="navbar-item">
                  <NavLink
                    to="/register"
                    onClick={closeMenus}
                    className="navbar-register"
                  >
                    Create Account
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>

        <button
          type="button"
          className={`hamburger ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label={
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isMenuOpen}
          aria-controls="customer-navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {isMenuOpen && (
        <button
          type="button"
          className="navbar-overlay"
          aria-label="Close navigation"
          onClick={closeMenus}
        />
      )}
    </header>
  );
};

export default Navbar;
