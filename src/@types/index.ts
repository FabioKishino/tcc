export interface User {
  email: string;
  password: string;
}

export interface Ingredients {
  name: string;
}

export interface dataGatheringProps {
  ingredient_id: string,
  ingredient_name: Ingredients[],
  initial_amount: number,
  final_amount: number,
  // unit: string,
}
