import React, { createContext, useContext, useState } from 'react';
import { ServiceOrder, mockOrders } from '@/lib/mock-data';

interface OrdersContextType {
  orders: ServiceOrder[];
  addOrder: (order: Omit<ServiceOrder, 'id' | 'codigo'>) => void;
  updateOrder: (id: string, updates: Partial<ServiceOrder>) => void;
  deleteOrder: (id: string) => void;
  getNextCode: () => string;
}

const OrdersContext = createContext<OrdersContextType>({
  orders: [],
  addOrder: () => {},
  updateOrder: () => {},
  deleteOrder: () => {},
  getNextCode: () => '',
});

export const useOrders = () => useContext(OrdersContext);

export const OrdersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<ServiceOrder[]>(mockOrders);

  const getNextCode = () => {
    const maxNum = orders.reduce((max, o) => {
      const num = parseInt(o.codigo.replace('OS-', ''));
      return num > max ? num : max;
    }, 0);
    return `OS-${String(maxNum + 1).padStart(4, '0')}`;
  };

  const addOrder = (order: Omit<ServiceOrder, 'id' | 'codigo'>) => {
    const newOrder: ServiceOrder = {
      ...order,
      id: String(Date.now()),
      codigo: getNextCode(),
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  const updateOrder = (id: string, updates: Partial<ServiceOrder>) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, ...updates } : o));
  };

  const deleteOrder = (id: string) => {
    setOrders(prev => prev.filter(o => o.id !== id));
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder, updateOrder, deleteOrder, getNextCode }}>
      {children}
    </OrdersContext.Provider>
  );
};
