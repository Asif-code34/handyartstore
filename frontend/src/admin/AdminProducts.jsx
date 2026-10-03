// import React, { useEffect, useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { Link } from "react-router-dom";
// import "../styles/admin-products.css";

// const AdminProducts = () => {
//   const { user } = useContext(AuthContext);
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const res = await fetch("/api/products");
//       const data = await res.json();
//       setProducts(Array.isArray(data) ? data : []);
//     };
//     fetchProducts();
//   }, []);

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you strictly sure you want to delete this?")) {
//       const res = await fetch(`/api/products/${id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${user.token}` },
//       });
//       if (res.ok) {
//         setProducts(products.filter((p) => p._id !== id));
//       }
//     }
//   };

//   return (
//     <div className="admin-products">
//       <div className="admin-products-header">
//         <h1>Manage Products</h1>
//         <Link to="/admin/add-product" className="btn btn-primary">
//           + Add Product
//         </Link>
//       </div>

//       <div className="admin-products-table-wrapper">
//         <table className="admin-products-table">
//           <thead>
//             <tr>
//               <th>Image</th>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Price</th>
//               <th>Category</th>
//               <th>Stock</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product) => (
//               <tr key={product._id}>
//                 <td className="product-image-cell">
//                   {product.imageUrl ? (
//                     <img
//                       src={product.imageUrl}
//                       alt={product.name}
//                       className="product-thumbnail"
//                       loading="lazy"
//                     />
//                   ) : (
//                     <div className="product-thumbnail-placeholder">🧶</div>
//                   )}
//                 </td>
//                 <td className="product-id">{product._id.substring(0, 8)}…</td>
//                 <td className="product-name">{product.name}</td>
//                 <td className="product-price">₹{product.price.toFixed(2)}</td>
//                 <td className="product-category">{product.category}</td>
//                 <td className="product-stock">
//                   <span
//                     className={`stock-badge ${product.stock > 0 ? "in-stock" : "out-of-stock"}`}
//                   >
//                     {product.stock > 0 ? product.stock : "Out of Stock"}
//                   </span>
//                 </td>
//                 <td className="product-actions">
//                   <Link
//                     to={`/admin/edit-product/${product._id}`}
//                     className="btn-edit"
//                   >
//                     Edit
//                   </Link>
//                   <button
//                     onClick={() => handleDelete(product._id)}
//                     className="btn-delete"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminProducts;

// import React, { useEffect, useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { Link } from "react-router-dom";
// import "../styles/admin-products.css";

// const AdminProducts = () => {
//   const { user } = useContext(AuthContext);

//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch("/api/products");

//         const data = await res.json();

//         setProducts(Array.isArray(data) ? data : []);
//       } catch (error) {
//         console.error("Fetch products error:", error);

//         setProducts([]);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you strictly sure you want to delete this?")) {
//       try {
//         const res = await fetch(`/api/products/${id}`, {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${user.token}`,
//           },
//         });

//         if (res.ok) {
//           setProducts((prevProducts) =>
//             prevProducts.filter((product) => product._id !== id),
//           );
//         } else {
//           const data = await res.json();

//           alert(data.message || "Failed to delete product");
//         }
//       } catch (error) {
//         console.error("Delete product error:", error);

//         alert("Something went wrong while deleting the product");
//       }
//     }
//   };

//   return (
//     <div className="admin-products-page">
//       <div className="admin-products-header">
//         <h1>Manage Products</h1>

//         <Link to="/admin/add-product" className="btn-add-product">
//           + Add Product
//         </Link>
//       </div>

//       <div className="admin-products-table-wrapper">
//         <table className="admin-products-table">
//           <thead>
//             <tr>
//               <th>Image</th>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Price</th>
//               <th>Category</th>
//               <th>Stock</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {products.map((product) => (
//               <tr key={product._id}>
//                 {/* Image */}
//                 <td className="product-image-cell">
//                   {product.imageUrl ? (
//                     <img
//                       src={product.imageUrl}
//                       alt={product.name}
//                       className="product-thumbnail"
//                       loading="lazy"
//                     />
//                   ) : (
//                     <div className="product-thumbnail-placeholder">🧶</div>
//                   )}
//                 </td>

//                 {/* ID */}
//                 <td className="product-id">{product._id.substring(0, 8)}…</td>

//                 {/* Name */}
//                 <td className="product-name">{product.name}</td>

//                 {/* Price */}
//                 {/* <td className="product-price">₹{product.price.toFixed(2)}</td> */}
//                 <td className="product-price">
//                   ₹{Number(product.price).toFixed(2)}
//                 </td>
//                 {/* Category */}
//                 <td className="product-category">
//                   {product.category?.icon}{" "}
//                   {product.category?.name || "No Category"}
//                 </td>

