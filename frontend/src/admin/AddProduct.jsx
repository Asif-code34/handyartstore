// import React, { useState, useContext, useEffect } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import "../styles/addproduct.css";

// const AddProduct = () => {
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     price: "",
//     discount: "0",
//     category: "",
//     stock: "",
//     isFeatured: false,
//     isActive: true,
//   });

//   const [categories, setCategories] = useState([]);
//   const [image, setImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [categoriesLoading, setCategoriesLoading] = useState(true);

//   // ----------------------------------------------------------
//   // Protect admin page
//   // ----------------------------------------------------------

//   useEffect(() => {
//     if (!user) return;

//     if (user.role !== "admin") {
//       navigate("/");
//     }
//   }, [user, navigate]);

//   // ----------------------------------------------------------
//   // Fetch categories
//   // ----------------------------------------------------------

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await fetch("/api/categories");

//         const data = await res.json();

//         if (!res.ok) {
//           throw new Error(data.message || "Failed to fetch categories");
//         }

//         setCategories(data);
//       } catch (error) {
//         console.error("Category fetch error:", error);
//         alert("Unable to load categories");
//       } finally {
//         setCategoriesLoading(false);
//       }
//     };

//     fetchCategories();
//   }, []);

//   // ----------------------------------------------------------
//   // Handle normal input changes
//   // ----------------------------------------------------------

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   // ----------------------------------------------------------
//   // Handle discount
//   // ----------------------------------------------------------

//   const handleDiscountChange = (e) => {
//     let value = e.target.value;

//     // Allow empty input while typing
//     if (value === "") {
//       setFormData((prev) => ({
//         ...prev,
//         discount: "",
//       }));
//       return;
//     }

//     let discountValue = Number(value);

//     // Prevent negative discount
//     if (discountValue < 0) {
//       discountValue = 0;
//     }

//     // Prevent discount above 100%
//     if (discountValue > 100) {
//       discountValue = 100;
//     }

//     setFormData((prev) => ({
//       ...prev,
//       discount: discountValue,
//     }));
//   };

//   // ----------------------------------------------------------
//   // Calculate final selling price
//   // ----------------------------------------------------------

//   const originalPrice = Number(formData.price) || 0;
//   const discountPercentage = Number(formData.discount) || 0;

//   const finalPrice = originalPrice - (originalPrice * discountPercentage) / 100;

//   // ----------------------------------------------------------
//   // Handle image
//   // ----------------------------------------------------------

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];

//     if (file) {
//       setImage(file);

//       const reader = new FileReader();

//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };

//       reader.readAsDataURL(file);
//     }
//   };

