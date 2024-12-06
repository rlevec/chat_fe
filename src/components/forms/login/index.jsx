import React from "react";


import {
  handlePostFormDataAction,
  handleComponentRenderAction,
  handleFormRenderConditionAction,
  handleFormWrapperClassNamesAction,
  handleFormClassNamesAction
} from "../shared/utils";

import { useHandleLoginComponentEffects } from "./effects";

import { useHandleLoginComponentState } from "./state";

import FetchIndicator from "../../shared/fetch_indicator";

const component = "login"

export default function Login() {
  const componentState = useHandleLoginComponentState();

  useHandleLoginComponentEffects(componentState, component);

  if (handleFormRenderConditionAction(componentState)) {
      return (
        <div className={handleFormWrapperClassNamesAction(componentState)}>
          <form
            className={handleFormClassNamesAction(componentState)}
            onSubmit={(event) =>
              handlePostFormDataAction(event, componentState, component)
            }
          >
            {handleComponentRenderAction(componentState, component)}
          </form>
        </div>
      );
  } else {
    return (
      <FetchIndicator component={component}/>
    );
  }
}
