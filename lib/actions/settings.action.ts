"use server";

import { connect } from "http2";
import { connectToDatabase } from "../mongoose";
import Settings from "@/database/settings.model";

export async function getSettings(params: any) {

  try{
    connectToDatabase();
    const settingsdata = await Settings.find({})
    return {settingsdata};
  }catch(err){
    console.error(err);
  }
};

export async function createSettings(params: any) {
  try {
    connectToDatabase();
    const { making_cost, selling_cost, key, pack_size, product_name} = params;

    let existingSetting = await Settings.findOne({ key });
    if (existingSetting) {
      existingSetting.product_name = product_name;
      existingSetting.making_cost = making_cost;
      existingSetting.selling_cost = selling_cost;
      existingSetting.pack_size = pack_size;
      await existingSetting.save();
    } else {
      await Settings.create({
        product_name,
        making_cost,
        selling_cost,
        pack_size,
        key,
      });
    }
  } catch (error) {
    console.error(error);
  }
}
