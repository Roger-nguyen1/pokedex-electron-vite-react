import styles from "../styles/Loader.module.css";

function Loader() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.pokemon}></div>
      </div>
      <p className={styles.loadingText}>Loading...</p>
    </>
  );
}

export default Loader;
