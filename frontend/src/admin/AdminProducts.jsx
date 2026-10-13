// import React, { useCallback, useContext, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import "../styles/admin-products.css";

// const AdminProducts = () => {
//   const { user } = useContext(AuthContext);

//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [deletingId, setDeletingId] = useState(null);

//   /* ------------------------------------------------------------
//    * Fetch Products
//    * ------------------------------------------------------------ */

//   const fetchProducts = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const response = await fetch("/api/products");
//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Failed to fetch products");
//       }

//       if (!Array.isArray(data)) {
//         throw new Error("Invalid products response");
//       }

//       setProducts(data);
//     } catch (err) {
//       console.error("Fetch products error:", err);
//       setError(err.message || "Unable to load products");
//       setProducts([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   /* ------------------------------------------------------------
//    * Calculate Selling Price
//    * ------------------------------------------------------------ */

//   const getSellingPrice = (product) => {
//     const price = Number(product?.price) || 0;
//     const discount = Number(product?.discount) || 0;
//     const safeDiscount = Math.min(Math.max(discount, 0), 100);

//     return price - (price * safeDiscount) / 100;
//   };

//   /* ------------------------------------------------------------
//    * Delete Product (soft delete)
//    * ------------------------------------------------------------ */

//   const handleDelete = async (product) => {
//     const confirmed = window.confirm(
//       `Are you sure you want to remove "${product.name}"?\n\n` +
//         "This product will be marked as inactive.",
//     );

//     if (!confirmed) return;

//     try {
//       setDeletingId(product._id);

//       const response = await fetch(`/api/products/${product._id}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${user?.token}`,
//         },
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Failed to remove product");
//       }

//       setProducts((previousProducts) =>
//         previousProducts.filter(
//           (currentProduct) => currentProduct._id !== product._id,
//         ),
//       );
//     } catch (err) {
//       console.error("Delete product error:", err);
//       alert(err.message || "Something went wrong while removing the product");
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   /* ------------------------------------------------------------
//    * Loading State
//    * ------------------------------------------------------------ */

//   if (loading) {
//     return (
//       <div className="admin-products-page">
//         <div className="admin-products-loading">
//           <span className="admin-products-spinner" aria-hidden="true"></span>
//           <p>Loading products...</p>
//         </div>
//       </div>
//     );
//   }

//   /* ------------------------------------------------------------
//    * Main UI
//    * ------------------------------------------------------------ */

//   return (
//     <div className="admin-products-page">
//       <div className="admin-products-container">
//         {/* HEADER */}
//         <header className="admin-products-header">
//           <div className="admin-products-header-text">
//             <span className="admin-products-eyebrow">Store Management</span>
//             <h1>Manage Products</h1>
//             <p>
//               Manage your products, pricing, discounts, stock and visibility.
//             </p>
//           </div>

//           <Link to="/admin/add-product" className="btn-add-product">
//             <span aria-hidden="true">+</span>
//             Add Product
//           </Link>
//         </header>

//         {/* ERROR */}
//         {error && (
//           <div className="admin-products-error" role="alert">
//             <div className="admin-products-error-text">
//               <strong>Unable to load products</strong>
//               <p>{error}</p>
//             </div>

//             <button
//               type="button"
//               onClick={fetchProducts}
//               className="ap-btn-retry"
//             >
//               Try Again
//             </button>
//           </div>
//         )}

//         {/* PRODUCT COUNT */}
//         {!error && (
//           <div className="admin-products-summary">
//             <span className="admin-products-summary-count">
//               {products.length} {products.length === 1 ? "product" : "products"}
//             </span>
//           </div>
//         )}

//         {/* EMPTY STATE / TABLE */}
//         {!error && products.length === 0 ? (
//           <div className="admin-products-empty">
//             <div className="ap-empty-icon" aria-hidden="true">
//               🧶
//             </div>

//             <h2>No products found</h2>

//             <p>You haven&apos;t added any active products yet.</p>