//                 {/* Stock */}
//                 <td className="product-stock">
//                   <span
//                     className={`stock-badge ${
//                       product.stock > 0 ? "in-stock" : "out-of-stock"
//                     }`}
//                   >
//                     {product.stock > 0 ? product.stock : "Out of Stock"}
//                   </span>
//                 </td>

//                 {/* Actions */}
//                 <td className="product-actions">
//                   <Link
//                     to={`/admin/edit-product/${product._id}`}
//                     className="btn-edit"
//                   >
//                     Edit
//                   </Link>

//                   <button
//                     onClick={() => handleDelete(product._id)}
//                     className="btn-delete"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}

//             {products.length === 0 && (
//               <tr>
//                 <td colSpan="7" style={{ textAlign: "center" }}>
//                   No products found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminProducts;

// import React, { useEffect, useState, useContext, useCallback } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { Link } from "react-router-dom";
// import "../styles/admin-products.css";

// const AdminProducts = () => {
//   const { user } = useContext(AuthContext);

//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ----------------------------------------------------------
//   // Fetch products
//   // ----------------------------------------------------------

//   const fetchProducts = useCallback(async () => {
//     try {
//       setLoading(true);

//       const res = await fetch("/api/products");

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data?.message || "Failed to fetch products");
//       }

//       setProducts(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.error("Fetch products error:", error);
//       setProducts([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   // ----------------------------------------------------------
//   // Calculate selling price
//   // ----------------------------------------------------------

//   const getSellingPrice = (price, discount) => {
//     const originalPrice = Number(price) || 0;
//     const discountPercentage = Number(discount) || 0;

//     const finalPrice =
//       originalPrice - (originalPrice * discountPercentage) / 100;

//     return Math.max(0, finalPrice);
//   };

//   // ----------------------------------------------------------
//   // Delete product
//   // ----------------------------------------------------------

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this product?")) {
//       return;
//     }

//     try {
//       const res = await fetch(`/api/products/${id}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${user?.token}`,
//         },
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data?.message || "Failed to delete product");
//       }

//       setProducts((prevProducts) =>
//         prevProducts.filter((product) => product._id !== id),
//       );
//     } catch (error) {
//       console.error("Delete product error:", error);
//       alert(error.message || "Something went wrong while deleting the product");
//     }
//   };

//   // ----------------------------------------------------------
//   // Loading state
//   // ----------------------------------------------------------

//   if (loading) {
//     return (
//       <div className="admin-products-page">
//         <div className="admin-products-header">
//           <h1>Manage Products</h1>

//           <Link to="/admin/add-product" className="btn-add-product">
//             + Add Product
//           </Link>
//         </div>

//         <div className="admin-products-table-wrapper">
//           <div className="products-loading">
//             <div className="spinner"></div>
//             <p>Loading products...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // ----------------------------------------------------------
//   // Render
//   // ----------------------------------------------------------

//   return (
//     <div className="admin-products-page">
//       {/* =====================================================
//           HEADER
//       ====================================================== */}

//       <div className="admin-products-header">
//         <div>
//           <h1>Manage Products</h1>
//           <p>
//             {products.length} {products.length === 1 ? "product" : "products"}{" "}
//             in store
//           </p>
//         </div>

//         <Link to="/admin/add-product" className="btn-add-product">
//           + Add Product
//         </Link>
//       </div>

//       {/* =====================================================
//           PRODUCTS TABLE
//       ====================================================== */}

//       <div className="admin-products-table-wrapper">
//         <table className="admin-products-table">
//           <thead>
//             <tr>
//               <th>Image</th>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Original Price</th>
//               <th>Discount</th>
//               <th>Selling Price</th>
//               <th>Category</th>
//               <th>Stock</th>
//               <th>Status</th>
//               <th>Featured</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {products.length > 0 ? (
//               products.map((product) => {
//                 /*
//                  * IMPORTANT:
//                  * MongoDB may return numbers as numbers,
//                  * but converting them explicitly makes the UI
//                  * safe against string values as well.
//                  */

//                 const originalPrice = Number(product?.price) || 0;

//                 // const discount = Math.min(
//                 //   100,
//                 //   Math.max(0, Number(product?.discount) || 0),
//                 // );
//                 console.log("🔍 Product:", product);
//                 console.log("🧾 Raw discount:", product?.discount);
//                 const discount = Math.min(
//                   100,
//                   Math.max(0, Number(product?.discount) || 0),
//                 );
//                 console.log("✅ Computed discount:", discount);
//                 const sellingPrice = getSellingPrice(originalPrice, discount);

