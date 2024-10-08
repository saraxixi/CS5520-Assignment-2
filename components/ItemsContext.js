import React, { createContext, useState } from 'react';

export const ItemsContext = createContext();

export function ItemsProvider({ children }) {
  const [items, setItems] = useState({
    activities: [],
    diet: [],
  });

  const addActivity = (newActivity) => {
    setItems((prevItems) => ({
      ...prevItems,
      activities: [...prevItems.activities, newActivity],
    }));
  };

  return (
    <ItemsContext.Provider value={{ items, setItems, addActivity }}>
      {children}
    </ItemsContext.Provider>
  );
}
