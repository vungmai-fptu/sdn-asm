const express = require('express');
const playerController = require('../controllers/playerController')
const playersRouter = express.Router();

playersRouter.route('/')
	.get(playerController.index)
	.post(playerController.createPlayer);
playersRouter.route('/:id')
	// .get(playerController.getPlayer)
	.put(playerController.updatePlayer)
	.delete(playerController.deletePlayer);
playersRouter.route('/:id/edit')
	.get(playerController.getUpdatedPlayer);

module.exports = playersRouter;




