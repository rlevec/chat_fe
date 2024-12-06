import React from "react";

import styles from "./styles/description.module.css"

export default function Description(props) {


    const {
        component,
        componentState: {
            formData: {
                description
            }
        }
    } = props || {}

    return (
        <div className={styles?.description_container} key={component}>
           <div className={styles?.description_content}>{description}</div>
        </div>
    )
}