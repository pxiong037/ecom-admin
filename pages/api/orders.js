import {mongooseConnect} from "@/lib/mongoose";
import Order from "@/models/Order";
import mongoose from "mongoose";

export default async function handler(req,res) {
  await mongooseConnect();
  const Order = mongoose.model("Order");
  res.json(await Order.find().sort({createdAt:-1}));
}