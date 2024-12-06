import React from "react";

import styles from "../shared/styles/form.module.css";

import {
  handlePostFormDataAction,
  handleComponentRenderAction,
  handleFormRenderConditionAction,
  handleFormWrapperClassNamesAction,
  handleFormClassNamesAction
} from "../shared/utils";

import { useHandleForgotPasswordComponentEffects } from "./effects";

import { useHandleForgotPasswordComponentState } from "./state";

import FetchIndicator from "../../shared/fetch_indicator";

const component = "forgot_password"

export default function ForgotPassword() {
  const componentState = useHandleForgotPasswordComponentState();

  useHandleForgotPasswordComponentEffects(componentState, component);


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
      <FetchIndicator component={component} />
    );
  }
}



