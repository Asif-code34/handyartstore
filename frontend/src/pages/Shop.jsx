// import React, { useEffect, useState, useMemo } from "react";
// import { useSearchParams } from "react-router-dom";
// import ProductCard from "../components/ProductCard";
// import "../styles/shop.css";

// const Shop = () => {
//   const [searchParams, setSearchParams] = useSearchParams();

//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);

//   const [loading, setLoading] = useState(true);
//   const [categoriesLoading, setCategoriesLoading] = useState(true);

//   // Search and category are controlled by the URL.
//   const [search, setSearch] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("all");

//   // Sorting and pagination remain local state for now.
//   const [sortBy, setSortBy] = useState("featured");
//   const [currentPage, setCurrentPage] = useState(1);

//   const productsPerPage = 12;

//   /*
//    * ============================================================
//    * FETCH PRODUCTS
//    * ============================================================
//    */

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);

//         const res = await fetch("/api/products");
//         const data = await res.json();

//         if (!res.ok) {
//           throw new Error(data.message || "Failed to fetch products");
//         }

//         setProducts(Array.isArray(data) ? data : []);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         setProducts([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   /*
//    * ============================================================
//    * FETCH CATEGORIES
//    * ============================================================
//    */

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         setCategoriesLoading(true);

//         const res = await fetch("/api/categories");
//         const data = await res.json();

//         if (!res.ok) {
//           throw new Error(data.message || "Failed to fetch categories");
//         }

//         setCategories(Array.isArray(data) ? data : []);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//         setCategories([]);
//       } finally {
//         setCategoriesLoading(false);
//       }
//     };

//     fetchCategories();
//   }, []);

//   /*
//    * ============================================================
//    * URL → SEARCH + CATEGORY STATE
//    * ============================================================
//    */

//   useEffect(() => {
//     const searchFromURL = searchParams.get("search") || "";
//     const categoryFromURL = searchParams.get("category");

//     setSearch(searchFromURL);

//     /*
//      * "all" is frontend-only.
//      * If there is no category parameter,
//      * show all products.
//      */
//     setSelectedCategory(categoryFromURL || "all");

//     /*
//      * Whenever URL filters change, always start
//      * from page 1.
//      */
//     setCurrentPage(1);
//   }, [searchParams]);

//   /*
//    * ============================================================
//    * CATEGORY LIST
//    * ============================================================
//    */

//   const shopCategories = useMemo(() => {
//     return [
//       {
//         _id: "all",
//         name: "All",
//         icon: "✨",
//         slug: "all",
//       },
//       ...categories,
//     ];
//   }, [categories]);

//   /*
//    * ============================================================
//    * CATEGORY COLORS
//    * ============================================================
//    */

//   const categoryColors = {
//     all: "#d4a08a",
//     flowers: "#f5a3b3",
//     keychain: "#f5c542",
//     "home-decor": "#8fb08a",
//     toys: "#b5a0d4",
//     "phone-case": "#6ec8d4",
//     pot: "#e8b88a",
//     bag: "#c28a72",
//     hair: "#f0a8c8",
//   };

//   /*
//    * ============================================================
//    * FILTER + SORT PRODUCTS
//    * ============================================================
//    */

//   const filteredAndSorted = useMemo(() => {
//     let result = [...products];

//     /*
//      * ----------------------------------------------------------
//      * SEARCH
//      * ----------------------------------------------------------
//      */

//     if (search.trim()) {
//       const searchTerm = search.toLowerCase().trim();

//       result = result.filter((product) => {
//         const productName = product.name?.toLowerCase() || "";

//         const categoryName = product.category?.name?.toLowerCase() || "";

//         const categorySlug = product.category?.slug?.toLowerCase() || "";

//         const description = product.description?.toLowerCase() || "";

//         return (
//           productName.includes(searchTerm) ||
//           categoryName.includes(searchTerm) ||
//           categorySlug.includes(searchTerm) ||
//           description.includes(searchTerm)
//         );
//       });
//     }

//     /*
//      * ----------------------------------------------------------
//      * CATEGORY
//      * ----------------------------------------------------------
//      */

//     if (selectedCategory !== "all") {
//       result = result.filter(
//         (product) => product.category?.slug === selectedCategory,
//       );
//     }

