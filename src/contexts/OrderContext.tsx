import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import api from '../services/api';

export interface OrderProps {
  // id: number,
  recipe: string,
  amount: string,
  status: string,
  created_at: string,
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
  recipeOptions: { value: string, label: string }[],
  amountOptions: { value: string, label: string }[],
  statusOptions: { value: string, label: string }[],
}

interface OrdersProviderProps {
  children: ReactNode;
}

export const OrdersContext = createContext({} as OrderContextType);

export function OrdersProvider({ children }: OrdersProviderProps) {

  const [orders, setOrders] = useState<OrderProps[]>([]);
  const [newOrder, setNewOrder] = useState<OrderProps>({} as OrderProps);
  const [newOrderIsOpen, setNewOrderIsOpen] = useState(false);

  const [recipeOptions, setRecipeOptions] = useState([ { value: '1', label: 'Yakisoba' }, { value: '2', label: 'Salmão Grelhado' } ]);
  const [amountOptions, setAmountOptions] = useState([ { value: '1', label: '1 Porção' }, { value: '2', label: '1/2 Porção' } ]);
  const [statusOptions, setStatusOptions] = useState([ { value: '1', label: 'Em andamento' }, { value: '2', label: 'Cancelado' } ]);
  
  
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
    const response = await api.post('/orders', newOrder);
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