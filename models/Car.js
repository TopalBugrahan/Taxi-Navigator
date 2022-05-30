const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CarSchema = new Schema({
  id: {
    type: String,
  },
  Tarih: {
    type: String,
  },
  Saat: {
    type: String,
  },
  KonumX: {
    type: String,
  },
  KonumY: {
    type: String,
  },
  
});


const CarData = mongoose.model("CarData", CarSchema);

module.exports = CarData;
