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

// /* ==========================================================================
//    NAVIGATION LINKS
//    ========================================================================== */

// const customerLinks = [
//   { to: "/", label: "Home", end: true },
//   { to: "/shop", label: "Shop", end: false },
//   { to: "/about", label: "About", end: true },
//   { to: "/contact", label: "Contact", end: true },
// ];

// const adminLinks = [
//   { to: "/admin", label: "Dashboard", end: true },
//   { to: "/admin/products", label: "Products", end: false },
//   { to: "/admin/orders", label: "Orders", end: false },
//   { to: "/admin/users", label: "Users", end: false },
// ];

// /* ==========================================================================
//    PROFILE DROPDOWN (shared by admin + customer)
//    ========================================================================== */

// const ProfileMenu = ({
//   innerRef,
//   avatarLetter,
//   displayName,
//   subtitle,
//   isOpen,
//   onToggle,
//   onClose,
//   onLogout,
//   items,
// }) => (
//   <li className="profile-dropdown-wrapper" ref={innerRef}>
//     <button
//       type="button"
//       className="profile-trigger"
//       onClick={onToggle}
//       aria-haspopup="true"
//       aria-expanded={isOpen}
//     >
//       <span className="profile-avatar">{avatarLetter}</span>

//       <span className="profile-name">{displayName}</span>

//       <span
//         className={`profile-chevron ${isOpen ? "open" : ""}`}
//         aria-hidden="true"
//       >
//         ▾
//       </span>
//     </button>

//     {isOpen && (
//       <ul className="profile-dropdown">
//         <li className="profile-dropdown-header">
//           <span className="profile-dropdown-avatar">{avatarLetter}</span>

//           <div className="profile-dropdown-meta">
//             <strong>{displayName}</strong>
//             <small>{subtitle}</small>
//           </div>
//         </li>

//         <li className="dropdown-divider" aria-hidden="true" />

//         {items.map(({ to, label, icon }) => (
//           <li key={to}>
//             <Link to={to} className="profile-dropdown-link" onClick={onClose}>
//               <span className="profile-dropdown-icon" aria-hidden="true">
//                 {icon}
//               </span>

//               {label}
//             </Link>
//           </li>
//         ))}

//         <li className="dropdown-divider" aria-hidden="true" />

//         <li>
//           <button type="button" className="btn-logout" onClick={onLogout}>
//             <span className="profile-dropdown-icon" aria-hidden="true">
//               ↪
//             </span>
//             Logout
//           </button>
//         </li>
//       </ul>
//     )}
//   </li>
// );

// /* ==========================================================================
//    NAVBAR
//    ========================================================================== */

// const Navbar = () => {
//   const { user, loading, logout } = useContext(AuthContext);

//   const cartItems = useSelector((state) => state.cart?.cartItems || []);

//   const navigate = useNavigate();
//   const location = useLocation();

//   /* ---------------------------------------------------------------- state */

//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);

//   const profileRef = useRef(null);

//   /* ----------------------------------------------------------------- role */

//   const isAdmin = user?.role === "admin";
//   const isCustomer = Boolean(user) && !isAdmin;
//   const isGuest = !user;

//   /* ------------------------------------------------------------ cart count */

//   const cartCount = useMemo(() => {
//     if (isAdmin) {
//       return 0;
//     }

//     return cartItems.reduce((total, item) => total + Number(item?.qty || 0), 0);
//   }, [cartItems, isAdmin]);

//   /* ----------------------------------------------------------- display name */

//   const firstName = useMemo(() => {
//     if (!user?.name) {
//       return isAdmin ? "Admin" : "Account";
//     }

//     return user.name.trim().split(" ")[0] || "Account";
//   }, [user, isAdmin]);

//   /* ---------------------------------------------------------- avatar letter */

//   const avatarLetter = useMemo(() => {
//     if (!user?.name) {
//       return isAdmin ? "A" : "U";
//     }

//     return user.name.trim().charAt(0).toUpperCase();
//   }, [user, isAdmin]);

