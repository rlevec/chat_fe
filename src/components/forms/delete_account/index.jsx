import React from "react";

import styles from "../shared/styles/form.module.css";

import {
  handleDeleteFormDataAction,
  handleComponentRenderAction,
  handleFormRenderConditionAction,
  handleFormWrapperClassNamesAction,
  handleFormClassNamesAction
} from "../shared/utils";

import { useHandleDeleteAccountComponentEffects } from "./effects";

import { useHandleDeleteAccountComponentState } from "./state";

import FetchIndicator from "../../shared/fetch_indicator";

const component = "delete_account"

export default function DeleteAccount() {

  const componentState = useHandleDeleteAccountComponentState();

  useHandleDeleteAccountComponentEffects(componentState, component);

  if (handleFormRenderConditionAction(componentState)) {
    return (
      <div className={handleFormWrapperClassNamesAction(componentState)}>
        <form
          className={handleFormClassNamesAction(componentState)}
          onSubmit={(event) =>
            handleDeleteFormDataAction(event, component, componentState)
          }
        >
          {handleComponentRenderAction(componentState, component)}
        </form>
      </div>
    );
  } else {
    <FetchIndicator component={component} componentState={componentState}/>
  }
}


