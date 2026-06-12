import { createContext, useContext, useState, ReactNode } from 'react';
import { Medicine } from '../types';
import { medicines as initialMedicines } from '../data/medicines';

interface AppContextType {
  medicines: Medicine[];
  selectedLocation: string;
  setSelectedLocation: (loc: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [medicines] = useState<Medicine[]>(initialMedicines);
  const [selectedLocation, setSelectedLocation] = useState('MVP Colony');
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  return (
    <AppContext.Provider value={{
      medicines,
      selectedLocation,
      setSelectedLocation,
      searchQuery,
      setSearchQuery,
      toast,
      showToast,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
