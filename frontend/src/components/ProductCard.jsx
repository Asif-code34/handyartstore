// import React from "react";
// import { Link } from "react-router-dom";
// import "../styles/product.css";

// const ProductCard = ({ product }) => {
//   return (
//     <div className="product-card">
//       <div className="product-image-wrapper">
//         <img
//           src={product.imageUrl}
//           alt={product.name}
//           className="product-image"
//         />
//         <div className="product-actions">
//           <button className="btn-quick-add">Quick Add</button>
//         </div>
//       </div>
//       <div className="product-info">
//         {product.category && (
//           <span className="product-category">{product.category}</span>
//         )}
//         <h3>{product.name}</h3>
//         <p className="price">₹{product.price}</p>
//         <Link to={`/product/${product._id}`} className="btn-view">
//           View Details →
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "../styles/product.css";

// const ProductCard = ({ product }) => {
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [imageLoaded, setImageLoaded] = useState(false);

//   // Generate random rating (in production, this would come from the API)
//   const rating = product.rating || 3.5 + Math.random() * 1.5;
//   const reviewCount =
//     product.reviewCount || Math.floor(Math.random() * 200) + 10;
//   const isNew = product.isNew || Math.random() > 0.7;
//   const isOnSale = product.isOnSale || Math.random() > 0.8;
//   const discount = product.discount || Math.floor(Math.random() * 20) + 5;

//   const handleWishlist = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsWishlisted(!isWishlisted);
//   };

//   return (
//     <div className="product-card">
//       {/* Image Section */}
//       <div className="product-image-wrapper">
//         {!imageLoaded && <div className="image-skeleton"></div>}
//         <img
//           src={product.imageUrl}
//           alt={product.name}
//           className={`product-image ${imageLoaded ? "loaded" : ""}`}
//           onLoad={() => setImageLoaded(true)}
//           loading="lazy"
//         />

//         {/* Badges */}
//         <div className="product-badges">
//           {isNew && <span className="badge badge-new">New</span>}
//           {isOnSale && <span className="badge badge-sale">-{discount}%</span>}
//           {product.stock > 0 && product.stock < 10 && (
//             <span className="badge badge-low-stock">
//               Only {product.stock} left
//             </span>
//           )}
//         </div>

//         {/* Wishlist Button */}
//         <button
//           className={`wishlist-btn ${isWishlisted ? "active" : ""}`}
//           onClick={handleWishlist}
//           aria-label="Add to wishlist"
//         >
//           <svg
//             width="20"
//             height="20"
//             viewBox="0 0 24 24"
//             fill={isWishlisted ? "#d9534f" : "none"}
//             stroke={isWishlisted ? "#d9534f" : "currentColor"}
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
//           </svg>
//         </button>

//         {/* Quick Add Overlay */}
//         <div className="product-quick-actions">
//           <button className="btn-quick-add">
//             <svg
//               width="18"
//               height="18"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <line x1="12" y1="5" x2="12" y2="19" />
//               <line x1="5" y1="12" x2="19" y2="12" />
//             </svg>
//             Quick Add
//           </button>
//           <Link to={`/product/${product._id}`} className="btn-quick-view">
//             <svg
//               width="18"
//               height="18"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
//               <circle cx="12" cy="12" r="3" />
//             </svg>
//           </Link>
//         </div>
//       </div>

//       {/* Info Section */}
//       <div className="product-info">
//         <div className="product-meta">
//           <span className="product-category">
//             {product.category || "Crochet"}
//           </span>
//           {product.stock > 0 ? (
//             <span className="stock-status in-stock">● In Stock</span>
//           ) : (
//             <span className="stock-status out-of-stock">● Out of Stock</span>
//           )}
//         </div>

//         <h3 className="product-name">
//           <Link to={`/product/${product._id}`}>{product.name}</Link>
//         </h3>

//         {/* Rating */}
//         <div className="product-rating">
//           <div className="stars">
//             {[...Array(5)].map((_, i) => (
//               <span
//                 key={i}
//                 className={`star ${i < Math.floor(rating) ? "filled" : ""}`}
//                 style={{
//                   opacity: i < Math.floor(rating) ? 1 : 0.2,
//                 }}
//               >
//                 ★
//               </span>
//             ))}
//           </div>
//           <span className="rating-value">{rating.toFixed(1)}</span>
//           <span className="review-count">({reviewCount})</span>
//         </div>

