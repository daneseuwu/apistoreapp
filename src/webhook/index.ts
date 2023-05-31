import { Request, Response } from "express";
import stripe from "stripe";
import Order from "../model/order";
require("dotenv").config();

const STRIPE_KEY = process.env.STRIPE_SECRET_KEY || "";
const WEBHOOK_KEY = process.env.STRIPE_WEBHOOK_SECRET || "";

const stripeClient = new stripe(STRIPE_KEY, {
  apiVersion: "2022-11-15",
});

export const webhookHandler = async (request: Request, response: Response) => {
  try {
    const sig = request.headers["stripe_signature"] as string;
    const event = stripeClient.webhooks.constructEvent(
      request.body,
      sig,
      WEBHOOK_KEY
    );

    if (event.type === "payment_intent.created") {
      const charge = event.data.object as stripe.Charge;
      const order = await Order.findOne({
        paymentDetails: charge.payment_intent,
      });

      if (order) {
        order.paymentStatus = "paid";
        order.paymentDetails = charge;
        await order.save();
      }
    }
  } catch (error) {
    console.log(error);
  }
};
