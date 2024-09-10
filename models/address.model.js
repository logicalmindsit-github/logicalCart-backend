import mongoose from "mongoose";

const { Schema, model } = mongoose;

const AddressSchema = new Schema({
    cart: { type: Array, required: true },
    name: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    pinCode: { type: Number, required: true },
    houseNo: { type: String, required: true },
    area: { type: String, required: true },
    landmark: { type: String, required: true },
    state: { type: String, required: true },
    userId: { type: String, required: true },
    date: { type: String, required: true },
    totalPrice: { type: String, required: true }
});


AddressSchema.index({ userId: 1, date: -1 });

const Address = model("AddressDetail", AddressSchema);

export default Address;
