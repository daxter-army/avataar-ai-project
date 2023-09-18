import { useContext } from "react";

import { CarouselContext } from "../context/carouselContext";

const useCarouselContext = () => useContext(CarouselContext);

export default useCarouselContext;
