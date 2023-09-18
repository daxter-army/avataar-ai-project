import React, { useState, useRef } from "react";

import If from "../../atoms/If/If";
import Icon from "../../atoms/Icon/Icon";
import SearchInput from "../../molecules/SearchInput/SearchInput";
import NavbarLinks from "../../molecules/NavbarLinks/NavbarLinks";

import withShowHideElement from "../../../hoc/withShowHideElement";
import withShowHideChildrenElement from "../../../hoc/withShowHideChildrenElement";

import magnifyGlass from "../../../assets/icons/search.svg";

import STATICS from "../../../enums";

import styles from "./Navbar.module.scss";

const Navbar = ({ logoSrc, navbarLinksData }) => {
  const [value, setValue] = useState("");
  const searchInputRef = useRef();

  const VisibleSearchInput = withShowHideElement(SearchInput, 0.5);
  const MinimizableNavbarLinks = withShowHideChildrenElement(NavbarLinks);

  return (
    <div className={styles.navbar}>
      <div className={styles.navbar__logoCtr}>
        <If test={logoSrc}>
          <Icon src={logoSrc} />
        </If>
        {STATICS.NAVBAR_TITLE}
      </div>
      <div className={styles.navbar__linksCtr}>
        <If test={navbarLinksData}>
          <MinimizableNavbarLinks linksData={navbarLinksData} />
        </If>
        <VisibleSearchInput
          value={value}
          setValue={setValue}
          iconSrc={magnifyGlass}
          searchInputRef={searchInputRef}
          customClass={styles.navbar__searchInput}
          placeholder={STATICS.NAVBAR_SEARCH_PLACEHOLDER}
        />
      </div>
    </div>
  );
};

export default Navbar;
