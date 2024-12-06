import React from "react";

import styles from "./styles/statuses.module.css"

import { navigate } from "../../../../../utils";

export default function Statuses(props) {


    const {
      component,
      componentState: {
        formData: {
            statuses
        }
      }
    } = props || {}

    return (
        <div className={styles?.statuses_wrapper} key={component}>
        {statuses?.map((status, idx) => {
          const {
            id,
            frontendSlug,
            label,
            labelWithLink,
            linkRoute
          } = status

          return (
            <div className={styles?.statuses_status_container} key={`${frontendSlug}-${id}-${idx}`}>
              <div className={styles?.statuses_status_label}>{label}</div>
              <div className={styles?.statuses_status_label_with_link} onClick={() => navigate(linkRoute)}>{labelWithLink}</div>
            </div>
          )
        })}
      </div>
    )
}