//     /*
//      * ----------------------------------------------------------
//      * SORT
//      * ----------------------------------------------------------
//      *
//      * IMPORTANT:
//      *
//      * price-low / price-high use the FINAL SELLING PRICE
//      * after applying the product discount.
//      *
//      * featured puts products with isFeatured === true first.
//      *
//      * No separate featured API is required because
//      * isFeatured already comes from /api/products.
//      * ----------------------------------------------------------
//      */

//     switch (sortBy) {
//       case "price-low":
//         result.sort((a, b) => {
//           const priceA = Number(a.price || 0);
//           const discountA = Number(a.discount || 0);

//           const finalPriceA = priceA - (priceA * discountA) / 100;

//           const priceB = Number(b.price || 0);
//           const discountB = Number(b.discount || 0);

//           const finalPriceB = priceB - (priceB * discountB) / 100;

//           return finalPriceA - finalPriceB;
//         });
//         break;

//       case "price-high":
//         result.sort((a, b) => {
//           const priceA = Number(a.price || 0);
//           const discountA = Number(a.discount || 0);

//           const finalPriceA = priceA - (priceA * discountA) / 100;

//           const priceB = Number(b.price || 0);
//           const discountB = Number(b.discount || 0);

//           const finalPriceB = priceB - (priceB * discountB) / 100;

//           return finalPriceB - finalPriceA;
//         });
//         break;

//       case "name":
//         result.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
//         break;

//       case "newest":
//         result.sort(
//           (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
//         );
//         break;

//       case "featured":
//       default:
//         /*
//          * Featured products first.
//          *
//          * true  -> 1
//          * false -> 0
//          *
//          * Therefore true products come first.
//          *
//          * Products with the same featured status keep
//          * their existing backend order (newest first).
//          */
//         result.sort((a, b) => {
//           const featuredA = a.isFeatured ? 1 : 0;
//           const featuredB = b.isFeatured ? 1 : 0;

//           return featuredB - featuredA;
//         });
//         break;
//     }

//     return result;
//   }, [products, search, selectedCategory, sortBy]);

//   /*
//    * ============================================================
//    * PAGINATION
//    * ============================================================
//    */

//   const totalPages = Math.ceil(filteredAndSorted.length / productsPerPage);

//   /*
//    * Safety:
//    *
//    * If filtering reduces the number of pages,
//    * never allow currentPage to point to an empty page.
//    */

//   const safeCurrentPage =
//     totalPages > 0 ? Math.min(currentPage, totalPages) : 1;

//   const paginatedProducts = filteredAndSorted.slice(
//     (safeCurrentPage - 1) * productsPerPage,
//     safeCurrentPage * productsPerPage,
//   );

//   /*
//    * ============================================================
//    * HANDLERS
//    * ============================================================
//    */

//   const handlePageChange = (page) => {
//     if (page < 1 || page > totalPages) {
//       return;
//     }

//     setCurrentPage(page);

//     window.scrollTo({
//       top: 400,
//       behavior: "smooth",
//     });
//   };

//   /*
//    * ============================================================
//    * CATEGORY → URL
//    * ============================================================
//    */

//   const handleCategoryChange = (categorySlug) => {
//     const params = new URLSearchParams(searchParams);

//     if (categorySlug === "all") {
//       params.delete("category");
//     } else {
//       params.set("category", categorySlug);
//     }

//     /*
//      * Search/category changes always start
//      * from the first page.
//      */
//     setCurrentPage(1);

//     setSearchParams(params);
//   };

//   /*
//    * ============================================================
//    * SEARCH → URL
//    * ============================================================
//    */

//   const handleSearchChange = (e) => {
//     const value = e.target.value;

//     const params = new URLSearchParams(searchParams);

//     if (value.trim()) {
//       params.set("search", value);
//     } else {
//       params.delete("search");
//     }

//     /*
//      * Always return to first page when search changes.
//      */
//     setCurrentPage(1);

//     setSearchParams(params);
//   };

//   /*
//    * ============================================================
//    * SORT
//    * ============================================================
//    */

//   const handleSortChange = (e) => {
//     setSortBy(e.target.value);
//     setCurrentPage(1);
//   };

//   /*
//    * ============================================================
//    * CLEAR ALL FILTERS
//    * ============================================================
//    */

//   const clearFilters = () => {
//     setSortBy("featured");
//     setCurrentPage(1);

