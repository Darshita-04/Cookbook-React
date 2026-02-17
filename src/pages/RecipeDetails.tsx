import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import type { RecipeDetail } from '../types/recipe'
import Loader from '../components/Loader';


const RecipeDetails = () => {
  // get id from URL
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchRecipeDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        const {data} = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
          params: {
            apiKey: API_KEY,
            includeNutrition: true
          }
        });
        setRecipe(data);
      } catch (err) {
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
    };

    if (id) fetchRecipeDetail();
  }, [id]);

  // loading state
  if (loading) {
    return (
      <Loader />
    );
  }

  return (
    <>
      {
        !recipe && error ? <div className="error-message flex-center">{error}</div> : 
        <main className="recipe-detail-page">
          <div className="recipe-image" style={{backgroundImage:`url(${recipe?.image})`}}>
            <button className='btn btn-sm' onClick={() => navigate(-1)}>Back</button>
          </div>

          <section className='recipe-details'>
            <div className='container'>
              <div className="recipe-details-grid">
                <div className='recipe-details-card'>
                  <h1>{recipe?.title}</h1>
                  
                <section className="ingredients">
                  <div className="heading">
                    <h2>Ingredients</h2>
                  </div>
                  <ul>
                    {recipe?.extendedIngredients.map((ing) => (
                      <li key={ing.id}>
                        {ing.name} <span>{ing.amount} {ing.unit}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="instructions">
                  <h2>Instructions</h2>
                  <ol>
                    {recipe?.analyzedInstructions[0]?.steps.map((step) => (
                      <li key={step.number}>{step.step}</li>
                    ))}
                  </ol>
                </section>
                </div>
                <div className='recipe-details-card'>     
                  <span>Ready in {recipe?.readyInMinutes} mins </span>
                  <span>Servings: {recipe?.servings}</span>           
                  <p className="health-info">
                    {recipe?.vegan && <span><img src="/img/vegan.png" alt="" />Vegan</span>}
                    {recipe?.vegetarian && <span><img src="/img/vegetarian.png" alt="" />Vegetarian</span>}
                    {recipe?.glutenFree && <span><img src="/img/nogluten.png" alt="" />Gluten Free</span>}
                    {recipe?.dairyFree && <span><img src="/img/nodairy.png" alt="" />Dairy Free</span>}
                    {recipe?.veryHealthy && <span><img src="/img/healthy.png" alt="" />Very healthy</span>}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      }
    </>
  );
};

export default RecipeDetails;