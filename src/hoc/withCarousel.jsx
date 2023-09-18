import { useRef, useEffect } from "react";

import useCarousel from "../hooks/useCarousel";

const withCarousel =
  (WrappedComponent) =>
  ({ slidesData, ...restProps }) => {
    const {
      activeIdx,
      setActiveIdx,
      STARTING_INDEX,
      SLIDE_DIMENSIONS,
      TRANSITION_STYLE_VALUE,
      SLIDE_CARD_TRANSITION_VALUE_SECONDS,
      getTransformStyle,
      getSlideInitialTransformStyle,
    } = useCarousel(false);

    // FOR THE INDIVIDUAL CARD
    const CUSTOM_CARD_STYLE_VALUE = {
      transition: `${SLIDE_CARD_TRANSITION_VALUE_SECONDS}s`,
    };

    // REFS FOR CALCULATION
    const cardsCtrRef = useRef();

    const slideScrollHandler = (slideIndex) => {
      cardsCtrRef.current.style.transform = getTransformStyle(slideIndex);
      setActiveIdx(slideIndex);
    };

    const nextSlideHandler = () => {
      if (activeIdx < slidesData.length - 1) {
        slideScrollHandler(activeIdx + 1);
        return;
      }

      // console.log("Last Slide");
    };

    const prevSlideHandler = () => {
      if (activeIdx > 0) {
        slideScrollHandler(activeIdx - 1);
        return;
      }

      // console.log("First Slide");
    };

    const dotsHandler = (idx) => {
      slideScrollHandler(STARTING_INDEX + idx);
    };

    useEffect(() => {
      cardsCtrRef.current.style.transform = getSlideInitialTransformStyle();
      cardsCtrRef.current.style.transition = TRANSITION_STYLE_VALUE;
    }, [getSlideInitialTransformStyle, TRANSITION_STYLE_VALUE]);

    return (
      <WrappedComponent
        activeIdx={activeIdx}
        slidesData={slidesData}
        totalSlides={slidesData.length}
        cardsCtrRef={cardsCtrRef}
        slideDimensions={SLIDE_DIMENSIONS}
        dotsHandler={dotsHandler}
        nextSlideHandler={nextSlideHandler}
        prevSlideHandler={prevSlideHandler}
        slideScrollHandler={slideScrollHandler}
        customCardStyle={CUSTOM_CARD_STYLE_VALUE}
        {...restProps}
      />
    );
  };

export default withCarousel;
