import React from "react";

import { useHandleResendActivationTokenComponentEffects } from "./effects";
import { useHandleResendActivationTokenComponentState } from "./state";


import styles from "../shared/styles/form.module.css";

import {
  handlePostFormDataAction,
  handleComponentRenderAction,
  handleFormRenderConditionAction,
  handleFormWrapperClassNamesAction,
  handleFormClassNamesAction
} from "../shared/utils";

import FetchIndicator from "../../shared/fetch_indicator";

const component = "resend_account_activation_email"

export default function ResendAccountActivationEmail() {
  const componentState = useHandleResendActivationTokenComponentState();

  useHandleResendActivationTokenComponentEffects(componentState, component);


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
    return <FetchIndicator component={component} />;
  }
}


