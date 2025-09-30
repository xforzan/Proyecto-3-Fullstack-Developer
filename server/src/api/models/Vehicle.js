const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  vin: { type: String, required: true },
  km: { type: Number, required: true },
  images: [String],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required:true },
  specs: { type: mongoose.Schema.Types.Mixed },
}, { timestamps: true });

module.exports = mongoose.model("Vehicle", vehicleSchema);
