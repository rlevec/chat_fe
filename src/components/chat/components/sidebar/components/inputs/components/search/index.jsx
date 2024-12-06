import React from "react";

import styles from "./styles/add.module.css";

import {
  handleOnChangeEventAction,
  handleInputValueAction,
  handleRenderComponentConditionAction,
  handleRenderFormDataAction,
} from "./utils";

import { handleRenderLazyLoadImageComponentAction } from "../../../../../../utils";

export default function Search(props) {
  const { component, componentState } = props || {};

  const newComponent = `${component}_search`;

  if (handleRenderComponentConditionAction(componentState)) {
    return (
      <div
        key={newComponent}
        className={styles?.sidebar_header_add_contact_wrapper}
      >
        <div
          className={styles?.sidebar_header_add_contact_input_button_container}
        >
          <input
            onChange={(event) =>
              handleOnChangeEventAction(event, componentState)
            }
            value={handleInputValueAction(componentState)}
            className={styles?.sidebar_header_add_contact_input}
            name={handleRenderFormDataAction(
              componentState,
              "search_input_name"
            )}
            placeholder={handleRenderFormDataAction(
              componentState,
              "search_input_placeholder"
            )}
            type={handleRenderFormDataAction(
              componentState,
              "search_input_type"
            )}
          />
          <div
            className={styles?.sidebar_header_add_contact_input_icon_container}
          >
            {handleRenderLazyLoadImageComponentAction(
              handleRenderFormDataAction(
                componentState,
                "search_input_icon"
              ),
              "",
              25,
              25
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
