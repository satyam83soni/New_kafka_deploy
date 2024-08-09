import mongoose from 'mongoose';

const diceStats = new mongoose.Schema({
  one: {
    type: Number,
  },
  two: {
    type: Number,
  },
  three: {
    type: Number,
  },
  four: {
    type: Number,
  },
  five: {
    type: Number,
  },
  six: {
    type: Number,
  },
  total: {
    type: Number,
  }
}, {
  timestamps: true
});


const DiceStats = mongoose.model('DiceStats', diceStats);

export default DiceStats;