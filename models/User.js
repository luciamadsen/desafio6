const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  githubId: String
});

module.exports = mongoose.model('User', userSchema);
