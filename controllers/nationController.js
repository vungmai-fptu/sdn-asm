const Nation = require('../models/nations');
class nationController {

    // Get a list of nations
    async index(req, res, next) {
        try {
            const nations = await Nation.find({});
            res.render('nations', { title: 'The list of Nations', nations });
        } catch (error) {
            next(error);
        }
    }

    // Get a nation to update
    async getUpdatedNation(req, res, next) {
        try {
            const nation = await Nation.findById(req.params.id);
            if (!nation) {
                return res.status(404).json({ message: 'Nation not found' });
            }
            res.render('updateNation', { nation });
        } catch (error) {
            next(error);
        }
    }

    // Create a new nation
    async createNation(req, res, next) {
        try {
            const { name, description } = req.body;
            const newNation = new Nation({ name, description });
            await newNation.save();
            res.redirect('/nations');
        } catch (error) {
            res.status(500).json({ message: 'Creating a nation failed' });
        }
    }

    // Update a nation
    async updateNation(req, res, next) {
        try {
            const updatedNation = { name: req.body.name, description: req.body.description };
            const nation = await Nation.findByIdAndUpdate(req.params.id, updatedNation);
            if (!nation) {
                return res.status(404).json({ message: 'Nation not found' });
            }
            res.redirect('/nations');
        } catch (error) {
            next(error);
        }
    }

    // Delete a nation
    async deleteNation(req, res, next) {
        try {
            const deletedNation = await Nation.findOneAndDelete({ _id: req.params.id });
            if (!deletedNation) {
                return res.status(404).json({ message: 'Nation not found' });
            }
            res.redirect('/nations');
        } catch (error) {
            res.status(500).json({ message: 'Failed to delete nation' });
        }
    }

}

module.exports = new nationController();