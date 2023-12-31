const mongoose = require('mongoose');
const config = require('../config.js');
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let repoSchema = mongoose.Schema({
  repo_id: { type: Number, unique: true },
  owner_id: Number,
  owner_name: String,
  owner_url: String,
  name: String,
  full_name: String,
  html_url: String,
  created_at: Date,
  stargazers_count: Number,
  last_queried_at: { type: Date, default: Date.now }
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos, callback) => {

  repos.forEach((repo) => {
    var repoRecord = new Repo({
      repo_id: repo.id,
      owner_id: repo.owner.id,
      owner_name: repo.owner.login,
      owner_url: repo.owner.html_url,
      name: repo.name,
      full_name: repo.full_name,
      html_url: repo.html_url,
      created_at: repo.created_at,
      stargazers_count: repo.stargazers_count
    });
    repoRecord.save()
      .then(() => {
        console.log('repo saved');
      })
      .catch((err) => {
        callback('Error saving repo to database');
      });
  })

  callback(null, 'success');
}

const getAll = (callback) => {
  Repo.find({}).sort({ stargazers_count: 'desc'}).limit(25)
    .then((repos) => {
      callback(null, repos);
    })
    .catch((err) => {
      callback('Error retrieving repos from database');
    })
}

module.exports.save = save;
module.exports.getAll = getAll;