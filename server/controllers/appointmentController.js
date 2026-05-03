const Appointment = require('../models/Appointment');

exports.getAppointments = async (_req, res) => res.json(await Appointment.find().populate('patient doctor', 'firstName lastName name specialty').sort({ date: 1 }));
exports.createAppointment = async (req, res) => res.status(201).json(await Appointment.create(req.body));
exports.updateAppointment = async (req, res) => res.json(await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true }));
exports.getDoctorDashboard = async (req, res) => {
  const doctorId = req.user.id;
  const upcoming = await Appointment.find({ doctor: doctorId, status: 'scheduled' }).populate('patient', 'firstName lastName').sort({ date: 1 }).limit(5);
  const completedCount = await Appointment.countDocuments({ doctor: doctorId, status: 'completed' });
  res.json({ upcoming, completedCount });
};
