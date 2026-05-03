const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const { getAppointments, createAppointment, updateAppointment, getDoctorDashboard } = require('../controllers/appointmentController');

router.get('/', auth(), getAppointments);
router.post('/', auth(['admin', 'staff']), createAppointment);
router.put('/:id', auth(['admin', 'staff', 'doctor']), updateAppointment);
router.get('/doctor/dashboard', auth(['doctor']), getDoctorDashboard);

module.exports = router;
