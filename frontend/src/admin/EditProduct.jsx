// import React, { useEffect, useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useParams, useNavigate } from "react-router-dom";
// import "../styles/editproduct.css";

// const EditProduct = () => {
//   const { id } = useParams();
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     price: "",
//     discount: "",
//     category: "",
//     stock: "",
//     isFeatured: false,
//     isActive: true,
//   });

//   const [categories, setCategories] = useState([]);
//   const [image, setImage] = useState(null);

//   const [loading, setLoading] = useState(false);
//   const [categoriesLoading, setCategoriesLoading] = useState(true);
//   const [productLoading, setProductLoading] = useState(true);

//   // ------------------------------------------------------------
//   // Protect admin page
//   // ------------------------------------------------------------
//   useEffect(() => {
//     if (!user) return;

//     if (user.role !== "admin") {
//       navigate("/");
//     }
//   }, [user, navigate]);

//   // ------------------------------------------------------------
//   // Fetch categories
//   // ------------------------------------------------------------
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await fetch("/api/categories");

//         const data = await res.json();

//         if (!res.ok) {
//           throw new Error(data.message || "Failed to fetch categories");
//         }

//         setCategories(Array.isArray(data) ? data : []);
//       } catch (error) {
//         console.error("Category fetch error:", error);
//         alert("Unable to load categories");
//       } finally {
//         setCategoriesLoading(false);
//       }
//     };

//     fetchCategories();
//   }, []);

//   // ------------------------------------------------------------
//   // Fetch existing product
//   // ------------------------------------------------------------
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await fetch(`/api/products/${id}`);

//         const data = await res.json();

//         if (!res.ok) {
//           throw new Error(data.message || "Failed to fetch product");
//         }

//         setFormData({
//           name: data.name || "",
//           description: data.description || "",
//           price: data.price ?? "",
//           discount: data.discount ?? 0,

//           // API returns category as populated object
//           category: data.category?._id || "",

//           stock: data.stock ?? 0,

//           // New Product model fields
//           isFeatured: data.isFeatured ?? false,
//           isActive: data.isActive ?? true,
//         });
//       } catch (error) {
//         console.error("Product fetch error:", error);
//         alert("Unable to load product");
//       } finally {
//         setProductLoading(false);
//       }
//     };

//     if (id) {
//       fetchProduct();
//     }
//   }, [id]);

