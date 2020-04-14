const { Router } = require('express');
const { routeTrap, getRequests } = require('../controllers/traps');

const router = Router();

router.get('/:trapId/requests', getRequests);

router.all('/:trapId', routeTrap);

router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;
