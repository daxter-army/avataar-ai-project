import React, { useRef, useState, useCallback, useEffect } from "react";
import cx from "classnames";

import If from "../../atoms/If/If";
import Icon from "../../atoms/Icon/Icon";
import Dropdown from "../../atoms/Dropdown/Dropdown";
import AnchorTag from "../../atoms/AnchorTag/AnchorTag";
import LinkItem from "./partials/LinkItem/LinkItem";

import useOutsideClick from "../../../hooks/useOutsideClick";

import { moreButtonData } from "../../../data/data";

import styles from "./NavbarLinks.module.scss";

const NavbarLinks = ({
  linksData,
  setLinksArrData,
  dropdownListData,
  setDropdownListData,
  navbarLinksRef,
  moreButtonRef,
}) => {
  // AUXILIARY REFS
  const dropdownRef = useRef();
  const linkItemsRef = useRef(new Array(linksData.length).fill(0));

  // AUXILIARY STATES, TO IMPLEMENT UI FEATURES
  const [hiddenItems, setHiddenItems] = useState(0);
  const [isDropdownOn, setIsDropdownOn] = useState(false);
  const [distanceToDisplace, setDistanceToDisplace] = useState(0);

  // WHEN ITEM IN THE DROPDOWN IS CLICKED
  const dropdownItemHandler = (item, idx, listType) => {
    // LIST 1
    if (listType === "ONE") {
      const newOptions = dropdownListData.map((ele, index) => {
        if (index === idx) {
          ele.isSelected = true;
          return ele;
        }

        ele.isSelected = false;
        return ele;
      });

      setDropdownListData(newOptions);
    } else if (listType === "TWO") {
      const newTopOptions = linksData.map((ele, index) => {
        if (index === linksData.length - idx - 1) {
          console.log("index", index);
          ele.isSelected = true;
          return ele;
        }

        ele.isSelected = false;
        return ele;
      });
      setLinksArrData(newTopOptions);
    }

    // LIST 2
    setIsDropdownOn(false);
  };

  // FOR NORMAL LINKS
  const onLinkClick = (linkItem) => {
    console.log("Regular link clicked!", linkItem);
  };

  // ONLY FOR DROPDOWN
  const onDropdownClick = () => {
    console.log("Opening dropdown!");

    setTimeout(() => {
      setIsDropdownOn(!isDropdownOn);
    });
  };

  // WHEN ANYWHERE ELSE IS CLICKED
  const onDropdownOutsideClick = useCallback(() => {
    if (!isDropdownOn) return;
    console.log("Clicked outside, closing dropdown!");
    setIsDropdownOn(false);
  }, [isDropdownOn]);

  // TO CALCULATE AUXILIARY VALUES, FOR FEATURE IMPLEMENTATION,
  // TO MOVE MORE BUTTON
  useEffect(() => {
    const hiddenItems = linksData.filter((item) => !item.onTop).length;
    const distanceToDisplace = linkItemsRef.current
      .slice(linksData.length - hiddenItems)
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0);

    setHiddenItems(hiddenItems);
    setDistanceToDisplace(distanceToDisplace);
  }, [linksData]);

  // TO HANDLE OUTSIDE CLICK, TO CLOSE DROPDOWN
  useOutsideClick(dropdownRef, onDropdownOutsideClick);

  return (
    <nav ref={navbarLinksRef} className={styles.navbarLinksWpr}>
      {linksData.map((link, idx) => (
        <LinkItem
          key={link.id}
          index={idx}
          customStyle={{}}
          customClass={cx({ [styles.navbarLinksWpr__hiddenLink]: !link.onTop })}
          setLinksArrData={setLinksArrData}
          onLinkClick={onLinkClick}
          linkItem={link}
          linkItemsRef={linkItemsRef}
        />
      ))}
      {/* MORE DROPDOWN */}
      <li
        ref={moreButtonRef}
        onClick={onDropdownClick}
        style={{
          transform: `translateX(-${
            distanceToDisplace +
            (hiddenItems === 0
              ? 0
              : hiddenItems > 3
              ? hiddenItems * 70
              : hiddenItems === 3
              ? hiddenItems * 80
              : (hiddenItems + 1) * 70 + 0)
          }px)`,
        }}
        className={cx(styles.navbarLinksWpr__dropdownBtn)}
      >
        <AnchorTag
          customClass={cx({ [styles.dropdown__activeLabel]: isDropdownOn })}
        >
          {moreButtonData.label}
        </AnchorTag>
        <Icon
          isCursor
          customClass={styles.dropdownIcon}
          src={
            isDropdownOn
              ? moreButtonData.selectedIconSrc
              : moreButtonData.iconSrc
          }
        />
        <If test={isDropdownOn}>
          <Dropdown
            dropdownRef={dropdownRef}
            options={dropdownListData}
            toggleableList={linksData}
            onItemClick={dropdownItemHandler}
            customClass={styles.navbarLinksWpr__dropdown}
          />
        </If>
      </li>
    </nav>
  );
};

export default NavbarLinks;
