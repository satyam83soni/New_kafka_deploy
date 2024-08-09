import mongoose from 'mongoose';

const diceRollSchema = new mongoose.Schema({
  sequence: {
    type: Number,
    required: true,
    index: true
  },
  output: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});


const DiceRoll = mongoose.model('DiceRoll', diceRollSchema);

export default DiceRoll;