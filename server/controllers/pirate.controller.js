const { PirateModel } = require("../models/Pirate.model");

module.exports = {
    getAllPirates: (req, res) => {
        PirateModel
            .find()
            .then(allPirates => res.json(allPirates))
            .catch(err => res.json(err))
    },
    createPirate: (req, res) => {
        const newPirate = new PirateModel(req.body)
        newPirate
            .save()
            .then(createdPirate => res.json(createdPirate))
            .catch(err => res.json(err))
    },
    getPirate: (req, res) => {
        PirateModel
            .findById(req.params.id)
            .then(onePirate => {
                if (onePirate) {
                    res.json(onePirate)
                } else {
                    res.status(404).json({ message: 'Pirate not found' })
                }

            })
            .catch(err => {
                console.log(err);
                res.status(400).json({ message: 'Pirate not found' })
            })
    },
    updatePirate: (req, res) => {
        PirateModel
            .findOneAndUpdate(
                { _id: req.params.id },
                req.body,
                { new: true, runValidators: true }
            )
            .then(updatedPirate => res.json(updatedPirate))
            .catch(err => res.json(err))
    },
    deletePirate: (req, res) => {
        PirateModel
            .findByIdAndDelete(req.params.id)
            .then(deletedPirate => res.json(deletedPirate))
            .catch(err => res.json(err))
    },
    deleteAllPirates: (req, res) => {
        PirateModel
            .deleteMany()
            .then(deletedPirates => res.json(deletedPirates))
            .catch(err => res.json(err))
    }

}

