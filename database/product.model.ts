import { Schema, models, model, Document } from "mongoose";

export interface IProducts extends Document {
  product_name: string;
  selling_cost: string;
  making_cost: string;
  pack_size: string;
  key: string;
}

const ProductsSchema = new Schema({
  product_name : {type: String,required: true},
  selling_cost: { type: String, required: true },
  making_cost: { type: String, required: true },
  pack_size: { type: String, required: true },
  key: { type: String, required: true },
});

const Products =
  models.Products || model<IProducts>("Products", ProductsSchema); // Specify model type

export default Products;