//     setSearchParams({});
//   };

//   /*
//    * ============================================================
//    * HERO PRODUCTS
//    * ============================================================
//    */

//   const heroProducts = products.slice(0, 4);

//   /*
//    * ============================================================
//    * RENDER
//    * ============================================================
//    */

//   return (
//     <div className="shop-page">
//       {/* ======================================================
//           HERO
//       ====================================================== */}

//       <section className="shop-hero">
//         <div className="shop-hero-bg"></div>

//         <div className="container shop-hero-container">
//           <div className="shop-hero-content">
//             <span className="shop-hero-badge">✦ Handmade with Love</span>

//             <h1>
//               Crochet <span>Treasury</span>
//             </h1>

//             <p>
//               Discover our curated collection of handcrafted crochet items —
//               each piece made with premium yarn and endless care.
//             </p>

//             <div className="shop-hero-stats">
//               <div className="stat">
//                 <span className="stat-number">{products.length}+</span>

//                 <span className="stat-label">Products</span>
//               </div>

//               <div className="stat">
//                 <span className="stat-number">{categories.length}</span>

//                 <span className="stat-label">Categories</span>
//               </div>

//               <div className="stat">
//                 <span className="stat-number">100%</span>

//                 <span className="stat-label">Handmade</span>
//               </div>
//             </div>
//           </div>

//           <div className="shop-hero-visual">
//             <div className="hero-visual-grid">
//               {heroProducts.length > 0 ? (
//                 heroProducts.map((product, index) => (
//                   <div
//                     key={product._id}
//                     className={`hero-visual-item item-${index + 1}`}
//                   >
//                     {product.imageUrl ? (
//                       <img
//                         src={product.imageUrl}
//                         alt={product.name}
//                         loading="lazy"
//                       />
//                     ) : (
//                       <span>🧶</span>
//                     )}
//                   </div>
//                 ))
//               ) : (
//                 <>
//                   <div className="hero-visual-item item-1">🧶</div>

//                   <div className="hero-visual-item item-2">🌸</div>

//                   <div className="hero-visual-item item-3">🧸</div>

//                   <div className="hero-visual-item item-4">👜</div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ======================================================
//           CATEGORIES
//       ====================================================== */}

//       <section className="shop-categories">
//         <div className="container">
//           <div className="categories-header">
//             <span className="section-label">Browse by Category</span>

//             <h2>Find Your Perfect Piece</h2>
//           </div>

//           {categoriesLoading ? (
//             <div className="categories-grid">
//               {[...Array(8)].map((_, index) => (
//                 <div
//                   key={index}
//                   className="category-card"
//                   style={{ opacity: 0.5 }}
//                 >
//                   <span className="category-icon">🧶</span>

//                   <span className="category-name">Loading...</span>

//                   <span className="category-count">—</span>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="categories-grid">
//               {shopCategories.map((category) => {
//                 const color = categoryColors[category.slug] || "#d4a08a";

//                 const isActive = selectedCategory === category.slug;

//                 const count =
//                   category.slug === "all"
//                     ? products.length
//                     : products.filter(
//                         (product) => product.category?.slug === category.slug,
//                       ).length;

//                 return (
//                   <button
//                     type="button"
//                     key={category._id}
//                     className={`category-card ${isActive ? "active" : ""}`}
//                     onClick={() => handleCategoryChange(category.slug)}
//                     style={
//                       isActive
//                         ? {
//                             background: color,
//                             borderColor: color,
//                           }
//                         : {}
//                     }
//                   >
//                     <span
//                       className="category-icon"
//                       style={isActive ? { color: "#fff" } : { color }}
//                     >
//                       {category.icon || "🧶"}
//                     </span>

//                     <span className="category-name">{category.name}</span>

//                     <span className="category-count">{count}</span>
//                   </button>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </section>

//       {/* ======================================================
//           FILTERS
//       ====================================================== */}

//       <div className="shop-filters">
//         <div className="container">
//           <div className="filters-wrapper">
//             {/* Search */}

//             <div className="search-wrapper">
//               <svg
//                 className="search-icon"
//                 width="18"
//                 height="18"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <circle cx="11" cy="11" r="8" />

//                 <line x1="21" y1="21" x2="16.65" y2="16.65" />
//               </svg>

