"use server";

import { connect } from "http2";
import { connectToDatabase } from "../mongoose";
import ShopModel from "@/database/shop.model";

export async function createShop(params: any) {
  // eslint-disable-next-line
  try {
    connectToDatabase();

    const { area, date, ownername, phonenumber, shopname } = params;

    // Check if the phone number already exists
    // const existingShop = await ShopModel.findOne({ phonenumber });

    // if (existingShop) {
    //   throw new Error("Phone number already exists");
    // }

    // Create a Shop

    const Shop = await ShopModel.create({
      shopname,
      ownername,
      phonenumber,
      area,
      date,
    });
  } catch (error) {
    console.error(error);
  }
}
