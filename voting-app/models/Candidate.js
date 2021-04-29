const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  vote: {
    type: Number,
    required: true
  },
});

const Candidate = mongoose.model('Candidate', CandidateSchema);

module.exports = Candidate;
