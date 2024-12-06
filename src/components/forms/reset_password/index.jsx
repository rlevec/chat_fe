import React from "react";

import styles from "../shared/styles/form.module.css";

import {
  handlePutFormDataAction,
  handleComponentRenderAction,
  handleFormRenderConditionAction,
  handleFormWrapperClassNamesAction,
  handleFormClassNamesAction,
} from "../shared/utils";

import { useHandleResetPasswordComponentEffects } from "./effects";

import { useHandleResetPasswordComponentState } from "./state";

import FetchIndicator from "../../shared/fetch_indicator";

const component = "reset_password";

export default function ResetPassowrd(props) {
  const { resetPasswordToken } = props || {};

  const componentState = useHandleResetPasswordComponentState();

  useHandleResetPasswordComponentEffects(componentState, component);

  if (handleFormRenderConditionAction(componentState)) {
    return (
      <div className={handleFormWrapperClassNamesAction(componentState)}>
        <form
          className={handleFormClassNamesAction(componentState)}
          onSubmit={(event) =>
            handlePutFormDataAction(
              event,
              resetPasswordToken,
              component,
              componentState
            )
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
