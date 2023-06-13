import React, { useState } from 'react';

const Search = ({ onSearch }) => {

  const[term, setTerm] = useState('')

  const handleChange = (e) => {
    setTerm(e.target.value);
  }

  const search = () => {
    onSearch(term);
  }

  return (
    <div>
      Enter a github username: <input value={term} onChange={handleChange}/>
      <button onClick={search}> Add Repos </button>
    </div>
  );
}

export default Search;