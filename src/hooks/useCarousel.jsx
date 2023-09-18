import { useState } from "react";

const useCarousel = (isInfinite = false, slidesDataLength) => {
  const STARTING_INDEX = isInfinite ? 2 * slidesDataLength : 0;

  // ACTIVE SLIDE STATE
  const [activeIdx, setActiveIdx] = useState(STARTING_INDEX);

  // CONSTANTS THAT ARE USED IN THE CALCULATIONS
  // ALL THE DIMENSIONS ARE IN REM
  const SLIDE_DIMENSIONS = {
    width: 80 * 0.8,
    height: 56 * 0.8,
  };

  // THIS VALUE FOR THE ENTIRE CAROUSEL CONTAINER
  const TRANSITION_VALUE_SECONDS = 0.5;

  // THIS VALUE FOR EACH CARDS
  const SLIDE_CARD_TRANSITION_VALUE_SECONDS = 0.5;
  const TRANSITION_STYLE_VALUE = `-webkit-transform ${TRANSITION_VALUE_SECONDS}s ease 0s`;

  const getTransformValue = (slideIndex) => {
    return -(
      SLIDE_DIMENSIONS.width * slideIndex +
      0.5 * SLIDE_DIMENSIONS.width
    );
  };

  // FUNCTION TO RETURN INITIAL TRANSFORM VALUE BASED UPON THE INPUT slideIndex
  const getSlideInitialTransformValue = (slideIndex = 0) => {
    return -(
      0.5 * SLIDE_DIMENSIONS.width +
      SLIDE_DIMENSIONS.width * (STARTING_INDEX + slideIndex)
    );
  };

  // FUNCTION TO RETURN INITIAL TRANSFORM STYLES BASED UPON THE INPUT realIndex
  // realIndex -> index of the slide in slidesDataRef.current[]
  const getSlideInitialTransformStyle = (realIndex) => {
    return `translate(${getSlideInitialTransformValue(realIndex)}rem)`;
  };

  // FUNCTION TO RETURN TRANSFORM STYLES BASED UPON THE INPUT slideIndex
  const getTransformStyle = (slideIndex) => {
    return `translate(${getTransformValue(slideIndex)}rem)`;
  };

  return {
    activeIdx,
    setActiveIdx,
    STARTING_INDEX,
    SLIDE_DIMENSIONS,
    TRANSITION_VALUE_SECONDS,
    SLIDE_CARD_TRANSITION_VALUE_SECONDS,
    TRANSITION_STYLE_VALUE,
    getTransformStyle,
    getSlideInitialTransformStyle,
  };
};

export default useCarousel;
