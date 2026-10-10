// // import React, { useEffect, useState } from "react";
// // import { useParams, Link } from "react-router-dom";
// // import { useDispatch } from "react-redux";
// // import { addToCart } from "../redux/cartSlice";
// // import "../styles/product.css";

// // const ProductDetail = () => {
// //   const { id } = useParams();
// //   const [product, setProduct] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const dispatch = useDispatch();

// //   useEffect(() => {
// //     const fetchProduct = async () => {
// //       try {
// //         const res = await fetch(`/api/products/${id}`);
// //         const data = await res.json();
// //         setProduct(data);
// //       } catch (error) {
// //         console.error(error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchProduct();
// //   }, [id]);

// //   const handleAddToCart = () => {
// //     if (product) {
// //       dispatch(
// //         addToCart({
// //           productId: product._id,
// //           name: product.name,
// //           price: product.price,
// //           imageUrl: product.imageUrl,
// //           qty: 1,
// //         }),
// //       );
// //       alert("Successfully added to your cart!");
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="product-detail-wrapper">
// //         <div className="loading-state">
// //           <div className="spinner"></div>
// //           <p>Loading your treasure...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (!product) {
// //     return (
// //       <div className="product-detail-wrapper">
// //         <div className="not-found-state">
// //           <div className="icon">🔍</div>
// //           <p>Product not found. It may have been sold.</p>
// //           <Link
// //             to="/shop"
// //             className="btn btn-primary"
// //             style={{ marginTop: 20 }}
// //           >
// //             Browse Collection
// //           </Link>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="product-detail-wrapper">
// //       {/* Breadcrumb */}
// //       <nav className="breadcrumb">
// //         <Link to="/">Home</Link>
// //         <span className="separator">/</span>
// //         <Link to="/shop">Shop</Link>
// //         <span className="separator">/</span>
// //         {product.category && (
// //           <>
// //             <Link to={`/shop?category=${product.category.toLowerCase()}`}>
// //               {product.category}
// //             </Link>
// //             <span className="separator">/</span>
// //           </>
// //         )}
// //         <span className="current">{product.name}</span>
// //       </nav>

// //       {/* Main Detail */}
// //       <div className="product-detail">
// //         <div className="detail-image-container">
// //           <img
// //             src={product.imageUrl}
// //             alt={product.name}
// //             className="detail-image"
// //           />
// //         </div>

// //         <div className="detail-info">
// //           {product.category && (
// //             <span className="product-category">{product.category}</span>
// //           )}
// //           <h2>{product.name}</h2>
// //           <p className="detail-price">₹{product.price.toFixed(2)}</p>

// //           <div className="detail-description">
// //             <p>{product.description}</p>
// //           </div>

// //           <div className="detail-actions">
// //             <button onClick={handleAddToCart} className="btn-add-cart">
// //               🛒 Add to Cart
// //             </button>
// //             <button className="btn-wishlist" aria-label="Add to wishlist">
// //               ♡
// //             </button>
// //           </div>

// //           <p
// //             className={`detail-stock ${
// //               product.stock > 0 ? "in-stock" : "out-of-stock"
// //             }`}
// //           >
// //             {product.stock > 0
// //               ? `● In Stock (${product.stock} units available)`
// //               : "● Out of Stock"}
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProductDetail;

// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../redux/cartSlice";
// import "../styles/product.css";

// const ProductDetail = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await fetch(`/api/products/${id}`);
//         const data = await res.json();

//         if (!res.ok) {
//           throw new Error(data.message || "Failed to fetch product");
//         }

//         setProduct(data);
//       } catch (error) {
//         console.error("Fetch product error:", error);
//         setProduct(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   const handleAddToCart = () => {
//     if (!product || product.stock <= 0) return;

//     dispatch(
//       addToCart({
//         productId: product._id,
//         name: product.name,
//         price: product.price,
//         imageUrl: product.imageUrl,
//         qty: 1,
//       }),
//     );

//     alert("Successfully added to your cart!");
//   };

//   if (loading) {
//     return (
//       <div className="product-loading">
//         <div className="loading-spinner"></div>
//         <p>Loading your treasure...</p>
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="product-not-found">
//         <div className="not-found-icon">🔍</div>

//         <h2>Product Not Found</h2>

