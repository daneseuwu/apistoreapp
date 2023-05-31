const { connect } = require("mongoose");
import mongoose from "mongoose";

mongoose.set("strictQuery", true);

const conn = async () => {
  try {
    await connect(process.env.URI, {
      UseNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Successfully connected mongo database");
  } catch (error) {
    console.log("Error connecting to mongo database", error);
  }
};

export default conn;