//   // ----------------------------------------------------------
//   // Submit product
//   // ----------------------------------------------------------

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!image) {
//       alert("Please select an image");
//       return;
//     }

//     if (!formData.category) {
//       alert("Please select a category");
//       return;
//     }

//     const price = Number(formData.price);
//     const discount = Number(formData.discount) || 0;
//     const stock = Number(formData.stock);

//     // Validate price
//     if (price < 0 || Number.isNaN(price)) {
//       alert("Please enter a valid product price");
//       return;
//     }

//     // Validate discount
//     if (discount < 0 || discount > 100) {
//       alert("Discount must be between 0% and 100%");
//       return;
//     }

//     // Validate stock
//     if (stock < 0 || Number.isNaN(stock)) {
//       alert("Please enter a valid stock quantity");
//       return;
//     }

//     setLoading(true);

//     const data = new FormData();

//     data.append("name", formData.name.trim());
//     data.append("description", formData.description.trim());

//     // Original product price
//     data.append("price", price);

//     // Discount percentage
//     data.append("discount", discount);

//     data.append("category", formData.category);
//     data.append("stock", stock);

//     // Product visibility / merchandising
//     data.append("isFeatured", formData.isFeatured);
//     data.append("isActive", formData.isActive);

//     // Product image
//     data.append("image", image);

//     try {
//       const res = await fetch("/api/products", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//         body: data,
//       });

//       const responseData = await res.json();

//       if (res.ok) {
//         alert("Product created successfully!");

//         navigate("/admin/products");
//       } else {
//         alert(responseData.message || "Error creating product");
//       }
//     } catch (error) {
//       console.error("Create product error:", error);

//       alert("Something went wrong while creating the product");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ----------------------------------------------------------
//   // Don't render until user is known
//   // ----------------------------------------------------------

//   if (!user) {
//     return null;
//   }

//   if (user.role !== "admin") {
//     return null;
//   }

//   // ----------------------------------------------------------
//   // Render
//   // ----------------------------------------------------------

//   return (
//     <div className="add-product-page">
//       <div className="add-product-container">
//         {/* =====================================================
//             HEADER
//         ====================================================== */}

//         <div className="add-product-header">
//           <div className="header-icon">🧶</div>

//           <h1>Add New Product</h1>

//           <p>List a new crochet treasure for your customers</p>
//         </div>

//         {/* =====================================================
//             FORM
//         ====================================================== */}

//         <form onSubmit={handleSubmit} className="add-product-form">
//           {/* =================================================
//               NAME + CATEGORY
//           ================================================== */}

//           <div className="form-row">
//             {/* Product Name */}

//             <div className="form-group">
//               <label htmlFor="name">Product Name</label>

//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 placeholder="e.g., Handmade Crochet Bouquet"
//                 required
//                 value={formData.name}
//                 onChange={handleChange}
//               />
//             </div>

//             {/* Category */}

//             <div className="form-group">
//               <label htmlFor="category">Category</label>

//               <select
//                 id="category"
//                 name="category"
//                 required
//                 value={formData.category}
//                 disabled={categoriesLoading}
//                 onChange={handleChange}
//               >
//                 <option value="">
//                   {categoriesLoading
//                     ? "Loading categories..."
//                     : "Select a category"}
//                 </option>

//                 {categories.map((category) => (
//                   <option key={category._id} value={category._id}>
//                     {category.icon} {category.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* =================================================
//               PRICE + DISCOUNT + STOCK
//           ================================================== */}

//           <div className="form-row">
//             {/* Original Price */}

//             <div className="form-group">
//               <label htmlFor="price">Price (₹)</label>

//               <input
//                 type="number"
//                 id="price"
//                 name="price"
//                 placeholder="0.00"
//                 min="0"
//                 step="0.01"
//                 required
//                 value={formData.price}
//                 onChange={handleChange}
//               />

//               <small>Original product price</small>
//             </div>

//             {/* Discount */}

//             <div className="form-group">
//               <label htmlFor="discount">Discount (%)</label>

//               <input
//                 type="number"
//                 id="discount"
//                 name="discount"
//                 placeholder="0"
//                 min="0"
//                 max="100"
//                 step="1"
//                 value={formData.discount}
//                 onChange={handleDiscountChange}
//               />

//               <small>Enter a value between 0% and 100%</small>
//             </div>

//             {/* Stock */}

//             <div className="form-group">
//               <label htmlFor="stock">Stock Quantity</label>

//               <input
//                 type="number"
//                 id="stock"
//                 name="stock"
//                 placeholder="0"
//                 min="0"
//                 step="1"
//                 required
//                 value={formData.stock}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           {/* =================================================
//               FINAL PRICE PREVIEW
//           ================================================== */}

//           <div className="price-preview">
//             <div className="price-preview-content">
//               <span className="price-preview-label">
//                 Customer Selling Price
//               </span>

//               <div className="price-preview-values">
//                 {discountPercentage > 0 && (
//                   <span className="price-preview-original">
//                     ₹{originalPrice.toFixed(2)}
//                   </span>
//                 )}

//                 <span className="price-preview-final">
//                   ₹{finalPrice.toFixed(2)}
//                 </span>

//                 {discountPercentage > 0 && (
//                   <span className="price-preview-discount">
//                     {discountPercentage}% OFF
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* =================================================
//               DESCRIPTION
//           ================================================== */}

//           <div className="form-group">
//             <label htmlFor="description">Description</label>

//             <textarea
//               id="description"
//               name="description"
//               placeholder="Describe your crochet item in detail..."
//               rows="5"
//               required
//               value={formData.description}
//               onChange={handleChange}
//             />
//           </div>

//           {/* =================================================
//               PRODUCT IMAGE
//           ================================================== */}

//           <div className="form-group">
//             <label>Product Image</label>

//             <div className="file-upload-wrapper">
//               <div
//                 className={`file-upload-area ${
//                   imagePreview ? "has-preview" : ""
//                 }`}
//               >
//                 {imagePreview ? (
//                   <div className="image-preview-container">
//                     <img
//                       src={imagePreview}
//                       alt="Product preview"
//                       className="image-preview"
//                     />

//                     <button
//                       type="button"
//                       className="remove-image"
//                       onClick={() => {
//                         setImage(null);
//                         setImagePreview(null);
//                       }}
//                     >
//                       ✕
//                     </button>
//                   </div>
//                 ) : (
//                   <>
//                     <div className="upload-icon">📸</div>

//                     <p>Click or drag to upload product image</p>

//                     <span className="upload-hint">
//                       PNG, JPG, WEBP (Max 5MB)
//                     </span>
//                   </>
//                 )}

//                 <input
//                   type="file"
//                   accept="image/*"
//                   required={!image}
//                   onChange={handleImageChange}
//                   className="file-input"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* =================================================
//               PRODUCT SETTINGS
//           ================================================== */}

//           <div className="product-settings">
//             <h3>Product Settings</h3>

//             {/* Featured */}

//             <label className="setting-option">
//               <input
//                 type="checkbox"
//                 name="isFeatured"
//                 checked={formData.isFeatured}
//                 onChange={handleChange}
//               />

//               <span className="setting-content">
//                 <strong>Featured Product</strong>

//                 <small>
//                   Highlight this product in featured sections of the store.
//                 </small>
//               </span>
//             </label>

//             {/* Active */}

//             <label className="setting-option">
//               <input
//                 type="checkbox"
//                 name="isActive"
//                 checked={formData.isActive}
//                 onChange={handleChange}
//               />

//               <span className="setting-content">
//                 <strong>Active / Published</strong>

//                 <small>
//                   Make this product visible and available in the store.
//                 </small>
//               </span>
//             </label>
//           </div>

//           {/* =================================================
//               SUBMIT
//           ================================================== */}

//           <button
//             type="submit"
//             className="btn btn-primary btn-submit"
//             disabled={loading || categoriesLoading}
//           >
//             {loading ? (
//               <>
//                 <span className="spinner-small"></span>
//                 Uploading & Creating...
//               </>
//             ) : (
//               "Publish Product"
//             )}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddProduct;

import React, { useState, useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/addproduct.css";

/* ============================================================
   ICONS
============================================================ */

const YarnIcon = () => (
  <svg
    width="42"
    height="42"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M5.5 7c3.5 2 9 3 12 2.2" />
    <path d="M4.3 12c4 1.5 10 .8 13.4-2.2" />
    <path d="M5 16.5c3 1.6 8.5 1 12-1" />
    <path d="M16 4.5c-2.5 3-2 8 0 12" />
    <path d="M10.5 3.6c-1.3 3.6-.6 8.2 1.4 11.6" />
  </svg>
);

const CameraIcon = () => (
  <svg
    width="42"
    height="42"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const XIcon = () => (
  <svg
    width="14"
    height="14"
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

/* ============================================================
   CONSTANTS
============================================================ */

const MAX_IMAGE_MB = 5;
const MAX_IMAGE_BYTES = MAX_IMAGE_MB * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

/* ============================================================
   COMPONENT
============================================================ */

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discount: "0",
    category: "",
    stock: "",
    isFeatured: false,
    isActive: true,
  });

  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  /* Inline feedback replaces every alert() */
  const [message, setMessage] = useState(null); // { type: 'error' | 'success', text }
  const messageTimer = useRef(null);

  const showMessage = (type, text) => {
    if (messageTimer.current) clearTimeout(messageTimer.current);
    setMessage({ type, text });
    if (type === "error") {
      messageTimer.current = setTimeout(() => setMessage(null), 5000);
    }
  };

  useEffect(
    () => () => {
      if (messageTimer.current) clearTimeout(messageTimer.current);
    },
    [],
  );

  /* ----------------------------------------------------------
     Admin guard
  ---------------------------------------------------------- */

  useEffect(() => {
    if (!user) return;
    if (user.role !== "admin") navigate("/", { replace: true });
  }, [user, navigate]);

  /* ----------------------------------------------------------
     Fetch categories
  ---------------------------------------------------------- */

  useEffect(() => {
    const controller = new AbortController();

    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories", {
          signal: controller.signal,
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.message || "Failed to fetch categories");
        }

        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        if (error.name === "AbortError") return;
        console.error("Category fetch error:", error);
        showMessage(
          "error",
          error.message || "Couldn't load categories. Please refresh.",
        );
      } finally {
        if (!controller.signal.aborted) setCategoriesLoading(false);
      }
    };

    fetchCategories();
    return () => controller.abort();
  }, []);

  /* ----------------------------------------------------------
     Input change
  ---------------------------------------------------------- */

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (message?.type === "error") setMessage(null);
  };

  /* ----------------------------------------------------------
     Discount
  ---------------------------------------------------------- */

  const handleDiscountChange = (e) => {
    const raw = e.target.value;

    if (raw === "") {
      setFormData((prev) => ({ ...prev, discount: "" }));
      return;
    }

    let value = Number(raw);
    if (value < 0) value = 0;
    if (value > 100) value = 100;

    setFormData((prev) => ({ ...prev, discount: value }));
  };

  /* ----------------------------------------------------------
     Derived price
  ---------------------------------------------------------- */

  const originalPrice = Number(formData.price) || 0;
  const discountPercentage = Number(formData.discount) || 0;
  const finalPrice = originalPrice - (originalPrice * discountPercentage) / 100;

  /* ----------------------------------------------------------
     Image
  ---------------------------------------------------------- */

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      showMessage("error", "Please upload a JPG, PNG or WEBP image.");
      e.target.value = "";
      return;
    }

    if (file.size > MAX_IMAGE_BYTES) {
      showMessage(
        "error",
        `Image is too large. Maximum size is ${MAX_IMAGE_MB}MB.`,
      );
      e.target.value = "";
      return;
    }

    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  /* ----------------------------------------------------------
     Submit
  ---------------------------------------------------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    /* ---------- Validation ---------- */

    if (!image) {
      showMessage("error", "Please select a product image.");
      return;
    }

    if (!formData.category) {
      showMessage("error", "Please choose a category.");
      return;
    }

    if (!formData.name.trim()) {
      showMessage("error", "Please enter a product name.");
      return;
    }

    if (!formData.description.trim()) {
      showMessage("error", "Please enter a description.");
      return;
    }

    const price = Number(formData.price);
    const discount = Number(formData.discount) || 0;
    const stock = Number(formData.stock);

    if (Number.isNaN(price) || price < 0) {
      showMessage("error", "Enter a valid price (0 or higher).");
      return;
    }

    if (discount < 0 || discount > 100) {
      showMessage("error", "Discount must be between 0% and 100%.");
      return;
    }

    if (Number.isNaN(stock) || stock < 0) {
      showMessage("error", "Enter a valid stock quantity.");
      return;
    }

    /* ---------- Upload ---------- */

    setLoading(true);
    setMessage(null);

    const data = new FormData();
    data.append("name", formData.name.trim());
    data.append("description", formData.description.trim());
    data.append("price", price);
    data.append("discount", discount);
    data.append("category", formData.category);
    data.append("stock", stock);
    data.append("isFeatured", formData.isFeatured);
    data.append("isActive", formData.isActive);
    data.append("image", image);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user?.token || ""}`,
        },
        body: data,
      });

      const responseData = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(responseData?.message || "Error creating product");
      }

      /* Success: navigate immediately. The products page can show
         a success banner via router state if you want. */
      navigate("/admin/products", {
        replace: true,
        state: { created: formData.name.trim() },
      });
    } catch (error) {
      console.error("Create product error:", error);
      showMessage(
        "error",
        error.message || "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  /* ----------------------------------------------------------
     Auth gate
  ---------------------------------------------------------- */

  if (!user || user.role !== "admin") return null;

  /* ----------------------------------------------------------
     Render
  ---------------------------------------------------------- */

  return (
    <div className="add-product-page">
      <div className="add-product-container">
        {/* HEADER */}
        <div className="add-product-header">
          <div className="header-icon" aria-hidden="true">
            <YarnIcon />
          </div>

          <h1>Add New Product</h1>
          <p>List a new crochet treasure for your customers</p>
        </div>

        {/* INLINE MESSAGE */}
        {message && (
          <div
            className={`add-product-message ${message.type}`}
            role={message.type === "error" ? "alert" : "status"}
          >
            <span className="add-product-message-icon" aria-hidden="true">
              {message.type === "error" ? "⚠" : "✓"}
            </span>
            <p>{message.text}</p>
            <button
              type="button"
              className="add-product-message-close"
              onClick={() => setMessage(null)}
              aria-label="Dismiss"
            >
              <XIcon />
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="add-product-form" noValidate>
          {/* NAME + CATEGORY */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Product Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="e.g., Handmade Crochet Bouquet"
                required
                value={formData.name}
                onChange={handleChange}
                disabled={loading}
                maxLength={120}
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                required
                value={formData.category}
                disabled={categoriesLoading || loading}
                onChange={handleChange}
              >
                <option value="">
                  {categoriesLoading
                    ? "Loading categories..."
                    : "Select a category"}
                </option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* PRICE + DISCOUNT + STOCK (three-column row) */}
          <div className="form-row form-row-3">
            <div className="form-group">
              <label htmlFor="price">Price (₹)</label>
              <input
                type="number"
                id="price"
                name="price"
                placeholder="0.00"
                min="0"
                step="0.01"
                required
                value={formData.price}
                onChange={handleChange}
                disabled={loading}
              />
              <small>Original product price</small>
            </div>

            <div className="form-group">
              <label htmlFor="discount">Discount (%)</label>
              <input
                type="number"
                id="discount"
                name="discount"
                placeholder="0"
                min="0"
                max="100"
                step="1"
                value={formData.discount}
                onChange={handleDiscountChange}
                disabled={loading}
              />
              <small>Between 0% and 100%</small>
            </div>

            <div className="form-group">
              <label htmlFor="stock">Stock Quantity</label>
              <input
                type="number"
                id="stock"
                name="stock"
                placeholder="0"
                min="0"
                step="1"
                required
                value={formData.stock}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>

          {/* FINAL PRICE PREVIEW */}
          <div className="price-preview">
            <div className="price-preview-content">
              <span className="price-preview-label">
                Customer Selling Price
              </span>

              <div className="price-preview-values">
                {discountPercentage > 0 && (
                  <span className="price-preview-original">
                    ₹{originalPrice.toFixed(2)}
                  </span>
                )}

                <span className="price-preview-final">
                  ₹{finalPrice.toFixed(2)}
                </span>

                {discountPercentage > 0 && (
                  <span className="price-preview-discount">
                    {discountPercentage}% OFF
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Describe your crochet item in detail..."
              rows={5}
              required
              value={formData.description}
              onChange={handleChange}
              disabled={loading}
              maxLength={2000}
            />
          </div>

          {/* IMAGE */}
          <div className="form-group">
            <label htmlFor="product-image">Product Image</label>

            <div className="file-upload-wrapper">
              <div
                className={`file-upload-area ${
                  imagePreview ? "has-preview" : ""
                }`}
              >
                {imagePreview ? (
                  <div className="image-preview-container">
                    <img
                      src={imagePreview}
                      alt="Product preview"
                      className="image-preview"
                    />

                    <button
                      type="button"
                      className="remove-image"
                      onClick={clearImage}
                      aria-label="Remove image"
                    >
                      <XIcon />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="upload-icon" aria-hidden="true">
                      <CameraIcon />
                    </div>
                    <p>Click or drag to upload product image</p>
                    <span className="upload-hint">
                      PNG, JPG, WEBP (Max {MAX_IMAGE_MB}MB)
                    </span>
                  </>
                )}

                <input
                  id="product-image"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  required={!image}
                  onChange={handleImageChange}
                  className="file-input"
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          {/* SETTINGS */}
          <div className="product-settings">
            <h3>Product Settings</h3>

            <label className="setting-option">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                disabled={loading}
              />
              <span className="setting-content">
                <strong>Featured Product</strong>
                <small>
                  Highlight this product in featured sections of the store.
                </small>
              </span>
            </label>

            <label className="setting-option">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                disabled={loading}
              />
              <span className="setting-content">
                <strong>Active / Published</strong>
                <small>
                  Make this product visible and available in the store.
                </small>
              </span>
            </label>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="btn btn-primary btn-submit"
            disabled={loading || categoriesLoading}
          >
            {loading ? (
              <>
                <span className="spinner-small" aria-hidden="true" />
                Uploading &amp; Creating...
              </>
            ) : (
              "Publish Product"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
