import React from "react";

import styles from "./styles/input.module.css";

import {
  handleRenderFormDataAction,
  handleRenderInputIconsAction,
  handleMessageInputValueAction,
  handleMessageInputOnChangeEventAction,
  handleMessageInputKeyDownEventAction,
  renderTypingIndicatorAction,
} from "./utils";

export default function Input(props) {
  const { component, componentState, socket } = props || {};

  const newComponent = `${component}_input`;

  return (
    <div key={newComponent} className={styles?.input_wrapper}>
      {renderTypingIndicatorAction(componentState)}
      <div className={styles?.input_container}>
        <input
          value={handleMessageInputValueAction(componentState)}
          onChange={(event) =>
            handleMessageInputOnChangeEventAction(event, componentState, socket)
          }
          onKeyDown={(event) =>
            handleMessageInputKeyDownEventAction(event, componentState, socket)
          }
          className={styles?.input_input}
          name={handleRenderFormDataAction(
            componentState,
            "message_input_name"
          )}
          placeholder={handleRenderFormDataAction(
            componentState,
            "message_input_placeholder"
          )}
        />
        {handleRenderInputIconsAction(componentState, socket)}
      </div>
    </div>
  );
}
