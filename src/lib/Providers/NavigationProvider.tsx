// NavigationContext.tsx
import { createContext, useContext, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const NavigationContext = createContext<{ previousPath: string | null; }>({ previousPath: null });

export const NavigationProvider = ({ children }: { children: React.ReactNode; }) => {
    const location = useLocation();
    const previousPathRef = useRef<string | null>(null);

    const currentPath = location.pathname;

    useEffect(() => {
        previousPathRef.current = currentPath;
    }, [currentPath]);

    return (
        <NavigationContext.Provider value={{ previousPath: previousPathRef.current }}>
            {children}
        </NavigationContext.Provider>
    );
};

export const usePreviousPath = () => useContext(NavigationContext);