//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 value={search}
//                 onChange={handleSearchChange}
//                 className="search-input"
//                 aria-label="Search products"
//               />

//               {search && (
//                 <button
//                   type="button"
//                   className="search-clear"
//                   onClick={() => {
//                     const params = new URLSearchParams(searchParams);

//                     params.delete("search");

//                     setCurrentPage(1);
//                     setSearchParams(params);
//                   }}
//                   aria-label="Clear search"
//                 >
//                   ✕
//                 </button>
//               )}
//             </div>

//             {/* Sort */}

//             <div className="filters-right">
//               <div className="sort-wrapper">
//                 <label htmlFor="sort-products">Sort</label>

//                 <select
//                   id="sort-products"
//                   value={sortBy}
//                   onChange={handleSortChange}
//                   className="sort-select"
//                 >
//                   <option value="featured">Featured</option>

//                   <option value="newest">Newest</option>

//                   <option value="price-low">Price ↑</option>

//                   <option value="price-high">Price ↓</option>

//                   <option value="name">Name</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Results bar */}

//           <div className="results-bar">
//             <span className="results-count">
//               Showing <strong>{paginatedProducts.length}</strong> of{" "}
//               <strong>{filteredAndSorted.length}</strong> products
//             </span>

//             {(search ||
//               selectedCategory !== "all" ||
//               sortBy !== "featured") && (
//               <button
//                 type="button"
//                 className="clear-filters"
//                 onClick={clearFilters}
//               >
//                 Clear all ✕
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* ======================================================
//           PRODUCTS
//       ====================================================== */}

//       <section className="shop-products">
//         <div className="container">
//           {loading ? (
//             <div className="product-grid skeleton-grid">
//               {[...Array(8)].map((_, index) => (
//                 <div key={index} className="skeleton-card">
//                   <div className="skeleton-image"></div>

//                   <div className="skeleton-text"></div>

//                   <div className="skeleton-text short"></div>
//                 </div>
//               ))}
//             </div>
//           ) : filteredAndSorted.length === 0 ? (
//             <div className="empty-state">
//               <div className="empty-icon">🔍</div>

//               <h3>No products found</h3>

//               <p>
//                 Try adjusting your search or filters to find what you're looking
//                 for.
//               </p>

//               <button
//                 type="button"
//                 className="btn btn-primary"
//                 onClick={clearFilters}
//               >
//                 View All Products
//               </button>
//             </div>
//           ) : (
//             <>
//               <div className="product-grid">
//                 {paginatedProducts.map((product) => (
//                   <ProductCard key={product._id} product={product} />
//                 ))}
//               </div>

//               {/* Pagination */}

//               {totalPages > 1 && (
//                 <div className="pagination">
//                   <button
//                     type="button"
//                     className="pagination-btn"
//                     disabled={safeCurrentPage === 1}
//                     onClick={() => handlePageChange(safeCurrentPage - 1)}
//                   >
//                     ←
//                   </button>

//                   <div className="pagination-pages">
//                     {[...Array(totalPages)].map((_, index) => {
//                       const page = index + 1;

//                       if (
//                         page === 1 ||
//                         page === totalPages ||
//                         Math.abs(page - safeCurrentPage) <= 1
//                       ) {
//                         return (
//                           <button
//                             type="button"
//                             key={page}
//                             className={`pagination-page ${
//                               safeCurrentPage === page ? "active" : ""
//                             }`}
//                             onClick={() => handlePageChange(page)}
//                           >
//                             {page}
//                           </button>
//                         );
//                       }

//                       if (
//                         (page === 2 && safeCurrentPage > 3) ||
//                         (page === totalPages - 1 &&
//                           safeCurrentPage < totalPages - 2)
//                       ) {
//                         return (
//                           <span key={page} className="pagination-ellipsis">
//                             …
//                           </span>
//                         );
//                       }

//                       return null;
//                     })}
//                   </div>

//                   <button
//                     type="button"
//                     className="pagination-btn"
//                     disabled={safeCurrentPage === totalPages}
//                     onClick={() => handlePageChange(safeCurrentPage + 1)}
//                   >
//                     →
//                   </button>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Shop;

import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "../styles/shop.css";

/* ============================================================
   CONSTANTS
============================================================ */

const PRODUCTS_PER_PAGE = 12;

