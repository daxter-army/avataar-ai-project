import React from "react";
import cx from "classnames";

import If from "../If/If";
import Icon from "../Icon/Icon";
import AnchorTag from "../AnchorTag/AnchorTag";

import checkIcon from "../../assets/icons/check.svg";

import styles from "./Dropdown.module.scss";

const Dropdown = ({ customClass, options, onItemClick, dropdownRef }) => {
  const anchorTagHandler = (e, option, idx) => {
    e.stopPropagation();

    onItemClick(option, idx);
  };

  return (
    <div ref={dropdownRef} className={cx(styles.dropdown, customClass)}>
      {options.map((option, idx) => (
        <AnchorTag
          key={option.id}
          onClick={(e) => anchorTagHandler(e, option, idx)}
          customClass={cx(styles.dropdown__link, {
            [styles.selected]: option.isSelected,
          })}
        >
          {option.label}
          <If test={option.isSelected}>
            <Icon src={checkIcon} />
          </If>
        </AnchorTag>
      ))}
    </div>
  );
};

export default Dropdown;
