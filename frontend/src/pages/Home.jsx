// import React, { useEffect, useState, useCallback, memo, useMemo } from "react";
// import { Link } from "react-router-dom";
// import ProductCard from "../components/ProductCard";
// import "../styles/home1.css";

// // ------------------------------------------------------------
// // Custom hook for data fetching with abort control
// // ------------------------------------------------------------
// const useFetch = (url, initialData = []) => {
//   const [data, setData] = useState(initialData);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const abortController = new AbortController();

//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const res = await fetch(url, {
//           signal: abortController.signal,
//         });

//         if (!res.ok) {
//           let errorMessage = `HTTP ${res.status}`;

//           try {
//             const errorData = await res.json();

//             if (errorData?.message) {
//               errorMessage = errorData.message;
//             }
//           } catch {
//             // Response was not JSON
//           }

//           throw new Error(errorMessage);
//         }

//         const json = await res.json();

//         setData(Array.isArray(json) ? json : []);
//       } catch (err) {
//         if (err.name !== "AbortError") {
//           console.error(`Fetch error for ${url}:`, err);

//           setError(err.message || "Something went wrong");
//           setData([]);
//         }
//       } finally {
//         if (!abortController.signal.aborted) {
//           setLoading(false);
//         }
//       }
//     };

//     fetchData();

//     return () => {
//       abortController.abort();
//     };
//   }, [url]);

//   return { data, loading, error };
// };

// // ------------------------------------------------------------
// // Memoized category card
// // ------------------------------------------------------------
// const CategoryCard = memo(({ category }) => (
//   <Link
//     to={`/shop?category=${encodeURIComponent(category.slug)}`}
//     className="category-card"
//     aria-label={`Shop ${category.name}`}
//   >
//     <span className="category-icon" role="img" aria-hidden="true">
//       {category.icon || "🧶"}
//     </span>

//     <h4>{category.name}</h4>

//     <span className="category-arrow" aria-hidden="true">
//       →
//     </span>
//   </Link>
// ));

// CategoryCard.displayName = "CategoryCard";

// // ------------------------------------------------------------
// // Main Home component
// // ------------------------------------------------------------
// const Home = () => {
//   // ----------------------------------------------------------
//   // Fetch ONLY featured products
//   //
//   // IMPORTANT:
//   // Your backend supports:
//   // GET /api/products?featured=true
//   //
//   // It does NOT support:
//   // GET /api/products/featured
//   // ----------------------------------------------------------
//   const {
//     data: featuredProductsRaw,
//     loading: productsLoading,
//     error: productsError,
//   } = useFetch("/api/products?featured=true");

//   // Show only the first 4 featured products on homepage
//   const featuredProducts = useMemo(() => {
//     if (!Array.isArray(featuredProductsRaw)) {
//       return [];
//     }

//     return featuredProductsRaw.slice(0, 4);
//   }, [featuredProductsRaw]);

//   // ----------------------------------------------------------
//   // Fetch categories
//   // ----------------------------------------------------------
//   const {
//     data: categories,
//     loading: categoriesLoading,
//     error: categoriesError,
//   } = useFetch("/api/categories");

//   // ------------------------------------------------------------
//   // Render helpers
//   // ------------------------------------------------------------
//   const renderCategorySkeletons = useCallback(
//     (count = 8) =>
//       Array.from({ length: count }).map((_, i) => (
//         <div key={`cat-sk-${i}`} className="category-card category-skeleton">
//           <span className="category-icon">🧶</span>
//           <h4>Loading…</h4>
//         </div>
//       )),
//     [],
//   );

//   const renderProductSkeletons = useCallback(
//     (count = 4) =>
//       Array.from({ length: count }).map((_, i) => (
//         <div key={`prod-sk-${i}`} className="skeleton-card" />
//       )),
//     [],
//   );

//   return (
//     <div className="home-page">
//       {/* ===== HERO ===== */}
//       <section className="hero-section" aria-labelledby="hero-heading">
//         <div className="hero-pattern" aria-hidden="true" />

//         <div className="container">
//           <div className="hero-content">
//             <div className="hero-text">
//               <span className="hero-badge">✦ Handmade with Love</span>

//               <h1 id="hero-heading">
//                 Artisan Crochet
//                 <br />
//                 for <span className="highlight">Every Moment</span>
//               </h1>

//               <p>
//                 Discover our collection of handcrafted crochet treasures — from
//                 beautiful bouquets to cozy plushies, each piece is made with
//                 care and attention to detail.
//               </p>