//                 const stock = Number(product?.stock) || 0;

//                 const isActive = product?.isActive !== false;

//                 const isFeatured = product?.isFeatured === true;

//                 return (
//                   <tr key={product._id}>
//                     {/* =================================================
//                         IMAGE
//                     ================================================== */}

//                     <td className="product-image-cell">
//                       {product?.imageUrl ? (
//                         <img
//                           src={product.imageUrl}
//                           alt={product?.name || "Product"}
//                           className="product-thumbnail"
//                           loading="lazy"
//                         />
//                       ) : (
//                         <div className="product-thumbnail-placeholder">🧶</div>
//                       )}
//                     </td>

//                     {/* =================================================
//                         ID
//                     ================================================== */}

//                     <td className="product-id">
//                       {product?._id ? `${product._id.substring(0, 8)}…` : "—"}
//                     </td>

//                     {/* =================================================
//                         NAME
//                     ================================================== */}

//                     <td className="product-name">
//                       {product?.name || "Unnamed Product"}
//                     </td>

//                     {/* =================================================
//                         ORIGINAL PRICE
//                     ================================================== */}

//                     <td className="product-price">
//                       <span
//                         className={
//                           discount > 0
//                             ? "original-price discounted"
//                             : "original-price"
//                         }
//                       >
//                         ₹{originalPrice.toFixed(2)}
//                       </span>
//                     </td>

//                     {/* =================================================
//                         DISCOUNT
//                     ================================================== */}

//                     <td className="product-discount">
//                       {discount > 0 ? (
//                         <span className="discount-badge">{discount}% OFF</span>
//                       ) : (
//                         <span className="no-discount">No Discount</span>
//                       )}
//                     </td>

//                     {/* =================================================
//                         SELLING PRICE
//                     ================================================== */}

//                     <td className="product-selling-price">
//                       <strong>₹{sellingPrice.toFixed(2)}</strong>
//                     </td>

//                     {/* =================================================
//                         CATEGORY
//                     ================================================== */}

//                     <td className="product-category">
//                       {product?.category?.icon || "🧶"}{" "}
//                       {product?.category?.name || "No Category"}
//                     </td>

//                     {/* =================================================
//                         STOCK
//                     ================================================== */}

//                     <td className="product-stock">
//                       <span
//                         className={`stock-badge ${
//                           stock > 0 ? "in-stock" : "out-of-stock"
//                         }`}
//                       >
//                         {stock > 0 ? stock : "Out of Stock"}
//                       </span>
//                     </td>

//                     {/* =================================================
//                         ACTIVE STATUS
//                     ================================================== */}

//                     <td className="product-status">
//                       {isActive ? (
//                         <span className="status-badge active">Active</span>
//                       ) : (
//                         <span className="status-badge inactive">Inactive</span>
//                       )}
//                     </td>

//                     {/* =================================================
//                         FEATURED
//                     ================================================== */}

//                     <td className="product-featured">
//                       {isFeatured ? (
//                         <span className="featured-badge">★ Featured</span>
//                       ) : (
//                         <span className="not-featured">—</span>
//                       )}
//                     </td>

//                     {/* =================================================
//                         ACTIONS
//                     ================================================== */}

//                     <td className="product-actions">
//                       <Link
//                         to={`/admin/edit-product/${product._id}`}
//                         className="btn-edit"
//                       >
//                         Edit
//                       </Link>

//                       <button
//                         type="button"
//                         onClick={() => handleDelete(product._id)}
//                         className="btn-delete"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })
//             ) : (
//               <tr>
//                 <td colSpan="11" className="no-products">
//                   <div className="no-products-content">
//                     <span>🧶</span>
//                     <h3>No products found</h3>
//                     <p>Start by adding your first product.</p>

//                     <Link to="/admin/add-product" className="btn-add-product">
//                       + Add Product
//                     </Link>
//                   </div>
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

