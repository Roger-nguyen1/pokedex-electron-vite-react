import styles from "../styles/Pokemon.module.css";

function Pokemon(props) {
  return (
    <div className={`${styles.pokemon} ${styles[props.type]}`}>
      <div className={styles.imgContainer}>
        <img
          className={styles.imgContainer_img}
          src={props.png}
          alt={props.name}
        />
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{props.name}</h3>
        <span className={styles.type}>
          Type: <span>{props.type}</span>
        </span>
      </div>
    </div>
  );
}
export default Pokemon;