//               <div className="hero-actions">
//                 <Link to="/shop" className="btn btn-primary">
//                   Explore Collection
//                   <svg
//                     width="20"
//                     height="20"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2.5"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     aria-hidden="true"
//                   >
//                     <path d="M5 12h14M12 5l7 7-7 7" />
//                   </svg>
//                 </Link>

//                 <Link to="/contact" className="btn btn-outline">
//                   Custom Order
//                 </Link>
//               </div>
//             </div>

//             <div className="hero-visual">
//               <div className="hero-image-grid">
//                 <div className="hero-grid-item">
//                   <img
//                     src="/redFlowerBouquet.jpeg"
//                     alt="Handcrafted crochet bouquet in red tones"
//                     loading="lazy"
//                   />
//                 </div>

//                 <div className="hero-grid-item">
//                   <img
//                     src="/crochet2faceplushies.webp"
//                     alt="Adorable crochet plushies with sweet faces"
//                     loading="lazy"
//                   />
//                 </div>

//                 <div className="hero-grid-item">
//                   <img
//                     src="/crochetmulticolorbag.jpg"
//                     alt="Colorful crochet shoulder bag"
//                     loading="lazy"
//                   />
//                 </div>

//                 <div className="hero-grid-item">
//                   <img
//                     src="/crochetiphonecase.jpg"
//                     alt="Crochet phone case in pastel colors"
//                     loading="lazy"
//                   />
//                 </div>
//               </div>

//               <span
//                 className="hero-floating hero-floating--yarn"
//                 aria-hidden="true"
//               >
//                 🧶
//               </span>

//               <span
//                 className="hero-floating hero-floating--flower"
//                 aria-hidden="true"
//               >
//                 🌸
//               </span>
//             </div>
//           </div>
//         </div>

//         <div className="hero-wave" aria-hidden="true">
//           <svg
//             viewBox="0 0 1440 120"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//             preserveAspectRatio="none"
//           >
//             <path
//               d="M0 60L60 65C120 70 240 80 360 75C480 70 600 50 720 50C840 50 960 70 1080 75C1200 80 1320 70 1380 65L1440 60V120H0V60Z"
//               fill="#FCF8F3"
//             />
//           </svg>
//         </div>
//       </section>

//       {/* ===== CATEGORIES ===== */}
//       <section
//         className="categories-section"
//         aria-labelledby="categories-heading"
//       >
//         <div className="container">
//           <div className="section-header">
//             <span className="section-tag">Shop by Category</span>

//             <h2 id="categories-heading">Find Your Perfect Piece</h2>

//             <p>
//               Explore our wide range of handmade crochet items, lovingly crafted
//               for you.
//             </p>
//           </div>

//           {categoriesLoading ? (
//             <div className="categories-grid">{renderCategorySkeletons()}</div>
//           ) : categoriesError ? (
//             <div className="empty-categories">
//               <p>⚠️ {categoriesError}</p>
//             </div>
//           ) : categories.length === 0 ? (
//             <div className="empty-categories">
//               <p>✨ Categories are currently unavailable.</p>
//             </div>
//           ) : (
//             <div className="categories-grid">
//               {categories.map((cat) => (
//                 <CategoryCard key={cat._id} category={cat} />
//               ))}
//             </div>
//           )}
//         </div>
//       </section>

//       {/* ===== FEATURED PRODUCTS ===== */}
//       <section className="featured-section" aria-labelledby="featured-heading">
//         <div className="container">
//           <div className="section-header">
//             <span className="section-tag">Handpicked for You</span>

//             <h2 id="featured-heading">Featured Treasures</h2>

//             <p>
//               Each piece is one-of-a-kind, made with premium yarn and endless
//               care.
//             </p>
//           </div>

//           {productsLoading ? (
//             <div className="product-grid">{renderProductSkeletons()}</div>
//           ) : productsError ? (
//             <div className="empty-products">
//               <p>⚠️ {productsError}</p>
//             </div>
//           ) : featuredProducts.length === 0 ? (
//             <div className="empty-products">
//               <p>🌸 No featured products are currently available.</p>
//             </div>
//           ) : (
//             <div className="product-grid">
//               {featuredProducts.map((product) => (
//                 <ProductCard key={product._id} product={product} />
//               ))}
//             </div>
//           )}

//           <div className="featured-footer">
//             <Link to="/shop" className="btn btn-soft">
//               View All Products
//               <svg
//                 width="18"
//                 height="18"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2.5"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 aria-hidden="true"
//               >
//                 <path d="M5 12h14M12 5l7 7-7 7" />
//               </svg>
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* ===== CUSTOM ORDER ===== */}
//       <section className="custom-section" aria-labelledby="custom-heading">
//         <div className="container">
//           <div className="custom-wrapper">
//             <div className="custom-content">
//               <span className="custom-badge">✦ Made Just for You</span>

