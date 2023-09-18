import React, { useRef, useState, useEffect, useCallback } from "react";

import useCarousel from "../hooks/useCarousel";

const withInfiniteCarousel =
  (WrappedComponent) =>
  ({ slidesData, ...restProps }) => {
    const {
      activeIdx,
      setActiveIdx,
      STARTING_INDEX,
      SLIDE_DIMENSIONS,
      TRANSITION_STYLE_VALUE,
      TRANSITION_VALUE_SECONDS,
      SLIDE_CARD_TRANSITION_VALUE_SECONDS,
      getTransformStyle,
      getSlideInitialTransformStyle,
    } = useCarousel(true, slidesData.length);

    // STATES
    const [customCardStyle, setCustomCardStyle] = useState({
      transition: "none",
    });

    // REFS FOR CALCULATION
    const cardsCtrRef = useRef();
    const isSliderLockRef = useRef(false);
    const slidesDataRef = useRef([
      ...slidesData,
      ...slidesData,
      ...slidesData,
      ...slidesData,
    ]);

    const lockSlider = useCallback(() => {
      isSliderLockRef.current = true;
    }, []);

    const unLockSlider = useCallback(() => {
      setTimeout(() => {
        isSliderLockRef.current = false;
      }, TRANSITION_VALUE_SECONDS * 1000);
    }, [TRANSITION_VALUE_SECONDS]);

    const playNRemoveAnimation = useCallback(
      (transformValue) => {
        //* +ADDING ANIMATION
        cardsCtrRef.current.style.transform = transformValue;
        cardsCtrRef.current.style.transition = TRANSITION_STYLE_VALUE;
        setCustomCardStyle({
          transition: `${SLIDE_CARD_TRANSITION_VALUE_SECONDS}s`,
        });

        //? -REMOVING ANIMATION,
        //? SO THAT IT DO NOT ANIMATES WHILE RESETTING BACK TO INITIAL POSITION
        setTimeout(() => {
          cardsCtrRef.current.style.transition = "none";
          setCustomCardStyle({ transition: "none" });
        }, TRANSITION_VALUE_SECONDS * 1000);
      },
      [
        TRANSITION_STYLE_VALUE,
        TRANSITION_VALUE_SECONDS,
        SLIDE_CARD_TRANSITION_VALUE_SECONDS,
      ]
    );

    const dotsHandler = (idx) => {
      slideScrollHandler(STARTING_INDEX + idx);
    };

    const slideScrollHandler = (slideIndex) => {
      if (slideIndex === activeIdx || isSliderLockRef.current) return;

      // LOCKING THE SLIDER SO IT BECOMES UNAVAILABLE FOR INTERACTION,
      // SO THAT IT SAFELY MOVES TO THE DESIRED SLIDE, NOT BE INTERUPPTED BY USER EVENT
      lockSlider();

      // ADDING AND REMOVING AND REMOVING ANIMATION,
      // SO RESETS ARE NOT NOTICED
      // THIS FUNCTION ONLY CONCERNS WITH STYLES
      playNRemoveAnimation(getTransformStyle(slideIndex));
      setActiveIdx(slideIndex);

      // UNLOCKING THE SLIDER SO IT BECOMES AVAILABLE FOR INTERACTION,
      // AFTER THE ANIMATION HAS COMPLETED
      unLockSlider();
    };

    const nextSlideHandler = () => {
      slideScrollHandler(activeIdx + 1);
    };

    const prevSlideHandler = () => {
      slideScrollHandler(activeIdx - 1);
    };

    // FOR INFINITE CAROUSEL
    useEffect(() => {
      // TO MOVE BACK THE CAROUSEL TO INITIAL POSITION
      // ONLY TRIGGER WHEN WE FINISH THE ORIGINAL LIST
      let timer = undefined;

      // WITH CONDITION FOR REVERTING FROM LEFT SIDE END & RIGHT SIDE END
      if (
        activeIdx <= STARTING_INDEX - slidesData.length ||
        activeIdx >= STARTING_INDEX + slidesData.length
      ) {
        console.log("--- RESETING ----");

        timer = setTimeout(() => {
          const absoluteIndex = activeIdx % slidesData.length;
          // UPDATING POSITION
          cardsCtrRef.current.style.transform =
            getSlideInitialTransformStyle(absoluteIndex);

          // UPDATING ACTIVE INDEX
          setActiveIdx(STARTING_INDEX + absoluteIndex);
        }, TRANSITION_VALUE_SECONDS * 1000);
      }

      // CLEARING setTimeout, IF COMPONENT UNMOUNTS
      return () => {
        if (timer) {
          clearTimeout(timer);
        }
      };
    }, [activeIdx]);

    useEffect(() => {
      cardsCtrRef.current.style.transform = getSlideInitialTransformStyle();
    }, []);

    return (
      <WrappedComponent
        activeIdx={activeIdx}
        cardsCtrRef={cardsCtrRef}
        totalSlides={slidesData.length}
        customCardStyle={customCardStyle}
        slidesData={slidesDataRef.current}
        dotsHandler={dotsHandler}
        slideDimensions={SLIDE_DIMENSIONS}
        nextSlideHandler={nextSlideHandler}
        prevSlideHandler={prevSlideHandler}
        slideScrollHandler={slideScrollHandler}
        {...restProps}
      />
    );
  };

export default withInfiniteCarousel;
