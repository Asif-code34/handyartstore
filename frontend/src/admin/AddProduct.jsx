// import React, { useState, useContext } from "react";
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
//     category: "",
//     stock: "",
//   });
//   const [image, setImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [loading, setLoading] = useState(false);

//   if (!user || user.role !== "admin") {
//     navigate("/");
//     return null;
//   }

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

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!image) return alert("Please select an image");

//     setLoading(true);
//     const data = new FormData();
//     data.append("name", formData.name);
//     data.append("description", formData.description);
//     data.append("price", formData.price);
//     data.append("category", formData.category);
//     data.append("stock", formData.stock);
//     data.append("image", image);

//     try {
//       const res = await fetch("/api/products", {
//         method: "POST",
//         headers: { Authorization: `Bearer ${user.token}` },
//         body: data,
//       });
//       const responseData = await res.json();

//       if (res.ok) {
//         alert("Product created successfully with Cloudinary Image URL!");
//         navigate("/admin");
//       } else {
//         alert(responseData.message || "Error creating product");
//       }
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="add-product-page">
//       <div className="add-product-container">
//         <div className="add-product-header">
//           <span className="add-product-icon">🧶</span>
//           <h1>Add New Product</h1>
//           <p>List a new crochet treasure for your customers</p>
//         </div>

//         <form onSubmit={handleSubmit} className="add-product-form">
//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="name">Product Name</label>
//               <input
//                 type="text"
//                 id="name"
//                 placeholder="e.g., Handmade Crochet Bouquet"
//                 required
//                 onChange={(e) =>
//                   setFormData({ ...formData, name: e.target.value })
//                 }
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="category">Category</label>
//               <input
//                 type="text"
//                 id="category"
//                 placeholder="e.g., Flowers, Toys, Bags"
//                 required
//                 onChange={(e) =>
//                   setFormData({ ...formData, category: e.target.value })
//                 }
//               />
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="price">Price (₹)</label>
//               <input
//                 type="number"
//                 id="price"
//                 placeholder="0.00"
//                 required
//                 onChange={(e) =>
//                   setFormData({ ...formData, price: e.target.value })
//                 }
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="stock">Stock Quantity</label>
//               <input
//                 type="number"
//                 id="stock"
//                 placeholder="0"
//                 required
//                 onChange={(e) =>
//                   setFormData({ ...formData, stock: e.target.value })
//                 }
//               />
//             </div>
//           </div>

//           <div className="form-group">
//             <label htmlFor="description">Description</label>
//             <textarea
//               id="description"
//               placeholder="Describe your crochet item in detail..."
//               rows="5"
//               required
//               onChange={(e) =>
//                 setFormData({ ...formData, description: e.target.value })
//               }
//             />
//           </div>

//           <div className="form-group">
//             <label>Product Image</label>
//             <div className="file-upload-wrapper">
//               <div
//                 className={`file-upload-area ${imagePreview ? "has-preview" : ""}`}
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
//                   required
//                   onChange={handleImageChange}
//                   className="file-input"
//                 />
//               </div>
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="btn btn-primary btn-submit"
//             disabled={loading}
//           >
//             {loading ? (
//               <>
//                 <span className="spinner-small"></span> Uploading & Creating...
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
//     category: "",
//     stock: "",
//   });

//   const [categories, setCategories] = useState([]);
//   const [image, setImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [categoriesLoading, setCategoriesLoading] = useState(true);

//   // Protect admin page
//   useEffect(() => {
//     if (!user) return;

//     if (user.role !== "admin") {
//       navigate("/");
//     }
//   }, [user, navigate]);

//   // Fetch categories
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

//     setLoading(true);

//     const data = new FormData();

//     data.append("name", formData.name);
//     data.append("description", formData.description);
//     data.append("price", formData.price);
//     data.append("category", formData.category);
//     data.append("stock", formData.stock);
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

//         navigate("/admin");
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

//   // Don't render anything until user is known
//   if (!user) {
//     return null;
//   }

//   if (user.role !== "admin") {
//     return null;
//   }

//   return (
//     <div className="add-product-page">
//       <div className="add-product-container">
//         <div className="add-product-header">
//           <div className="header-icon">🧶</div>

//           <h1>Add New Product</h1>

//           <p>List a new crochet treasure for your customers</p>
//         </div>

//         <form onSubmit={handleSubmit} className="add-product-form">
//           <div className="form-row">
//             {/* Product Name */}
//             <div className="form-group">
//               <label htmlFor="name">Product Name</label>

//               <input
//                 type="text"
//                 id="name"
//                 placeholder="e.g., Handmade Crochet Bouquet"
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

//             {/* Category */}
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

//           <div className="form-row">
//             {/* Price */}
//             <div className="form-group">
//               <label htmlFor="price">Price (₹)</label>

//               <input
//                 type="number"
//                 id="price"
//                 placeholder="0.00"
//                 min="0"
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

//           {/* Product Image */}
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
//                   required
//                   onChange={handleImageChange}
//                   className="file-input"
//                 />
//               </div>
//             </div>
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

