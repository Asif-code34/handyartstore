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

//   /*
//    * ------------------------------------------------------------
//    * Fetch Products
//    * ------------------------------------------------------------
//    */

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

//   /*
//    * ------------------------------------------------------------
//    * Calculate Selling Price
//    *
//    * price = original price
//    * discount = percentage
//    *
//    * Example:
//    * price = 120
//    * discount = 10
//    *
//    * selling price = 120 - (120 * 10 / 100)
//    *               = 108
//    * ------------------------------------------------------------
//    */

//   const getSellingPrice = (product) => {
//     const price = Number(product?.price) || 0;
//     const discount = Number(product?.discount) || 0;

//     const safeDiscount = Math.min(Math.max(discount, 0), 100);

//     return price - (price * safeDiscount) / 100;
//   };

//   /*
//    * ------------------------------------------------------------
//    * Delete Product
//    *
//    * Backend performs soft delete:
//    * isActive = false
//    * ------------------------------------------------------------
//    */

//   const handleDelete = async (product) => {
//     const confirmed = window.confirm(
//       `Are you sure you want to remove "${product.name}"?\n\n` +
//         "This product will be marked as inactive.",
//     );

//     if (!confirmed) {
//       return;
//     }

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

//       /*
//        * Since backend soft-deletes the product and GET /products
//        * only returns active products, remove it from the UI.
//        */
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

//   /*
//    * ------------------------------------------------------------
//    * Loading State
//    * ------------------------------------------------------------
//    */

//   if (loading) {
//     return (
//       <div className="admin-products-page">
//         <div className="admin-products-loading">
//           <span className="admin-products-spinner"></span>
//           <p>Loading products...</p>
//         </div>
//       </div>
//     );
//   }

//   /*
//    * ------------------------------------------------------------
//    * Main UI
//    * ------------------------------------------------------------
//    */

//   return (
//     <div className="admin-products-page">
//       <div className="admin-products-container">
//         {/* ======================================================
//             HEADER
//         ====================================================== */}

//         <header className="admin-products-header">
//           <div>
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

//         {/* ======================================================
//             ERROR
//         ====================================================== */}

//         {error && (
//           <div className="admin-products-error" role="alert">
//             <div>
//               <strong>Unable to load products</strong>
//               <p>{error}</p>
//             </div>

//             <button type="button" onClick={fetchProducts} className="btn-retry">
//               Try Again
//             </button>
//           </div>
//         )}

//         {/* ======================================================
//             PRODUCT COUNT
//         ====================================================== */}

//         {!error && (
//           <div className="admin-products-summary">
//             <span>
//               {products.length} {products.length === 1 ? "product" : "products"}
//             </span>
//           </div>
//         )}

//         {/* ======================================================
//             EMPTY STATE
//         ====================================================== */}

//         {!error && products.length === 0 ? (
//           <div className="admin-products-empty">
//             <div className="empty-icon">🧶</div>

//             <h2>No products found</h2>

//             <p>You haven't added any active products yet.</p>

//             <Link to="/admin/add-product" className="btn-add-product">
//               + Add Your First Product
//             </Link>
//           </div>
//         ) : (
//           /* ====================================================
//              PRODUCT TABLE
//           ==================================================== */

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
//                         {/* ====================================
//                             PRODUCT
//                         ==================================== */}

//                         <td className="product-info-cell">
//                           <div className="product-info">
//                             <div className="product-image-wrapper">
//                               {product.imageUrl ? (
//                                 <img
//                                   src={product.imageUrl}
//                                   alt={product.name || "Product"}
//                                   className="product-thumbnail"
//                                   loading="lazy"
//                                 />
//                               ) : (
//                                 <div className="product-thumbnail-placeholder">
//                                   🧶
//                                 </div>
//                               )}
//                             </div>

//                             <div className="product-details">
//                               <strong
//                                 className="product-name"
//                                 title={product.name}
//                               >
//                                 {product.name}
//                               </strong>

//                               <span className="product-id">
//                                 ID:{" "}
//                                 {product._id
//                                   ? `${product._id.substring(0, 8)}…`
//                                   : "—"}
//                               </span>
//                             </div>
//                           </div>
//                         </td>

//                         {/* ====================================
//                             ORIGINAL PRICE
//                         ==================================== */}

//                         <td className="product-price-cell">
//                           <span
//                             className={
//                               hasDiscount
//                                 ? "original-price discounted"
//                                 : "original-price"
//                             }
//                           >
//                             ₹{originalPrice.toFixed(2)}
//                           </span>
//                         </td>

//                         {/* ====================================
//                             DISCOUNT
//                         ==================================== */}

