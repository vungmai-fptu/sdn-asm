const express = require('express');
const nationController = require('../controllers/nationController');
const nationsRouter = express.Router();

nationsRouter.route('/')
	.get(nationController.index)
	.post(nationController.createNation);
nationsRouter.route('/:id')
	.put(nationController.updateNation)
	.delete(nationController.deleteNation);
nationsRouter.route('/:id/update')
	.get(nationController.getUpdatedNation);

module.exports = nationsRouter;