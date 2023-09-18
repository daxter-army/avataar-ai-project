import React from "react";
import cx from "classnames";

import styles from "./Icon.module.scss";

const Icon = ({
  src,
  isSrcComp = false,
  onClick,
  customClass,
  asButton = false,
  isCursor = false,
  altLabel = "icon",
  ariaLabel = "icon",
}) => {
  const ctrStyles = cx(
    styles.icon,
    {
      [styles.isCursor]: isCursor,
    },
    customClass
  );

  const elementHandler = () =>
    isSrcComp ? src : <img alt={altLabel} src={src} aria-label={ariaLabel} />;

  return asButton ? (
    <button onClick={onClick} aria-label={ariaLabel} className={ctrStyles}>
      {elementHandler()}
    </button>
  ) : (
    <div onClick={onClick} className={ctrStyles}>
      {elementHandler()}
    </div>
  );
};

export default Icon;
