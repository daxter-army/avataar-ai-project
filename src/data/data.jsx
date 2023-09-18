import STATICS from "../enums";

import chevronDown from "../assets/icons/chevron-down.svg";
import chevronDownActive from "../assets/icons/chevron-down-active.svg";
// import modernVase from "../assets/modernVase.png";
// import modernDecor from "../assets/modernDecor.png";
// import stylishProps from "../assets/stylishProps.png";
// import modernUtensils from "../assets/modernUtensils.png";
// import fragranceFlowers from "../assets/fragranceFlowers.png";

export const navbarLinksData = [
  {
    id: STATICS.HOME,
    label: STATICS.HOME,
    link: "#",
    onTop: true,
    isSelected: false,
  },
  {
    id: STATICS.ELECTRONICS,
    label: STATICS.ELECTRONICS,
    link: "#",
    onTop: true,
    isSelected: false,
  },
  {
    id: STATICS.BOOKS,
    label: STATICS.BOOKS,
    link: "#",
    onTop: true,
    isSelected: false,
  },
  {
    id: STATICS.MUSIC,
    label: STATICS.MUSIC,
    link: "#",
    onTop: true,
    isSelected: false,
  },
  {
    id: STATICS.MOVIES,
    label: STATICS.MOVIES,
    link: "#",
    onTop: true,
    isSelected: false,
  },
  {
    id: STATICS.CLOTHING,
    label: STATICS.CLOTHING,
    link: "#",
    onTop: true,
    isSelected: false,
  },
  {
    id: STATICS.GAMES,
    label: STATICS.GAMES,
    link: "#",
    onTop: true,
    isSelected: false,
  },
];

export const moreButtonData = {
  label: STATICS.MORE,
  iconSrc: chevronDown,
  selectedIconSrc: chevronDownActive,
};

export const moreOptionsData = [
  {
    id: STATICS.FURNITURE,
    label: STATICS.FURNITURE,
    link: "#",
    isSelected: false,
  },
  {
    id: STATICS.TRAVEL,
    label: STATICS.TRAVEL,
    link: "#",
    isSelected: false,
  },
  {
    id: STATICS.BOTANICAL,
    label: STATICS.BOTANICAL,
    link: "#",
    isSelected: false,
  },
];

export const carousalData = [
  {
    id: STATICS.SERENE_LANDSCAPES,
    label: `${STATICS.SERENE_LANDSCAPES}`,
    // imgSrc: modernUtensils,
    imgSrc: "https://picsum.photos/id/10/800/600",
  },
  {
    id: STATICS.MESMERIZING_MOUNTAINS,
    label: `${STATICS.MESMERIZING_MOUNTAINS}`,
    // imgSrc: stylishProps,
    imgSrc: "https://picsum.photos/id/11/800/600",
  },
  {
    id: STATICS.SHINY_BEACHES,
    label: `${STATICS.SHINY_BEACHES}`,
    // imgSrc: modernDecor,
    imgSrc: "https://picsum.photos/id/13/800/600",
  },
  {
    id: STATICS.ROCKY_SHORES,
    label: `${STATICS.ROCKY_SHORES}`,
    // imgSrc: modernVase,
    imgSrc: "https://picsum.photos/id/14/800/600",
  },
  {
    id: STATICS.WATERFALL_BLISS,
    label: `${STATICS.WATERFALL_BLISS}`,
    // imgSrc: fragranceFlowers,
    imgSrc: "https://picsum.photos/id/15/800/600",
  },
];