//                         <td className="product-discount-cell">
//                           {hasDiscount ? (
//                             <span className="discount-badge">
//                               {discount}% OFF
//                             </span>
//                           ) : (
//                             <span className="no-discount">No discount</span>
//                           )}
//                         </td>

//                         {/* ====================================
//                             SELLING PRICE
//                         ==================================== */}

//                         <td className="product-selling-price-cell">
//                           <strong>₹{sellingPrice.toFixed(2)}</strong>

//                           {hasDiscount && (
//                             <span className="saving-text">
//                               Save ₹{(originalPrice - sellingPrice).toFixed(2)}
//                             </span>
//                           )}
//                         </td>

//                         {/* ====================================
//                             CATEGORY
//                         ==================================== */}

//                         <td className="product-category-cell">
//                           {product.category ? (
//                             <span className="category-display">
//                               <span aria-hidden="true">
//                                 {product.category.icon}
//                               </span>

//                               <span>{product.category.name}</span>
//                             </span>
//                           ) : (
//                             <span className="missing-data">No category</span>
//                           )}
//                         </td>

//                         {/* ====================================
//                             STOCK
//                         ==================================== */}

//                         <td className="product-stock-cell">
//                           <span
//                             className={`stock-badge ${
//                               isInStock ? "in-stock" : "out-of-stock"
//                             }`}
//                           >
//                             {isInStock
//                               ? `${product.stock} in stock`
//                               : "Out of stock"}
//                           </span>
//                         </td>

//                         {/* ====================================
//                             STATUS
//                         ==================================== */}

//                         <td className="product-status-cell">
//                           {product.isActive !== false ? (
//                             <span className="status-badge active">Active</span>
//                           ) : (
//                             <span className="status-badge inactive">
//                               Inactive
//                             </span>
//                           )}
//                         </td>

//                         {/* ====================================
//                             FEATURED
//                         ==================================== */}

//                         <td className="product-featured-cell">
//                           {product.isFeatured ? (
//                             <span className="featured-badge">★ Featured</span>
//                           ) : (
//                             <span className="not-featured">—</span>
//                           )}
//                         </td>

//                         {/* ====================================
//                             ACTIONS
//                         ==================================== */}

//                         <td className="product-actions-cell">
//                           <div className="product-actions">
//                             <Link
//                               to={`/admin/edit-product/${product._id}`}
//                               className="btn-edit"
//                             >
//                               Edit
//                             </Link>

//                             <button
//                               type="button"
//                               className="btn-delete"
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

