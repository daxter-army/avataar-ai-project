import React from "react";
import cx from "classnames";

import styles from "./AnchorTag.module.scss";

const AnchorTag = ({
  customClass,
  children,
  onClick,
  href = "#",
  ariaLabel = "link",
}) => {
  return (
    <a
      href={href}
      onClick={onClick}
      aria-label={ariaLabel}
      className={cx(styles.anchorTagWpr, customClass)}
    >
      {children}
    </a>
  );
};

export default AnchorTag;
