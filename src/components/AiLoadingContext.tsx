"use client";
import { createContext, useContext, useState, ReactNode } from "react";

// Context type
interface AiLoadingContextType {
  aiLoading: boolean;
  setAiLoading: (loading: boolean) => void;
}

// Create context
export const AILoadingContext = createContext<AiLoadingContextType | undefined>(
  undefined
);

// Provider
export const AILoadingProvider = ({ children }: { children: ReactNode }) => {
  const [aiLoading, setAiLoading] = useState(false);

  return (
    <AILoadingContext.Provider value={{ aiLoading, setAiLoading }}>
      {children}
    </AILoadingContext.Provider>
  );
};

export const useAiLoading = () => {
  const context = useContext(AILoadingContext);
  if (!context)
    throw new Error("useAiLoading must be used within AILoadingProvider");
  return context;
};