//         {/* Price */}
//         <div className="product-pricing">
//           {isOnSale ? (
//             <>
//               <span className="price-original">
//                 ₹{product.price.toFixed(2)}
//               </span>
//               <span className="price-sale">
//                 ₹{(product.price * (1 - discount / 100)).toFixed(2)}
//               </span>
//             </>
//           ) : (
//             <span className="price">₹{product.price.toFixed(2)}</span>
//           )}
//         </div>

//         {/* View Details Button */}
//         <Link to={`/product/${product._id}`} className="btn-view-details">
//           View Details
//           <svg
//             width="16"
//             height="16"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <line x1="5" y1="12" x2="19" y2="12" />
//             <polyline points="12 5 19 12 12 19" />
//           </svg>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

// // Part	Status
// // Populated category object	✅ Fixed
// // Category name	✅
// // Category icon	✅
// // Product name	✅
// // Product image	✅
// // Price	✅
// // Stock	✅
// // Ratings	✅
// // Review count	✅
// // Out of stock	✅
// // Low stock	✅
// // Random fake rating	✅ Removed
// // Random fake discount	✅ Removed
// // Quick Add	⚠️ Not connected to cart
// // Image loading block	⚠️ Check/remove empty block

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "../styles/product.css";

// const ProductCard = ({ product }) => {
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [imageLoaded, setImageLoaded] = useState(false);

//   // ----------------------------------------------------------
//   // Product data
//   // ----------------------------------------------------------

//   const rating = Number(product?.ratings) || 0;
//   const reviewCount = Number(product?.numReviews) || 0;
//   const stock = Number(product?.stock) || 0;
//   const price = Number(product?.price) || 0;

//   // discount is now a real field from the backend
//   const discount = Number(product?.discount) || 0;

//   // Product is on sale when discount is greater than 0
//   const isOnSale = discount > 0;

//   // Calculate final selling price
//   const discountedPrice = price - (price * discount) / 100;

//   // ----------------------------------------------------------
//   // Wishlist
//   // ----------------------------------------------------------

//   const handleWishlist = (e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     setIsWishlisted((prev) => !prev);
//   };

//   // ----------------------------------------------------------
//   // Render
//   // ----------------------------------------------------------

//   return (
//     <div className="product-card">
//       {/* =====================================================
//           IMAGE SECTION
//       ====================================================== */}

//       <div className="product-image-wrapper">
//         {!imageLoaded && (
//           <div className="product-image-loading">
//             <div className="spinner-small"></div>
//           </div>
//         )}

//         {product?.imageUrl ? (
//           <img
//             src={product.imageUrl}
//             alt={product.name || "Crochet product"}
//             className={`product-image ${imageLoaded ? "loaded" : ""}`}
//             onLoad={() => setImageLoaded(true)}
//             onError={() => setImageLoaded(true)}
//             loading="lazy"
//           />
//         ) : (
//           <div className="product-image-placeholder">🧶</div>
//         )}

//         {/* =================================================
//             BADGES
//         ================================================== */}

//         <div className="product-badges">
//           {/* Discount badge */}
//           {isOnSale && <span className="badge badge-sale">-{discount}%</span>}

//           {/* Low stock */}
//           {stock > 0 && stock < 10 && (
//             <span className="badge badge-low-stock">Only {stock} left</span>
//           )}

//           {/* Out of stock */}
//           {stock === 0 && (
//             <span className="badge badge-out-of-stock">Out of Stock</span>
//           )}
//         </div>

//         {/* =================================================
//             WISHLIST
//         ================================================== */}

//         <button
//           type="button"
//           className={`wishlist-btn ${isWishlisted ? "active" : ""}`}
//           onClick={handleWishlist}
//           aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
//         >
//           <svg
//             width="20"
//             height="20"
//             viewBox="0 0 24 24"
//             fill={isWishlisted ? "#d9534f" : "none"}
//             stroke={isWishlisted ? "#d9534f" : "currentColor"}
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
//           </svg>
//         </button>

