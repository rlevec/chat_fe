import React from "react";

import styles from "../shared/styles/form.module.css";

import {
  handlePutFormDataAction,
  handleComponentRenderAction,
  handleFormRenderConditionAction,
  handleFormWrapperClassNamesAction,
  handleFormClassNamesAction
} from "../shared/utils";

import { useHandleChangeUsernameComponentEffects } from "./effects";

import { useHandleChangeUsernameComponentState } from "./state";

import FetchIndicator from "../../shared/fetch_indicator";

const component = "change_username";

export default function ChangeUsername() {
  const componentState = useHandleChangeUsernameComponentState();

  useHandleChangeUsernameComponentEffects(componentState, component);


  if (handleFormRenderConditionAction(componentState)) {
    return (
      <div className={handleFormWrapperClassNamesAction(componentState)}>
        <form
          className={handleFormClassNamesAction(componentState)}
          onSubmit={(event) =>
            handlePutFormDataAction(event, null, component, componentState)
          }
        >
          {handleComponentRenderAction(componentState, component)}
        </form>
      </div>
    );
  } else {
    return <FetchIndicator component={component} componentState={componentState}/>;
  }
}
