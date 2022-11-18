export interface User {
  email: string;
  password: string;
}

export interface UProfile {
  id: string;
  name: string;
  email: string;
  city: string;
  state: string;
}

export interface Order {
  id: string,

  recipe?: Recipe,
  portion_size?: PortionSize,
  created_at: string,
  end_at: string,
  priority?: number,
  status?: string,

  // Envio:
  id_recipe: string,
  portion_id: string,

  updateOrder: (order: Order) => void,
}

export interface Recipe {
  id_recipe: string,
  name: string,
}

export interface RecipeIngredients {
  id_ingredient: string,
  amount: number;
  unit: string;
}


export interface PortionSize {
  id: string,
  name: string,
}

// Components V

export interface IngredientProps {
  id: string,
  name: string;
}

export interface PortionSizeProps {
  id: string,
  name: string;
}

export interface DataGatheringProps {
  initial_amount: number;
  final_amount: number;
  ingredient_name: string,
  handleDeleteDataGathering: () => void,
  handleChangeAmount: (initial_amount: number, final_amount: number) => void,
}

export interface DataGatheringItem {
  name: string;
  id_ingredient: string;
  initial_amount: number;
  final_amount: number;
  unit: string;
}

export interface DataGatheringReceived {
  id_ingredient: string;
  initial_amount: number;
  final_amount: number;
  unit: string;
  ingredient: {
    name: string;
  }
}

export interface ForecastedData {
  date: string,
  ingredients: {
    name: string,
    amount: number,
    unit: string
  }[]
}
