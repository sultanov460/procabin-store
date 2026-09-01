"use client";

import { createContext, useContext, useMemo, useState } from "react";

type VariantSelectionContextValue = {
  selectedImage?: string;
  setSelectedImage: (image?: string) => void;
};

const VariantSelectionContext = createContext<VariantSelectionContextValue | null>(null);

export function VariantSelectionProvider({ children }: { children: React.ReactNode }) {
  const [selectedImage, setSelectedImage] = useState<string>();
  const value = useMemo(() => ({ selectedImage, setSelectedImage }), [selectedImage]);
  return <VariantSelectionContext.Provider value={value}>{children}</VariantSelectionContext.Provider>;
}

export function useVariantSelection() {
  const context = useContext(VariantSelectionContext);
  if (!context) throw new Error("useVariantSelection must be used within VariantSelectionProvider");
  return context;
}
