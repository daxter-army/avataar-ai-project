import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";

const withCarousel =
  (WrappedComponent) =>
  ({ isInfinite, slidesData, ...restProps }) => {
    // STARTING INDEX
    const STARTING_INDEX = isInfinite ? 2 * slidesData.length : 0;

    // STATES
    const [activeIdx, setActiveIdx] = useState(STARTING_INDEX);
    const [customCardStyle, setCustomCardStyle] = useState({
      transition: "none",
    });

    // CONSTANTS THAT ARE USED IN THE CALCULATIONS
    // ALL THE DIMENSIONS ARE IN REM
    const SLIDE_DIMENSIONS = {
      width: 80 * 0.8,
      height: 56 * 0.8,
    };
    const TRANSITION_VALUE_SECONDS = 0.5;
    const NAVIGATION_DOTS_CTR_WIDTH = 18.2;
    const NEXT_TRANSFORM_VALUE = useMemo(
      () =>
        -(
          SLIDE_DIMENSIONS.width * (activeIdx + 1) +
          0.5 * (SLIDE_DIMENSIONS.width - NAVIGATION_DOTS_CTR_WIDTH)
        ),
      [activeIdx]
    );
    const PREV_TRANSFORM_VALUE = useMemo(
      () =>
        -(
          SLIDE_DIMENSIONS.width * (activeIdx - 1) +
          0.5 * (SLIDE_DIMENSIONS.width - NAVIGATION_DOTS_CTR_WIDTH)
        ),
      [activeIdx]
    );
    const INITIAL_TRANSFORM_VALUE = useMemo(
      () =>
        -(
          0.5 * (SLIDE_DIMENSIONS.width - NAVIGATION_DOTS_CTR_WIDTH) +
          SLIDE_DIMENSIONS.width * STARTING_INDEX
        ),
      [STARTING_INDEX]
    );
    const SLIDE_CARD_TRANSITION_VALUE_SECONDS = 0.5;
    const NEXT_TRANSFORM_STYLE_VALUE = `translate(${NEXT_TRANSFORM_VALUE}rem)`;
    const PREV_TRANSFORM_STYLE_VALUE = `translate(${PREV_TRANSFORM_VALUE}rem)`;
    const TRANSITION_STYLE_VALUE = `-webkit-transform ${TRANSITION_VALUE_SECONDS}s ease 0s`;
    const INITIAL_TRANSFORM_STYLES_VALUE = `translate(${INITIAL_TRANSFORM_VALUE}rem)`;

    // REFS FOR CALCULATION
    const cardsCtrRef = useRef();
    const navigationRef = useRef();
    const isSliderLockRef = useRef(false);
    const slidesDataRef = useRef(
      isInfinite
        ? [...slidesData, ...slidesData, ...slidesData, ...slidesData]
        : slidesData
    );

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

    const slideScroller = (slideIndex) => {
      if (slideIndex === activeIdx) return;

      const isForward = slideIndex > activeIdx;

      // INFINTE USE-CASE
      if (isInfinite) {
        lockSlider();

        // FORWARD
        if (isForward) {
          // ADDING AND REMOVING AND REMOVING ANIMATION,
          // SO RESETS ARE NOT NOTICED
          playNRemoveAnimation(NEXT_TRANSFORM_STYLE_VALUE);
        } else {
          // BACKWARD
          playNRemoveAnimation(PREV_TRANSFORM_STYLE_VALUE);
        }

        setActiveIdx(slideIndex);

        unLockSlider();
        return;
      }

      // NON-INFINITE USE-CASE
      if (isForward) {
        if (activeIdx < slidesDataRef.current.length - 1) {
          cardsCtrRef.current.style.transform = NEXT_TRANSFORM_STYLE_VALUE;
          setActiveIdx(slideIndex);
        }
      } else {
        if (activeIdx > 0) {
          cardsCtrRef.current.style.transform = PREV_TRANSFORM_STYLE_VALUE;
          setActiveIdx(slideIndex);
        }
      }
    };

    const nextSlideHandler = () => {
      // FOR INFINITE USE-CASE
      if (isInfinite) {
        if (isSliderLockRef.current) return;
        // LOCKING THE SLIDER SO IT BECOMES UNAVAILABLE FOR INTERACTION,
        // SO THAT IT SAFELY MOVES TO THE DESIRED SLIDE, NOT BE INTERUPPTED BY USER EVENT
        isSliderLockRef.current = true;

        // ADDING AND REMOVING AND REMOVING ANIMATION,
        // SO RESETS ARE NOT NOTICED
        playNRemoveAnimation(NEXT_TRANSFORM_STYLE_VALUE);
        setActiveIdx(activeIdx + 1);

        // UNLOCKING THE SLIDER SO IT BECOMES AVAILABLE FOR INTERACTION,
        // AFTER THE ANIMATION HAS COMPLETED
        unLockSlider();

        return;
      }

      // FOR NON-INFINITE USE-CASE
      if (activeIdx < slidesDataRef.current.length - 1) {
        cardsCtrRef.current.style.transform = NEXT_TRANSFORM_STYLE_VALUE;
        setActiveIdx(activeIdx + 1);
        return;
      }

      // console.log("Last Slide");
    };

    const prevSlideHandler = () => {
      // FOR INFINITE USE-CASE
      if (isInfinite) {
        if (isSliderLockRef.current) return;
        // LOCKING THE SLIDER SO IT BECOMES UNAVAILABLE FOR INTERACTION,
        // SO THAT IT SAFELY MOVES TO THE DESIRED SLIDE, NOT BE INTERUPPTED BY USER EVENT
        isSliderLockRef.current = true;

        // ADDING AND REMOVING AND REMOVING ANIMATION,
        // SO RESETS ARE NOT NOTICED
        playNRemoveAnimation(PREV_TRANSFORM_STYLE_VALUE);
        setActiveIdx(activeIdx - 1);

        // UNLOCKING THE SLIDER SO IT BECOMES AVAILABLE FOR INTERACTION,
        // AFTER THE ANIMATION HAS COMPLETED
        unLockSlider();

        return;
      }

      // FOR NON-INFINITE USE-CASE
      if (activeIdx > 0) {
        cardsCtrRef.current.style.transform = PREV_TRANSFORM_STYLE_VALUE;
        setActiveIdx(activeIdx - 1);
        return;
      }

      // console.log("First Slide");
    };

    // FOR INFINITE CAROUSEL
    useEffect(() => {
      // TO MOVE BACK THE CAROUSEL TO INITIAL POSITION
      // ONLY TRIGGER WHEN WE FINISH THE ORIGINAL LIST
      let timer = undefined;

      // WITH CONDITION FOR REVERTING FROM LEFT SIDE END & RIGHT SIDE END
      if (
        isInfinite &&
        (activeIdx === STARTING_INDEX - slidesData.length ||
          activeIdx === STARTING_INDEX + slidesData.length)
      ) {
        // console.log("--- RESETING ----");

        timer = setTimeout(() => {
          cardsCtrRef.current.style.transform = INITIAL_TRANSFORM_STYLES_VALUE;
          setActiveIdx(STARTING_INDEX);
        }, TRANSITION_VALUE_SECONDS * 1000);
      }

      // console.log(navigationRef.current.getBoundingClientRect());
      // CLEARING setTimeout, IF COMPONENT UNMOUNTS
      return () => {
        if (timer) {
          clearTimeout(timer);
        }
      };
    }, [activeIdx]);

    // FOR FINITE CAROUSEL
    useEffect(() => {
      // NEEDED FOR BOTH USE-CASE
      cardsCtrRef.current.style.transform = INITIAL_TRANSFORM_STYLES_VALUE;

      if (!isInfinite)
        cardsCtrRef.current.style.transition = TRANSITION_STYLE_VALUE;
    }, []);

    return (
      <WrappedComponent
        activeIdx={activeIdx}
        isInfinite={isInfinite}
        totalDots={slidesData.length}
        cardsCtrRef={cardsCtrRef}
        navigationRef={navigationRef}
        customCardStyle={customCardStyle}
        slidesData={slidesDataRef.current}
        slideDimensions={SLIDE_DIMENSIONS}
        nextSlideHandler={nextSlideHandler}
        prevSlideHandler={prevSlideHandler}
        {...restProps}
      />
    );
  };

export default withCarousel;
