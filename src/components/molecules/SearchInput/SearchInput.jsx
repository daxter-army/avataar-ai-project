import React, { useRef, useEffect, useState } from "react";
import cx from "classnames";

import Icon from "../../atoms/Icon/Icon";
import useWindowSize from "../../../hooks/useWindowResize";

import styles from "./SearchInput.module.scss";

const SearchInput = ({
  iconSrc,
  onChange,
  customClass,
  customStyles,
  searchInputRef,
  placeholder = "Placeholder",
  ariaLabel = "Search something",
}) => {
  const [value, setValue] = useState("");

  const inputHandler = (e) => {
    setValue(e.target.value);
    if (onChange) onChange(e);
  };

  return (
    <div
      style={customStyles}
      ref={searchInputRef}
      className={cx(styles.searchInput, customClass)}
    >
      {iconSrc && <Icon customClass={styles.searchInput__icon} src={iconSrc} />}
      <input
        value={value}
        aria-label={ariaLabel}
        placeholder={placeholder}
        onChange={inputHandler}
      />
    </div>
  );
};

export default SearchInput;
