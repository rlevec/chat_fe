import React from "react";

import styles from "../shared/styles/form.module.css";

import {
  handlePutFormDataAction,
  handleComponentRenderAction,
  handleFormRenderConditionAction,
  handleFormWrapperClassNamesAction,
  handleFormClassNamesAction
} from "../shared/utils";

import { useHandleAccountActivationComponentEffects } from "./effects";

import { useHandleAccountActivationComponentState } from "./state";

import FetchIndicator from "../../shared/fetch_indicator";

const component = "account_activation"

export default function AccountActivation(props) {
  const { accountActivationToken } = props || {};

  const componentState = useHandleAccountActivationComponentState();

  useHandleAccountActivationComponentEffects(componentState, component);


  if (handleFormRenderConditionAction(componentState)) {
      return (
        <div className={handleFormWrapperClassNamesAction(componentState)}>
          <form
            className={handleFormClassNamesAction(componentState)}
            onSubmit={(event) =>
              handlePutFormDataAction(event, accountActivationToken, component, componentState)
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
