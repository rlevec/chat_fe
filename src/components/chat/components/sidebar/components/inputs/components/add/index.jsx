import React from "react";

import styles from "./styles/add.module.css";

import {
  handleOnChangeEventAction,
  handleDisableButtonAction,
  handleIconAction,
  handleIsInputInErrorConditionAction,
  handleInputFieldClassNamesAction,
  handleInputValueAction,
  handleRenderComponentConditionAction,
  handleRenderFormDataAction,
  handleAddContactAction
} from "./utils";


import { handleRenderLazyLoadImageComponentAction } from "../../../../../../utils";

export default function Add(props) {
  const {
    component,
    componentState,
    socket,
  } = props;

  const newComponent = `${component}_add`;


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
              handleOnChangeEventAction(
                event,
                componentState
              )
            }
            value={handleInputValueAction(
              componentState
            )}
            className={handleInputFieldClassNamesAction(
              componentState
            )}
            name={handleRenderFormDataAction(componentState, "add_input_name")}
            placeholder={handleRenderFormDataAction(
              componentState,
              "add_input_placeholder"
            )}
            type={handleRenderFormDataAction(componentState, "add_input_type")}
          />
          <div
            className={styles?.sidebar_header_add_contact_input_icon_container}
          >
            {handleRenderLazyLoadImageComponentAction(
              handleIconAction(
                componentState,
                "input"
              ),
              "",
              25,
              25
            )}
          </div>
          <div className={styles?.sidebar_header_add_contact_button_container}>
            <button
              className={styles?.sidebar_header_add_contact_button}
              onClick={() => handleAddContactAction(socket, componentState)}
              disabled={handleDisableButtonAction(
                componentState
              )}
            >{
              handleRenderLazyLoadImageComponentAction(
                handleIconAction(
                  componentState,
                  "button"
                 ),
                 "",
                 25,
                 25
              )
            }
            </button>
          </div>
          {handleIsInputInErrorConditionAction(componentState) && (
            <div
              className={
                styles?.sidebar_header_add_contact_input_validation_message
              }
            >
              {handleRenderFormDataAction(
                componentState,
                "add_input_validation_message"
              )}
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return null;
  }
}
