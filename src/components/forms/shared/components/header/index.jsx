import React from "react";

import styles from "./styles/header.module.css";

export default function Header(props) {


    const {
      component,
      componentState: {
        formData: {
            header: {
              title,
              icon
            }
        },
        backendResponseMessage: {
            error,
            success
        }
      },
      
    } = props || {}

  return (
    <div className={styles?.header_wrapper} key={component}>
      <div className={styles?.header_title}>
        {title}
      </div>
      {error && (
        <div
          className={`${styles?.header_response_message} ${styles?.header_response_error}`}
        >
          {error}
        </div>
      )}
      {success && (
        <div
          className={`${styles?.header_response_message} ${styles?.header_response_success}`}
        >
          {success}
        </div>
      )}
    </div>
  );
}
