import React from "react";

import styles from "./styles/messages.module.css"

import {handleMessageComponentContentRenderAction} from "./utils"

export default function Messages(props) {

    const {
       component,
       componentState,
       socket
    } = props || {}

    const newComponent = `${component}_messages`;
    
    return (
        <div key={newComponent} className={styles?.messages_wrapper}>
            <div className={styles?.messages_container}>
            {handleMessageComponentContentRenderAction(componentState, newComponent, socket)}
            </div>
        </div>
    )
}