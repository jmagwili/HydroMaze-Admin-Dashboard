import { createContext, ReactNode } from "react";

interface SidebarContextProps {
  expanded: boolean;
  activeItem: string | null;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveItem: React.Dispatch<React.SetStateAction<string | null>>;
}

const SidebarContext = createContext<SidebarContextProps>({
  expanded: true,
  activeItem: null,
  setExpanded: () => {},
  setActiveItem: () => {} 
});

export default SidebarContext;
