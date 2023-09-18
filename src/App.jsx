import Navbar from "./components/organisms/Navbar/Navbar";
import Carousel from "./components/organisms/Carousel/Carousel";

import logo from "./assets/icons/logo.svg";

import { navbarLinksData, carousalData } from "./data/data";

import STATICS from "./enums";

import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.appWpr}>
      <Navbar logoSrc={logo} navbarLinksData={navbarLinksData} />
      <Carousel
        slidesData={carousalData}
        title={STATICS.FEATURED_PRODUCT}
        subTitle={STATICS.EXPLORE_AND_DISCOVER}
        customClass={styles.appWpr__carousel}
      />
    </div>
  );
}

export default App;
