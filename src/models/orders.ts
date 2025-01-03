import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  amount: { type: String, required: true },
  billDetails: {
    Fooditems: { type: Array, default: [] },
    MovieItems: { type: Array, default: [] },
    birthdayhallitems: { type: Array, default: [] },
    shipping: { type: Number, required: true },
    shippingAddressState: { type: String, required: true },
    shippingAddressStreet: { type: String, required: true },
    subtotal: { type: Number, required: true },
    tax: { type: String, required: true },
    total: { type: String, required: true },
},
  customername: { type: String, required: true },
  date: { type: String, required: true },
  email: { type: String, required: true },
  method: { type: String, required: true },
  orderid: { type: String, required: true },
  payments: {
    amount: { type: Number, required: true },
    amount_due: { type: Number, required: true },
    amount_paid: { type: Number, required: true },
    attempts: { type: Number, required: true },
    created_at: { type: Number, required: true },
    currency: { type: String, required: true },
    entity: { type: String, required: true },
    id: { type: String, required: true },
    notes: { type: Array, default: [] },
    offer_id: { type: String, default: null },
    receipt: { type: String, required: true },
    status: { type: String, required: true },
  },
  phone: { type: String, required: true },
  status: { type: String, required: true },
  time: { type: String, required: true },
});

const orders =mongoose.models.orders|| mongoose.model("orders", OrderSchema);

export default orders;
