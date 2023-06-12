const express = require('express');
const { getReposByUsername } = require('../helpers/github');
const { save } = require('../database');
const app = express();


// TODO - your code here!
// Set up static file service for files in the `client/dist` directory.
// Webpack is configured to generate files in that directory and
// this server must serve those files when requested.
app.use(express.static('client/dist'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.post('/repos', function (req, res) {
  const username = req.body.username;
  console.log('Requesting github repos from user: ', username);
  getReposByUsername(username, (err, githubResponse) => {
    if (err) {
      res.status(err.status).send(err.message);
    } else {
      var repos = githubResponse.data;
      save(repos, (err, response) => {
        if (err) {
          res.status(500).end();
        } else {
          console.log(response);
          res.status(200).end();
        }
      })
    }
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

