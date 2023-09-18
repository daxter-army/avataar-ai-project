import React from "react";

import LinkItem from "./partials/LinkItem/LinkItem";

import styles from "./NavbarLinks.module.scss";

const NavbarLinks = ({ linksData, setLinksData, navbarLinksRef }) => {
  return (
    <nav ref={navbarLinksRef} className={styles.navbarLinksWpr}>
      {linksData.map((link) => (
        <LinkItem key={link.id} linkItem={link} setLinksData={setLinksData} />
      ))}
    </nav>
  );
};

export default NavbarLinks;
