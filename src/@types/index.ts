export interface User {
  email: string;
  password: string;
}

export interface IngredientsProps {
  name: string;
}

export interface PortionSizeProps {
  portionSize: string;
}

export interface dataGatheringProps {
  ingredient_id: string,
  ingredient_name: IngredientsProps[],
  initial_amount: number,
  final_amount: number,
  // unit: string,
}
