import axios from "axios";
import RecipeSearch from "../components/RecipeSearch"
import { useCallback, useEffect, useState } from "react";
import RecipeList from "../components/RecipeList";
import RecipeFilter from "../components/RecipeFilter";
import Pagination from "../components/Pagination";
import type { Recipe,Cuisine } from '../types/recipe';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [hasSearched, setHasSearched] = useState<boolean>(false)
  const [recipes,setRecipes] = useState<Recipe[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalResults, setTotalResults] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const recipesPerPage = 5;
  const [cuisines, setCuisines]= useState<Cuisine[]>([
    { label: 'italian', checked: false },
    { label: 'indian', checked: false },
    { label: 'mexican', checked: false },
    { label: 'chinese', checked: false },
    { label: 'thai', checked: false },
    { label: 'french', checked: false },
    { label: 'japanese', checked: false },
    { label: 'korean', checked: false },
    { label: 'greek', checked: false },
    { label: 'spanish', checked: false }
  ])
  
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;
 
  // fecth logic 
  const fetchRecipes = useCallback(async () => {

    if (!searchQuery) return;

    setLoading(true);
    setError(null);

    try {
      const activeCuisines = () => cuisines.filter(c => c.checked).map(c => c.label)
      const offset = (currentPage - 1) * recipesPerPage;
      const params = {
        apiKey: API_KEY,
        query: searchQuery,
        cuisine: activeCuisines().join(','),
        offset: offset.toString(),
        number: recipesPerPage.toString(),
        addRecipeInformation: 'true'
      }
      const {data} = await axios.get(BASE_URL, {params})
      setRecipes(data.results || [])
      setTotalResults(data.totalResults)
    } catch (err:unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response && err.response.status === 402) {
        setError("API limit reached for today. Please try again tomorrow or upgrade your plan.") 
        } else {
          setError(`Failed to fetch recipes: ${err}`)
        }
      }
      else {
        setError("An unexpected system error occurred.");
      }
    } finally {
      setLoading(false);
    }
  }, [searchQuery, cuisines, currentPage])

  // side effect
  useEffect(() => {
    if(hasSearched) {
      fetchRecipes();
    }
  },[currentPage, cuisines, fetchRecipes, hasSearched, searchQuery])

  // handlers 

  // this function is passed to RecipeSearch
  const handleSearch = (query:string) => {
    console.log(query)
    setSearchQuery(query); // parent updates its state from child component 
    setHasSearched(true);
    setCurrentPage(1)
  }

  // filtering from quisines
  const handleFilterToggle = (label: string) => {
    setCuisines(prev => prev.map(c => 
      c.label === label ? { ...c, checked: !c.checked } : c
    ));
    setCurrentPage(1);
  };

  // pagination

  const handlePageChange = (newPage : number) => {
    setCurrentPage(newPage)
  }

  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>Come & explore my nutritious and delicious recipes</h1>
          <div className="recipe-search">
            <RecipeSearch onSearch={handleSearch} />
          </div>
        </div>
      </section>
      
      <section className="recipes">
        <div className="container"> 
           
          {hasSearched && (      
          error ? <div className="error-message flex-center">{error}</div> :      
          loading && !recipes.length ? (<div className="recipe-loader">Loading delicious recipes...</div>) 
          :
          <>
          <div className="filters">
            {cuisines.map((cuisine) => (
              <RecipeFilter
                key={cuisine.label}
                label={cuisine.label}
                checked={cuisine.checked}
                onChange={() => handleFilterToggle(cuisine.label)}
              />
            ))}
          </div>
            <RecipeList recipes={recipes} />
            {recipes.length === 0 && !loading && (
                <div className="no-results">No recipes found for "{searchQuery}".</div>
            )}
            {totalResults > recipesPerPage && (
              <Pagination currentPage={currentPage} totalPages={Math.ceil(totalResults / recipesPerPage)} changePage={handlePageChange}/>
            )}
          </>
        )}
        </div>
      </section>

    </>
  )
}

export default Home
