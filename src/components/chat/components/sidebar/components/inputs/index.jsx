import React from "react";

import styles from "./styles/inputs.module.css";


import { handleRenderLazyLoadImageComponentAction} from "../../../../utils";

import {
  handleRenderFormDataAction,
  handleRenderComponentConditionAction,
  handleImageSourceAction,
  handleButtonClassNameAction,
  handleSearchInputFilterButtonAction,
  handleinputFiltersArrayItemKeyAction,
  handleRenderInputFilterComponentsAction
} from "./utils";

export default function Inputs(props) {
  const { component, componentState, socket } = props || {};

  const newComponent = `${component}_inputs`;

  if (handleRenderComponentConditionAction(componentState)) {
    return (
      <div key={newComponent} className={styles?.inputs_wrapper}>
        <div className={styles?.inputs_filters_container}>
          {handleRenderFormDataAction(componentState, "input_filters")?.map(
            (inputFilter) => {
              return (
                <div
                  className={styles?.inputs_filter_button_container}
                  key={handleinputFiltersArrayItemKeyAction(inputFilter)}
                >
                  <button
                    className={handleButtonClassNameAction(
                      inputFilter,
                      componentState
                    )}
                    onClick={() =>
                      handleSearchInputFilterButtonAction(
                        componentState,
                        inputFilter
                      )
                    }
                  >
                    {handleRenderLazyLoadImageComponentAction(
                      handleImageSourceAction(
                        inputFilter,
                        componentState
                      ),
                      "",
                      15,
                      15
                    )}
                  </button>
                </div>
              );
            }
          )}
        </div>
        {handleRenderInputFilterComponentsAction(
          componentState,
          socket,
          newComponent
        )}
      </div>
    );
  } else {
    return null;
  }
}
