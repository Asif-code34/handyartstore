const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Category = require("./models/Category");
const dns = require("dns");

dotenv.config();
// Fix MongoDB Atlas SRV DNS resolution
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const categories = [
  {
    name: "Crochet Flowers / Bouquet",
    slug: "crochetFlowers",
    icon: "💐",
  },
  {
    name: "Crochet Keychain",
    slug: "crochetKeyChain",
    icon: "🔑",
  },
  {
    name: "Home Decor",
    slug: "homeDecor",
    icon: "🏠",
  },
  {
    name: "Crochet Toys / Plushies",
    slug: "crochetToys",
    icon: "🧸",
  },
  {
    name: "Crochet Phone Case",
    slug: "crochetPhoneCase",
    icon: "📱",
  },
  {
    name: "Crochet Pot",
    slug: "crochetPot",
    icon: "🪴",
  },
  {
    name: "Crochet Bag",
    slug: "crochetBag",
    icon: "👜",
  },
  {
    name: "Crochet Hair Accessories",
    slug: "crochetHairAccessories",
    icon: "🎀",
  },
];

const seedCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    await Category.deleteMany({});

    const createdCategories = await Category.insertMany(categories);

    console.log("Categories created:");
    console.log(createdCategories);

    await mongoose.connection.close();

    process.exit(0);
  } catch (error) {
    console.error("Category seed error:", error);
    process.exit(1);
  }
};

seedCategories();
