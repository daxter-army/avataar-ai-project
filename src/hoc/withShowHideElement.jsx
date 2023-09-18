import React, { useEffect, useState } from "react";

import useIntersectionObserver from "../hooks/useIntersectionObserver";

const withShowHideElement =
  (WrappedComponent, visibilityThreshold) =>
  ({ searchInputRef, ...restProps }) => {
    const [display, setDisplay] = useState({
      opacity: 1,
    });

    const searchInputEntry = useIntersectionObserver(searchInputRef, {
      threshold: visibilityThreshold,
      root: null,
      rootMargin: "0%",
      freezeOnceVisible: false,
    });

    useEffect(() => {
      if (!searchInputEntry) return;

      if (searchInputEntry?.isIntersecting) {
        setDisplay({ opacity: 1 });
      } else {
        // console.log("isVisible: NO", searchInputEntry?.isIntersecting);
        setDisplay({ opacity: 0 });
      }
    }, [searchInputEntry]);

    return (
      <WrappedComponent
        customStyles={display}
        searchInputRef={searchInputRef}
        {...restProps}
      />
    );
  };

export default withShowHideElement;