//         {/* =================================================
//             QUICK ACTIONS
//         ================================================== */}

//         <div className="product-quick-actions">
//           <button
//             type="button"
//             className="btn-quick-add"
//             disabled={stock === 0}
//           >
//             <svg
//               width="18"
//               height="18"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <line x1="12" y1="5" x2="12" y2="19" />
//               <line x1="5" y1="12" x2="19" y2="12" />
//             </svg>

//             {stock === 0 ? "Out of Stock" : "Quick Add"}
//           </button>

//           <Link
//             to={`/product/${product?._id}`}
//             className="btn-quick-view"
//             aria-label={`View ${product?.name || "product"}`}
//           >
//             <svg
//               width="18"
//               height="18"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
//               <circle cx="12" cy="12" r="3" />
//             </svg>
//           </Link>
//         </div>
//       </div>

//       {/* =====================================================
//           PRODUCT INFORMATION
//       ====================================================== */}

//       <div className="product-info">
//         <div className="product-meta">
//           {/* Category */}
//           <span className="product-category">
//             {product?.category?.icon || "🧶"}{" "}
//             {product?.category?.name || "Crochet"}
//           </span>

//           {/* Stock status */}
//           {stock > 0 ? (
//             <span className="stock-status in-stock">● In Stock</span>
//           ) : (
//             <span className="stock-status out-of-stock">● Out of Stock</span>
//           )}
//         </div>

//         {/* Product name */}
//         <h3 className="product-name">
//           <Link to={`/product/${product?._id}`}>
//             {product?.name || "Unnamed Product"}
//           </Link>
//         </h3>

//         {/* =================================================
//             RATING
//         ================================================== */}

//         <div className="product-rating">
//           <div className="stars">
//             {[...Array(5)].map((_, i) => (
//               <span
//                 key={i}
//                 className={`star ${i < Math.floor(rating) ? "filled" : ""}`}
//                 style={{
//                   opacity: i < Math.floor(rating) ? 1 : 0.2,
//                 }}
//               >
//                 ★
//               </span>
//             ))}
//           </div>

//           <span className="rating-value">{rating.toFixed(1)}</span>

//           <span className="review-count">({reviewCount})</span>
//         </div>

//         {/* =================================================
//             PRICE
//         ================================================== */}

//         <div className="product-pricing">
//           {isOnSale ? (
//             <>
//               {/* Original price */}
//               <span className="price-original">₹{price.toFixed(2)}</span>

//               {/* Discounted price */}
//               <span className="price-sale">₹{discountedPrice.toFixed(2)}</span>
//             </>
//           ) : (
//             <span className="price">₹{price.toFixed(2)}</span>
//           )}
//         </div>

//         {/* =================================================
//             VIEW DETAILS
//         ================================================== */}