const AdminProducts = () => {
  const { user } = useContext(AuthContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  /* ------------------------------------------------------------
   * Fetch Products
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
   * Calculate Selling Price
   * ------------------------------------------------------------ */

  const getSellingPrice = (product) => {
    const price = Number(product?.price) || 0;
    const discount = Number(product?.discount) || 0;
    const safeDiscount = Math.min(Math.max(discount, 0), 100);

    return price - (price * safeDiscount) / 100;
  };

  /* ------------------------------------------------------------
   * Delete Product (soft delete)
   * ------------------------------------------------------------ */

  const handleDelete = async (product) => {
    const confirmed = window.confirm(
      `Are you sure you want to remove "${product.name}"?\n\n` +
        "This product will be marked as inactive.",
    );

    if (!confirmed) return;

    try {
      setDeletingId(product._id);

      const response = await fetch(`/api/products/${product._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to remove product");
      }

      setProducts((previousProducts) =>
        previousProducts.filter(
          (currentProduct) => currentProduct._id !== product._id,
        ),
      );
    } catch (err) {
      console.error("Delete product error:", err);
      alert(err.message || "Something went wrong while removing the product");
    } finally {
      setDeletingId(null);
    }
  };

  /* ------------------------------------------------------------
   * Loading State
   * ------------------------------------------------------------ */

  if (loading) {
    return (
      <div className="admin-products-page">
        <div className="admin-products-loading">
          <span className="admin-products-spinner" aria-hidden="true"></span>
          <p>Loading products...</p>
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
        {/* ======================================================
            HEADER
        ====================================================== */}

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

        {/* ======================================================
            ERROR
        ====================================================== */}

        {error && (
          <div className="admin-products-error" role="alert">
            <div className="admin-products-error-text">
              <strong>Unable to load products</strong>
              <p>{error}</p>
            </div>

            <button type="button" onClick={fetchProducts} className="btn-retry">
              Try Again
            </button>
          </div>
        )}

        {/* ======================================================
            PRODUCT COUNT
        ====================================================== */}

        {!error && (
          <div className="admin-products-summary">
            <span className="admin-products-summary-count">
              {products.length} {products.length === 1 ? "product" : "products"}
            </span>
          </div>
        )}

        {/* ======================================================
            EMPTY STATE
        ====================================================== */}

        {!error && products.length === 0 ? (
          <div className="admin-products-empty">
            <div className="empty-icon" aria-hidden="true">
              🧶
            </div>

            <h2>No products found</h2>

            <p>You haven&apos;t added any active products yet.</p>

            <Link to="/admin/add-product" className="btn-add-product">
              + Add Your First Product
            </Link>
          </div>
        ) : (
          /* ====================================================
             PRODUCT TABLE / MOBILE CARDS
          ==================================================== */

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
                        {/* ====================================
                            PRODUCT
                        ==================================== */}

                        <td className="product-info-cell" data-label="Product">
                          <div className="product-info">
                            <div className="product-image-wrapper">
                              {product.imageUrl ? (
                                <img
                                  src={product.imageUrl}
                                  alt={product.name || "Product"}
                                  className="product-thumbnail"
                                  loading="lazy"
                                />
                              ) : (
                                <div className="product-thumbnail-placeholder">
                                  🧶
                                </div>
                              )}
                            </div>

                            <div className="product-details">
                              <strong
                                className="product-name"
                                title={product.name}
                              >
                                {product.name}
                              </strong>

                              <span className="product-id">
                                ID:{" "}
                                {product._id
                                  ? `${product._id.substring(0, 8)}…`
                                  : "—"}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* ====================================
                            ORIGINAL PRICE
                        ==================================== */}

                        <td className="product-price-cell" data-label="Price">
                          <span
                            className={
                              hasDiscount
                                ? "original-price discounted"
                                : "original-price"
                            }
                          >
                            ₹{originalPrice.toFixed(2)}
                          </span>
                        </td>

                        {/* ====================================
                            DISCOUNT
                        ==================================== */}

                        <td
                          className="product-discount-cell"
                          data-label="Discount"
                        >
                          {hasDiscount ? (
                            <span className="discount-badge">
                              {discount}% OFF
                            </span>
                          ) : (
                            <span className="no-discount">No discount</span>
                          )}
                        </td>

                        {/* ====================================
                            SELLING PRICE
                        ==================================== */}

                        <td
                          className="product-selling-price-cell"
                          data-label="Selling Price"
                        >
                          <strong className="selling-price-value">
                            ₹{sellingPrice.toFixed(2)}
                          </strong>

                          {hasDiscount && (
                            <span className="saving-text">
                              Save ₹{(originalPrice - sellingPrice).toFixed(2)}
                            </span>
                          )}
                        </td>

                        {/* ====================================
                            CATEGORY
                        ==================================== */}

                        <td
                          className="product-category-cell"
                          data-label="Category"
                        >
                          {product.category ? (
                            <span className="category-display">
                              <span aria-hidden="true">
                                {product.category.icon}
                              </span>
                              <span>{product.category.name}</span>
                            </span>
                          ) : (
                            <span className="missing-data">No category</span>
                          )}
                        </td>

                        {/* ====================================
                            STOCK
                        ==================================== */}

                        <td className="product-stock-cell" data-label="Stock">
                          <span
                            className={`stock-badge ${
                              isInStock ? "in-stock" : "out-of-stock"
                            }`}
                          >
                            {isInStock
                              ? `${product.stock} in stock`
                              : "Out of stock"}
                          </span>
                        </td>

                        {/* ====================================
                            STATUS
                        ==================================== */}

                        <td className="product-status-cell" data-label="Status">
                          {product.isActive !== false ? (
                            <span className="status-badge active">Active</span>
                          ) : (
                            <span className="status-badge inactive">
                              Inactive
                            </span>
                          )}
                        </td>

                        {/* ====================================
                            FEATURED
                        ==================================== */}

                        <td
                          className="product-featured-cell"
                          data-label="Featured"
                        >
                          {product.isFeatured ? (
                            <span className="featured-badge">★ Featured</span>
                          ) : (
                            <span className="not-featured">—</span>
                          )}
                        </td>

                        {/* ====================================
                            ACTIONS
                        ==================================== */}

                        <td
                          className="product-actions-cell"
                          data-label="Actions"
                        >
                          <div className="product-actions">
                            <Link
                              to={`/admin/edit-product/${product._id}`}
                              className="btn-edit"
                            >
                              Edit
                            </Link>

                            <button
                              type="button"
                              className="btn-delete"
                              onClick={() => handleDelete(product)}
                              disabled={deletingId === product._id}
                            >
                              {deletingId === product._id
                                ? "Removing..."
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
    </div>
  );
};

export default AdminProducts;
