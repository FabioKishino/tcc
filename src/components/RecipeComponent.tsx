interface RecipeProps {
  recipe: string;
}

export function RecipeComponent ({ recipe }: RecipeProps) {
  return (
    <div className="recipe-component-content">
      <label>Nome</label>
      <h3>{recipe}</h3>
    </div>
  )
}