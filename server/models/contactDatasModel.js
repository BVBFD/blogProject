import mongoose from "mongoose";

const ContactDatasSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    number: {
      type: String,
      required: false,
    },

    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ContactDatas", ContactDatasSchema);
