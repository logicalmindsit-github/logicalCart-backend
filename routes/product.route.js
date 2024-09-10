import express from "express";
import adminMiddleware from "../middleware/admin.middleware.js";
import Product from "../models/product.model.js";

const app = express.Router();

app.use(express.json());

app.get("/", async (_req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (e) {
    res.send(e.message);
  }
});

app.get("/title", async (req, res) => {
  try {
    let search = req.query.search;
    console.log(search);
    if (search == "") {
      return res.send("No Products found");
    }
    let product = await Product.find({
      title: { $regex: ".*" + search + ".*", $options: "i" },
    });
    if (product.length > 0) {
      return res.send(product);
    } else {
      return res.send("No Products found");
    }
  } catch (e) {
    res.send(e.message);
  }
});

app.post("/addproduct", adminMiddleware, async (req, res) => {
  try {
    const products = await Product.create({ ...req.body });
    res.send(products);
  } catch (e) {
    res.send(e.message);
  }
});

app.get("/mobile", async (req, res) => {
  try {
    let { brand } = req.query;
    let mobileProducts = await Product.find({ category: "Mobile" });
    if (brand) {
      mobileProducts = await Product.find({
        $and: [{ category: "Mobile" }, { brand: brand }],
      });
    }
    res.send(mobileProducts);
  } catch (e) {
    res.send(e.message);
  }
});

app.get("/grocery", async (req, res) => {
  try {
    let { brand } = req.query;
    let groceryProducts = await Product.find({ category: "Grocery" });
    if (brand) {
      groceryProducts = await Product.find({
        $and: [{ category: "Grocery" }, { brand: brand }],
      });
    }
    res.send(groceryProducts);
  } catch (e) {
    res.send(e.message);
  }
});

app.get("/electronic&appliances", async (req, res) => {
  try {
    let { brand } = req.query;
    let electronicProducts = await Product.find({
      category: "Electronic&Appliances",
    });
    if (brand) {
      electronicProducts = await Product.find({
        $and: [{ category: "Electronic&Appliances" }, { brand: brand }],
      });
    }
    res.send(electronicProducts);
  } catch (e) {
    res.send(e.message);
  }
});

app.get("/home", async (req, res) => {
  try {
    let { brand } = req.query;
    let homeProducts = await Product.find({ category: "Home" });
    if (brand) {
      homeProducts = await Product.find({
        $and: [{ category: "Home" }, { brand: brand }],
      });
    }
    res.send(homeProducts);
  } catch (e) {
    res.send(e.message);
  }
});

app.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.find();
    let singleProduct = product.find((item) => item.id == id);
    res.send(singleProduct);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.delete("/:id", adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Product.findByIdAndDelete({ _id: id });
    res.send("Item is Deleted successfully");
  } catch (e) {
    res.send(e.message);
  }
});

app.put("/:id", adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedItem = await Product.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).send("Item not found");
    }

    res.send("Item updated successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default app;
