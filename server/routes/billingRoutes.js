const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const { getBills, createBill, updateBill } = require('../controllers/billingController');

router.get('/', auth(['admin', 'staff']), getBills);
router.post('/', auth(['admin', 'staff']), createBill);
router.put('/:id', auth(['admin', 'staff']), updateBill);

module.exports = router;
