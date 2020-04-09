const { Router } = require('express');
const { getTrap } = require('../controllers/traps');

const router = Router();

router.get('/:trap_id/requests', (req, res) => {
  res.render('requests');
});

router.get('/:trap_id', getTrap);

module.exports = router;
