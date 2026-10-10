import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link, useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "../styles/shop1.css";

/* ============================================================
   CONSTANTS
============================================================ */

const PRODUCTS_PER_PAGE = 12;

// Offset used when scrolling the products grid into view so the
// sticky navbar / filter bar doesn't cover the first row.
const NAV_OFFSET = 90;

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
  if (!discount) return price;
  return price - (price * discount) / 100;
};

const normalizeSearch = (value = "") => value.trim().toLowerCase();

/* ============================================================
   PRODUCT SKELETON
============================================================ */

const ProductSkeleton = () => (
  <div className="shop-skeleton-card" aria-hidden="true">
    <div className="shop-skeleton-image" />
    <div className="shop-skeleton-content">
      <div className="shop-skeleton-line shop-skeleton-line-lg" />
      <div className="shop-skeleton-line shop-skeleton-line-md" />
      <div className="shop-skeleton-line shop-skeleton-line-sm" />
    </div>
  </div>
);

/* ============================================================
   CATEGORY SKELETON
============================================================ */

const CategorySkeleton = () => (
  <div className="shop-category-skeleton" aria-hidden="true">
    <div className="shop-category-skeleton-icon" />
    <div className="shop-category-skeleton-line" />
    <div className="shop-category-skeleton-small" />
  </div>
);

/* ============================================================
   EMPTY STATE
============================================================ */

