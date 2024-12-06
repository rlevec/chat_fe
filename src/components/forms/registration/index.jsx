import React, { lazy, Suspense } from "react";

import styles from "../shared/styles/form.module.css";

const Modal = lazy(() => import("../shared/components/modal"));

import FetchIndicator from "../../shared/fetch_indicator";
import Loader from "../../shared/circular_loader";

import {
  handlePostFormDataAction,
  handleComponentRenderAction,
  handleFormRenderConditionAction,
  handleFormWrapperClassNamesAction,
  handleFormClassNamesAction
} from "../shared/utils";

import { useHandleRegistrationComponentEffects } from "./effects";
import { useHandleRegistrationComponentState } from "./state";

const component = "registration";

export default function Registration() {
  const componentState = useHandleRegistrationComponentState();

  useHandleRegistrationComponentEffects(componentState, component);

  if (handleFormRenderConditionAction(componentState)) {
    if (componentState?.isModalOpen)
      return (
    <Suspense fallback={<Loader/>}>
      <Modal parentComponentState={componentState} component={component} />
    </Suspense>
      );
    else {
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
    }
  } else {
    return <FetchIndicator component={component} />;
  }
}
