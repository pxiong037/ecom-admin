import clientPromise from "@/lib/mongodb";
import { mongooseConnect } from "@/lib/mongoose";
import Product from "@/models/Product";
import mongoose from "mongoose";

export default async function handle(req, res){
    const {method} = req;
    await mongooseConnect();
    mongoose.Promise = clientPromise;
    const Product = mongoose.model("Product");

    if(method === 'GET'){
        if(req.query?.id){
            res.json(await Product.findOne({_id:req.query.id}))
        } else{
            res.json(await Product.find());
        }
    }

    if(method === "POST"){
        const {title, description, price, images, category, properties} = req.body;
        const productDoc = await Product.create({
            title,
            description,
            price,
            images,
            category,
            properties
          });
        res.json(productDoc);
    }

    if(method === 'PUT'){
        const {title, description, price, images, category, properties, _id} = req.body;

        if(!!images){
            if(title === undefined && description === undefined && price === undefined && category === undefined && properties === undefined){
                await Product.updateOne({_id: _id}, {images: images});
            } else{
                await Product.updateOne({_id: _id}, {title: title, description: description, price: price, images: images, category: category, properties: properties});
            }
        }

        res.json(true);
    }

    if(method === 'DELETE'){
        if(req.query?.id) {
            await Product.deleteOne({_id: req.query.id});
            res.json(true);
        }
    }
}