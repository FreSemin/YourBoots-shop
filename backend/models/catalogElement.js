const mongoose = require("mongoose");

const catalogElementSchema = mongoose.Schema({
  title: { type: String, required: true },
  img: { type: String, required: true },
  priceCurrency: { type: String, required: true },
  beforePriceNumber: { type: Number, required: true },
  currentPriceNumber: { type: Number, required: true },
  sizes: { type: [Number] | Number }, // can't add "required" for array see documentation
  count: { type: Number, required: false, default: 1 },
});

module.exports = mongoose.model("CatalogElement", catalogElementSchema);
