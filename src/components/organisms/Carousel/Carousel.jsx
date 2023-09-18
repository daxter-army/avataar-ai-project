import React from "react";
import cx from "classnames";

import If from "../../atoms/If/If";
import Button from "../../atoms/Button/Button";
import Slides from "./partials/CarouselCtr/Slides";

import useCarouselContext from "../../../hooks/useCarouselContext";

import withCarousel from "../../../hoc/withCarousel";
import withInfiniteCarousel from "../../../hoc/withInfiniteCarousel";

import STATICS from "../../../enums";

import styles from "./Carousel.module.scss";

const Carousel = ({ customClass, title, subTitle, slidesData }) => {
  const { isInfinite, setIsInfinite } = useCarouselContext();
  // SEPARATION OF CONCERN,
  // AS INFINTE CAROUSEL LOGIC IS WAY MORE COMPLEX THAN FINITE CAROUSEL
  const FiniteCarousel = withCarousel(Slides);
  const InfiniteCarousel = withInfiniteCarousel(Slides);

  return (
    <div className={cx(styles.carousel, customClass)}>
      <If test={title}>
        <p className={styles.carousel__title}>{title}</p>
      </If>
      <If test={subTitle}>
        <p className={styles.carousel__subTitle}>{subTitle}</p>
      </If>
      <Button
        customClass={styles.typeButton}
        onClick={() => setIsInfinite(!isInfinite)}
      >
        {isInfinite
          ? STATICS.INFINITE_CAROUSEL_TYPE
          : STATICS.FINITE_CAROUSEL_TYPE}
      </Button>
      <If test={isInfinite}>
        <InfiniteCarousel showButtons={true} slidesData={slidesData} />
      </If>
      <If test={!isInfinite}>
        <FiniteCarousel showButtons={true} slidesData={slidesData} />
      </If>
    </div>
  );
};

export default Carousel;
