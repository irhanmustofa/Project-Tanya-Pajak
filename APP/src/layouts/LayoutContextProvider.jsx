import { layoutsContext } from "@/layouts/LayoutContext";

export function LayoutProvider({ children }) {
  return (
    <layoutsContext.Provider value={{}}>{children}</layoutsContext.Provider>
  );
}
