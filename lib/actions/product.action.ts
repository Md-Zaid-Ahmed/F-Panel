"use server";

import { connect } from "http2";
import { connectToDatabase } from "../mongoose";
import Products from "@/database/product.model";

export async function getProducts(params: any) {
  try {
    connectToDatabase();
    const Productsdata = await Products.find({});
    return { Productsdata };
  } catch (err) {
    console.error(err);
  }
}

export async function createProducts(params: any) {
  try {
    connectToDatabase();
    const { making_cost, selling_cost, key, pack_size, product_name } = params;

    // Check if the product name already exists in the database
    const existingProduct = await Products.findOne({ product_name });
    if (existingProduct) {
      // Product with the given name already exists
      return { error: "Product with the same name already exists." };
    }

    // Create a new product if the name is unique
    await Products.create({
      product_name,
      making_cost,
      selling_cost,
      pack_size,
      key,
    });
  } catch (error) {
    console.error(error);
  }
}