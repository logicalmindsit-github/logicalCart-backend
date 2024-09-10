import express from "express";
import Cart from "../models/cart.model.js";
import authMiddleware from "../middleware/auth.middleware.js";

import jwt from "jsonwebtoken";

const router = express.Router();
const secret = process.env.SECRET;
router.use(express.json());
router.use(authMiddleware);

router.get("/", async (req, res) => {
  try {
  
    const userid = req.body.userId
    console.log(userid)
    const cart = await Cart.find({ userId: userid });
    res.send(cart);
  } catch (e) {
    res.send(e.message);
  }
});

router.get("/checkout", async (_req, res) => {
  res.send("checkout");
});

router.post("/", async (req, res) => {
  try {
    const cartItem = await Cart.create({ ...req.body });
    res.send(cartItem);
  } catch (e) {
    res.send(e.message);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    const cartItem = await Cart.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    res.send(cartItem);
  } catch (e) {
    res.send(e.message);
  }
});

router.delete("/checkout", async (req, res) => {
  try {
    let token = req.headers.authorization;
    let decode = jwt.verify(token, secret);
    console.log(decode);
    const checkout = await Cart.deleteMany({ userId: decode.id });
    res.send("Your order is placed within 5-7 days");
  } catch (e) {
    res.send(e.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cartItem = await Cart.findByIdAndDelete({ _id: id });
    res.send("Item is deleted from your cart");
  } catch (e) {
    res.send(e.message);
  }
});

export default router;