//
import React, { useEffect, useState, useContext, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "../styles/admin-products.css";

// ------------------------------------------------------------
// Helpers
// ------------------------------------------------------------

const getSellingPrice = (price, discount) => {
  const original = Number(price) || 0;
  const disc = Math.min(100, Math.max(0, Number(discount) || 0));
  return Math.max(0, original * (1 - disc / 100));
};

const clampDiscount = (value) => {
  const num = Number(value);
  if (isNaN(num)) return 0;
  return Math.min(100, Math.max(0, num));
};

// ------------------------------------------------------------
// Component
// ------------------------------------------------------------

const AdminProducts = () => {
  const { user } = useContext(AuthContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/products");
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to fetch products");
      }

      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch products error:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user?.token}` },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to delete product");
      }

      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Delete error:", error);
      alert(error.message || "Something went wrong while deleting");
    }
  };

  if (loading) {
    return (
      <div className="admin-products-page">
        <div className="admin-products-header">
          <h1>Manage Products</h1>
          <Link to="/admin/add-product" className="btn-add-product">
            + Add Product
          </Link>
        </div>
        <div className="admin-products-table-wrapper">
          <div className="products-loading">
            <div className="spinner" />
            <p>Loading products…</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-products-page">
      <div className="admin-products-header">
        <div>
          <h1>Manage Products</h1>
          <p>
            {products.length} {products.length === 1 ? "product" : "products"}{" "}
            in store
          </p>
        </div>
        <Link to="/admin/add-product" className="btn-add-product">
          + Add Product
        </Link>
      </div>

      <div className="admin-products-table-wrapper">
        <table className="admin-products-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>ID</th>
              <th>Name</th>
              <th>Original Price</th>
              <th>Discount</th>
              <th>Selling Price</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="11" className="no-products">
                  <div className="no-products-content">
                    <span>🧶</span>
                    <h3>No products found</h3>
                    <p>Start by adding your first product.</p>
                    <Link to="/admin/add-product" className="btn-add-product">
                      + Add Product
                    </Link>
                  </div>
                </td>
              </tr>
            ) : (
              products.map((product) => {
                // --- Computed values ---
                const id = product?._id || "";
                const name = product?.name || "Unnamed Product";
                const originalPrice = Number(product?.price) || 0;
                const discount = clampDiscount(product?.discount);
                const sellingPrice = getSellingPrice(originalPrice, discount);
                const stock = Number(product?.stock) || 0;
                const isActive = product?.isActive !== false;
                const isFeatured = product?.isFeatured === true;
                const categoryName = product?.category?.name || "No Category";
                const categoryIcon = product?.category?.icon || "🧶";
                const imageUrl = product?.imageUrl || null;

                return (
                  <tr key={id}>
                    <td className="product-image-cell">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={name}
                          className="product-thumbnail"
                          loading="lazy"
                        />
                      ) : (
                        <div className="product-thumbnail-placeholder">🧶</div>
                      )}
                    </td>

                    <td className="product-id">
                      {id ? `${id.substring(0, 8)}…` : "—"}
                    </td>

                    <td className="product-name">{name}</td>

                    <td className="product-price">
                      <span
                        className={
                          discount > 0
                            ? "original-price discounted"
                            : "original-price"
                        }
                      >
                        ₹{originalPrice.toFixed(2)}
                      </span>
                    </td>

                    {/* ---------- DISCOUNT COLUMN with inline styles ---------- */}
                    <td
                      className="product-discount"
                      data-discount={discount} // for debugging
                    >
                      {discount > 0 ? (
                        <span
                          className="discount-badge"
                          style={{
                            display: "inline-block",
                            padding: "4px 12px",
                            borderRadius: "50px",
                            background: "rgba(239, 68, 68, 0.10)",
                            color: "#dc2626",
                            fontSize: "0.8rem",
                            fontWeight: "600",
                            border: "1px solid rgba(239, 68, 68, 0.20)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {discount}% OFF
                        </span>
                      ) : (
                        <span
                          className="no-discount"
                          style={{
                            display: "inline-block",
                            padding: "4px 12px",
                            borderRadius: "50px",
                            background: "rgba(107, 114, 128, 0.08)",
                            color: "#6b7280",
                            fontSize: "0.8rem",
                            fontWeight: "400",
                            whiteSpace: "nowrap",
                          }}
                        >
                          No Discount
                        </span>
                      )}
                    </td>

                    <td className="product-selling-price">
                      <strong>₹{sellingPrice.toFixed(2)}</strong>
                    </td>

                    <td className="product-category">
                      {categoryIcon} {categoryName}
                    </td>

                    <td className="product-stock">
                      <span
                        className={`stock-badge ${
                          stock > 0 ? "in-stock" : "out-of-stock"
                        }`}
                      >
                        {stock > 0 ? stock : "Out of Stock"}
                      </span>
                    </td>

                    <td className="product-status">
                      {isActive ? (
                        <span className="status-badge active">Active</span>
                      ) : (
                        <span className="status-badge inactive">Inactive</span>
                      )}
                    </td>

                    <td className="product-featured">
                      {isFeatured ? (
                        <span className="featured-badge">★ Featured</span>
                      ) : (
                        <span className="not-featured">—</span>
                      )}
                    </td>

                    <td className="product-actions">
                      <Link
                        to={`/admin/edit-product/${id}`}
                        className="btn-edit"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(id)}
                        className="btn-delete"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
