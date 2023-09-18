import { createContext, useState } from "react";

export const CarouselContext = createContext({
  isInfinite: true,
});

const CarouselContextProvider = ({ children }) => {
  const [isInfinite, setIsInfinite] = useState(true);

  return (
    <CarouselContext.Provider value={{ isInfinite, setIsInfinite }}>
      {children}
    </CarouselContext.Provider>
  );
};

export default CarouselContextProvider;
