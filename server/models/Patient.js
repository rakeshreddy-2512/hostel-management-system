const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dob: Date,
  gender: String,
  phone: String,
  email: String,
  address: String,
  bloodGroup: String,
  allergies: [String],
  medicalHistory: String,
  emergencyContact: String
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);