//             <Link to="/admin/add-product" className="btn-add-product">
//               + Add Your First Product
//             </Link>
//           </div>
//         ) : (
//           !error && (
//             <div className="admin-products-table-wrapper">
//               <table className="admin-products-table">
//                 <thead>
//                   <tr>
//                     <th scope="col">Product</th>
//                     <th scope="col">Price</th>
//                     <th scope="col">Discount</th>
//                     <th scope="col">Selling Price</th>
//                     <th scope="col">Category</th>
//                     <th scope="col">Stock</th>
//                     <th scope="col">Status</th>
//                     <th scope="col">Featured</th>
//                     <th scope="col">Actions</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {products.map((product) => {
//                     const originalPrice = Number(product?.price) || 0;
//                     const discount = Number(product?.discount) || 0;
//                     const sellingPrice = getSellingPrice(product);
//                     const hasDiscount = discount > 0;
//                     const isInStock = Number(product?.stock) > 0;

//                     return (
//                       <tr key={product._id}>
//                         {/* PRODUCT */}
//                         <td className="ap-info-cell" data-label="Product">
//                           <div className="ap-info">
//                             <div className="ap-image-wrapper">
//                               {product.imageUrl ? (
//                                 <img
//                                   src={product.imageUrl}
//                                   alt={product.name || "Product"}
//                                   className="ap-thumbnail"
//                                   loading="lazy"
//                                 />
//                               ) : (
//                                 <div className="ap-thumbnail-placeholder">
//                                   🧶
//                                 </div>
//                               )}
//                             </div>

//                             <div className="ap-details">
//                               <strong className="ap-name" title={product.name}>
//                                 {product.name}
//                               </strong>

//                               <span className="ap-id">
//                                 ID:{" "}
//                                 {product._id
//                                   ? `${product._id.substring(0, 8)}…`
//                                   : "—"}
//                               </span>
//                             </div>
//                           </div>
//                         </td>

//                         {/* ORIGINAL PRICE */}
//                         <td className="ap-price-cell" data-label="Price">
//                           <span
//                             className={
//                               hasDiscount
//                                 ? "ap-original-price ap-discounted"
//                                 : "ap-original-price"
//                             }
//                           >
//                             ₹{originalPrice.toFixed(2)}
//                           </span>
//                         </td>

//                         {/* DISCOUNT */}
//                         <td className="ap-discount-cell" data-label="Discount">
//                           {hasDiscount ? (
//                             <span className="ap-discount-badge">
//                               {discount}% OFF
//                             </span>
//                           ) : (
//                             <span className="ap-no-discount">No discount</span>
//                           )}
//                         </td>

//                         {/* SELLING PRICE */}
//                         <td
//                           className="ap-selling-price-cell"
//                           data-label="Selling Price"
//                         >
//                           <strong className="ap-selling-price-value">
//                             ₹{sellingPrice.toFixed(2)}
//                           </strong>

//                           {hasDiscount && (
//                             <span className="ap-saving-text">
//                               Save ₹{(originalPrice - sellingPrice).toFixed(2)}
//                             </span>
//                           )}
//                         </td>

//                         {/* CATEGORY */}
//                         <td className="ap-category-cell" data-label="Category">
//                           {product.category ? (
//                             <span className="ap-category-display">
//                               <span aria-hidden="true">
//                                 {product.category.icon}
//                               </span>
//                               <span>{product.category.name}</span>
//                             </span>
//                           ) : (
//                             <span className="ap-missing-data">No category</span>
//                           )}
//                         </td>

//                         {/* STOCK */}
//                         <td className="ap-stock-cell" data-label="Stock">
//                           <span
//                             className={`ap-stock-badge ${
//                               isInStock ? "ap-in-stock" : "ap-out-of-stock"
//                             }`}
//                           >
//                             {isInStock
//                               ? `${product.stock} in stock`
//                               : "Out of stock"}
//                           </span>
//                         </td>

//                         {/* STATUS */}
//                         <td className="ap-status-cell" data-label="Status">
//                           {product.isActive !== false ? (
//                             <span className="ap-status-badge ap-active">
//                               Active
//                             </span>
//                           ) : (
//                             <span className="ap-status-badge ap-inactive">
//                               Inactive
//                             </span>
//                           )}
//                         </td>

