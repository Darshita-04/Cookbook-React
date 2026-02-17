import RecipeCard from './RecipeCard'
import type { Recipe } from '../types/recipe';
interface RecipesProps {
  recipes: Recipe[];
}
const RecipeList = ({recipes}:RecipesProps) => {
  return (
    <div className='recipe-list'> 
      {
        recipes.map(recipe => (
          <RecipeCard key={recipe.id} title={recipe.title} image={recipe.image} id={recipe.id as number} />
        ))
      }
    </div>
  )
}

export default RecipeList