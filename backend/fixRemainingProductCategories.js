const mongoose = require("mongoose");
const dotenv = require("dotenv");
const dns = require("dns");

const Product = require("./models/Product");
const Category = require("./models/Category");

dotenv.config();

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const fixes = [
  {
    productName: "Scarlet Rose Curtain Tieback",
    categorySlug: "homeDecor",
  },
  {
    productName: "White Sunflower Crochet Curtain Tieback",
    categorySlug: "homeDecor",
  },
  {
    productName: "Crochet Rose Flower Bouquet",
    categorySlug: "crochetFlowers",
  },
  {
    productName: "CrochetWallDecor",
    categorySlug: "homeDecor",
  },
];

const fixCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    for (const fix of fixes) {
      const category = await Category.findOne({
        slug: fix.categorySlug,
      });

      if (!category) {
        console.log(`❌ Category not found: ${fix.categorySlug}`);
        continue;
      }

      const product = await Product.findOne({
        name: fix.productName,
      });

      if (!product) {
        console.log(`❌ Product not found: ${fix.productName}`);
        continue;
      }

      await Product.collection.updateOne(
        { _id: product._id },
        {
          $set: {
            category: category._id,
          },
        },
      );

      console.log(`✅ ${product.name} → ${category.name}`);
    }

    console.log("--------------------------------");
    console.log("Remaining category fixes completed");
    console.log("--------------------------------");

    await mongoose.connection.close();

    process.exit(0);
  } catch (error) {
    console.error("Fix error:", error);

    await mongoose.connection.close();

    process.exit(1);
  }
};

fixCategories();
