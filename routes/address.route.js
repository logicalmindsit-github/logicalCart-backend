import express from "express";
import adminMiddleware from "../middleware/admin.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";
import Address from "../models/address.model.js";

const router = express.Router();

router.use(adminMiddleware)

router.get("/orders", async (req, res) => {
    try {
        const userOrders = await Address.find();
        res.send(userOrders);
    } catch (err) {
        res.send(err.message);
    }
});

router.get("/orders/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const userOrders = await Address.findById(id);
        res.send(userOrders);
    } catch (err) {
        res.send(err.message);
    }
});

router.post("/post_orders",async (req, res) => {
    try {
        const userOrders = await Address.create({ ...req.body });
        res.send(userOrders);
    } catch (err) {
        res.send(err.message);
    }
});

router.delete("/order/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const userOrders = await Address.findByIdAndDelete({ _id: id });
        res.send("User product buy details deleted");
    } catch (err) {
        res.send(err.message);
    }
});

export default router;