//                         {/* FEATURED */}
//                         <td className="ap-featured-cell" data-label="Featured">
//                           {product.isFeatured ? (
//                             <span className="ap-featured-badge">
//                               ★ Featured
//                             </span>
//                           ) : (
//                             <span className="ap-not-featured">—</span>
//                           )}
//                         </td>

//                         {/* ACTIONS */}
//                         <td className="ap-actions-cell" data-label="Actions">
//                           <div className="ap-actions">
//                             <Link
//                               to={`/admin/edit-product/${product._id}`}
//                               className="ap-btn-edit"
//                             >
//                               Edit
//                             </Link>

//                             <button
//                               type="button"
//                               className="ap-btn-delete"
//                               onClick={() => handleDelete(product)}
//                               disabled={deletingId === product._id}
//                             >
//                               {deletingId === product._id
//                                 ? "Removing..."
//                                 : "Remove"}
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           )
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminProducts;

import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/admin-products.css";

/* ============================================================
   ICONS
============================================================ */

const TrashIcon = () => (
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
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

const AlertTriangleIcon = ({ size = 22 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const CloseIcon = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* ============================================================
   COMPONENT
============================================================ */

const AdminProducts = () => {
  const { user } = useContext(AuthContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  /* ---------- New: confirmation modal state ---------- */
  const [confirmTarget, setConfirmTarget] = useState(null); // product object

  /* ---------- New: inline success / error toast ---------- */
  const [toast, setToast] = useState(null); // { type: 'success' | 'error', text }

  /* ------------------------------------------------------------
   * Auto-dismiss toast
   * ------------------------------------------------------------ */

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  /* ------------------------------------------------------------
   * Fetch Products (unchanged logic)
   * ------------------------------------------------------------ */

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/products");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch products");
      }

      if (!Array.isArray(data)) {
        throw new Error("Invalid products response");
      }

      setProducts(data);
    } catch (err) {
      console.error("Fetch products error:", err);
      setError(err.message || "Unable to load products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  /* ------------------------------------------------------------
   * Selling price helper (unchanged)
   * ------------------------------------------------------------ */

  const getSellingPrice = (product) => {
    const price = Number(product?.price) || 0;
    const discount = Number(product?.discount) || 0;
    const safeDiscount = Math.min(Math.max(discount, 0), 100);

    return price - (price * safeDiscount) / 100;
  };

  /* ------------------------------------------------------------
   * Open / close confirmation modal
   * ------------------------------------------------------------ */

  const requestDelete = (product) => {
    setConfirmTarget(product);
  };

  const closeConfirm = () => {
    if (deletingId) return; // don't allow closing mid-request
    setConfirmTarget(null);
  };

  /* ------------------------------------------------------------
   * Escape key closes the modal
   * ------------------------------------------------------------ */

  useEffect(() => {
    if (!confirmTarget) return;

    const onKey = (e) => {
      if (e.key === "Escape") closeConfirm();
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmTarget, deletingId]);

  /* ------------------------------------------------------------
   * Perform the delete (was inside handleDelete)
   * ------------------------------------------------------------ */

  const confirmDelete = async () => {
    if (!confirmTarget) return;
    const product = confirmTarget;

    try {
      setDeletingId(product._id);

      const response = await fetch(`/api/products/${product._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user?.token || ""}`,
        },
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Failed to remove product");
      }

      setProducts((previousProducts) =>
        previousProducts.filter(
          (currentProduct) => currentProduct._id !== product._id,
        ),
      );

      setToast({
        type: "success",
        text: `"${product.name}" was removed.`,
      });

      setConfirmTarget(null);
    } catch (err) {
      console.error("Delete product error:", err);

      setToast({
        type: "error",
        text: err.message || "Something went wrong while removing the product.",
      });

      setConfirmTarget(null);
    } finally {
      setDeletingId(null);
    }
  };

  /* ------------------------------------------------------------
   * Loading
   * ------------------------------------------------------------ */

  if (loading) {
    return (
      <div className="admin-products-page">
        <div
          className="admin-products-loading"
          role="status"
          aria-live="polite"
        >
          <span className="admin-products-spinner" aria-hidden="true" />
          <p>Loading products…</p>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------
   * Main UI
   * ------------------------------------------------------------ */

  return (
    <div className="admin-products-page">
      <div className="admin-products-container">
        {/* HEADER */}
        <header className="admin-products-header">
          <div className="admin-products-header-text">
            <span className="admin-products-eyebrow">Store Management</span>
            <h1>Manage Products</h1>
            <p>
              Manage your products, pricing, discounts, stock and visibility.
            </p>
          </div>

          <Link to="/admin/add-product" className="btn-add-product">
            <span aria-hidden="true">+</span>
            Add Product
          </Link>
        </header>

        {/* FETCH ERROR */}
        {error && (
          <div className="admin-products-error" role="alert">
            <div className="admin-products-error-text">
              <strong>Unable to load products</strong>
              <p>{error}</p>
            </div>

            <button
              type="button"
              onClick={fetchProducts}
              className="ap-btn-retry"
            >
              Try Again
            </button>
          </div>
        )}

        {/* SUMMARY */}
        {!error && (
          <div className="admin-products-summary">
            <span className="admin-products-summary-count">
              {products.length} {products.length === 1 ? "product" : "products"}
            </span>
          </div>
        )}

        {/* EMPTY / TABLE */}
        {!error && products.length === 0 ? (
          <div className="admin-products-empty">
            <div className="ap-empty-icon" aria-hidden="true">
              🧶
            </div>

            <h2>No products found</h2>
            <p>You haven&apos;t added any active products yet.</p>

            <Link to="/admin/add-product" className="btn-add-product">
              <span aria-hidden="true">+</span>
              Add Your First Product
            </Link>
          </div>
        ) : (
          !error && (
            <div className="admin-products-table-wrapper">
              <table className="admin-products-table">
                <thead>
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Price</th>
                    <th scope="col">Discount</th>
                    <th scope="col">Selling Price</th>
                    <th scope="col">Category</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Status</th>
                    <th scope="col">Featured</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product) => {
                    const originalPrice = Number(product?.price) || 0;
                    const discount = Number(product?.discount) || 0;
                    const sellingPrice = getSellingPrice(product);
                    const hasDiscount = discount > 0;
                    const isInStock = Number(product?.stock) > 0;

                    return (
                      <tr key={product._id}>
                        {/* PRODUCT */}
                        <td className="ap-info-cell" data-label="Product">
                          <div className="ap-info">
                            <div className="ap-image-wrapper">
                              {product.imageUrl ? (
                                <img
                                  src={product.imageUrl}
                                  alt={product.name || "Product"}
                                  className="ap-thumbnail"
                                  loading="lazy"
                                />
                              ) : (
                                <div className="ap-thumbnail-placeholder">
                                  🧶
                                </div>
                              )}
                            </div>

                            <div className="ap-details">
                              <strong className="ap-name" title={product.name}>
                                {product.name}
                              </strong>

                              <span className="ap-id">
                                ID:{" "}
                                {product._id
                                  ? `${product._id.substring(0, 8)}…`
                                  : "—"}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* ORIGINAL PRICE */}
                        <td className="ap-price-cell" data-label="Price">
                          <span
                            className={
                              hasDiscount
                                ? "ap-original-price ap-discounted"
                                : "ap-original-price"
                            }
                          >
                            ₹{originalPrice.toFixed(2)}
                          </span>
                        </td>

                        {/* DISCOUNT */}
                        <td className="ap-discount-cell" data-label="Discount">
                          {hasDiscount ? (
                            <span className="ap-discount-badge">
                              {discount}% OFF
                            </span>
                          ) : (
                            <span className="ap-no-discount">No discount</span>
                          )}
                        </td>

                        {/* SELLING PRICE */}
                        <td
                          className="ap-selling-price-cell"
                          data-label="Selling Price"
                        >
                          <strong className="ap-selling-price-value">
                            ₹{sellingPrice.toFixed(2)}
                          </strong>

                          {hasDiscount && (
                            <span className="ap-saving-text">
                              Save ₹{(originalPrice - sellingPrice).toFixed(2)}
                            </span>
                          )}
                        </td>

                        {/* CATEGORY */}
                        <td className="ap-category-cell" data-label="Category">
                          {product.category ? (
                            <span className="ap-category-display">
                              <span aria-hidden="true">
                                {product.category.icon}
                              </span>
                              <span>{product.category.name}</span>
                            </span>
                          ) : (
                            <span className="ap-missing-data">No category</span>
                          )}
                        </td>

                        {/* STOCK */}
                        <td className="ap-stock-cell" data-label="Stock">
                          <span
                            className={`ap-stock-badge ${
                              isInStock ? "ap-in-stock" : "ap-out-of-stock"
                            }`}
                          >
                            {isInStock
                              ? `${product.stock} in stock`
                              : "Out of stock"}
                          </span>
                        </td>

                        {/* STATUS */}
                        <td className="ap-status-cell" data-label="Status">
                          {product.isActive !== false ? (
                            <span className="ap-status-badge ap-active">
                              Active
                            </span>
                          ) : (
                            <span className="ap-status-badge ap-inactive">
                              Inactive
                            </span>
                          )}
                        </td>

                        {/* FEATURED */}
                        <td className="ap-featured-cell" data-label="Featured">
                          {product.isFeatured ? (
                            <span className="ap-featured-badge">
                              ★ Featured
                            </span>
                          ) : (
                            <span className="ap-not-featured">—</span>
                          )}
                        </td>

                        {/* ACTIONS */}
                        <td className="ap-actions-cell" data-label="Actions">
                          <div className="ap-actions">
                            <Link
                              to={`/admin/edit-product/${product._id}`}
                              className="ap-btn-edit"
                            >
                              Edit
                            </Link>

                            <button
                              type="button"
                              className="ap-btn-delete"
                              onClick={() => requestDelete(product)}
                              disabled={deletingId === product._id}
                            >
                              {deletingId === product._id
                                ? "Removing…"
                                : "Remove"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>

      {/* ============================================================
          DELETE CONFIRMATION MODAL
          Replaces window.confirm — styled, accessible, non-blocking.
      ============================================================ */}

      {confirmTarget && (
        <div
          className="ap-modal-backdrop"
          onClick={closeConfirm}
          role="presentation"
        >
          <div
            className="ap-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ap-modal-title"
            aria-describedby="ap-modal-desc"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="ap-modal-close"
              onClick={closeConfirm}
              disabled={Boolean(deletingId)}
              aria-label="Close"
            >
              <CloseIcon size={16} />
            </button>

            <div className="ap-modal-icon" aria-hidden="true">
              <AlertTriangleIcon size={26} />
            </div>

            <h2 id="ap-modal-title" className="ap-modal-title">
              Remove this product?
            </h2>

            <p id="ap-modal-desc" className="ap-modal-text">
              <strong>{confirmTarget.name}</strong> will be marked as inactive
              and hidden from customers. You can reactivate it from the edit
              page.
            </p>

            <div className="ap-modal-actions">
              <button
                type="button"
                className="ap-modal-btn ap-modal-btn-cancel"
                onClick={closeConfirm}
                disabled={Boolean(deletingId)}
                autoFocus
              >
                Cancel
              </button>

              <button
                type="button"
                className="ap-modal-btn ap-modal-btn-confirm"
                onClick={confirmDelete}
                disabled={Boolean(deletingId)}
              >
                {deletingId ? (
                  <>
                    <span className="ap-modal-spinner" aria-hidden="true" />
                    Removing…
                  </>
                ) : (
                  <>
                    <TrashIcon />
                    Remove
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          TOAST (success / error, auto-dismiss)
      ============================================================ */}

      {toast && (
        <div
          className={`ap-toast ${toast.type}`}
          role={toast.type === "error" ? "alert" : "status"}
          aria-live="polite"
        >
          <span className="ap-toast-icon" aria-hidden="true">
            {toast.type === "error" ? "⚠" : <CheckIcon />}
          </span>

          <p className="ap-toast-text">{toast.text}</p>

          <button
            type="button"
            className="ap-toast-close"
            onClick={() => setToast(null)}
            aria-label="Dismiss"
          >
            <CloseIcon size={13} />
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
