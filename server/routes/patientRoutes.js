const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const { getPatients, createPatient, updatePatient, deletePatient } = require('../controllers/patientController');

router.get('/', auth(), getPatients);
router.post('/', auth(['admin', 'staff']), createPatient);
router.put('/:id', auth(['admin', 'staff']), updatePatient);
router.delete('/:id', auth(['admin']), deletePatient);

module.exports = router;
