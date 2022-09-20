export interface User {
  email: string;
  password: string;
}

export interface Order {
  id: string,
  
  recipe?: Recipe,
  portion_size?: PortionSize,
  created_at: string,
  end_at?: string,
  status?: string | number,

  // Envio:
  id_recipe: string,
  portion_id: string,
  priority: string | number,
  
}

export interface Recipe {
  id: string,
  name: string,
}

export interface PortionSize{
  id: string,
  name: string,
}

// Components V

export interface IngredientsProps {
  name: string;
}

export interface PortionSizeProps {
  name: string;
  handleDeletePortion: () => void;
}

export interface DataGatheringProps {
  ingredient_name: string,
  handleDeleteDataGathering: () => void,
}
