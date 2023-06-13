import React from 'react';

const Repo = ({repo}) => {

  return (
    <div>
      <h4>
        <a href={repo.html_url}>{repo.full_name}</a>
      </h4>
      <span>Has {repo.stargazers_count} stargazers.</span>
      <p>
        Created by <a href={repo.owner_url}>{repo.owner_name}</a>.
      </p>
      <hr />
    </div>
  )
}

export default Repo;