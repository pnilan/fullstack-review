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
      dataType: 'json',
      success: (data, string) => {
        console.log(`${term} was searched, ${string}.`);
      },
      error: () => {
        console.log(`error searching ${term}.`);
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