const mongoose = require("mongoose");
const dotenv = require("dotenv");
const dns = require("dns");

const Product = require("./models/Product");
const Category = require("./models/Category");

dotenv.config();

// MongoDB Atlas DNS fix
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const migrateProductCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    const products = await Product.find({});

    console.log(`Found ${products.length} products`);

    let updated = 0;
    let skipped = 0;

    for (const product of products) {
      const categorySlug = product.category;

      const category = await Category.findOne({
        slug: categorySlug,
      });

      if (!category) {
        console.log(`❌ Category not found for product: ${product.name}`);

        skipped++;
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

      updated++;
    }

    console.log("--------------------------------");
    console.log(`Total products: ${products.length}`);
    console.log(`Updated: ${updated}`);
    console.log(`Skipped: ${skipped}`);
    console.log("--------------------------------");

    await mongoose.connection.close();

    process.exit(0);
  } catch (error) {
    console.error("Migration error:", error);

    await mongoose.connection.close();

    process.exit(1);
  }
};

migrateProductCategories();
