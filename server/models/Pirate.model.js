const mongoose = require("mongoose");


const PirateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Pirate name is required"],
    },
    imageUrl: {
        type: String,
        required: [true, "Pirate image is required"],
    },
    catchPhrase: {
        type: String,
        required: [true, "Pirate catch phrase is required"],
    },
    attributes: {
        pegLeg: {
            type: Boolean,
            default: true,
        },
        eyePatch: {
            type: Boolean,
            default: true,
        },
        hookHand: {
            type: Boolean,
            default: true,
        },
    },
    crewPosition: {
        type: String,
        position: ['captain', 'firstMate', 'quarterMaster', 'boatswain', 'powderMonkey'],
        required: [true, "Pirate category is required"],
    },
    //of treasure chests
    treasureChests: {
        type: Number,
        default: 0,
        required: [true, "Pirate treasure chests is required"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

PirateSchema.pre('save', async function(next) {
    if (this.category === 'captain') {
      const existingCaptain = await Pirate.findOne({ category: 'captain' });
      if (existingCaptain && !existingCaptain._id.equals(this._id)) {
        throw new Error('Captain already exists');
      }
    }
    next();
  });


module.exports.PirateModel = mongoose.model("Pirate", PirateSchema)