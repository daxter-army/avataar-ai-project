import React, { useEffect, useRef } from "react";

import useWindowSize from "../hooks/useWindowResize";

const withElementToggle =
  (WrappedComponent) =>
  ({ searchInputRef, ...restProps }) => {
    const { width: winWidth, height: winHeight } = useWindowSize();

    useEffect(() => {
      if (!winWidth || !searchInputRef.current) return;
      const elePosInfo = searchInputRef.current.getBoundingClientRect();
      console.log(winWidth > elePosInfo.x + elePosInfo.width * 0.5);
      console.log("Calc");
    }, [winWidth, searchInputRef?.current]);

    return <WrappedComponent searchInputRef={searchInputRef} {...restProps} />;
  };

export default withElementToggle;
