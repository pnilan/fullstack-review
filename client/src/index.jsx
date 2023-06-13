import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

const App = () => {

  const [repos, setRepos] = useState([]);

  useEffect(() => {
    $.ajax({
      method: 'GET',
      url: '/repos',
      success: (res) => {
        console.log('repos successfully retrieved from db');
        console.log(res);
         setRepos(res);
      },
      error: () => {
        console.log('error retrieving repos from db');
      }
    })
  }, []);

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
    <div className="container">
      <h1>Github Fetcher</h1>
      <Search onSearch={search}/>
      <RepoList repos={repos}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));