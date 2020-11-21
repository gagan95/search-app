import React from "react";
import styles from "../styles/Card.module.css";

function MovieCrad(props) {
  return (
    <div className={styles.card}>
      <img
        src={props.data.Poster}
        alt={props.data.Title}
        style={{ width: "100%" }}
      />
      <div className={styles.container}>
        <h4>
          <b>
            {props.data.Title} ( {props.data.Year} )
          </b>
        </h4>
      </div>
    </div>
  );
}

export default MovieCrad;