const EmptyState = ({ onClear }) => (
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

  const productsRef = useRef(null);
  const prevCategoryRef = useRef(null);
  const prevPageRef = useRef(1);

  /* ==========================================================
     URL STATE
  ========================================================== */

  const search = searchParams.get("search") || "";
  const selectedCategory = searchParams.get("category") || "all";

  /* ==========================================================
     DISABLE BROWSER AUTO SCROLL RESTORATION
  ========================================================== */

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("scrollRestoration" in window.history)) return;

    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = previous;
    };
  }, []);

  /* ==========================================================
     FETCH PRODUCTS
  ========================================================== */

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setProductsError("");

        const response = await fetch("/api/products", {
          signal: controller.signal,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.message || "Failed to load products.");
        }

        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        if (error.name === "AbortError") return;
        console.error("Shop products error:", error);
        setProductsError(error.message || "Unable to load products.");
        setProducts([]);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchProducts();
    return () => controller.abort();
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
        if (error.name === "AbortError") return;
        console.error("Shop categories error:", error);
        setCategoriesError(error.message || "Unable to load categories.");
        setCategories([]);
      } finally {
        if (!controller.signal.aborted) setCategoriesLoading(false);
      }
    };

    fetchCategories();
    return () => controller.abort();
  }, []);

  /* ==========================================================
     RESET PAGE WHEN URL FILTERS CHANGE
  ========================================================== */

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory]);

  /* ==========================================================
     SCROLL-TO-PRODUCTS HELPER
  ========================================================== */

  const scrollToProducts = () => {
    const el = productsRef.current;
    if (!el) return;

    const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo(0, top);
  };

  /* ==========================================================
     SCROLL WHEN CATEGORY CHANGES
  ========================================================== */

  useLayoutEffect(() => {
    // Skip the very first render
    if (prevCategoryRef.current === null) {
      prevCategoryRef.current = selectedCategory;
      return;
    }

    if (prevCategoryRef.current === selectedCategory) return;
    prevCategoryRef.current = selectedCategory;

    // 1. Immediate, synchronous jump — happens before paint
    scrollToProducts();

    // 2. Re-apply on next frame
    const raf = requestAnimationFrame(scrollToProducts);

    // 3. Re-apply a few more times to guarantee we win the race
    const timers = [50, 120, 250].map((delay) =>
      setTimeout(scrollToProducts, delay),
    );

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  /* ==========================================================
     SCROLL WHEN PAGE CHANGES (pagination)
  ========================================================== */

  useLayoutEffect(() => {
    if (prevPageRef.current === currentPage) return;
    prevPageRef.current = currentPage;

    scrollToProducts();

    const raf = requestAnimationFrame(scrollToProducts);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  /* ==========================================================
     CATEGORY LIST
  ========================================================== */

  const shopCategories = useMemo(
    () => [
      { _id: "all", name: "All Products", slug: "all", icon: "✨" },
      ...categories,
    ],
    [categories],
  );

  /* ==========================================================
     ACTIVE CATEGORY OBJECT
  ========================================================== */

  const activeCategory = useMemo(() => {
    if (selectedCategory === "all") return null;
    return categories.find((c) => c.slug === selectedCategory) || null;
  }, [categories, selectedCategory]);

  /* ==========================================================
     FILTER PRODUCTS
  ========================================================== */

  const filteredProducts = useMemo(() => {
    let result = [...products];

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
          if (featuredA !== featuredB) return featuredB - featuredA;
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
    return sortedProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [sortedProducts, safeCurrentPage]);

  /* ==========================================================
     PRODUCT COUNTS
  ========================================================== */

  const getCategoryCount = (slug) => {
    if (slug === "all") return products.length;
    return products.filter((p) => p.category?.slug === slug).length;
  };

  /* ==========================================================
     CATEGORY NAVIGATION
  ========================================================== */

  const handleCategoryChange = (slug) => {
    if (slug === selectedCategory) return;

    const params = new URLSearchParams(searchParams);

    if (slug === "all") {
      params.delete("category");
    } else {
      params.set("category", slug);
    }

    setCurrentPage(1);

    try {
      setSearchParams(params, { preventScrollReset: true });
    } catch {
      setSearchParams(params);
    }
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

    try {
      setSearchParams(params, { preventScrollReset: true });
    } catch {
      setSearchParams(params);
    }
  };

  /* ==========================================================
     CLEAR SEARCH
  ========================================================== */

  const clearSearch = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("search");
    setCurrentPage(1);

    try {
      setSearchParams(params, { preventScrollReset: true });
    } catch {
      setSearchParams(params);
    }
  };

  /* ==========================================================
     CLEAR ALL FILTERS
  ========================================================== */

  const clearFilters = () => {
    setSortBy("featured");
    setCurrentPage(1);

    try {
      setSearchParams({}, { preventScrollReset: true });
    } catch {
      setSearchParams({});
    }
  };

  /* ==========================================================
     SORT
  ========================================================== */

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setCurrentPage(1);
  };

  /* ==========================================================
     PAGINATION HANDLERS
  ========================================================== */

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages || page === safeCurrentPage) return;
    setCurrentPage(page);
  };

  /* ==========================================================
     PAGE NUMBERS
  ========================================================== */

  const paginationItems = useMemo(() => {
    if (totalPages <= 1) return [];

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
          PAGE HEADER — compact, professional, no giant hero
      ====================================================== */}
      <header className="shop-header">
        <div className="container">
          {/* <nav className="shop-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="shop-breadcrumb-sep" aria-hidden="true">
              /
            </span>
            <span className="shop-breadcrumb-current" aria-current="page">
              Shop
            </span>
          </nav> */}

          <div className="shop-header-inner">
            <div className="shop-header-text">
              <span className="shop-eyebrow">Handmade Collection</span>

              <h1>
                Shop <span>Handmade</span> Treasures
              </h1>

              <p>
                Explore our full collection of handcrafted crochet pieces — made
                with premium yarn, patience and plenty of love.
              </p>
            </div>

            <div className="shop-header-stats">
              <div className="shop-stat">
                <span className="shop-stat-value">
                  {loading ? "—" : products.length}
                </span>
                <span className="shop-stat-label">Products</span>
              </div>

              <div className="shop-stat">
                <span className="shop-stat-value">
                  {categoriesLoading ? "—" : categories.length}
                </span>
                <span className="shop-stat-label">Categories</span>
              </div>

              <div className="shop-stat">
                <span className="shop-stat-value">100%</span>
                <span className="shop-stat-label">Handmade</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ======================================================
          CATEGORIES
      ====================================================== */}
      <section className="shop-categories" aria-label="Product categories">
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
              {Array.from({ length: 8 }).map((_, index) => (
                <CategorySkeleton key={index} />
              ))}
            </div>
          ) : categoriesError ? (
            <div className="shop-inline-error">
              <span aria-hidden="true">⚠️</span>
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
                        ? { background: color, borderColor: color }
                        : undefined
                    }
                    aria-pressed={isActive}
                  >
                    <span
                      className="category-icon"
                      style={{ color: isActive ? "#fff" : color }}
                      aria-hidden="true"
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
      <section className="shop-filters" aria-label="Product filters">
        <div className="container">
          <div className="filters-wrapper">
            <div className="search-wrapper">
              <svg
                className="search-icon"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
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
      <section
        className="shop-products"
        ref={productsRef}
        aria-label="Products"
      >
        <div className="container">
          {loading ? (
            <div className="product-grid skeleton-grid">
              {Array.from({ length: 8 }).map((_, index) => (
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
              <div className="shop-bottom-cta-text">
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
