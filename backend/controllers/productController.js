// const Product = require("../models/Product");
// const cloudinary = require("../config/cloudinary");
// const Category = require("../models/Category");

// // const getProducts = async (req, res) => {
// //   try {
// //     const products = await Product.find({});
// //     res.json(products);
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };
// const getProducts = async (req, res) => {
//   try {
//     const products = await Product.find({}).populate(
//       "category",
//       "name slug icon",
//     );

//     res.json(products);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// // const getProductById = async (req, res) => {
// //   try {
// //     const product = await Product.findById(req.params.id);
// //     if (product) {
// //       res.json(product);
// //     } else {
// //       res.status(404).json({ message: "Product not found" });
// //     }
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };
// const getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id).populate(
//       "category",
//       "name slug icon",
//     );

//     if (product) {
//       res.json(product);
//     } else {
//       res.status(404).json({
//         message: "Product not found",
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// // const createProduct = async (req, res) => {
// //   try {
// //     const { name, description, price, category, stock } = req.body;

// //     let imageUrl = "";

// //     // 👇 Add these logs here
// //     console.log("Cloudinary Config:");
// //     console.log({
// //       cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// //       api_key: process.env.CLOUDINARY_API_KEY,
// //       api_secret_exists: !!process.env.CLOUDINARY_API_SECRET,
// //     });

// //     if (req.file) {
// //       console.log("Uploading file:", req.file.path);

// //       const result = await cloudinary.uploader.upload(req.file.path);

// //       console.log("Upload Success:", result);

// //       imageUrl = result.secure_url;
// //     }

// //     const product = new Product({
// //       name,
// //       description,
// //       price,
// //       category,
// //       stock,
// //       imageUrl,
// //     });

// //     const createdProduct = await product.save();

// //     res.status(201).json(createdProduct);
// //   } catch (error) {
// //     console.log("Create Product Error:", error);

// //     res.status(500).json({
// //       message: error.message,
// //     });
// //   }
// // };

// const createProduct = async (req, res) => {
//   try {
//     const { name, description, price, category, stock } = req.body;

//     // Validate category
//     const categoryExists = await Category.findOne({
//       _id: category,
//       isActive: true,
//     });

//     if (!categoryExists) {
//       return res.status(400).json({
//         message: "Invalid or inactive category",
//       });
//     }

//     // Image is required
//     if (!req.file) {
//       return res.status(400).json({
//         message: "Product image is required",
//       });
//     }

//     // Upload image to Cloudinary
//     const result = await cloudinary.uploader.upload(req.file.path);

//     const product = new Product({
//       name,
//       description,
//       price,
//       category: categoryExists._id,
//       stock,
//       imageUrl: result.secure_url,
//     });

//     const createdProduct = await product.save();

//     const populatedProduct = await createdProduct.populate(
//       "category",
//       "name slug icon",
//     );

//     res.status(201).json(populatedProduct);
//   } catch (error) {
//     console.error("Create Product Error:", error);

//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// // const updateProduct = async (req, res) => {
// //   try {
// //     const { name, description, price, category, stock } = req.body;
// //     const product = await Product.findById(req.params.id);
// //     if (product) {
// //       product.name = name || product.name;
// //       product.description = description || product.description;
// //       product.price = price || product.price;
// //       product.category = category || product.category;
// //       product.stock = stock || product.stock;

// //       if (req.file) {
// //         const result = await cloudinary.uploader.upload(req.file.path);
// //         product.imageUrl = result.secure_url;
// //       }
// //       const updatedProduct = await product.save();
// //       res.json(updatedProduct);
// //     } else {
// //       res.status(404).json({ message: "Product not found" });
// //     }
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// const updateProduct = async (req, res) => {
//   try {
//     const { name, description, price, category, stock } = req.body;

//     const product = await Product.findById(req.params.id);

//     if (!product) {
//       return res.status(404).json({
//         message: "Product not found",
//       });
//     }

//     // Update normal fields only when provided
//     if (name !== undefined) {
//       product.name = name;
//     }

//     if (description !== undefined) {
//       product.description = description;
//     }

//     if (price !== undefined) {
//       product.price = price;
//     }

//     if (stock !== undefined) {
//       product.stock = stock;
//     }

//     // Update category only when provided
//     if (category !== undefined) {
//       const categoryExists = await Category.findOne({
//         _id: category,
//         isActive: true,
//       });

//       if (!categoryExists) {
//         return res.status(400).json({
//           message: "Invalid or inactive category",
//         });
//       }

//       product.category = categoryExists._id;
//     }

//     // Update image only when a new image is provided
//     if (req.file) {
//       const result = await cloudinary.uploader.upload(req.file.path);

//       product.imageUrl = result.secure_url;
//     }

//     const updatedProduct = await product.save();

//     const populatedProduct = await updatedProduct.populate(
//       "category",
//       "name slug icon",
//     );

//     res.json(populatedProduct);
//   } catch (error) {
//     console.error("Update Product Error:", error);

