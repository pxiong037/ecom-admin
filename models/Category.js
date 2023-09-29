const { Schema, default: mongoose } = require("mongoose"); 

const CategorySchema = new Schema({
  name: {type:String,required:true},
  parent: {type:mongoose.Types.ObjectId, ref:'Category'},
  properties: [{type:Object}]
});

export default mongoose.models.Category || mongoose.model("Category", CategorySchema);