import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/addproduct.css";

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

  // ----------------------------------------------------------
  // Protect admin page
  // ----------------------------------------------------------

  useEffect(() => {
    if (!user) return;

    if (user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  // ----------------------------------------------------------
  // Fetch categories
  // ----------------------------------------------------------

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch categories");
        }

        setCategories(data);
      } catch (error) {
        console.error("Category fetch error:", error);
        alert("Unable to load categories");
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // ----------------------------------------------------------
  // Handle normal input changes
  // ----------------------------------------------------------

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ----------------------------------------------------------
  // Handle discount
  // ----------------------------------------------------------

  const handleDiscountChange = (e) => {
    let value = e.target.value;

    // Allow empty input while typing
    if (value === "") {
      setFormData((prev) => ({
        ...prev,
        discount: "",
      }));
      return;
    }

    let discountValue = Number(value);

    // Prevent negative discount
    if (discountValue < 0) {
      discountValue = 0;
    }

    // Prevent discount above 100%
    if (discountValue > 100) {
      discountValue = 100;
    }

    setFormData((prev) => ({
      ...prev,
      discount: discountValue,
    }));
  };

  // ----------------------------------------------------------
  // Calculate final selling price
  // ----------------------------------------------------------

  const originalPrice = Number(formData.price) || 0;
  const discountPercentage = Number(formData.discount) || 0;

  const finalPrice = originalPrice - (originalPrice * discountPercentage) / 100;

  // ----------------------------------------------------------
  // Handle image
  // ----------------------------------------------------------

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);

      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  // ----------------------------------------------------------
  // Submit product
  // ----------------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    if (!formData.category) {
      alert("Please select a category");
      return;
    }

    const price = Number(formData.price);
    const discount = Number(formData.discount) || 0;
    const stock = Number(formData.stock);

    // Validate price
    if (price < 0 || Number.isNaN(price)) {
      alert("Please enter a valid product price");
      return;
    }

    // Validate discount
    if (discount < 0 || discount > 100) {
      alert("Discount must be between 0% and 100%");
      return;
    }

    // Validate stock
    if (stock < 0 || Number.isNaN(stock)) {
      alert("Please enter a valid stock quantity");
      return;
    }

    setLoading(true);

    const data = new FormData();

    data.append("name", formData.name.trim());
    data.append("description", formData.description.trim());

    // Original product price
    data.append("price", price);

    // Discount percentage
    data.append("discount", discount);

    data.append("category", formData.category);
    data.append("stock", stock);

    // Product visibility / merchandising
    data.append("isFeatured", formData.isFeatured);
    data.append("isActive", formData.isActive);

    // Product image
    data.append("image", image);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: data,
      });

      const responseData = await res.json();

      if (res.ok) {
        alert("Product created successfully!");

        navigate("/admin/products");
      } else {
        alert(responseData.message || "Error creating product");
      }
    } catch (error) {
      console.error("Create product error:", error);

      alert("Something went wrong while creating the product");
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------------------------------------
  // Don't render until user is known
  // ----------------------------------------------------------

  if (!user) {
    return null;
  }

  if (user.role !== "admin") {
    return null;
  }

  // ----------------------------------------------------------
  // Render
  // ----------------------------------------------------------

  return (
    <div className="add-product-page">
      <div className="add-product-container">
        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="add-product-header">
          <div className="header-icon">🧶</div>

          <h1>Add New Product</h1>

          <p>List a new crochet treasure for your customers</p>
        </div>

        {/* =====================================================
            FORM
        ====================================================== */}

        <form onSubmit={handleSubmit} className="add-product-form">
          {/* =================================================
              NAME + CATEGORY
          ================================================== */}

          <div className="form-row">
            {/* Product Name */}

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
              />
            </div>

            {/* Category */}

            <div className="form-group">
              <label htmlFor="category">Category</label>

              <select
                id="category"
                name="category"
                required
                value={formData.category}
                disabled={categoriesLoading}
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

          {/* =================================================
              PRICE + DISCOUNT + STOCK
          ================================================== */}

          <div className="form-row">
            {/* Original Price */}

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
              />

              <small>Original product price</small>
            </div>

            {/* Discount */}

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
              />

              <small>Enter a value between 0% and 100%</small>
            </div>

            {/* Stock */}

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
              />
            </div>
          </div>

          {/* =================================================
              FINAL PRICE PREVIEW
          ================================================== */}

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

          {/* =================================================
              DESCRIPTION
          ================================================== */}

          <div className="form-group">
            <label htmlFor="description">Description</label>

            <textarea
              id="description"
              name="description"
              placeholder="Describe your crochet item in detail..."
              rows="5"
              required
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {/* =================================================
              PRODUCT IMAGE
          ================================================== */}

          <div className="form-group">
            <label>Product Image</label>

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
                      onClick={() => {
                        setImage(null);
                        setImagePreview(null);
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="upload-icon">📸</div>

                    <p>Click or drag to upload product image</p>

                    <span className="upload-hint">
                      PNG, JPG, WEBP (Max 5MB)
                    </span>
                  </>
                )}

                <input
                  type="file"
                  accept="image/*"
                  required={!image}
                  onChange={handleImageChange}
                  className="file-input"
                />
              </div>
            </div>
          </div>

          {/* =================================================
              PRODUCT SETTINGS
          ================================================== */}

          <div className="product-settings">
            <h3>Product Settings</h3>

            {/* Featured */}

            <label className="setting-option">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
              />

              <span className="setting-content">
                <strong>Featured Product</strong>

                <small>
                  Highlight this product in featured sections of the store.
                </small>
              </span>
            </label>

            {/* Active */}

            <label className="setting-option">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
              />

              <span className="setting-content">
                <strong>Active / Published</strong>

                <small>
                  Make this product visible and available in the store.
                </small>
              </span>
            </label>
          </div>

          {/* =================================================
              SUBMIT
          ================================================== */}

          <button
            type="submit"
            className="btn btn-primary btn-submit"
            disabled={loading || categoriesLoading}
          >
            {loading ? (
              <>
                <span className="spinner-small"></span>
                Uploading & Creating...
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
