import { Schema, models, model, Document } from "mongoose";

export interface IShop extends Document {
  shopname: string;
  ownername: string;
  area: string;
  phonenumber: string;
  date: Date;
}

const ShopSchema = new Schema({
  shopname: { type: String, required: true },
  ownername: { type: String, required: true },
  phonenumber: { type: String, required: true },
  area: { type: String, required: true },
  date: { type: Date, default: Date.now(), required: true },
});

const ShopModel = models.ShopModel || model("ShopModel", ShopSchema);

export default ShopModel;