//   /* -------------------------------------------------------- close all menus */

//   const closeMenus = useCallback(() => {
//     setIsMenuOpen(false);
//     setIsProfileOpen(false);
//   }, []);

//   /* ------------------------------------------------------- toggle mobile nav */

//   const toggleMenu = useCallback(() => {
//     setIsMenuOpen((previous) => !previous);
//     setIsProfileOpen(false);
//   }, []);

//   /* ----------------------------------------------------------- toggle profile
//      NOTE: this must NOT close the mobile drawer, otherwise on mobile the
//      dropdown is destroyed the moment it is opened.
//   ------------------------------------------------------------------------- */

//   const toggleProfile = useCallback(() => {
//     setIsProfileOpen((previous) => !previous);
//   }, []);

//   /* ----------------------------------------------------------------- logout */

//   const handleLogout = useCallback(() => {
//     const confirmed = window.confirm("Are you sure you want to logout?");

//     if (!confirmed) {
//       return;
//     }

//     logout();
//     closeMenus();

//     navigate("/login", { replace: true });
//   }, [logout, closeMenus, navigate]);

//   /* ------------------------------------------- close menus on route change */

//   useEffect(() => {
//     setIsMenuOpen(false);
//     setIsProfileOpen(false);
//   }, [location.pathname]);

//   /* ----------------------------------------------------------- escape key */

//   useEffect(() => {
//     const handleEscape = (event) => {
//       if (event.key !== "Escape") {
//         return;
//       }

//       setIsMenuOpen(false);
//       setIsProfileOpen(false);
//     };

//     document.addEventListener("keydown", handleEscape);

//     return () => document.removeEventListener("keydown", handleEscape);
//   }, []);

//   /* --------------------------------------------------- click outside profile */

//   useEffect(() => {
//     if (!isProfileOpen) {
//       return;
//     }

//     const handlePointerDown = (event) => {
//       if (profileRef.current && !profileRef.current.contains(event.target)) {
//         setIsProfileOpen(false);
//       }
//     };

//     document.addEventListener("pointerdown", handlePointerDown);

//     return () => {
//       document.removeEventListener("pointerdown", handlePointerDown);
//     };
//   }, [isProfileOpen]);

