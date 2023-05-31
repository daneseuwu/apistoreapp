import { Request, Response } from "express";
import stripe from "stripe";
import Order from "../model/order";

require("dotenv").config();

const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export const webhookHandler = async (request: Request, response: Response) => {
  try {
    const sig = request.headers["stripe_signature"] as string;
    const event = stripeClient.webhooks.constructEvent(
      request.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
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
