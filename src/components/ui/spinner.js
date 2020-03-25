import React from "react";
import Loader from "react-loader-spinner";
import styles from "./spinner.module.css";

export const Spinner = ({ type, color }) => (
  <div className={styles.loadContainer}>
    <Loader
      type={type}
      color={color}
      height={100}
      width={100}
      timeout={5000} //3 secs
    />
  </div>
);