import React from "react";
import ProgressLoader from "../progress_loader";
import ThreeDotsLoader from "../three_dots_loader";
import styles from "./styles/fetch_indicator.module.css";
import { handleTitleAction } from "./utils";

export default function FetchIndicator({ component, componentState = {} }) {
  const { invalidSession = {} } = componentState;

  const renderMessage = () => {
    return invalidSession.message
      ? invalidSession.message
      : `Fetching ${handleTitleAction(component)} form data...`;
  };

  const renderLoader = () => {
    if (invalidSession.error) {
      return <ThreeDotsLoader />;
    }
    return <ProgressLoader />;
  };


  const transformedRoute = invalidSession?.redirect?.split("/")[1]

  const renderAction = () => {
    if(invalidSession.error) {
      return  <div className={styles?.fetch_indicator_subtitle}>Redirecting to <span className={styles?.fetch_indicator_redirect}>{transformedRoute}</span></div>
    } else {

      return (
        <button
        className={styles.fetch_indicator_button}
        onClick={() => location.reload()}
      >
        Refresh
      </button>
      )
    
    }
  }



  return (
    <div className={styles.fetch_indicator_wrapper} key={component}>
      <div className={styles.fetch_indicator_title}>
        {renderMessage()}
      </div>
      {renderLoader()}
      {renderAction()}
    </div>
  );
}
