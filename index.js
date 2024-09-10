import express from "express";
import cors from "cors";
import 'dotenv/config'
import Razorpay from "razorpay";
import connect from "./config/db.js";
import userRouter from "./routes/users.route.js";
import productRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.route.js";
import addressRouter from "./routes/address.route.js";






const app = express();
const Keyid = process.env.KEY_ID;
const Keysecret = process.env.KEY_SECRET;
app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/carts", cartRouter);
app.use("/admin", addressRouter);

app.get("/", (req, res) => {
    res.send("Home page");
});

const instance = new Razorpay({
    key_id: Keyid ,
    key_secret:Keysecret,
});

app.post("/rozar-order", async (req, res) => {
    const options = {
        amount: req.body.amount,
        currency: "INR",
        receipt: "order_rcptid_11",
    };

    try {
        const order = await instance.orders.create(options);
        res.send(order);
    } catch (error) {
        console.log(error.message);
    }
});

const PORT = process.env.PORT || 5050;

app.listen(PORT, async () => {
    await connect();
    console.log(`${PORT}`);
});
