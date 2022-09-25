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
  statusOptions: { value: string, label: string | number, priority: number }[],
}

interface OrdersProviderProps {
  children: ReactNode;
}

export const OrdersContext = createContext({} as OrderContextType);

export function OrdersProvider({ children }: OrdersProviderProps) {

  const [orders, setOrders] = useState<Order[]>([]);
  const [newOrder, setNewOrder] = useState<Order>({} as Order);
  const [newOrderIsOpen, setNewOrderIsOpen] = useState(false);

  const [reload, setReload] = useState(false);

  const [recipeOptions, setRecipeOptions] = useState([
    {
      value: '1',
      label: 'Receita Teste',
      id_recipe: '1a118ff1-f009-46ba-98fa-b09bed39be3f'
    },
  ]);

  const [amountOptions, setAmountOptions] = useState([
    {
      value: '1',
      label: 'Porção Teste',
      portion_id: 'bb069028-f6e1-410f-b46e-e9557378b94a'
    }
  ]);

  const [statusOptions, setStatusOptions] = useState([
    {
      value: '1',
      label: "Em Progresso",
      priority: 2
    },
    {
      value: '2',
      label: 'Cancelado',
      priority: 1
    },
    {
      value: '2',
      label: 'Concluído',
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

    // api.post('/orders', newOrder, { 
    //   headers: { 
    //     'ContentType': 'application/json',
    //     'Authorization': `Bearer ${token}`
    //   } 
    // })
    // .then(response => {
    //   setOrders([...orders, response.data]);
    //   setReload(!reload)
    // })
    // .catch(error => {

    // })
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