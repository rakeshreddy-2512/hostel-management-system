const Bill = require('../models/Bill');

exports.getBills = async (_req, res) => res.json(await Bill.find().populate('patient appointment').sort({ createdAt: -1 }));
exports.createBill = async (req, res) => res.status(201).json(await Bill.create(req.body));
exports.updateBill = async (req, res) => {
  const bill = await Bill.findById(req.params.id);
  if (!bill) return res.status(404).json({ message: 'Bill not found' });
  Object.assign(bill, req.body);
  if (bill.paidAmount >= bill.totalAmount) bill.paymentStatus = 'paid';
  else if (bill.paidAmount > 0) bill.paymentStatus = 'partial';
  await bill.save();
  res.json(bill);
};