//   // ------------------------------------------------------------
//   // Handle submit
//   // ------------------------------------------------------------
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.category) {
//       alert("Please select a category");
//       return;
//     }

//     const discount = Number(formData.discount);

//     if (!Number.isFinite(discount) || discount < 0 || discount > 100) {
//       alert("Discount must be between 0 and 100");
//       return;
//     }

//     setLoading(true);

//     const data = new FormData();

//     data.append("name", formData.name);
//     data.append("description", formData.description);
//     data.append("price", formData.price);
//     data.append("discount", discount);
//     data.append("category", formData.category);
//     data.append("stock", formData.stock);

//     // New Product fields
//     data.append("isFeatured", String(formData.isFeatured));
//     data.append("isActive", String(formData.isActive));

//     // Only send image when admin selects a new one
//     if (image) {
//       data.append("image", image);
//     }

//     try {
//       const res = await fetch(`/api/products/${id}`, {
//         method: "PUT",

//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },

//         body: data,
//       });

//       const responseData = await res.json();

//       if (res.ok) {
//         alert("Product updated successfully!");

//         navigate("/admin/products");
//       } else {
//         alert(responseData.message || "Error updating product");
//       }
//     } catch (error) {
//       console.error("Update product error:", error);

//       alert("Something went wrong while updating the product");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ------------------------------------------------------------
//   // Loading
//   // ------------------------------------------------------------
//   if (productLoading) {
//     return <div className="loading-container">Loading product...</div>;
//   }

//   if (!user || user.role !== "admin") {
//     return null;
//   }

//   return (
//     <div className="edit-product-page">
//       <div className="edit-product-container">
//         {/* Header */}
//         <div className="edit-product-header">
//           <div className="header-icon">✏️</div>

//           <h1>Edit Product</h1>

//           <p>Update your crochet treasure details</p>
//         </div>

//         <form onSubmit={handleSubmit} className="edit-product-form">
//           {/* Product Name + Category */}
//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="name">Product Name</label>

//               <input
//                 type="text"
//                 id="name"
//                 placeholder="Product Name"
//                 required
//                 value={formData.name}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     name: e.target.value,
//                   })
//                 }
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="category">Category</label>

//               <select
//                 id="category"
//                 required
//                 value={formData.category}
//                 disabled={categoriesLoading}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     category: e.target.value,
//                   })
//                 }
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

//           {/* Price + Discount + Stock */}
//           <div className="form-row">
//             {/* Price */}
//             <div className="form-group">
//               <label htmlFor="price">Price (₹)</label>

//               <input
//                 type="number"
//                 id="price"
//                 placeholder="0.00"
//                 min="0"
//                 step="0.01"
//                 required
//                 value={formData.price}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     price: e.target.value,
//                   })
//                 }
//               />
//             </div>

//             {/* Discount */}
//             <div className="form-group">
//               <label htmlFor="discount">Discount (%)</label>

//               <input
//                 type="number"
//                 id="discount"
//                 placeholder="0"
//                 min="0"
//                 max="100"
//                 step="1"
//                 value={formData.discount}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     discount: e.target.value,
//                   })
//                 }
//               />

//               <small>Enter a discount between 0% and 100%.</small>
//             </div>

//             {/* Stock */}
//             <div className="form-group">
//               <label htmlFor="stock">Stock Quantity</label>

//               <input
//                 type="number"
//                 id="stock"
//                 placeholder="0"
//                 min="0"
//                 required
//                 value={formData.stock}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     stock: e.target.value,
//                   })
//                 }
//               />
//             </div>
//           </div>

//           {/* Description */}
//           <div className="form-group">
//             <label htmlFor="description">Description</label>

//             <textarea
//               id="description"
//               placeholder="Describe your crochet item in detail..."
//               rows="5"
//               required
//               value={formData.description}
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   description: e.target.value,
//                 })
//               }
//             />
//           </div>

//           {/* Product Status */}
//           <div className="form-row">
//             {/* Active */}
//             <div className="form-group checkbox-group">
//               <label>
//                 <input
//                   type="checkbox"
//                   checked={formData.isActive}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       isActive: e.target.checked,
//                     })
//                   }
//                 />

//                 <span>Active Product</span>
//               </label>

//               <small>Inactive products won't be shown to customers.</small>
//             </div>

//             {/* Featured */}
//             <div className="form-group checkbox-group">
//               <label>
//                 <input
//                   type="checkbox"
//                   checked={formData.isFeatured}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       isFeatured: e.target.checked,
//                     })
//                   }
//                 />

//                 <span>Featured Product</span>
//               </label>

//               <small>Featured products can appear in featured sections.</small>
//             </div>
//           </div>

//           {/* Product Image */}
//           <div className="form-group">
//             <label>Replace Image (Optional)</label>

//             <div className="file-upload-wrapper">
//               <div className="file-upload-area">
//                 <div className="upload-icon">📸</div>

//                 <p>Click to upload a new image</p>

//                 <span className="upload-hint">PNG, JPG, WEBP (Max 5MB)</span>

//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => setImage(e.target.files[0] || null)}
//                   className="file-input"
//                 />
//               </div>
//             </div>

//             {image && (
//               <small className="selected-file">Selected: {image.name}</small>
//             )}
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             className="btn btn-primary btn-submit"
//             disabled={loading || categoriesLoading}
//           >
//             {loading ? (
//               <>
//                 <span className="spinner-small"></span>
//                 Updating...
//               </>
//             ) : (
//               "Update Product"
//             )}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditProduct;

import React, { useEffect, useState, useContext, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/editproduct.css";

/* ============================================================
   ICONS
============================================================ */

const PencilIcon = () => (
  <svg
    width="34"
    height="34"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z" />
  </svg>
);

const CameraIcon = () => (
  <svg
    width="40"
    height="40"
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

const XIcon = ({ size = 14 }) => (
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

/* ============================================================
   CONSTANTS
============================================================ */

const MAX_IMAGE_MB = 5;
const MAX_IMAGE_BYTES = MAX_IMAGE_MB * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

/* ============================================================
   COMPONENT
============================================================ */

const EditProduct = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    category: "",
    stock: "",
    isFeatured: false,
    isActive: true,
  });

  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [currentImage, setCurrentImage] = useState(""); // existing image URL

  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [productLoading, setProductLoading] = useState(true);

  const [message, setMessage] = useState(null);
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
        if (!res.ok)
          throw new Error(data?.message || "Failed to fetch categories");
        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        if (error.name === "AbortError") return;
        console.error("Category fetch error:", error);
        showMessage("error", error.message || "Couldn't load categories.");
      } finally {
        if (!controller.signal.aborted) setCategoriesLoading(false);
      }
    };

    fetchCategories();
    return () => controller.abort();
  }, []);

  /* ----------------------------------------------------------
     Fetch product
  ---------------------------------------------------------- */

  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`, {
          signal: controller.signal,
        });
        const data = await res.json();
        if (!res.ok)
          throw new Error(data?.message || "Failed to fetch product");

        setFormData({
          name: data.name || "",
          description: data.description || "",
          price: data.price ?? "",
          discount: data.discount ?? 0,
          category: data.category?._id || "",
          stock: data.stock ?? 0,
          isFeatured: data.isFeatured ?? false,
          isActive: data.isActive ?? true,
        });

        setCurrentImage(data.imageUrl || data.image || "");
      } catch (error) {
        if (error.name === "AbortError") return;
        console.error("Product fetch error:", error);
        showMessage("error", error.message || "Couldn't load product.");
      } finally {
        if (!controller.signal.aborted) setProductLoading(false);
      }
    };

    fetchProduct();
    return () => controller.abort();
  }, [id]);

  /* ----------------------------------------------------------
     Inputs
  ---------------------------------------------------------- */

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (message?.type === "error") setMessage(null);
  };

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

  const clearNewImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  /* ----------------------------------------------------------
     Submit
  ---------------------------------------------------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!formData.name.trim()) {
      showMessage("error", "Please enter a product name.");
      return;
    }

    if (!formData.category) {
      showMessage("error", "Please select a category.");
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

    if (!Number.isFinite(discount) || discount < 0 || discount > 100) {
      showMessage("error", "Discount must be between 0% and 100%.");
      return;
    }

    if (Number.isNaN(stock) || stock < 0) {
      showMessage("error", "Enter a valid stock quantity.");
      return;
    }

    setLoading(true);
    setMessage(null);

    const data = new FormData();
    data.append("name", formData.name.trim());
    data.append("description", formData.description.trim());
    data.append("price", price);
    data.append("discount", discount);
    data.append("category", formData.category);
    data.append("stock", stock);
    data.append("isFeatured", String(formData.isFeatured));
    data.append("isActive", String(formData.isActive));

    if (image) data.append("image", image);

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${user?.token || ""}` },
        body: data,
      });

      const responseData = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(responseData?.message || "Error updating product");
      }

      navigate("/admin/products", {
        replace: true,
        state: { updated: formData.name.trim() },
      });
    } catch (error) {
      console.error("Update product error:", error);
      showMessage(
        "error",
        error.message || "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  /* ----------------------------------------------------------
     Guards
  ---------------------------------------------------------- */

  if (productLoading) {
    return (
      <div className="edit-product-page">
        <div className="edit-product-container">
          <div className="edit-product-loading" aria-live="polite">
            <span className="edit-product-loading-spinner" aria-hidden="true" />
            <p>Loading product…</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user || user.role !== "admin") return null;

  /* ----------------------------------------------------------
     Render
  ---------------------------------------------------------- */

  return (
    <div className="edit-product-page">
      <div className="edit-product-container">
        {/* HEADER */}
        <div className="edit-product-header">
          <div className="header-icon" aria-hidden="true">
            <PencilIcon />
          </div>
          <h1>Edit Product</h1>
          <p>Update your crochet treasure details</p>
        </div>

        {/* MESSAGE */}
        {message && (
          <div
            className={`edit-product-message ${message.type}`}
            role={message.type === "error" ? "alert" : "status"}
          >
            <span className="edit-product-message-icon" aria-hidden="true">
              {message.type === "error" ? "⚠" : "✓"}
            </span>
            <p>{message.text}</p>
            <button
              type="button"
              className="edit-product-message-close"
              onClick={() => setMessage(null)}
              aria-label="Dismiss"
            >
              <XIcon />
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="edit-product-form" noValidate>
          {/* NAME + CATEGORY */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Product Name</label>
              <input
                id="name"
                type="text"
                placeholder="Product Name"
                required
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                disabled={loading}
                maxLength={120}
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                required
                value={formData.category}
                disabled={categoriesLoading || loading}
                onChange={(e) => updateField("category", e.target.value)}
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

          {/* PRICE + DISCOUNT + STOCK */}
          <div className="form-row form-row-3">
            <div className="form-group">
              <label htmlFor="price">Price (₹)</label>
              <input
                id="price"
                type="number"
                placeholder="0.00"
                min="0"
                step="0.01"
                required
                value={formData.price}
                onChange={(e) => updateField("price", e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="discount">Discount (%)</label>
              <input
                id="discount"
                type="number"
                placeholder="0"
                min="0"
                max="100"
                step="1"
                value={formData.discount}
                onChange={(e) => updateField("discount", e.target.value)}
                disabled={loading}
              />
              <small>Between 0% and 100%.</small>
            </div>

            <div className="form-group">
              <label htmlFor="stock">Stock Quantity</label>
              <input
                id="stock"
                type="number"
                placeholder="0"
                min="0"
                required
                value={formData.stock}
                onChange={(e) => updateField("stock", e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Describe your crochet item in detail..."
              rows={5}
              required
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
              disabled={loading}
              maxLength={2000}
            />
          </div>

          {/* SETTINGS */}
          <div className="product-settings">
            <h3>Product Settings</h3>

            <label className="setting-option">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => updateField("isActive", e.target.checked)}
                disabled={loading}
              />
              <span className="setting-content">
                <strong>Active / Published</strong>
                <small>Inactive products won't be shown to customers.</small>
              </span>
            </label>

            <label className="setting-option">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => updateField("isFeatured", e.target.checked)}
                disabled={loading}
              />
              <span className="setting-content">
                <strong>Featured Product</strong>
                <small>
                  Featured products appear in featured sections of the store.
                </small>
              </span>
            </label>
          </div>

          {/* IMAGE */}
          <div className="form-group">
            <label htmlFor="product-image">Product Image</label>

            {/* Show existing image with "Current" badge */}
            {currentImage && !imagePreview && (
              <div className="current-image-block">
                <span className="current-image-badge">Current image</span>
                <img
                  src={currentImage}
                  alt="Current product"
                  className="current-image"
                />
                <p className="current-image-hint">
                  Upload a new image below to replace it.
                </p>
              </div>
            )}

            <div className="file-upload-wrapper">
              <div
                className={`file-upload-area ${imagePreview ? "has-preview" : ""}`}
              >
                {imagePreview ? (
                  <div className="image-preview-container">
                    <img
                      src={imagePreview}
                      alt="New product preview"
                      className="image-preview"
                    />
                    <button
                      type="button"
                      className="remove-image"
                      onClick={clearNewImage}
                      aria-label="Remove new image"
                    >
                      <XIcon size={13} />
                    </button>
                    <span className="new-image-badge">New image</span>
                  </div>
                ) : (
                  <>
                    <div className="upload-icon" aria-hidden="true">
                      <CameraIcon />
                    </div>
                    <p>
                      {currentImage
                        ? "Click to upload a replacement"
                        : "Click to upload an image"}
                    </p>
                    <span className="upload-hint">
                      PNG, JPG, WEBP (Max {MAX_IMAGE_MB}MB)
                    </span>
                  </>
                )}

                <input
                  id="product-image"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleImageChange}
                  className="file-input"
                  disabled={loading}
                />
              </div>
            </div>

            {image && (
              <small className="selected-file">
                Selected: <strong>{image.name}</strong>
              </small>
            )}
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
                Updating...
              </>
            ) : (
              "Update Product"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
