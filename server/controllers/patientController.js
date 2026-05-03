const Patient = require('../models/Patient');

exports.getPatients = async (_req, res) => res.json(await Patient.find().sort({ createdAt: -1 }));
exports.createPatient = async (req, res) => res.status(201).json(await Patient.create(req.body));
exports.updatePatient = async (req, res) => res.json(await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true }));
exports.deletePatient = async (req, res) => { await Patient.findByIdAndDelete(req.params.id); res.json({ message: 'Patient removed' }); };
