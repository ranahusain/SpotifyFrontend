import LeftBar from "../LeftBar/LeftBar";
import RightBar from "../RightBar/RightBar";
import styles from "./MainContainer.module.css";
const MainContainer = () => {
  return (
    <>
      <section className={styles.main_section} style={{ marginBottom: "50px" }}>
        <LeftBar />
        <RightBar />
      </section>
    </>
  );
};

export default MainContainer;