//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };
// const deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (product) {
//       await product.deleteOne();
//       res.json({ message: "Product removed" });
//     } else {
//       res.status(404).json({ message: "Product not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = {
//   getProducts,
//   getProductById,
//   createProduct,
//   updateProduct,
//   deleteProduct,
// };

const Product = require("../models/Product");
const Category = require("../models/Category");
const cloudinary = require("../config/cloudinary");

/*
|--------------------------------------------------------------------------
| Helper: Parse and validate numeric fields
|--------------------------------------------------------------------------
*/

const parseNumber = (value, fieldName) => {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  const number = Number(value);

  if (!Number.isFinite(number)) {
    const error = new Error(`${fieldName} must be a valid number`);
    error.statusCode = 400;
    throw error;
  }

  return number;
};

/*
|--------------------------------------------------------------------------
| Helper: Validate discount
|--------------------------------------------------------------------------
*/

const validateDiscount = (discount) => {
  if (discount === undefined) {
    return;
  }

  if (discount < 0 || discount > 100) {
    const error = new Error("Discount must be between 0 and 100");
    error.statusCode = 400;
    throw error;
  }
};

/*
|--------------------------------------------------------------------------
| GET ALL PRODUCTS
|--------------------------------------------------------------------------
|
| Public API
|
| Supports:
|
| GET /api/products
| GET /api/products?featured=true
| GET /api/products?category=categoryId
|
| Only active products are returned to customers.
|
*/

const getProducts = async (req, res) => {
  try {
    const filter = {
      isActive: true,
    };

    /*
    |--------------------------------------------------------------------------
    | Featured filter
    |--------------------------------------------------------------------------
    */

    if (req.query.featured === "true") {
      filter.isFeatured = true;
    }

    /*
    |--------------------------------------------------------------------------
    | Category filter
    |--------------------------------------------------------------------------
    */

    if (req.query.category) {
      filter.category = req.query.category;
    }

    const products = await Product.find(filter)
      .populate("category", "name slug icon")
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json(products);
  } catch (error) {
    console.error("Get Products Error:", error);

    res.status(500).json({
      message: "Failed to fetch products",
    });
  }
};

/*
|--------------------------------------------------------------------------
| GET SINGLE PRODUCT
|--------------------------------------------------------------------------
|
| GET /api/products/:id
|
*/

const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      isActive: true,
    })
      .populate("category", "name slug icon")
      .lean();

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Get Product By ID Error:", error);

    /*
    |--------------------------------------------------------------------------
    | Invalid MongoDB ObjectId
    |--------------------------------------------------------------------------
    */

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid product ID",
      });
    }

    res.status(500).json({
      message: "Failed to fetch product",
    });
  }
};

/*
|--------------------------------------------------------------------------
| CREATE PRODUCT
|--------------------------------------------------------------------------
|
| POST /api/products
|
| Expected multipart/form-data:
|
| name
| description
| price
| discount
| category
| stock
| isFeatured
| isActive
| image
|
*/

const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discount,
      category,
      stock,
      isFeatured,
      isActive,
    } = req.body;

    /*
    |--------------------------------------------------------------------------
    | Required field validation
    |--------------------------------------------------------------------------
    */

    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Product name is required",
      });
    }

    if (!description || !description.trim()) {
      return res.status(400).json({
        message: "Product description is required",
      });
    }

    if (!category) {
      return res.status(400).json({
        message: "Product category is required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Product image is required",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Parse numeric fields
    |--------------------------------------------------------------------------
    */

    const parsedPrice = parseNumber(price, "Price");
    const parsedStock = parseNumber(stock, "Stock");
    const parsedDiscount = parseNumber(discount, "Discount");

    if (parsedPrice === undefined || parsedPrice < 0) {
      return res.status(400).json({
        message: "Price must be 0 or greater",
      });
    }

    if (parsedStock === undefined || parsedStock < 0) {
      return res.status(400).json({
        message: "Stock must be 0 or greater",
      });
    }

    const finalDiscount = parsedDiscount ?? 0;

    validateDiscount(finalDiscount);

    /*
    |--------------------------------------------------------------------------
    | Validate category
    |--------------------------------------------------------------------------
    */

    const categoryExists = await Category.findOne({
      _id: category,
      isActive: true,
    });

    if (!categoryExists) {
      return res.status(400).json({
        message: "Invalid or inactive category",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Upload image to Cloudinary
    |--------------------------------------------------------------------------
    */

    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "handyartstore/products",
      resource_type: "image",
    });

    /*
    |--------------------------------------------------------------------------
    | Create product
    |--------------------------------------------------------------------------
    */

    const product = await Product.create({
      name: name.trim(),
      description: description.trim(),
      price: parsedPrice,
      discount: finalDiscount,
      category: categoryExists._id,
      stock: parsedStock,
      imageUrl: uploadResult.secure_url,

      isFeatured: isFeatured === true || isFeatured === "true",

      isActive:
        isActive === undefined
          ? true
          : isActive === true || isActive === "true",
    });

    /*
    |--------------------------------------------------------------------------
    | Return populated product
    |--------------------------------------------------------------------------
    */

    const populatedProduct = await Product.findById(product._id)
      .populate("category", "name slug icon")
      .lean();

    res.status(201).json(populatedProduct);
  } catch (error) {
    console.error("Create Product Error:", error);

    if (error.statusCode) {
      return res.status(error.statusCode).json({
        message: error.message,
      });
    }

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid category ID",
      });
    }

    res.status(500).json({
      message: "Failed to create product",
    });
  }
};