//               <h2 id="custom-heading">Custom Crochet Order</h2>

//               <p>
//                 Have a special design in mind? We'll bring your vision to life
//                 with our custom crochet service. Choose your colors, size, and
//                 style — we'll craft it exclusively for you.
//               </p>

//               <ul className="custom-features">
//                 <li>
//                   <span aria-hidden="true">🎨</span> Choose your own colors &
//                   yarn
//                 </li>

//                 <li>
//                   <span aria-hidden="true">📏</span> Custom size & dimensions
//                 </li>

//                 <li>
//                   <span aria-hidden="true">🔄</span> Unlimited revisions until
//                   you love it
//                 </li>

//                 <li>
//                   <span aria-hidden="true">📦</span> Free shipping on custom
//                   orders
//                 </li>
//               </ul>

//               <Link to="/contact" className="btn btn-primary">
//                 Start Your Custom Order
//               </Link>
//             </div>

//             <div className="custom-visual">
//               <img
//                 src="/handmadestichimage.jpg"
//                 alt="Close-up of a crochet piece being handcrafted with love"
//                 className="custom-image"
//                 loading="lazy"
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ===== BULK ORDER ===== */}
//       <section className="bulk-section" aria-labelledby="bulk-heading">
//         <div className="container">
//           <div className="bulk-wrapper">
//             <span className="bulk-icon" aria-hidden="true">
//               📦
//             </span>

//             <h2 id="bulk-heading">Need Bulk Orders?</h2>

//             <p>
//               We accommodate bulk orders for events, gifting, retail, and more.
//               Get special pricing and dedicated support for large quantities.
//             </p>

//             <div className="bulk-stats">
//               <div className="stat">
//                 <span className="stat-number">50+</span>
//                 <span className="stat-label">Items per order</span>
//               </div>

//               <div className="stat">
//                 <span className="stat-number">15%</span>
//                 <span className="stat-label">Bulk discount</span>
//               </div>

//               <div className="stat">
//                 <span className="stat-number">7 days</span>
//                 <span className="stat-label">Fast turnaround</span>
//               </div>
//             </div>

//             <Link to="/contact" className="btn btn-outline btn-light">
//               Inquire About Bulk
//             </Link>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;
import React, { useEffect, useState, useMemo, memo } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "../styles/home.css";

/* ============================================================
   API HOOK
============================================================ */

const useFetch = (url, initialData = []) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(url, {
          signal: controller.signal,
        });

        // Handle non-JSON responses safely
        const contentType = response.headers.get("content-type");

        let result = null;

        if (contentType?.includes("application/json")) {
          result = await response.json();
        } else {
          const text = await response.text();

          throw new Error(
            text || `Request failed with status ${response.status}`,
          );
        }

        if (!response.ok) {
          throw new Error(result?.message || "Unable to load data");
        }

        setData(Array.isArray(result) ? result : []);
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }

        console.error(`Fetch error: ${url}`, error);

        setError(error.message || "Something went wrong. Please try again.");

        setData([]);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url]);

  return {
    data,
    loading,
    error,
  };
};

/* ============================================================
   CATEGORY CARD
============================================================ */

