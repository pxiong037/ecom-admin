const { Schema, default: mongoose } = require("mongoose"); 

const OrderSchema = new Schema({
  line_items:Object,
  name:String,
  email:String,
  city:String,
  postalCode:String,
  streetAddress:String,
  country:String,
  paid:Boolean,
}, {
  timestamps: true,
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);