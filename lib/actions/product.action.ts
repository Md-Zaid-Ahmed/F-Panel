"use server";

import { connectToDatabase } from "../mongoose";
import Products from "@/database/product.model";

// Establish database connection
connectToDatabase();

export async function getProducts(params: any) {
  try {
    const Productsdata = await Products.find({});
    return { Productsdata };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function deleteProducts(params: any) {
  try {
    const { product_name } = params;
    const result = await Products.deleteOne({ product_name });
    if (result.deletedCount === 0) {
      return { error: `Product not found.` };
    }
    return { message: `Product deleted successfully.` };
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

export async function updateProducts(params: any) {
  try {
    const { making_cost, selling_cost, key, pack_size, product_name } = params;
    let existingProduct = await Products.findOneAndUpdate(
      { product_name },
      { making_cost, selling_cost, pack_size },
      { new: true }
    );
    if (!existingProduct) {
      return { error: "Product not found." };
    }
    return { message: `Product updated successfully.` };
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

export async function createProducts(params: any) {
  try {
    const { making_cost, selling_cost, key, pack_size, product_name } = params;
    const existingProduct = await Products.findOne({ product_name });
    if (existingProduct) {
      return { error: "Product with the same name already exists." };
    }
    await Products.create({
      product_name,
      making_cost,
      selling_cost,
      pack_size,
      key,
    });
    return { message: `Product created successfully.` };
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}
