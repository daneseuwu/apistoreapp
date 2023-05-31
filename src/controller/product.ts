import { Request, Response } from "express";
import Product from "../model/product";
import { IProduct } from "../types";

type CreateProductRequestType = Pick<
  IProduct,
  "name" | "description" | "price" | "image"
>;

export const createProduct = async (request: Request, response: Response) => {
  try {
    const { name, description, price, image }: CreateProductRequestType =
      request.body;
    const product = await Product.create({
      name,
      description,
      price,
      image,
    });

    return response.status(200).json({
      status: 200,
      data: product,

      message: "Producto creado con exito",
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      status: 500,
      message: "Upps parace que ha ocurrido un error al crear producto",
      error,
    });
  }
};

export const getProduct = async (request: Request, response: Response) => {
  try {
    const products = await Product.find({});

    return response.status(200).json({
      status: 200,
      data: products,
      message: "Listado de producto con exito",
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      status: 500,
      message:
        "Upps paeace que ha ocurrido un error al obtener listado de productos",
    });
  }
};

export const getIdProduct = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const product = await Product.findById(id);
    return response.status(200).json({
      status: 200,
      data: product,
      message: "Listado de producto con exito",
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      status: 500,
      message: "Upps parece que ha ocurrido un error al obtener el producto",
    });
  }
};