//         <Link to={`/product/${product?._id}`} className="btn-view-details">
//           View Details
//           <svg
//             width="16"
//             height="16"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <line x1="5" y1="12" x2="19" y2="12" />
//             <polyline points="12 5 19 12 12 19" />
//           </svg>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import "../styles/product.css";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // ----------------------------------------------------------
  // Product data
  // ----------------------------------------------------------

  const rating = Number(product?.ratings) || 0;
  const reviewCount = Number(product?.numReviews) || 0;
  const stock = Number(product?.stock) || 0;
  const price = Number(product?.price) || 0;

  // Discount is a real field from the backend
  const discount = Number(product?.discount) || 0;

  // Product is on sale when discount is greater than 0
  const isOnSale = discount > 0;

  // Calculate final selling price
  const discountedPrice = price - (price * discount) / 100;

  // ----------------------------------------------------------
  // Quick Add
  // ----------------------------------------------------------

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Product cannot be added when out of stock
    if (stock <= 0) {
      return;
    }

    // Read existing cart from localStorage so we can
    // increase quantity instead of resetting it to 1.
    const existingCart = localStorage.getItem("cartItems");

    const cartItems = existingCart ? JSON.parse(existingCart) : [];

    const existingItem = cartItems.find(
      (item) => item.productId === product._id,
    );

    // Do not allow quantity to exceed available stock
    const currentQty = existingItem?.qty || 0;

    if (currentQty >= stock) {
      return;
    }

    const cartItem = {
      productId: product._id,
      name: product.name,
      imageUrl: product.imageUrl,

      // IMPORTANT:
      // Cart stores the FINAL SELLING PRICE,
      // not the original product price.
      price: Number(discountedPrice.toFixed(2)),

      // Keep these available for future cart UI
      originalPrice: price,
      discount: discount,

      qty: currentQty + 1,
    };

    dispatch(addToCart(cartItem));
  };

  // ----------------------------------------------------------
  // Wishlist
  // ----------------------------------------------------------

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsWishlisted((prev) => !prev);
  };

  // ----------------------------------------------------------
  // Render
  // ----------------------------------------------------------

  return (
    <div className="product-card">
      {/* =====================================================
          IMAGE SECTION
      ====================================================== */}

      <div className="product-image-wrapper">
        {!imageLoaded && (
          <div className="product-image-loading">
            <div className="spinner-small"></div>
          </div>
        )}

        {product?.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name || "Crochet product"}
            className={`product-image ${imageLoaded ? "loaded" : ""}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(true)}
            loading="lazy"
          />
        ) : (
          <div className="product-image-placeholder">🧶</div>
        )}

        {/* =================================================
            BADGES
        ================================================== */}

        <div className="product-badges">
          {/* Discount badge */}
          {isOnSale && <span className="badge badge-sale">-{discount}%</span>}

          {/* Low stock */}
          {stock > 0 && stock < 10 && (
            <span className="badge badge-low-stock">Only {stock} left</span>
          )}

          {/* Out of stock */}
          {stock === 0 && (
            <span className="badge badge-out-of-stock">Out of Stock</span>
          )}
        </div>

        {/* =================================================
            WISHLIST
        ================================================== */}

        <button
          type="button"
          className={`wishlist-btn ${isWishlisted ? "active" : ""}`}
          onClick={handleWishlist}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={isWishlisted ? "#d9534f" : "none"}
            stroke={isWishlisted ? "#d9534f" : "currentColor"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* =================================================
            QUICK ACTIONS
        ================================================== */}

        <div className="product-quick-actions">
          <button
            type="button"
            className="btn-quick-add"
            disabled={stock === 0}
            onClick={handleQuickAdd}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>

            {stock === 0 ? "Out of Stock" : "Quick Add"}
          </button>

          <Link
            to={`/product/${product?._id}`}
            className="btn-quick-view"
            aria-label={`View ${product?.name || "product"}`}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* =====================================================
          PRODUCT INFORMATION
      ====================================================== */}

      <div className="product-info">
        <div className="product-meta">
          {/* Category */}
          <span className="product-category">
            {product?.category?.icon || "🧶"}{" "}
            {product?.category?.name || "Crochet"}
          </span>

          {/* Stock status */}
          {stock > 0 ? (
            <span className="stock-status in-stock">● In Stock</span>
          ) : (
            <span className="stock-status out-of-stock">● Out of Stock</span>
          )}
        </div>

        {/* Product name */}
        <h3 className="product-name">
          <Link to={`/product/${product?._id}`}>
            {product?.name || "Unnamed Product"}
          </Link>
        </h3>

        {/* =================================================
            RATING
        ================================================== */}

        <div className="product-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`star ${i < Math.floor(rating) ? "filled" : ""}`}
                style={{
                  opacity: i < Math.floor(rating) ? 1 : 0.2,
                }}
              >
                ★
              </span>
            ))}
          </div>

          <span className="rating-value">{rating.toFixed(1)}</span>

          <span className="review-count">({reviewCount})</span>
        </div>

        {/* =================================================
            PRICE
        ================================================== */}

        <div className="product-pricing">
          {isOnSale ? (
            <>
              {/* Original price */}
              <span className="price-original">₹{price.toFixed(2)}</span>

              {/* Discounted price */}
              <span className="price-sale">₹{discountedPrice.toFixed(2)}</span>
            </>
          ) : (
            <span className="price">₹{price.toFixed(2)}</span>
          )}
        </div>

        {/* =================================================
            VIEW DETAILS
        ================================================== */}

        <Link to={`/product/${product?._id}`} className="btn-view-details">
          View Details
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />

            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
