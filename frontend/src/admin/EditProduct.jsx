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
//     category: "",
//     stock: "",
//   });
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       const res = await fetch(`/api/products/${id}`);
//       const data = await res.json();
//       setFormData({
//         name: data.name,
//         description: data.description,
//         price: data.price,
//         category: data.category,
//         stock: data.stock,
//       });
//     };
//     fetchProduct();
//   }, [id]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const data = new FormData();
//     data.append("name", formData.name);
//     data.append("description", formData.description);
//     data.append("price", formData.price);
//     data.append("category", formData.category);
//     data.append("stock", formData.stock);
//     if (image) data.append("image", image);

//     const res = await fetch(`/api/products/${id}`, {
//       method: "PUT",
//       headers: { Authorization: `Bearer ${user.token}` },
//       body: data,
//     });
//     setLoading(false);
//     if (res.ok) {
//       alert("Product updated successfully!");
//       navigate("/admin/products");
//     }
//   };

//   return (
//     <div className="edit-product-page">
//       <div className="edit-product-container">
//         <div className="edit-product-header">
//           <span className="edit-product-icon">✏️</span>
//           <h1>Edit Product</h1>
//           <p>Update your crochet treasure details</p>
//         </div>

//         <form onSubmit={handleSubmit} className="edit-product-form">
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
//                   setFormData({ ...formData, name: e.target.value })
//                 }
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="category">Category</label>
//               <input
//                 type="text"
//                 id="category"
//                 placeholder="Category"
//                 required
//                 value={formData.category}
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
//                 value={formData.price}
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
//                 value={formData.stock}
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
//               value={formData.description}
//               onChange={(e) =>
//                 setFormData({ ...formData, description: e.target.value })
//               }
//             />
//           </div>

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
//                   onChange={(e) => setImage(e.target.files[0])}
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
//                 <span className="spinner-small"></span> Updating...
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
//     category: "",
//     stock: "",
//   });

//   const [categories, setCategories] = useState([]);
//   const [image, setImage] = useState(null);

//   const [loading, setLoading] = useState(false);
//   const [categoriesLoading, setCategoriesLoading] = useState(true);
//   const [productLoading, setProductLoading] = useState(true);

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

//   // Fetch existing product
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
//           price: data.price || "",

//           // IMPORTANT:
//           // Product API now returns category as an object
//           // so we store only its _id in the form.
//           category: data.category?._id || "",

//           stock: data.stock || "",
//         });
//       } catch (error) {
//         console.error("Product fetch error:", error);
//         alert("Unable to load product");
//       } finally {
//         setProductLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

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

//   // Don't render until product is loaded
//   if (productLoading) {
//     return <div className="loading-container">Loading product...</div>;
//   }

//   if (!user || user.role !== "admin") {
//     return null;
//   }

//   return (
//     <div className="edit-product-page">
//       <div className="edit-product-container">
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

//           {/* Price + Stock */}
//           <div className="form-row">
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
//             <label>Replace Image (Optional)</label>

//             <div className="file-upload-wrapper">
//               <div className="file-upload-area">
//                 <div className="upload-icon">📸</div>

//                 <p>Click to upload a new image</p>

//                 <span className="upload-hint">PNG, JPG, WEBP (Max 5MB)</span>

//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => setImage(e.target.files[0])}
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

