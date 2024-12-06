import React from "react";

import { useHandleErrorComponentEffects } from "./effects";
import { useHandleErrorComponentState } from "./state";

import LazyLoadImage from "../shared/lazy_load_image";

import {
  handleRenderFormDataAction,
  handleFormRenderConditionAction,
} from "./utils";

import styles from "./styles/error.module.css";

import FetchIndicator from "../shared/fetch_indicator";

const component = "error";

export default function Error(props) {
  const { target, subTarget, refresh } = props || {};

  const componentState = useHandleErrorComponentState();

  useHandleErrorComponentEffects(componentState, component);

  if (handleFormRenderConditionAction(componentState)) {
    return (
      <div key={component} className={styles?.error_wrapper}>
        <div className={styles?.error_container}>
          <div className={styles?.error_header}>
            {
              handleRenderFormDataAction(componentState, target, subTarget)
                ?.headerTitle
            }
          </div>
          <LazyLoadImage
            src={
              handleRenderFormDataAction(componentState, target, subTarget)
                ?.image
            }
            alt={""}
            width={600}
            height={600}
            crossOrigin={"Anyonymus"}
          />
          <button
            className={styles?.error_button}
            onClick={() =>
              handleRenderFormDataAction(
                componentState,
                target,
                subTarget,
                true,
                refresh
              )
            }
          >
            {
              handleRenderFormDataAction(componentState, target, subTarget)
                ?.buttonTitle
            }
          </button>
        </div>
      </div>
    );
  }
  return (
    <FetchIndicator component={component} componentState={componentState} />
  );
}