const CATEGORY_COLORS = {
  all: "#d4a08a",
  crochetflowersbouquet: "#f5a3b3",
  crochetkeychain: "#f5c542",
  homedecor: "#8fb08a",
  crochetoysplushies: "#b5a0d4",
  crochetphonecase: "#6ec8d4",
  crochetpot: "#e8b88a",
  crochettbag: "#c28a72",
  crochethairaccessories: "#f0a8c8",

  // Existing possible slugs
  flowers: "#f5a3b3",
  keychain: "#f5c542",
  "home-decor": "#8fb08a",
  toys: "#b5a0d4",
  "phone-case": "#6ec8d4",
  pot: "#e8b88a",
  bag: "#c28a72",
  hair: "#f0a8c8",
};

const DEFAULT_CATEGORY_COLOR = "#d4a08a";

/* ============================================================
   HELPERS
============================================================ */

const getFinalPrice = (product) => {
  const price = Number(product?.price || 0);
  const discount = Number(product?.discount || 0);

  if (!discount) {
    return price;
  }

  return price - (price * discount) / 100;
};

const normalizeSearch = (value = "") => {
  return value.trim().toLowerCase();
};

/* ============================================================
   PRODUCT SKELETON
============================================================ */

const ProductSkeleton = () => {
  return (
    <div className="shop-skeleton-card" aria-hidden="true">
      <div className="shop-skeleton-image" />

      <div className="shop-skeleton-content">
        <div className="shop-skeleton-line shop-skeleton-line-lg" />
        <div className="shop-skeleton-line shop-skeleton-line-md" />
        <div className="shop-skeleton-line shop-skeleton-line-sm" />
      </div>
    </div>
  );
};

/* ============================================================
   CATEGORY SKELETON
============================================================ */

const CategorySkeleton = () => {
  return (
    <div className="shop-category-skeleton" aria-hidden="true">
      <div className="shop-category-skeleton-icon" />
      <div className="shop-category-skeleton-line" />
      <div className="shop-category-skeleton-small" />
    </div>
  );
};

/* ============================================================
   EMPTY STATE
============================================================ */

const EmptyState = ({ onClear }) => {
  return (
    <div className="shop-empty-state">
      <div className="shop-empty-icon" aria-hidden="true">
        🔍
      </div>

      <h2>No products found</h2>

      <p>
        We couldn't find anything matching your current search or category. Try
        changing your filters.
      </p>

      <button
        type="button"
        className="shop-btn shop-btn-primary"
        onClick={onClear}
      >
        View all products
      </button>
    </div>
  );
};

