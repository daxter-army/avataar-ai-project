import cx from "classnames";
import { useEffect, useRef } from "react";

import AnchorTag from "../../../../atoms/AnchorTag/AnchorTag";

import useIntersectionObserver from "../../../../../hooks/useIntersectionObserver";

import styles from "./LinkItem.module.scss";

const LinkItem = ({
  linkItem,
  customClass,
  onLinkClick,
  index,
  setLinksArrData,
  customStyle,
  linkItemsRef,
}) => {
  const linkItemRef = useRef();
  const linkEntry = useIntersectionObserver(linkItemRef, 0);

  useEffect(() => {
    if (!linkEntry) return;

    linkItemsRef.current[index] = linkItemRef.current.clientWidth;

    const isVisible = linkEntry.isIntersecting;

    if (isVisible) {
      // console.log("ON", linkItem.id);
      setLinksArrData((prevData) => {
        const newData = [...prevData];
        newData[index].onTop = true;

        return newData;
      });
    } else {
      // console.log("OFF", linkItem.id);
      setLinksArrData((prevData) => {
        const newData = [...prevData];
        newData[index].onTop = false;

        return newData;
      });
    }
  }, [linkEntry]);

  return (
    <li
      ref={linkItemRef}
      style={customStyle}
      className={cx(styles.linkItem, customClass)}
      onClick={() => onLinkClick(linkItem)}
    >
      <AnchorTag>{linkItem.label}</AnchorTag>
    </li>
  );
};

export default LinkItem;
