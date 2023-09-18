import cx from "classnames";
import { useCallback, useRef, useState } from "react";

import If from "../../../If/If";
import Icon from "../../../Icon/Icon";
import Dropdown from "../../../Dropdown/Dropdown";
import AnchorTag from "../../../AnchorTag/AnchorTag";

import useOutsideClick from "../../../../hooks/useOutsideClick";

import styles from "./LinkItem.module.scss";

const LinkItem = ({ linkItem, setLinksData }) => {
  const dropdownRef = useRef();
  const [isDropdownOn, setIsDropdownOn] = useState(false);
  // const [linkOptions, setLinkOptions] = useState(linkItem.options);

  const onDropdownOutsideClick = useCallback(() => {
    if (!isDropdownOn) return;
    setIsDropdownOn(false);
  }, [isDropdownOn]);

  const linkHandler = () => {
    // TO NOT CALL HOOK, WHEN THIS CURRENT LINK IS CLICKED
    setTimeout(() => {
      if (linkItem.options) setIsDropdownOn(!isDropdownOn);
    });
  };

  const dropdownItemHandler = (item, idx) => {
    // const newOptions = [...linkItem.options];
    // const newItem = { ...linkItem, options: [...linkItem.options] };
    // newItem.options[idx].isSelected = !newItem.options[idx].isSelected;
    // const newOptions = linkItem.options.map((ele) => {
    //   if (ele.id === item.id) {
    //     console.log(ele);
    //     ele.isSelected = !ele.isSelected;
    //     return ele;
    //   }

    //   return ele;
    // });
    // setLinkOptions(newOptions);
    // setLinksData((prevData) => [...prevData, newItem]);
    //! FIX THIS, STATE IS UPDATING WITHOUT ACTUALLY UPDATING
    console.log("item clicked");
    setIsDropdownOn(false);
  };

  useOutsideClick(dropdownRef, onDropdownOutsideClick);

  return (
    <li className={styles.linkItem} key={linkItem.id} onClick={linkHandler}>
      <AnchorTag
        customClass={cx({ [styles.linkItem__activeLabel]: isDropdownOn })}
      >
        {linkItem.label}
      </AnchorTag>
      <If test={linkItem.iconSrc}>
        <Icon
          isCursor
          src={isDropdownOn ? linkItem.selectedIconSrc : linkItem.iconSrc}
        />
      </If>
      <If test={isDropdownOn && linkItem.options}>
        <Dropdown
          dropdownRef={dropdownRef}
          options={linkItem.options}
          onItemClick={dropdownItemHandler}
          customClass={styles.linkItem__dropdown}
        />
      </If>
    </li>
  );
};

export default LinkItem;