//         <p>It may have been removed or is no longer available.</p>

//         <Link to="/shop" className="btn btn-primary">
//           Browse Collection
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="product-detail-page">
//       {/* Breadcrumb */}
//       <div className="breadcrumb">
//         <Link to="/">Home</Link>
//         <span>/</span>

//         <Link to="/shop">Shop</Link>
//         <span>/</span>

//         {product.category && (
//           <>
//             <Link to={`/shop?category=${product.category.slug}`}>
//               {product.category.icon} {product.category.name}
//             </Link>

//             <span>/</span>
//           </>
//         )}

//         <span>{product.name}</span>
//       </div>

//       {/* Main Detail */}
//       <div className="product-detail">
//         {/* Product Image */}
//         <div className="detail-image-container">
//           {product.imageUrl ? (
//             <img
//               src={product.imageUrl}
//               alt={product.name}
//               className="detail-image"
//             />
//           ) : (
//             <div className="detail-image-placeholder">🧶</div>
//           )}
//         </div>

//         {/* Product Information */}
//         <div className="detail-info">
//           {/* Category */}
//           {product.category && (
//             <Link
//               to={`/shop?category=${product.category.slug}`}
//               className="product-category"
//             >
//               {product.category.icon} {product.category.name}
//             </Link>
//           )}

//           {/* Product Name */}
//           <h2>{product.name}</h2>

//           {/* Price */}
//           <p className="detail-price">₹{Number(product.price).toFixed(2)}</p>

//           {/* Description */}
//           <div className="detail-description">
//             <p>{product.description}</p>
//           </div>

//           {/* Actions */}
//           <div className="detail-actions">
//             <button
//               onClick={handleAddToCart}
//               className="btn-add-cart"
//               disabled={product.stock <= 0}
//             >
//               🛒 {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
//             </button>

//             <button
//               className="btn-wishlist"
//               aria-label="Add to wishlist"
//               type="button"
//             >
//               ♡
//             </button>
//           </div>

//           {/* Stock */}
//           <p
//             className={`detail-stock ${
//               product.stock > 0 ? "in-stock" : "out-of-stock"
//             }`}
//           >
//             {product.stock > 0
//               ? `● In Stock (${product.stock} ${
//                   product.stock === 1 ? "unit" : "units"
//                 } available)`
//               : "● Out of Stock"}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import "../styles/product.css";

