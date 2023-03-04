const Players = require('../models/players');
class playerController {

    //Get a list of players
    index(req, res, next) {
        Players.find({})
            .then((players) => {
                res.render('players', {
                    title: 'The list of Players',
                    players: players
                });
            }).catch(next);
    }

    //Get a Player
    getUpdatedPlayer(req, res, next) {
        Players.findById(req.params.id)
            .then(player => {
                if (!player) {
                    return res.status(404).json({
                        message: 'Player not found'
                    });
                }
                res.render('updatePlayer', { player });
            })
            .catch(error => next(error));
    };

    // Create a new Player
    createPlayer(req, res, next) {
        const player = new Players({
            name: req.body.name,
            image: req.body.image,
            club: req.body.club,
            position: req.body.position,
            goals: req.body.goals,
            isCaptain: req.body.isCaptain === 'on' ? true : false
        });
        player
            .save()
            .then(createdPlayer => {
                res.redirect('/players');
            })
            .catch(error => {
                res.status(500).json({
                    message: 'Creating a player failed'
                });
            });
    };

    //Update a player
    updatePlayer(req, res, next) {
        const isCaptain = req.body.isCaptain === 'on' ? true : false;
        const updatedPlayer = {
            name: req.body.name,
            image: req.body.image,
            club: req.body.club,
            position: req.body.position,
            goals: req.body.goals,
            isCaptain: isCaptain
        };

        Players.findByIdAndUpdate(req.params.id, updatedPlayer)
            .then(player => {
                if (!player) {
                    return res.status(404).json({
                        message: 'Player not found'
                    });
                }
                res.redirect('/players');
            })
            .catch(error => next(error));
    };

    //Delete a player
    deletePlayer(req, res, next) {
        console.log("Delete player function called with id: ", req.params.id);
        Players.findOneAndDelete({ _id: req.params.id })
            .then(deletedPlayer => {
                if (!deletedPlayer) {
                    return res.status(404).json({
                        message: 'Player not found'
                    });
                }
                res.redirect('/players');
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    message: 'Failed to delete player'
                });
            });
    };

}
module.exports = new playerController;
