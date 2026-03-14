import React, { createContext, useContext, useState, useEffect } from 'react';
import { AccentColor, accentColors } from '@/lib/mock-data';

interface AccentColorContextType {
  accentColor: AccentColor;
  setAccentColor: (color: AccentColor) => void;
}

const AccentColorContext = createContext<AccentColorContextType>({
  accentColor: 'blue',
  setAccentColor: () => {},
});

export const useAccentColor = () => useContext(AccentColorContext);

export const AccentColorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accentColor, setAccentColorState] = useState<AccentColor>(() => {
    return (localStorage.getItem('accent-color') as AccentColor) || 'blue';
  });

  const setAccentColor = (color: AccentColor) => {
    setAccentColorState(color);
    localStorage.setItem('accent-color', color);
  };

  useEffect(() => {
    const { h, s, l } = accentColors[accentColor];
    document.documentElement.style.setProperty('--accent-h', String(h));
    document.documentElement.style.setProperty('--accent-s', s);
    document.documentElement.style.setProperty('--accent-l', l);
  }, [accentColor]);

  return (
    <AccentColorContext.Provider value={{ accentColor, setAccentColor }}>
      {children}
    </AccentColorContext.Provider>
  );
};