import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/editproduct.css";

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

  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [productLoading, setProductLoading] = useState(true);

  // ------------------------------------------------------------
  // Protect admin page
  // ------------------------------------------------------------
  useEffect(() => {
    if (!user) return;

    if (user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  // ------------------------------------------------------------
  // Fetch categories
  // ------------------------------------------------------------
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch categories");
        }

        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Category fetch error:", error);
        alert("Unable to load categories");
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // ------------------------------------------------------------
  // Fetch existing product
  // ------------------------------------------------------------
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch product");
        }

        setFormData({
          name: data.name || "",
          description: data.description || "",
          price: data.price ?? "",
          discount: data.discount ?? 0,

          // API returns category as populated object
          category: data.category?._id || "",

          stock: data.stock ?? 0,

          // New Product model fields
          isFeatured: data.isFeatured ?? false,
          isActive: data.isActive ?? true,
        });
      } catch (error) {
        console.error("Product fetch error:", error);
        alert("Unable to load product");
      } finally {
        setProductLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  // ------------------------------------------------------------
  // Handle submit
  // ------------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category) {
      alert("Please select a category");
      return;
    }

    const discount = Number(formData.discount);

    if (!Number.isFinite(discount) || discount < 0 || discount > 100) {
      alert("Discount must be between 0 and 100");
      return;
    }

    setLoading(true);

    const data = new FormData();

    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("discount", discount);
    data.append("category", formData.category);
    data.append("stock", formData.stock);

    // New Product fields
    data.append("isFeatured", String(formData.isFeatured));
    data.append("isActive", String(formData.isActive));

    // Only send image when admin selects a new one
    if (image) {
      data.append("image", image);
    }

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",

        headers: {
          Authorization: `Bearer ${user.token}`,
        },

        body: data,
      });

      const responseData = await res.json();

      if (res.ok) {
        alert("Product updated successfully!");

        navigate("/admin/products");
      } else {
        alert(responseData.message || "Error updating product");
      }
    } catch (error) {
      console.error("Update product error:", error);

      alert("Something went wrong while updating the product");
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------------------------------
  // Loading
  // ------------------------------------------------------------
  if (productLoading) {
    return <div className="loading-container">Loading product...</div>;
  }

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <div className="edit-product-page">
      <div className="edit-product-container">
        {/* Header */}
        <div className="edit-product-header">
          <div className="header-icon">✏️</div>

          <h1>Edit Product</h1>

          <p>Update your crochet treasure details</p>
        </div>

        <form onSubmit={handleSubmit} className="edit-product-form">
          {/* Product Name + Category */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Product Name</label>

              <input
                type="text"
                id="name"
                placeholder="Product Name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>

              <select
                id="category"
                required
                value={formData.category}
                disabled={categoriesLoading}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value,
                  })
                }
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

          {/* Price + Discount + Stock */}
          <div className="form-row">
            {/* Price */}
            <div className="form-group">
              <label htmlFor="price">Price (₹)</label>

              <input
                type="number"
                id="price"
                placeholder="0.00"
                min="0"
                step="0.01"
                required
                value={formData.price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: e.target.value,
                  })
                }
              />
            </div>

            {/* Discount */}
            <div className="form-group">
              <label htmlFor="discount">Discount (%)</label>

              <input
                type="number"
                id="discount"
                placeholder="0"
                min="0"
                max="100"
                step="1"
                value={formData.discount}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    discount: e.target.value,
                  })
                }
              />

              <small>Enter a discount between 0% and 100%.</small>
            </div>

            {/* Stock */}
            <div className="form-group">
              <label htmlFor="stock">Stock Quantity</label>

              <input
                type="number"
                id="stock"
                placeholder="0"
                min="0"
                required
                value={formData.stock}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stock: e.target.value,
                  })
                }
              />
            </div>
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="description">Description</label>

            <textarea
              id="description"
              placeholder="Describe your crochet item in detail..."
              rows="5"
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
            />
          </div>

          {/* Product Status */}
          <div className="form-row">
            {/* Active */}
            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      isActive: e.target.checked,
                    })
                  }
                />

                <span>Active Product</span>
              </label>

              <small>Inactive products won't be shown to customers.</small>
            </div>

            {/* Featured */}
            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      isFeatured: e.target.checked,
                    })
                  }
                />

                <span>Featured Product</span>
              </label>

              <small>Featured products can appear in featured sections.</small>
            </div>
          </div>

          {/* Product Image */}
          <div className="form-group">
            <label>Replace Image (Optional)</label>

            <div className="file-upload-wrapper">
              <div className="file-upload-area">
                <div className="upload-icon">📸</div>

                <p>Click to upload a new image</p>

                <span className="upload-hint">PNG, JPG, WEBP (Max 5MB)</span>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0] || null)}
                  className="file-input"
                />
              </div>
            </div>

            {image && (
              <small className="selected-file">Selected: {image.name}</small>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary btn-submit"
            disabled={loading || categoriesLoading}
          >
            {loading ? (
              <>
                <span className="spinner-small"></span>
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
