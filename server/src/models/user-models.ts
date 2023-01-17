import mongoose from "mongoose";

const CAWorkerSchema = new mongoose.Schema({
  appearances: { type: Number, required: true, default: 0 },
  email: { type: String, required: true },
  id: { type: String, required: true },
  name: { type: String, required: true },
  department: { type: String, required: true },
});

const CAWorkerModel = mongoose.model("workers", CAWorkerSchema);

export default CAWorkerModel;
