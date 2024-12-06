import { useEffect } from "react";

import {handlePopulateInitialStateValuesAction } from "../../shared/utils";

import { useHandleFetchFormDataAction } from "../../../../utils";

export const useHandleChangeEmailComponentEffects = (componentState, component) => {

  useHandleFetchFormDataAction(
    componentState, 
    component,
  )

  useEffect(() => {
    if(Boolean(componentState?.formData)) handlePopulateInitialStateValuesAction(componentState)
  }, [componentState?.formData]);


};