//   /* ---------------------------------------- close drawer on resize → desktop */

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth > 992) {
//         setIsMenuOpen(false);
//       }
//     };

//     window.addEventListener("resize", handleResize);

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   /* ------------------------------------------------- prevent body scrolling */

//   useEffect(() => {
//     document.body.style.overflow = isMenuOpen ? "hidden" : "";

//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [isMenuOpen]);

//   /* --------------------------------------------------------- render helpers */

//   const renderNavLinks = useCallback(
//     (links) =>
//       links.map(({ to, label, end }) => (
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
//       )),
//     [closeMenus],
//   );

//   /* ---------------------------------------------------------- loading state */

//   if (loading) {
//     return (
//       <header className="navbar navbar-loading">
//         <div className="navbar-container">
//           {/* <div className="navbar-brand">
//             <Link to="/" aria-label="HandyArtStore home">
//               <img
//                 src="/handylogo.png"
//                 alt="HandyArtStore"
//                 className="brand-logo"
//               />

//               <span className="brand-name">HandyArtStore</span>
//             </Link>
//           </div> */}
//           <div className="navbar-brand">
//             <Link to="/" aria-label="HandyArtStore home">
//               <span className="brand-logo-wrapper">
//                 <img
//                   src="/logobg-cropped.png"
//                   alt="HandyArtStore"
//                   className="brand-logo"
//                 />
//               </span>

//               <span className="brand-name">HandyArtStore</span>
//             </Link>
//           </div>
//         </div>
//       </header>
//     );
//   }

//   /* ======================================================================
//      ADMIN NAVBAR
//      ====================================================================== */

//   if (isAdmin) {
//     return (
//       <header className="navbar navbar-admin">
//         <div className="navbar-container">
//           {/* <div className="navbar-brand">
//             <Link
//               to="/admin"
//               onClick={closeMenus}
//               aria-label="HandyArtStore admin dashboard"
//             >
//               <img
//                 src="/handylogo.png"
//                 alt="HandyArtStore"
//                 className="brand-logo"
//               />

//               <span className="brand-name">HandyArtStore</span>

//               <span className="brand-badge">ADMIN</span>
//             </Link>
//           </div> */}
//           <div className="navbar-brand">
//             <Link
//               to="/admin"
//               onClick={closeMenus}
//               aria-label="HandyArtStore admin dashboard"
//             >
//               <span className="brand-logo-wrapper">
//                 <img
//                   src="/logobg-cropped.png"
//                   // src="/logobg.png"
//                   alt="HandyArtStore"
//                   className="brand-logo"
//                 />
//               </span>

//               <span className="brand-name">HandyArtStore</span>

//               <span className="brand-badge">ADMIN</span>
//             </Link>
//           </div>
//           <nav
//             className={`navbar-navigation ${isMenuOpen ? "open" : ""}`}
//             id="admin-navigation"
//             aria-label="Admin navigation"
//           >
//             <ul className="navbar-links">
//               {renderNavLinks(adminLinks)}

//               <li className="navbar-item">
//                 <NavLink
//                   to="/shop"
//                   onClick={closeMenus}
//                   className="navbar-link navbar-store-link"
//                 >
//                   <span className="nav-link-icon" aria-hidden="true">
//                     ↗
//                   </span>
//                   Visit Store
//                 </NavLink>
//               </li>

//               <ProfileMenu
//                 innerRef={profileRef}
//                 avatarLetter={avatarLetter}
//                 displayName={firstName}
//                 subtitle={user?.email || "Administrator"}
//                 isOpen={isProfileOpen}
//                 onToggle={toggleProfile}
//                 onClose={closeMenus}
//                 onLogout={handleLogout}
//                 items={[
//                   { to: "/admin", label: "Dashboard", icon: "▣" },
//                   { to: "/shop", label: "Visit Store", icon: "↗" },
//                 ]}
//               />
//             </ul>
//           </nav>

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

//   /* ======================================================================
//      CUSTOMER / GUEST NAVBAR
//      ====================================================================== */

//   return (
//     <header className="navbar navbar-customer">
//       <div className="navbar-container">
//         {/* <div className="navbar-brand">
//           <Link to="/" onClick={closeMenus} aria-label="HandyArtStore home">
//             <img
//               src="/handyartstorelogo1.png"
//               alt="HandyArtStore"
//               className="brand-logo"
//             />

//             <span className="brand-name">HandyArtStore</span>
//           </Link>
//         </div> */}
//         <div className="navbar-brand">
//           <Link to="/" onClick={closeMenus} aria-label="HandyArtStore home">
//             <span className="brand-logo-wrapper">
//               <img
//                 src="/logobg-cropped.png"
//                 // src="/logobg.png"
//                 alt="HandyArtStore"
//                 className="brand-logo"
//               />
//             </span>

//             <span className="brand-name">HandyArtStore</span>
//           </Link>
//         </div>
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
//                   <span className="cart-count" aria-hidden="true">
//                     {cartCount > 99 ? "99+" : cartCount}
//                   </span>
//                 )}
//               </NavLink>
//             </li>

//             {/* LOGGED-IN CUSTOMER */}

//             {isCustomer && (
//               <ProfileMenu
//                 innerRef={profileRef}
//                 avatarLetter={avatarLetter}
//                 displayName={`Hi, ${firstName}`}
//                 subtitle={user?.email || "My account"}
//                 isOpen={isProfileOpen}
//                 onToggle={toggleProfile}
//                 onClose={closeMenus}
//                 onLogout={handleLogout}
//                 items={[
//                   { to: "/profile", label: "My Profile", icon: "◉" },
//                   { to: "/orders", label: "My Orders", icon: "▣" },
//                 ]}
//               />
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
   ICONS  — inline SVGs so every OS renders them identically
   ========================================================================== */

const CartIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const UserIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const PackageIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M16.5 9.4 7.55 4.24" />
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.29 7 12 12 20.71 7" />
    <line x1="12" y1="22" x2="12" y2="12" />
  </svg>
);

const GridIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const ExternalIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const LogoutIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

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
   BRAND (reused in all three return branches)
   ========================================================================== */

const Brand = ({ to, onClick, badge }) => (
  <div className="navbar-brand">
    <Link to={to} onClick={onClick} aria-label="HandyArtStore home">
      <span className="brand-logo-wrapper">
        <img
          src="/logobg.png"
          alt=""
          className="brand-logo"
          width="92"
          height="92"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </span>

      <span className="brand-name">HandyArtStore</span>

      {badge && <span className="brand-badge">{badge}</span>}
    </Link>
  </div>
);

/* ==========================================================================
   PROFILE DROPDOWN
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
      aria-controls="profile-menu"
    >
      <span className="profile-avatar" aria-hidden="true">
        {avatarLetter}
      </span>

      <span className="profile-name">{displayName}</span>

      <span
        className={`profile-chevron ${isOpen ? "open" : ""}`}
        aria-hidden="true"
      >
        ▾
      </span>
    </button>

    {isOpen && (
      <ul className="profile-dropdown" id="profile-menu">
        <li className="profile-dropdown-header">
          <span className="profile-dropdown-avatar" aria-hidden="true">
            {avatarLetter}
          </span>

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
              <LogoutIcon />
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
    if (isAdmin) return 0;

    return cartItems.reduce((total, item) => total + Number(item?.qty || 0), 0);
  }, [cartItems, isAdmin]);

  /* ----------------------------------------------------------- display name */

  const firstName = useMemo(() => {
    if (!user?.name) return isAdmin ? "Admin" : "Account";

    return user.name.trim().split(" ")[0] || "Account";
  }, [user, isAdmin]);

  /* ---------------------------------------------------------- avatar letter */

  const avatarLetter = useMemo(() => {
    if (!user?.name) return isAdmin ? "A" : "U";

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

  /* ----------------------------------------------------------------- logout
     No window.confirm — production apps just log the user out.
     `replace: true` keeps the back button from re-entering a stale session.
  ------------------------------------------------------------------------- */

  const handleLogout = useCallback(() => {
    logout();
    closeMenus();
    navigate("/login", { replace: true });
  }, [logout, closeMenus, navigate]);

  /* ------------------------------------------- close menus on route change */

  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);

  /* ----------------------------------------------------------- escape key
     Order matters:
       1. If a dropdown is open → close it and return focus to its trigger.
       2. Else if the mobile drawer is open → close it.
  ------------------------------------------------------------------------- */

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key !== "Escape") return;

      if (isProfileOpen) {
        setIsProfileOpen(false);

        const trigger = profileRef.current?.querySelector(".profile-trigger");
        trigger?.focus();

        return;
      }

      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => document.removeEventListener("keydown", handleEscape);
  }, [isProfileOpen, isMenuOpen]);

  /* --------------------------------------------------- click outside profile */

  useEffect(() => {
    if (!isProfileOpen) return;

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
          <Brand to="/" onClick={closeMenus} />
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
          <Brand to="/admin" onClick={closeMenus} badge="ADMIN" />

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
                    <ExternalIcon />
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
                  { to: "/admin", label: "Dashboard", icon: <GridIcon /> },
                  { to: "/shop", label: "Visit Store", icon: <ExternalIcon /> },
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
        <Brand to="/" onClick={closeMenus} />

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
                aria-label={`Shopping cart with ${cartCount} ${
                  cartCount === 1 ? "item" : "items"
                }`}
              >
                <span className="cart-icon" aria-hidden="true">
                  <CartIcon />
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
                  { to: "/profile", label: "My Profile", icon: <UserIcon /> },
                  { to: "/orders", label: "My Orders", icon: <PackageIcon /> },
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
