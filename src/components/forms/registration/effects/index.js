import { useEffect } from "react";

import {
  handlePopulateInitialStateValuesAction,
  handlePasswordComparisonAction
} from "../../shared/utils";

import { useHandleFetchFormDataAction } from "../../../../utils";


export const useHandleRegistrationComponentEffects = (
  componentState,
  component
) => {
  useHandleFetchFormDataAction(
    componentState, 
    component,
  )

  useEffect(() => {
       if(componentState?.formData) handlePopulateInitialStateValuesAction(componentState)
  }, [componentState?.formData])


  useEffect(() => {
    handlePasswordComparisonAction(componentState?.query?.password, componentState?.query?.confirmPassword, "confirmPassword", componentState?.setFieldError);
  }, [componentState?.query?.password, componentState?.query?.confirmPassword]);

};
