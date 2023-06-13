import React from 'react';
import Repo from './Repo.jsx'

const RepoList = ({ repos }) => (
  <>
    <div>
      <h4> Top Repos </h4>
      There are {repos.length} repos.
      <hr/>
    </div>
    <div className="row">
      {repos.map((repo, i) => <Repo key={i} repo={repo} />)}
    </div>
  </>
)

export default RepoList;