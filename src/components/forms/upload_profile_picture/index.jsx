import React from "react";

import styles from "../shared/styles/form.module.css";

import {
  handleComponentRenderAction,
  handleFormRenderConditionAction,
  handleUploadImageAction,
  handleFormWrapperClassNamesAction,
  handleFormClassNamesAction
} from "../shared/utils";

import { useHandleUploadProfilePictureComponentEffects } from "./effects";

import { useHandleUploadProfilePictureComponentState } from "./state";

import FetchIndicator from "../../shared/fetch_indicator";

const component = "upload_profile_picture"

export default function UploadProfilePicture() {
  const componentState = useHandleUploadProfilePictureComponentState();

  useHandleUploadProfilePictureComponentEffects(componentState, component);

  if (handleFormRenderConditionAction(componentState)) {
      return (
        <div className={handleFormWrapperClassNamesAction(componentState)}>
          <form
            className={handleFormClassNamesAction(componentState)}
            onSubmit={(event) =>
              handleUploadImageAction(event, componentState, component)
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
