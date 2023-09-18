import React from "react";

import NavigationDots from "../NavigationDots/NavigationDots";
import CarouselCard from "../../../../atoms/CarouselCard/CarouselCard";

import styles from "./Slides.module.scss";

const Slides = ({
  cardsCtrRef,
  slidesData,
  activeIdx,
  totalSlides,
  customCardStyle,
  showButtons,
  slideDimensions,
  nextSlideHandler,
  prevSlideHandler,
  slideScrollHandler,
  dotsHandler,
}) => {
  const slideStylesHandler = (slideIdx) => {
    switch (slideIdx) {
      case activeIdx - 3:
        return styles.backstageLeftSlide;
      case activeIdx - 2:
        return styles.backgroundLeftSlide;
      case activeIdx - 1:
        return styles.adjacentLeftSlide;
      case activeIdx + 1:
        return styles.adjacentRightSlide;
      case activeIdx + 2:
        return styles.backgroundRightSlide;
      case activeIdx + 3:
        return styles.backstageRightSlide;
      case activeIdx:
        return styles.activeSlide;
      default:
        return styles.carouselCard;
    }
  };

  return (
    <>
      <div
        style={{ height: `${slideDimensions.height}rem` }}
        className={styles.carouselCtr__slidesCtr}
      >
        <div ref={cardsCtrRef} className={styles.carouselCtr}>
          {slidesData?.map((card, idx) => (
            <CarouselCard
              key={idx}
              card={card}
              onClick={() => slideScrollHandler(idx)}
              customClass={slideStylesHandler(idx)}
              customStyle={customCardStyle}
              isActive={activeIdx === idx}
              dimensions={{
                width: `${slideDimensions.width}rem`,
                height: `${slideDimensions.height}rem`,
              }}
            />
          ))}
        </div>
      </div>
      <NavigationDots
        totalDots={totalSlides}
        showButtons={showButtons}
        activeIdx={activeIdx}
        dotsHandler={dotsHandler}
        prevSlideHandler={prevSlideHandler}
        nextSlideHandler={nextSlideHandler}
      />
    </>
  );
};

export default Slides;
