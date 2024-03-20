import { Schema, models, model, Document } from "mongoose";

export interface ISettings extends Document {
  product_name: string;
  selling_cost: string;
  making_cost: string;
  pack_size: string;
  key: string;
}

const SettingsSchema = new Schema({
  product_name : {type: String,required: true},
  selling_cost: { type: String, required: true },
  making_cost: { type: String, required: true },
  pack_size: { type: String, required: true },
  key: { type: String, required: true },
});

const Settings =
  models.Settings || model<ISettings>("Settings", SettingsSchema); // Specify model type

export default Settings;
