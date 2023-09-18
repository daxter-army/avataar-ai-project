import React from "react";
import cx from "classnames";

import If from "../If/If";

import styles from "./CarouselCard.module.scss";

const CarouselCard = ({
  card,
  isActive = false,
  customClass,
  dimensions,
  customStyle,
  onClick,
}) => {
  const slideStyles = {
    width: dimensions.width,
    height: dimensions.height,
  };

  return (
    <div
      onClick={onClick}
      style={{ ...slideStyles, ...customStyle }}
      className={cx(styles.carouselCard, customClass)}
    >
      <img src={card?.imgSrc} />
      <If test={isActive && card?.label}>
        <p className={styles.carouselCard__label}>{card?.label}</p>
      </If>
    </div>
  );
};

export default CarouselCard;
