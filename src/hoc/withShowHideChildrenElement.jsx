import React, { useEffect, useRef, useState } from "react";

import { moreOptionsData } from "../data/data";

import useWindowSize from "../hooks/useWindowResize";
import useIntersectionObserver from "../hooks/useIntersectionObserver";

const withShowHideChildrenElement =
  (WrappedComponent) =>
  ({ linksData, ...restProps }) => {
    const navbarLinksRef = useRef();
    const moreButtonRef = useRef();

    const { width: winWidth } = useWindowSize();
    // LINKS DATA
    const [linksArrData, setLinksArrData] = useState(linksData);
    // DROPDOWN OPTIONS DATA
    const [dropdownListData, setDropdownListData] = useState(moreOptionsData);

    const way3 = () => {};

    useEffect(() => {
      if (!winWidth || !navbarLinksRef?.current || !moreButtonRef?.current)
        return;

      const timer = setTimeout(() => {
        // elementDisplacer();
        // way3();
      }, 100);

      return () => {
        clearTimeout(timer);
      };
    }, [navbarLinksRef?.current, moreButtonRef?.current, winWidth]);

    return (
      <WrappedComponent
        // DATA
        linksData={linksArrData}
        setLinksArrData={setLinksArrData}
        dropdownListData={dropdownListData}
        setDropdownListData={setDropdownListData}
        // REFS
        moreButtonRef={moreButtonRef}
        navbarLinksRef={navbarLinksRef}
        {...restProps}
      />
    );
  };

export default withShowHideChildrenElement;

//*--------------- WAY 1
/*
    const navbarLinksRef = useRef();
    const navbarInitialWidth = useRef();
    const prevWidthRef = useRef();
    const itemsMinimizedRef = useRef([]);
    const [linksArrData, setLinksArrData] = useState(linksData);

    const { width: winWidth, height: winHeight } = useWindowSize();

    const navbarEntry = useIntersectionObserver(navbarLinksRef, {
      threshold: visibilityThreshold,
      root: null,
      rootMargin: "0%",
      freezeOnceVisible: false,
    });

    useEffect(() => {
      if (!winWidth || !navbarEntry || !navbarLinksRef?.current) return;
      // console.log(navbarLinksRef, navbarEntry);
      // console.log(navbarEntry);
      // console.log(!navbarEntry.isIntersecting);

      // console.log(
      //   "winWidth:",
      //   winWidth,
      //   "limit:",
      //   startPosX + navbarInitialWidth.current
      // );

      // BECAUSE THE navbarWidth also changes
      if (
        !navbarEntry.isIntersecting ||
        winWidth < navbarEntry.boundingClientRect.x + navbarInitialWidth.current
      ) {
        // FOR EXPANDING
        if (winWidth > prevWidthRef.current) {
          console.log("->");
          // console.log(itemsMinimizedRef.current);
          // MORE ELEMENT
          // const lastElement = itemsMinimizedRef.current.at(-1);
          // const remWithoutLastElement = itemsMinimizedRef.current.slice(0, -1)

          const tempArr = [...linksArrData];
          const lastElement = tempArr.at(-1);
          const withoutLastElement = tempArr.slice(0, -1);
          const elementToPlaceBack = itemsMinimizedRef.current.shift();
          withoutLastElement.push(elementToPlaceBack);
          withoutLastElement.push(lastElement);

          console.log("BACK ARRAY: ", withoutLastElement);

          // setLinksArrData(withoutLastElement);
        } else {
          // FOR COMPRESSING
          const startPosX = navbarEntry.boundingClientRect.x;
          const navbarWidth = navbarEntry.boundingClientRect.width;

          const remVisiblePercentage =
            ((startPosX + navbarWidth - winWidth) / navbarWidth) * 100;

          // BECAUSE IN THE START IT GIVES -VE VALUES
          if (remVisiblePercentage > 0) {
            const oneElementWidth = navbarWidth / linksArrData.length;

            const oneElementWidthPercentage =
              (oneElementWidth / navbarWidth) * 100;

            // console.log(percentageVisible, oneElementWidthPercentage);
            const elementsGone = Math.ceil(
              remVisiblePercentage / oneElementWidthPercentage
            );

            // console.log(-1 * elementsGone);

            // REMOVING FROM BACK, BUT KEEPING THE MORE OPTION
            // const newLinksData = linksArrData.slice(0, -1 * elementsGone);
            // const newLinksData = [
            //   ...linksArrData.slice(0, -1 * (elementsGone + 1)),
            //   {
            //     ...linksArrData.at(-1),
            //     options: [
            //       ...linksArrData.at(-1).options,
            //       ...linksArrData
            //         .slice(0, -1 * (elementsGone + 1))
            //         .map((item) => ({
            //           id: item.id,
            //           label: item.label,
            //           link: "#",
            //           isSelected: false,
            //         })),
            //     ],
            //   },
            // ];
            // const operationalArr = linksArrData.slice(
            //   0,
            //   -1 * (elementsGone + 1)
            // );
            const arrWithoutLastEle = linksArrData.slice(0, -1);
            // console.log(arrWithoutLastEle);
            const eleTobeDeleted = arrWithoutLastEle.at(-1);
            const remArr = arrWithoutLastEle.slice(0, -1 * elementsGone);
            const newLinksData = [...remArr, linksArrData.at(-1)];

            // KEEPING THE COUNT
            // console.log(eleTobeDeleted);
            if (eleTobeDeleted) itemsMinimizedRef.current.push(eleTobeDeleted);
            setLinksArrData(newLinksData);
          }
        }
      }

      prevWidthRef.current = winWidth;
    }, [navbarLinksRef?.current, winWidth, navbarEntry]);

    useEffect(() => {
      console.log("Setting initialWidth");
      navbarInitialWidth.current = navbarLinksRef.current.clientWidth;
    }, []);

    useEffect(() => {
      console.log("Updated: ", linksArrData);
    }, [linksArrData]);
*/

//* ---------------- WAY 2
// const elementDisplacer = () => {
//   const totalNavbarWidth = navbarLinksRef.current.getBoundingClientRect().width;
//   const moreButtonWidth = moreButtonRef.current.getBoundingClientRect().width;

//   const navbarWidthWithoutMoreButton = totalNavbarWidth - moreButtonWidth;
//   const availableSpace = winWidth - moreButtonWidth;

//   // ADDITION TO DROPDOWN
//   console.log("Navbar: ", navbarWidthWithoutMoreButton);
//   console.log("Available: ", availableSpace);
//   if (navbarWidthWithoutMoreButton > availableSpace) {
//     const newArr = [...linksArrData];
//     const lastLinkItem = newArr.at(-1);
//     lastLinkItem.isSelected = false;

//     movedItemsRef.current.push(lastLinkItem);
//     // setLinksArrData(newArr.slice(0, -1));
//     // setDropdownListData([...dropdownListData, lastLinkItem]);

//     console.log("Addition section");
//     // elementDisplacer();
//   } else {
//     console.log("remover section");
//     // REMOVAL TO DROPDOWN
//     const newDropdownList = [...dropdownListData];
//     // Elements start from index 3
//     //! FIX ORDER HERE
//     const lastItem = newDropdownList.at(-1);
//     const withoutLastItem = newDropdownList.slice(0, -1);

//     // Width of Dropdown
//     if (navbarWidthWithoutMoreButton + 188 < availableSpace) {
//       console.log("remover if section");
//       // setDropdownListData(withoutLastItem);
//       // setLinksArrData([...linksArrData, lastItem]);
//       // firstMoreElement.insertBefore($("#main .more"));
//     }
//   }
// };
