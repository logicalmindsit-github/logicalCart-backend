import mongoose from "mongoose";

const { Schema, model } = mongoose;

const cartSchema = new Schema({
    title: { type: String, required: true, index: true },
    price: { type: String, required: true, index: true },
    price2: { type: Number, required: true, index: true },
    strik: { type: String, required: true, index: true },
    img: { type: Array, required: true, index: true },
    desc1: { type: String, required: true, index: true },
    desc2: { type: String, required: true, index: true },
    desc3: { type: String, required: true, index: true },
    desc4: { type: String, required: true, index: true },
    rating: { type: String, required: true, index: true },
    reviews: { type: String, required: true, index: true },
    off: { type: String, required: true, index: true },
    category: { type: String, required: true, index: true },
    brand: { type: String, required: true, index: true },
    quantity: { type: Number, required: true, default: 1, min: 1, index: true },
    userId: { type: String, required: true, index: true }
});

const Cart = model("cart", cartSchema);

export default Cart;
