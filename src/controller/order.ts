import { Request, Response } from "express";
import { IOrder, IOrderItem } from "../types";
import Order from "../model/order";
import stripe from "stripe";

const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2022-11-15",
});

type CreateOrderType = Pick<
  IOrder,
  "user" | "orderItems" | "deliveryAddress" | "totalPrice"
>;

const BASE_UNIT = 100;

const getTotalAmount = (orderItems: IOrderItem[]) => {
  return (
    orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0) *
    BASE_UNIT
  );
};

/**
 *
 * @param request
 * @param response
 * @returns
 * 1. To make a request to stripe , it's gonna return paymentIntent, we currency and order amount
 * 2. Save paymentIntentId in order model.
 * 3. Return paymentIntentId.client_secret
 */

export const createOrder = async (request: Request, response: Response) => {
  try {
    const { user, orderItems, deliveryAddress, totalPrice }: CreateOrderType =
      request.body;

    const totalAmount = getTotalAmount(orderItems);

    const paymentIntent = await stripeClient.paymentIntents.create({
      amount: totalAmount,
      currency: "inr",
    });

    const order = await Order.create({
      user,
      orderItems,
      deliveryAddress,
      totalPrice,
      paymentIntentId: paymentIntent.id,
      paymentStatus: "pending",
      paymentDetails: {},
    });

    return response.status(200).json({
      status: 200,
      data: order,
      clientSecret: paymentIntent.client_secret,
      message: "Orden creado con exito",
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      status: 500,
      message: "Error al crear ordern",
    });
  }
};

export const getOrders = async (request: Request, response: Response) => {
  try {
    const orders = await Order.find({});
    return response.status(200).json({
      status: 200,
      data: orders,
      message: "Listado de ordenes con exito",
    });
  } catch (error) {
    console.log(error);
    return response.status(200).json({
      status: 200,
      message: "Error al crear order",
    });
  }
};

export const getIdOrder = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const order = await Order.findById(id);
    return response.status(200).json({
      status: 200,
      data: order,
      message: "Listado de orden con exito",
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      status: 500,
      message: "Upps parece que ha ocurrido un error al obtener la orden",
    });
  }
};
