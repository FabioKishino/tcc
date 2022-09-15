import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import api from '../services/api';

// export interface OrderProps {
//   id?: string,
//   created_at?: string,
//   end_at?: string,
  
//   portion_size?: {
//     id: string,
//     name: string,
//   },

//   recipe?: {
//     id: string,
//     name: string,
//   },

//   status?: string | number,
  

//   id_recipe?: string,
//   portion_id?: string,
//   priority?: string | number,
// }

export interface OrderProps {
  id: string,
  created_at: string,
  portion_size: string,
  recipe: string,
  status: string | number,
  
  id_recipe: string,
  portion_id: string,
  priority: string | number,
}

interface OrderContextType {
  orders: OrderProps[],
  setOrders: (orders: OrderProps[]) => void,
  handleCloseNewOrderMenuAndSubmit: () => void,
  newOrder: OrderProps,
  setNewOrder: (newOrder: OrderProps) => void,
  newOrderIsOpen: boolean,
  setNewOrderIsOpen: (newOrderIsOpen: boolean) => void,
  handleOpenNewOrderMenu: () => void,
  handleCloseNewOrderMenu: () => void,
  recipeOptions: { value: string, label: string, id_recipe: string }[],
  amountOptions: { value: string, label: string, portion_id: string }[],
  statusOptions: { value: string, label: string | number, priority: number}[],
}

interface OrdersProviderProps {
  children: ReactNode;
}

export const OrdersContext = createContext({} as OrderContextType);

export function OrdersProvider({ children }: OrdersProviderProps) {

  const [orders, setOrders] = useState<OrderProps[]>([]);
  const [newOrder, setNewOrder] = useState<OrderProps>({} as OrderProps);
  const [newOrderIsOpen, setNewOrderIsOpen] = useState(false);

  const [recipeOptions, setRecipeOptions] = useState([ 
    { 
      value: '1', 
      label: 'Yakisoba', 
      id_recipe: '8095b1ed-d2d0-4a1c-955c-91acc6397646' 
    },
   ]);
  
  const [amountOptions, setAmountOptions] = useState([ 
    { 
      value: '1', 
      label: '1 Porção', 
      portion_id: '04f74162-8394-4543-a86b-938f2e0c4366' 
    }, 
    { 
      value: '2', 
      label: '1/2 Porção',
      portion_id: '20fe7454-5b03-409c-8322-2842be9b9eaf'
    } 
  ]);

  const [statusOptions, setStatusOptions] = useState([ 
    { 
      value: '1', 
      label: "Em andamento", 
      priority: 2 
    }, 
    { 
      value: '2', 
      label: 'Cancelado', 
      priority: 1 
    } 
  ]);
  
  
  function handleOpenNewOrderMenu () {
    setNewOrderIsOpen(true);
  }

  function handleCloseNewOrderMenu () {
    setNewOrderIsOpen(false);
  }
  
  async function handleCloseNewOrderMenuAndSubmit () {
    setNewOrderIsOpen(false);
    // Needs to submit the form to the back end and also add to the orders page
    setOrders([newOrder, ...orders]);

    const token = localStorage.getItem("@Auth:token");
    const response = await api.post('/orders', newOrder, { 
      headers: { 
        'ContentType': 'application/json',
        'Authorization': `Bearer ${token}`
      } 
    });
    console.log(response);
    console.log(response.data.created_at);
  }

  return (
    <OrdersContext.Provider value={{ 
        orders,
        setOrders,
        handleCloseNewOrderMenuAndSubmit, 
        newOrder, 
        setNewOrder, 
        newOrderIsOpen, 
        setNewOrderIsOpen,
        handleOpenNewOrderMenu,
        handleCloseNewOrderMenu,
        recipeOptions,
        amountOptions,
        statusOptions
      }}>
      {children}
    </OrdersContext.Provider>
  )
}