const CategoryCard = memo(({ category }) => {
  /*
    IMPORTANT:
    Keep slug here.

    Example:
    /shop?category=crochetbag

    Shop.jsx will read the slug and convert it into
    the corresponding Category ObjectId before fetching products.
  */

  return (
    <Link
      to={`/shop?category=${encodeURIComponent(category.slug)}`}
      className="home-category-card"
      aria-label={`Shop ${category.name}`}
    >
      <div className="home-category-icon">{category.icon || "🧶"}</div>

      <div className="home-category-content">
        <h3>{category.name}</h3>

        <span className="home-category-link">
          Shop now
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
});

CategoryCard.displayName = "CategoryCard";

/* ============================================================
   CATEGORY SKELETON
============================================================ */

const CategorySkeleton = () => (
  <div className="home-category-card home-skeleton-category">
    <div className="home-skeleton-circle" />

    <div className="home-skeleton-content">
      <div className="home-skeleton-line home-skeleton-line-lg" />
      <div className="home-skeleton-line home-skeleton-line-sm" />
    </div>
  </div>
);

/* ============================================================
   PRODUCT SKELETON
============================================================ */

const ProductSkeleton = () => (
  <div className="home-product-skeleton">
    <div className="home-product-skeleton-image" />

    <div className="home-product-skeleton-content">
      <div className="home-skeleton-line home-skeleton-line-lg" />
      <div className="home-skeleton-line home-skeleton-line-md" />
      <div className="home-skeleton-line home-skeleton-line-sm" />
    </div>
  </div>
);

/* ============================================================
   MAIN HOME PAGE
============================================================ */

const Home = () => {
  /* ----------------------------------------------------------
     FEATURED PRODUCTS
  ---------------------------------------------------------- */

  const {
    data: products,
    loading: productsLoading,
    error: productsError,
  } = useFetch("/api/products?featured=true");

  /* ----------------------------------------------------------
     CATEGORIES
  ---------------------------------------------------------- */

  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useFetch("/api/categories");

  /* ----------------------------------------------------------
     FEATURED PRODUCTS
  ---------------------------------------------------------- */

  const featuredProducts = useMemo(() => {
    if (!Array.isArray(products)) {
      return [];
    }

    return products.slice(0, 4);
  }, [products]);

  /* ----------------------------------------------------------
     VISIBLE CATEGORIES
  ---------------------------------------------------------- */

  const visibleCategories = useMemo(() => {
    if (!Array.isArray(categories)) {
      return [];
    }

    return categories.slice(0, 8);
  }, [categories]);

  return (
    <main className="home-page">
      {/* ======================================================
          HERO
      ====================================================== */}

      <section className="home-hero" aria-labelledby="home-hero-heading">
        <div className="home-container">
          <div className="home-hero-grid">
            {/* HERO CONTENT */}

            <div className="home-hero-content">
              <span className="home-eyebrow">✦ Handmade with love</span>

              <h1 id="home-hero-heading">
                Beautiful crochet,
                <span> made for moments.</span>
              </h1>

              <p>
                Discover handcrafted crochet treasures designed to add warmth,
                personality and a little magic to everyday life.
              </p>

              <div className="home-hero-actions">
                <Link to="/shop" className="home-btn home-btn-primary">
                  Shop Collection
                  <span aria-hidden="true">→</span>
                </Link>

                <Link to="/contact" className="home-btn home-btn-secondary">
                  Custom Order
                </Link>
              </div>

              {/* TRUST POINTS */}

              <div className="home-hero-trust">
                <div className="home-trust-item">
                  <span aria-hidden="true">✓</span>
                  <p>Handcrafted</p>
                </div>

                <div className="home-trust-item">
                  <span aria-hidden="true">✓</span>
                  <p>Made with care</p>
                </div>

                <div className="home-trust-item">
                  <span aria-hidden="true">✓</span>
                  <p>Custom options</p>
                </div>
              </div>
            </div>

            {/* HERO VISUAL */}

            <div className="home-hero-visual">
              <div className="home-hero-main-image">
                <img
                  src="/redFlowerBouquet.jpeg"
                  alt="Handcrafted crochet flower bouquet"
                  fetchPriority="high"
                />
              </div>

              <div className="home-hero-small-image home-hero-small-image-one">
                <img
                  src="/crochet2faceplushies.webp"
                  alt="Cute crochet plushies"
                  loading="lazy"
                />
              </div>

              <div className="home-hero-small-image home-hero-small-image-two">
                <img
                  src="/crochetmulticolorbag.jpg"
                  alt="Colorful handmade crochet bag"
                  loading="lazy"
                />
              </div>

              <div className="home-hero-floating-card">
                <span aria-hidden="true">🧶</span>

                <div>
                  <strong>Made by hand</strong>
                  <small>One stitch at a time</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          VALUE STRIP
      ====================================================== */}

      <section className="home-value-strip" aria-label="Why shop with us">
        <div className="home-container">
          <div className="home-value-grid">
            <div className="home-value-item">
              <span className="home-value-icon" aria-hidden="true">
                🧶
              </span>

              <div>
                <h3>100% Handmade</h3>
                <p>Crafted with patience and care</p>
              </div>
            </div>

            <div className="home-value-item">
              <span className="home-value-icon" aria-hidden="true">
                🎨
              </span>

              <div>
                <h3>Custom Designs</h3>
                <p>Choose colors, sizes and styles</p>
              </div>
            </div>

            <div className="home-value-item">
              <span className="home-value-icon" aria-hidden="true">
                🎁
              </span>

              <div>
                <h3>Perfect for Gifting</h3>
                <p>Thoughtful handmade creations</p>
              </div>
            </div>

            <div className="home-value-item">
              <span className="home-value-icon" aria-hidden="true">
                📦
              </span>

              <div>
                <h3>Bulk Orders</h3>
                <p>Special pricing available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          CATEGORIES
      ====================================================== */}

      {/* <section
        className="home-section home-categories-section"
        aria-labelledby="categories-heading"
      >
        <div className="home-container">
          <div className="home-section-heading">
            <div>
              <span className="home-section-eyebrow">
                Explore our collection
              </span>

              <h2 id="categories-heading">Shop by category</h2>
            </div>

            <Link to="/shop" className="home-section-link">
              View all
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {categoriesLoading ? (
            <div className="home-category-grid">
              {Array.from({ length: 8 }).map((_, index) => (
                <CategorySkeleton key={index} />
              ))}
            </div>
          ) : categoriesError ? (
            <div className="home-state" role="alert">
              <span aria-hidden="true">⚠️</span>

              <h3>Unable to load categories</h3>

              <p>{categoriesError}</p>
            </div>
          ) : visibleCategories.length === 0 ? (
            <div className="home-state">
              <span aria-hidden="true">🧶</span>

              <h3>No categories available</h3>

              <p>Check back soon for our new collections.</p>
            </div>
          ) : (
            <div className="home-category-grid">
              {visibleCategories.map((category) => (
                <CategoryCard key={category._id} category={category} />
              ))}
            </div>
          )}
        </div>
      </section> */}

      {/* ======================================================
          FEATURED PRODUCTS
      ====================================================== */}

      <section
        className="home-section home-featured-section"
        aria-labelledby="featured-heading"
      >
        <div className="home-container">
          <div className="home-section-heading">
            <div>
              <span className="home-section-eyebrow">Handpicked for you</span>

              <h2 id="featured-heading">Featured treasures</h2>

              <p>Discover some of our most loved handmade creations.</p>
            </div>

            <Link to="/shop" className="home-section-link">
              Shop all
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {productsLoading ? (
            <div className="home-product-grid">
              {Array.from({ length: 4 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          ) : productsError ? (
            <div className="home-state" role="alert">
              <span aria-hidden="true">⚠️</span>

              <h3>Unable to load products</h3>

              <p>{productsError}</p>

              <Link to="/shop" className="home-btn home-btn-primary">
                Visit Shop
              </Link>
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="home-state">
              <span aria-hidden="true">🌸</span>

              <h3>Featured products coming soon</h3>

              <p>We're preparing something beautiful for you.</p>

              <Link to="/shop" className="home-btn home-btn-primary">
                Browse Shop
              </Link>
            </div>
          ) : (
            <div className="home-product-grid">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ======================================================
          CUSTOM ORDER
      ====================================================== */}

      <section className="home-custom-section" aria-labelledby="custom-heading">
        <div className="home-container">
          <div className="home-custom-card">
            <div className="home-custom-content">
              <span className="home-section-eyebrow">Made just for you</span>

              <h2 id="custom-heading">Have something special in mind?</h2>

              <p>
                Turn your idea into a one-of-a-kind crochet creation. Choose
                your colors, style and size, and we'll handcraft it especially
                for you.
              </p>

              <div className="home-custom-features">
                <span>✓ Custom colors</span>
                <span>✓ Custom sizes</span>
                <span>✓ Personalized designs</span>
              </div>

              <Link to="/contact" className="home-btn home-btn-primary">
                Start a Custom Order
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="home-custom-image">
              <img
                src="/handmadestichimage.jpg"
                alt="Handmade crochet work in progress"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          BULK ORDER
      ====================================================== */}

      <section className="home-bulk-section" aria-labelledby="bulk-heading">
        <div className="home-container">
          <div className="home-bulk-card">
            <div className="home-bulk-icon" aria-hidden="true">
              📦
            </div>

            <div className="home-bulk-content">
              <span className="home-section-eyebrow">
                For businesses & events
              </span>

              <h2 id="bulk-heading">Looking for bulk orders?</h2>

              <p>
                Whether you're a retailer, event organizer, gifting company or
                simply need a larger quantity, we can help.
              </p>
            </div>

            <Link to="/contact" className="home-btn home-btn-light">
              Enquire Now
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ======================================================
          FINAL CTA
      ====================================================== */}

      <section className="home-final-cta" aria-labelledby="final-cta-heading">
        <div className="home-container">
          <div className="home-final-content">
            <span className="home-final-icon" aria-hidden="true">
              ✦
            </span>

            <h2 id="final-cta-heading">Handmade feels different.</h2>

            <p>Find something beautiful, thoughtful and uniquely yours.</p>

            <Link to="/shop" className="home-btn home-btn-primary">
              Explore the Collection
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
