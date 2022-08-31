import { createContext, ReactNode, useState } from "react";

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

  handleCloseNewOrderMenuAndSubmit: () => void,
  newOrder: OrderProps,
  setNewOrder: (newOrder: OrderProps) => void,
  newOrderIsOpen: boolean,
  setNewOrderIsOpen: (newOrderIsOpen: boolean) => void,
  handleOpenNewOrderMenu: () => void,
  handleCloseNewOrderMenu: () => void,
}

interface OrdersProviderProps {
  children: ReactNode;
}

export const OrdersContext = createContext({} as OrderContextType);

export function OrdersProvider({ children }: OrdersProviderProps) {
  
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const [newOrder, setNewOrder] = useState<OrderProps>({} as OrderProps);
  const [newOrderIsOpen, setNewOrderIsOpen] = useState(false);
  
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
    await api.post('/orders', newOrder);
  }

  return (
    <OrdersContext.Provider value={{ 
        orders, 
        handleCloseNewOrderMenuAndSubmit, 
        newOrder, 
        setNewOrder, 
        newOrderIsOpen, 
        setNewOrderIsOpen,
        handleOpenNewOrderMenu,
        handleCloseNewOrderMenu
      }}>
      {children}
    </OrdersContext.Provider>
  )
}