import React, { useState } from 'react';

interface RecipeSearchProps {
  onSearch: (query:string) => void
}
const RecipeSearch = ({onSearch}:RecipeSearchProps) => {
  const [query, setQuery] = useState('');
  const handleSubmit = (e:React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSearch(query)
  }
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input className='form-control' type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Looking for Delicious Recipes?'  />
      <button className='btn btn-lg' type='submit'>Search</button>
    </form>
  )
}

export default RecipeSearch