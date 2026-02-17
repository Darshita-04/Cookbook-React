import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import RecipeDetails from "./pages/RecipeDetails";
const App = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="recipe/:id" element={<RecipeDetails />} />
      </Routes>
    </>
  )
}

export default App
