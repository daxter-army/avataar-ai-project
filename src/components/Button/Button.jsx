import React from "react";

import cx from "classnames";

import styles from "./Button.module.scss";

const Button = ({ children, onClick, customClass }) => {
  return (
    <button className={cx(styles.button, customClass)} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
