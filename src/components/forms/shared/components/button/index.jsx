import React from "react";

import styles from "./styles/button.module.css";

import { handleDisableButtonAction, handleButtonTitleIconAction} from "./utils/index.jsX";

export default function Button(props) {

  const {
    componentState,
    component
  } = props || {};

  return (
    <div className={styles?.button_container} key={component}>
      <button
        type="submit"
        disabled={handleDisableButtonAction(componentState)}
        className={styles?.button}
      >
        {handleButtonTitleIconAction(componentState)}
      </button>
    </div>
  );
}