/* ============================================================
   MAIN SHOP
============================================================ */

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  const [productsError, setProductsError] = useState("");
  const [categoriesError, setCategoriesError] = useState("");

  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);

  /* ==========================================================
     URL STATE
  ========================================================== */

  const search = searchParams.get("search") || "";
  const selectedCategory = searchParams.get("category") || "all";

  /* ==========================================================
     FETCH PRODUCTS
  ========================================================== */

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setProductsError("");

        /*
         * IMPORTANT:
         *
         * We intentionally fetch ALL products here.
         *
         * Why?
         *
         * The current backend:
         *
         * GET /api/products?category=
         *
         * expects Category ObjectId.
         *
         * But the frontend URL uses category slug.
         *
         * Therefore we filter using:
         *
         * product.category.slug
         *
         * on the frontend.
         */

        const response = await fetch("/api/products", {
          signal: controller.signal,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.message || "Failed to load products.");
        }

        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }

        console.error("Shop products error:", error);

        setProductsError(error.message || "Unable to load products.");

        setProducts([]);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      controller.abort();
    };
  }, []);

  /* ==========================================================
     FETCH CATEGORIES
  ========================================================== */

  useEffect(() => {
    const controller = new AbortController();

    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        setCategoriesError("");

        const response = await fetch("/api/categories", {
          signal: controller.signal,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.message || "Failed to load categories.");
        }

        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }

        console.error("Shop categories error:", error);

        setCategoriesError(error.message || "Unable to load categories.");

        setCategories([]);
      } finally {
        if (!controller.signal.aborted) {
          setCategoriesLoading(false);
        }
      }
    };

    fetchCategories();

    return () => {
      controller.abort();
    };
  }, []);

  /* ==========================================================
     RESET PAGE WHEN URL FILTERS CHANGE
  ========================================================== */

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory]);

  /* ==========================================================
     CATEGORY LIST
  ========================================================== */

  const shopCategories = useMemo(() => {
    return [
      {
        _id: "all",
        name: "All Products",
        slug: "all",
        icon: "✨",
      },
      ...categories,
    ];
  }, [categories]);

  /* ==========================================================
     SELECTED CATEGORY OBJECT
  ========================================================== */

  const activeCategory = useMemo(() => {
    if (selectedCategory === "all") {
      return null;
    }

    return (
      categories.find((category) => category.slug === selectedCategory) || null
    );
  }, [categories, selectedCategory]);

  /* ==========================================================
     FILTER PRODUCTS
  ========================================================== */

  const filteredProducts = useMemo(() => {
    let result = [...products];

    /* --------------------------------------------------------
       SEARCH
    -------------------------------------------------------- */

    const searchTerm = normalizeSearch(search);

    if (searchTerm) {
      result = result.filter((product) => {
        const name = normalizeSearch(product.name);
        const description = normalizeSearch(product.description);

        const categoryName = normalizeSearch(product.category?.name);

        const categorySlug = normalizeSearch(product.category?.slug);

        return (
          name.includes(searchTerm) ||
          description.includes(searchTerm) ||
          categoryName.includes(searchTerm) ||
          categorySlug.includes(searchTerm)
        );
      });
    }

    /* --------------------------------------------------------
       CATEGORY

       URL:
       /shop?category=crochetbag

       Product:
       product.category.slug === "crochetbag"
    -------------------------------------------------------- */

    if (selectedCategory !== "all") {
      result = result.filter(
        (product) => product.category?.slug === selectedCategory,
      );
    }

    return result;
  }, [products, search, selectedCategory]);

  /* ==========================================================
     SORT PRODUCTS
  ========================================================== */

  const sortedProducts = useMemo(() => {
    const result = [...filteredProducts];

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => getFinalPrice(a) - getFinalPrice(b));
        break;

      case "price-high":
        result.sort((a, b) => getFinalPrice(b) - getFinalPrice(a));
        break;

      case "name":
        result.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
        break;

      case "newest":
        result.sort(
          (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
        );
        break;

      case "featured":
      default:
        result.sort((a, b) => {
          const featuredA = a.isFeatured ? 1 : 0;
          const featuredB = b.isFeatured ? 1 : 0;

          if (featuredA !== featuredB) {
            return featuredB - featuredA;
          }

          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        });

        break;
    }

    return result;
  }, [filteredProducts, sortBy]);

  /* ==========================================================
     PAGINATION
  ========================================================== */

  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);

  const safeCurrentPage =
    totalPages === 0 ? 1 : Math.min(currentPage, totalPages);

  const paginatedProducts = useMemo(() => {
    const start = (safeCurrentPage - 1) * PRODUCTS_PER_PAGE;

    const end = start + PRODUCTS_PER_PAGE;

    return sortedProducts.slice(start, end);
  }, [sortedProducts, safeCurrentPage]);

  /* ==========================================================
     PRODUCT COUNTS
  ========================================================== */

  const getCategoryCount = (slug) => {
    if (slug === "all") {
      return products.length;
    }

    return products.filter((product) => product.category?.slug === slug).length;
  };

  /* ==========================================================
     CATEGORY NAVIGATION
  ========================================================== */

  const handleCategoryChange = (slug) => {
    const params = new URLSearchParams(searchParams);

    if (slug === "all") {
      params.delete("category");
    } else {
      params.set("category", slug);
    }

    setCurrentPage(1);
    setSearchParams(params);
  };

  /* ==========================================================
     SEARCH
  ========================================================== */

  const handleSearchChange = (event) => {
    const value = event.target.value;

    const params = new URLSearchParams(searchParams);

    if (value.trim()) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    setCurrentPage(1);
    setSearchParams(params);
  };

  /* ==========================================================
     CLEAR SEARCH
  ========================================================== */

  const clearSearch = () => {
    const params = new URLSearchParams(searchParams);

    params.delete("search");

    setCurrentPage(1);
    setSearchParams(params);
  };

  /* ==========================================================
     CLEAR ALL FILTERS
  ========================================================== */

  const clearFilters = () => {
    setSortBy("featured");
    setCurrentPage(1);
    setSearchParams({});
  };

  /* ==========================================================
     SORT
  ========================================================== */

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setCurrentPage(1);
  };

  /* ==========================================================
     PAGINATION
  ========================================================== */

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages || page === safeCurrentPage) {
      return;
    }

    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* ==========================================================
     PAGE NUMBERS
  ========================================================== */

  const paginationItems = useMemo(() => {
    if (totalPages <= 1) {
      return [];
    }

    const pages = [];

    for (let page = 1; page <= totalPages; page++) {
      const shouldShow =
        page === 1 ||
        page === totalPages ||
        Math.abs(page - safeCurrentPage) <= 1;

      if (shouldShow) {
        pages.push(page);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }

    return pages;
  }, [totalPages, safeCurrentPage]);

  /* ==========================================================
     HERO PRODUCTS
  ========================================================== */

  const heroProducts = useMemo(() => {
    return products.slice(0, 4);
  }, [products]);

  /* ==========================================================
     ACTIVE FILTER?
  ========================================================== */

  const hasActiveFilters =
    Boolean(search.trim()) ||
    selectedCategory !== "all" ||
    sortBy !== "featured";

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <main className="shop-page">
      {/* ======================================================
          HERO
      ====================================================== */}

      <section className="shop-hero">
        <div className="shop-hero-bg" />

        <div className="container shop-hero-container">
          <div className="shop-hero-content">
            <span className="shop-hero-badge">✦ Handmade with Love</span>

            <h1>
              Crochet <span>Treasury</span>
            </h1>

            <p>
              Discover our curated collection of handcrafted crochet pieces —
              made with premium yarn, patience and plenty of love.
            </p>

            <div className="shop-hero-stats">
              <div className="stat">
                <span className="stat-number">{products.length}+</span>

                <span className="stat-label">Products</span>
              </div>

              <div className="stat">
                <span className="stat-number">{categories.length}</span>

                <span className="stat-label">Categories</span>
              </div>

              <div className="stat">
                <span className="stat-number">100%</span>

                <span className="stat-label">Handmade</span>
              </div>
            </div>
          </div>

          <div className="shop-hero-visual">
            <div className="hero-visual-grid">
              {heroProducts.length > 0 ? (
                heroProducts.map((product, index) => (
                  <div
                    key={product._id}
                    className={`hero-visual-item item-${index + 1}`}
                  >
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        loading="lazy"
                      />
                    ) : (
                      <span aria-hidden="true">🧶</span>
                    )}
                  </div>
                ))
              ) : (
                <>
                  <div className="hero-visual-item item-1">🧶</div>

                  <div className="hero-visual-item item-2">🌸</div>

                  <div className="hero-visual-item item-3">🧸</div>

                  <div className="hero-visual-item item-4">👜</div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          CATEGORIES
      ====================================================== */}

      <section className="shop-categories">
        <div className="container">
          <div className="categories-header">
            <div>
              <span className="section-label">Browse our collection</span>

              <h2>Shop by category</h2>
            </div>

            {selectedCategory !== "all" && activeCategory && (
              <span className="active-category-label">
                {activeCategory.icon || "🧶"} {activeCategory.name}
              </span>
            )}
          </div>

          {categoriesLoading ? (
            <div className="categories-grid">
              {Array.from({
                length: 8,
              }).map((_, index) => (
                <CategorySkeleton key={index} />
              ))}
            </div>
          ) : categoriesError ? (
            <div className="shop-inline-error">
              <span>⚠️</span>

              <p>{categoriesError}</p>
            </div>
          ) : (
            <div className="categories-grid">
              {shopCategories.map((category) => {
                const isActive = selectedCategory === category.slug;

                const color =
                  CATEGORY_COLORS[category.slug] || DEFAULT_CATEGORY_COLOR;

                const count = getCategoryCount(category.slug);

                return (
                  <button
                    type="button"
                    key={category._id}
                    className={`category-card ${isActive ? "active" : ""}`}
                    onClick={() => handleCategoryChange(category.slug)}
                    style={
                      isActive
                        ? {
                            background: color,
                            borderColor: color,
                          }
                        : undefined
                    }
                    aria-pressed={isActive}
                  >
                    <span
                      className="category-icon"
                      style={{
                        color: isActive ? "#fff" : color,
                      }}
                    >
                      {category.icon || "🧶"}
                    </span>

                    <span className="category-name">{category.name}</span>

                    <span className="category-count">{count}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ======================================================
          FILTER BAR
      ====================================================== */}

      <section className="shop-filters">
        <div className="container">
          <div className="filters-wrapper">
            {/* SEARCH */}

            <div className="search-wrapper">
              <svg
                className="search-icon"
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />

                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>

              <input
                type="search"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search products..."
                className="search-input"
                aria-label="Search products"
              />

              {search && (
                <button
                  type="button"
                  className="search-clear"
                  onClick={clearSearch}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>

            {/* SORT */}

            <div className="filters-right">
              <div className="sort-wrapper">
                <label htmlFor="shop-sort">Sort by</label>

                <select
                  id="shop-sort"
                  value={sortBy}
                  onChange={handleSortChange}
                  className="sort-select"
                >
                  <option value="featured">Featured</option>

                  <option value="newest">Newest</option>

                  <option value="price-low">Price: Low to High</option>

                  <option value="price-high">Price: High to Low</option>

                  <option value="name">Name</option>
                </select>
              </div>
            </div>
          </div>

          {/* RESULTS BAR */}

          <div className="results-bar">
            <p className="results-count">
              {loading ? (
                "Loading products..."
              ) : (
                <>
                  Showing <strong>{paginatedProducts.length}</strong> of{" "}
                  <strong>{sortedProducts.length}</strong> products
                </>
              )}
            </p>

            {hasActiveFilters && (
              <button
                type="button"
                className="clear-filters"
                onClick={clearFilters}
              >
                Clear all
                <span aria-hidden="true">×</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ======================================================
          PRODUCTS
      ====================================================== */}

      <section className="shop-products" aria-label="Products">
        <div className="container">
          {loading ? (
            <div className="product-grid skeleton-grid">
              {Array.from({
                length: 8,
              }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          ) : productsError ? (
            <div className="shop-error-state">
              <div className="shop-error-icon" aria-hidden="true">
                ⚠️
              </div>

              <h2>Something went wrong</h2>

              <p>{productsError}</p>

              <button
                type="button"
                className="shop-btn shop-btn-primary"
                onClick={() => window.location.reload()}
              >
                Try again
              </button>
            </div>
          ) : sortedProducts.length === 0 ? (
            <EmptyState onClear={clearFilters} />
          ) : (
            <>
              <div className="product-grid">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {/* PAGINATION */}

              {totalPages > 1 && (
                <nav className="pagination" aria-label="Product pagination">
                  <button
                    type="button"
                    className="pagination-btn"
                    disabled={safeCurrentPage === 1}
                    onClick={() => handlePageChange(safeCurrentPage - 1)}
                    aria-label="Previous page"
                  >
                    ←
                  </button>

                  <div className="pagination-pages">
                    {paginationItems.map((item, index) => {
                      if (item === "...") {
                        return (
                          <span
                            key={`ellipsis-${index}`}
                            className="pagination-ellipsis"
                            aria-hidden="true"
                          >
                            …
                          </span>
                        );
                      }

                      return (
                        <button
                          type="button"
                          key={item}
                          className={`pagination-page ${
                            safeCurrentPage === item ? "active" : ""
                          }`}
                          onClick={() => handlePageChange(item)}
                          aria-current={
                            safeCurrentPage === item ? "page" : undefined
                          }
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    className="pagination-btn"
                    disabled={safeCurrentPage === totalPages}
                    onClick={() => handlePageChange(safeCurrentPage + 1)}
                    aria-label="Next page"
                  >
                    →
                  </button>
                </nav>
              )}
            </>
          )}
        </div>
      </section>

      {/* ======================================================
          BOTTOM CTA
      ====================================================== */}

      {!loading && sortedProducts.length > 0 && (
        <section className="shop-bottom-cta">
          <div className="container">
            <div className="shop-bottom-cta-inner">
              <div>
                <span>✦ Handmade with care</span>

                <h2>Can't find what you're looking for?</h2>

                <p>
                  We also create custom crochet pieces designed especially for
                  you.
                </p>
              </div>

              <Link to="/contact" className="shop-btn shop-btn-light">
                Request a Custom Order
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default Shop;
