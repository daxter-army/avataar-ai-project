import React from "react";
import cx from "classnames";

import If from "../If/If";
import Icon from "../Icon/Icon";
import AnchorTag from "../AnchorTag/AnchorTag";

import checkIcon from "../../../assets/icons/check.svg";

import styles from "./Dropdown.module.scss";

const Dropdown = ({
  customClass,
  options,
  onItemClick,
  dropdownRef,
  toggleableList,
}) => {
  const anchorTagHandler = (e, option, idx, listType) => {
    e.stopPropagation();

    onItemClick(option, idx, listType);
  };

  return (
    <div ref={dropdownRef} className={cx(styles.dropdown, customClass)}>
      {options.map((option, idx) => (
        <AnchorTag
          key={option.id}
          onClick={(e) => anchorTagHandler(e, option, idx, "ONE")}
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
      {[...toggleableList].reverse().map((item, idx) => {
        return !item.onTop ? (
          <AnchorTag
            key={item.id}
            onClick={(e) => anchorTagHandler(e, item, idx, "TWO")}
            customClass={cx(styles.dropdown__link, {
              [styles.selected]: item.isSelected,
            })}
          >
            {item.label}
            <If test={item.isSelected}>
              <Icon src={checkIcon} />
            </If>
          </AnchorTag>
        ) : null;
      })}
    </div>
  );
};

export default Dropdown;
