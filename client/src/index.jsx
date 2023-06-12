import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

const App = () => {

  const [repos, setRepos] = useState([]);

  const search = (term) => {
    $.ajax({
      method: 'POST',
      url: '/repos',
      data: {
        "username": term
      },
      success: (res) => {
        console.log(`success: ${term} was found. Repos added.`);
      },
      error: (err, string) => {
        console.log(err, string);
        console.log(`error searching for ${term}.`);
      }
    });
  }

  return (
    <div>
      <h1>Github Fetcher</h1>
      <RepoList repos={repos}/>
      <Search onSearch={search}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));