/*
|--------------------------------------------------------------------------
| UPDATE PRODUCT
|--------------------------------------------------------------------------
|
| PUT /api/products/:id
|
| All fields are optional.
|
| Supports:
|
| name
| description
| price
| discount
| category
| stock
| isFeatured
| isActive
| image
|
*/

const updateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discount,
      category,
      stock,
      isFeatured,
      isActive,
    } = req.body;

    /*
    |--------------------------------------------------------------------------
    | Find product
    |--------------------------------------------------------------------------
    */

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Update name
    |--------------------------------------------------------------------------
    */

    if (name !== undefined) {
      if (!name.trim()) {
        return res.status(400).json({
          message: "Product name cannot be empty",
        });
      }

      product.name = name.trim();
    }

    /*
    |--------------------------------------------------------------------------
    | Update description
    |--------------------------------------------------------------------------
    */

    if (description !== undefined) {
      if (!description.trim()) {
        return res.status(400).json({
          message: "Product description cannot be empty",
        });
      }

      product.description = description.trim();
    }

    /*
    |--------------------------------------------------------------------------
    | Update price
    |--------------------------------------------------------------------------
    */

    if (price !== undefined) {
      const parsedPrice = parseNumber(price, "Price");

      if (parsedPrice < 0) {
        return res.status(400).json({
          message: "Price must be 0 or greater",
        });
      }

      product.price = parsedPrice;
    }

    /*
    |--------------------------------------------------------------------------
    | Update discount
    |--------------------------------------------------------------------------
    */

    if (discount !== undefined) {
      const parsedDiscount = parseNumber(discount, "Discount");

      validateDiscount(parsedDiscount);

      product.discount = parsedDiscount;
    }

    /*
    |--------------------------------------------------------------------------
    | Update stock
    |--------------------------------------------------------------------------
    */

    if (stock !== undefined) {
      const parsedStock = parseNumber(stock, "Stock");

      if (parsedStock < 0) {
        return res.status(400).json({
          message: "Stock must be 0 or greater",
        });
      }

      product.stock = parsedStock;
    }

    /*
    |--------------------------------------------------------------------------
    | Update category
    |--------------------------------------------------------------------------
    */

    if (category !== undefined) {
      const categoryExists = await Category.findOne({
        _id: category,
        isActive: true,
      });

      if (!categoryExists) {
        return res.status(400).json({
          message: "Invalid or inactive category",
        });
      }

      product.category = categoryExists._id;
    }

    /*
    |--------------------------------------------------------------------------
    | Update Featured Status
    |--------------------------------------------------------------------------
    */

    if (isFeatured !== undefined) {
      product.isFeatured = isFeatured === true || isFeatured === "true";
    }

    /*
    |--------------------------------------------------------------------------
    | Update Active Status
    |--------------------------------------------------------------------------
    */

    if (isActive !== undefined) {
      product.isActive = isActive === true || isActive === "true";
    }

    /*
    |--------------------------------------------------------------------------
    | Update Image
    |--------------------------------------------------------------------------
    */

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "handyartstore/products",
        resource_type: "image",
      });

      product.imageUrl = uploadResult.secure_url;
    }

    /*
    |--------------------------------------------------------------------------
    | Save product
    |--------------------------------------------------------------------------
    */

    await product.save();

    /*
    |--------------------------------------------------------------------------
    | Populate category
    |--------------------------------------------------------------------------
    */

    const populatedProduct = await Product.findById(product._id)
      .populate("category", "name slug icon")
      .lean();

    res.status(200).json(populatedProduct);
  } catch (error) {
    console.error("Update Product Error:", error);

    if (error.statusCode) {
      return res.status(error.statusCode).json({
        message: error.message,
      });
    }

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid product or category ID",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: "Failed to update product",
    });
  }
};

/*
|--------------------------------------------------------------------------
| DELETE PRODUCT
|--------------------------------------------------------------------------
|
| IMPORTANT:
| We use soft delete instead of physically deleting the product.
|
| This is safer for an ecommerce application because old orders may
| still reference this product.
|
| DELETE /api/products/:id
|
*/

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Soft delete
    |--------------------------------------------------------------------------
    */

    product.isActive = false;

    await product.save();

    res.status(200).json({
      message: "Product removed successfully",
    });
  } catch (error) {
    console.error("Delete Product Error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid product ID",
      });
    }

    res.status(500).json({
      message: "Failed to remove product",
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
