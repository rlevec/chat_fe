import React from "react";

import styles from "./styles/box_loader.module.css"

export default function BoxLoader({width, height}) {
    return <div style={{width: `${width}px`, height: `${height}px`}} className={styles?.box_loader}/>
}