const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', { useNewUrlParser: true, useUnifiedTopology: true });

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

module.exports.save = save;