const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  // ----------------------------------------------------------
  // Fetch product
  // ----------------------------------------------------------

  useEffect(() => {
    const controller = new AbortController();

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/products/${id}`, {
          signal: controller.signal,
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch product");
        }

        setProduct(data);
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }

        console.error("Fetch product error:", error);

        setProduct(null);
        setError(error.message);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchProduct();

    return () => controller.abort();
  }, [id]);

  // ----------------------------------------------------------
  // Product calculations
  // ----------------------------------------------------------

  const price = Number(product?.price) || 0;
  const discount = Number(product?.discount) || 0;
  const stock = Number(product?.stock) || 0;

  const rating = Number(product?.ratings) || 0;
  const reviewCount = Number(product?.numReviews) || 0;

  const isOnSale = discount > 0;

  const discountedPrice = isOnSale ? price - (price * discount) / 100 : price;

  // ----------------------------------------------------------
  // Add to cart
  // ----------------------------------------------------------

  const handleAddToCart = () => {
    if (!product || stock <= 0) {
      return;
    }

    dispatch(
      addToCart({
        productId: product._id,
        name: product.name,

        // IMPORTANT:
        // Cart receives the actual selling price.
        price: Number(discountedPrice.toFixed(2)),

        imageUrl: product.imageUrl,
        qty: 1,
      }),
    );

    alert("Successfully added to your cart!");
  };

  // ----------------------------------------------------------
  // Loading state
  // ----------------------------------------------------------

  if (loading) {
    return (
      <div className="product-loading">
        <div className="loading-spinner"></div>

        <p>Loading your treasure...</p>
      </div>
    );
  }

  // ----------------------------------------------------------
  // Error / Not found state
  // ----------------------------------------------------------

  if (!product) {
    return (
      <div className="product-not-found">
        <div className="not-found-icon">🔍</div>

        <h2>Product Not Found</h2>

        <p>{error || "It may have been removed or is no longer available."}</p>

        <Link to="/shop" className="btn btn-primary">
          Browse Collection
        </Link>
      </div>
    );
  }

  // ----------------------------------------------------------
  // Product detail
  // ----------------------------------------------------------

  return (
    <div className="product-detail-page">
      {/* =====================================================
          BREADCRUMB
      ====================================================== */}

      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>

        <span>/</span>

        <Link to="/shop">Shop</Link>

        <span>/</span>

        {/* {product.category && (
          <>
            <Link
              to={`/shop?category=${encodeURIComponent(product.category.slug)}`}
            >
              {product.category.icon || "🧶"} {product.category.name}
            </Link>

            <span>/</span>
          </>
        )}

        <span className="current">{product.name}</span> */}
      </nav>

      {/* =====================================================
          MAIN PRODUCT
      ====================================================== */}

      <div className="product-detail">
        {/* ===================================================
            PRODUCT IMAGE
        ==================================================== */}

        <div className="detail-image-container">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name || "Crochet product"}
              className="detail-image"
              loading="eager"
            />
          ) : (
            <div
              className="detail-image-placeholder"
              aria-label="Product image unavailable"
            >
              🧶
            </div>
          )}

          {/* Discount Badge */}

          {isOnSale && <span className="discount-badge">{discount}% OFF</span>}
        </div>

        {/* ===================================================
            PRODUCT INFORMATION
        ==================================================== */}

        <div className="detail-info">
          {/* Category */}

          {product.category && (
            <Link
              to={`/shop?category=${encodeURIComponent(product.category.slug)}`}
              className="product-category"
            >
              {product.category.icon || "🧶"} {product.category.name}
            </Link>
          )}

          {/* Product Name */}

          <h1>{product.name}</h1>

          {/* =================================================
              RATING
          ================================================== */}

          {reviewCount > 0 ? (
            <div className="detail-rating">
              <div className="detail-stars">
                {[...Array(5)].map((_, index) => (
                  <span
                    key={index}
                    className={
                      index < Math.floor(rating) ? "star filled" : "star"
                    }
                  >
                    ★
                  </span>
                ))}
              </div>

              <span className="detail-rating-value">{rating.toFixed(1)}</span>

              <span className="detail-review-count">
                ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
              </span>
            </div>
          ) : (
            <div className="detail-rating no-reviews">
              <span>No reviews yet</span>
            </div>
          )}

          {/* =================================================
              PRICE
          ================================================== */}

          <div className="detail-pricing">
            {isOnSale ? (
              <>
                {/* Original price */}

                <span className="detail-original-price">
                  ₹{price.toFixed(2)}
                </span>

                {/* Discounted selling price */}

                <span className="detail-sale-price">
                  ₹{discountedPrice.toFixed(2)}
                </span>

                {/* Percentage */}

                <span className="detail-discount">Save {discount}%</span>
              </>
            ) : (
              <span className="detail-current-price">₹{price.toFixed(2)}</span>
            )}
          </div>

          {/* =================================================
              DESCRIPTION
          ================================================== */}

          <div className="detail-description">
            <p>{product.description}</p>
          </div>

          {/* =================================================
              ACTIONS
          ================================================== */}

          <div className="detail-actions">
            <button
              type="button"
              onClick={handleAddToCart}
              className="btn-add-cart"
              disabled={stock <= 0}
            >
              🛒 {stock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>

            <button
              type="button"
              className="btn-wishlist"
              aria-label="Add to wishlist"
            >
              ♡
            </button>
          </div>

          {/* =================================================
              STOCK
          ================================================== */}

          <p
            className={`detail-stock ${
              stock > 0 ? "in-stock" : "out-of-stock"
            }`}
          >
            {stock > 0
              ? `● In Stock (${stock} ${
                  stock === 1 ? "unit" : "units"
                } available)`
              : "● Out of Stock"}
          </p>

          {/* =================================================
              PRODUCT DETAILS
          ================================================== */}

          <div className="product-extra-info">
            <div className="extra-info-item">
              <span>🧶</span>
              <div>
                <strong>Handmade Product</strong>
                <p>Carefully crafted with love.</p>
              </div>
            </div>

            <div className="extra-info-item">
              <span>📦</span>
              <div>
                <strong>Secure Packaging</strong>
                <p>Packed carefully for delivery.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
