import type { Cuisine } from '../types/recipe';

const RecipeFilter = ({label,checked,onChange}:Cuisine) => {
  return (
    <div>
      <input id={label} type="checkbox" checked={checked} onChange={() => onChange?.(label)}/>
      <label htmlFor={label} className="filter-checkbox">{ label }</label>
    </div>
  )
}

export default RecipeFilter