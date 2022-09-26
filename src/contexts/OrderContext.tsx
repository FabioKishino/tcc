import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { Order } from '../@types';

import api from '../services/api';

// export interface OrderProps {
//   id: string,
//   recipe: string,
//   portion_size: string,
//   status: string | number,
//   created_at: string,

//   id_recipe?: string,
//   portion_id?: string,
//   priority?: string | number,
// }

interface OrderContextType {
  orders: Order[],
  setOrders: (orders: Order[]) => void,
  handleCloseNewOrderMenuAndSubmit: () => void,
  newOrder: Order,
  setNewOrder: (newOrder: Order) => void,
  newOrderIsOpen: boolean,
  setNewOrderIsOpen: (newOrderIsOpen: boolean) => void,
  handleOpenNewOrderMenu: () => void,
  handleCloseNewOrderMenu: () => void,
  recipeOptions: { value: string, label: string, id_recipe: string }[],
  amountOptions: { value: string, label: string, portion_id: string }[],
  statusOptions: { value: string, label: string }[],
  priorityOptions: { value: string, label: string, priority: number }[],
}

interface OrdersProviderProps {
  children: ReactNode;
}

export const OrdersContext = createContext({} as OrderContextType);

export function OrdersProvider({ children }: OrdersProviderProps) {

  const [orders, setOrders] = useState<Order[]>([]);
  const [newOrder, setNewOrder] = useState<Order>({} as Order);
  const [newOrderIsOpen, setNewOrderIsOpen] = useState(false);

  const [recipeOptions, setRecipeOptions] = useState<any[]>([]);
  const [amountOptions, setAmountOptions] = useState<any[]>([]);

  useEffect(() => {
    setRecipeOptions([]);
    setAmountOptions([]);
    const token = localStorage.getItem("@Auth:token");

    // GET RECIPES
    api.get('/recipes', {
      headers: {
        'ContentType': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      const recipes = [] as any[]
      response.data.recipes.map((r: any, index: number) => {
        recipes.push({
          value: (index + 1).toString(),
          id_recipe: r.id,
          label: r.name
        })
      })
      setRecipeOptions(recipeOptions.concat(recipes));
    });

    // GET PORTION SIZES
    api.get('/portionsizes', {
      headers: {
        'ContentType': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      const portions = [] as any[]
      response.data.portion_sizes.map((p: any, index: number) => {
        portions.push({
          value: (index + 1).toString(),
          portion_id: p.id,
          label: p.name
        })
      })
      setAmountOptions(amountOptions.concat(portions));
    });
  }, [])

  const [statusOptions, setStatusOptions] = useState([
    {
      value: '1',
      label: "Em Progresso",
    },
    {
      value: '2',
      label: 'Cancelado',
    },
    {
      value: '3',
      label: 'Concluído',
    }
  ]);

  const [priorityOptions, setPriorityOptions] = useState([
    {
      value: '1',
      label: 'Baixa',
      priority: 1
    },
    {
      value: '2',
      label: 'Média',
      priority: 2
    },
    {
      value: '3',
      label: 'Alta',
      priority: 3
    }
  ]);


  function handleOpenNewOrderMenu() {
    setNewOrderIsOpen(true);
  }

  function handleCloseNewOrderMenu() {
    setNewOrderIsOpen(false);
  }

  async function handleCloseNewOrderMenuAndSubmit() {
    setNewOrderIsOpen(false);
    setOrders([newOrder, ...orders]);

    const token = localStorage.getItem("@Auth:token");
    const response = await api.post('/orders', newOrder, {
      headers: {
        'ContentType': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
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
      statusOptions,
      priorityOptions
    }}>
      {children}
    </OrdersContext.Provider>
  )
}