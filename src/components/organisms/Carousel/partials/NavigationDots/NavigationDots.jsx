import React from "react";
import cx from "classnames";

import If from "../../../../atoms/If/If";
import Icon from "../../../../atoms/Icon/Icon";

import arrowLeft from "../../../../../assets/icons/arrow-left.svg";
import arrowRight from "../../../../../assets/icons/arrow-right.svg";

import styles from "./NavigationDots.module.scss";

const NavigationDots = ({
  totalDots,
  showButtons = true,
  prevSlideHandler,
  nextSlideHandler,
  dotsHandler,
  activeIdx,
}) => {
  return (
    <div className={styles.navigationDots}>
      <If test={showButtons}>
        <Icon onClick={prevSlideHandler} isCursor asButton src={arrowLeft} />
      </If>
      <div>
        {Array(totalDots)
          .fill("_")
          .map((_, idx) => (
            <button
              key={idx}
              onClick={() => dotsHandler(idx)}
              className={cx({
                [styles.activeSlide]: activeIdx % totalDots === idx,
              })}
            ></button>
          ))}
      </div>
      <If test={showButtons}>
        <Icon onClick={nextSlideHandler} isCursor asButton src={arrowRight} />
      </If>
    </div>
  );
};

export default NavigationDots;
