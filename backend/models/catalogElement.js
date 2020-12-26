const mongoose = require("mongoose");

const catalogElementSchema = mongoose.Schema({
  title: { type: String, required: true },
  img: { type: String, required: false },
  priceCurrency: { type: String, required: true },
  beforePriceNumber: { type: Number, required: false },
  currentPriceNumber: { type: Number, required: true },
  sizes: { type: [Number] }, // can't add "required" for array, see documentation
  count: { type: Number, required: false },
});

module.exports = mongoose.model("CatalogElement", catalogElementSchema);
