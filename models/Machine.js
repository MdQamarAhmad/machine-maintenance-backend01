let mongoose = require("mongoose");

const machineSchema = new mongoose.Schema({
  machineId: {
    type: String,
    required: true,
    unique: true
  },

  machineName: {
    type: String,
    required: true
  },

  department: {
    type: String,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  machineType: {
    type: String,
    required: true
  },

  manufacturer: String,

  modelNumber: String,

  installationDate: Date,

  status: {
    type: String,
    enum: [
      "Running",
      "Maintenance",
      "Breakdown",
      "Inactive"
    ],
    default: "Running"
  },

  description: String
});

module.exports = mongoose.model("Machine", machineSchema);
