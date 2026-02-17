import { NavLink } from 'react-router'
import type { Recipe } from '../types/recipe';
const RecipeCard = ({title,image,id}:Recipe) => {
  return (
    <div className="recipe-card">
      <NavLink to={`/recipe/${id}`}>
      <div>
        <img src={image} alt={title}/>
      </div>
      <h3 className="recipe-title">{ title }</h3>
    </NavLink>
    </div>
  )
}

export default RecipeCard