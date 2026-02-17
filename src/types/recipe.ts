
// Recipe schema
export interface Recipe {
  title:string,
  image:string,
  id: number | null
}
// Cuisine schema
export interface Cuisine {
  label:string,
  checked:boolean,
  onChange?: (label:string) => void
}
// Pagination schema
export interface PaginationProps {
  currentPage:number,
  totalPages:number,
  changePage: (currentPage:number) => void
}
// Recipe detail schema
interface Ingredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
}
export interface InstructionStep {
  number: number;
  step: string;
}
export interface AnalyzedInstruction {
  name: string;
  steps: InstructionStep[];
}
export interface RecipeDetail {
  title: string;
  image: string;
  vegan: boolean;
  vegetarian: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  veryHealthy: boolean;
  readyInMinutes: number;
  servings: number;
  extendedIngredients: Ingredient[];
  analyzedInstructions: AnalyzedInstruction[];
}
